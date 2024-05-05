<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Messages extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $lang;
    public $language_code = 'en';

    public $page_title = 'Zúme Messages';
    public $root = 'app';
    public $type = 'message';
    public static $token = 'app_message';

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
        if(!is_user_logged_in()) { // test if logged in
            $param = '';
            if ( isset( $_GET['m'] ) ) {
                $param = '?m=' . $_GET['m'];
            }
            if ( $this->language_code === 'en'  ) {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->root . '/' . $this->type . $param) );
            } else {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->language_code . '/' . $this->root . '/' . $this->type . $param  ) );
            }
        }
        global $zume_user_profile;
        $messages = [];
        if ( isset( $_GET['m'] ) ) {
            $messages[] = sanitize_key( $_GET['m'] );
        } else {
            $messages = $this->query_all_message_ids();
        }

        $language_code = $this->language_code;
        foreach ( $messages as $message_id ) {
            $message = $this->query_message( $language_code, $message_id );
            $this->print_message( $message);
        }

    }

    public function print_message( $message ) {
        global $zume_user_profile;
        ?>
        <br></br>
        <div class="email-wrapper">
            <strong>Marketing Logic</strong>: <span style="float:right;font-weight:bold;">(User Stage: <?php echo ucwords( $message['stage'] ) ?>)</span>
        </div>
        <div class="email-wrapper">
            <div>
                <?php echo $message['logic'] ?>
            </div>
        </div>
        <div class="email-wrapper">
            <strong>Email Subject</strong>:
        </div>
        <div class="email-wrapper">
            <div class="email-subject">
                <?php echo $message['subject'] ?>
            </div>
        </div>

        <div class="email-wrapper">
            <strong>Email Body</strong>:
        </div>
        <div class="email-wrapper">
            <html>
            <head>
                <style>
                    #zmail {}
                    #zmail .zmail-body {
                        padding: .5em;
                    }
                    #zmail .zmail-header {}
                    #zmail .zmail-footer {
                        padding: 1em .5em;
                        background-color: #f5f5f5;
                        border-top: 1px solid #ccc;
                        font-size: .8em;
                        text-align: center;
                    }
                    #zmail h3 {
                        font-size: 1.5em;
                        margin: 0;
                        font-weight: 700;
                        padding-bottom: .8em;
                    }
                    #zmail .zmail-topbar {
                        background-color: #008cc7;
                        color: white;
                        padding-block: .3em;
                        display: flex;
                        align-items: center;
                    }
                    #zmail .zmail-logo {
                        margin: 0 auto;
                    }
                    #zmail .zmail-logo img {
                        max-width: 100%;
                        display: block;
                        vertical-align: middle;
                        height: 3em;
                    }
                    #zmail .button.primary-button-hollow {
                        color: white;
                        background-color: #008cc7;
                        border: 1px solid #008cc7;
                        padding: .5em 1em;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        border-radius: 5px;
                        font-size: .9rem;
                        transition: background-color .25s ease-out, color .25s ease-out;
                    }
                    #zmail .button.primary-button-hollow.large {
                        background-color: #008cc7;
                        color: white;
                        border: 1px solid #008cc7;
                        padding: .5em 1em;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        border-radius: 5px;
                        font-size: 1.5em;
                        transition: background-color .25s ease-out, color .25s ease-out;
                    }
                    #zmail ul {
                        margin-bottom: 1em;
                    }
                    #zmail ul li {
                        padding: 0 1em;
                        margin-left: 50px;
                        margin-right: 50px;
                        list-style-type: disc;
                        list-style-position: outside;
                        line-height: 1.5;
                    }
                    #zmail strong {
                        font-weight: 600;
                        color: #008cc7;
                    }
                </style>
            </head>
            <body>
            <div id="zmail">
                <header class="zmail-header">
                    <div class="zmail-topbar" style="margin-bottom:20px;">
                        <div class="zmail-logo"><img src="<?php echo  zume_mirror_url() . 'images/zume-training-logo-white-short.svg' ?>" alt="logo"></div>
                    </div>
                </header>
                <?php
                if ( $zume_user_profile['has_set_name'] ) {
                    ?>
                    <div class="zmail-body">
                        <?php echo $zume_user_profile['name'] ?>,
                    </div>
                    <?php
                } else {
                    ?>
                    <div class="zmail-body">
                        <?php echo __( 'Friend', 'zume' ) ?>
                    </div>
                    <?php
                }
                ?>
                <div class="zmail-body">
                    <?php echo $message['body'] ?>
                </div>
                <div class="zmail-footer-divider"></div>
                <div class="zmail-footer">
                    <p><img src="<?php echo  zume_mirror_url() . 'images/zume-training-logo.svg' ?>" alt="logo" style="height:40px; margin: 1em auto;"></p>
                    <p><?php echo __( 'Zúme Training exists to saturate the globe with multiplying disciples in our generation.', 'zume' ) ?></p>
                    <a href="https://zume.vision"><?php echo __( 'Explore the Vision', 'zume' ) ?></a><br>
                    <a href="<?php echo zume_dashboard_url(); ?>"><?php echo __( 'Zúme Training Dashboard', 'zume' ) ?></a><br>
                    <a href=""><?php echo __( 'Update Your Communication Preferences', 'zume' ) ?></a><br><br>
                    <p style="width:60%;margin:0 auto;"><a href="<?php echo zume_get_a_coach_wizard_url(); ?>"><?php echo __( 'Get a Coach', 'zume' ) ?></a> | <a href="<?php echo zume_join_the_community_wizard_url(); ?>"><?php echo __( 'Join the Zúme Community', 'zume' ) ?></a> | 109 S. Main Street, Mooreland, OK 73852 USA | <a href="<?php echo zume_donate_url(); ?>"><?php echo __( 'Donate', 'zume' ) ?></a></p>
                </div>
            </div> <!-- activity page -->
            </body>
            </html>
        </div> <!-- wrapper-->
        <?php
    }

    public function query_message( $language_code, $message_id ) {
        global $wpdb;

        $subject_key = 'subject_'.$language_code;
        $body_key = 'body_'.$language_code;

        $sql = $wpdb->prepare( "SELECT p.ID, p.post_title, pm.post_id, pm.meta_value as subject, pm1.meta_value as body, pm2.meta_value as logic, pm3.meta_value as stage
                                        FROM zume_posts p
                                        LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = %s
                                        LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = %s
										LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'logic'
										LEFT JOIN zume_postmeta pm3 ON pm3.post_id=p.ID AND pm3.meta_key = 'stage'
                                        WHERE p.ID = %s
                                          AND p.post_type = 'zume_messages'
                                          LIMIT 1;
                                          ", $subject_key, $body_key, $message_id );
        $message = $wpdb->get_row( $sql, ARRAY_A );

        if ( empty($message) ) {
            return false;
        }
        return $message;
    }

    public function query_all_message_ids() {
        global $wpdb;

        $messages = $wpdb->get_col( "SELECT p.ID FROM zume_posts p WHERE p.post_type = 'zume_messages';" );

        if ( empty($messages) ) {
            return false;
        }
        return $messages;
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
