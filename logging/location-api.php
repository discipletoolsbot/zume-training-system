<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_User_Location_API
{
    public $namespace = 'zume_system/v1';
    private static $_instance = null;

    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct()
    {
        if ( dt_is_rest() ) {
            add_action('rest_api_init', [$this, 'add_api_routes']);
            add_filter('dt_allow_rest_access', [$this, 'authorize_url'], 10, 1);
        }
    }
    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace  ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

    public function add_api_routes()
    {
        $namespace = $this->namespace;

        register_rest_route(
            $namespace, '/user_location', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'user_location'],
                'permission_callback' =>'__return_true'
            ]
        );
    }
    public function user_location( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $location = [
            'lng' => '',
            'lat' => '',
            'level' => '',
            'label' => '',
            'grid_id' => '',
        ];

        // is user logged in
        if ( isset( $params['user_id'] ) ) {

        }
        else if ( is_user_logged_in() ) {
            // use user location
            $user_id = get_current_user_id();
            $contact_id = Disciple_Tools_Users::get_contact_for_user($user_id);
            $contact = DT_Posts::get_post( 'contacts', $contact_id, false, false, true );
            dt_write_log($contact);


            // is user location profile set, then query user
        }
        else {
            // use ip address


        }

        // does user have user provided location

        // if not, get location from IP

        // update user location

        // return user location

        return $location;
    }

}
Zume_System_User_Location_API::instance();
