<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_Log_API
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
                'permission_callback' => '__return_true'
            ]
        );
    }
    public function log( WP_REST_Request $request ) {
        global $wpdb;
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['type'], $params['subtype'] ) ) {
            return new WP_Error(__METHOD__, 'Missing required parameters: type, subtype.', ['status' => 400] );
        }

        // get time
        $time = time();
        $today = date( 'Ymd', strtotime( 'Today' ) );

                // BEGIN @todo dev only, remove for production.
                if ( isset( $params['days_ago'] ) && ! empty( $params['days_ago'] ) ) {
                    $today = strtotime( 'Today -'.$params['days_ago'].' days' ); // @todo dev only, remove for production.
                } // END

        // get hash
        $hash = hash('sha256', maybe_serialize($params)  . $today );

        // test hash for duplicate
        $duplicate_found = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT
                    `id`
                FROM
                    `$wpdb->dt_reports`
                WHERE hash = %s AND hash IS NOT NULL;",
                $hash
            )
        );
        if ( $duplicate_found ) {
            return new WP_Error(__METHOD__, 'Duplicate entry for today.', ['status' => 409] );
        }

        // set data
        $data = wp_parse_args(
            $params,
            [
                'user_id' => null,
                'post_id' => null,
                'post_type' => 'zume',
                'type' => null,
                'subtype' => null,
                'value' => null,
                'lng' => null,
                'lat' => null,
                'level' => null,
                'label' => null,
                'grid_id' => null,
                'time_end' => $time,
                'hash' => $hash
            ]
        );

        // evaluate type, subtype, and value
        $valid_types = $this->_is_valid_types( $data );
        if ( ! $valid_types ) {
            return new WP_Error(__METHOD__, 'Valid type or subtype not found.', ['status' => 400] );
        }

        // all values other than 0 Anonymous require sign in.


        // user id
        if ( empty( $data['user_id'] ) && is_user_logged_in() ) {
            $user_id = get_current_user_id();
        }

        if ( $user_id ) {
            $post_id = Disciple_Tools_Users::get_contact_for_user($user_id);
        }


        // confirm location
        //str_replace( ',', ', ', $params['location'] )





        $location = DT_Mapbox_API::forward_lookup( $params['location'] );
        $geocoder = new Location_Grid_Geocoder();
        $grid_row = $geocoder->get_grid_id_by_lnglat( $location['features'][0]['center'][0], $location['features'][0]['center'][1] );
        $level = 'city';


        $log = [];
        $log[] = dt_report_insert( $data, true, false );

        // check for additional logs to add for training or coaching

        return $log;

    }
    public function _is_valid_types( $data ) : bool {
        // test types and subtypes
        return true;
    }
    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace  ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }
}
Zume_System_Log_API::instance();
