<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Plans_Endpoints
{
    private $namespace;
    private static $post_type = 'zume_plans';
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
            $this->namespace, '/plans', [
                'methods' => 'GET',
                'callback' => [ $this, 'list_plans' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/(?P<code>\w+)', [
                'methods' => 'GET',
                'callback' => [ $this, 'get_plan' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'create_plan' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'PUT',
                'callback' => [ $this, 'update_plan' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'DELETE',
                'callback' => [ $this, 'delete_plan' ],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/completed-sessions', [
                'methods' => 'GET',
                'callback' => [ $this, 'completed_sessions' ],
                'permission_callback' => '__return_true',
            ]
        );        register_rest_route(
            $this->namespace, '/plan/complete-session', [
                'methods' => 'POST',
                'callback' => [ $this, 'mark_session_complete' ],
                'permission_callback' => '__return_true',
            ]
        );        register_rest_route(
            $this->namespace, '/public_plans', [
                'methods' => 'POST',
                'callback' => [ $this, 'public_plans' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function list_plans( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( isset( $params['user_id'] ) ) {
            $user_id = $params['user_id'];
        } else {
            $user_id = get_current_user_id();
        }

        return zume_get_user_plans( $user_id );
    }
    public function get_plan( WP_REST_Request $request ) {
        /* Get the plan */
        $code = $request['code'];

        $plan_id = Zume_Connect_Endpoints::test_join_key( $code );

        if ( !$plan_id ) {
            return [
                'error_code' => 'bad-plan-code',
            ];
        }

        $user_id = get_current_user_id();
        $user_contact_id = zume_get_user_contact_id( $user_id );

        $plan = DT_Posts::get_post( self::$post_type, $plan_id );

        $participant_ids = array_values( array_map( function ( $participant ) {
            return $participant['ID'];
        }, $plan['participants'] ) );

        if ( !in_array( $user_contact_id, $participant_ids ) ) {
            return [
                'error_code' => 'not-authorized',
            ];
        }


        $completed_sessions = $this->get_completed_sessions( $plan_id, $user_id );

        $plan['completed_sessions'] = $completed_sessions;

        return $plan;
    }
    public function create_plan( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $fields = [
            'title' => $params['title'],
            'assigned_to' => $params['user_id'],
            'set_type' => isset( $params['set_type'] ) ? $params['set_type'] : '',
            'visibility' => 'private',
            'participants' => [
                'values' => [
                    [
                        'value' => $params['contact_id'],
                    ],
                ],
            ],
        ];

        if ( isset( $params['set'] ) && is_array( $params['set'] ) ) {
            foreach ( $params['set'] as $key => $value ) {
                $fields[ $key ] = $value;
            }
        }

        $new_post = DT_Posts::create_post( self::$post_type, $fields, true, false );

        return $new_post;
    }
    public function update_plan( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['key'] ) ) {
            return [
                'success' => false,
                'message' => 'Missing params key',
            ];
        }

        $key = $params['key'];

        global $wpdb, $table_prefix;
        $post_id_exists = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM {$table_prefix}postmeta WHERE meta_key = 'join_key' AND meta_value = %s", $key ) );

        if ( empty( $post_id_exists ) ) {
            return [
                'success' => false,
                'message' => 'Invalid key',
            ];
        }

        $user_id = get_current_user_id();
        $contact_id = zume_get_user_contact_id( $user_id );

        return DT_Posts::update_post( self::$post_type, $post_id_exists, [ 'participants' => [ 'values' => [ [ 'value' => $contact_id ] ] ] ], true, false );
    }
    public function delete_plan( WP_REST_Request $request ) {
        global $wpdb, $table_prefix;

        if ( ! is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( ! isset( $params['post_id'], $params['user_id'] ) ) {
            return new WP_Error( __METHOD__, 'Post_id and user_id required.', array( 'status' => 401 ) );
        }
        $user_id = zume_validate_user_id_request( $params['user_id'] );
        if ( is_wp_error( $user_id ) ) {
            return $user_id;
        }

        $fields = [
            'type' => $params['type'],
            'subtype' => $params['subtype'],
            'user_id' => $user_id,
        ];

        $delete = $wpdb->delete( $table_prefix . 'dt_reports', $fields );

        return $delete;
    }

    public function completed_sessions( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['post_id'] ) ) {
            return new WP_Error( __METHOD__, 'post_id required', array( 'status' => 401 ) );
        }

        $user_id = get_current_user_id();
        $post_id = $params['post_id'];

        $logs = $this->get_completed_sessions( $post_id, $user_id );

        return $logs;
    }

    public function get_completed_sessions( $post_id, $user_id ) {

        $logs = Disciple_Tools_Reports::where( [
            'user_id' => $user_id,
            'post_id' => $post_id,
        ] );

        $filtered_logs = [];

        foreach ( $logs as $log ) {
            if ( empty( $log['payload'] ) ) {
                continue;
            }

            $filtered_logs[] = $log['payload'];
        }

        return $filtered_logs;
    }

    public function mark_session_complete( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['session_id'], $params['key'] ) ) {
            return new WP_Error( __METHOD__, 'session_id and key required', array( 'status' => 401 ) );
        }

        $session_id = $params['session_id'];
        $key = $params['key'];

        $user_id = get_current_user_id();
        $post_id = Zume_Connect_Endpoints::test_join_key( $key );

        $training_group = DT_Posts::get_post( 'zume_plans', $post_id );

        if ( $training_group['assigned_to']['id'] !== "$user_id" ) {
            return new WP_Error( __METHOD__, 'you are not authorised', array( 'status' => 400 ) );
        }

        $completed_sessions = $this->get_completed_sessions( $post_id, $user_id );

        if ( in_array( $session_id, $completed_sessions ) ) {
            return $completed_sessions;
        }

        zume_log_insert( 'training', 'session_completed', [
            'payload' => $session_id,
            'post_id' => $post_id,
            'user_id' => $user_id,
        ] );

        return $this->get_completed_sessions( $post_id, $user_id );
    }

    public function public_plans( WP_REST_Request $request ){
        $result = self::get_public_plans();

        $posts = [];

        $fields_to_include = [
            'join_key',
            'language_note',
            'location_note',
            'post_title',
            'time_of_day_note',
            'timezone_note',
            'zoom_link_note',
        ];
        foreach ( $result['posts'] as $plan ) {
            $post = [];
            foreach ( array_keys( $plan ) as $key ) {
                if ( in_array( $key, $fields_to_include ) || str_contains( $key, 'set_a' ) || str_contains( $key, 'set_b' ) ) {
                    $post[$key] = $plan[$key];
                }
            }

            $posts[] = $post;
        }

        return $posts;
    }

    public static function get_public_plans() {
        return DT_Posts::list_posts( self::$post_type, [ 'fields' => [ [ 'visibility' => [ 'public' ] ] ] ], false );
    }
}
Zume_Plans_Endpoints::instance();
