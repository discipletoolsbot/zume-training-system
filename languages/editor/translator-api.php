<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Translation_Endpoints
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
            $this->namespace, '/translation/pieces', [
                'methods' => 'POST',
                'callback' => [ $this, 'update_pieces' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function update_pieces( WP_REST_Request $request ) {
        $params = $request->get_params();
        if ( ! isset( $params['postid'] ) || ! isset( $params['key'] ) || ! isset( $params['content'] ) ) {
            return new WP_Error( 'missing_params', 'Missing required parameters', [ 'status' => 400 ] );
        }

        update_post_meta( $params['postid'], $params['key'], $params['content'] );

        return $params;
    }

}
Zume_Translation_Endpoints::instance();
