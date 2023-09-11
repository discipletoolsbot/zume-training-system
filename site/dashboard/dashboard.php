<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Dashboard extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'dashboard';
    public $lang = 'en';
    public static $token = 'zume_app_dashboard';

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
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->set_locale( $lang_code );

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

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 100 );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'zume_forms';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }
    public function wp_enqueue_scripts() {
        wp_enqueue_script( 'zume_forms', plugin_dir_url(__DIR__) . 'assets/js/forms.js', [ 'jquery' ], filemtime( plugin_dir_path(__DIR__) . "assets/js/forms.js" ),  true);
        wp_localize_script(
            'zume_forms', 'zumeForms', array(
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'site_url' => get_site_url(),
                'template_dir' => get_template_directory_uri(),
                'translations' => [

                ],
                'user_profile' => zume_get_user_profile(),
            )
        );
    }

    public function header_style(){

    }

    public function body(){
        global $zume_user_profile;
        $plans = zume_get_user_plans();
        $stage= zume_get_user_stage();
        $host = zume_get_user_host();

        require __DIR__ . '/../parts/nav.php';
        ?>
        <div class="container">

            <h1 class="text-center"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></h1>

            <div class="grid-x grid-margin-x">
                <div class="cell medium-6">
                    <p><strong><?php echo esc_html__( 'User Profile', 'zume' ) ?></strong><pre><?php print_r( $zume_user_profile ); ?></pre></p>
                    <p><strong><?php echo esc_html__( 'User Stage', 'zume' ) ?></strong><pre><?php print_r( $stage ); ?></pre></p>
                    <p><strong><?php echo esc_html__( 'User Plans', 'zume' ) ?></strong><pre><?php print_r( $plans ); ?></pre></p>
                    <p><strong><?php echo esc_html__( 'User HOST', 'zume' ) ?></strong><pre><?php print_r( $host ); ?></pre></p>
                </div>
                <div class="cell medium-6">
                    <p><button class="button cta_set_profile" />CTA: Set Profile</button></p>
                    <p><button class="button cta_get_a_coach" />CTA: Get a Coach</button></p>
                    <p><button class="button cta_join_a_training" />CTA: Join a Training</button></p>
                    <p><button class="button cta_make_a_plan" />CTA: Make a Plan</button></p>
                    <p><button class="button cta_invite_friends" />CTA: Invite Friends</button></p>
                    <p><button class="button cta_work_the_plan" />CTA: Work the Plan</button></p>
                    <p><button class="button cta_post_training_plan" />CTA: Post Training (3-Month) Plan</button></p>
                </div>
            </div>
        </div>
        <?php
    }
}
Zume_Training_Dashboard::instance();
