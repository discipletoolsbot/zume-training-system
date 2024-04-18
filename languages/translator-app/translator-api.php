<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Translation_Endpoints
{
    public $user;
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
            $this->namespace, '/translation/update', [
                'methods' => 'POST',
                'callback' => [ $this, 'update' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function update( WP_REST_Request $request ) {
        global $wpdb;

        // is user logged in
        if ( ! is_user_logged_in() ) {
            return new WP_Error( 'not_logged_in', 'You must be logged in to update translations', [ 'status' => 403 ] );
        }

        // is user translator role
        $this->user = wp_get_current_user();
        if ( ! in_array( 'custom_language_translator', (array) $this->user->roles ) ) {  // test if approved translator role
            return new WP_Error( '', "User " . $this->user->user_email . " is not a translator.", [ 'status' => 403 ] );
        }

        $params = $request->get_params();
        if ( ! isset( $params['postid'] ) || ! isset( $params['key'] ) || ! isset( $params['content'] ) ) {
            return new WP_Error( 'missing_params', 'Missing required parameters', [ 'status' => 400 ] );
        }

        $post_id = trim( wp_unslash( $params['postid'] ) );
        $meta_key = trim( wp_unslash( $params['key'] ) );
        $new_value = trim( wp_unslash( $params['content'] ) );

        // Log the change
        $previous_value = get_post_meta ( $params['postid'], $params['key'], true );
        $wpdb->insert(
            'zume_postmeta_translator_log',
            array(
                'post_id' => $post_id,
                'meta_key' => $meta_key,
                'previous_value' => $previous_value,
                'new_value' => $new_value,
                'timestamp' => current_time( 'mysql' ),
                'author' => $this->user->ID,
            )
        );

        // Save new value
        update_post_meta( $post_id, $meta_key, $new_value );

        return $params;
    }
}
Zume_Translation_Endpoints::instance();
