<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_About extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'about';
    public $lang = 'en';
    public static $token = 'zume_app_about';

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

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container-md stack-2 center | page">

            <h1 class="text-center"><?php echo esc_html__( 'What is Zume Training?', 'zume' ) ?></h1>

            <div class="center stack-2">
                <p class="text-center">
                    Aliqua irure eiusmod aliquip et ipsum et sint dolore velit voluptate esse est nostrud consequat. Sunt cillum ex aliqua fugiat magna velit dolor magna qui Lorem occaecat tempor ex. Ipsum officia consequat ipsum Lorem mollit. Voluptate aliquip ut adipisicing non cupidatat minim exercitation adipisicing ipsum exercitation dolore esse amet nostrud. Tempor velit consequat qui laboris ut in.
                </p>
                <div class="w-20">
                    <img class="w-100" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/handswithyeast.svg' ) ?>" alt="kneading bread">
                </div>
            </div>

            <div class="switcher align-items-center">
                <div class="stack-3">
                    <p>
                        Voluptate consequat proident consequat cupidatat commodo ut consequat culpa. Ad ipsum irure dolor culpa veniam exercitation sunt mollit eiusmod dolore ullamco tempor proident adipisicing. Cupidatat nisi est aliquip cillum ullamco culpa eiusmod est. Elit ut duis do cillum est aliquip qui veniam nulla aliquip commodo qui ut ea. Excepteur aliqua dolore officia laborum. Labore eiusmod ex excepteur Lorem ullamco proident dolor incididunt ut. Laboris anim excepteur velit id nostrud minim aliquip tempor voluptate commodo.
                    </p>
                    <p>
                        Fugiat eiusmod elit anim ipsum qui ex sint aliqua aliqua magna sit. Reprehenderit mollit nulla nisi anim laboris tempor deserunt ad dolore irure ipsum magna amet quis. Sunt culpa ipsum duis amet sint in. Proident eu esse commodo duis ad ea. Fugiat nulla laboris cupidatat nisi tempor fugiat nulla qui.
                    </p>
                </div>
                <div class="center">
                    <img class="w-60" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/PeopleOnGlobesvg.svg' ) ?>" alt="people on globe">
                </div>
            </div>

            <div class="switcher align-items-center">
                <div class="center">
                    <img class="w-70" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/CellPhone.svg' ) ?>" alt="computer devices">
                </div>
                <p>
                    Exercitation dolore dolor ut anim non pariatur reprehenderit occaecat nostrud ullamco eu eiusmod duis. Tempor eu veniam laboris excepteur incididunt reprehenderit sit tempor deserunt consequat dolore culpa dolore. Consequat aliqua nisi aliqua aliqua. Ut anim cillum minim proident proident commodo minim Lorem mollit dolor consectetur. Ut exercitation ex adipisicing ullamco ipsum ea irure amet eu voluptate. Non ullamco culpa nostrud dolor est enim est culpa. Laborum laborum commodo cillum officia non sunt ut consequat eu labore cillum laborum incididunt officia.
                </p>
            </div>

            <h2 class="brand text-center bold"><?php echo esc_html__( 'Zume Training exists to saturate the globe with multiplying disciples in our generation.', 'zume' ) ?></h2>

            <div class="switcher align-items-center">
                <p>
                    Ad ea minim sint incididunt nulla. Id dolor est sunt et. Minim esse exercitation quis laborum esse. Fugiat amet eiusmod est consectetur aliqua quis. Duis fugiat sunt voluptate minim quis labore labore minim labore officia ut voluptate elit enim. Sint aute consequat in magna aute.
                </p>
                <div class="center">
                    <img class="w-70" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/WorldGroups.svg' ) ?>" alt="groups around the globe">
                </div>
            </div>

            <div class="switcher align-items-center">
                <div class="center">
                    <span class="brand bold"><?php echo esc_html__( '1 Training', 'zume' ) ?></span>
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/1Training.svg' ) ?>" alt="One training">
                </div>
                <p>
                    Cillum ex quis velit aliquip aliquip et minim consectetur aliquip laborum proident eiusmod sunt. Excepteur aute esse ad fugiat id ex minim non ut sit sit laboris culpa laboris. Officia nulla labore tempor duis ea velit anim aliqua non ad do incididunt eiusmod. Ex aute non culpa consequat tempor eu sunt ad nulla dolore.
                </p>
            </div>

            <div class="switcher align-items-center">
                <p>
                    Sit consectetur est adipisicing quis dolor reprehenderit. Amet quis voluptate cillum quis pariatur sit. Eiusmod culpa id amet laboris aliquip irure deserunt consectetur do irure fugiat dolor Lorem qui. Incididunt magna proident eu mollit esse excepteur labore consectetur tempor. Dolor fugiat deserunt sint incididunt cupidatat nulla culpa.
                </p>
                <div class="center">
                    <span class="brand bold"><?php echo esc_html__( '2 Simple Churches', 'zume' ) ?></span>
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/2Churches.svg' ) ?>" alt="2 simple churches">
                </div>
            </div>

            <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large light uppercase fit-content"><?php echo esc_html__( 'Sign Me Up!', 'zume' ) ?></a>
        </div>

        <div class="page bg-gray-100">
            <div class="center container-md stack-3">
                <h2 class="brand text-center"><?php echo esc_html__( 'How does Zume Training Work?', 'zume' ) ?></h2>
                <div class="switcher | switcher-width-40 align-items-center">
                    <div class="stack px-0">
                        <div class="d-flex align-items-center">
                            <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/free-01.svg' ) ?>" alt="play button">
                            <p class="w-80"><?php printf( esc_html__( '%1$sFree Registration%2$s gives you full access to all training materials and online coaching.' ), '<b>', '</b>' ) ?></p>
                        </div>
                        <div class="d-flex align-items-center">
                            <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Play-Button.svg' ) ?>" alt="play button">
                            <p class="w-80"><?php printf( esc_html__( '%1$sInstructional Videos%2$s help your group undernstand basic principles of multiplying disciples' ), '<b>', '</b>' ) ?></p>
                        </div>
                        <div class="d-flex align-items-center">
                            <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/GroupDiscussions.svg' ) ?>" alt="play button">
                            <p class="w-80"><?php printf( esc_html__( '%1$sGroup Discussions%2$s help your group think through what is being shared' ), '<b>', '</b>' ) ?></p>
                        </div>
                        <div class="d-flex align-items-center">
                            <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/SimpleExercises.svg' ) ?>" alt="play button">
                            <p class="w-80"><?php printf( esc_html__( '%1$sSimple Exercises%2$s help your group put what you are learning into practice' ), '<b>', '</b>' ) ?></p>
                        </div>
                        <div class="d-flex align-items-center">
                            <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/SessionChallenges.svg' ) ?>" alt="play button">
                            <p class="w-80"><?php printf( esc_html__( '%1$sSession Challenges%2$s help your group keep learning and growing between sessions' ), '<b>', '</b>' ) ?></p>
                        </div>
                    </div>
                    <div class="stack | px-3">
                        <div class="position-relative">
                            <div class="responsive-embed widescreen m0">
                                <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '32' ) ) ?>" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="brand text-center"><?php echo esc_html__( 'Before you start.', 'zume' ) ?></h2>

                <div class="switcher align-items-center">
                    <div class="center | position-relative z-2">
                        <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/BeforeYouStart.svg' ) ?>" alt="group around a table" class="w-70">
                    </div>
                    <div class="stack-2 | bg-white p-2 right z-1 | tail circle-head">
                        <h3 class="f-0 bold"><?php echo esc_html__( 'Zume is NOT like other trainings!', 'zume' ) ?></h3>
                        <p>
                            <b><?php echo esc_html__( 'First:', 'zume' ) ?></b><br>
                            <?php echo esc_html__( 'Eiusmod in quis incididunt in id excepteur amet occaecat. In quis exercitation qui pariatur adipisicing pariatur veniam do. Consequat Lorem adipisicing deserunt amet irure in velit nisi tempor sit eiusmod culpa.', 'zume' ) ?>
                        </p>
                        <p>
                            <b><?php echo esc_html__( 'Second:', 'zume' ) ?></b><br>
                            <?php echo esc_html__( 'Reprehenderit aute adipisicing irure ipsum et consequat est officia. Esse incididunt eu pariatur velit aute. Enim irure ad laborum cupidatat ut eiusmod aliqua aliqua ut. Aliqua dolor Lorem commodo dolor exercitation cupidatat fugiat mollit. Magna fugiat dolore cupidatat proident non velit laborum aliquip commodo nulla consectetur et mollit in.', 'zume' ) ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="page bg-brand-light white">
            <div class="container-md stack-3">
                <h2 class="text-center"><?php echo esc_html__( "What's required", 'zume' ) ?></h2>
                <div class="switcher align-items-center">
                    <div class="stack-2">
                        <h3 class="white bold"><?php echo esc_html__( 'Requirements for Zume Training:', 'zume' ) ?></h3>
                        <ul role="list" class="stack-1">
                            <li>Magna eu proident consequat eiusmod ullamco est veniam ad mollit esse duis labore amet ad.</li>
                            <li>Irure duis consequat dolore ea sunt dolor velit voluptate ut deserunt.</li>
                            <li>Quis voluptate nostrud nulla laboris.</li>
                            <li>Consectetur dolore mollit voluptate deserunt consectetur.</li>
                        </ul>
                    </div>
                    <div class="center">
                        <img class="w-70" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Whats-Required-NEW.svg' ) ?>" alt="group discussion">
                    </div>
                </div>
                <div class="switcher align-items-center">
                    <div class="stack-2">
                        <h3 class="white bold"><?php echo esc_html__( 'NOT Required for Zume Training:', 'zume' ) ?></h3>
                        <ul role="list" class="stack-1">
                            <li>Magna eu proident consequat eiusmod ullamco est veniam ad mollit esse duis labore amet ad.</li>
                            <li>Irure duis consequat dolore ea sunt dolor velit voluptate ut deserunt.</li>
                            <li>Quis voluptate nostrud nulla laboris.</li>
                            <li>Consectetur dolore mollit voluptate deserunt consectetur.</li>
                            <li>Duis id voluptate cupidatat fugiat in Lorem.</li>
                        </ul>
                    </div>
                    <div class="center">
                        <img class="w-50" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/WhatsNOTRequired.svg' ) ?>" alt="group discussion">
                    </div>
                </div>
            </div>
        </div>
        <div class="page bg-gray-100">
            <div class="container-md stack-3">
                <h2 class="brand text-center"><?php echo esc_html__( 'Connecting with a Coach.', 'zume' ) ?></h2>

                <div class="switcher align-items-center">
                    <div class="center">
                        <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/coach-2guys.svg' ) ?>" alt="guy with a coach" class="w-50">
                    </div>
                    <div class="stack-2">
                        <p>Lorem incididunt irure eu ut eiusmod voluptate ea anim officia proident deserunt aliqua culpa dolor.</p>
                        <p>Aute ullamco fugiat non voluptate irure dolore officia Lorem dolor ipsum aliquip culpa ea. Sit velit mollit nisi magna sunt. Mollit magna duis nisi non sunt velit consectetur labore pariatur. Quis voluptate consequat ad aliquip. Eiusmod laboris excepteur ex esse excepteur veniam ullamco ex.</p>
                        <p>Pariatur minim adipisicing tempor ea pariatur velit tempor eiusmod ea pariatur.</p>
                        <p>Cupidatat minim ut sit aliquip reprehenderit.</p>
                        <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn uppercase light large s-4 fit-content"><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="page container-md center stack-3">
            <h2 class="t-3 text-center"><?php echo esc_html__( 'Are you ready? Register today.', 'zume' ) ?></h2>
            <div class="center">
                <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Register-About.svg' ) ?>" alt="person Registering" class="w-50">
            </div>
            <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large light uppercase fit-content"><?php echo esc_html__( 'Register Free', 'zume' ) ?></a>
        </div>
        <?php
    }
}
Zume_Training_About::instance();
