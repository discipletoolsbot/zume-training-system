<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Get_a_Coach_Endpoints
{
    public $permissions = ['access_contacts'];
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
            $namespace, '/get_a_coach', [
                'methods'  => [ 'GET', 'POST' ],
                'callback' => [ $this, 'get_a_coach' ],
                'permission_callback' => function () {
                    return dt_has_permissions($this->permissions);
                }
            ]
        );
    }

    public function get_a_coach( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['user_id'] ) ) {
            if ( is_user_logged_in() ) {
                $params['user_id'] = get_current_user_id();
            } else {
                return new WP_Error( 'no_user_id', 'No user id provided', array( 'status' => 400 ) );
            }
        }


        // log event
        $log_data = [
            "user_id" => $params['user_id'],
            "lng" => $params['lng'],
            "lat" => $params['lat'],
            "level" => $params['level'],
            "label" => $params['label'],
            "grid_id" => $params['grid_id'],
        ];
        $log_result = Zume_System_Log_API::build_log_for_current_user( 'system', 'login'); // @todo test

        return [
            'params' => $params,
            'log' => $log_result,
        ];
    }

    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace  ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

}
Zume_Get_a_Coach_Endpoints::instance();
