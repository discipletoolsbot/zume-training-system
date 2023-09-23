<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Course_10Session extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_course';
    public $type = '10session';
    public $lang = 'en';
    public static $token = 'zume_course_10session';

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
            'lang_code' => $lang_code,
            'path' => $path,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();


        dt_write_log(zume_get_url_pieces());

        if ( ( $this->root . '/' . $this->type ) === ( ( $url_parts[0] ?? '' ) . '/' . ( $url_parts[1] ?? '' ) ) ) {

            $this->require_authentication();

            $this->set_locale( $lang_code );

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_allow_non_login_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_override_header_meta', function (){ return true;
            }, 100, 1 );

            // header content
            add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
            add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
            add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 100 );
        }
        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [ $this, 'add_endpoints' ] );
            add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }
    public function wp_enqueue_scripts() {

    }

    public function header_style(){}
    public function action_wp_footer(): void {
    }

    public function body(){
        ?>
        <div class="container">

            <h1 class="text-center"><?php echo esc_html__( '10 Session', 'zume' ) ?></h1>

            <?php
            /**
             * DEV SECTION - REMOVE FOR PRODUCTION
             */
            global $zume_user_profile;
            $plans = zume_get_user_plans();
            $stage = zume_get_user_stage();
            $host = zume_get_user_host();
            ?>
            <div class="grid-x grid-margin-x">
                <div class="cell medium-6">
                    <p><strong><?php echo esc_html__( 'Session', 'zume' ) ?></strong><pre><?php print_r( $_GET['id'] ?? '' ); ?></pre></p>
                    <p><strong><?php echo esc_html__( 'User Profile', 'zume' ) ?></strong><pre><?php print_r( $zume_user_profile ); ?></pre></p>
                    <p><strong><?php echo esc_html__( 'User Stage', 'zume' ) ?></strong><pre><?php print_r( $stage ); ?></pre></p>
                    <p><strong><?php echo esc_html__( 'User Plans', 'zume' ) ?></strong><pre><?php print_r( $plans ); ?></pre></p>
                    <p><strong><?php echo esc_html__( 'User HOST', 'zume' ) ?></strong><pre><?php print_r( $host ); ?></pre></p>
                </div>
            </div>
            <!--END DEV SECTION -->

        </div>
        <?php
    }
    public function add_endpoints() {
        $namespace = $this->root . '/v1';
        register_rest_route(
            $namespace,
            '/'.$this->type,
            [
                [
                    'methods'  => WP_REST_Server::CREATABLE,
                    'callback' => [ $this, 'endpoint' ],
                    'permission_callback' => '__return_true',
                ],
            ]
        );
    }

    public function endpoint( WP_REST_Request $request ) {
        $params = $request->get_params();

        if ( ! isset( $params['parts'], $params['action'] ) ) {
            return new WP_Error( __METHOD__, 'Missing parameters', [ 'status' => 400 ] );
        }

        $params = dt_recursive_sanitize_array( $params );

        switch ( $params['action'] ) {
            case 'get':
                // do something
                return true;
            case 'excited':
                // do something else
            default:
                return true;
        }
    }
}
Zume_Course_10Session::instance();
