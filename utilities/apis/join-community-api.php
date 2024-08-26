<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Join_Community_Endpoints
{
    public $permissions = [ 'access_contacts' ];
    public $namespace = 'zume_system/v1';
    const SITE_CONNECTION_POST_ID = 20125;
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
            $namespace, '/join_community', [
                'methods'  => [ 'GET', 'POST' ],
                'callback' => [ $this, 'join_community' ],
                'permission_callback' => function () {
                    return dt_has_permissions( $this->permissions );
                },
            ]
        );
    }

    public function join_community( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['user_id'] ) ) {
            if ( is_user_logged_in() ) {
                $params['user_id'] = get_current_user_id();
            } else {
                return new WP_Error( 'no_user_id', 'No user id provided', array( 'status' => 400 ) );
            }
        }

        $join_result = self::join( $params['user_id'] );

        if ( is_wp_error( $join_result ) ) {
            return $join_result;
        }

        return [
            'join_request' => $join_result,
        ];
    }

    private static function join( $user_id )
    {
        $profile = zume_get_user_profile( $user_id );

        // log join event, which will upgrade current_level stage
        Zume_System_Log_API::log( 'practicing', 'join_community', [ 'user_id' => $user_id ], true );

        // request coach
        $coaching_contact_id = $profile['coaching_contact_id'];
        if ( $coaching_contact_id ) {
            return true;
        }

        $coaching_request = Zume_Get_A_Coach_Endpoints::register_request_to_coaching( $user_id );

        return $coaching_request;
    }

    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }
}
Zume_Join_Community_Endpoints::instance();
