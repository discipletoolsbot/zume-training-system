<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Dashboard extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'dashboard';
    public $lang = 'en';
    public $base_url = '';
    public static $token = 'zume_app_dashboard';

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

        $this->lang_code = $lang_code;

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            if ( $lang_code === 'en' ) {
                $this->base_url = '/' . $page_slug;
            } else {
                $this->base_url = '/' . $lang_code . '/' . $page_slug;
            }

            $this->require_authentication();

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

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'zume_forms';
        $allowed_js[] = 'zume-profile-utilities';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
        global $zume_languages_by_code;
        ?>
        <?php //phpcs:ignore ?>
        <script src="<?php echo trailingslashit( plugin_dir_url( __DIR__ ) ) . 'profile/profile-utilities.js?version=' . filemtime( trailingslashit( plugin_dir_path( __DIR__ ) ) . 'profile/profile-utilities.js' ) ?>"></script>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <script>
            const jsObject = [<?php echo json_encode([
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'language' => $this->lang_code,
                'site_url' => get_site_url(),
                'base_url' => $this->base_url,
                'map_key' => DT_Mapbox_API::get_key(),
                'mapbox_selected_id' => 'current',
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'images_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '/assets/images' ),
                'template_dir' => get_template_directory_uri(),
                'profile' => zume_get_user_profile(),
                'user_stage' => zume_get_user_stage(),
                'training_items' => zume_training_items(),
                'host_progress' => zume_get_user_host(),
                'friends' => zume_get_user_friends(),
                'languages' => $zume_languages_by_code,
                'has_pieces_pages' => zume_feature_flag( 'pieces_pages', zume_current_language() ),
                'share_translations' => Zume_Training_Share::translations(),
                'translations' => $this->translations(),
                'wizard_translations' => Zume_Training_Wizard::translations(),
                'urls' => [
                    'logout' => esc_url( dt_login_url( 'logout' ) ),
                    'launch_ten_session_course' => zume_10_session_url(),
                    'launch_twenty_session_course' => zume_20_session_url(),
                    'launch_intensive_session_course' => zume_intensive_session_url(),
                    'set_profile_wizard' => esc_url( '#' ),
                    'plan_training_wizard' => esc_url( zume_make_a_plan_wizard_url() ),
                    'get_coach_wizard' => esc_url( zume_get_a_coach_wizard_url() ),
                ],
            ]) ?>][0]
        </script>

        <?php
    }

    public function body(){
        require __DIR__ . '/../parts/nav.php';
        ?>

        <dash-board></dash-board>

        <?php
    }

    public static function translations() {
        return [
            'done' => __( 'Done', 'zume' ),
            'edit' => __( 'Edit', 'zume' ),
            'delete' => __( 'Delete', 'zume' ),
            'share' => __( 'Share', 'zume' ),
            'active' => __( 'Active', 'zume' ),
            'completed' => __( 'Completed', 'zume' ),
            'uncompleted' => __( 'Uncompleted', 'zume' ),
            'not_heard' => __( 'Not Heard', 'zume' ),
            'all' => __( 'All', 'zume' ),
            'logout' => __( 'Logout', 'zume' ),
            'filter' => __( 'Filter', 'zume' ),
            'list' => __( 'List View', 'zume' ),
            'grid' => __( 'Grid View', 'zume' ),
            'view_now' => __( 'View Now', 'zume' ),
            'complete_now' => __( 'Complete Now', 'zume' ),
            'view' => __( 'View', 'zume' ),
            'menu' => __( 'Menu', 'zume' ),
            'name' => __( 'Name', 'zume' ),
            'phone' => __( 'Phone', 'zume' ),
            'email' => __( 'Email', 'zume' ),
            'communications_email' => __( 'Communications Email', 'zume' ),
            'city' => __( 'City', 'zume' ),
            'no_locations' => __( 'No Locations found', 'zume' ),
            'language' => __( 'Language', 'zume' ),
            'save' => __( 'Save', 'zume' ),
            'edit_profile' => __( 'Edit Profile', 'zume' ),
            'share_title' => __( 'Check out this Zume concept', 'zume' ),
            'preview' => __( 'Preview', 'zume' ),
            'add_commitments' => sprintf( __( 'Add new %s', 'zume' ), __( 'Commitment', 'zume' ) ),
            'copy_link' => __( 'Copy Link', 'zume' ),
            'copy_and_share_text' => __( 'Copy this link and send it to your friends 🙂', 'zume' ),
            'share_feedback' => __( 'Thanks!', 'zume' ),
            'copy_feedback' => __( 'Link copied', 'zume' ),
            'getting_started' => __( 'Getting Started', 'zume' ),
            'set_profile' => __( 'Set Profile', 'zume' ),
            'set_profile_explanation' => __( 'Complete a short Profile Wizard to set your profile', 'zume' ),
            'plan_a_training' => __( 'Plan a Training', 'zume' ),
            'plan_a_training_explanation' => __( 'Create your own training group with our easy to set up wizard or join one of our online trainings', 'zume' ),
            'get_a_coach' => __( 'Get a Coach', 'zume' ),
            'get_a_coach_explanation' => __( 'Connect with a coach for any help or encouragement before, during or after the training', 'zume' ),
            'training' => __( 'Training', 'zume' ),
            'my_progress' => __( 'My Progress', 'zume' ),
            'my_progress_explanation' => __( 'Track your course progress with this interactive view. Learn to listen, obey, share and train others with what you have learned.', 'zume' ),
            'progress_info' => __( 'Information about progress', 'zume' ),
            'my_training' => __( 'My Training', 'zume' ),
            'my_trainings' => __( 'My Trainings', 'zume' ),
            'my_training_explanation' => __( 'Full access to your training content, schedule, group details and sharing tools.', 'zume' ),
            '3_month_plan' => __( '3-Month Plan', 'zume' ),
            '3_month_plan_explanation' => __( 'A Three Month Plan is a tool you can use to help focus your attention and efforts and keep them aligned with God’s priorities for making disciples who multiply.', 'zume' ),
            'practicing' => __( 'Practicing', 'zume' ),
            'my_coach' => __( 'My Coach', 'zume' ),
            'my_coach_explanation' => __( 'Quick access to your coach at all times.', 'zume' ),
            'my_tools' => __( 'My Tools', 'zume' ),
            'my_tools_explanation' => __( 'Your My Tools area will unlock as you move through the course, practicing and developing essential discipleship skills', 'zume' ),
            'my_plans' => __( 'My Plans', 'zume' ),
            'my_plans_explanation' => __( 'Unlock the My Plans area by completing your 3-Month plan in the final session.', 'zume' ),
            'my_churches' => __( 'My Churches', 'zume' ),
            'my_churches_explanation' => __( 'Unlock the My Churches area by joining the community.', 'zume' ),
            'my_maps' => __( 'My Maps', 'zume' ),
            'my_maps_explanation' => __( 'Unlock the My Maps area by joining the community.', 'zume' ),
            'launch_course' => __( 'Launch Course', 'zume' ),
            'ten_session_course' => __( '10 Session Course', 'zume' ),
            'twenty_session_course' => __( '20 Session Course', 'zume' ),
            'three_day_intensive_course' => __( '3 Day Intensive Course', 'zume' ),
            'heard' => __( 'Heard', 'zume' ),
            'heard_explanation' => __( 'Have I heard about this tool or concept?', 'zume' ),
            'obeyed' => __( 'Obeyed', 'zume' ),
            'obeyed_explanation' => __( 'Have I obeyed this tool or concept?', 'zume' ),
            'shared' => __( 'Shared', 'zume' ),
            'shared_explanation' => __( 'Have I shared this tool or concept?', 'zume' ),
            'trained' => __( 'Trained', 'zume' ),
            'trained_explanation' => __( 'Have I trained others to share this tool or concept?', 'zume' ),
            'join_the_community' => __( 'Join the Community', 'zume' ),
            'join' => __( 'Join', 'zume' ),
            'join_to_access' => __( 'Join the community to get access to this area.', 'zume' ),
            'community' => __( 'Community links', 'zume' ),
            'resources' => __( 'Resources', 'zume' ),
            'previous_slide' => __( 'Previous Slide', 'zume' ),
            'next_slide' => __( 'Next Slide', 'zume' ),
            'group_members' => __( 'Group Members', 'zume' ),
            'mark_completed' => __( 'Mark Completed', 'zume' ),
            'start_session' => __( 'Start Session', 'zume' ),
            'show_details' => __( 'Show details', 'zume' ),
            'edit_time' => __( 'Edit time', 'zume' ),
            'add_new_training' => sprintf( __( 'Add new %s', 'zume' ), __( 'Training', 'zume' ) ),
            'invite_friends' => __( 'Invite Friends', 'zume' ),
            'add_first_church' => __( 'Click to add your first church', 'zume' ),
            'church_name' => __( 'Church Name', 'zume' ),
            'number_of_people' => __( 'Number of People', 'zume' ),
            'church_location' => __( 'Church Location', 'zume' ),
            'parent_church' => __( 'Parent Church', 'zume' ),
            'add_new_church' => sprintf( __( 'Add new %s', 'zume' ), __( 'Church', 'zume' ) ),
            'cancel' => __( 'cancel', 'zume' ),
        ];
    }
}
Zume_Training_Dashboard::instance();
