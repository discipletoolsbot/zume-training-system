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
        register_rest_route(
            $this->namespace, '/connect/public-plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_to_public_plan_callback' ],
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
        $contact_id = self::test_friend_key( $key );

        if ( !$contact_id ) {
            return new WP_Error( 'bad_friend_code', 'Key not found', [ 'status' => 400 ] );
        }

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
            return new WP_Error( 'error_connecting_friend', 'Error updating contact', [ 'status' => 400 ] );
        }
    }

    public static function test_friend_key( $key ) : bool|int {
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT post_id FROM wp_postmeta WHERE `meta_key` = 'user_friend_key' AND meta_value = %s", $key );
        //phpcs:ignore
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

        $code = $params['code'];

        $connection_response = self::connect_to_plan( $code );

        if ( is_wp_error( $connection_response ) ) {
            return $connection_response;
        }

        $plan_post_id = self::test_join_key( $code );


        /* Get the plan owner's friend code */
        $plan = DT_Posts::get_post( 'zume_plans', $plan_post_id, true, false );

        if ( is_wp_error( $plan ) ) {
            return $plan;
        }

        $friend_user_id = $plan['assigned_to']['id'];
        $friend_contact_id = zume_get_user_contact_id( $friend_user_id );

        $friend = DT_Posts::get_post( 'contacts', $friend_contact_id, true, false );

        if ( is_wp_error( $friend ) ) {
            return $friend;
        }

        $code = $friend['user_friend_key'];

        $result = self::connect_to_friend( $code );

        if ( is_wp_error( $result ) ) {
            return $result;
        }

        return $connection_response;
    }

    public function connect_to_public_plan_callback( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['code'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }

        $code = $params['code'];

        $response = self::connect_to_plan( $code, true );

        if ( is_wp_error( $response ) ) {
            return $response;
        }

        $plan_post_id = self::test_join_key( $code );

        $plan = DT_Posts::get_post( 'zume_plans', $plan_post_id, true, false );

        if ( is_wp_error( $plan ) ) {
            return $plan;
        }

        $coach_user_id = $plan['assigned_to']['id'];

        global $wpdb;
        $coach_id = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT post_id
                    FROM wp_3_postmeta
                    WHERE meta_key = 'corresponds_to_user'
                    AND meta_value = %d",
                $coach_user_id
            )
        );

        $user_id = get_current_user_id();
        $response = Zume_Get_A_Coach_Endpoints::connect_user_to_coach( $user_id, $coach_id );

        if ( is_wp_error( $response ) ) {
            return $response;
        }

        return [
            'name' => $plan['title'],
            'coach_id' => $plan['assigned_to']['id'],
        ];
    }

    public static function connect_to_plan( $key, $public = false ) {
        // does key exist
        // if so, then connect current user with friend
        $plan_post_id = self::test_join_key( $key );

        if ( !$plan_post_id ) {
            return new WP_Error( 'bad_plan_code', 'Key not found', [ 'status' => 400 ] );
        }

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

        if ( is_wp_error( $result ) || !is_array( $result ) ) {
            return new WP_Error( __METHOD__, 'Error updating contact', [ 'status' => 400 ] );
        }

        $sub_type = $public === true ? 'joined_online_training' : 'plan_created';

        zume_log_insert( 'system', $sub_type, [ 'user_id' => $user_id ], true );

        $name = __( 'the plan', 'zume' );
        foreach ( $result['zume_plans'] as $plan ) {
            if ( $plan['ID'] === $plan_post_id ) {
                $name = $plan['post_title'];
            }
        }
        return [
            'name' => $name,
        ];
    }

    public static function test_join_key( $key ) : bool|int {
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT post_id FROM wp_postmeta WHERE `meta_key` = 'join_key' AND meta_value = %s", $key );
        //phpcs:ignore
        $result = $wpdb->get_var( $sql );
        if ( $result && ! is_wp_error( $result ) ) {
            return (int) $result;
        }
        return false;
    }
}
Zume_Connect_Endpoints::instance();
