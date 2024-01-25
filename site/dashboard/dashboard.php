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

            $this->require_authentication();

            $this->set_locale( $lang_code );

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

            add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 100 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
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
        wp_enqueue_script( 'zume_dashboard', plugin_dir_url( __FILE__ ) . 'dash.js', [ 'jquery' ], filemtime( plugin_dir_path( __FILE__ ) . 'dash.js' ), true );
        wp_localize_script(
            'zume_dashboard', 'zumeDashboard', array(
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'site_url' => get_site_url(),
                'template_dir' => get_template_directory_uri(),
                'user_profile' => zume_get_user_profile(),
                'training_items' => zume_training_items(),
                'friends' => zume_get_user_friends(),
                'translations' => [
                    'share' => __( 'Share', 'zume' ),
                    'copy_link' => __( 'Copy Link', 'zume' ),
                    'copy_and_share_text' => __( 'Copy this link and send it to your friends 🙂', 'zume' ),
                    'share_feedback' => __( 'Thanks!', 'zume' ),
                    'copy_feedback' => __( 'Link copied', 'zume' ),
                    'getting_started' => __( 'Getting Started', 'zume' ),
                    'set_profile' => __( 'Set Profile', 'zume' ),
                    'plan_a_training' => __( 'Plan a Training', 'zume' ),
                    'get_a_coach' => __( 'Get a Coach', 'zume' ),
                    'training' => __( 'Training', 'zume' ),
                    'my_progress' => __( 'My Progress', 'zume' ),
                    'my_training' => __( 'My Training', 'zume' ),
                    'practicing' => __( 'Practicing', 'zume' ),
                    'my_tools' => __( 'My Tools', 'zume' ),
                    'my_plans' => __( 'My Plans', 'zume' ),
                    'my_churches' => __( 'My Churches', 'zume' ),
                    'my_maps' => __( 'My Maps', 'zume' ),
                    'launch_course' => __( 'Launch Course', 'zume' ),
                    'ten_session_course' => __( '10 Session Course', 'zume' ),
                    'twenty_session_course' => __( '20 Session Course', 'zume' ),
                    'three_day_intensive_course' => __( '3 Day Intensive Course', 'zume' ),
                ],
                'urls' => [
                    'launch_ten_session_course' => esc_url( zume_10_session_url() ),
                ],
            )
        );
    }

    public function header_style(){
        ?>

        <script>
            const zumeDashboard = [<?php echo json_encode([
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'site_url' => get_site_url(),
                'template_dir' => get_template_directory_uri(),
                'user_profile' => zume_get_user_profile(),
                'training_items' => zume_training_items(),
                'friends' => zume_get_user_friends(),
                'translations' => [
                    'share' => __( 'Share', 'zume' ),
                    'copy_link' => __( 'Copy Link', 'zume' ),
                    'copy_and_share_text' => __( 'Copy this link and send it to your friends 🙂', 'zume' ),
                    'share_feedback' => __( 'Thanks!', 'zume' ),
                    'copy_feedback' => __( 'Link copied', 'zume' ),
                    'getting_started' => __( 'Getting Started', 'zume' ),
                    'set_profile' => __( 'Set Profile', 'zume' ),
                    'plan_a_training' => __( 'Plan a Training', 'zume' ),
                    'get_a_coach' => __( 'Get a Coach', 'zume' ),
                    'training' => __( 'Training', 'zume' ),
                    'my_progress' => __( 'My Progress', 'zume' ),
                    'my_training' => __( 'My Training', 'zume' ),
                    'practicing' => __( 'Practicing', 'zume' ),
                    'my_tools' => __( 'My Tools', 'zume' ),
                    'my_plans' => __( 'My Plans', 'zume' ),
                    'my_churches' => __( 'My Churches', 'zume' ),
                    'my_maps' => __( 'My Maps', 'zume' ),
                    'launch_course' => __( 'Launch Course', 'zume' ),
                    'ten_session_course' => __( '10 Session Course', 'zume' ),
                    'twenty_session_course' => __( '20 Session Course', 'zume' ),
                    'three_day_intensive_course' => __( '3 Day Intensive Course', 'zume' ),
                ],
                'urls' => [
                    'launch_ten_session_course' => esc_url( zume_10_session_url() ),
                ],
            ]) ?>][0]
        </script>

        <?php
    }

    public function body(){
        require __DIR__ . '/../parts/nav.php';
        ?>

        <dash-board></dash-board>

        <?php
    }
}
Zume_Training_Dashboard::instance();
