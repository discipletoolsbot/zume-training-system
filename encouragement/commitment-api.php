<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_Plan_API
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
            $namespace, '/add_commitment', [
                'methods' => [ 'GET', 'POST' ],
                'callback' => [ $this, 'add_commitment' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $namespace, '/get_commitments', [
                'methods' => [ 'GET', 'POST' ],
                'callback' => [ $this, 'get_commitments' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function add_commitment( WP_REST_Request $request )
    {

        if ( ! is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }

        global $wpdb;
        $params = dt_recursive_sanitize_array( $request->get_params() );
        $user_id = $params['user_id'];
        if ( empty( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        $contact_id = zume_get_user_contact_id( $user_id );

        $fields = [
            'user_id' => $user_id,
            'post_id' => $contact_id,
            'meta_key' => 'tasks',
            'meta_value' => maybe_serialize([
                'note' => $params['note'],
            ]),
            'date' => $params['date'],
            'category' => 'custom',
        ];

        $create = $wpdb->insert( $wpdb->dt_post_user_meta, $fields );

        $log = zume_get_user_log( $user_id );
        $subtypes = array_column( $log, 'subtype' );
        if ( ! in_array( 'made_3_month_plan', $subtypes ) ) {
            zume_log_insert( 'system', 'made_3_month_plan', [ 'user_id' => $user_id ] );
        }

        return $create;
    }
    public function get_commitments( WP_REST_Request $request )
    {
        if ( ! is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }

        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( isset( $params['user_id'] ) ) {
            $user_id = $params['user_id'];
        } else {
            $user_id = get_current_user_id();
        }

        $status = 'open';
        if ( isset( $params['status'] ) ) {
            $status = $params['status'];
        }

        return zume_get_user_commitments( $user_id, $status );
    }
}
Zume_System_Plan_API::instance();
