<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Get_A_Coach extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Get A Coach';
    public $root = 'app';
    public $type = 'get-a-coach';
    public $lang = 'en';
    public static $token = 'app_get_a_coach';

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

        $this->page_title = esc_html__( 'Get A Coach', 'zume' );
        $this->page_description = esc_html__( 'All our coaches are trained and practicing the concepts and tools found in Zûme. All our coaches can help you over barriers and make steps in your journey.', 'zume' );

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
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
        global $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container stack-2 | page">
            <div class="container-md stack-2 center | py-2">
                <h1 class="text-center"><?php echo esc_html__( 'Get A Coach', 'zume' ) ?></h1>
                <p><?php echo esc_html__( 'Every athletic sport, especially at higher levels, uses coaching. Even olympic athletes have coaches, and often more than one. Disciple making can equally benefit from coaching by those who have more experience.', 'zume' ) ?></p>
                <div class="switcher | training-path">
                    <div class="stack | card | switcher-width-40">
                        <h2 class="f-1 text-center"><?php echo esc_html__( 'No Cost', 'zume' ) ?></h2>
                        <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Gather-A-Group-01.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training group', 'zume' ) ?>">
                        <p class="mb-0">
                            <?php echo esc_html__( 'Our network of volunteer coaches are not paid, but are driven rather by a passion for loving God, loving others, and obeying the Great Commission.', 'zume' ) ?>
                        </p>
                    </div>
                    <div class="stack | card | switcher-width-40">
                        <h2 class="f-1 text-center"><?php echo esc_html__( 'Localized', 'zume' ) ?></h2>
                        <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/JoinTraining.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training group', 'zume' ) ?>">
                        <p class="mb-0">
                            <?php echo esc_html__( 'Our connection team attempts to connect you with a coach who speaks your language and is geographically as close as possible.', 'zume' ) ?>
                        </p>
                    </div>
                    <div class="stack | card | switcher-width-40">
                        <h2 class="f-1 text-center"><?php echo esc_html__( 'Experienced', 'zume' ) ?></h2>
                        <img class="mx-auto h-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/coach-2guys.svg' ) ?>" alt="<?php echo esc_attr__( 'Join a training', 'zume' ) ?>">
                        <p class="mb-0">
                            <?php echo esc_html__( 'All our coaches are trained and practicing the concepts and tools found in Zûme. All our coaches can help you over barriers and make steps in your journey.', 'zume' ) ?>
                        </p>
                    </div>
                </div>
            </div>

            <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn large uppercase fit-content mx-auto"><?php echo esc_html__( 'Get A Coach', 'zume' ) ?></a>

        </div>
        <?php
    }
}
Zume_Training_Get_A_Coach::instance();
