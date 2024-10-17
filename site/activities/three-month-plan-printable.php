<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_3monthplan_Printable extends Zume_Activites
{
    public $page_title = '3 Month Plan Printable';
    public $root = 'activities';
    public $type = '3monthplan_printable';
    public $lang = 'en';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = esc_html__( '3 Month Plan', 'zume' );

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang = $lang_code;

        /* Redirect /checkin to /{lang_code}/checkin */
        /* This facilitates QR codes sending users to /checkin not knowing what language they may have previously been using */
//        $url = dt_get_url_path();
//        if ( $url === $this->type ) {
//            $lang_code_from_cookie = zume_get_language_cookie();
//            if ( $lang_code_from_cookie !== 'en' ) {
//                wp_redirect( $lang_code_from_cookie . '/' . $this->type );
//                exit;
//            }
//        }
    }
    public function body(){

        ?>
        <div class="activity-page">
            <div class="container-md">
                <h1 class="activity-title"><?php echo esc_html__( '3-Month Plan', 'zume' ) ?></h1>
            </div>
            <hr>
            <div class="container-md activity-content">
                <div id="pieces-content" class="stack">
                    <?php echo $this->list() ?>
                </div>
            </div>
        </div>
        </hr>
        <?php
    }
    public function list() {
        $questions = Zume_Training_Dashboard::three_month_plan_questions();
        foreach ( $questions as $question ){
            ?>
            <div class="stack--3">
                <label><?php echo esc_html( $question ) ?></label>
                <br><hr>
                <div class="writing-line"></div>
            </div>
            <?php
        }
    }
}
Zume_Activites_3monthplan_Printable::instance();
