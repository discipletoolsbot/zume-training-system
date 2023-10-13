<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Custom endpoints file
 */

class Zume_Connect_Endpoints
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
            $this->namespace, '/connect/friend', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_to_friend_callback' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/connect/plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_to_plan_callback' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function connect_to_friend_callback( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['code'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }

        return self::connect_to_friend( $params['code'] );
    }

    public static function connect_to_friend( $key ) {
        // does key exist
        // if so, then connect current user with friend
        if ( $contact_id = self::test_friend_key( $key ) ) {
            $current_user_id = get_current_user_id();
            $current_contact_id = zume_get_user_contact_id( $current_user_id );

            $fields = [
                'relation' => [
                    'values' => [
                        [
                            'value' => $contact_id,
                        ],
                    ],
                ],
            ];
            $result = DT_Posts::update_post( 'contacts', $current_contact_id, $fields, true, false );
            if ( ! is_wp_error( $result ) && is_array( $result ) ) {
                zume_log_insert( 'system', 'invited_friends', [ 'user_id' => $current_user_id ], true );

                $name = __( 'your friend', 'zume' );
                foreach ( $result['relation'] as $relation ) {
                    if ( $relation['ID'] === $contact_id ) {
                        $name = $relation['post_title'];
                    }
                }

                return [
                    'name' => $name,
                ];
            } else {
                return new WP_Error( __METHOD__, 'Error updating contact', [ 'status' => 400 ] );
            }
        } else {
            return new WP_Error( __METHOD__, 'Key not found', [ 'status' => 400 ] );
        }
    }

    public static function test_friend_key( $key ) : bool|int {
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT post_id FROM wp_postmeta WHERE `meta_key` = 'user_friend_key' AND meta_value = %s", $key );
        $result = $wpdb->get_var( $sql );
        if ( $result && ! is_wp_error( $result ) ) {
            return (int) $result;
        }
        return false;
    }
    public function connect_to_plan_callback( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['code'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }

        return self::connect_to_plan( $params['code'] );
    }
    public static function connect_to_plan( $key ) {
        // does key exist
        // if so, then connect current user with friend
        if ( $plan_post_id = self::test_join_key( $key ) ) {
            dt_write_log( $plan_post_id );
            $user_id = get_current_user_id();
            $contact_id = zume_get_user_contact_id( $user_id );
            $fields = [
                'zume_plans' => [
                    'values' => [
                        [
                            'value' => $plan_post_id,
                        ],
                    ],
                ],
            ];
            $result = DT_Posts::update_post( 'contacts', $contact_id, $fields, true, false );

            if ( ! is_wp_error( $result ) && is_array( $result ) ) {
                zume_log_insert( 'system', 'plan_created', [ 'user_id' => $user_id ], true );

                $name = __( 'the plan', 'zume' );
                foreach ( $result['zume_plans'] as $plan ) {
                    if ( $plan['ID'] === $plan_post_id ) {
                        $name = $plan['post_title'];
                    }
                }

                return [
                    'name' => $name,
                ];
            } else {
                return new WP_Error( __METHOD__, 'Error updating contact', [ 'status' => 400 ] );
            }
        } else {
            return new WP_Error( __METHOD__, 'Key not found', [ 'status' => 400 ] );
        }
    }
    public static function test_join_key( $key ) : bool|int {
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT post_id FROM wp_postmeta WHERE `meta_key` = 'join_key' AND meta_value = %s", $key );
        $result = $wpdb->get_var( $sql );
        if ( $result && ! is_wp_error( $result ) ) {
            return (int) $result;
        }
        return false;
    }
}
Zume_Connect_Endpoints::instance();
