<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Activites_Genmap extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Activity - Generation Mapping';
    public $root = 'zume_activity';
    public $type = 'genmap';
    public $lang;
    public static $token = 'zume_activity_genmap';

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
        zume_activities_css();
    }

    public function body(){
        ?>
        <div class="zume-activity">
            <div class="zume-activity-header">
                <h1><?php echo __( 'Generation Mapping', 'zume' )  ?></h1>
                <hr>
            </div>
            <div class="zume-activity-content">
                Generational mapping (a.k.a. generation mapping or gen mapping) is another simple tool to help leaders in a movement understand the growth around them.<br></br>
                A generation tree map can be drawn on a piece of paper or multiple pieces of paper. This map helps show where there are stops in multiplication and training might be required. Health of the movement is a top concern for leaders and fruitfulness is a top way to measure health.<br></br>
                See the example on the next slide.<br></br>
                <img src="https://storage.googleapis.com/zume-file-mirror/en/104.png" alt="Generation Map" style="width: 100%; max-width: 600px; margin: 0 auto; display: block;">
            </div>
        </div>
        <?php
    }
}
Zume_Activites_Genmap::instance();
