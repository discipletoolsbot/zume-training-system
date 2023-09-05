<?php
/**
 * Plugin Name: Zúme - Training System
 * Plugin URI: https://github.com/ZumeProject/zume-training-system
 * Description: Zume Training System
 * Text Domain: zume-training-system
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

if ( ! defined( 'ZUME_TRAINING_URL' ) ) {
    define( 'ZUME_TRAINING_URL', 'https://zume5.training/' );
}
if ( ! defined( 'ZUME_COACHING_URL' ) ) {
    define( 'ZUME_COACHING_URL', 'https://zume5.training/coaching/' );
}

function zume_training() {
    $zume_training_required_dt_theme_version = '1.0';
    $wp_theme = wp_get_theme();
    $version = $wp_theme->version;

    if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
        require_once __DIR__ . '/vendor/autoload.php';
    }

    if ( class_exists( 'Dotenv\Dotenv' ) ) {
        $dotenv = Dotenv\Dotenv::createImmutable( __DIR__ );
        $dotenv->safeLoad();
    }

    /*
     * Check if the Disciple.Tools theme is loaded and is the latest required version
     */
    $is_theme_dt = strpos( $wp_theme->get_template(), 'disciple-tools-theme' ) !== false || $wp_theme->name === 'Disciple Tools';
    if ( $is_theme_dt && version_compare( $version, $zume_training_required_dt_theme_version, '<' ) ) {
        return false;
    }
    if ( !$is_theme_dt ){
        return false;
    }

    if ( !defined( 'DT_FUNCTIONS_READY' ) ){
        require_once get_template_directory() . '/dt-core/global-functions.php';
    }

    return Zume_Training::instance();
}
add_action( 'after_setup_theme', 'zume_training', 20 );


