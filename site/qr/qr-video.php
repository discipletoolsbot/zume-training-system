<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_QR_Video extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'QR Video';
    public $root = 'app';
    public $type = 'video';
    public $lang = 'en';
    public static $token = 'app_video';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
        $this->lang = get_locale();

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        if ( isset( $url_parts[0] ) && ( $this->root === $url_parts[0] && $this->type === $url_parts[1] ) && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
//            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

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

    }

    public function body(){
        if ( ! is_numeric( $_GET['id'] ) ) {
            die( 'Not the correct id type' );
        }
        $vimeo_id = sanitize_text_field( wp_unslash( $_GET['id'] ) );
        // https://zume.training/wp-content/themes/zume-training/video.php?id=551339739
        // https://zume.training/app/video/?id=551339739

        // @todo logo video load event in movement log

        ?>
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        </head>
        <body>
        <div style="padding:56.25% 0 0 0;position:absolute;top:0;bottom:0;left:0;right:0;">
            <iframe
                id="video-player"
                src="https://player.vimeo.com/video/<?php echo $vimeo_id ?>?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;h=fcfe2172a8"
                frameborder="0" allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
                style="position:absolute;top:0;left:0;width:100%;height:100%;max-height:100vh;"
                title="<?php echo $vimeo_id ?>">
            </iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
        </body>
        </html>
        <?php
    }
}
Zume_QR_Video::instance();
