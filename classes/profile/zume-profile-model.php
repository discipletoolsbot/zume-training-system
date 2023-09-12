<?php

class Zume_Profile_Model {

    public static function get() {
        global $zume_user_profile;
        $zume_user_profile = zume_get_user_profile();
        return $zume_user_profile;
    }

    /**
     * Update the user profile, some of which is stored on the user, some on the user contact
     *
     * @param array $fields
     *
     * @return array|WP_Error
     */
    public static function update( $fields ) {
        dt_write_log( $fields );

        $name = isset( $fields['name'] ) ? $fields['name'] : '';
        $phone = isset( $fields['phone'] ) ? $fields['phone'] : '';
        $location_grid_meta = isset( $fields['location_grid_meta'] ) ? $fields['location_grid_meta'] : [];

        $user_updates = [];
        $updates = [];

        if ( !empty( $name ) ) {
            $user_id = get_current_user_id();
            $user_updates['ID'] = $user_id;
            $user_updates['display_name'] = $name;
        }
        if ( !empty( $phone ) ) {
            $updates['user_phone'] = $phone;
        }

        /* update location details */
        if ( !empty( $location_grid_meta ) ) {
            $updates['location_grid_meta'] = [
                'values' => [ $location_grid_meta ],
                'force_values' => true,
            ];
        }

        $contact_id = zume_get_user_contact_id($user_id);

        if ( !empty( $user_updates ) ) {
            $result = wp_update_user( $user_updates );

            if ( is_wp_error( $result ) ) {
                return $result;
            }
        }

        if ( !empty( $updates ) ) {
            /* Allow the current user to update their own contact record without permissions set */
            $contact = DT_Posts::update_post( 'contacts', $contact_id, $updates, false, false );

            if ( is_wp_error( $contact ) ) {
                return $contact;
            }
        }

        if ( self::is_profile_set( $user_id ) ) {
            zume_log_insert('system', 'set_profile');
        }

        return [
            'location_grid_meta' => $contact['location_grid_meta'],
            'name' => $contact['name'],
            'phone' => $contact['user_phone'],
        ];
    }

    public static function is_profile_set( $user_id ) : bool {
        $profile = zume_get_user_profile( $user_id );
        if ( empty( $profile['name'] ) ) {
            return false;
        }
        if ( empty( $profile['email'] ) ) {
            return false;
        }
        if ( empty( $profile['phone'] ) ) {
            return false;
        }
        if ( $profile['location']['source'] === 'ip' ) {
            return false;
        }
        return true;
    }

}
