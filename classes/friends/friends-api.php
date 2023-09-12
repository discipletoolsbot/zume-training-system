<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Custom endpoints file
 */

class Zume_Friends_Endpoints
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
            $this->namespace, '/connect_friends', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_friends' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function connect_friends( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['type'], $params['value'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }

        $type = $params['type'];
        switch( $params['type'] ) {
            case 'email':
                $user = get_user_by( 'email', $params['value'] );
                if ( ! $user ) {
                    return new WP_Error( 'user_not_found', 'User not found', [ 'status' => 404 ] );
                }
                $contact_id = zume_get_user_contact_id( $user->ID );
                break;
            case 'phone':
                $contact_id = zume_get_contact_id_by_phone( $params['value'] );
                break;
            case 'code':
                $contact_id = zume_get_contact_id_by_code( $params['value'] );
                break;
            default:
                return new WP_Error( 'invalid_type', 'Invalid type', [ 'status' => 400 ] );
        }

    }
}
Zume_Friends_Endpoints::instance();
