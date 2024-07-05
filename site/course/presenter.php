<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Presenter extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'course_app';
    public $type = 'presenter';
    public $lang = 'en_US';
    public $lang_code = 'en';
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

        $this->lang_code = $lang_code;

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
                'language' => $this->lang_code,
                'home_url' => is_user_logged_in() ? zume_dashboard_url() : zume_home_url(),
                'language_cookie' => ZUME_LANGUAGE_COOKIE,
                'zume_languages' => zume_language_codes(),
                'translations' => self::translations(),
            ]) ?>][0]
            const zume10Sessions = [<?php echo json_encode( Zume_Course_Builder::builder( '10', $this->lang_code ) ) ?>][0]
            const zume10SessionsMenu = [<?php echo json_encode( Zume_Course_Builder::menu( '10', $this->lang_code ) ) ?>][0]

            const zume20Sessions = [<?php echo json_encode( Zume_Course_Builder::builder( '20', $this->lang_code ) ) ?>][0]
            const zume20SessionsMenu = [<?php echo json_encode( Zume_Course_Builder::menu( '20', $this->lang_code ) ) ?>][0]

            const zumeIntensiveSessions = [<?php echo json_encode( Zume_Course_Builder::builder( 'intensive', $this->lang_code ) ) ?>][0]
            const zumeIntensiveSessionsMenu = [<?php echo json_encode( Zume_Course_Builder::menu( 'intensive', $this->lang_code ) ) ?>][0]
        </script>

        <?php
    }

    public function body(){
        global $zume_languages_by_code;
        ?>

        <div class="">

            <?php require __DIR__ . '/../parts/language-menu.php'; ?>

            <div class="off-canvas-content" data-off-canvas-content>

                <?php $display_code = zume_get_language_display_code( zume_current_language() ) ?>

                <course-presenter
                    languageCode="<?php echo esc_html( strtoupper( $display_code ) ) ?>"
                    assetsPath="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images' ) ?>"
                ></course-presenter>
            </div>

            <noscript>

                <div class="cover-page container-xsm">
                    <div class="center">
                        <div class="stack">
                            <h1 class="text-center"><?php echo esc_html__( 'Course Presenter', 'zume' ) ?></h1>

                            <?php require plugin_dir_path( __DIR__ ) . 'parts/noscript.php' ?>

                            <?php $languages = zume_feature_flag( 'course_slides_download' ); ?>
                            <?php $any_downloads_available = false ?>
                            <?php
                            foreach ( $languages as $download_available ) {
                                if ( $download_available ) {
                                    $any_downloads_available = true;
                                    break;
                                }
                            }
                            ?>
                            <?php if ( $any_downloads_available ) : ?>
                                <p><?php echo esc_html__( 'Download the offline slides here', 'zume' ) ?></p>
                                <ul role="list">
                                <?php foreach ( $languages as $language_code => $download_available ) {
                                    if ( !$download_available ) {
                                        continue;
                                    }
                                    $language_details = isset( $zume_languages_by_code[$language_code] ) ? $zume_languages_by_code[$language_code] : null;
                                    if ( empty( $language_details ) ) {
                                        continue;
                                    }

                                    /* TODO: get the correct link for the slide download for this language code */
                                    ?>
                                    <li><a href="#"><?php echo esc_html( $language_details['name'] ) ?></a></li>
                                <?php } ?>
                                </ul>
                            <?php endif; ?>
                            <div class="stack">
                                <h3><?php echo esc_html__( 'Links', 'zume' ) ?></h3>
                                <div class="cluster">
                                    <a href="<?php echo esc_url( zume_home_url() ) ?>"><?php echo esc_html__( 'Home', 'zume' ) ?></a>
                                    <?php if ( is_user_logged_in() ) : ?>
                                        <a href="<?php echo esc_url( zume_dashboard_url() ) ?>"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>
                                    <?php endif; ?>
                                    <a href="<?php echo esc_url( zume_about_url() ) ?>"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                                    <a href="<?php echo esc_url( zume_course_url() ) ?>"><?php echo esc_html__( 'Course', 'zume' ) ?></a>
                                    <a href="<?php echo esc_url( zume_resources_url() ) ?>"><?php echo esc_html__( 'Resources', 'zume' ) ?></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </noscript>

        </div>


        <?php
    }

    public static function translations() {
        return [
            'home' => __( 'Exit Course', 'zume' ),
            'slide_view' => __( 'Slide View', 'zume' ),
            'list_view' => __( 'List View', 'zume' ),
            'next_slide' => __( 'Next slide', 'zume' ),
            'previous_slide' => __( 'Previous slide', 'zume' ),
            'session' => __( 'Session', 'zume' ),
            'close' => __( 'Close', 'zume' ),
            'view_script' => __( 'View Transcript', 'zume' ),
            'view_activity' => __( 'View Activity', 'zume' ),
        ];
    }
}
Zume_Training_Presenter::instance();
