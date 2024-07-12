<?php

/**
 * Displays a page for the user to login/register and recover password etc.
 *
 * Any part of the site can send the user to the login page with an encoded redirect url to get back to where they were,
 * after the login/registration.
 */
class Zume_Training_Login extends Zume_Magic_Page {

    public $magic = false;
    public $parts = false;
    public $page_title = 'User Login';
    public $root = 'app';
    public $type = 'login';
    public $lang = 'en';
    public static $token = 'app_login';
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

        $this->page_title = esc_html__( 'Login', 'zume' );

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        if ( $url_parts[0] === $this->type && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();


            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
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
        <?php
    }

    public function body() {

        $url = new DT_URL( dt_get_url_path() );
        $hide_nav = $url->query_params->has( 'hide-nav' );
        $show_nav = !$hide_nav;

        ?>

        <div class="cover-page | position-relative bg-brand-gradient">

            <?php if ( $show_nav === true ) : ?>

                <?php require_once __DIR__ . '/../parts/nav.php' ?>

            <?php endif; ?>

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
