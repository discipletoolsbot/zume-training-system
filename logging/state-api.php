<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_State_API
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
            $namespace, '/user_state', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'user_state'],
                'permission_callback' => function () {
                    return dt_has_permissions($this->permissions);
                }
            ]
        );
        register_rest_route(
            $namespace, '/next_steps', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'next_steps'],
                'permission_callback' => function () {
                    return dt_has_permissions($this->permissions);
                }
            ]
        );

    }
    public function user_state( WP_REST_Request $request ) {
        global $wpdb;

        // setup vars
        $params = dt_recursive_sanitize_array( $request->get_params() );
        $user_id = (int) $params['user_id'];
        $days_ago = (int) $params['days_ago'];
        $days_ago_timestamp = time();
        if ( $days_ago > 0 ) {
            $days_ago_timestamp = strtotime( 'Today -'.$days_ago.' days' );
        }
        $count = 0;
        $has_coach = false;
        $stage = 0;
        $training_items = zume_training_items();
        $training_completed = 0;

        // query
        $sql = "SELECT * FROM wp_dt_reports
                WHERE user_id = {$user_id}
                AND post_type = 'zume'
                AND time_end <= {$days_ago_timestamp}
                ORDER BY time_end";
        $results = $wpdb->get_results( $sql, ARRAY_A );

        // get contact
        $contact_id = Disciple_Tools_Users::get_contact_for_user($user_id);
        if ( $contact_id ) {
            $contact = DT_Posts::get_post( 'contacts', (int) $contact_id, false, false, true );
        }

        // modify results
        if ( count($results) > 0 ) {
            $count = count($results);
            foreach( $results as $index => $value ) {
                if( $value['value'] > $stage ) {
                    $stage = $value['value'];
                }
                if( $value['subtype'] == 'requested_a_coach' ) {
                    $has_coach = true;
                }
                $results[$index]['timestamp'] = date( 'd-m-Y H:i:s',  $value['timestamp'] );
                $results[$index]['time_end'] = date( 'D j, M Y',  $value['time_end'] );

                if ( isset( $training_items[$value['subtype']]['completed'] ) && ! $training_items[$value['subtype']]['completed'] ) {
                    $training_items[$value['subtype']]['completed'] = true;
                    $training_completed++;
                }
            }
        }

        // build profile
        $profile = [
            'profile' => [
                'name' => $contact['name'],
                'user_id' => $user_id,
                'contact_id' => $contact_id,
                'first_event' => $results[0]['timestamp'],
                'last_event' => $results[count($results)-1]['timestamp'],
                'language' => 'en',
                'location' => $results[count($results)-1]['label'],
            ],
            'state' => [
                'stage' => $stage,
                'has_coach' => $has_coach,
                'has_set_profile' => false,
                'has_invited_friends' => false,
                'has_a_plan' => false,
            ],
            'training_completed' => $training_completed,
            'training_progress' => $training_items,
            'activity' => $results,
            'activity_count' => $count,
        ];

        return $profile;

    }

    public function next_steps( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        global $wpdb;


        return [
            'current_stage' => '0',
            'state' => [
                'last_login' => '2019-01-01',
                'last_key_activity' => '2019-01-01',
                'next_expected_activity' => '2019-01-01',
                'last_email' => '2019-01-01',
                'last_cta' => '2019-01-01',
                'has_coach' => false,
                'has_set_profile' => false,
                'has_invited_friends' => false,
                'has_a_plan' => false,
            ],
            'priority_next_step' => [
                'label' => 'Set Profile',
                'key' => 'set_profile',
            ],
            'next_ctas' => [
                [
                    'label' => 'Set Profile',
                    'key' => 'set_profile',
                ],
                [
                    'label' => 'Invite Friends',
                    'key' => 'invite_friends',
                ],
                [
                    'label' => 'Set a Plan',
                    'key' => 'set_a_plan',
                ],
            ],
            'next_emails' => [
                [
                    'subject' => 'Welcome to Zúme!',
                    'body' => 'Welcome to Zúme!',
                    'to' => 'zume@zume.com',
                    'cta' => [
                        'label' => 'Start Training',
                        'url' => 'https://zume.training',
                    ],
                ],
                [
                    'subject' => 'Welcome to Zúme!',
                    'body' => 'Welcome to Zúme!',
                    'to' => 'zume@zume.com',
                    'cta' => [
                        'label' => 'Start Training',
                        'url' => 'https://zume.training',
                    ],
                ],
                [
                    'subject' => 'Welcome to Zúme!',
                    'body' => 'Welcome to Zúme!',
                    'to' => 'zume@zume.com',
                    'cta' => [
                        'label' => 'Start Training',
                        'url' => 'https://zume.training',
                    ],
                ],
            ],
        ];

    }
    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace  ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }
}
Zume_System_State_API::instance();
