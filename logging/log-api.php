<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_Log_API
{
    public $permissions = ['manage_dt'];
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
        if ( dt_is_rest()) {
            add_action('rest_api_init', [$this, 'add_api_routes']);
            add_filter('dt_allow_rest_access', [$this, 'authorize_url'], 10, 1);
        }
    }

    public function add_api_routes()
    {
        $namespace = $this->namespace;

        register_rest_route(
            $namespace, '/log', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'log'],
                'permission_callback' => function () {
                    return is_user_logged_in();
                }
            ]
        );
    }
    public function log( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        // all dev logic

        $location = DT_Mapbox_API::forward_lookup( $params['location'] );
        $geocoder = new Location_Grid_Geocoder();
        $grid_row = $geocoder->get_grid_id_by_lnglat( $location['features'][0]['center'][0], $location['features'][0]['center'][1] );
        $level = 'city';

        $time = strtotime( 'Today -'.$params['days_ago'].' days' );
        $contact_id = Disciple_Tools_Users::get_contact_for_user($params['user_id']);

        return dt_report_insert( [
            'type' => $params['type'],
            'subtype' => $params['subtype'],
            'post_id' => $contact_id,
            'value' => $params['stage'],
            'grid_id' => $grid_row['grid_id'],
            'label' => str_replace( ',', ', ', $params['location'] ),
            'lat' => $grid_row['latitude'],
            'lng' => $grid_row['longitude'],
            'level' => $level,
            'user_id' => $params['user_id'],
            'time_end' => $time,
            'hash' => hash('sha256', maybe_serialize($params)  . time() ),
        ] );

    }
    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace  ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }
}
Zume_System_Log_API::instance();
