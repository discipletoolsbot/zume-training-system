<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Resources extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'resources';
    public $lang = 'en';
    public static $token = 'app_resources';

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

        $this->page_title = esc_html__( 'Resources', 'zume' );
        $this->page_description = esc_html__( 'Downloadable resources to help with running a zume training.', 'zume' );

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
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
        $zume_current_language = zume_current_language();
        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container-md stack-2 | py-1 w-70">
            <h1 class="text-center"><?php echo esc_html__( 'Resources', 'zume' ) ?></h1>
            <div class="mx-auto w-3rem brand-lighter s--1">
                <?php //phpcs:ignore ?>
                <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/Zume-Z-crop.svg' ) ?>
            </div>
        </div>
        <hr>

        <!-- Guidebook Section -->
        <div class="container-md stack-2 | py-1 w-70">
            <div class="switcher | gap-3">
                <div class="stack-1 | grow-2">
                    <h2 class="brand h3 cluster align-items-center gap-1">
                        <img class="w-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/guys-reading.svg' ) ?>" alt="guys reading">
                        <?php echo esc_html__( 'Training Guidebook', 'zume' ) ?>
                    </h2>
                    <p>
                        <?php echo esc_html__( 'Zúme Training is now available in a complete workbook. All the concepts, tools, discussion questions and challenges from the training now in the palm of your hands. QR codes for every session give you access to all the video content as well!', 'zume' ) ?>
                    </p>
                    <div class="cluster">
                        <a class="btn px--6" target="_blank" href="<?php echo esc_url( zume_download_url( '33', $zume_current_language ) ) ?>"><?php echo esc_html__( 'Free Download (PDF)', 'zume' ) ?></a>
                        <?php if ( 'en' === $zume_current_language ) { ?>
                            <a class="btn outline px--6" target="_blank" href="https://missionbooks.org/products/zume-training"><?php echo esc_html__( 'Order print copy', 'zume' ) ?></a>
                        <?php }  ?>
                    </div>
                </div>
                <div class="stack center | text-center">
                    <img class="w-16rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/workbooksample.png' ) ?>" alt="zume training book">
                </div>
            </div>
        </div>

        <?php include( trailingslashit( plugin_dir_path( __DIR__ ) ) . 'parts/download-slides.php' ) ?>

        <br></br>
        <br></br>
        <br></br>

        <?php
    }
}
Zume_Training_Resources::instance();
