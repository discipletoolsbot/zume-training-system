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

        $name = isset( $fields['name'] ) ? $fields['name'] : '';
        $phone = isset( $fields['phone'] ) ? $fields['phone'] : '';
        $email = isset( $fields['email'] ) ? $fields['email'] : '';
        $location_grid_meta = isset( $fields['location_grid_meta'] ) ? $fields['location_grid_meta'] : [];
        $preferred_language = isset( $fields['preferred_language'] ) ? $fields['preferred_language'] : '';
        $contact_preference = isset( $fields['contact_preference'] ) ? $fields['contact_preference'] : [];

        $user_updates = [];
        $updates = [];

        $user_id = get_current_user_id();
        if ( !empty( $name ) ) {
            $user_updates['ID'] = $user_id;
            $user_updates['display_name'] = $name;
        }

        if ( !empty( $email ) ) {
            $user_updates['user_email'] = $email;
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

        if ( !empty( $preferred_language ) ) {
            $updates['user_preferred_language'] = $preferred_language;
        }

        if ( !empty( $contact_preference ) ) {
            $updates['user_contact_preference'] = $contact_preference;
        }

        $contact_id = zume_get_user_contact_id( $user_id );

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
        } else {
            $contact = DT_Posts::get_post( 'contacts', $contact_id, false, false, true );
        }

        self::log_setting_of_profile( $user_id );

        return [
            'location_grid_meta' => $contact['location_grid_meta'],
            'name' => $contact['name'],
            'phone' => $contact['user_phone'],
        ];
    }

    public static function log_setting_of_profile( $user_id ) {
        $profile = zume_get_user_profile( $user_id );

        if ( !empty( $profile['name'] ) ) {
            zume_log_insert( 'system', 'set_profile_name' );
        }

        if ( !empty( $profile['phone'] ) ) {
            zume_log_insert( 'system', 'set_profile_phone' );
        }

        if ( $profile['location']['source'] !== 'ip' ) {
            zume_log_insert( 'system', 'set_profile_location' );
        }
    }
}
