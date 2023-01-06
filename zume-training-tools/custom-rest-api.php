<?php
/**
 * Custom endpoints file
 */

class Zume_Custom_Endpoints
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
        $this->namespace = 'dt/v1';
        add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
    }

    public function add_api_routes() {
        register_rest_route(
            $this->namespace, '/zume/create', [
                'methods' => 'POST',
                'callback' => [ $this, 'create' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/zume/read', [
                'methods' => 'POST',
                'callback' => [ $this, 'read' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/zume/update', [
                'methods' => 'POST',
                'callback' => [ $this, 'update' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/zume/delete', [
                'methods' => 'POST',
                'callback' => [ $this, 'delete' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function create( WP_REST_Request $request ){
        $params = $request->get_params();

        if ( ! isset( $params['action'], $params['data'] ) ) {
            return new WP_Error( __METHOD__, "Missing parameters", [ 'status' => 400 ] );
        }

        $user_id = get_current_user_id();
        $params = dt_recursive_sanitize_array( $params );
        $action = sanitize_text_field( wp_unslash( $params['action'] ) );

        switch( $action ) {
            case 'get_a_coach':
                return $this->get_a_coach( $user_id );
            default:
                return new WP_Error( __METHOD__, "Missing valid action", [ 'status' => 400 ] );
        }
    }

    public function get_a_coach( $user_id ) {

        // update submitted or missing personal information zume.training/tools

        // build contact array

        // create contact to zume.training/coaching

        // reply with success state

        return true;
    }

}
Zume_Custom_Endpoints::instance();
