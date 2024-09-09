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
            $this->namespace, '/church/(?P<post_id>\w+)', [
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
            $this->namespace, '/church/(?P<post_id>\w+)/deactivate', [
                'methods' => 'PUT',
                'callback' => [ $this, 'deactivate_church' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/church/(?P<post_id>\w+)/activate', [
                'methods' => 'PUT',
                'callback' => [ $this, 'activate_church' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/church', [
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
        $post_id = $request['post_id'];

        $user_id = get_current_user_id();
        $post_id = $this->can_user_access_church( $post_id, $user_id );
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
        $fields = [
            'title' => $params['name'],
            'assigned_to' => $user_id,
            'group_type' => 'church',
            'group_status' => 'active',
            'location_grid_meta' => $params['location_grid_meta'],
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

        if ( is_wp_error( $new_post ) ) {
            return $new_post;
        }

        $church = $this->get_user_church( $new_post['ID'] );
        if ( $church ) {
            return $church;
        }

        return $new_post;
    }
    public function update_church( WP_REST_Request $request ){

        $params = dt_recursive_sanitize_array( $request->get_params() );

        $post_id = $params['post_id'];

        $post_id = $this->can_user_edit_church( $post_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        if ( !isset(
            $params['name'],
            $params['location_grid_meta'],
            $params['start_date'],
            $params['member_count'],
        ) ) {
            return new WP_Error( __METHOD__, 'Missing params', array( 'status' => 400 ) );
        }

        $fields = [
            'title' => $params['name'],
            'location_grid_meta' => $params['location_grid_meta'],
            'member_count' => $params['member_count'],
            'start_date' => $params['start_date'],
            'church_start_date' => $params['start_date'],
        ];

        if ( isset( $params['parent_church'] ) ) {
            $parent_church_id = (int) $params['parent_church'];

            /* Parent church can't be itself */
            if ( $parent_church_id === $post_id ) {
                return new WP_Error( __METHOD__, 'Church cannot be its own parent', array( 'status' => 400 ) );
            }

            /* Parent church can't be a downstream church */
            $churches = zume_get_user_churches( null, true );
            $descendent_churches = [];

            $get_children = function ( $church_id ) use ( &$descendent_churches, &$get_children, $churches ) {

                if ( isset( $churches[$church_id] ) ) {
                    $church = $churches[$church_id];
                } else {
                    return;
                }
                $descendent_churches = [
                    ...$descendent_churches,
                    ...$church['children'],
                ];

                foreach ( $church['children'] as $child_id ) {
                    $get_children( $child_id );
                }
            };

            $get_children( $post_id );

            if ( in_array( $parent_church_id, $descendent_churches ) ) {
                return new WP_Error( __METHOD__, 'Church cannot have a descendent as a parent', array( 'status' => 400 ) );
            }

            $fields['parent_groups'] = [
                'values' => [
                    [ 'value' => $params['parent_church'] ],
                ],
                'force_values' => true,
            ];
        } else {
            $fields['parent_groups'] = [
                'values' => [],
                'force_values' => true,
            ];
        }


        $result = DT_Posts::update_post( self::$post_type, (int) $post_id, $fields, true, false );

        if ( is_wp_error( $result ) ) {
            return $result;
        }

        $church = $this->get_user_church( $result['ID'] );
        if ( $church ) {
            return $church;
        }
        return $result;
    }
    public function activate_church( WP_REST_Request $request ) {
        $post_id = $request['post_id'];

        $post_id = $this->can_user_edit_church( $post_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $result = DT_Posts::update_post( self::$post_type, (int) $post_id, [ 'group_status' => 'active' ], true, false );

        return $result;
    }
    public function deactivate_church( WP_REST_Request $request ) {
        $post_id = $request['post_id'];

        $post_id = $this->can_user_edit_church( $post_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $result = DT_Posts::update_post( self::$post_type, (int) $post_id, [ 'group_status' => 'inactive' ], true, false );

        return $result;
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

        $church = $this->get_user_church( (int) $post_id );
        if ( !empty( $church['children'] ) ) {
            return new WP_Error( __METHOD__, 'churches with children cannot be deleted', array( 'status' => 400 ) );
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

        $church = DT_Posts::get_post( self::$post_type, (int) $post_id );
        if ( is_wp_error( $church ) ) {
            return new WP_Error( __METHOD__, 'Failed to access post.', array( 'status' => 400 ) );
        }

        if ( $church['assigned_to']['id'] !== "$user_id" ) {
            return new WP_Error( 'not-authorized', 'you are not authorised', array( 'status' => 401 ) );
        }

        return $post_id;
    }

    private function get_user_church( $post_id ) {
        $churches = zume_get_user_churches();
        foreach ( $churches as $church ) {
            if ( $church['id'] === $post_id ) {
                return $church;
            }
        }
    }
}
Zume_Churches_Endpoints::instance();
