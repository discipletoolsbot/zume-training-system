<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Page extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'training';
    public $lang = 'en';
    public static $token = 'app_training';

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
            jQuery(document).ready(function($){
                jQuery(document).foundation();

                const trainingLinks = Array.from(document.querySelectorAll('.training-link a'))

                const scrollItems = trainingLinks.reduce(function(links, link) {
                    const href = link.getAttribute('href')

                    const scrollItem = document.querySelector(href)

                    if (scrollItem) {
                        links.push(scrollItem)
                    }
                    return links
                }, [])

                window.addEventListener('scroll', onWindowScroll)
                const screenHeight = window.screen.height

                function onWindowScroll(event) {
                    const scrollTop = $(this).scrollTop()

                    const currentScrolledItems = scrollItems.reduce((items, item) => {

                        const rect = item.getBoundingClientRect()
                        if ( $(item).offset().top < scrollTop + screenHeight * 0.4 ) {
                            items.push(item)
                        }
                        return items
                    }, [])

                    const lastItem = currentScrolledItems[currentScrolledItems.length - 1]
                    const id = lastItem ? lastItem.id : ''

                    trainingLinks.forEach(element => {
                        const parent = element.parentElement
                        parent.classList.remove('active')

                        if ( element.getAttribute('href') === '#' + id ) {
                            parent.classList.add('active')
                        }
                    });
                }
            });
        </script>
        <?php
    }

    public function body(){
        global $zume_languages_by_code, $zume_user_profile;
        $training_items = zume_training_items();

        require __DIR__ . '/../parts/nav.php';

        ?>

        <div class="container-md stack-2 center | py-2">
            <h1 class="text-center"><?php echo esc_html__( 'Get started with Zúme Training', 'zume' ) ?></h1>
            <div class="switcher | training-path">
                <div class="stack | card | switcher-width-40">
                    <h2 class="f-1 text-center"><?php echo esc_html__( 'Create your own training group', 'zume' ) ?></h2>
                    <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Gather-A-Group-01.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training group', 'zume' ) ?>">
                    <p class="mb-0">
                        <?php echo esc_html__( 'Gather a few friends or go through the course with an existing small group. Create your own training group and track your progress.', 'zume' ) ?>
                    </p>
                    <a href="<?php echo esc_url( zume_make_a_group_wizard_url() ) ?>" class="btn mt-auto"><?php echo esc_html__( 'Create', 'zume' ) ?></a>
                </div>
                <div class="stack | card | switcher-width-40">
                    <h2 class="f-1 text-center"><?php echo esc_html__( 'Join a training group', 'zume' ) ?></h2>
                    <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/JoinTraining.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training group', 'zume' ) ?>">
                    <p class="mb-0">
                        <?php echo esc_html__( 'If you can‘t gather a group right now, consider joining one of our online training groups lead by an experienced Zúme coach.', 'zume' ) ?>
                    </p>
                    <a href="<?php echo esc_url( zume_join_a_public_plan_wizard_url() ) ?>" class="btn mt-auto"><?php echo esc_html__( 'Join', 'zume' ) ?></a>
                </div>
                <div class="stack | card | switcher-width-40">
                    <h2 class="f-1 text-center"><?php echo esc_html__( 'Request a coach', 'zume' ) ?></h2>
                    <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/coach-2guys.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training', 'zume' ) ?>">
                    <p class="mb-0">
                        <?php echo esc_html__( 'We can connect you with free Zúme coach who is committed to helping you understand the training and become a fruitful disciple.', 'zume' ) ?>
                    </p>
                    <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn mt-auto"><?php echo esc_html__( 'Get Help', 'zume' ) ?></a>
                </div>
            </div>
        </div>
        <div class="training-page">
            <div class="left-menu">
                <h2 class="p-2 uppercase white bg-brand-light circle-end"><?php echo esc_html__( 'Course Overview', 'zume' ) ?></h2>
                <ul>
                    <li class="training-link"><a href="#course-concepts" class="px-2"><?php echo esc_html__( 'Course Concepts', 'zume' ) ?></a></li>
                    <li class="training-link"><a href="#training-schedules" class="px-2"><?php echo esc_html__( 'Training Schedules', 'zume' ) ?></a></li>
                    <li class="training-link"><a href="#what-is-required" class="px-2"><?php echo esc_html__( 'What is required?', 'zume' ) ?></a></li>
                </ul>
                <div class="bg-brand-light p-2 rounded-end">
                    <img class="w-60 mx-auto" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Whats-Required-NEW.svg' ) ?>" alt="Group doing zume">
                </div>
            </div>
            <div class="stack-4 | content">
                <div class="stack | position-relative">
                    <span class="offset-anchor" id="course-concepts"></span>
                    <h2 class="h1 brand-light">
                        <?php echo esc_html__( 'Course Concepts', 'zume' ) ?>
                    </h2>
                    <p class="f-medium">
                        <?php echo esc_html__( 'In this self-facilitated course, you and your training group will use short videos, discussion questions, and simple exercises to develop your skills and knowledge in the following areas:', 'zume' ) ?>
                    </p>
                    <div class="concepts">
                        <div class="stack--4">
                            <h3 class="concepts__title"><?php echo esc_html__( 'Discipleship Concepts', 'zume' ) ?></h3>
                            <ul class="stack--4">
                                <?php
                                foreach ( $training_items as $item ) {
                                    if ( $item['type'] === 'concept' ) {
                                        ?>
                                        <li class="d-flex gap-2 align-items-center">
                                            <span class="concepts__tick"><span class="icon brand-light z-icon-check-mark f-2"></span></span><span><?php echo esc_html( $item['title'] ) ?></span>
                                        </li>
                                        <?php
                                    }
                                }
                                ?>
                            </ul>
                            <h3 class="concepts__title"><?php echo esc_html__( 'Spiritual Practices', 'zume' ) ?></h3>
                            <ul class="stack--4">
                                <?php
                                foreach ( $training_items as $item ) {
                                    if ( $item['type'] === 'tool' ) {
                                        ?>
                                        <li class="d-flex gap-2 align-items-center">
                                            <span class="concepts__tick"><span class="icon brand-light z-icon-check-mark f-2"></span></span><span><?php echo esc_html( $item['title'] ) ?></span>
                                        </li>
                                        <?php
                                    }
                                }
                                ?>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="stack-2 | position-relative">
                    <span class="offset-anchor" id="training-schedules"></span>
                    <h2 class="brand-light"><?php echo esc_html__( 'Training Schedules', 'zume' ) ?></h2>
                    <p>
                        <?php echo esc_html__( 'Zúme is 20 hours of training. But those 20 hours can be broken up differently depending on your training group‘s availability.', 'zume' ) ?>
                    </p>
                    <div class="stack-1">
                        <div class="switcher | switcher-width-40 align-items-center gapx-2">
                            <a href="<?php echo esc_url( zume_10_session_url() ) ?>" class="card-btn training-card" role="button">
                                <h3 class="training-card__title h1"><?php echo esc_html__( '10 Sessions', 'zume' ) ?></h3>
                                <div class="w-6rem brand-light">
                                    <?php //phpcs:ignore ?>
                                    <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/course.svg' ) ?>
                                </div>
                            </a>
                            <p class="mx-auto mw-50ch w-100">
                                <?php echo esc_html__( 'The original Zúme course format is 10 two hour sessions. Each session finishes with practical obedience steps and ways to share in-between sessions. This format is often run once a week for 10 weeks.', 'zume' ) ?>
                            </p>
                        </div>
                        <div class="switcher | switcher-width-40 align-items-center gapx-2">
                            <a href="<?php echo esc_url( zume_20_session_url() ) ?>" class="card-btn training-card" role="button">
                                <h3 class="training-card__title h1"><?php echo esc_html__( '20 Sessions', 'zume' ) ?></h3>
                                <div class="w-6rem brand-light">
                                    <?php //phpcs:ignore ?>
                                    <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/course.svg' ) ?>
                                </div>
                            </a>
                            <p class="mx-auto mw-50ch w-100">
                                <?php echo esc_html__( 'For a longer slower pace course with more opportunity for gaining competence in the concepts and skills, the 20 session format has more practice opportunities for each of the concepts and tools.', 'zume' ) ?>
                            </p>
                        </div>
                        <div class="switcher | switcher-width-40 align-items-center gapx-2">
                            <a href="<?php echo esc_url( zume_intensive_session_url() ) ?>" class="card-btn training-card" role="button">
                                <h3 class="training-card__title h1"><?php echo esc_html__( 'Intensive', 'zume' ) ?></h3>
                                <div class="w-6rem brand-light">
                                    <?php //phpcs:ignore ?>
                                    <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/course.svg' ) ?>
                                </div>
                            </a>
                            <p class="mx-auto mw-50ch w-100">
                                <?php echo esc_html__( 'Zúme can be compressed into 5 half day sections of 4 hours each. This can be done with a Friday evening (4 hours), and all day Saturday (8 hours) and all day Sunday (8 hours).', 'zume' ) ?>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="stack-2 | position-relative">
                    <span class="offset-anchor" id="what-is-required"></span>
                    <h2 class="brand-light"><?php echo esc_html__( 'What is required?', 'zume' ) ?></h2>
                    <h3><?php echo esc_html__( 'Needed for the course:', 'zume' ) ?></h3>
                    <ul role="list">
                        <li><?php echo esc_html__( 'At least 3 people, but ideally less than 12.', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'Commitment to spend 20 hours learning and practicing the concepts and tools in the course.', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'A person to facilitate (potentially you) the meeting time and location, to guide the follow-up discussion, and facilitate action prompts.', 'zume' ) ?></li>
                    </ul>
                    <h3><?php echo esc_html__( 'NOT needed for the course:', 'zume' ) ?></h3>
                    <ul role="list">
                        <li><?php echo esc_html__( 'More knowledge or experience than the rest of your group is not needed! If you can click next, you can lead a Zúme Training.', 'zume' ) ?></li>
                        <li><?php echo esc_html__( 'Special permission to lead a course is not needed! Zúme is self-facilitated, self-initiated, and you can start today.', 'zume' ) ?></li>
                    </ul>
                </div>
            </div>
        </div>

        <?php
    }
}
Zume_Training_Page::instance();










































