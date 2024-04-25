<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Messages extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $lang;
    public $language_code = 'en';

    public $page_title = 'Zúme Activity';
    public $root = 'zume_app';
    public $type = 'message';
    public static $token = 'zume_app_message';

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

            $this->language_code = $lang_code;

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
        ?>
        <script>
            jQuery(document).ready(function($){
                document.cookie = "zume_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            });
        </script>
        <style>
            .email-wrapper {
                width: 700px;
                border: 1px solid #ccc;
                padding: 1em;
                margin:0 auto;
                shadow: 1px 1px 1px #ccc;
            }
        </style>
        <?php
    }
    public function body(){
        /* missing params */
        if ( ! isset( $_GET['l'], $_GET['m'] ) ) {
            $this->not_found();
            return;
        }

        $language_code = sanitize_key( $_GET['l'] );
        $message_id = sanitize_key( $_GET['m'] );
        $message = $this->query_message( $language_code, $message_id );

        if ( empty($message) ) {
            $this->not_found();
            return;
        } else {
            ?>
            <br></br>
            <div class="email-wrapper">
                <strong>Subject</strong>:
            </div>
            <div class="email-wrapper">
                <div class="email-subject">
                    <?php echo $message['subject'] ?>
                </div>
            </div>



            <div class="email-wrapper">
                <strong>Body:</strong>:
            </div>
            <div class="email-wrapper">
                <html>
                <head>
                    <style>
                        h1{ color: green; }
                    </style>
                </head>
                <body>
                    <div class="activity-page">
                        <header class="bg-brand">
                            <div class="container-md | activity-header" style=" margin-bottom:20px;">
                                <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                            </div>
                        </header>
                        <div class="container-md activity-content center">
                            <?php echo $message['body'] ?>
                        </div>
                    </div> <!-- activity page -->
                </body>
                </html>
            </div> <!-- wrapper-->
            <?php
        }
    }

    public function query_message( $language_code, $message_id ) {
        global $wpdb;

        $subject_key = 'subject_'.$language_code;
        $body_key = 'body_'.$language_code;

        $sql = $wpdb->prepare( "SELECT p.ID, p.post_title, pm.meta_value as subject, pm1.meta_value as body
                                FROM zume_posts p
                                LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = %s
                                LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = %s
                                WHERE p.ID = %s
                                  AND p.post_type = 'zume_messages'
                                  LIMIT 1;", $subject_key, $body_key, $message_id );
        $message = $wpdb->get_row( $sql, ARRAY_A );

        if ( empty($message) ) {
            return false;
        }
        return $message;
    }

    public function not_found(){
        ?>
        <div class="activity-page">
            <header class="bg-brand">
                <div class="container-md | activity-header">
                    <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                </div>
            </header>
            <div class="container-md">
                <h1 class="activity-title">Not Found</h1>
            </div>
            <div class="container-md activity-content center">
                <p>Sorry, the page you are looking for could not be found.</p>
            </div>
        </div>
        <?php
    }

}
Zume_Messages::instance();
