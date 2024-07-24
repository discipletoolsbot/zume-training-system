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

        $page_slug = $url_parts[0] ?? '';
        $this->lang_code = $lang_code;

        if ( isset( $page_slug ) && !empty( $page_slug ) ) {
            global $wpdb;

            $this->postid = $wpdb->get_var( $wpdb->prepare( 'SELECT ID FROM zume_posts WHERE post_name = %s AND post_type = %s', $url_parts[0], 'zume_pieces' ) );
            if ( ! $this->postid ) {
                return;
            }

            $this->page_title = get_the_title( $this->postid );
            $this->meta = get_post_meta( $this->postid );


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
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <?php
    }

    public function body(){
        require __DIR__ . '/../parts/nav.php';

        pieces_content( $this->postid, $this->lang_code, [
            'wtv' => esc_html__( 'Watch This Video', 'zume' ),
            'ay' => esc_html__( 'Ask Yourself', 'zume' ),
            'd' => esc_html__( 'Download Free Guidebook', 'zume' ),
            'lra' => esc_html__( 'Listen and Read Along', 'zume' ),
        ] );
    }
}
Zume_Training_Pieces_URL::instance();
