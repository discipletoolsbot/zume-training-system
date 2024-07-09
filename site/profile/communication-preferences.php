<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Communication_Preferences extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Communication Preferences';
    public $root = 'app';
    public $type = 'communication-preferences';
    public $lang = 'en_US';
    public static $token = 'app_communication_preferences';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = esc_html__( 'Update Communication Preferences', 'zume' );

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        if ( $url_parts[0] === $this->root && $url_parts[1] === $this->type && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();

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
        ?>

        <div class="page container stack-1">
            <h1 class="brand-light"><?php echo esc_html__( 'Update Communication Preferences', 'zume' ) ?></h1>
            <div class="stack">
                <h2 class="h3"><?php echo esc_html__( 'Recieve emails for:', 'zume' ) ?></h2>
                <div class="form-control brand-light">
                    <input type="checkbox" name="session-reminders" id="session-reminders">
                    <label for="session-reminders"><?php echo esc_html__( 'Training session reminders', 'zume' ) ?></label>
                </div>
                <div class="form-control brand-light">
                    <input type="checkbox" name="reporting-reminders" id="reporting-reminders">
                    <label for="reporting-reminders"><?php echo esc_html__( 'Annual reporting reminders', 'zume' ) ?></label>
                </div>
                <div class="form-control brand-light">
                    <input type="checkbox" name="community-updates" id="community-updates">
                    <label for="community-updates"><?php echo esc_html__( 'Community updates', 'zume' ) ?></label>
                </div>
                <div class="form-control brand-light">
                    <input type="checkbox" name="encouragements" id="encouragements">
                    <label for="encouragements"><?php echo esc_html__( 'Encouragements', 'zume' ) ?></label>
                </div>
            </div>
        </div>


        <?php
    }
}
Zume_Communication_Preferences::instance();
