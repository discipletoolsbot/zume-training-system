<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Share extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'share';
    public $lang = 'en';
    public static $token = 'zume_app_share';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public static function translations() {
        return [
            'share' => __( 'Share', 'zume' ),
            'copy_link' => __( 'Copy Link', 'zume' ),
            'copy_and_share_text' => __( 'Copy this link and send it to your friends.', 'zume' ),
            'share_feedback' => __( 'Thanks!', 'zume' ),
            'copy_feedback' => __( 'Link copied', 'zume' ),
        ];
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
        global $zume_languages_by_code, $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';

        $current_language = zume_current_language();

        $args = [
            'post_type' => 'zume_pieces',
            'lang' => $current_language,
            'posts_per_page' => -1,
            'order' => 'ASC',
        ];

        $posts = get_posts( $args );
        $pieces_info = zume_training_items();

        $share_items = [];

        foreach ( $posts as $post ) {
            $meta = get_post_meta( $post->ID );
            $page_title = empty( $meta['zume_piece_h1'][0] ) ? get_the_title( $post->ID ) : $meta['zume_piece_h1'][0];
            $page_url = site_url( $current_language . '/' . $post->post_name );
            $page_info = $pieces_info[ (int) $meta['zume_piece'][0] - 1 ];

            $share_items[] = [
                'page_title' => $page_title,
                'page_url' => $page_url,
                'type' => $page_info['type'],
                'key' => $page_info['key'],
            ];
        }

        $share_translations = self::translations();

        ?>

        <script>
            const zumeShare = [<?php echo json_encode([
                'share_items' => $share_items,
                'translations' => array_merge(
                    $share_translations,
                    [
                        'all' => __( 'All', 'zume' ),
                        'tools' => __( 'Tools', 'zume' ),
                        'concepts' => __( 'Concepts', 'zume' ),
                        'filter' => __( 'Filter', 'zume' ),
                        'sort' => __( 'Sort', 'zume' ),
                    ],
                ),
            ]) ?>][0]
        </script>

        <div class="container-xsm | my-1">
            <div class="stack">
                <h1 class="text-center"><?php echo esc_html__( 'Sharing with Others', 'zume' ) ?></h1>

                <div class="center">
                    <img class="w-30" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/guys-reading.svg' ) ?>" alt="guys reading">
                </div>

                <p>
                    <?php echo esc_html__( 'When we are faithful to obey and share what the Lord has shared with us, then he promises to share even more.', 'zume' ) ?>
                </p>

                <?php if ( empty( $posts ) ): ?>

                    <p>No pieces pages for the language code <?php echo esc_html( $current_language ) ?></p>

                <?php endif; ?>
            </div>

            <share-list></share-list>

            <noscript>
                <ul class="stack container-xsm">
                    <?php foreach ( $posts as $post ): ?>

                        <?php

                            $meta = get_post_meta( $post->ID );
                            $page_title = empty( $meta['zume_piece_h1'][0] ) ? get_the_title( $post->ID ) : $meta['zume_piece_h1'][0];
                            $page_url = site_url( $current_language . '/' . $post->post_name );

                        ?>

                        <li class="share-cards">
                            <div class="stack | share card">
                                <a class="f-0 bold my-0" href="<?php echo esc_url( $page_url ) ?>">
                                    <?php echo esc_html( $page_title ) ?>
                                </a>
                                <div class="center">
                                    <div class="stack--2">
                                        <p><?php echo esc_html( $share_translations['copy_and_share_text'] ) ?></p>
                                        <p><code style="overflow-wrap: anywhere"><?php echo esc_url( $page_url ) ?></code></p>
                                    </div>
                                </div>
                            </div>
                        </li>

                    <?php endforeach; ?>
                </ul>
            </noscript>
        </div>
        <?php
    }
}
Zume_Training_Share::instance();

