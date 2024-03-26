<?php

class Zume_Activites extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $lang;
    public $language_code = 'en';

    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'base';
    public static $token = 'zume_activity_base';

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

        $this->lang = $lang_code ?? $this->lang;


        if ( isset( $url_parts[0] ) && $this->root === $url_parts[0] && isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

            $this->set_locale( $lang_code );
            $this->language_code = $lang_code;

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
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
        ?>
        <script>
            jQuery(document).ready(function($){
                document.cookie = "zume_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "pll_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            });
        </script>
        <style>
            .zume-activity {
                font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
                padding: 1em;
                max-width: 800px;
                width:100%;
                margin: 0 auto;
            }
            .zume-activity-header {
                font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
                text-align: center;
            }
            .zume-activity-content h3 {
                font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
                margin-bottom: 1em;
            }
            .zume-activity-content p {
                margin-bottom: 1em;
                font-size: 1.2em;
            }
            .zume-activity-content ul {
                padding: 0 2em 1em !important;
                list-style: disc !important;
            }
            .zume-activity-content ul li {
            }
        </style>
        <?php
    }
    public function body(){
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT ID FROM zume_posts p WHERE p.post_type = 'zume_activities' AND p.post_title = %s", $this->type );
        $post_id = $wpdb->get_var( $sql );

        ?>
        <div class="zume-activity">
            <div class="zume-activity-header">
                <h1><?php self::content_header( $post_id ); ?></h1>
                <hr>
            </div>
            <div class="zume-activity-content">
                <?php self::content_body( $post_id ); ?>
            </div>
        </div>
        <?php
    }
    public function content_header( $post_id ){
        $title = get_post_meta( $post_id, 'title_'.$this->language_code, true );
        echo $title;
    }
    public function content_body( $post_id ){
        $content = get_post_meta( $post_id, 'content_'.$this->language_code, true );
        echo $content;
    }

}
Zume_Activites::instance();

class Zume_Activites_SOAPS extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity - SOAPS';
    public $root = 'zume_activities';
    public $type = 'soaps';
    public static $token = 'zume_activity_soaps';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }

}
Zume_Activites_SOAPS::instance();

class Zume_Activites_Accountability extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity - Accountability';
    public $root = 'zume_activities';
    public $type = 'accountability';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Accountability::instance();

class Zume_Activites_Prayer_Cycle extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity - Prayer Cycle';
    public $root = 'zume_activities';
    public $type = 'prayercycle';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Prayer_Cycle::instance();

class Zume_Activites_List100 extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity - List of 100';
    public $root = 'zume_activities';
    public $type = 'listof100';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_List100::instance();


class Zume_Activites_Sharegospel extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'sharegospel';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Sharegospel::instance();

class Zume_Activites_Sharetestimony extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'sharetestimony';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Sharetestimony::instance();

class Zume_Activites_Supper extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'lordssupper';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Supper::instance();

class Zume_Activites_Bless extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'blessprayer';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Bless::instance();

class Zume_Activites_33groupa2 extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = '33groupa2';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_33groupa2::instance();

class Zume_Activites_33groupm6 extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = '33groupm6';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_33groupm6::instance();

class Zume_Activites_33groupmk5 extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = '33groupmk5';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_33groupmk5::instance();

class Zume_Activites_Prayerwalk extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'prayerwalking';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Prayerwalk::instance();

class Zume_Activites_3monthplan extends Zume_Activites
{
    use Translateable;
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
    }
}
Zume_Activites_3monthplan::instance();

class Zume_Activites_Coaching extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'coachingchecklist';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Coaching::instance();

class Zume_Activites_Peermentoring extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'peermentoring';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Peermentoring::instance();

class Zume_Activites_4fields extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = '4fields';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_4fields::instance();

class Zume_Activites_Genmap extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'genmapping';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Activites_Genmap::instance();






































































