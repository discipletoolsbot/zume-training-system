<?php

/**
 * Displays a page for the user to login/register and recover password etc.
 *
 * Any part of the site can send the user to the login page with an encoded redirect url to get back to where they were,
 * after the login/registration.
 */
class Zume_Training_Login extends Zume_Magic_Page {

    use Translateable;

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

        $this->initialize_language();

        if ( $this->slug_matches( $this->type ) && ! dt_is_rest() ) {

            $this->set_locale();

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', '__return_true', 100, 1 );
            add_filter( 'dt_allow_non_login_access', '__return_true', 100, 1 );
            add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );

            // header content
            add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
            add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
            add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );


            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            $this->enqueue_zume_training_scripts();

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_javascript(){

        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();

                const registerEmailToggles = document.querySelectorAll('.register-email-toggle')
                const ssoRegister = document.querySelector('.sso-register')
                const emailRegister = document.getElementById('email_signup_form')

                registerEmailToggles.forEach( (toggleElement) =>
                    toggleElement.addEventListener('click', function() {
                        ssoRegister.classList.toggle('hidden')
                        emailRegister.classList.toggle('hidden')
                    })
                )

            });
        </script>
        <script>
        </script>
        <?php
    }

    public function body() {

        ?>

        <div class="cover-page | position-relative bg-brand-gradient">

            <?php require_once __DIR__ . '/../parts/nav.php' ?>

            <div class="multiply-cover show-for-medium"></div>
            <div class="multiply-cover flip show-for-medium"></div>

            <div class="center">

                <?php require_once __DIR__ . '/login-template.php' ?>

            </div>

        </div>

        <?php
    }
}
Zume_Training_Login::instance();
