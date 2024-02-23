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
            });
        </script>
        <?php
    }

    public function body(){
        global $zume_languages_by_code, $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';


        $strings = [
            __('Zúme Training', 'zume' ),
            '-------------------',
            __('Create your own training.', 'zume' ),
            __('Join a training.', 'zume' ),
            __('Get help starting.', 'zume' ),
            __('Set up wizard', 'zume' ),
            __('Join a training', 'zume' ),
            __('Request a coach', 'zume' ),
            __('Gather a few friends or go through the training with an existing small group. Create your own training plan and track your progress.', 'zume' ),
            __('If you can‘t gather a group right now, consider joining one of our online trainings lead by an experienced Zúme coach.', 'zume' ),
            __('We can connect you with free Zúme coach who is committed to helping you get the training and becoming a fruitful disciple.', 'zume' ),
            '-------------------',
            __('Course Overview', 'zume' ),
            __('What is required?', 'zume' ),
            '-------------------',

            __('Course Concepts', 'zume' ),
            __('In this self-facilitated course, you and your group will uses short videos, discussion questions, and simple exercises to develop your skills and knowledge in the following areas:', 'zume' ),

            '-------------------',
            __('Discipleship Concepts', 'zume' ),
            __('God Uses Ordinary People', 'zume' ),
            __('What is a Disciple and a Church?', 'zume' ),
            __('Four Main Ways God Grows Disciples', 'zume' ),
            __('Vision for Multiplying Disciples', 'zume' ),
            __('Following and Leading at the Same Time.', 'zume' ),
            __('Eyes to See Where the Kingdom Isn‘t', 'zume' ),
            __('Learning How the Kingdom Grows', 'zume' ),
            __('Why Pace of Multiplication Matters', 'zume' ),

            '-------------------',
            __('Spiritual Practices', 'zume' ),
            __('Hearing and Obeying God', 'zume' ),
            __('How to Study the Bible', 'zume' ),
            __('How to Live out Loving Accountability', 'zume' ),
            __('How to Spend an Hour in Prayer', 'zume' ),
            __('How to Baptize', 'zume' ),
            __('How to Lead the Lord‘s Supper', 'zume' ),
            __('Prayer Walking', 'zume' ),
            __('A Simple Way to Pray for Others', 'zume' ),

            '-------------------',
            __('Personal Evangelism', 'zume' ),
            __('Learning to Engage Others', 'zume' ),
            __('How to Find a Person of Peace', 'zume' ),
            __('How to Share the Gospel', 'zume' ),
            __('How to Tell Your 3 Minute Testimony', 'zume' ),

            '-------------------',
            __('Leadership Development', 'zume' ),
            __('Training Cycle for Maturing Disciples', 'zume' ),
            __('Practice Leading a Simple Church', 'zume' ),
            __('How to Facilitate a Leadership Cell', 'zume' ),
            __('How to Use a Coaching Checklist', 'zume' ),
            __('How to Facilitate a Peer Mentoring Group', 'zume' ),
            __('Introduction to Four Fields Tool', 'zume' ),
            __('How to Make a Generational Map', 'zume' ),
            __('Create a 3-Month Implementation Plan', 'zume' ),

            '-------------------',
            __('Training Schedules', 'zume' ),
            __('Zúme is 20 hours of training. But those 20 hours can be broken up differently depending on your groups availability.', 'zume' ),
            __('10 Sessions', 'zume' ),
            __('', 'zume' ),
            __('20 Sessions', 'zume' ),
            __('', 'zume' ),
            __('3 Day Intensive', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),
            __('', 'zume' ),

        ];
        foreach($strings as $string ){
            echo $string . '<br>';
        }


    }
}
Zume_Training_Page::instance();










































