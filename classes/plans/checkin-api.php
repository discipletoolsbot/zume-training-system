<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Custom endpoints file
 */

class Zume_Checkin
{
    private $namespace;
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        if ( dt_is_rest() ) {
            $this->namespace = 'zume_system/v1';
            add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
        }
    }

    public function add_api_routes() {
        register_rest_route(
            $this->namespace, '/checkin', [
                'methods' => [ 'GET', 'POST' ],
                'callback' => [ $this, 'checkin_rest' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function checkin_rest( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( ! isset( $params['code'] ) ) {
            return new WP_Error( __METHOD__, 'Missing params', [ 'status' => 400 ] );
        }

        // is code valid
        $list = zume_session_alias_keys();
        if ( ! isset( $list[ $params['code'] ] ) ) {
            return false;
        }

        if ( ! isset( $params['user_id'] ) ) {
            $user_id = get_current_user_id();
        } else {
            $user_id = $params['user_id'];
        }

        zume_log_insert( 'training', $list[ $params['code'] ], [ 'user_id' => $user_id ] );

        return true;

    }
    public static function checkin( $code, $user_id ) {

    }
}
Zume_Checkin::instance();


function zume_session_alias_keys( $number_priority = true ) {
    $list = [
        // set a
        5678 => 'set_a_01', // 10 session 1
        9876 => 'set_a_01',
        4321 => 'set_a_01',
        8765 => 'set_a_01',
        2468 => 'set_a_02', // 10 session 2
        1357 => 'set_a_02',
        8642 => 'set_a_02',
        3456 => 'set_a_02',
        6543 => 'set_a_03', // 10 session 3
        7890 => 'set_a_03',
        5432 => 'set_a_03',
        3457 => 'set_a_03',
        8764 => 'set_a_04', // 10 session 4
        2345 => 'set_a_04',
        4320 => 'set_a_04',
        7654 => 'set_a_04',
        6542 => 'set_a_05', // 10 session 5
        5431 => 'set_a_05',
        3458 => 'set_a_05',
        9877 => 'set_a_05',
        1235 => 'set_a_06', // 10 session 6
        7650 => 'set_a_06',
        6789 => 'set_a_06',
        5433 => 'set_a_06',
        1356 => 'set_a_07', // 10 session 7
        4322 => 'set_a_07',
        8766 => 'set_a_07',
        5434 => 'set_a_07',
        5555 => 'set_a_08', // 10 session 8
        9870 => 'set_a_08',
        6541 => 'set_a_08',
        4567 => 'set_a_08',
        7891 => 'set_a_09', // 10 session 9
        1355 => 'set_a_09',
        8763 => 'set_a_09',
        7659 => 'set_a_09',
        5430 => 'set_a_10', // 10 session 10
        3459 => 'set_a_10',
        4323 => 'set_a_10',
        6788 => 'set_a_10',
        // set b
        1354 => 'set_b_01', // 20 session 1
        9878 => 'set_b_01',
        8762 => 'set_b_01',
        9871 => 'set_b_01',
        6540 => 'set_b_02', // 20 session 2
        4568 => 'set_b_02',
        5435 => 'set_b_02',
        1358 => 'set_b_02',
        8767 => 'set_b_03', // 20 session 3
        4324 => 'set_b_03',
        6544 => 'set_b_03',
        5436 => 'set_b_03',
        9879 => 'set_b_04', // 20 session 4
        4569 => 'set_b_04',
        6787 => 'set_b_04',
        1359 => 'set_b_04',
        6545 => 'set_b_05', // 20 session 5
        3450 => 'set_b_05',
        5437 => 'set_b_05',
        6546 => 'set_b_05',
        5438 => 'set_b_06', // 20 session 6
        2344 => 'set_b_06',
        3451 => 'set_b_06',
        4325 => 'set_b_06',
        4560 => 'set_b_07', // 20 session 7
        1116 => 'set_b_07',
        6786 => 'set_b_07',
        3334 => 'set_b_07',
        2346 => 'set_b_08', // 20 session 8
        5439 => 'set_b_08',
        9875 => 'set_b_08',
        1238 => 'set_b_08',
        8768 => 'set_b_09', // 20 session 9
        3452 => 'set_b_09',
        8769 => 'set_b_09',
        5439 => 'set_b_09',
        2347 => 'set_b_10', // 20 session 10
        7655 => 'set_b_10',
        8760 => 'set_b_10',
        5436 => 'set_b_10',
        7651 => 'set_b_11', // 20 session 11
        1239 => 'set_b_11',
        5434 => 'set_b_11',
        3453 => 'set_b_11',
        9874 => 'set_b_12', // 20 session 12
        1350 => 'set_b_12',
        6547 => 'set_b_12',
        2348 => 'set_b_12',
        6785 => 'set_b_13', // 20 session 13
        9873 => 'set_b_13',
        4326 => 'set_b_13',
        1351 => 'set_b_13',
        9872 => 'set_b_14', // 20 session 14
        8761 => 'set_b_14',
        4561 => 'set_b_14',
        6667 => 'set_b_14',
        4327 => 'set_b_15', // 20 session 15
        7656 => 'set_b_15',
        1352 => 'set_b_15',
        6784 => 'set_b_15',
        1118 => 'set_b_16', // 20 session 16
        9871 => 'set_b_16',
        1230 => 'set_b_16',
        5433 => 'set_b_16',
        1119 => 'set_b_17', // 20 session 17
        9870 => 'set_b_17',
        4328 => 'set_b_17',
        3454 => 'set_b_17',
        6548 => 'set_b_18', // 20 session 18
        2349 => 'set_b_18',
        2226 => 'set_b_18',
        6668 => 'set_b_18',
        7657 => 'set_b_19', // 20 session 19
        4562 => 'set_b_19',
        5430 => 'set_b_19',
        3336 => 'set_b_19',
        8767 => 'set_b_20', // 20 session 20
        1353 => 'set_b_20',
        2340 => 'set_b_20',
        9876 => 'set_b_20',
        1354 => 'set_b_20',
    ];

    if ( $number_priority ) {
        return $list;
    } else {
        $value_priority = [];
        foreach( $list as $key => $value ) {
            if ( ! isset( $value_priority[$value] ) ) {
                $value_priority[$value] = [];
            }
            $value_priority[$value][] = $key;
        }
        return $value_priority;
    }
}
