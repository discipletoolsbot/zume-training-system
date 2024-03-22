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
}
Zume_Profile_API::instance();
