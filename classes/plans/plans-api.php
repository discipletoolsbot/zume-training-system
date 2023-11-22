<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Plans_Endpoints
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
            $this->namespace, '/plans', [
                'methods' => 'GET',
                'callback' => [ $this, 'list_plans' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'create_plan' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'PUT',
                'callback' => [ $this, 'update_plan' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'DELETE',
                'callback' => [ $this, 'delete_plan' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/public_plans', [
                'methods' => 'POST',
                'callback' => [ $this, 'public_plans' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function list_plans( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( isset( $params['user_id'] ) ) {
            $user_id = $params['user_id'];
        } else {
            $user_id = get_current_user_id();
        }

        return zume_get_user_plans( $user_id );
    }
    public function create_plan( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $fields = [
            'title' => $params['title'],
            'assigned_to' => $params['user_id'],
            'visibility' => 'private',
            'participants' => [
                'values' => [
                    [
                        'value' => $params['contact_id'],
                    ],
                ],
            ],
        ];

        if ( isset( $params['set'] ) && is_array( $params['set'] ) ) {
            foreach ( $params['set'] as $key => $value ) {
                $fields[ $key ] = $value;
            }
        }

        $new_post = DT_Posts::create_post( 'zume_plans', $fields, true, false );

        return $new_post;
    }
    public function update_plan( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['key'] ) ) {
            return [
                'success' => false,
                'message' => 'Missing params key',
            ];
        }

        $key = $params['key'];

        global $wpdb;
        $post_id_exists = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'join_key' AND meta_value = %s", $key ) );

        if ( empty( $post_id_exists ) ) {
            return [
                'success' => false,
                'message' => 'Invalid key',
            ];
        }

        $user_id = get_current_user_id();
        $contact_id = zume_get_user_contact_id( $user_id );

        return DT_Posts::update_post( 'zume_plans', $post_id_exists, [ 'participants' => [ 'values' => [ [ 'value' => $contact_id ] ] ] ], true, false );
    }
    public function delete_plan( WP_REST_Request $request ) {
        global $wpdb;

        if ( ! is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( ! isset( $params['post_id'], $params['user_id'] ) ) {
            return new WP_Error( __METHOD__, 'Post_id and user_id required.', array( 'status' => 401 ) );
        }
        $user_id = zume_validate_user_id_request( $params['user_id'] );
        if ( is_wp_error( $user_id ) ) {
            return $user_id;
        }

        $fields = [
            'type' => $params['type'],
            'subtype' => $params['subtype'],
            'user_id' => $user_id,
        ];

        $delete = $wpdb->delete( 'wp_dt_reports', $fields );

        return $delete;
    }


    public function public_plans( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $plans = self::get_public_plans();

        return $plans;
    }

    public static function get_public_plans() {
        return DT_Posts::list_posts( 'zume_plans', [ 'fields' => [ [ 'visibility' => [ 'public' ] ] ] ], false );
    }
}
Zume_Plans_Endpoints::instance();
