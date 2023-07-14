<?php

/**
 * Displays a page for the user to login/register and recover password etc.
 *
 * Any part of the site can send the user to the login page with an encoded redirect url to get back to where they were,
 * after the login/registration.
 */
class Zume_Training_Login extends DT_Magic_Url_Base {

    public $magic = false;
    public $parts = false;
    public $page_title = 'User Login';
    public $root = 'zume_app';
    public $type = 'login';
    public $lang = 'en';
    public static $token = 'zume_app_login';
    public $url;

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        /**
         * tests if other URL
         */
        $url_path = dt_get_url_path();
        $this->url = new DT_URL( $url_path );

        $url_path = parse_url( $url_path, PHP_URL_PATH );

        $url_parts = explode( '/', $url_path );

        $codes = zume_language_codes();

        if ( ( isset( $url_parts[0] ) && ( $url_parts[0] === $this->type || ( in_array( $url_parts[0], $codes ) && isset( $url_parts[1] ) && $url_parts[1] === $this->type ) ) ) && ! dt_is_rest() ) {
            // load if valid url
            if ( true ) {
                $this->lang = $url_parts[0];
                add_filter('locale', function( $locale ) {
                    return $this->lang;
                }, 100, 1);
            }

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_allow_non_login_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_override_header_meta', function (){ return true;
            }, 100, 1 );

            // header content
            add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
            add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
            add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );


            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_javascript(){
        //require_once( trailingslashit( plugin_dir_path( __DIR__ ) ) . 'assets/header.php' );

        $user_id = get_current_user_id();

        ?>
        <script>
            /*let jsObject = [<?php /*echo json_encode([
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'parts' => $this->parts,
                'is_logged_in' => is_user_logged_in() ? 1 : 0,
                'logout_url' => esc_url( '/user_app/logout' ),
                'redirect_url' => DT_Login_Fields::get( 'redirect_url' ),
            ]) */ ?>][0] */
        </script>
        <style>
            #login_form input {
                padding:.5em;
            }
        </style>
        <?php
    }

    public function body() {
/*
        if ( is_user_logged_in() ) {
            $redirect_url = DT_Login_Fields::get( 'redirect_url' );
            if ( empty( $redirect_url ) ) {
                $redirect_url = site_url();
            }

            $redirect_to = $this->url->query_params->get( 'redirect_to' );

            if ( !empty( $redirect_to ) ) {
                $redirect_url = $redirect_to;
            }

            if ( wp_redirect( $redirect_url ) ) {
                exit();
            }
        } else {
            $loggedout = $this->url->query_params->get( 'loggedout' );

            if ( !empty( $loggedout ) && $loggedout === 'true' ) {
                if ( wp_redirect( site_url() ) ) {
                    exit();
                }
            }
        }
*/
        ?>
        <?php

    }

}
Zume_Training_Login::instance();
