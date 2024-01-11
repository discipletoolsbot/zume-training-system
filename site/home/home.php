<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Home extends Zume_Magic_Page
{

    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'home';
    public $lang = 'en_US';
    public static $token = 'zume_app_home';

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

        if ( empty( $url_parts[0] ?? '' ) && ! dt_is_rest() ) {

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
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
        </style>
        <?php //phpcs:ignore ?>
        <link rel="stylesheet" href="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/fonts/BebasKai/stylesheet.css' ) ?>">
        <?php
    }

    public function body(){
        global $zume_user_profile;
        ?>

        <div class="stack | s0 justify-content-center absolute top left mx-0 my-3 p--1 hard-shadow | sticker">
            <h2 class="f-3 lh1">45+</h2>
            <h3 class="uppercase f--2 lh1"><?php echo esc_html__( 'Languages', 'zume' ) ?></h3>
        </div>
        <?php require __DIR__ . '/../parts/nav.php'; ?>
        <div class="cover-page | hero min-vh-90 position-relative">

            <div class="switcher container | align-items-center gap0">
                <div class="show-for-large position-relative">
                    <div class="bg-path | absolute">
                        <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Blue-Path-01.svg' ) ?>" alt="path">
                    </div>
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/JesusPointing-1.svg' ) ?>" alt="Jesus pointing">
                </div>
                <div class="stack | grow-2 text-center">
                    <h1 class="f-6 first"><?php echo esc_html_x( 'Disciple Making', 'Disciple Making Training', 'zume' ) ?></h1>
                    <h1 class="f-8 second brand-light s0"><?php echo esc_html_x( 'Training', 'Disciple Making Training', 'zume' ) ?></h1>
                    <p class="f-2 s0 px-2"><?php echo esc_html_x( 'for groups of Jesus followers', 'Disciple Making Training for groups of Jesus followers', 'zume' ) ?></p>
                    <div class="switcher | switcher-width-20 s-3">
                        <a href="<?php echo esc_url( dt_login_url( 'login' ) ) ?>" class="btn large outline uppercase w-80 px-0"><?php echo esc_html__( 'Login', 'zume' ) ?></a>
                        <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large light uppercase w-80 px-0"><?php echo esc_html__( 'Register Free', 'zume' ) ?></a>
                    </div>
                </div>
                <div class="show-for-large center brand-fade">
                    <div class="mx-auto w-50">
                        <?php //phpcs:ignore ?>
                        <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/Zume-Z-crop.svg' ) ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="container stack-4 | page pt0">
            <h2 class="text-center h1"><?php echo esc_html__( 'Becoming more like Jesus... Together', 'zume' ) ?></h2>
            <div class="grid | grid-min-24rem">
                <div class="stack | left tail circle-end-small bg-brand-light white p-2">
                    <h3 class="h2"><?php echo esc_html__( 'Overview', 'zume' ) ?></h3>
                    <ul role="list" class="check-list f-2 bold">
                        <li><?php echo esc_html__( '20 hours of Training', 'zume' ) ?></li>
                        <li><?php echo esc_html__( '32 Concepts and Skills', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'Group Discussions', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'Practice-Oriented', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'Self-Facilitated', 'zume' ) ?></li>
                    </ul>
                </div>
                <div class="center stack">
                    <img class="" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Whats-Required-NEW.svg' ) ?>" alt="Group doing zume">
                    <h3 class="text-center f-1 mx-2"><?php echo esc_html__( 'Free. Anytime. Anywhere.', 'zume' ) ?></h3>
                </div>
            </div>
            <h2 class="text-center"><?php echo esc_html__( 'Gain insight into...', 'zume' ) ?></h2>
            <div class="switcher | s-3">
                <div class="stack">
                    <img class="mx-auto w-25" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Being-A-Disciple-01.svg' ) ?>" alt="Being a disciple">
                    <div class="mx-auto">
                        <h3 class="h2 brand"><?php echo esc_html__( 'Being A Disciple', 'zume' ) ?></h3>
                        <ul role="list" class="f-1 f-medium | check-list">
                            <li><?php echo esc_html__( "What's a disciple?", 'zume' ) ?></li>
                            <li><?php echo esc_html__( "What's a Church?", 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Keys to spiritual growth', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Personal Bible Study Habits', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Improve Your Prayer Life', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Learn to Live Out Your Faith', 'zume' ) ?></li>
                        </ul>
                    </div>
                </div>
                <div class="stack">
                    <img class="mx-auto w-25" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Making-Disciples-01.svg' ) ?>" alt="Being a disciple">
                    <div class="mx-auto">
                        <h3 class="h2 brand"><?php echo esc_html__( 'Making Disciples', 'zume' ) ?></h3>
                        <ul role="list" class="f-1 f-medium | check-list">
                            <li><?php echo esc_html__( "Sharing God's story", 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Telling Your Story', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Engaging Seekers', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Leading as Simple Church', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Vision for Discipleship', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Plan of Implementation', 'zume' ) ?></li>
                        </ul>
                    </div>
                </div>
            </div>
            <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large uppercase light mx-auto fit-content"><?php echo esc_html__( "I'm Ready!", 'zume' ) ?></a>
        </div>

        <div class="hidden bg-gray-500" style="max-height: 100vh; overflow-y: scroll">
            <div class="container">
                <h2>Development Area</h2>
                <a href="/wizard/make-a-plan" class="btn">Wizard: Example Make a plan</a>
                <a href="/wizard/connect-to-coach" class="btn">Wizard: Connect to a coach</a>
                <p><strong><?php echo esc_html__( 'User Profile', 'zume' ) ?></strong><pre><?php print_r( $zume_user_profile ); ?></pre></p>
            </div>
        </div>

        <div class="stack-3 | py-3 text-center bg-brand-gradient">
            <h2 class="white"><?php echo esc_html__( 'Ordinary People. Simple Steps.', 'zume' ) ?></h2>
            <div class="container-md | align-items-center">
                <div class="w-80 video-frame mx-auto position-relative bg-white rounded hard-shadow">
                    <div class="mx-auto">
                        <div class="responsive-embed widescreen m0">
                            <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '31' ) ) ?>" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <!-- <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/VideoGraphic-2.svg' ) ?>" alt="zume video"> -->
                    </div>
                </div>
            </div>
            <button class="hidden | btn large outline dark fit-content uppercase mx-auto"><?php echo esc_html__( 'Watch', 'zume' ) ?></button>
        </div>

        <div class="center container stack-3 | page">
            <h2 class="text-center"><?php echo esc_html__( 'How it Works', 'zume' ) ?></h2>
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
                <div class="px-3">
                    <div class="position-relative">
                        <div class="responsive-embed widescreen m0">
                            <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '32' ) ) ?>" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <a href="<?php echo esc_url( zume_about_url() ) ?>" class="d-block uppercase bold brand fit-content mx-auto"><?php echo esc_html__( 'More about zume', 'zume' ) ?></a>
                </div>
            </div>
            <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large uppercase light"><?php echo esc_html__( 'Register', 'zume' ) ?></a>
        </div>

        <?php $width = 1024 ?>
        <?php $height = 753 ?>
        <?php $n = $height / $width ?>
        <?php $center = 1 - $n / 2 ?>
        <?php $xradius = $n / 2 ?>

        <svg height="0" width="0">
            <clipPath id="clip-rounded-end" clipPathUnits="objectBoundingBox">
                <path d="<?php echo esc_attr( "M $center 1 h -$center v -1 h $center A $xradius 0.5, 0, 0 1, $center 1" ) ?>"/>
            </clipPath>
        </svg>

        <div class="page bg-gray-300 | real-stories">
            <div class="position-relative">
                <h2 class="white absolute z-1 top left right px-3 py-1"><?php echo esc_html__( 'Real people ... real stories.', 'zume' ) ?></h2>
                <div class="absolute top right bottom w-40 bg-world show-for-extra-large"></div>
                <img class="clip-rounded-end real-people" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/RealPeople.jpg' ) ?>" alt="Real people">
                <div class="reel absolute bottom right | story-reel overflowing">
                    <div class="story-card">
                        <div class="story-card__logo">
                            <?php //phpcs:ignore ?>
                            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/Zume-Z-crop.svg' ) ?>
                        </div>
                        <div class="story-card__text">
                            <p><b>Denver, colorado</b></p>
                            <p>
                                <em>"Labore pariatur enim cillum quis reprehenderit sunt. Qui laborum qui do consectetur officia. Et est adipisicing culpa veniam culpa quis est ea commodo elit eu mollit aliqua."</em>
                            </p>
                        </div>
                    </div>
                    <div class="story-card invert">
                        <div class="story-card__logo">
                            <?php //phpcs:ignore ?>
                            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/Zume-Z-crop.svg' ) ?>
                        </div>
                        <div class="story-card__text">
                            <p><b>Denver, colorado</b></p>
                            <p>
                                <em>"Labore pariatur enim cillum quis reprehenderit sunt. Qui laborum qui do consectetur officia. Et est adipisicing culpa veniam culpa quis est ea commodo elit eu mollit aliqua."</em>
                            </p>
                        </div>
                    </div>
                    <div class="story-card">
                        <div class="story-card__logo">
                            <?php //phpcs:ignore ?>
                            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/Zume-Z-crop.svg' ) ?>
                        </div>
                        <div class="story-card__text">
                            <p><b>Denver, colorado</b></p>
                            <p>
                                <em>"Labore pariatur enim cillum quis reprehenderit sunt. Qui laborum qui do consectetur officia. Et est adipisicing culpa veniam culpa quis est ea commodo elit eu mollit aliqua."</em>
                            </p>
                        </div>
                    </div>
                    <div class="story-card invert">
                        <div class="story-card__logo">
                            <?php //phpcs:ignore ?>
                            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/Zume-Z-crop.svg' ) ?>
                        </div>
                        <div class="story-card__text">
                            <p><b>Denver, colorado</b></p>
                            <p>
                                <em>"Labore pariatur enim cillum quis reprehenderit sunt. Qui laborum qui do consectetur officia. Et est adipisicing culpa veniam culpa quis est ea commodo elit eu mollit aliqua."</em>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-brand-gradient">
            <div class="container stack-2 | py-2 white text-center">
                <h2 class="position-relative px-4 fit-content mx-auto"><?php echo esc_html__( 'Zume = Yeast', 'zume' ) ?>
                    <div class="d-flex justify-content-center absolute right top bottom h-125 w-20">
                        <?php //phpcs:ignore ?>
                        <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/yeast.svg' ) ?>
                    </div>
                </h2>
                <p class="bold"><?php echo esc_html__( 'Exercitation laboris consectetur et exercitation esse voluptate. Commodo id est duis aliquip. Excepteur veniam nostrud aliquip id in cupidatat aliquip non labore officia velit incididunt. Cupidatat commodo excepteur labore consectetur.', 'zume' ) ?></p>
            </div>
        </div>

        <div class="stack-4 | bg-gray-100 page text-center">
            <h2><?php echo esc_html__( 'Ready to take your next steps?', 'zume' ) ?></h2>
            <div class="container switcher">
                <div class="stack | justify-content-between">
                    <img class="h-8rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Register-About.svg' ) ?>" alt="Registration desk">
                    <h3><?php echo esc_html__( 'Register Free.', 'zume' ) ?></h3>
                </div>
                <div class="stack | justify-content-between">
                    <img class="h-8rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Gather-A-Group-01.svg' ) ?>" alt="group around a table">
                    <h3><?php echo esc_html__( 'Gather a Group.', 'zume' ) ?></h3>
                </div>
                <div class="stack | justify-content-between">
                    <img class="h-8rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Change-the-world.svg' ) ?>" alt="changing the world">
                    <h3><?php echo esc_html__( 'Change the World.', 'zume' ) ?></h3>
                </div>
            </div>
            <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large uppercase light fit-content mx-auto"><?php echo esc_html__( 'Get started!', 'zume' ) ?></a>
        </div>

        <!------- End of page -------->

        <?php $radius = 250 ?>
        <?php $width = 932 ?>
        <?php $height = 539 ?>
        <?php $rx = $radius / $width ?>
        <?php $ry = $radius / $height ?>
        <?php $x = 1 - $rx ?>
        <?php $y = 1 - $ry ?>
        <svg height="0" width="0">
            <clipPath id="clip-rounded-bottom-right" clipPathUnits="objectBoundingBox">
                <path d="<?php echo esc_attr( "M 0 0 v 1 h $x A $rx $ry, 0, 0 0, 1 $y V 1 0 h -1" ) ?>"/>
            </clipPath>
        </svg>

        <?php $width = 780 ?>
        <?php $height = 539 ?>
        <?php $rx = $radius / $width ?>
        <?php $ry = $radius / $height ?>
        <svg height="0" width="0">
            <clipPath id="clip-rounded-top-left" clipPathUnits="objectBoundingBox">
                <path d="<?php echo esc_attr( "M 1 1 v -1 H 0 $rx A $rx $ry, 0, 0 0, 0 $ry V 0 1 h 1" ) ?>"/>
            </clipPath>
        </svg>

        <div class="hidden bg-gray-100 text-center">
            <div class="switcher | justify-content-between">
                <div><img class="clip-rounded-bottom-right" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Guidebook.jpg' ) ?>" alt="guidebook"></div>
                <div class="cover center">
                    <div class="stack-1">
                        <h3><?php echo esc_html__( 'Explore the Zume Guidebook.', 'zume' ) ?></h3>
                        <a href="<?php echo esc_url( zume_guidebook_url() ) ?>" class="btn large light uppercase mx-auto fit-content"><?php echo esc_html__( 'Download' ) ?></a>
                    </div>
                </div>
            </div>
            <div class="switcher | justify-content-between">
                <div class="cover center">
                    <div class="stack-1">
                        <h3><?php echo esc_html__( 'Get the Zume Mobile App.', 'zume' ) ?></h3>
                        <a href="<?php echo esc_url( zume_mobile_app_url() ) ?>" class="btn large light uppercase mx-auto fit-content"><?php echo esc_html__( 'Download' ) ?></a>
                    </div>
                </div>
                <div><img class="clip-rounded-top-left" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/MobileApp.jpg' ) ?>" alt="guidebook"></div>
            </div>
        </div>

        <div class="hidden cover-page center container | py-3 text-center">
            <h2 class="position-relative">
                <?php echo esc_html__( 'Are you ready? Get started today!', 'zume' ) ?>
                <div class="stack | s0 justify-content-center absolute right top p--1 shadow | sticker" data-free>
                    <h2 class="f-3 f-cursive uppercase"><?php echo esc_html__( 'Free!', 'zume' ) ?></h2>
                </div>
            </h2>
            <div class="switcher | gapx-3">
                <div class="stack-2 justify-content-between">
                    <img class="mx-auto h-40" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/GetACoach.svg' ) ?>" alt="<?php echo esc_attr__( 'Get a coach', 'zume' ) ?>">
                    <p><?php echo esc_html__( 'Zume offers free online coaching by experienced practitioners who want to see you become a faithful disciple', 'zume' ) ?></p>
                    <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn large outline uppercase"><?php echo esc_html__( 'Get a coach', 'zume' ) ?></a>
                </div>
                <div class="stack-2 justify-content-between">
                    <img class="mx-auto h-40" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/JoinATraining.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training', 'zume' ) ?>">
                    <p><?php echo esc_html__( 'Join a LIVE online training facilitated by experienced practitioners. Grow and learn with other Jesus followers', 'zume' ) ?></p>
                    <a href="<?php echo esc_url( zume_join_a_public_plan_wizard_url() ) ?>" class="btn large outline uppercase"><?php echo esc_html__( 'Join a training', 'zume' ) ?></a>
                </div>
                <div class="stack-2 justify-content-between">
                    <img class="mx-auto h-40" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Register.svg' ) ?>" alt="<?php echo esc_attr__( 'Register', 'zume' ) ?>">
                    <p><?php echo esc_html__( 'Zume registration is completely free! Customize your own training and facilitate with your friends, family and church', 'zume' ) ?></p>
                    <a href="<?php esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large light uppercase"><?php echo esc_attr__( 'Register', 'zume' ) ?></a>
                </div>
            </div>
        </div>

        <div class="hidden py-3 text-center bg-brand-light position-relative">
            <div class="bg-world absolute top bottom left right"></div>
            <div class="container">
                <div class="stack">
                    <h2 class="white"><?php echo esc_html__( 'Zume Discipleship Worldwide Progress Dashboard', 'zume' ) ?></h2>
                    <h3 class="white"><?php echo esc_html__( 'Real-time Impact Metrics from Across the Globe', 'zume' ) ?></h3>
                    <div class="">
                        <div class="grid | gapx-3 gapy-2 p-0 mx-auto | stats-grid">
                            <div class="rounded brand-light bg-white p-0 shadow">
                                <div class="stack | s--2 align-items-center">
                                    <h4><?php echo esc_html__( 'Registrations', 'zume' ) ?></h4>
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Register.svg' ) ?>" alt="<?php echo esc_attr__( 'Registrations', 'zume' ) ?>" class="w-30">
                                    <h5 class="h2">36,294</h5>
                                    <p class="gray-700 f--1">
                                        <?php echo esc_html__( 'Total number of registrations in Zume training', 'zume' ) ?>
                                    </p>
                                </div>
                            </div>
                            <div class="rounded brand-light bg-white shadow p-0">
                                <div class="stack | s--2 align-items-center">
                                    <h4><?php echo esc_html__( 'Group Leaders', 'zume' ) ?></h4>
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/GroupLeaders.svg' ) ?>" alt="<?php echo esc_attr__( 'Group Leaders', 'zume' ) ?>" class="w-30">
                                    <h5 class="h2">1,878</h5>
                                    <p class="gray-700 f--1">
                                        <?php echo esc_html__( 'Total number of user accounts that have recorded a completed Zume.Training course', 'zume' ) ?>
                                    </p>
                                </div>
                            </div>
                            <div class="rounded brand-light bg-white shadow p-0">
                                <div class="stack | s--2 align-items-center">
                                    <h4><?php echo esc_html__( 'Groups Formed', 'zume' ) ?></h4>
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/GroupsFormed.svg' ) ?>" alt="<?php echo esc_attr__( 'Groups Formed', 'zume' ) ?>" class="w-30">
                                    <h5 class="h2">6,805</h5>
                                    <p class="gray-700 f--1">
                                        <?php echo esc_html__( 'Total number of registered training groups (many of which are reused by trainers) in Zume.Training', 'zume' ) ?>
                                    </p>
                                </div>
                            </div>
                            <div class="rounded brand-light bg-white shadow p-0">
                                <div class="stack | s--2 align-items-center">
                                    <h4><?php echo esc_html__( 'Training Page Views', 'zume' ) ?></h4>
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/TrainingPageViews.svg' ) ?>" alt="<?php echo esc_attr__( 'Training Page Views', 'zume' ) ?>" class="w-30">
                                    <h5 class="h2">929,000</h5>
                                    <p class="gray-700 f--1">
                                        <?php echo esc_html__( 'Total number of online training sessions delivered primarily to unregistered users', 'zume' ) ?>
                                    </p>
                                </div>
                            </div>
                            <div class="rounded brand-light bg-white shadow p-0">
                                <div class="stack | s--2 align-items-center">
                                    <h4><?php echo esc_html__( 'Countries & Territories', 'zume' ) ?></h4>
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/countriesandterritories.svg' ) ?>" alt="<?php echo esc_attr__( 'Countries & Territories', 'zume' ) ?>" class="w-30">
                                    <h5 class="h2">234</h5>
                                    <p class="gray-700 f--1">
                                        <?php echo esc_html__( 'Total number of countries and sovereign territories that have accessed Zume.Training online', 'zume' ) ?>
                                    </p>
                                </div>
                            </div>
                            <div class="rounded brand-light bg-white shadow p-0">
                                <div class="stack | s--2 align-items-center">
                                    <h4><?php echo esc_html__( 'Countries with Groups', 'zume' ) ?></h4>
                                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/countriesandterritories-groups.svg' ) ?>" alt="<?php echo esc_attr__( 'Countries & Territories with Groups', 'zume' ) ?>" class="w-30">
                                    <h5 class="h2">156</h5>
                                    <p class="gray-700 f--1">
                                        <?php echo esc_html__( 'Total number of conturies and sovereign territories that have had groups go through Zume.Training', 'zume' ) ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <?php
    }
}
Zume_Training_Home::instance();
