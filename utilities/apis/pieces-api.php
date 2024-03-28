<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Custom endpoints file
 */

class Zume_Pieces_Endpoints
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
            $this->namespace, '/piece', [
                'methods' => 'GET',
                'callback' => [ $this, 'get_piece_page_content' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function get_piece_page_content( WP_REST_Request $request ){
        $params = $request->get_params();
        if ( ! isset( $params['id'], $params['lang'], $params['strings'] ) ) {
            return new WP_Error( 'log_param_error', 'Missing parameters', array( 'status' => 400 ) );
        }
        $lang = 'en';
        if ( ! empty( $params['lang'] ) ) {
            $lang = sanitize_text_field( wp_unslash( $params['lang'] ) );
        }

        $postid = sanitize_text_field( wp_unslash( $params['id'] ) );
        $strings = dt_recursive_sanitize_array( $params['strings'] );

        ob_start();

        pieces_content( $postid, $lang, $strings );

        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
}
Zume_Pieces_Endpoints::instance();
