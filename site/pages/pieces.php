<?php
if ( !defined( 'ABSPATH' ) ) { exit; }

class Zume_Training_Pieces_URL extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Title';
    public $root = 'starter_app';
    public $type = 'home';
    public $postid = false;
    public $lang_code = 'en';
    public static $token = 'starter_app_home';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang_code = $lang_code;

        if ( isset( $url_parts[0] ) && !isset( $url_parts[1] ) && !empty( $url_parts[0] ) && 'wp-cron.php' !== $url_parts[0] ) {
            global $wpdb;

            // check slug
            $post_items = $wpdb->get_row( $wpdb->prepare(
                "SELECT p.ID as post_id, pm.meta_value as lang, pm1.meta_value as piece
                        FROM zume_posts p
                        LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
                        LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
                        WHERE post_name = %s
                        AND post_type = 'zume_pieces'
                        LIMIT 1",
            $lang_code, $url_parts[0] ), ARRAY_A );

            // no match, return
            if ( ! isset( $post_items['post_id'], $post_items['piece'] ) ) {
                return;
            }

            // no lang result, means mismatched slug with language code
            if ( $post_items['post_id'] && ! empty( $post_items['lang'] ) && $post_items['piece'] ) {
                $this->postid = $post_items['post_id'];
            }
            else if ( empty( $post_items['lang'] ) && $post_items['post_id'] ) {
                // if lang is null, but post_id is found, then the piece exists but the slug is wrong (language switching causes this)
                $new_slug = $wpdb->get_var( $wpdb->prepare(
                    "SELECT p.post_name
                            FROM zume_posts p
                            JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
                            JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece' AND pm1.meta_value = %s
                            WHERE post_type = 'zume_pieces';",
                $lang_code, $post_items['piece'] ) );
                if ( ! $new_slug ) {
                    return;
                } else {

                    $new_url = trailingslashit( site_url() ) . $lang_code . '/' . $new_slug;
                    wp_redirect( $new_url );
                    exit;
                }
            }

            // no post id found
            if ( ! $this->postid ) {
                return;
            }

            // set page title
            $this->page_title = get_post_meta( $this->postid , 'zume_piece_h1', true );
            if ( empty( $this->page_title ) ) {
                $this->page_title = get_the_title( $this->postid );
            }

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

        // dt_reports logger
        $logger_type = 'studying';
        $zume_piece_id = get_post_meta( $this->postid, 'zume_piece', true );
        $logger_subtype = $zume_piece_id.'_heard';
        zume_content_logger( $logger_type, $logger_subtype, $this->lang_code );
        ?>

        <script>
            jQuery(document).ready(() => {
                jQuery(document).foundation()
            })
        </script>

        <?php
    }

    public function header_script() {
    }

    public function body(){
        require __DIR__ . '/../parts/nav.php';

        pieces_content( $this->postid, $this->lang_code, [
            'wtv' => esc_html__( 'Watch This Video', 'zume' ),
            'ay' => esc_html__( 'Ask Yourself', 'zume' ),
            'd' => esc_html__( 'Download Free Guidebook', 'zume' ),
            'lra' => esc_html__( 'Listen and Read Along', 'zume' ),
            'vt' => esc_html__( 'View Transcript', 'zume' ),
        ] );
    }
}
Zume_Training_Pieces_URL::instance();
