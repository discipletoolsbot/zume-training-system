<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Friend_Invite extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'friend_invite';
    public $lang = 'en';
    public static $token = 'zume_app_friend_invite';

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
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( ( $this->root === $url_parts[0] ?? '' && $this->type === $url_parts[1] ?? '' ) && ! dt_is_rest() ) {

            $this->set_locale( $lang_code );

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
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();

                jQuery('.friend_code_submit').click(function(){
                    var friend_code = jQuery('.friend_code').val();
                    if ( ! friend_code ) {
                        alert('Please enter a friend code.');
                        return;
                    }

                    makeRequest('POST', 'connect/friend', { "value": friend_code }, 'zume_system/v1' ).done( function( data ) {
                        console.log(data)
                        jQuery('.friend_code_submit').text('Done').prop('disabled', true);
                    })
                });
            });
        </script>
        <?php
    }

    public function body(){
        global $zume_user_profile;

        $friend_code = false;
        if ( isset( $_GET['code'] ) ) {
            $friend_code = $_GET['code'];
        }

        require __DIR__ . '/../parts/nav.php';
        ?>
        <div class="container page">
            <div class="grid-x">
                <div class="cell small-6">
                    <h1>Friend Invitation</h1>
                    <p>Use the code your friend sent you.</p>
                    <div class="input-group">
                        <input class="input-group-field friend_code" type="text" value="<?php echo ( $friend_code ) ? $friend_code : ''  ?>" >
                        <button class="button input-group-label friend_code_submit">Connect</button>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
Zume_Training_Friend_Invite::instance();
