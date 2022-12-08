<?php
/**
 * Plugin Name: Zume System Integration
 * Plugin URI: https://github.com/ZumeProject/zume-system-integrations
 * Description: Zume System Integrations
 * Text Domain: zume-system-integrations
 * Domain Path: /languages
 * Version:  0.1
 * Author URI: https://github.com/ZumeProject/zume-system-integrations
 * GitHub Plugin URI: https://github.com/ZumeProject/zume-system-integrations
 * Requires at least: 4.7.0
 * (Requires 4.7+ because of the integration of the REST API at 4.7 and the security requirements of this milestone version.)
 * Tested up to: 6.2
 *
 * @package Disciple_Tools
 * @link    https://github.com/DiscipleTools
 * @license GPL-2.0 or later
 *          https://www.gnu.org/licenses/gpl-2.0.html
 */

class Zume_System {
    private static $instance = null;
    public static function instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function __construct(){
        $site = get_bloginfo();
        dt_write_log( $site );

        switch ( $site ) {
            case 'Zúme Training':
                require_once( 'training/loader.php' );
                break;
            case 'Tools':
                require_once( 'tools/loader.php' );
                break;
            case 'Vision':
                require_once( 'vision/loader.php' );
                break;
            case 'Coaching':
                require_once( 'coaching/loader.php' );
                break;
            default:
        }
        return false;
    }
}

add_action( 'after_setup_theme', [ 'Zume_System', 'instance' ], 10 );


