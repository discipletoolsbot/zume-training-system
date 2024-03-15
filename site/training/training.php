<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Page extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'training';
    public $lang = 'en';
    public static $token = 'zume_app_training';

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

        require __DIR__ . '/../parts/nav.php';

        ?>

        <div class="container-md stack-2 center | py-1">
            <h1 class="text-center"><?php echo esc_html__( "Training Path... It's your choice" ) ?></h1>
            <div class="switcher | training-path">
                <div class="stack | card | switcher-width-40">
                    <h2 class="f-1 text-center"><?php echo esc_html__( 'Create your own training', 'zume' ) ?></h2>
                    <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Gather-A-Group-01.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training', 'zume' ) ?>">
                    <p class="mb-0">
                        <?php echo esc_html__( 'Gather a few friends or go through the training with an existing small group. Create your own training plan and track your progress.', 'zume' ) ?>
                    </p>
                    <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn light uppercase mt-auto"><?php echo esc_html__( 'Get started', 'zume' ) ?></a>
                </div>
                <div class="stack | card | switcher-width-40">
                    <h2 class="f-1 text-center"><?php echo esc_html__( 'Join a training.', 'zume' ) ?></h2>
                    <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/JoinTraining.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training', 'zume' ) ?>">
                    <p class="mb-0">
                        <?php echo esc_html__( 'If you can‘t gather a group right now, consider joining one of our online trainings lead by an experienced Zúme coach.', 'zume' ) ?>
                    </p>
                    <a href="<?php echo esc_url( zume_join_a_public_plan_wizard_url() ) ?>" class="btn light uppercase mt-auto"><?php echo esc_html__( 'Join now', 'zume' ) ?></a>
                </div>
                <div class="stack | card | switcher-width-40">
                    <h2 class="f-1 text-center"><?php echo esc_html__( 'Request a coach', 'zume' ) ?></h2>
                    <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/coach-2guys.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training', 'zume' ) ?>">
                    <p class="mb-0">
                        <?php echo esc_html__( 'We can connect you with free Zúme coach who is committed to helping you get the training and becoming a fruitful disciple.', 'zume' ) ?>
                    </p>
                    <a href="<?php echo esc_url( zume_get_a_coach_url() ) ?>" class="btn light uppercase mt-auto"><?php echo esc_html__( 'Learn more', 'zume' ) ?></a>
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
            <div class="stack-4 | content-area">
                <div class="stack | position-relative">
                    <span class="offset-anchor" id="course-concepts"></span>
                    <h2 class="h1 brand-light">
                        <?php echo esc_html__( 'Course Concepts', 'zume' ) ?>
                    </h2>
                    <p class="f-medium">
                        <?php echo esc_html__( 'In this self-facilitated course, you and your group will uses short videos, discussion questions, and simple exercises to develop your skills and knowledge in the following areas:', 'zume' ) ?>
                    </p>
                    <div class="concepts">
                        <div class="stack--4">
                            <h3 class="concepts__title"><?php echo esc_html__( 'Discipleship Concepts', 'zume' ) ?></h3>
                            <ul class="stack--4">
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'God Uses Ordinary People', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'What is a Disciple and a Church?', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Four Main Ways God Grows Disciples', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Vision for Multiplying Disciples', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Following and Leading at the Same Time.', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Eyes to See Where the Kingdom Isn‘t', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Learning How the Kingdom Grows', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Why Pace of Multiplication Matters', 'zume' ) ?></span>
                                </li>
                            </ul>
                            <h3 class="concepts__title"><?php echo esc_html__( 'Spiritual Practices', 'zume' ) ?></h3>
                            <ul class="stack--4">
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Hearing and Obeying God', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Study the Bible', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Live out Loving Accountability', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Spend an Hour in Prayer', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Baptize', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Lead the Lord‘s Supper', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Prayer Walking', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'A Simple Way to Pray for Others', 'zume' ) ?></span>
                                </li>
                            </ul>
                            <h3 class="concepts__title"><?php echo esc_html__( 'Personal Evangelism', 'zume' ) ?></h3>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Learning to Engage Others', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Find a Person of Peace', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Share the Gospel', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Tell Your 3 Minute Testimony', 'zume' ) ?></span>
                                </li>
                            <h3 class="concepts__title"><?php echo esc_html__( 'Leadership Development', 'zume' ) ?></h3>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Training Cycle for Maturing Disciples', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Practice Leading a Simple Church', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Facilitate a Leadership Cell', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Use a Coaching Checklist', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Facilitate a Peer Mentoring Group', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Introduction to Four Fields Tool', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'How to Make a Generational Map', 'zume' ) ?></span>
                                </li>
                                <li class="d-flex gap-2 align-items-center">
                                    <span class="concepts__tick"><span class="icon brand-light zume-check-mark f-2"></span></span><span><?php echo esc_html__( 'Create a 3-Month Implementation Plan', 'zume' ) ?></span>
                                </li>
                        </div>
                    </div>
                </div>
                <div class="stack-2 | position-relative">
                    <span class="offset-anchor" id="training-schedules"></span>
                    <h2 class="brand-light"><?php echo esc_html__( 'Training Schedules', 'zume' ) ?></h2>
                    <p>
                        <?php echo esc_html__( 'Zúme is 20 hours of training. But those 20 hours can be broken up differently depending on your groups availability.', 'zume' ) ?>
                    </p>
                    <div class="stack-1">
                        <div class="switcher | switcher-width-40 align-items-center mx-auto gapx-2">
                            <a href="<?php echo esc_url( zume_10_session_url() ) ?>" class="card-btn training-card" role="button">
                                <h3 class="training-card__title h1"><?php echo esc_html__( '10 Sessions', 'zume' ) ?></h3>
                                <div class="w-6rem brand-light">
                                    <?php //phpcs:ignore ?>
                                    <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/course.svg' ) ?>
                                </div>
                            </a>
                            <p class="mx-auto mw-50ch w-100">
                                <?php echo esc_html__( 'The original Zúme training format is 10 two hour sessions. Each session finishes with practical obedience steps and ways to share in-between sessions. This format is often ran once a week for 10 weeks.', 'zume' ) ?>
                            </p>
                        </div>
                        <div class="switcher | switcher-width-40 align-items-center mx-auto gapx-2">
                            <a href="<?php echo esc_url( zume_20_session_url() ) ?>" class="card-btn training-card" role="button">
                                <h3 class="training-card__title h1"><?php echo esc_html__( '20 Sessions', 'zume' ) ?></h3>
                                <div class="w-6rem brand-light">
                                    <?php //phpcs:ignore ?>
                                    <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . 'assets/images/course.svg' ) ?>
                                </div>
                            </a>
                            <p class="mx-auto mw-50ch w-100">
                                <?php echo esc_html__( 'For a longer slower pace training with more opportunity for gaining competence in the concepts and skills, the 20 session format has more practice opportunities for each of the concepts and tools.', 'zume' ) ?>
                            </p>
                        </div>
                        <div class="switcher | switcher-width-40 align-items-center mx-auto gapx-2">
                            <a href="<?php echo esc_url( zume_intensive_session_url() ) ?>" class="card-btn training-card" role="button">
                                <h3 class="training-card__title h1"><?php echo esc_html__( '3 Day Intensive', 'zume' ) ?></h3>
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
                    <p>Aute reprehenderit anim ipsum ea aliqua cillum occaecat laboris. Do Lorem id in ad velit id culpa culpa velit cillum in. Cillum aliquip enim elit eiusmod. Nulla dolore sunt dolor eu irure. Aliquip commodo officia incididunt exercitation ad cillum excepteur laboris reprehenderit laborum ipsum fugiat. Do veniam eu sunt elit est amet. Aliquip deserunt occaecat est ipsum non ipsum eu non nulla est fugiat enim sunt amet.</p>
                    <p>Cupidatat velit tempor velit ut ex nulla consequat incididunt in qui dolore incididunt do. Et quis consectetur ex mollit in laborum. Aute dolor reprehenderit anim eiusmod dolor magna. Ex veniam quis officia ut quis exercitation id laborum do dolore ea et consectetur elit.</p>
                    <p>Elit culpa dolore est Lorem est ex id nisi. Lorem qui laboris elit et esse voluptate in qui ullamco dolore voluptate. Et eiusmod consectetur non officia aliquip ullamco.</p>
                </div>
            </div>
        </div>

        <?php

        $strings = [
            __( 'Zúme Training', 'zume' ),
            '-------------------',
            __( 'Create your own training.', 'zume' ),
            __( 'Join a training.', 'zume' ),
            __( 'Get help starting.', 'zume' ),
            __( 'Set up wizard', 'zume' ),
            __( 'Join a training', 'zume' ),
            __( 'Request a coach', 'zume' ),
            __( 'Gather a few friends or go through the training with an existing small group. Create your own training plan and track your progress.', 'zume' ),
            __( 'If you can‘t gather a group right now, consider joining one of our online trainings lead by an experienced Zúme coach.', 'zume' ),
            __( 'We can connect you with free Zúme coach who is committed to helping you get the training and becoming a fruitful disciple.', 'zume' ),
            '-------------------',
            __( 'Course Overview', 'zume' ),
            __( 'What is required?', 'zume' ),
            '-------------------',

            __( 'Course Concepts', 'zume' ),
            __( 'In this self-facilitated course, you and your group will uses short videos, discussion questions, and simple exercises to develop your skills and knowledge in the following areas:', 'zume' ),

            '-------------------',
            __( 'Discipleship Concepts', 'zume' ),
            __( 'God Uses Ordinary People', 'zume' ),
            __( 'What is a Disciple and a Church?', 'zume' ),
            __( 'Four Main Ways God Grows Disciples', 'zume' ),
            __( 'Vision for Multiplying Disciples', 'zume' ),
            __( 'Following and Leading at the Same Time.', 'zume' ),
            __( 'Eyes to See Where the Kingdom Isn‘t', 'zume' ),
            __( 'Learning How the Kingdom Grows', 'zume' ),
            __( 'Why Pace of Multiplication Matters', 'zume' ),

            '-------------------',
            __( 'Spiritual Practices', 'zume' ),
            __( 'Hearing and Obeying God', 'zume' ),
            __( 'How to Study the Bible', 'zume' ),
            __( 'How to Live out Loving Accountability', 'zume' ),
            __( 'How to Spend an Hour in Prayer', 'zume' ),
            __( 'How to Baptize', 'zume' ),
            __( 'How to Lead the Lord‘s Supper', 'zume' ),
            __( 'Prayer Walking', 'zume' ),
            __( 'A Simple Way to Pray for Others', 'zume' ),

            '-------------------',
            __( ' Personal Evangelism', 'zume' ),
            __( 'Learning to Engage Others', 'zume' ),
            __( 'How to Find a Person of Peace', 'zume' ),
            __( 'How to Share the Gospel', 'zume' ),
            __( 'How to Tell Your 3 Minute Testimony', 'zume' ),

            '-------------------',
            __( 'Leadership Development', 'zume' ),
            __( 'Training Cycle for Maturing Disciples', 'zume' ),
            __( 'Practice Leading a Simple Church', 'zume' ),
            __( 'How to Facilitate a Leadership Cell', 'zume' ),
            __( 'How to Use a Coaching Checklist', 'zume' ),
            __( 'How to Facilitate a Peer Mentoring Group', 'zume' ),
            __( 'Introduction to Four Fields Tool', 'zume' ),
            __( 'How to Make a Generational Map', 'zume' ),
            __( 'Create a 3-Month Implementation Plan', 'zume' ),

            '-------------------',
            __( 'Training Schedules', 'zume' ),
            __( 'Zúme is 20 hours of training. But those 20 hours can be broken up differently depending on your groups availability.', 'zume' ),
            __( '10 Sessions', 'zume' ),
            __( 'The original Züme training format is 10 two hour sessions. Each session finishes with practical obedience steps and ways to share in-between sessions. This format is often ran once a week for 10 weeks.', 'zume' ),
            __( '20 Sessions', 'zume' ),
            __( 'For a longer slower pace training with more opportunity for gaining competence in the concepts and skills, the 20 session format has more practice opportunities for each of the concepts and tools.', 'zume' ),
            __( '3 Day Intensive', 'zume' ),
            __( 'Zume can bet compressed into 5 half day sections of 4 hours each. This can be done with a Friday evening (4 hours), and all day Saturday (8 hours) and all day Sunday (8 hours).', 'zume' ),
        ];
    }
}
Zume_Training_Page::instance();










































