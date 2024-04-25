<?php


class Zume_Training_Pieces_URL extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Title';
    public $root = 'starter_app';
    public $type = 'home';
    public $postid = false;
    public $lang = 'en';
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
        $this->lang = $lang_code;

        if ( isset( $page_slug ) && !empty( $page_slug ) ) {
            global $wpdb, $table_prefix;

            $this->postid = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM {$table_prefix}posts WHERE post_name = %s AND post_type = %s", $url_parts[0], 'zume_pieces' ) );
            if ( ! $this->postid ) {
                return;
            }

            $this->page_title = get_the_title( $this->postid );
            $this->meta = get_post_meta( $this->postid );


            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', '__return_true', 100, 1 ); // allows non-logged in visit
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

        pieces_content( $this->postid, $this->lang, [
            'wtv' => esc_html__( 'Watch This Video', 'zume' ),
            'ay' => esc_html__( 'Ask Yourself', 'zume' ),
            'd' => esc_html__( 'Download Free Guidebook', 'zume' ),
            'lra' => esc_html__( 'Listen and Read Along', 'zume' ),
        ] );
    }
}
Zume_Training_Pieces_URL::instance();
