<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Resources extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'resources';
    public $lang = 'en';
    public static $token = 'zume_app_resources';

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

        <div class="container-md stack-2 | page w-70">

            <h1 class="text-center"><?php echo esc_html__( 'Resources', 'zume' ) ?></h1>

            <div class="mx-auto w-3rem brand-lighter s--1">
                <?php //phpcs:ignore ?>
                <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/Zume-Z-crop.svg' ) ?>
            </div>

            <div class="switcher | gap-3">

                <div class="stack-1 | grow-2">
                    <h2 class="brand h3 d-flex align-items-center gap-1">
                        <img class="w-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/guys-reading.svg' ) ?>" alt="guys reading">
                        <?php echo esc_html__( 'Training Guidebook', 'zume' ) ?>
                    </h2>
                    <p>
                        <?php echo esc_html__( 'Zume Training is now available in a complete workbook. All the concepts, tools, discussion questions and challenges from the training now in the palm of your hands. QR codes for every session give you access to all the video content as well!', 'zume' ) ?>
                    </p>
                </div>

                <div class="stack center | text-center">
                    <img class="w-16rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/workbooksample.png' ) ?>" alt="zume training book">
                    <div class="d-flex align-items-start gap-1">
                        <div class="stack w-90">
                            <a class="btn light uppercase px--3" target="_blank" href="https://storage.googleapis.com/zume-file-mirror/en/33_en_zume_guidebook.pdf"><?php echo esc_html__( 'Free Download (PDF)', 'zume' ) ?></a>
                            <a class="btn outline uppercase px--3" target="_blank" href="https://missionbooks.org/products/zume-training"><?php echo esc_html__( 'Order print copy', 'zume' ) ?></a>
                        </div>
                        <img class="w-10" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/download-icon-01.svg' ) ?>" alt="download image">
                    </div>
                </div>

            </div>

            <button class="mx-auto w-3rem"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/chevron.svg' ) ?>" alt="down button"></button>

        </div>
        <?php

        $lang_code = zume_current_language();
        $google_locales = zume_google_locales();
        $apple_codes = zume_apple_locales( 'codes' );

        $google_lang = $lang_code;
        if ( !in_array( $lang_code, $google_locales ) ) {
            switch ( $lang_code ) {
                case 'swa':
                    $google_lang = 'sw';
                    break;
                case 'ar_jo':
                    $google_lang = 'ar';
                    break;
                case 'zhhk':
                    $google_lang = 'zh-hk';
                    break;
                case 'zhcn':
                    $google_lang = 'zh-cn';
                    break;
                case 'zhtw':
                    $google_lang = 'zh-tw';
                    break;
                default:
                    $google_lang = 'en';
            }
        }

        $apple_lang = isset( $apple_codes[$lang_code] ) ? $apple_codes[$lang_code] : 'en-us';
        if ( !in_array( $lang_code, array_keys( $apple_codes ) ) ) {
            switch ( $lang_code ) {
                case 'zhhk':
                    $apple_lang = 'zh-hk';
                    break;
                case 'ar_jo':
                    $apple_lang = 'ar-ar';
                    break;
                case 'zhcn':
                    $apple_lang = 'zh-cn';
                    break;
                default:
                    $apple_lang = 'en-us';
            }
        }

        ?>

        <div class="container-md py-2">
            <div class="switcher" data-reverse>
                <div class="stack-1 | align-items-stretch">
                    <h2 class="h3 brand"><?php echo esc_html__( 'Empowering Disciples. Anytime... Anywhere with the Zume App.', 'zume' ) ?></h2>
                    <div>
                        <h2 class="h5"><?php echo esc_html__( 'Zume Training App', 'zume' ) ?></h2>
                        <ul>
                            <li><?php echo esc_html__( 'Access the full training wherever you go', 'zume' ) ?></li>
                        </ul>
                        <div class="cluster gap0">
                            <a class="app-download" href='https://play.google.com/store/apps/details?id=app.training.zume&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                <img
                                    alt='<?php echo esc_html__( 'Get it on Google Play', 'zume' ) ?>'
                                    src='https://play.google.com/intl/en_us/badges/static/images/badges/<?php echo esc_attr( $google_lang ) ?>_badge_web_generic.png'
                                />
                            </a>
                            <a class="app-download" href="https://apps.apple.com/us/app/z%C3%BAme-training/id6443335917?itsct=apps_box_badge&amp;itscg=30200">
                                <img
                                    class="w-100"
                                    style="padding: 1.6rem"
                                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/<?php echo esc_attr( $apple_lang ) ?>?size=250x83&amp;releaseDate=1662681600"
                                    alt="Download on the App Store"
                                >
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2 class="h5"><?php echo esc_html__( 'Offline App' ) ?></h2>
                        <ul>
                            <li><?php echo esc_html__( 'Full Training with no internet required' ) ?></li>
                            <li><?php echo esc_html__( 'Download the course and video content to your phone', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Great for areas where internet access is restricted or limited', 'zume' ) ?></li>
                        </ul>
                        <div class="cluster">
                            <a class="app-download" href='https://play.google.com/store/apps/details?id=training.zume.app.twa&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                <img
                                    alt='<?php echo esc_html__( 'Get it on Google Play', 'zume' ) ?>'
                                    src='https://play.google.com/intl/en_us/badges/static/images/badges/<?php echo esc_attr( $google_lang ) ?>_badge_web_generic.png'
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="cover align-items-center">
                    <div class="position-relative w-70">
                        <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/3Phone-mock.png' ) ?>" alt="mobile views">
                        <div class="app-bg-circle bg-brand-lighter absolute">                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <!-- Space to put the slides for download when ready -->
        </div>
        <?php
    }
}
Zume_Training_Resources::instance();
