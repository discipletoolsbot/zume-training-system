<?php
/**
 * Plugin Name: Zume Training System
 * Plugin URI: https://github.com/ZumeProject/zume-training-system
 * Description: Zume System Integrations
 * Text Domain: zume-system-integrations
 * Domain Path: /languages
 * Version:  0.2
 * Author URI: https://github.com/ZumeProject/zume-training-system
 * GitHub Plugin URI: https://github.com/ZumeProject/zume-training-system
 * Requires at least: 4.7.0
 * (Requires 4.7+ because of the integration of the REST API at 4.7 and the security requirements of this milestone version.)
 * Tested up to: 6.2
 *
 * @package Disciple_Tools
 * @link    https://github.com/DiscipleTools
 * @license GPL-2.0 or later
 *          https://www.gnu.org/licenses/gpl-2.0.html
 */

class Zume_Context_Switcher {
    private static $instance = null;
    public static function instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public function __construct(){
        $site = get_bloginfo();

        require_once( 'globals/loader.php' );

        switch ( $site ) {
            case 'Coaching':
                require_once( 'zume-training-coaching/loader.php' );
                break;
            case 'Zúme Training':
                require_once( 'zume-training/loader.php' );
                break;
            case 'Vision':
                require_once( 'zume-vision/loader.php' );
                break;
            default:
        }
        return false;
    }
}

add_action( 'after_setup_theme', [ 'Zume_Context_Switcher', 'instance' ], 10 );


