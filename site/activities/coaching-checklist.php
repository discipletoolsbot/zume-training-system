<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Coaching extends Zume_Activites
{
    public $page_title = 'Coaching Checklist';
    public $root = 'activities';
    public $type = 'coachingchecklist';
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

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang = $lang_code;

        /* Redirect /checkin to /{lang_code}/checkin */
        /* This facilitates QR codes sending users to /checkin not knowing what language they may have previously been using */
        $url = dt_get_url_path();
        if ( $url === $this->type ) {
            $lang_code_from_cookie = zume_get_language_cookie();
            if ( $lang_code_from_cookie !== 'en' ) {
                wp_redirect( $lang_code_from_cookie . '/' . $this->type );
                exit;
            }
        }

    }
    public function body(){
        ?>
        <div class="activity-page">
            <header class="bg-brand">
                <div class="container-md | activity-header">
                    <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                </div>
            </header>
            <div class="container-md">
                <h1 class="activity-title"><?php echo esc_html__( 'Coaching Checklist', 'zume' ) ?></h1>
                <a class="f-0 center" href="<?php site_url() ?>/<?php echo $this->lang ?>/activities/coachingchecklist_printable"><?php echo esc_html__( 'Switch to Printable Version', 'zume' ) ?></a>
            </div>
            <hr>
            <div class="container-md activity-content">

            </div>
        </div>
        </hr>
        <?php
    }
}
Zume_Activites_Coaching::instance();
