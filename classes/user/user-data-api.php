<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_User_Data_API
{
    public $namespace = 'zume_system/v1';
    private static $_instance = null;

    public static function instance()
    {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct()
    {
        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
            add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
        }
    }

    public function authorize_url( $authorized )
    {
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

    public function add_api_routes()
    {
        $namespace = $this->namespace;
        register_rest_route(
            $namespace, '/user_data/profile', [
                'methods' => [ 'GET', 'POST' ],
                'callback' => [ $this, 'zume_get_user_profile'],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $namespace, '/user_data/stage', [
                'methods' => [ 'GET', 'POST' ],
                'callback' => [ $this, 'zume_get_user_stage' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $namespace, '/user_data/host', [
                'methods' => [ 'GET', 'POST' ],
                'callback' => [ $this, 'zume_get_user_host' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $namespace, '/user_data/mawl', [
                'methods' => [ 'GET', 'POST' ],
                'callback' => [ $this, 'zume_get_user_mawl' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function zume_get_user_profile( $request ) {
        $user_id = get_current_user_id();
        return zume_get_user_profile( $user_id );
    }
    public function zume_get_user_stage( $request )
    {
        $user_id = get_current_user_id();
        return zume_get_user_stage( $user_id );
    }
    public function zume_get_user_host( $request )
    {
        $user_id = get_current_user_id();
        return zume_get_user_host( $user_id );
    }
    public function zume_get_user_mawl( $request )
    {
        $user_id = get_current_user_id();
        return zume_get_user_mawl( $user_id );
    }
}
//Zume_System_User_Data_API::instance();
