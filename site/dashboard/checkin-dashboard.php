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
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
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
                'images_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '/assets/images' ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'user_stage' => zume_get_user_stage(),
                'training_items' => zume_training_items(),
                'session_keys' => zume_session_alias_keys(),
                'host_progress' => zume_get_user_host(),
                'session_items' => zume_training_items_for_session( $this->get_session_type() ),
                'profile' => zume_get_user_profile(),
                'share_translations' => Zume_Training_Share::translations(),
                'translations' => $this->translations(),
            ]) ?>][0]
        </script>

        <?php
    }

    private function get_session_type() {
        /* Get the session that we have just checked into */
        $url = new DT_URL( dt_get_url_path() );
        $code = $url->query_params->get( 'code' );

        $checkin_keys = zume_session_alias_keys();

        $session_key = isset( $checkin_keys[$code] ) ? $checkin_keys[$code] : '';

        if ( empty( $session_key ) ) {
            return '';
        }
        $key_parts = explode( '_', $session_key );

        return $key_parts[1];
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

            <?php require __DIR__ . '/../parts/checkin-nav.php'; ?>

            <div class="container-xsm">
                <checkin-dashboard></checkin-dashboard>
            </div>

        <?php
    }

    public static function translations() {
        return [
            'woops' => __( 'Woops', 'zume' ),
            'something_went_wrong' => __( 'Something went wrong with your checkin process.', 'zume' ),
            'dashboard' => __( 'Dashboard', 'zume' ),
            'check_off_items' => __( 'Check off any tools or concepts you have obeyed, shared or trained others with.', 'zume' ),
            'close' => __( 'Close', 'zume' ),
            'congratulations' => __( 'Congratulations', 'zume' ),
            'checked_in' => __( "You're checked in", 'zume' ),
            'learn_more' => __( 'Learn more', 'zume' ),
            'heard' => __( 'Heard', 'zume' ),
            'heard_explanation' => __( 'Have I heard about this tool or concept?', 'zume' ),
            'obeyed' => __( 'Obeyed', 'zume' ),
            'obeyed_explanation' => __( 'Have I obeyed this tool or concept? If a tool, have I practiced it on my own? If a concept, have you reflected on how it changes your perspective?', 'zume' ),
            'shared' => __( 'Shared', 'zume' ),
            'shared_explanation' => __( 'Have I shared this tool or concept? If a tool, have you shown anyone how to use this tool? If a concept, have you shared this concept with anyone?', 'zume' ),
            'trained' => __( 'Trained', 'zume' ),
            'trained_explanation' => __( 'Have I trained others to share this tool or concept? If a tool, have I trained someone to share the tool with someone else? If a concept, have I trained someone to share the concept with someone else?', 'zume' ),
        ];
    }
}
Zume_Training_Checkin_Dashboard::instance();
