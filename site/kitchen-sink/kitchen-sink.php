<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Kitchen_Sink extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'kitchen-sink';
    public $lang = 'en';
    public static $token = 'zume_app_kitchen_sink';

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

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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
            $this->enqueue_zume_training_scripts();

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
        global $zume_languages_by_code;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container">

            <h1 class="text-center"><?php echo esc_html__( 'Kitchen Sink', 'zume' ) ?></h1>

            <h1>Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
            <h5>Header 5</h5>
            <h6>Header 6</h6>

            <p>Some body text. Sint dolore magna magna laboris reprehenderit labore velit occaecat cillum sint occaecat non cupidatat ad. In commodo quis quis mollit cupidatat ut sit magna irure. Eiusmod do voluptate quis velit dolor do ullamco quis veniam nostrud esse adipisicing. Qui pariatur tempor laborum esse. Fugiat velit mollit mollit proident. Dolore deserunt quis mollit qui nostrud. Non cillum laborum esse commodo cillum sit eu fugiat fugiat pariatur sunt qui anim.</p>

            <ul role='list'>
                <li>This</li>
                <li>is</li>
                <li>an</li>
                <li>unordered</li>
                <li>list</li>
            </ul>

            <ol>
                <li>ordered</li>
                <li>list</li>
            </ol>

            <div class="flow">
                <a class="d-block" href="#">Normal links in a page</a>

                <button class="btn d-block">A normal button</button>
                <button class="btn light d-block">A light button</button>
                <button class="btn outline d-block">An outline button</button>

                <a class="btn d-block">A normal button link</a>
                <a class="btn light d-block">A normal light button link</a>
                <a class="btn outline d-block">An outline button link</a>
            </div>

            <div class="flow | bg-brand">

                <a href="#" class="link-light">A light link on a dark background</a>

                <button class="btn dark d-block">A light button</button>
                <button class="btn outline dark d-block">A light outline button</button>

                <a href="#" class="btn dark d-block">A light button link</a>
                <a href="#" class="btn outline dark d-block">A light outline button link</a>

            </div>

        </div>
        <?php
    }
}
Zume_Training_Kitchen_Sink::instance();
