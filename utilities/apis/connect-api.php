<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Custom endpoints file
 */

class Zume_Connect_Endpoints
{
    private $namespace;
    private static $_instance = null;
    const SITE_CONNECTION_POST_ID = 20125;
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
            $this->namespace, '/connect/friend', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_to_friend_callback' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/connect/plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_to_plan_callback' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/connect/public-plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'connect_to_public_plan_callback' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
    }
    public function connect_to_friend_callback( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['code'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }

        return self::connect_to_friend( $params['code'] );
    }

    public static function connect_to_friend( $key ) {
        // does key exist
        // if so, then connect current user with friend
        $contact_id = self::test_friend_key( $key );

        if ( !$contact_id ) {
            return new WP_Error( 'bad_friend_code', 'Key not found', [ 'status' => 400 ] );
        }

        $current_user_id = get_current_user_id();
        $current_contact_id = zume_get_user_contact_id( $current_user_id );

        $fields = [
            'relation' => [
                'values' => [
                    [
                        'value' => $contact_id,
                    ],
                ],
            ],
        ];
        $result = DT_Posts::update_post( 'contacts', $current_contact_id, $fields, true, false );
        if ( ! is_wp_error( $result ) && is_array( $result ) ) {
            zume_log_insert( 'system', 'invited_friends', [ 'user_id' => $current_user_id ], true );

            $name = __( 'your friend', 'zume' );
            foreach ( $result['relation'] as $relation ) {
                if ( $relation['ID'] === $contact_id ) {
                    $name = $relation['post_title'];
                }
            }

            return [
                'name' => $name,
            ];
        } else {
            return new WP_Error( 'error_connecting_friend', 'Error updating contact', [ 'status' => 400 ] );
        }
    }

    public static function test_friend_key( $key ) : bool|int {
        global $wpdb, $table_prefix;
        $sql = $wpdb->prepare( "SELECT post_id FROM zume_postmeta WHERE `meta_key` = 'user_friend_key' AND meta_value = %s", $key );
        //phpcs:ignore
        $result = $wpdb->get_var( $sql );
        if ( $result && ! is_wp_error( $result ) ) {
            return (int) $result;
        }
        return false;
    }
    public function connect_to_plan_callback( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['code'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }

        $code = $params['code'];

        $connection_response = self::connect_to_plan( $code );

        if ( is_wp_error( $connection_response ) ) {
            return $connection_response;
        }

        $plan_post_id = self::test_join_key( $code );


        /* Get the plan owner's friend code */
        $plan = DT_Posts::get_post( 'zume_plans', $plan_post_id, true, false );

        if ( is_wp_error( $plan ) ) {
            return $plan;
        }

        $friend_user_id = $plan['assigned_to']['id'];
        $friend_contact_id = zume_get_user_contact_id( $friend_user_id );

        $friend = DT_Posts::get_post( 'contacts', $friend_contact_id, true, false );

        if ( is_wp_error( $friend ) ) {
            return $friend;
        }

        $code = $friend['user_friend_key'];

        $result = self::connect_to_friend( $code );

        if ( is_wp_error( $result ) ) {
            return $result;
        }

        return $connection_response;
    }

    public function connect_to_public_plan_callback( WP_REST_Request $request ){
        global $wpdb;
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['code'] ) ) {
            return new WP_Error( 'missing_params', 'Missing params', [ 'status' => 400 ] );
        }
        $user_id = get_current_user_id();
        $code = sanitize_text_field( $params['code'] );

        $plans = zume_get_user_plans( $user_id );
        if ( isset( $plans[$code] ) ) {
            return new WP_Error( 'already_connected', 'Already connected', [ 'status' => 409 ] );
        }

        $response = self::connect_to_plan( $code, true );
        if ( is_wp_error( $response ) ) {
            return $response;
        }

        // get vars
        $plan_post_id = self::test_join_key( $code );
        $plan = DT_Posts::get_post( 'zume_plans', $plan_post_id, true, false );
        if ( is_wp_error( $plan ) ) {
            return $plan;
        }
        $coach_user_id = $plan['assigned_to']['id']; // get user_id of the coach
        $coach_id = $wpdb->get_var( // get the post id of the coach from in the coaching site
            $wpdb->prepare(
                "SELECT post_id
                    FROM zume_3_postmeta
                    WHERE meta_key = 'corresponds_to_user'
                    AND meta_value = %d",
                $coach_user_id
            )
        );

        // connect use to coach
        $response = self::connect_user_from_public_plan_to_coach( $user_id, $plan, $coach_id, $coach_user_id );

        if ( is_wp_error( $response ) ) {
            return $response;
        }

        return [
            'name' => $plan['title'],
            'coach_id' => $plan['assigned_to']['id'],
        ];
    }

    public static function connect_to_plan( $key, $public = false ) {
        // does key exist
        // if so, then connect current user with friend
        $plan_post_id = self::test_join_key( $key );

        if ( !$plan_post_id ) {
            return new WP_Error( 'bad_plan_code', 'Key not found', [ 'status' => 400 ] );
        }

        $user_id = get_current_user_id();
        $contact_id = zume_get_user_contact_id( $user_id );
        $fields = [
            'zume_plans' => [
                'values' => [
                    [
                        'value' => $plan_post_id,
                    ],
                ],
            ],
        ];
        $result = DT_Posts::update_post( 'contacts', $contact_id, $fields, true, false );

        if ( is_wp_error( $result ) || !is_array( $result ) ) {
            return new WP_Error( __METHOD__, 'Error updating contact', [ 'status' => 400 ] );
        }

        $sub_type = $public === true ? 'joined_online_training' : 'joined_friends_training';

        // log
        zume_log_insert( 'training', $sub_type, [ 'user_id' => $user_id ], true );

        $name = __( 'the plan', 'zume' );
        foreach ( $result['zume_plans'] as $plan ) {
            if ( $plan['ID'] === $plan_post_id ) {
                $name = $plan['post_title'];
            }
        }
        return [
            'name' => $name,
        ];
    }

    public static function connect_user_from_public_plan_to_coach( $user_id, $plan, $coach_id, $coach_user_id ) {
        // does a contact in CS exist?
        // if exists, add coach and plan to old contact
        // if does not exits, add new contact, and connect with coach

        $profile = zume_get_user_profile( $user_id );
        $coaching_contact_id = $profile['coaching_contact_id'];
        $preferred_language = empty( $data ) ? $profile['preferred_language'] : 'en';

        if ( $coaching_contact_id ) {
            $fields = [
                'tags' => [
                    'values' => [
                        [ 'value' => $plan['title'] ],
                    ],
                ],
                'coached_by' => [
                    'values' => [
                        [ 'value' => $coach_id ],
                    ],
                ],
                'assigned_to' => $coach_user_id,
            ];
            if ( ! empty( $profile['location'] ) ) {
                $fields['location_grid_meta'] = [
                    'values' => [
                        [
                            'lng' => $profile['location']['lng'],
                            'lat' => $profile['location']['lat'],
                            'level' => $profile['location']['level'],
                            'label' => $profile['location']['label'],
                            'grid_id' => $profile['location']['grid_id'],
                        ],
                    ],
                    'force_values' => true,
                ];
            } else {
                $ip_location_grid_meta = zume_get_user_location( $user_id );
                $fields['location_grid_meta'] = [
                    'values' => [
                        [
                            'lng' => $ip_location_grid_meta['location']['lng'],
                            'lat' => $ip_location_grid_meta['location']['lat'],
                            'level' => $ip_location_grid_meta['location']['level'],
                            'label' => $ip_location_grid_meta['location']['label'],
                            'grid_id' => $ip_location_grid_meta['location']['grid_id'],
                        ],
                    ],
                    'force_values' => true,
                ];
            }
        }
        else {
            $fields = [
                'title' => $profile['name'],
                'overall_status' => 'new',
                'sources' => [
                    'values' => [
                        [ 'value' => 'zume_training' ],
                    ],
                ],
                'language_preference' => $preferred_language,
                'trainee_user_id' => $profile['user_id'],
                'trainee_contact_id' => $profile['contact_id'],
                'tags' => [
                    'values' => [
                        [ 'value' => $plan['title'] ],
                    ],
                ],
                'coached_by' => [
                    'values' => [
                        [ 'value' => $coach_id ],
                    ],
                ],
                'assigned_to' => $coach_user_id,
            ];
            if ( ! empty( $profile['location'] ) ) {
                $fields['location_grid_meta'] = [
                    'values' => [
                        [
                            'lng' => $profile['location']['lng'],
                            'lat' => $profile['location']['lat'],
                            'level' => $profile['location']['level'],
                            'label' => $profile['location']['label'],
                            'grid_id' => $profile['location']['grid_id'],
                        ],
                    ],
                ];
            } else {
                $ip_location_grid_meta = zume_get_user_location( $user_id );
                $fields['location_grid_meta'] = [
                    'values' => [
                        [
                            'lng' => $ip_location_grid_meta['location']['lng'],
                            'lat' => $ip_location_grid_meta['location']['lat'],
                            'level' => $ip_location_grid_meta['location']['level'],
                            'label' => $ip_location_grid_meta['location']['label'],
                            'grid_id' => $ip_location_grid_meta['location']['grid_id'],
                        ],
                    ],
                ];
            }
        }

        $site = Site_Link_System::get_site_connection_vars( self::SITE_CONNECTION_POST_ID );
        if ( ! $site ) {
            dt_write_log( __METHOD__ . ' FAILED TO GET SITE LINK TO GLOBAL ' );
            return new WP_Error( 'site_link_failed', 'Failed to link to coaching site ', array( 'status' => 400 ) );
        }

        $args = [
            'method' => 'POST',
            'body' => json_encode( $fields ),
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $site['transfer_token'],
            ],
        ];

        $url = 'https://' . trailingslashit( $site['url'] ) . 'wp-json/dt-posts/v2/contacts';

        if ( $coaching_contact_id ) {
            $method = 'UPDATE';
            $url .= "/$coaching_contact_id";
        } else {
            $method = 'CREATE';
        }

        $result = wp_remote_post( $url, $args );
        if ( is_wp_error( $result ) || $result['response']['code'] !== 200 ) {
            dt_write_log( __METHOD__ . " FAILED TO $method COACHING CONTACT FOR " . $profile['name'] );
            return new WP_Error( 'coach_request_failed', "Failed to $method coaching contact", array( 'status' => 400 ) );
        }

        $body = json_decode( $result['body'], true );

        // add comment
        $fields = [
            'comment' => 'Requested to join public training: '. $plan['title'],
        ];

        $comment_args = $args;
        $comment_args['body'] = json_encode( $fields );

        $url = 'https://' . trailingslashit( $site['url'] ) . 'wp-json/dt-posts/v2/contacts/' . $body['ID'] . '/comments';

        $result = wp_remote_post( $url, $comment_args );
        if ( is_wp_error( $result ) ) {
            dt_write_log( __METHOD__ . ' FAILED TO ADD COMMENTS TO COACHING CONTACT FOR ' . $profile['name'] );
        }

        if ( $coach_id !== null ) {
            Zume_System_Log_API::log( 'coaching', 'requested_a_coach', [ 'user_id' => $user_id ], true );
            Zume_System_Log_API::log( 'system', 'celebrated_coach_request', [ 'user_id' => $user_id ], true );
            Zume_System_Log_API::log( 'coaching', 'connected_to_coach', [ 'user_id' => $user_id, 'payload' => $coach_id ], true ); // change payload strategy
        } else {
            Zume_System_Log_API::log( 'coaching', 'requested_a_coach', [ 'user_id' => $user_id ], true );
        }

        return $body;
    }

    public static function test_join_key( $key ) : bool|int {
        global $wpdb, $table_prefix;
        $sql = $wpdb->prepare( "SELECT post_id FROM zume_postmeta WHERE `meta_key` = 'join_key' AND meta_value = %s", $key );
        //phpcs:ignore
        $result = $wpdb->get_var( $sql );
        if ( $result && ! is_wp_error( $result ) ) {
            return (int) $result;
        }
        return false;
    }
}
Zume_Connect_Endpoints::instance();
