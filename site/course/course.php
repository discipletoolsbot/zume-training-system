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

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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


        $current_language = $zume_user_profile['language']['code'];

        $plans = Zume_Plans_Endpoints::get_public_plans();
        ?>


        <div class="container stack">
            <h1 class="text-center"><?php echo esc_html__( 'Course', 'zume' ) ?></h1>

            <?php if ( empty( $plans ) || $plans['total'] === 0 ): ?>

                <p>No pieces pages for the language code <?php echo esc_html( $current_language ) ?></p>

            <?php endif; ?>
            <div class="cluster"><a class="button" href="/course_app/10session">10 Session Course</a><a class="button" href="/course_app/20session">20 Session Course</a> <a class="button" href="/course_app/presenter">Prototype component based presenter</a></div>
            <table>
                <thead>
                    <tr>
                        <td><?php echo esc_html__( 'Name', 'zume' ) ?></td>
                        <td><?php echo esc_html__( 'Next Session Date', 'zume' ) ?></td>
                        <td><?php echo esc_html__( 'Start Time', 'zume' ) ?></td>
                        <td><?php echo esc_html__( 'TimeZone', 'zume' ) ?></td>
                        <td><?php echo esc_html__( 'Language', 'zume' ) ?></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>

                    <?php foreach ( $plans['posts'] as $post ): ?>

                        <?php

                        $status = isset( $post['status'] ) ? $post['status'] : false;

                        if ( !$status || empty( $status ) || $status['key'] !== 'active' ) {
                            continue;
                        }

                        $page_title = $post['post_title'];

                        $plan_length = 10;
                        $plan_prefix = 'set_a';

                        if ( isset( $post['set_b_01'] ) ) {
                            $plan_length = 20;
                            $plan_prefix = 'set_b';
                        }

                        $now = time();

                        for ( $i =1; $i < $plan_length + 1; $i++ ) {
                            $session_index = $i < 10 ? "0$i" : "$i";
                            $session_date = $post[$plan_prefix . '_' . $session_index];
                            $latest_plan_date = $session_date['timestamp'];
                            if ( $now < $session_date['timestamp'] ) {
                                break;
                            }
                        }

                        $formatted_date = gmdate( 'M d', $latest_plan_date );

                        $time = isset( $post['time_of_day_note'] ) ? $post['time_of_day_note'] : '';
                        $timezone = isset( $post['timezone_note'] ) ? $post['timezone_note'] : '';
                        $language = isset( $post['language_note'] ) ? $post['language_note'] : '';
                        $join_key = isset( $post['join_key'] ) ? $post['join_key'] : '';

                        ?>

                        <tr>
                            <td><?php echo esc_html( $page_title ) ?></td>
                            <td><?php echo esc_html( $formatted_date ) ?></td>
                            <td><?php echo esc_html( $time ) ?></td>
                            <td><?php echo esc_html( $timezone ) ?></td>
                            <td><?php echo esc_html( $language ) ?></td>
                            <td>
                                <a href="<?php echo esc_url( zume_join_a_public_plan_wizard_url( $join_key ) ) ?>" class="btn">
                                    <?php echo esc_html__( 'Join', 'zume' ) ?>
                                </a>
                            </td>
                        </tr>

                    <?php endforeach; ?>

                </tbody>
            </table>

        <?php
        $args = [
            'post_type' => 'zume_pieces',
            'lang' => $current_language,
            'posts_per_page' => -1,
        ];

        $posts = get_posts( $args );

        ?>

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
