<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Donate extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'donate';
    public $lang = 'en';
    public static $token = 'zume_app_donate';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
        $this->lang = get_locale();

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', '__return_true', 100, 1 );
            add_filter( 'dt_allow_non_login_access', '__return_true', 100, 1 );
            add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );

            // header content
            add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
            add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
            add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

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

    public function header_style(){
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <?php
    }

    public function body(){
        global $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container stack-2 | page">

            <h1 class="text-center"><?php echo esc_html__( 'Donate', 'zume' ) ?></h1>

            <div class="mx-auto w-3rem brand-lighter s--1">
                <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/coach-2guys.svg' ) ?>" class="h-5rem" />
            </div>

            <div class="center">
                <div class="stack-1">
                    <h2 class="brand h3 uppercase d-flex align-items-center gap-1"></h2>
                    <p><?php echo esc_html__( 'We are crowdfunded, we love that you want to be part of us.', 'zume' ) ?></p>
                    <p><?php echo esc_html__( 'If you want to help in specific ways…', 'zume' ) ?></p>
                </div>
            </div>

            <a href="https://give.zume.vision/" class="btn uppercase fit-content mx-auto"><?php echo esc_html__( 'Donate', 'zume' ) ?> <?php require plugin_dir_path( __DIR__ ) . 'assets/images/external-link.svg' ?></a>

        </div>
        <?php
    }
}
Zume_Training_Donate::instance();
