<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Home extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'home';
    public $lang = 'en_US';
    public static $token = 'app_home';

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

        if ( empty( $url_parts[0] ?? '' ) && ! dt_is_rest() ) {

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
        $current_language_code = zume_current_language();
        ?>

        <div class="stack | s0 justify-content-center absolute top left mx-0 my-3 p--1 hard-shadow | sticker">
            <h2 class="f-3 lh-sm"><?php echo esc_html__( '45+', 'zume' ) ?></h2>
            <h3 class="uppercase f--2 lh-sm"><?php echo esc_html__( 'Languages', 'zume' ) ?></h3>
        </div>
        <?php require __DIR__ . '/../parts/nav.php'; ?>

        <div class="cover-page | hero min-vh-90 position-relative">

            <div class="switcher container | align-items-center gap0 pt-4">
                <div class="show-for-large position-relative">
                    <div class="bg-path | absolute">
                        <img class="flip-on-rtl" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Blue-Path-01.svg' ) ?>" alt="path">
                    </div>
                    <img class="flip-on-rtl" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/JesusPointing-1.svg' ) ?>" alt="Jesus pointing">
                </div>
                <div class="stack | grow-2 text-center">
                    <div id="hero-text-section">
                        <?php echo get_post_meta( '19850', 'home_'.$current_language_code, true ); ?>
                    </div>
                    <div class="switcher | switcher-width-20 s-3">

                        <?php if ( is_user_logged_in() ): ?>

                            <a href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn large outline light uppercase w-80 px-0"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>

                        <?php else : ?>

                            <a href="<?php echo esc_url( zume_getting_started_url( 'login' ) ) ?>" class="btn large outline light uppercase w-80 px-0"><?php echo esc_html__( 'Login', 'zume' ) ?></a>
                            <a href="<?php echo esc_url( zume_getting_started_url( 'register' ) ) ?>" class="btn large light uppercase w-80 px-0"><?php echo esc_html__( 'Register Free', 'zume' ) ?></a>

                        <?php endif; ?>

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
                    <ul role="list" class="check-list f-2 bold lh-md">
                        <li><?php echo esc_html__( 'Group Discussions', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'Self-Facilitated', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'Practice-Oriented', 'zume' ) ?></li>
                        <li><?php echo esc_html__( '32 Concepts and Skills', 'zume' ) ?></li>
                        <li><?php echo esc_html__( '20 hours of Training', 'zume' ) ?></li>
                    </ul>
                </div>
                <div class="cover">
                    <div class="center stack">
                        <img class="" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Whats-Required-NEW.svg' ) ?>" alt="Group doing zume">
                        <h3 class="text-center f-1 mx-2"><?php echo esc_html__( 'Free. Anytime. Anywhere.', 'zume' ) ?></h3>
                    </div>
                </div>
            </div>
            <h2 class="text-center"><?php echo esc_html__( 'Gain insight into...', 'zume' ) ?></h2>
            <div class="switcher | s-3">
                <div class="stack">
                    <img class="mx-auto w-25" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Being-A-Disciple-01.svg' ) ?>" alt="Being a disciple">
                    <div class="mx-auto">
                        <h3 class="h2 brand"><?php echo esc_html__( 'Being A Disciple', 'zume' ) ?></h3>
                        <ul role="list" class="f-1 f-medium | check-list" data-check-size="1" data-check-color="brand">
                            <li><?php echo esc_html__( "What's a Disciple?", 'zume' ) ?></li>
                            <li><?php echo esc_html__( "What's a Church?", 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Keys to Spiritual Growth', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Personal Bible Study', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Strong Prayer Life', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'The Power of Obedient Faith', 'zume' ) ?></li>
                        </ul>
                    </div>
                </div>
                <div class="stack">
                    <img class="mx-auto w-25" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Making-Disciples-01.svg' ) ?>" alt="Being a disciple">
                    <div class="mx-auto">
                        <h3 class="h2 brand"><?php echo esc_html__( 'Making Disciples', 'zume' ) ?></h3>
                        <ul role="list" class="f-1 f-medium | check-list" data-check-size="1" data-check-color="brand">
                            <li><?php echo esc_html__( "Sharing God's Story", 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Telling Your Story', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Engaging Seekers', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Vision Casting Multiplication', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Leading a Simple Church', 'zume' ) ?></li>
                            <li><?php echo esc_html__( 'Training Others', 'zume' ) ?></li>
                        </ul>
                    </div>
                </div>
            </div>
            <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large uppercase light mx-auto fit-content"><?php echo esc_html__( "I'm Ready!", 'zume' ) ?></a>
        </div>

        <?php // @todo unfinished development below?? ?>
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
                            <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '69' ) ) ?>" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <!-- <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/VideoGraphic-2.svg' ) ?>" alt="zume video"> -->
                    </div>
                </div>
            </div>
            <button class="hidden | btn large outline dark light fit-content uppercase mx-auto"><?php echo esc_html__( 'Watch', 'zume' ) ?></button>
        </div>

        <div class="center container stack-3 | page">
            <h2 class="text-center"><?php echo esc_html__( 'How it Works', 'zume' ) ?></h2>
            <div class="switcher | switcher-width-40 align-items-center">
                <div class="stack px-0">
                    <div class="d-flex align-items-center">
                        <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/free-01.svg' ) ?>" alt="play button">
                        <p class="w-80"><?php printf( esc_html__( '%1$sFree Registration%2$s gives you full access to all training materials and online coaching.', 'zume' ), '<b>', '</b>' ) ?></p>
                    </div>
                    <div class="d-flex align-items-center">
                        <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Play-Button.svg' ) ?>" alt="play button">
                        <p class="w-80"><?php printf( esc_html__( '%1$sInstructional Videos%2$s help your group understand basic principles of multiplying disciples.', 'zume' ), '<b>', '</b>' ) ?></p>
                    </div>
                    <div class="d-flex align-items-center">
                        <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/GroupDiscussions.svg' ) ?>" alt="play button">
                        <p class="w-80"><?php printf( esc_html__( '%1$sGroup Discussions%2$s help your group think through what is being shared.', 'zume' ), '<b>', '</b>' ) ?></p>
                    </div>
                    <div class="d-flex align-items-center">
                        <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/SimpleExercises.svg' ) ?>" alt="play button">
                        <p class="w-80"><?php printf( esc_html__( '%1$sSimple Exercises%2$s help your group put what you are learning into practice.', 'zume' ), '<b>', '</b>' ) ?></p>
                    </div>
                    <div class="d-flex align-items-center">
                        <img class="w-20 p-0" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/SessionChallenges.svg' ) ?>" alt="play button">
                        <p class="w-80"><?php printf( esc_html__( '%1$sSession Challenges%2$s help your group keep learning and growing between sessions.', 'zume' ), '<b>', '</b>' ) ?></p>
                    </div>
                </div>
                <div class="px-3">
                    <div class="position-relative">
                        <div class="responsive-embed widescreen m0">
                            <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '70' ) ) ?>" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <a href="<?php echo esc_url( zume_about_url() ) ?>" class="d-block uppercase bold brand fit-content mx-auto"><?php echo esc_html__( 'More about zume', 'zume' ) ?></a>
                </div>
            </div>


            <?php if ( is_user_logged_in() ): ?>

                <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large uppercase light mx-auto fit-content"><?php echo esc_html__( "I'm Ready!", 'zume' ) ?></a>

            <?php else : ?>

                <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large uppercase light"><?php echo esc_html__( 'Register', 'zume' ) ?></a>

            <?php endif; ?>

        </div>

        <?php $width = 1024 ?>
        <?php $height = 753 ?>
        <?php $n = $height / $width ?>
        <?php $length = 1 - $n / 2 ?>
        <?php $xradius = $n / 2 ?>

        <svg height="0" width="0">
            <clipPath id="clip-rounded-end" clipPathUnits="objectBoundingBox">
                <path d="<?php echo esc_attr( "M $length 1 h -$length v -1 h $length A $xradius 0.5, 0, 0 1, $length 1" ) ?>"/>
            </clipPath>
            <clipPath id="clip-rounded-start" clipPathUnits="objectBoundingBox">
                <path d="<?php echo esc_attr( "M $xradius 1 h $length v -1 h -$length A $xradius 0.5, 0, 0 0, $xradius 1" ) ?>"/>
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
                            <p>
                                <em><?php echo esc_html__( 'I spent years faithfully attending bible studies and church, but had somehow not understood the simple truths of disciple making that I found here in Zúme. ~ C', 'zume' ) ?></em>
                            </p>
                        </div>
                    </div>
                    <div class="story-card invert">
                        <div class="story-card__logo">
                            <?php //phpcs:ignore ?>
                            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/Zume-Z-crop.svg' ) ?>
                        </div>
                        <div class="story-card__text">
                            <p>
                                <em><?php echo esc_html__( 'Anyone can do this. You don‘t need any special skills or training. ~ J', 'zume' ) ?></em>
                            </p>
                        </div>
                    </div>
                    <div class="story-card">
                        <div class="story-card__logo">
                            <?php //phpcs:ignore ?>
                            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/Zume-Z-crop.svg' ) ?>
                        </div>
                        <div class="story-card__text">
                            <p>
                                <em><?php echo esc_html__( 'This is for all disciples who want to obey the Great Commission. Zúme training outlines a normal Christian lifestyle. ~ D', 'zume' ) ?></em>
                            </p>
                        </div>
                    </div>
                    <div class="story-card invert">
                        <div class="story-card__logo">
                            <?php //phpcs:ignore ?>
                            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/Zume-Z-crop.svg' ) ?>
                        </div>
                        <div class="story-card__text">
                            <p>
                                <em><?php echo esc_html__( 'These concepts and skills transformed our church and our impact on the world. ~ R', 'zume' ) ?></em>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-brand-gradient">
            <div class="container stack-2 | py-2 white text-center">
                <h2 class="position-relative px-4 fit-content mx-auto"><?php echo esc_html__( 'Zúme = Yeast', 'zume' ) ?>
                    <div class="d-flex justify-content-center absolute right top bottom h-125 w-20">
                        <?php //phpcs:ignore ?>
                        <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/yeast.svg' ) ?>
                    </div>
                </h2>
                <p class="bold"><?php echo esc_html__( 'Zúme means yeast in Greek. In Matthew 13:33, Jesus is quoted as saying, "The Kingdom of Heaven is like a woman who took yeast and mixed it into a large amount of flour until it was all leavened." This illustrates how ordinary people, using ordinary resources, can have an extraordinary impact for the Kingdom of God. Zúme aims to equip and empower ordinary believers to saturate the globe with multiplying disciples in our generation.', 'zume' ) ?></p>
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
            <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn large uppercase light fit-content mx-auto"><?php echo esc_html__( 'Get started', 'zume' ) ?></a>
        </div>

        <?php
    }
}
Zume_Training_Home::instance();
