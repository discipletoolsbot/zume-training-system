<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_User_Location_API
{
    public $namespace = 'zume_system/v1';
    private static $_instance = null;

    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct()
    {
        if ( dt_is_rest() ) {
            add_action('rest_api_init', [$this, 'add_api_routes']);
            add_filter('dt_allow_rest_access', [$this, 'authorize_url'], 10, 1);
        }
    }
    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace  ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

    public function add_api_routes()
    {
        $namespace = $this->namespace;

        register_rest_route(
            $namespace, '/user_location', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'user_location'],
                'permission_callback' =>'__return_true'
            ]
        );
    }
    public function user_location( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $user_id = null;
        if ( isset( $params['user_id'] ) && ! empty( $params['user_id'] ) ) {
            $user_id = $params['user_id'];
        }

        return self::get_user_location( $user_id );
    }
    public static function get_user_location( $user_id = NULL ) {
        global $wpdb;

        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $grid_id = $wpdb->get_var( $wpdb->prepare( "SELECT grid_id FROM {$wpdb->prefix}dt_reports WHERE user_id = %d AND post_type = 'zume' AND type = 'registered'", $user_id ) );
        if ( $grid_id ) {
            return zume_location_list( $grid_id );
        } else {
            $list = zume_location_list();
            return $list[0];
        }


        return $location;
    }

}
Zume_System_User_Location_API::instance();
