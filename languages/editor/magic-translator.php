<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Translator extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training Translator';
    public $root = 'zume_app';
    public $type = 'translator';
    public $lang = 'en';
    public static $token = 'zume_app_translator';

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

        $this->lang = $lang_code ?? $this->lang;

        $page_slug = $url_parts[0] ?? '';

        if ( isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

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
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <?php
    }

    public function body(){
        if(!is_user_logged_in()) {
            wp_redirect( wp_login_url( site_url() . '/' . $this->root . '/' . $this->type . '/?email=' . $_GET['email'] ) );
        }
        $user = wp_get_current_user();
        if ( ! in_array( 'custom_translator', (array) $user->roles ) ) {
            echo "User " . $user->user_email . " is not a translator.";
            return;
        }
        $zume_languages = zume_languages();
        $lang = $zume_languages[$this->lang];
        ?>

        <div class="grid-x grid-padding-x" style="margin-top: 1em;">
            <div class="cell">
                Zume Translation for <?php echo $lang['name'] ?>
            </div>
            <div class="cell">
                <button class="button" id="translate">Status</button>
                <button class="button hollow" id="translate">Pieces</button>
                <button class="button hollow" id="translate">Tools</button>
                <button class="button hollow" id="translate">Emails</button>
                <button class="button hollow" id="translate">CTAs</button>
                <button class="button hollow" id="translate">Course</button>
                <button class="button hollow" id="translate">Site</button>
            </div>
            <div class="cell" id="content">
                <?php $this->load_stats() ?>
            </div>
        </div>
        <?php
    }

    public function load_stats() {
        $zume_languages = zume_languages();
        $lang = $zume_languages[$this->lang];

        // query all zume pieces pages
        // query all tools pages

        ?>
        <div class="grid-x grid-padding-x">
            <div class="cell">
                <table>
                    <tbody>
                        <tr>
                            <th>Pieces</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>Tools</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Home</td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        <?php
    }
}
Zume_Training_Translator::instance();
