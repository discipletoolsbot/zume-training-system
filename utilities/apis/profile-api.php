<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Profile_API
{
    public $namespace = 'zume_system/v1';
    private static $_instance = null;

    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
            add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
        }
    }

    public function add_api_routes() {
        $namespace = $this->namespace;

        register_rest_route(
            $namespace, '/profile', [
                'methods' => [ 'POST' ],
                'callback' => [ $this, 'update_profile' ],
                'permission_callback' => function () {
                    return is_user_logged_in();
                },
            ]
        );
        register_rest_route(
            $namespace, '/user_stage', [
                'methods' => [ 'GET' ],
                'callback' => [ $this, 'get_user_stage' ],
                'permission_callback' => function () {
                    return is_user_logged_in();
                },
            ]
        );
        register_rest_route(
            $namespace, '/user_host', [
                'methods' => [ 'GET' ],
                'callback' => [ $this, 'get_user_host' ],
                'permission_callback' => function () {
                    return is_user_logged_in();
                },
            ]
        );
    }

    public function update_profile( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( json_decode( $request->get_body(), true ) );

        /* If user has SSO login disable updating email */
        if ( key_exists( 'email', $params ) && $this->is_sso_user() ) {
            unset( $params['email'] );
        }

        $return = Zume_Profile_Model::update( $params );

        if ( is_wp_error( $return ) ) {
            return $return;
        }

        $updated_profile = zume_get_user_profile();

        return new WP_REST_Response( $updated_profile );
    }

    public function get_user_stage( WP_REST_Request $request ) {
        $return = zume_get_user_stage();

        if ( is_wp_error( $return ) ) {
            return $return;
        }

        return new WP_REST_Response( $return );
    }


    public function get_user_host( WP_REST_Request $request ) {
        $return = zume_get_user_host();

        if ( is_wp_error( $return ) ) {
            return $return;
        }

        return new WP_REST_Response( $return );
    }

    public function authorize_url( $authorized ) {
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

    private function is_sso_user() {
        $user_id = get_current_user_id();

        $sso_identities = get_user_meta( $user_id, 'firebase_identities', true );

        return !empty( $sso_identities );
    }
}
Zume_Profile_API::instance();

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
        $communications_email = isset( $fields['communications_email'] ) ? $fields['communications_email'] : '';
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

        if ( !empty( $communications_email ) ) {
            $updates['user_communications_email'] = $communications_email;
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
