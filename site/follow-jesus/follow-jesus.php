<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Follow_Jesus extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'how-to-follow-jesus';
    public $lang = 'en';
    public static $token = 'zume_app_follow_jesus';

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
        global $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="cover | position-relative">
            <div class="multiply-cover color flip show-for-large"></div>
            <div class="multiply-cover color show-for-large"></div>
            <div class="container-xsm stack-2 | page">
                <h1 class="text-center"><?php echo esc_html__( 'How to Follow Jesus', 'zume' ) ?></h1>
                <div class="center">
                    <div class="video-thumbnail shadow position-relative rounded">
                        <div class="responsive-embed widescreen m0">
                            <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '68' ) ) ?>" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div class="video-thumbnail__footer bg-brand-light white text-center stack p-1">
                            <h2 class="h3"><?php echo esc_html__( 'Four Relationships', 'zume' ) ?></h2>
                            <p class="w-80 mx-auto"><?php echo esc_html__( 'Watch this important video explaining the 4 relationships of your new life', 'zume' ) ?></p>
                        </div>
                    </div>
                </div>
                <p class="mx-auto"><?php echo esc_html__( 'The sections below, will teach you what it means to be a follower (disciple) of Jesus', 'zume' ) ?></p>

                <button class="mx-auto w-3rem"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/chevron.svg' ) ?>" alt="down button"></button>
            </div>
        </div>

        <div class="page bg-gray-100">
            <div class="container-md center">
                <ul class="stack-2 | accordion" data-accordion>
                    <li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What is a follower of Jesus?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <h3 class="h6"><?php echo esc_html__( 'God uses ordinary people', 'zume' ) ?></h3>
                            <p>Officia qui irure elit mollit pariatur est incididunt deserunt dolor cillum est.</p>
                            <h3 class="h6"><?php echo esc_html__( 'Simple definition of Disciple and Church', 'zume' ) ?></h3>
                            <p>Do Lorem fugiat qui cillum consectetur non duis.</p>
                            <h3 class="h6"><?php echo esc_html__( 'Vision Casting the Greatest Blessing', 'zume' ) ?></h3>
                            <p>Ullamco cillum minim veniam eu qui minim eu aute quis commodo. Voluptate consequat quis amet ad aliqua dolor.</p>
                        </div>
                    </li><li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What are the activities of a follower of Jesus?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <h3 class="h6"><?php echo esc_html__( 'Consumer vs Producer lifestyle', 'zume' ) ?></h3>
                            <p>Consequat amet adipisicing qui ex laborum ipsum sunt commodo ullamco aliquip qui. Voluptate ex nulla laboris excepteur occaecat fugiat magna nostrud incididunt et mollit amet tempor et. Exercitation proident fugiat velit Lorem mollit ullamco exercitation aute quis anim. Dolor eu velit adipisicing non duis mollit sit ut enim cillum excepteur. Reprehenderit aliquip eu excepteur elit ex exercitation tempor amet sunt eu aliquip. Dolore consequat non ad commodo. Magna ex reprehenderit et culpa anim ut pariatur mollit minim sunt culpa.</p>
                            <p>Nulla proident ex voluptate fugiat ad Lorem sit mollit. Magna ad incididunt cupidatat sit dolore eiusmod. Cillum tempor veniam veniam ex reprehenderit veniam voluptate commodo reprehenderit. Irure enim ipsum labore tempor non cupidatat labore minim ut eu. Ea veniam consequat id proident excepteur aliqua sit culpa eiusmod irure eu.</p>
                            <p>Cillum voluptate non sunt duis commodo Lorem sunt aute esse nostrud sint cupidatat excepteur cupidatat. Anim dolor laboris esse voluptate nulla excepteur Lorem anim sunt proident ut minim. Cillum pariatur occaecat duis anim est aute reprehenderit sit consectetur elit velit magna officia tempor. Aliqua irure voluptate cupidatat nostrud ullamco anim culpa ad est excepteur excepteur enim. Tempor sint nisi id laboris reprehenderit minim adipisicing dolore et cillum incididunt nostrud commodo.</p>
                        </div>
                    </li><li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'How do I obey Jesus and help others become followers with me?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <h3 class="h6"><?php echo esc_html__( 'Consumer vs Producer lifestyle', 'zume' ) ?></h3>
                            <p>Consequat amet adipisicing qui ex laborum ipsum sunt commodo ullamco aliquip qui. Voluptate ex nulla laboris excepteur occaecat fugiat magna nostrud incididunt et mollit amet tempor et. Exercitation proident fugiat velit Lorem mollit ullamco exercitation aute quis anim. Dolor eu velit adipisicing non duis mollit sit ut enim cillum excepteur. Reprehenderit aliquip eu excepteur elit ex exercitation tempor amet sunt eu aliquip. Dolore consequat non ad commodo. Magna ex reprehenderit et culpa anim ut pariatur mollit minim sunt culpa.</p>
                            <p>Nulla proident ex voluptate fugiat ad Lorem sit mollit. Magna ad incididunt cupidatat sit dolore eiusmod. Cillum tempor veniam veniam ex reprehenderit veniam voluptate commodo reprehenderit. Irure enim ipsum labore tempor non cupidatat labore minim ut eu. Ea veniam consequat id proident excepteur aliqua sit culpa eiusmod irure eu.</p>
                            <p>Cillum voluptate non sunt duis commodo Lorem sunt aute esse nostrud sint cupidatat excepteur cupidatat. Anim dolor laboris esse voluptate nulla excepteur Lorem anim sunt proident ut minim. Cillum pariatur occaecat duis anim est aute reprehenderit sit consectetur elit velit magna officia tempor. Aliqua irure voluptate cupidatat nostrud ullamco anim culpa ad est excepteur excepteur enim. Tempor sint nisi id laboris reprehenderit minim adipisicing dolore et cillum incididunt nostrud commodo.</p>
                        </div>
                    </li><li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What if many friends, family and others start following Jesus with me?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <h3 class="h6"><?php echo esc_html__( 'Consumer vs Producer lifestyle', 'zume' ) ?></h3>
                            <p>Consequat amet adipisicing qui ex laborum ipsum sunt commodo ullamco aliquip qui. Voluptate ex nulla laboris excepteur occaecat fugiat magna nostrud incididunt et mollit amet tempor et. Exercitation proident fugiat velit Lorem mollit ullamco exercitation aute quis anim. Dolor eu velit adipisicing non duis mollit sit ut enim cillum excepteur. Reprehenderit aliquip eu excepteur elit ex exercitation tempor amet sunt eu aliquip. Dolore consequat non ad commodo. Magna ex reprehenderit et culpa anim ut pariatur mollit minim sunt culpa.</p>
                            <p>Nulla proident ex voluptate fugiat ad Lorem sit mollit. Magna ad incididunt cupidatat sit dolore eiusmod. Cillum tempor veniam veniam ex reprehenderit veniam voluptate commodo reprehenderit. Irure enim ipsum labore tempor non cupidatat labore minim ut eu. Ea veniam consequat id proident excepteur aliqua sit culpa eiusmod irure eu.</p>
                            <p>Cillum voluptate non sunt duis commodo Lorem sunt aute esse nostrud sint cupidatat excepteur cupidatat. Anim dolor laboris esse voluptate nulla excepteur Lorem anim sunt proident ut minim. Cillum pariatur occaecat duis anim est aute reprehenderit sit consectetur elit velit magna officia tempor. Aliqua irure voluptate cupidatat nostrud ullamco anim culpa ad est excepteur excepteur enim. Tempor sint nisi id laboris reprehenderit minim adipisicing dolore et cillum incididunt nostrud commodo.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <?php
    }
}
Zume_Training_Follow_Jesus::instance();
