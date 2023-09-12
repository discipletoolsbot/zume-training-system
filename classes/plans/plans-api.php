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
            $this->namespace, '/join_plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'join_plan_api' ],
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

    public function join_plan_api( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['key'] ) ) {
            return [
                'success' => false,
                'message' => 'Missing params key',
            ];
        }

        $key = $params['key'];

        return self::join( $key );
    }

    public static function join( $key ) {
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

        return DT_Posts::update_post( 'zume_plans', $post_id_exists,[ 'participants' => [ 'values' => [ ['value' => $contact_id ] ] ] ], true, false );
    }
    public function public_plans( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $plans = DT_Posts::list_posts( 'zume_plans', [ 'fields' => [ [ 'visibility' => ['public'] ] ] ], false );

        return $plans;
    }
}
Zume_Plans_Endpoints::instance();
