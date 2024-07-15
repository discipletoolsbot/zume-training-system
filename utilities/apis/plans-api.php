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
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/(?P<code>\w+)', [
                'methods' => 'GET',
                'callback' => [ $this, 'get_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'create_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/(?P<code>\w+)', [
                'methods' => 'PUT',
                'callback' => [ $this, 'update_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'DELETE',
                'callback' => [ $this, 'delete_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/completed-sessions', [
                'methods' => 'GET',
                'callback' => [ $this, 'completed_sessions' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/edit-session', [
                'methods' => 'POST',
                'callback' => [ $this, 'edit_session' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/complete-session', [
                'methods' => 'POST',
                'callback' => [ $this, 'mark_session_complete' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/public_plans', [
                'methods' => 'POST',
                'callback' => [ $this, 'public_plans' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function list_plans( WP_REST_Request $request ){
        $user_id = get_current_user_id();

        return zume_get_user_plans( $user_id );
    }
    public function get_plan( WP_REST_Request $request ) {
        /* Get the plan */
        $code = $request['code'];

        $user_id = get_current_user_id();
        $post_id = $this->can_user_access_plan( $code, $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $training_group = DT_Posts::get_post( self::$post_type, (int) $post_id, true, false );

        $completed_sessions = $this->get_completed_sessions( $post_id, $training_group );

        $training_group['completed_sessions'] = $completed_sessions;

        return $training_group;
    }
    public function create_plan( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['title'] ) || empty( $params['title'] ) ) {
            $current_user = wp_get_current_user();
            $plans = zume_get_user_plans( $params['user_id'] );

            if ( empty( $plans ) ) {
                $title = sprintf( _x( 'My first training - %s', 'My first training - username', 'zume' ), $current_user->display_name );
            } else {
                $title = sprintf( _x( 'Training %1$d - %2$s', 'Training 2 - username', 'zume' ), count( $plans ) + 1, $current_user->display_name );
            }
        } else {
            $title = $params['title'];
        }

        $fields = [
            'title' => $title,
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
        $code = $request['code'];

        $post_id = $this->can_user_edit_plan( $code );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $params = dt_recursive_sanitize_array( $request->get_params() );

        $fields = [];
        if ( isset( $params['title'] ) ) {
            $fields['title'] = $params['title'];
        }
        if ( isset( $params['visibility'] ) ) {
            $fields['visibility'] = $params['visibility'];
        }
        if ( isset( $params['location_note'] ) ) {
            $fields['location_note'] = $params['location_note'];
        }
        if ( isset( $params['time_of_day_note'] ) ) {
            $fields['time_of_day_note'] = $params['time_of_day_note'];
        }

        $result = DT_Posts::update_post( self::$post_type, (int) $post_id, $fields, true, false );

        if ( is_wp_error( $result ) ) {
            return $result;
        }

        return 1;
    }
    public function delete_plan( WP_REST_Request $request ) {
        global $wpdb, $table_prefix;

        if ( ! is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( ! isset( $params['key'], $params['user_id'] ) ) {
            return new WP_Error( __METHOD__, 'key and user_id required.', array( 'status' => 401 ) );
        }
        $user_id = zume_validate_user_id_request( $params['user_id'] );
        if ( is_wp_error( $user_id ) ) {
            return $user_id;
        }

        $post_id = $this->can_user_edit_plan( $params['key'], $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
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

        if ( !isset( $params['post_id'] ) || empty( $params['post_id'] ) ) {
            return new WP_Error( __METHOD__, 'post_id required', array( 'status' => 401 ) );
        }

        return $this->get_completed_sessions( $params['post_id'] );
    }
    public function edit_session( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['session_id'], $params['key'] ) ) {
            return new WP_Error( __METHOD__, 'session_id and key required', array( 'status' => 401 ) );
        }

        $user_id = get_current_user_id();
        if ( !$user_id ) {
            return new WP_Error( 'not-authorized', 'you are not authenticated', array( 'status' => 400 ) );
        }

        $key = $params['key'];
        $post_id = $this->can_user_edit_plan( $key, $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $meta_key = $params['session_id'];
        $meta_value = $params['session_time'];

        /* Check that meta_key is of type set_X_YY, where X = {a,b,c} and YY is numeric and 20 or less */
        $key_parts = explode( '_', $meta_key );
        if ( count( $key_parts ) !== 3 || !in_array( $key_parts[1], [ 'a', 'b', 'c' ] ) || intval( $key_parts[2] ) > 20 ) {
            return new WP_Error( __METHOD__, 'wrong session id format', array( 'status' => 401 ) );
        }

        update_post_meta( $post_id, $meta_key, $meta_value );

        return 1;
    }
    public function mark_session_complete( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['session_id'], $params['key'] ) ) {
            return new WP_Error( __METHOD__, 'session_id and key required', array( 'status' => 401 ) );
        }
        $session_id = $params['session_id'];
        $key = $params['key'];

        // access check
        $user_id = get_current_user_id();
        $post_id = $this->can_user_edit_plan( $key, $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }
        $completed_sessions = $this->get_completed_sessions( $post_id );
        if ( in_array( $session_id, $completed_sessions ) ) {
            return $completed_sessions;
        }

        // build fields
        $completed_key = $session_id . '_completed';
        $fields = [];
        $fields[$completed_key] = time();

        // update plan
        $training_group = DT_Posts::update_post( self::$post_type, (int) $post_id, $fields, true, false );
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to update post.', array( 'status' => 401 ) );
        }

        // return new list
        return $this->get_completed_sessions( $post_id );
    }
    public function get_completed_sessions( $post_id, $training_group = false ) {
        $completed_sessions = [];

        if ( empty( $training_group ) ) {
            $training_group = DT_Posts::get_post( self::$post_type, $post_id, true, false );
        }
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to get training group.', array( 'status' => 401 ) );
        }

        foreach ( $training_group as $key => $value ) {
            if ( 'set_' === substr( $key, 0, 4 ) && '_completed' === substr( $key, -10, 10 ) ) {
                $completed_sessions[] = str_replace( '_completed', '', $key );
            }
        }
        return $completed_sessions;
    }






    private function can_user_access_plan( $join_key, $user_id ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $post_id = Zume_Connect_Endpoints::test_join_key( $join_key );

        if ( !$post_id ) {
            return new WP_Error( 'bad-plan-code', 'invalid key', array( 'status' => 400 ) );
        }

        $user_contact_id = zume_get_user_contact_id( $user_id );

        $training_group = DT_Posts::get_post( self::$post_type, $post_id, true, false );
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to get post.', array( 'status' => 401 ) );
        }

        $participant_ids = array_values( array_map( function ( $participant ) {
            return $participant['ID'];
        }, $training_group['participants'] ) );

        if ( !in_array( $user_contact_id, $participant_ids ) ) {
            return new WP_Error( 'not-authorized', 'Not a participant of this group', array( 'status' => 400 ) );
        }

        return $post_id;
    }
    private function can_user_edit_plan( $join_key, $user_id = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $post_id = Zume_Connect_Endpoints::test_join_key( $join_key );

        if ( !$post_id ) {
            return new WP_Error( 'bad-plan-code', 'invalid key', array( 'status' => 400 ) );
        }

        $training_group = DT_Posts::get_post( 'zume_plans', $post_id );
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to access post.', array( 'status' => 401 ) );
        }

        if ( $training_group['assigned_to']['id'] !== "$user_id" ) {
            return new WP_Error( 'not-authorized', 'you are not authorised', array( 'status' => 400 ) );
        }

        return $post_id;
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
            'set_type',
        ];
        foreach ( $result['posts'] as $plan ) {
            $post = [];
            foreach ( array_keys( $plan ) as $key ) {
                if ( in_array( $key, $fields_to_include ) || str_contains( $key, 'set_a' ) || str_contains( $key, 'set_b' ) || str_contains( $key, 'set_c' ) ) {
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
