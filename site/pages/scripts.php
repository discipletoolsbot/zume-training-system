<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Scripts extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Script';
    public $root = 'app';
    public $type = 'script';
    public $lang;
    public static $token = 'app_script';

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
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang = get_locale();

        if ( isset( $url_parts[0] ) && $this->root === $url_parts[0] && isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

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
        <style>
            .activity__wrapper {
                font-size: 1.2em;
                padding: 1em;
                max-width: 800px;
                width: 100%;
                margin-left: auto;
                margin-right: auto;
            }
            .activity__content {
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
        </style>
        <?php
    }

    public function body(){
        if ( ! isset( $_GET['s'] ) || empty( $_GET['s'] ) ) {
            ?>
                <div class="activity__wrapper">
                    <div class="text-center">
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

        $script_id = sanitize_text_field( wp_unslash( $_GET['s'] ) );

        $sql = $wpdb->prepare(
            "SELECT pm.meta_value
                FROM zume_posts p
                JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = %s
                WHERE p.post_type = 'zume_scripts'
                AND p.post_title = %s
            ", $script_id, $language_code );
        //phpcs:ignore
        $body = $wpdb->get_var( $sql );

        $training_items = zume_training_items_by_script();

        if ( empty( $body ) ) {
            ?>
                <div class="activity__wrapper">
                    <div class="text-center">
                        <h1>Script not yet translated</h1><hr>
                    </div>
                    <div class="activity__content">
                    </div>
                </div>
            <?php
            return;
        } else {
            $this->page_title = esc_html( $training_items[$script_id]['title'] ) ?? ''

            ?>
            <div class="activity__wrapper activity content">
                <div class="text-center">
                    <h1><?php echo esc_html( $training_items[$script_id]['title'] ) ?? '' ?></h1>
                    <hr>
                </div>
                <div class="activity__content">
                    <?php echo wp_kses( zume_replace_placeholder( $body, $language_code ), 'post' ) ?>
                </div>
            </div>
            <?php
        }
    }
}
Zume_Scripts::instance();