class Zume_Training {
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    private function __construct() {
        // datatable
        global $wpdb;
        $wpdb->dt_zume_message_plan = $wpdb->prefix . 'dt_zume_message_plan';

        require_once( 'globals.php' );
        require_once( 'appearance/loader.php' );
        require_once( 'integrations/loader.php' );
        require_once( 'encouragement/loader.php' );
        require_once( 'classes/loader.php' );
        require_once( 'site/loader.php' );
        require_once( 'site/login/loader.php' );
        $this->i18n();
        $this->setup_hooks();

    }
    public static function activation() {
    }
    public static function deactivation() {
    }
    public function setup_hooks() {
        add_filter( 'dt_custom_fields_settings', [ $this, 'dt_contact_fields' ], 1, 2 );
        add_filter( 'dt_details_additional_tiles', [ $this, 'dt_details_additional_tiles' ], 10, 2 );
        add_action( 'dt_create_users_corresponding_contact', [ $this, 'dt_update_users_corresponding_contact' ], 10, 2 );
        add_action( 'dt_update_users_corresponding_contact', [ $this, 'dt_update_users_corresponding_contact' ], 10, 2 );
        add_filter( 'dt_login_url', [ $this, 'dt_login_url' ] );
        add_filter( 'dt_login_redirect_url', [ $this, 'dt_login_redirect_url' ] );
        add_action( 'dt_create_users_corresponding_contact', [ $this, 'dt_create_users_corresponding_contact' ], 10, 2 );

        /* Ensure that Login is enabled and settings set to the correct values */
        $fields = [
            'login_enabled' => 'on',
            'redirect_url' => '/dashboard',
            'login_url' => 'login',
            'ui_smallprint' => 'off',
            'identity_providers_google' => 'on',
            'identity_providers_facebook' => 'on',
        ];
        if ( isset( $_ENV['FIREBASE_API_KEY'] ) ) {
            $fields['firebase_api_key'] = $_ENV['FIREBASE_API_KEY'];
        }
        if ( isset( $_ENV['FIREBASE_PROJECT_ID'] ) ) {
            $fields['firebase_project_id'] = $_ENV['FIREBASE_PROJECT_ID'];
        }
        if ( isset( $_ENV['FIREBASE_APP_ID'] ) ) {
            $fields['firebase_app_id'] = $_ENV['FIREBASE_APP_ID'];
        }
        DT_Login_Fields::update( $fields );
    }
    public function dt_details_additional_tiles( $tiles, $post_type = '' ){
        if ( $post_type === 'contacts' ){
            $tiles['profile_details'] = [
                'label' => __( 'Profile Details', 'zume' ),
                'display_for' => [
                    'type' => [ 'user' ],
                ],
            ];
        }
        return $tiles;
    }
    public function dt_contact_fields( array $fields, string $post_type = '' ) {
        if ( $post_type === 'contacts' ) {
            if ( !isset( $fields['user_email'] ) ){
                $fields['user_email'] = [
                    'name' => __( 'User Email', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'readonly' => true,
                    'only_for_types' => [ 'user' ],
                ];
            }
            if ( !isset( $fields['user_phone'] ) ){
                $fields['user_phone'] = [
                    'name' => __( 'User Phone', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'only_for_types' => [ 'user' ],
                ];
            }
        }
        return $fields;
    }
    public function dt_create_users_corresponding_contact( $new_user_contact, $user ) {
        // adds support fields after registration
        update_post_meta($new_user_contact['ID'], 'user_email',$user->user_email);
        update_post_meta($new_user_contact['ID'], 'user_phone', '');
    }
    public function dt_update_users_corresponding_contact( mixed $contact, WP_User $user ) {
        $current_user = wp_get_current_user();

        if ( $user->ID !== $current_user->ID ) {
            return;
        }

        $contact_id = Disciple_Tools_Users::get_contact_for_user( $user->ID );
        $contact_record = DT_Posts::get_post( 'contacts', $contact_id, true, false );

        if ( is_wp_error( $contact_record ) ) {
            dt_write_log( __METHOD__ );
            dt_write_log( $contact_record->get_error_message() );
            return;
        }

        if ( $contact_record && $contact_record['user_email'] != $user->user_email ) {
            DT_Posts::update_post( 'contacts', $contact_record['ID'], [
                'user_email' => $user->user_email,
            ], false, false );
        }

    }
    public function dt_login_url( $dt_login_url ) {
        $current_language = 'en';

        if ( function_exists( 'zume_current_language' ) ) {
            $current_language = zume_current_language();
        }

        if ( $current_language === 'en' ) {
            return $dt_login_url;
        }

        return $current_language . '/' . $dt_login_url;
    }
    public function dt_login_redirect_url( $redirect_url ) {
        $url = new DT_URL( $redirect_url );

        $parsed_url = $url->parsed_url;

        /* Get the current lang_code in the current url */
        [ 'lang_code' => $lang_code ] = zume_get_url_pieces();

        /* Get the path from the redirect url without any lang codes */
        [ 'path' => $path ] = zume_get_url_pieces( ltrim( $parsed_url['path'], '/' ) );

        if ( $lang_code !== 'en' ) {
            $path = $lang_code . '/' . $path;
        }

        $redirect_url = $parsed_url['scheme'] . '://' . $parsed_url['host'] . '/' . $path;
        return $redirect_url;
    }

    public function i18n() {
        $domain = 'zume';
        load_plugin_textdomain( $domain, false, trailingslashit( dirname( plugin_basename( __FILE__ ) ) ). 'languages' );
    }
    public function __toString() {
        return 'zume';
    }
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, 'Whoah, partner!', '0.1' );
    }
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, 'Whoah, partner!', '0.1' );
    }
    public function __call( $method = '', $args = array() ) {
        _doing_it_wrong( 'zume_training::' . esc_html( $method ), 'Method does not exist.', '0.1' );
        unset( $method, $args );
        return null;
    }

}
add_action( 'plugins_loaded', function (){
    if ( is_admin() && !( is_multisite() && class_exists( 'DT_Multisite' ) ) || wp_doing_cron() ){
        // Check for plugin updates
        if ( ! class_exists( 'Puc_v4_Factory' ) ) {
            if ( file_exists( get_template_directory() . '/dt-core/libraries/plugin-update-checker/plugin-update-checker.php' ) ) {
                require( get_template_directory() . '/dt-core/libraries/plugin-update-checker/plugin-update-checker.php' );
            }
        }
        if ( class_exists( 'Puc_v4_Factory' ) ){
            Puc_v4_Factory::buildUpdateChecker(
                'https://raw.githubusercontent.com/ZumeProject/zume-training-system/master/version-control.json',
                __FILE__,
                'zume-training-system'
            );
        }
    }
} );
