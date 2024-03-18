<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Activites_3monthplan extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Activity - 3-Month Plan';
    public $root = 'zume_activity';
    public $type = '3monthplan';
    public $lang;
    public static $token = 'zume_activity_3monthplan';

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
                <h1><?php echo __( 'Three-Month Plan', 'zume' )  ?></h1>
                <hr>
            </div>
            <div class="zume-activity-content">
                In His Bible, God says, "I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future."<br></br>
                God makes plans, and He expects us to make plans, too.<br></br>
                A Three Month Plan is a tool you can use to help focus your attention and efforts and keep them aligned with God’s priorities for making disciples who multiply.<br></br>
                The next slide will show you how to make your Three Month Plan. We recommend using the online tool.<br></br>
                <h3>Make Your Three Month Plan</h3>
                Review Questions - All questions are optional, and intended as prompts for your plan. (5 min)<br></br>
                Listen - Take time to be as quiet as possible and listen to what God chooses to reveal. (10 min)<br></br>
                Write Plan - Respond to worksheet questions and use a piece of paper or the QR code to save your answers. (15 min)<br></br>
            </div>
        </div>
        <?php
    }
}
Zume_Activites_3monthplan::instance();
