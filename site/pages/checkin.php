<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Checkin extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'checkin';
    public $lang = 'en';
    public static $token = 'zume_app_checkin';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
//        $this->lang = get_locale();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

//        dt_write_log( zume_get_url_pieces() );

        $page_slug = $url_parts[0] ?? '';

        if ( isset( $url_parts[0] ) && ( ( $this->root === $url_parts[0] && $this->type === $url_parts[1] ) || 'checkin' === $url_parts[0] ) && ! dt_is_rest() ) {

//            $this->set_locale( $lang_code );

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
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );

//            exit();

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
        global $zume_user_profile;
        ?>
        <script>
            const jsObject = [<?php echo json_encode([
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'root' => esc_url_raw( rest_url() ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'checkin_url' => zume_checkin_wizard_url(),
                'is_logged_in' => is_user_logged_in(),
                'translations' => [
                    'enter_code' => __( 'Please enter a friend code.', 'zume' ),
                    'bad_code' => __( 'Not a recognized code. Please check the number.', 'zume' ),
                ],
            ]) ?>][0]
        </script>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();

                const warningBanner = document.querySelector('.warning.banner')

                jQuery('.invitation-form').submit(function(e) {
                    e.preventDefault()

                    var code = jQuery('#code').val();
                    if ( ! code ) {
                        show_error(jsObject.translations.enter_code)
                        return;
                    }

                    redirect_to_login( code )

                });

                function redirect_to_login( code ) {
                    const checkinURL = new URL( jsObject.checkin_url )

                    const redirect = checkinURL.searchParams.get('redirect_to')

                    const redirectURL = new URL(redirect)
                    redirectURL.searchParams.append( 'code', code )

                    checkinURL.searchParams.delete('redirect_to')
                    checkinURL.searchParams.append('redirect_to', redirectURL.href)
                    checkinURL.searchParams.append('hide-nav', true)

                    location.href = checkinURL.href
                }

            });
        </script>
        <?php
    }

    public function body(){
        global $zume_user_profile;

        $key_code = false;
        if ( isset( $_GET['code'] ) ) {
            $key_code = sanitize_text_field( wp_unslash( $_GET['code'] ) );
        }

//        if ( $key_code !== false ) {
//            wp_redirect( zume_checkin_wizard_url( $key_code ) );
//            exit;
//        }

        ?>

        <div class="cover-page | bg-brand-gradient">

            <?php require __DIR__ . '/../parts/nav.php' ?>

            <div class="center" id="checkin-page">

                <div class="grid-container rounded-multi">
                    <div class="hidden | text-center bg-brand-light px-1 py-0 shadow">
                        <div class="cover">
                            <div class="center | w-100">
                                <div class="w-70"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Jesus-01.svg' ) ?>" alt=""></div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center bg-white px-1 py-0 shadow rounded-start rounded-start-on-medium">
                        <h1 class="brand"><?php esc_html_e( 'Checkin', 'zume' ) ?></h1>
                        <form class="stack-1 invitation-form">
                            <p><?php echo esc_html__( 'Use the code on the screen or in the book', 'zume' ) ?></p>
                            <div class="">
                                <label for="code"></label>
                                <input class="input" id="code" type="text" placeholder="012345" value="<?php echo ( $key_code ) ? esc_attr( $key_code ) : ''  ?>" >
                            </div>
                            <button class="btn code_submit"><?php echo esc_html__( 'Connect', 'zume' ) ?></button>
                        </form>

                    </div>
                </div>

            </div>
        </div>

        <?php
    }
}
Zume_Training_Checkin::instance();
