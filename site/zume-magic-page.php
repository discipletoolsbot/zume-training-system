<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Magic_Page extends DT_Magic_Url_Base {

    public function __construct() {
        parent::__construct();

        add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
        add_filter( 'dt_custom_dir_attr_override', '__return_true' );
    }

    public function register_url_and_access() {
        add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
        add_filter( 'dt_blank_access', '__return_true', 100, 1 );
        add_filter( 'dt_allow_non_login_access', '__return_true', 100, 1 );
        add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );
        add_filter( 'dt_templates_for_urls', [ $this, 'register_url' ], 199, 1 ); // registers url as valid once tests are passed
    }

    public function header_content() {
        add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
        add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
        add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );
    }

    public function register_url( $template_for_url ){
        $url = dt_get_url_path( true );
        $url_parts = explode( '/', $url );
        $template_for_url[join( '/', $url_parts )] = 'template-blank.php';
        return $template_for_url;
    }

    public function consistent_head() {
        require_once trailingslashit( __DIR__ ) . 'parts/head.php';
    }

    /**
     * Prints scripts or data before the closing body tag on the front end.
     *
     */
    public function action_wp_footer(): void {
        require trailingslashit( __DIR__ ) . 'parts/footer.php';
    }

    public function require_authentication() {
        if ( !is_user_logged_in() ) {
            $redirect_url = site_url( dt_get_url_path() );
            wp_redirect( zume_login_url( 'login', $redirect_url ) );
            exit;
        }
    }

    public function enqueue_zume_training_scripts() {
        zume_training_load_scripts( '' );
    }
}
