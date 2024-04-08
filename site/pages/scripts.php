<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Scripts extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Script';
    public $root = 'zume_app';
    public $type = 'script';
    public $lang;
    public static $token = 'zume_app_script';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang = $lang_code ?? $this->lang;

        if ( isset( $url_parts[0] ) && $this->root === $url_parts[0] && isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

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

//            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
//            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css($allowed_css);
    }

    public function header_style(){
        ?>
        <style>
            .activity__wrapper {
                font-size: 1.2em;
                padding: 1em;
                max-width: 800px;
                width: 100%;
                margin: 0 auto;
            }
            .activity__header {
                text-align: center;
            }
            .activity__content {
                max-width: 600px;
                margin: 0 auto;
            }
            .activity__wrapper p {
                margin-bottom: 1em;
            }
            .activity__wrapper ul  {
                margin-bottom: 1em;
            }
        </style>
        <?php
    }

    public function body(){
        if ( ! isset( $_GET['s'] ) ||  empty($_GET['s'] ) ) {
            ?>
                <div class="activity__wrapper">
                    <div class="activity__header">
                        <h1>Not a valid script request</h1><hr>
                    </div>
                    <div class="activity__content">
                    </div>
                </div>
            <?php
            return;
        }


        global $wpdb;
        [
            'lang_code' => $language_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();
        $script_id = sanitize_text_field( $_GET['s'] );
        $meta_key = $script_id . '_script';

        $sql =  $wpdb->prepare(
            "SELECT pm.meta_value
                FROM zume_posts p
                JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = %s
                WHERE p.post_type = 'zume_download'
                AND p.post_title = %s"
            , $meta_key, $language_code );
        $body = $wpdb->get_var( $sql );

        $training_items = zume_training_items_by_script();

        if ( empty( $body ) ) {
            ?>
                <div class="activity__wrapper">
                    <div class="activity__header">
                        <h1>Script not yet translated</h1><hr>
                    </div>
                    <div class="activity__content">
                    </div>
                </div>
            <?php
            return;
        } else {
            ?>
            <div class="activity__wrapper">
                <div class="activity__header">
                    <h1><?php echo $training_items[$script_id]['title'] ?></h1>
                    <hr>
                </div>
                <div class="activity__content">
                    <?php echo $body ?>
                </div>
            </div>
            <?php
        }
    }
}
Zume_Scripts::instance();
