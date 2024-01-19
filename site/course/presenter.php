<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Presenter extends Zume_Magic_Page
{

    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'course_app';
    public $type = 'presenter';
    public $lang = 'en_US';
    public static $token = 'course_app_presenter';

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

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 999 );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'zume-profile-utilities';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function enqueue_scripts() {}

    public function header_style(){
        global $zume_user_profile;
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <script>
            const jsObject = [<?php echo json_encode([
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'root' => esc_url_raw( rest_url() ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'images_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . 'assets/images' ),
                'language_cookie' => ZUME_LANGUAGE_COOKIE,
                'zume_languages' => zume_language_codes(),
            ]) ?>][0]
            const zume10Sessions = [<?php echo json_encode( get_sessions( '10' ) ) ?>][0]
            const zume20Sessions = [<?php echo json_encode( get_sessions( '20' ) ) ?>][0]
            const zumeIntensiveSessions = [<?php echo json_encode( get_sessions( 'intensive' ) ) ?>][0]
        </script>
        <?php
    }

    public function body(){
        ?>

        <div class="">

            <div class="off-canvas-content" data-off-canvas-content>

                <?php $display_code = zume_get_language_display_code( zume_current_language() ) ?>

                <course-presenter
                    languageCode="<?php echo esc_html( strtoupper( $display_code ) ) ?>"
                    homeUrl="<?php echo esc_url( zume_home_url() ) ?>"
                    assetsPath="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images' ) ?>"
                    translations="<?php echo esc_attr( json_encode([
                        'home' => __( 'Home', 'zume' ),
                    ]) ) ?>"
                ></course-presenter>
            </div>

        </div>

        <?php require __DIR__ . '/../parts/language-menu.php'; ?>

        <?php
    }
}
Zume_Training_Presenter::instance();
