<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Checkin extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'checkin';
    public $lang = 'en';
    public static $token = 'app_checkin';

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
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        /* Redirect /checkin to /{lang_code}/checkin */
        /* This facilitates QR codes sending users to /checkin not knowing what language they may have previously been using */
        $url = dt_get_url_path();
        if ( $url === $this->type ) {
            $lang_code_from_cookie = zume_get_language_cookie();
            if ( $lang_code_from_cookie !== 'en' ) {
                wp_redirect( $lang_code_from_cookie . '/' . $this->type );
                exit;
            }
        }

        if ( isset( $url_parts[0] ) && ( ( $this->root === $url_parts[0] && $this->type === $url_parts[1] ) || 'checkin' === $url_parts[0] ) && ! dt_is_rest() ) {

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

                    location.href = get_redirect_to_login( code )

                });

                function get_redirect_to_login( code ) {
                    const checkinURL = new URL( jsObject.checkin_url )

                    const redirect = checkinURL.searchParams.get('redirect_to')

                    const redirectURL = new URL(redirect)
                    redirectURL.searchParams.append( 'code', code )

                    checkinURL.searchParams.delete('redirect_to')
                    checkinURL.searchParams.append('redirect_to', redirectURL.href)
                    checkinURL.searchParams.append('hide-nav', true)

                    return checkinURL.href
                }

                const sessions = {
                    tenSessions: [
                        5678,
                        2468,
                        6543,
                        8764,
                        6542,
                        1235,
                        4322,
                        9870,
                        1355,
                        5430,
                    ],
                    twentySessions: [
                        3354,
                        4568,
                        8767,
                        6787,
                        3450,
                        2344,
                        1116,
                        5431,
                        8768,
                        2347,
                        9434,
                        2348,
                        6785,
                        9872,
                        4327,
                        2871,
                        4328,
                        6548,
                        7657,
                        2767,
                    ],
                    fiveSessions: [
                        1397,
                        2341,
                        3455,
                        4329,
                        5451,
                    ]
                }

                const chooseSessionButton = document.querySelector('#choose-session')
                const chooseSessionContainer = document.querySelector('#session-container')
                chooseSessionButton.addEventListener('click', () => {
                    chooseSessionContainer.classList.toggle('hidden')
                });

                createList('tenSessions')

                jQuery('input[name="schedule"]').on('change', (event) => {
                    /* load buttons with codes */
                    const id = event.target.id
                    createList(id)
                })

                function createList(id) {
                    const sessionsCodes = sessions[id]

                    const sessionList = document.querySelector('#session-list')
                    let list = ''
                    sessionList.innerHTML = ''
                    sessionsCodes.forEach((code, i) => {
                        const button = document.createElement('a')
                        button.classList.add('card-btn')
                        button.classList.add('aspect-1')
                        button.classList.add('lh-sm')
                        button.setAttribute('href', get_redirect_to_login(code))
                        button.setAttribute('role', 'button')
                        button.innerHTML = `${i+1}`
                        sessionList.appendChild(button)
                    })

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

                    <div class="stack-2 text-center bg-white px-1 py-0 my-2 shadow rounded-start rounded-start-on-medium">
                        <div>
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

                        <span class="line-text f--1"><span><?php echo esc_html__( 'or', 'zume' ) ?></span></span>

                        <button class="btn" id="choose-session"><?php echo esc_html__( 'Choose session to checkin', 'zume' ) ?></button>
                        <div class="stack hidden" id="session-container">
                            <h2 class="h3 brand-light"><?php echo esc_html__( 'Training Schedules', 'zume' ) ?></h2>
                            <div class="cluster">
                                <label class="form-control label-input">
                                    <input name="schedule" type="radio" id="tenSessions" checked>
                                    <?php echo esc_html__( '10 Sessions', 'zume' ) ?>
                                </label>
                                <label class="form-control label-input">
                                    <input name="schedule" type="radio" id="twentySessions">
                                    <?php echo esc_html__( '20 Sessions', 'zume' ) ?>
                                </label>
                                <label class="form-control label-input">
                                    <input name="schedule" type="radio" id="fiveSessions">
                                    <?php echo esc_html__( 'Intensive', 'zume' ) ?>
                                </label>
                            </div>
                            <div class="grid grid-min-2rem" id="session-list">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <?php
    }
}
Zume_Training_Checkin::instance();
