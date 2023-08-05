<?php

class Zume_Profile_Model {

    public static function get() {
        $profile = [];

        $contact_id = self::get_user_contact_id();

        $user = wp_get_current_user();
        /* Allow the current user to get their own contact record without permissions set */
        $post = DT_Posts::get_post( 'contacts', $contact_id, true, false );

        $profile['user_email'] = $user->user_email;
        $profile['name'] = $user->display_name;
        $profile['location_grid_meta'] = isset( $post['location_grid_meta'] ) && !empty( $post['location_grid_meta'] ) ? $post['location_grid_meta'][0] : [ 'label' => '' ];
        $profile['user_phone'] = isset( $post['user_phone'] ) && !empty( $post['user_phone'] ) ? $post['user_phone'] : '';

        return $profile;
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

        $contact_id = self::get_user_contact_id();

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

        return [
            'location_grid_meta' => $contact['location_grid_meta'],
            'name' => $contact['name'],
            'phone' => $contact['user_phone'],
        ];
    }

    private static function get_user_contact_id() {
        $user_id = get_current_user_id();
        $contact_id = Disciple_Tools_Users::get_contact_for_user( $user_id );

        return $contact_id;
    }

}