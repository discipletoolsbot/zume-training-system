<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Get_A_Coach extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'get-a-coach';
    public $lang = 'en';
    public static $token = 'zume_app_get_a_coach';

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

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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

            <h1 class="text-center"><?php echo esc_html__( 'Get A Coach', 'zume' ) ?></h1>

            <div class="mx-auto w-3rem brand-lighter s--1">
                <?php //phpcs:ignore ?>
                <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/Zume-Z-crop.svg' ) ?>
            </div>

            <div class="center">
                <div class="switcher | w-80 gap-5">
                    <div class="stack-1">
                        <h2 class="brand h3 uppercase d-flex align-items-center gap-1"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/coach-2guys.svg' ) ?>" class="h-5rem" /><?php echo esc_html__( 'Coaches', 'zume' ) ?></h2>
                        <p><?php echo esc_html__( 'Our network of volunteer coaches are people like you, people who are passionate about loving God, loving outhers, and obeying the Greate Commision.', 'zume' ) ?></p>
                        <p><?php echo esc_html__( 'A coach is someone who will come alongside you as you implement the Zume tools and training.', 'zume' ) ?></p>
                    </div>
                    <div class="stack-2">
                        <div class="stack-1">
                            <h2 class="brand h3 uppercase d-flex align-items-center gap-1"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/free-dollar.svg' ) ?>" class="h-5rem" /><?php echo esc_html__( "It's Free", 'zume' ) ?></h2>
                            <p><?php echo esc_html__( 'Coaching is free. You can opt out at any time.', 'zume' ) ?></p>
                        </div>
                        <div class="stack-1">
                            <h2 class="brand h3 uppercase d-flex align-items-center gap-1"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/Local-pin.svg' ) ?>" class="h-5rem" /><?php echo esc_html__( 'Local', 'zume' ) ?></h2>
                            <p><?php echo esc_html__( 'On submitting this request, we will do our best to connect you with a coach near you', 'zume' ) ?></p>
                        </div>
                    </div>
                </div>

            </div>

            <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn uppercase fit-content mx-auto"><?php echo esc_html__( 'Get A Coach', 'zume' ) ?></a>

        </div>
        <?php
    }
}
Zume_Training_Get_A_Coach::instance();
