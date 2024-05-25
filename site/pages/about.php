<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_About extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'about';
    public $lang = 'en';
    public static $token = 'app_about';

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
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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

            <h1 class="text-center"><?php echo esc_html__( 'What is Zúme Training?', 'zume' ) ?></h1>

            <div class="center stack-2">
                <p>
                    <?php echo __( 'Zúme, the Greek word for ‘yeast,’ holds a significant meaning. In Matthew 13:33, Jesus compared the kingdom of heaven to yeast mixed into a large amount of flour, permeating the entire dough. This parable illustrates how ordinary people, using ordinary resources, can have exponential impact for the Kingdom of God.', 'zume' ) ?>
                </p>
            </div>

            <h2 class="brand text-center bold"><?php echo esc_html__( 'Zúme Training exists to saturate the globe with multiplying disciples in our generation.', 'zume' ) ?></h2>

            <div class="switcher align-items-center">
                <div class="stack-3">
                    <p>
                        <?php echo __( 'In 2015, a small group committed to fulfilling Jesus’ Great Commission mandate convened for a Jonathan Project Leadership Meeting. They prayed and discussed the challenges in multiplying disciples around the world. Recognizing the need for accessible, multilingual, and flexible training that aligns with Jesus’ call for ordinary people to be ‘yeast’ for the Kingdom, the idea for online video-based training was born. Ultimately, this idea evolved into what is now known as Zúme.', 'zume' ) ?><br><br>
                        <?php echo __( 'The foundational disciple-making principles in Zúme Training come straight from the Bible and have been tested globally for over thirty years. These principles empower ordinary believers to become disciples who, in turn, make disciples, resulting in millions of disciples advancing the Kingdom in spiritually dark places.', 'zume' ) ?>
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
                    <?php echo __( 'Launched on February 14, 2017, through Kingdom collaboration, Zúme Training remains an open initiative without formal organizational control or a separate entity. Since Zúme is not run by an organization, there is no formal statement of faith. All involved, however, would agree with the Lausanne Covenant.', 'zume' ) ?>
                </p>
            </div>

            <div class="switcher align-items-center">
                <p>
                    <?php echo __( 'The goal is to saturate the globe with multiplying disciples in our generation. The Biblical principles found in this training are simple. The world changing potential is in the practice of these principles.', 'zume' ) ?><br></br>
                    <?php echo __( 'The vision of Zúme is comparable to yeast working through the entire dough, spreading basic Kingdom tools into neighborhoods worldwide.', 'zume' ) ?><br></br>
                </p>
                <div class="center">
                    <img class="w-70" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/WorldGroups.svg' ) ?>" alt="groups around the globe">
                </div>
            </div>

            <h2 class="brand text-center bold"><?php echo __( 'The vision of Zúme has two parts:', 'zume' ) ?></h2>

            <div class="switcher align-items-center">
                <div class="center">
                    <span class="brand bold"><?php echo esc_html__( '1 Training', 'zume' ) ?></span>
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/1Training.svg' ) ?>" alt="One training">
                </div>
                <p>
                    <span class="bold"><?php echo __( 'Part 1:', 'zume' ) ?></span><br>
                    <?php echo __( 'To train at least one disciple maker for every 5,000 people in North America and one disciple maker for every 50,000 people globally.', 'zume' ) ?>
                </p>
            </div>

            <div class="switcher align-items-center">
                <div class="center">
                    <span class="brand bold"><?php echo esc_html__( '2 Simple Churches', 'zume' ) ?></span>
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/2Churches.svg' ) ?>" alt="2 simple churches">
                </div>
                <p>
                    <span class="bold"><?php echo __( 'Part 2:', 'zume' ) ?></span><br>
                    <?php echo __( 'For trained disciple makers to start at least 2 simple multiplying churches for every 5,000 people in North America and 2 simple churches for every 50,000 people globally.', 'zume' ) ?><br></br>
                </p>
            </div>
            <br>
            <div class="center stack-2">
                <p>
                    <?php echo __( 'With these small beginnings ... what the Bible calls yeast ... we could see the world covered with multiplying disciples and churches. Explore Zúme Training and find out how!', 'zume' ) ?>
                </p>
            </div>
            <a href="<?php echo esc_url( zume_start_wizard_url() ) ?>" class="btn large light uppercase fit-content"><?php echo esc_html__( 'Get Started', 'zume' ) ?></a>
        </div>

        <div class="page bg-gray-100">
            <div class="center container-md stack-3">
                <h2 class="brand text-center"><?php echo esc_html__( 'How does Zúme Training Work?', 'zume' ) ?></h2>
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
                    <div class="stack | px-3">
                        <div class="position-relative">
                            <div class="responsive-embed widescreen m0">
                                <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '70' ) ) ?>" frameborder="0" allowfullscreen></iframe>
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
                        <h3 class="f-0 bold"><?php echo esc_html__( 'Zúme is NOT like other trainings!', 'zume' ) ?></h3>
                        <p>
                            <b><?php echo esc_html__( 'First:', 'zume' ) ?></b><br>
                            <?php echo esc_html__( 'Zúme is designed to be done as a group. Group exercise, discussions, and practicing of skills all will be better with others, so gather a group, if possible.', 'zume' ) ?>
                        </p>
                        <p>
                            <b><?php echo esc_html__( 'Second:', 'zume' ) ?></b><br>
                            <?php echo esc_html__( 'Zúme is about developing skills, building competence, not just gaining knowledge . In every session, the goal is fruitful action. The best outcome of the training will be a changed lifestyle and an experience of increased power in your faith.', 'zume' ) ?>
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
                        <h3 class="white bold"><?php echo esc_html__( 'Needed for the training:', 'zume' ) ?></h3>
                        <ul role="list" class="stack-1">
                            <li><?php echo __( 'At least 3 people, but ideally less than 12.', 'zume' ) ?></li>
                            <li><?php echo __( 'Commitment to spend 20 hours learning and practicing the concepts and tools in the course.', 'zume' ) ?></li>
                            <li><?php echo __( 'A person to facilitate (potentially you) the meeting time and location, to guide the follow-up discussion, and facilitate action prompts.', 'zume' ) ?></li>
                        </ul>
                    </div>
                    <div class="center">
                        <img class="w-70" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Whats-Required-NEW.svg' ) ?>" alt="group discussion">
                    </div>
                </div>
                <div class="switcher align-items-center">
                    <div class="stack-2">
                        <h3 class="white bold"><?php echo esc_html__( 'NOT needed for the training:', 'zume' ) ?></h3>
                        <ul role="list" class="stack-1">
                            <li><?php echo __( 'More knowledge or experience than the rest of your group is not needed! If you can click next, you can lead a Zúme Training.', 'zume' ) ?></li>
                            <li><?php echo __( 'Special permission to lead a training is not needed! Zúme is self-facilitated, self-initiated, and you can start today.', 'zume' ) ?></li>
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
                        <p><?php echo __( 'All along the way, the Zúme community is eager to support you by providing a COACH to help you and your group successfully implement the training. Don’t hesitate to reach out with questions or concerns!', 'zume' ) ?></p>
                        <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn uppercase light large s-4 fit-content"><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></a>
                    </div>
                </div>
            </div>
        </div>

        <?php if ( !is_user_logged_in() ): ?>

            <div class="page container-md center stack-3">
                <h2 class="t-3 text-center"><?php echo esc_html__( 'Are you ready? Register today.', 'zume' ) ?></h2>
                <div class="center">
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Register-About.svg' ) ?>" alt="person Registering" class="w-50">
                </div>
                <a href="<?php echo esc_url( zume_start_wizard_url() ) ?>" class="btn large light uppercase fit-content"><?php echo esc_html__( 'Register Free', 'zume' ) ?></a>
            </div>

        <?php endif; ?>

        <?php
    }
}
Zume_Training_About::instance();
