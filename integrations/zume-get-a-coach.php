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

        // create coaching request
        $coaching_result = self::register_request_to_coaching( $params['user_id']);

        // log coaching request
        $log_result = Zume_System_Log_API::log( 'system', 'requested_a_coach', [ "user_id" => $params['user_id'] ] );

        return [
            'coach_request' => $coaching_result,
            'log' => $log_result
        ];
    }

    public static function register_request_to_coaching( $user_id )
    {
        $contact_id = zume_get_contact_id( $user_id );
        $contact = DT_Posts::get_post('contacts', $contact_id, true, false, true );

        dt_write_log($contact);

        $fields = [
            "title" => $contact['name'],
            "overall_status" => "new",
            "trainee_user_id" => $user_id,
            "trainee_contact_id" => (int) $contact['ID'],
        ];

        $site = Site_Link_System::get_site_connection_vars( 20125 );
        if ( ! $site ) {
            dt_write_log( __METHOD__ . ' FAILED TO GET SITE LINK TO GLOBAL ' );
            return false;
        }

        $args = [
            'method' => 'POST',
            'body' => json_encode( $fields ),
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $site['transfer_token'],
            ],
        ];

        $result = wp_remote_post( 'https://' . trailingslashit( $site['url'] ) . 'wp-json/dt-posts/v2/contacts', $args );
        if ( is_wp_error( $result ) ) {
            dt_write_log( __METHOD__ . ' TO CREATE TRAINING FOR ' . $contact['name'] );
            return false;
        }

        $body = json_decode( $result['body'], true );

        return $body;

    }

    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace  ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

}
Zume_Get_a_Coach_Endpoints::instance();
