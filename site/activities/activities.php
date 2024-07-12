<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $lang;
    public $language_code = 'en';

    public $page_title = 'Zúme Activity';
    public $page_description = '';
    public $root = 'activities';
    public $type = 'base';
    public static $token = 'zume_activity_base';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) );

        [
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        $this->lang = $lang_code ?? $this->lang;

        if ( $this->url_matches_this_activity() ) {

            $this->language_code = $lang_code;

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

    public function url_matches_this_activity() {
        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        return isset( $url_parts[0] ) && $this->root === $url_parts[0] && isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest();
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
            jQuery(document).ready(function($){
                document.cookie = "zume_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            });
        </script>
        <?php
    }
    public function body(){
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT ID FROM zume_posts p WHERE p.post_type = 'zume_activities' AND p.post_title = %s", $this->type );

        //phpcs:ignore
        $post_id = $wpdb->get_var( $sql );

        ?>
        <div class="activity content">
            <header class="bg-brand">
                <div class="container-md | activity-header">
                    <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                </div>
            </header>
            <div class="container-md">
                <h1 class="activity-title"><?php self::content_header( $post_id ); ?></h1>
            </div>
            <hr>
            <div class="container-md activity-content">
                <?php self::content_body( $post_id ); ?>
            </div>
        </div>
        </hr>
        <?php
    }
    public function content_header( $post_id ){
        $title = get_post_meta( $post_id, 'title_'.$this->language_code, true );
        echo wp_kses( $title, 'post' );
    }
    public function content_body( $post_id ){
        $content = zume_replace_placeholder( get_post_meta( $post_id, 'content_'.$this->language_code, true ), $this->language_code );
        echo wp_kses( $content, 'post' );
    }
}
Zume_Activites::instance();

//phpcs:ignore
class Zume_Activites_SOAPS extends Zume_Activites
{
    public $page_title = 'Zúme Activity - SOAPS';
    public $root = 'activities';
    public $type = 'soaps';
    public static $token = 'zume_activity_soaps';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_SOAPS::instance();

//phpcs:ignore
class Zume_Activites_Accountability extends Zume_Activites
{
    public $page_title = 'Zúme Activity - Accountability';
    public $root = 'activities';
    public $type = 'accountability';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'SOAPS', 'zume' );
    }
}
Zume_Activites_Accountability::instance();

//phpcs:ignore
class Zume_Activites_Prayer_Cycle extends Zume_Activites
{
    public $page_title = 'Zúme Activity - Prayer Cycle';
    public $root = 'activities';
    public $type = 'prayercycle';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'Prayer Cycle', 'zume' );
    }
}
Zume_Activites_Prayer_Cycle::instance();

//phpcs:ignore
class Zume_Activites_Sharegospel extends Zume_Activites
{
    public $page_title = 'Zúme Activity - Share the Gospel';
    public $root = 'activities';
    public $type = 'sharegospel';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'Share the Gospel', 'zume' );
    }
}
Zume_Activites_Sharegospel::instance();

//phpcs:ignore
class Zume_Activites_Sharetestimony extends Zume_Activites
{
    public $page_title = 'Zúme Activity - Share Testimony';
    public $root = 'activities';
    public $type = 'sharetestimony';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'Three-Minute Testimony', 'zume' );
    }
}
Zume_Activites_Sharetestimony::instance();

//phpcs:ignore
class Zume_Activites_Supper extends Zume_Activites
{
    public $page_title = 'Zúme Activity - Lords Supper';
    public $root = 'activities';
    public $type = 'lordssupper';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'The Lord’s Supper', 'zume' );
    }
}
Zume_Activites_Supper::instance();

//phpcs:ignore
class Zume_Activites_Bless extends Zume_Activites
{
    public $page_title = 'Zúme Activity - Blessing Prayer';
    public $root = 'activities';
    public $type = 'blessprayer';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'B.L.E.S.S. Prayer', 'zume' );
    }
}
Zume_Activites_Bless::instance();

//phpcs:ignore
class Zume_Activites_33group extends Zume_Activites
{
    public $page_title = 'Zúme Activity - 3/3 Group Meeting';
    public $root = 'activities';
    public $type = '33group';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( '3/3 Group Meeting', 'zume' );
    }
}
Zume_Activites_33group::instance();

//phpcs:ignore
class Zume_Activites_Prayerwalk extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'activities';
    public $type = 'prayerwalking';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'Prayer Walking', 'zume' );
    }
}
Zume_Activites_Prayerwalk::instance();

//phpcs:ignore
class Zume_Activites_Peermentoring extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'activities';
    public $type = 'peermentoring';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'Peer Mentoring', 'zume' );
    }
}
Zume_Activites_Peermentoring::instance();

//phpcs:ignore
class Zume_Activites_4fields extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'activities';
    public $type = '4fields';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'Four Fields', 'zume' );
    }
}
Zume_Activites_4fields::instance();

//phpcs:ignore
class Zume_Activites_Genmap extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'activities';
    public $type = 'genmapping';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) ) . ' - ' . esc_html__( 'Generational Mapping', 'zume' );
    }
}
Zume_Activites_Genmap::instance();


