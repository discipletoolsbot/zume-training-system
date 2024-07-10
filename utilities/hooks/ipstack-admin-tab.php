<?php
if ( !defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * Disciple.Tools
 *
 * @class      Disciple_Tools_Tab_Custom_Fields
 * @version    0.1.0
 * @since      0.1.0
 * @package    Disciple.Tools
 * @author     Disciple.Tools
 */


/**
 * Class Disciple_Tools_Tab_Custom_Fields
 */
if ( is_admin() ) {
    class Disciple_Tools_Tab_Custom_Ipstack extends Disciple_Tools_Abstract_Menu_Base
    {
        private static $_instance = null;

        public static function instance() {
            if ( is_null( self::$_instance ) ) {
                self::$_instance = new self();
            }
            return self::$_instance;
        } // End instance()

        /**
         * Constructor function.
         *
         * @access  public
         * @since   0.1.0
         */
        public function __construct() {
            add_action( 'admin_menu', [ $this, 'add_submenu' ], 99 );
            add_action( 'dt_settings_tab_menu', [ $this, 'add_tab' ], 10, 1 );
            add_action( 'dt_settings_tab_content', [ $this, 'content' ], 99, 1 );

            parent::__construct();
        } // End __construct()

        public function add_submenu() {
            add_submenu_page( 'dt_options', __( 'Ipstack', 'disciple_tools' ), __( 'Ipstack', 'disciple_tools' ), 'manage_dt', 'dt_options&tab=ipstack', [ 'Disciple_Tools_Settings_Menu', 'content' ] );
        }

        public function add_tab( $tab ) {
            ?>
            <a href="<?php echo esc_url( admin_url() ) ?>admin.php?page=dt_options&tab=ipstack"
               class="nav-tab <?php echo esc_html( $tab == 'ipstack' ? 'nav-tab-active' : '' ) ?>">
                <?php echo esc_html__( 'IPStack' ) ?>
            </a>
            <?php
        }

        /**
         * Packages and prints tab page
         *
         * @param string $tab
         */
        public function content( $tab ) {
            if ( $tab == 'ipstack' ) :
                $this->template( 'begin' );
                DT_Ipstack_API::metabox_for_admin();
                $this->box( 'bottom' );
                $this->template( 'end' );
            endif;
        }


        /**
         * Display admin notice
         *
         * @param string $notice
         * @param string $type error|success|warning
         */
        public static function admin_notice( string $notice, string $type ) {
            ?>
            <div class="notice notice-<?php echo esc_attr( $type ) ?> is-dismissible">
                <p><?php echo esc_html( $notice ); ?></p>
            </div>
            <?php
        }
    }
    Disciple_Tools_Tab_Custom_Ipstack::instance();
}


