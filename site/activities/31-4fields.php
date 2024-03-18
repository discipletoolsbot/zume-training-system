<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Activites_4fields extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Activity - 4-Fields';
    public $root = 'zume_activity';
    public $type = '4fields';
    public $lang;
    public static $token = 'zume_activity_4fields';

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
                <h1><?php echo __( 'Four Fields Diagnostic Chart', 'zume' )  ?></h1>
                <hr>
            </div>
            <div class="zume-activity-content">
                The Four Fields diagnostic chart is a simple tool to be used by a leadership cell to reflect on the status of current efforts and the Kingdom activity around them.<br></br>
                Jesus often pulled the disciples back, away from ministry to quieter places to review how the work was going. This simple tool is to help you and the co-leaders with you to follow this pattern of Jesus and to address all parts of your stewardship.<br></br>
                Review the next two slides: Field Descriptions and Four Fields Example.<br></br>

                <img src="https://storage.googleapis.com/zume-file-mirror/en/98.png" alt="4 Fields" style="width: 100%; max-width: 600px; margin: 20px auto; display: block;">

                Field Descriptions<br></br>

                Empty Field: Where or with whom [what people groups] are you planning to extend the Kingdom?<br><br>
                Seeding Field: Where or with whom are you sharing the good news of the Kingdom? How are you doing that?<br><br>
                Growing Field: How are you equipping people and growing them spiritually, individually and in their natural networks?<br><br>
                Harvesting Field: How are new spiritual families [simple churches] being formed?<br><br>
                Multiplying Field: With whom, how and when are you filtering for faithful people and equipping them and holding them accountable for reproduction?<br><br>
            </div>
        </div>
        <?php
    }
}
Zume_Activites_4fields::instance();
