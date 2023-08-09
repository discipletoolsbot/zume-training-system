<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Course extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'course';
    public $lang = 'en';
    public static $token = 'zume_app_course';

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

        $page_slug = $url_parts[0];

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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
        global $zume_languages;

        require __DIR__ . '/../parts/nav.php';


        $current_language = pll_current_language();

        $args = [
            'post_type' => 'zume_pieces',
            'lang' => $current_language,
            'posts_per_page' => -1,
        ];

        $posts = get_posts( $args );

        ?>

        <div class="container">
            <h1 class="text-center"><?php echo esc_html__( 'Course', 'zume' ) ?></h1>

            <?php if ( empty( $posts ) ): ?>

                <p>No pieces pages for the language code <?php echo esc_html( $current_language ) ?></p>

            <?php endif; ?>

            <ol>
                <?php foreach ( $posts as $post ): ?>

                    <?php

                        $meta = get_post_meta( $post->ID );
                        $page_title = empty( $meta['zume_piece_h1'][0] ) ? get_the_title( $post->ID ) : $meta['zume_piece_h1'][0];

                    ?>

                    <li><a href="<?php echo esc_url( site_url( $current_language . '/' . $post->post_name ) ) ?>"><?php echo esc_html( $page_title ) ?></a></li>


                <?php endforeach; ?>
            </ol>
        </div>
        <?php
    }
}
Zume_Training_Course::instance();
