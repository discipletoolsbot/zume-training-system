<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Checkin_Dashboard extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Dashboard / Checkin';
    public $root = 'app';
    public $type = 'checkin-dashboard';
    public $lang = 'en_US';
    public $lang_code = 'en';
    public $base_url = '';
    public static $token = 'app_checkin_dashboard';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = esc_html__( 'Checkin', 'zume' ) . ' - ' . esc_html__( 'Dashboard', 'zume' );

        $this->lang = get_locale();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang_code = $lang_code;

        $page_slug = $url_parts[0] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            if ( $lang_code === 'en' ) {
                $this->base_url = '/' . $page_slug;
            } else {
                $this->base_url = '/' . $lang_code . '/' . $page_slug;
            }

            $this->require_authentication();

            $this->register_url_and_access();
            $this->header_content();

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
        $allowed_js[] = 'zume_forms';
        $allowed_js[] = 'zume-profile-utilities';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
        global $zume_languages_by_code;
        ?>
        <?php //phpcs:ignore ?>
        <script src="<?php echo trailingslashit( plugin_dir_url( __DIR__ ) ) . 'profile/profile-utilities.js?version=' . filemtime( trailingslashit( plugin_dir_path( __DIR__ ) ) . 'profile/profile-utilities.js' ) ?>"></script>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <script>
            const jsObject = [<?php echo json_encode([
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'language' => $this->lang_code,
                'site_url' => get_site_url(),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'user_stage' => zume_get_user_stage(),
                'training_items' => zume_training_items(),
                'host_progress' => zume_get_user_host(),
                'share_translations' => Zume_Training_Share::translations(),
                'translations' => $this->translations(),
            ]) ?>][0]
        </script>

        <?php
    }

    public function body(){

        /* Get the session that we have just checked into */
        $url = new DT_URL( dt_get_url_path() );
        $code = $url->query_params->get( 'code' );

        $checkin_keys = zume_session_alias_keys();

        $session_key = isset( $checkin_keys[$code] ) ? $checkin_keys[$code] : '';

        $error = false;
        if ( !empty( $session_key ) ) {
            $key_parts = explode( '_', $session_key );
            switch ( $key_parts[1] ) {
                case 'a':
                    $number_of_sessions = 10;
                    break;
                case 'b':
                    $number_of_sessions = 20;
                    break;
                case 'c':
                    $number_of_sessions = 5;
                    break;
                default:
                    $number_of_sessions = 0;
                    $error = true;
                    break;
            }
            $session_number = intval( $key_parts[2] );
            $percentage_progress = ceil( $session_number / $number_of_sessions * 100 );
        } else {
            $error = true;
        }

        ?>

            <?php require __DIR__ . '/../parts/nav.php'; ?>
            <div class="text-center">

                <?php if ( $error ) : ?>

                    <h1 class="h2 brand-light mb0"><?php echo esc_html__( 'Woops', 'zume' ) ?></h1>
                    <hr class="mt0">
                    <p><?php echo esc_html__( 'Something went wrong with your checkin process.', 'zume' ) ?></p>
                    <a href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn "><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>

                <?php else : ?>

                    <h1 class="h2 brand-light mb0"><?php echo esc_html__( 'Congratulations!', 'zume' ) ?></h1>
                    <hr class="mt0">
                    <div class="container-md stack-2 | py-0">
                        <div><span class="icon z-icon-check-mark success f-7 border-circle p--2" data-border-color="success" data-border-width="7"></span></div>
                        <div class="stack">
                            <h2 class="h3 brand-light"><?php echo esc_html__( 'Checked into session:', 'zume' ) ?></h2>
                            <p class="bold f-5"><?php echo esc_html( sprintf( __( '%1$d of %2$d', 'zume' ), $session_number, $number_of_sessions ) ) ?></p>
                        </div>
                        <div class="stack">
                            <h2 class="h3 brand-light"><?php echo esc_html__( 'Course Progress:', 'zume' ) ?></h2>
                            <p class="bold f-5"><?php echo esc_html( sprintf( __( '%d%%', 'zume' ), $percentage_progress ) ) ?></p>
                        </div>
                        <a href="<?php echo esc_url( zume_dashboard_page_url( 'my-progress' ) ) ?>" class="btn "><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>
                    </div>

                <?php endif; ?>

            </div>

        <?php
    }

    public static function translations() {
        return [];
    }
}
Zume_Training_Checkin_Dashboard::instance();
