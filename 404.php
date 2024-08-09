<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Training_404 extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = '404';
    public $lang = 'en_US';
    public static $token = 'app_home';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        global $wp_query;
        parent::__construct();

        if ( is_404() ) {

            $this->magic = new DT_Magic_URL( $this->root );
            $this->parts = $this->magic->parse_url_parts();

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
        ?>

        <?php require __DIR__ . '/site/parts/nav.php'; ?>

        <div class="container-md stack-2 center | page">
            <h1 class="text-center"><?php echo esc_html__( 'Epic 404 - Not Found', 'zume' ) ?></h1>
            <h2 class="h3 brand"><?php echo esc_html__( 'The page you were looking for was not found or was deleted', 'zume' ) ?></h2>
            <ul class="bullets">
                <li><a href="<?php esc_url( zume_home_url() ) ?>"><?php echo esc_html__( 'Home', 'zume' ) ?></a></li>
                <li><a href="<?php esc_url( zume_about_url() ) ?>"><?php echo esc_html__( 'About', 'zume' ) ?></a></li>
                <li><a href="<?php esc_url( zume_dashboard_url() ) ?>"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a></li>
            </ul>

            <launch-course
                translations="<?php echo esc_attr( json_encode( [
                    'launch_course' => __( 'Launch Course', 'zume' ),
                    'ten_session_course' => __( '10 Session Course', 'zume' ),
                    'twenty_session_course' => __( '20 Session Course', 'zume' ),
                    'three_day_intensive_course' => __( '3 Day Intensive Course', 'zume' ),
                ] ) ) ?>"
                urls="<?php echo esc_attr( json_encode( [
                    'launch_ten_session_course' => zume_10_session_url(),
                    'launch_twenty_session_course' => zume_20_session_url(),
                    'launch_intensive_session_course' => zume_intensive_session_url(),
                ] ) ) ?>"
                position="top"
            ></launch-course>
        </div>

        <?php
    }
}
Zume_Training_404::instance();

