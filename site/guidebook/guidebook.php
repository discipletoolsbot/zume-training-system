<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Guidebook extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'book';
    public $lang = 'en';
    public static $token = 'zume_app_guidebook';

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

            <h1 class="text-center"><?php echo esc_html__( 'Guidebook', 'zume' ) ?></h1>

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
                    <div class="grid | grid-min-6rem">
                        <div class="thumbnail" style="background-image: url(<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Guidebook.jpg' ) ?>)"></div>
                        <div class="thumbnail" style="background-image: url(<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-1.jpeg' ) ?>)"></div>
                        <div class="thumbnail" style="background-image: url(<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-2.jpeg' ) ?>)"></div>
                        <div class="thumbnail" style="background-image: url(<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-3.jpeg' ) ?>)"></div>
                    </div>
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

        <div class="bg-gray-100 page">
            <div class="container-md stack-2">
                <h2 class="h1 text-center"><?php echo esc_html__( 'Zume Lessons & Resources (PDF)' ) ?></h2>
                <div class="mx-auto w-4rem">
                    <?php //phpcs:ignore ?>
                    <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/pdf-icon.svg' ) ?>
                </div>
                <div class="position-relative">
                    <div class="grid | grid-min-24rem">
                        <div class="resource-card rounded shadow p-0 d-flex align-items-end bg-white gap-0">
                            <div class="cover center | w-100 bg-brand-lighter rounded show-for-large">
                                <div class="w-60 p0">
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/pdf-placeholder.svg' ) ?>" alt="document placeholder">
                                </div>
                            </div>
                            <div class="stack center">
                                <h3 class="brand h4"><?php echo esc_html__( 'S.O.A.P.S Bible Study Guide', 'zume' ) ?></h3>
                                <p><?php echo esc_html__( "A great pattern for studying God's word", 'zume' ) ?></p>
                                <div class="center stack--1">
                                    <img class="w-20" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/download-icon-01.svg' ) ?>" alt="download image">
                                    <button class="btn light uppercase" data-open="register-modal"><?php echo esc_html__( 'Download', 'zume' ) ?></button>
                                </div>
                            </div>
                        </div>
                        <div class="resource-card rounded shadow p-0 d-flex align-items-end bg-white gap-0">
                            <div class="cover center | w-100 bg-brand-lighter rounded show-for-large">
                                <div class="w-60 p0">
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/pdf-placeholder.svg' ) ?>" alt="document placeholder">
                                </div>
                            </div>
                            <div class="stack center">
                                <h3 class="brand h4"><?php echo esc_html__( 'Prayer Wheel', 'zume' ) ?></h3>
                                <p><?php echo esc_html__( 'Bible sized Prayer Wheel to take where ever you pray.', 'zume' ) ?></p>
                                <div class="center stack--1">
                                    <img class="w-20" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/download-icon-01.svg' ) ?>" alt="download image">
                                    <button class="btn light uppercase" data-open="register-modal"><?php echo esc_html__( 'Download', 'zume' ) ?></button>
                                </div>
                            </div>
                        </div>
                        <div class="resource-card rounded shadow p-0 d-flex align-items-end bg-white gap-0">
                            <div class="cover center | w-100 bg-brand-lighter rounded show-for-large">
                                <div class="w-60 p0">
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/pdf-placeholder.svg' ) ?>" alt="document placeholder">
                                </div>
                            </div>
                            <div class="stack center">
                                <h3 class="brand h4"><?php echo esc_html__( 'S.O.A.P.S Bible Study Guide', 'zume' ) ?></h3>
                                <p><?php echo esc_html__( "A great pattern for studying God's word", 'zume' ) ?></p>
                                <div class="center stack--1">
                                    <img class="w-20" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/download-icon-01.svg' ) ?>" alt="download image">
                                    <button class="btn light uppercase" data-open="register-modal"><?php echo esc_html__( 'Download', 'zume' ) ?></button>
                                </div>
                            </div>
                        </div>
                        <div class="resource-card rounded shadow p-0 d-flex align-items-end bg-white gap-0">
                            <div class="cover center | w-100 bg-brand-lighter rounded show-for-large">
                                <div class="w-60 p0">
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/pdf-placeholder.svg' ) ?>" alt="document placeholder">
                                </div>
                            </div>
                            <div class="stack center">
                                <h3 class="brand h4"><?php echo esc_html__( 'Prayer Wheel', 'zume' ) ?></h3>
                                <p><?php echo esc_html__( 'Bible sized Prayer Wheel to take where ever you pray.', 'zume' ) ?></p>
                                <div class="center stack--1">
                                    <img class="w-20" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/download-icon-01.svg' ) ?>" alt="download image">
                                    <button class="btn light uppercase" data-open="register-modal"><?php echo esc_html__( 'Download', 'zume' ) ?></button>
                                </div>
                            </div>
                        </div>
                        <div class="resource-card rounded shadow p-0 d-flex align-items-end bg-white gap-0">
                            <div class="cover center | w-100 bg-brand-lighter rounded show-for-large">
                                <div class="w-60 p0">
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/pdf-placeholder.svg' ) ?>" alt="document placeholder">
                                </div>
                            </div>
                            <div class="stack center">
                                <h3 class="brand h4"><?php echo esc_html__( 'S.O.A.P.S Bible Study Guide', 'zume' ) ?></h3>
                                <p><?php echo esc_html__( "A great pattern for studying God's word", 'zume' ) ?></p>
                                <div class="center stack--1">
                                    <img class="w-20" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/download-icon-01.svg' ) ?>" alt="download image">
                                    <button class="btn light uppercase" data-open="register-modal"><?php echo esc_html__( 'Download', 'zume' ) ?></button>
                                </div>
                            </div>
                        </div>
                        <div class="resource-card rounded shadow p-0 d-flex align-items-end bg-white gap-0">
                            <div class="cover center | w-100 bg-brand-lighter rounded show-for-large">
                                <div class="w-60 p0">
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/pdf-placeholder.svg' ) ?>" alt="document placeholder">
                                </div>
                            </div>
                            <div class="stack center">
                                <h3 class="brand h4"><?php echo esc_html__( 'Prayer Wheel', 'zume' ) ?></h3>
                                <p><?php echo esc_html__( 'Bible sized Prayer Wheel to take where ever you pray.', 'zume' ) ?></p>
                                <div class="center stack--1">
                                    <img class="w-20" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/download-icon-01.svg' ) ?>" alt="download image">
                                    <button class="btn light uppercase" data-open="register-modal"><?php echo esc_html__( 'Download', 'zume' ) ?></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <?php if ( !is_user_logged_in() ) : ?>

                        <div class="absolute bottom left right h-16rem bg-gray-100 | resources-cover"></div>

                    <?php endif; ?>

                </div>


                <?php if ( !is_user_logged_in() ) : ?>

                    <p class="text-center bold f-1"><?php echo esc_html__( 'FULL ACCESS to Zume resources for all registered users.', 'zume' ) ?></p>

                    <a href="<?php echo esc_url( dt_login_url( 'register' ) ) ?>" class="btn light large uppercase mx-auto fit-content my-3"><?php echo esc_html__( 'Register Free', 'zume' ) ?></a>

                <?php endif; ?>

            </div>
        </div>

        <div class="rounded shadow border-1 | reveal" id="register-modal" data-reveal>
            <button class="ms-auto d-block" data-close aria-label="Close modal" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="switcher | switcher-width-10">
                <img class="h-16rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Thinking-01.svg' ) ?>" alt="man thinking">
                <div class="stack-2 | grow-4 justify-content-center text-center">
                    <p><?php echo esc_html__( 'Would you like access to all Zume Training resources?', 'zume' ) ?></p>
                    <a href="<?php echo esc_url( dt_login_url( 'register' ) ) ?>" class="btn light uppercase large"><?php echo esc_html__( 'Register Free', 'zume' ) ?></a>
                </div>
            </div>

        </div>
        <?php
    }
}
Zume_Training_Guidebook::instance();
