<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Magic_Page extends DT_Magic_Url_Base {

    public function __construct() {
        parent::__construct();

        add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
    }

    public function consistent_head() {
        require_once trailingslashit( __DIR__ ) . '../parts/head.php';
    }

    /**
     * Prints scripts or data before the closing body tag on the front end.
     *
     */
    public function action_wp_footer(): void {
        require trailingslashit( plugin_dir_path( __DIR__ ) ) . 'parts/footer.php';
    }

    public function require_authentication() {
        if ( !is_user_logged_in() ) {
            $url = dt_create_site_url( '', [ 'redirect_to' => rawurlencode( dt_create_site_url( 'profile' ) ) ] );

            wp_redirect( dt_login_url( 'login', $url ) );
            exit;
        }
    }

    public function enqueue_zume_training_scripts() {
        zume_training_load_scripts( '' );
    }
}
