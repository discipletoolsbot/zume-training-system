<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Custom endpoints file
 */

class Zume_Friends_Endpoints
{
    private $namespace;
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        if ( dt_is_rest() ) {
           $this->namespace = 'zume_system/v1';
           add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
        }
    }

    public function add_api_routes() {
        register_rest_route(
            $this->namespace, '/friends/connect', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_friends' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function connect_friends( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset(  $params['value'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }

        // does key exist
        // if so, then connect current user with friend
        if ( $contact_id = $this->test_key( $params['value'] ) ) {
            $current_user_id = get_current_user_id();
            $current_contact_id = zume_get_user_contact_id( $current_user_id );

            $fields = [
                'relation' => [
                    'values' => [
                        [
                            'value' => $contact_id
                        ]
                    ]
                ]
            ];
          return DT_Posts::update_post('contacts', $current_contact_id, $fields, true, false  );

        }
        return false;
    }
    public function test_key( $key ) : bool|int {
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT post_id FROM wp_postmeta WHERE `meta_key` = 'user_friend_key' AND meta_value = %s", $key );
        $result = $wpdb->get_var( $sql );
        if ( $result && ! is_wp_error( $result ) ) {
            return (int) $result;
        }
        return false;
    }
}
Zume_Friends_Endpoints::instance();
