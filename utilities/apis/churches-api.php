<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Churches_Endpoints
{
    private $namespace;
    private static $post_type = 'groups';
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
            $this->namespace, '/churches', [
                'methods' => 'GET',
                'callback' => [ $this, 'list_churches' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/church/(?P<code>\w+)', [
                'methods' => 'GET',
                'callback' => [ $this, 'get_church' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/church', [
                'methods' => 'POST',
                'callback' => [ $this, 'create_church' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/church/(?P<code>\w+)', [
                'methods' => 'PUT',
                'callback' => [ $this, 'update_church' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/church', [
                'methods' => 'DELETE',
                'callback' => [ $this, 'delete_church' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
    }

    public static function list_churches( WP_REST_Request $request ){
        $user_id = get_current_user_id();

        return zume_get_user_churches( $user_id );
    }
    public function get_church( WP_REST_Request $request ) {
        /* Get the plan */
        $code = $request['code'];

        $user_id = get_current_user_id();
        $post_id = $this->can_user_access_church( $code, $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $church = DT_Posts::get_post( self::$post_type, (int) $post_id, true, false );

        return $church;
    }
    public function create_church( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset(
            $params['name'],
            $params['location_grid_meta'],
            $params['start_date'],
            $params['member_count'],
        ) ) {
            return new WP_Error( __METHOD__, 'Missing params', array( 'status' => 400 ) );
        }

        $user_id = get_current_user_id();
        $contact_id = zume_get_user_contact_id( $user_id );
        $fields = [
            'title' => $params['name'],
            'assigned_to' => $user_id,
            'group_type' => 'church',
            'group_status' => 'active',
            'location_grid_meta' => $params['location_grid_meta'],
            'reporter' => [
                'values' => [
                    [ 'value' => $contact_id ],
                ],
            ],
            'member_count' => $params['member_count'],
            'start_date' => $params['start_date'],
            'church_start_date' => $params['start_date'],
        ];

        if ( isset( $params['parent_church'] ) ) {
            $fields['parent_groups'] = [
                'values' => [
                    [ 'value' => $params['parent_church'] ],
                ],
            ];
        }

        $new_post = DT_Posts::create_post( self::$post_type, $fields, true, false );
        $churches = zume_get_user_churches( $user_id );

        foreach ( $churches as $church ) {
            if ( $church['id'] === $new_post['ID'] ) {
                return $church;
            }
        }

        return $new_post;
    }
    public function update_church( WP_REST_Request $request ){
        $code = $request['code'];

        $post_id = $this->can_user_edit_church( $code );
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
        if ( isset( $params['language_note'] ) ) {
            $fields['language_note'] = $params['language_note'];
        }
        if ( isset( $params['timezone_note'] ) ) {
            $fields['timezone_note'] = $params['timezone_note'];
        }
        if ( isset( $params['zoom_link_note'] ) ) {
            $fields['zoom_link_note'] = $params['zoom_link_note'];
        }
        if ( isset( $params['visibility'] ) ) {
            $fields['visibility'] = $params['visibility'];
        }
        if ( isset( $params['status'] ) ) {
            $fields['status'] = $params['status'];
        }

        $result = DT_Posts::update_post( self::$post_type, (int) $post_id, $fields, true, false );

        if ( is_wp_error( $result ) ) {
            return $result;
        }

        return 1;
    }
    public function delete_church( WP_REST_Request $request ) {
        global $wpdb, $table_prefix;

        if ( ! is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( ! isset( $params['church_id'] ) ) {
            return new WP_Error( __METHOD__, 'church_id required.', array( 'status' => 400 ) );
        }

        $user_id = get_current_user_id();
        $user_id = zume_validate_user_id_request( $user_id );
        if ( is_wp_error( $user_id ) ) {
            return $user_id;
        }

        $post_id = $this->can_user_edit_church( $params['church_id'], $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $delete = DT_Posts::delete_post( self::$post_type, $post_id );

        return $delete;
    }

    private function can_user_access_church( $post_id, $user_id ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        if ( !$post_id ) {
            return new WP_Error( 'bad-church-id', 'invalid church_id', array( 'status' => 400 ) );
        }

        $church = DT_Posts::get_post( self::$post_type, $post_id, true, false );
        if ( is_wp_error( $church ) ) {
            return new WP_Error( __METHOD__, 'Failed to get post.', array( 'status' => 400 ) );
        }

        if ( $church['assigned_to']['id'] !== "$user_id" ) {
            return new WP_Error( 'not-authorized', 'you are not authorised', array( 'status' => 400 ) );
        }

        return $post_id;
    }
    private function can_user_edit_church( $post_id, $user_id = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        if ( !$post_id ) {
            return new WP_Error( 'bad-church-id', 'invalid church_id', array( 'status' => 400 ) );
        }

        $type = is_string( $this->post_type );
        $church = DT_Posts::get_post( self::$post_type, (int) $post_id );
        if ( is_wp_error( $church ) ) {
            return new WP_Error( __METHOD__, 'Failed to access post.', array( 'status' => 400 ) );
        }

        if ( $church['assigned_to']['id'] !== "$user_id" ) {
            return new WP_Error( 'not-authorized', 'you are not authorised', array( 'status' => 401 ) );
        }

        return $post_id;
    }
}
Zume_Churches_Endpoints::instance();
