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
        register_rest_route(
            $this->namespace, '/translation/verify', [
                'methods' => 'POST',
                'callback' => [ $this, 'verify' ],
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
            return new WP_Error( '', 'User ' . $this->user->user_email . ' is not a translator.', [ 'status' => 403 ] );
        }

        $params = $request->get_params();
        if ( ! isset( $params['postid'], $params['key'], $params['content'], $params['type'] ) ) {
            return new WP_Error( 'missing_params', 'Missing required parameters', [ 'status' => 400 ] );
        }

        $meta_key = trim( wp_unslash( $params['key'] ) );
        $post_id = trim( wp_unslash( $params['postid'] ) );
        $type = trim( wp_unslash( $params['type'] ) );
        $current_value = trim( wp_unslash( $params['content'] ) );
        $post_type = null;
        if ( isset( $params['post_type'] ) && ! empty( $params['post_type'] ) ) {
            $post_type = sanitize_text_field( wp_unslash( $params['post_type'] ) );
        }

        // Log the change
        $previous_value = get_post_meta( $params['postid'], $params['key'], true );
        $log = array(
            'meta_key' => $meta_key,
            'post_id' => $post_id,
            'previous_value' => $previous_value,
            'current_value' => $current_value,
            'timestamp' => current_time( 'mysql' ),
            'author' => $this->user->ID,
            'type' => $type,
        );
        $wpdb->insert(
            'zume_postmeta_translator_log',
            $log
        );

        // Save new value
        update_post_meta( $post_id, $meta_key, $current_value );

        $last_activity = zume_last_activity( $post_type );

        if ( isset( $last_activity[$meta_key.$post_id] ) ) {
            return $last_activity[$meta_key.$post_id];
        } else {
            return false;
        }

//        $log['author'] = $this->user->display_name;
//        $log['time'] = date("n-j (g:i a)", strtotime($log['timestamp']));
//        $log['color'] = 'green';
//
//        return $log;
    }
    public function verify( WP_REST_Request $request ) {
        global $wpdb;

        // is user logged in
        if ( ! is_user_logged_in() ) {
            return new WP_Error( 'not_logged_in', 'You must be logged in to update translations', [ 'status' => 403 ] );
        }

        // is user translator role
        $this->user = wp_get_current_user();
        if ( ! in_array( 'custom_language_translator', (array) $this->user->roles ) ) {  // test if approved translator role
            return new WP_Error( '', 'User ' . $this->user->user_email . ' is not a translator.', [ 'status' => 403 ] );
        }

        $params = $request->get_params();
        if ( ! isset( $params['postid'] ) || ! isset( $params['key'] ) || ! isset( $params['content'] ) ) {
            return new WP_Error( 'missing_params', 'Missing required parameters', [ 'status' => 400 ] );
        }

        $post_id = trim( wp_unslash( $params['postid'] ) );
        $meta_key = trim( wp_unslash( $params['key'] ) );
        $current_value = trim( wp_unslash( $params['content'] ) );

        // Log the change
        $wpdb->insert(
            'zume_postmeta_translator_log',
            array(
                'post_id' => $post_id,
                'meta_key' => $meta_key,
                // empty previous value
                'current_value' => $current_value,
                'timestamp' => current_time( 'mysql' ),
                'author' => $this->user->ID,
                'type' => 'verify',
            )
        );

        return $params;
    }
}
Zume_Translation_Endpoints::instance();
