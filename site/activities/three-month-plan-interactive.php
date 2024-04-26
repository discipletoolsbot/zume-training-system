<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_3monthplan extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = '3monthplan';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        if ( $this->url_matches_this_activity() ) {
            $this->require_authentication();
        }
    }
    public function body(){
        $questions = Zume_Training_Dashboard::three_month_plan_questions();
        $profile = zume_get_user_profile();

        ?>
        <script>
            jQuery(document).ready(() => {
                const activity = document.querySelector('activity-3-month-plan')
                function handleSavedEvent() {
                    location.href = '<?php echo esc_url( zume_dashboard_page_url( 'my-plans' ) ) ?>'
                }
                activity.addEventListener('3-month-plan-saved', handleSavedEvent);
            })
        </script>

        <div class="activity-page">
            <header class="bg-brand">
                <div class="container-md | activity-header">
                    <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                </div>
            </header>
            <div class="container-md">
                <h1 class="activity-title"><?php echo esc_html__( '3-Month Plan', 'zume' ) ?></h1>
                <a class="f-0" href="<?php site_url() ?>/zume_activities/3monthplan_html"><?php echo esc_html__( 'Switch to Printable Version', 'zume' ) ?></a>
            </div>
            <hr>
            <div class="container-md activity-content">
                <activity-3-month-plan
                    questions="<?php echo esc_attr( json_encode( $questions ) ) ?>"
                    translations="<?php echo esc_attr( json_encode( $this->translations() ) ) ?>"
                    user_id="<?php echo esc_attr( $profile['user_id'] ) ?>"
                    contact_id="<?php echo esc_attr( $profile['contact_id'] ) ?>"
                ></activity-3-month-plan>

                <noscript>
                    <div class="text-center">
                        <p><?php echo esc_html__( 'Scripts are off', 'zume' ) ?></p>
                        <p><?php echo esc_html__( 'Please turn on scripts to use this interactive page. Otherwise you may use the printable version using the link above.', 'zume' ) ?></p>
                    </div>
                </noscript>
            </div>
        </div>
        </hr>
        <?php
    }

    public function translations() {
        return [
            'save' => __( 'Save', 'zume' ),
        ];
    }
}
Zume_Activites_3monthplan::instance();

