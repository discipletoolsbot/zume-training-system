<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_CTA_API
{
    public $namespace = 'zume_system/v1';
    private static $_instance = null;

    public static function instance()
    {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct()
    {
        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [$this, 'add_api_routes'] );
            add_filter( 'dt_allow_rest_access', [$this, 'authorize_url'], 10, 1 );
        }
    }

    public function authorize_url( $authorized )
    {
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

    public function add_api_routes()
    {
        $namespace = $this->namespace;
        register_rest_route(
            $namespace, '/user_ctas', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'request_sorter'],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function request_sorter( WP_REST_Request $request )
    {
        zume_i18n();

        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( is_user_logged_in() ) {
            return $this->user( $params );
        } else {
            return $this->guest( $params );
        }
    }

    public function user( $params )
    {
        if ( ! isset( $params['user_id'] ) ) {
            return new WP_Error( 'no_user_id', 'Missing params user_id', array( 'status' => 400 ) );
        }
        if ( ! isset( $params['language'] ) ) {
            return new WP_Error( 'no_language', 'Missing params language', array( 'status' => 400 ) );
        }

        return self::_get_ctas( $params['user_id'] );
    }
    public static function _get_ctas( $user_id, $log = null ) : array
    {
        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
            if ( is_null( $log ) ) {
                return [];
            }
        }

        $stage = zume_get_user_stage( $user_id, $log );

        $log_keys = [];
        foreach ( $log as $row ) {
            $log_keys[] = $row['log_key'];
        }

        $templates = self::get_ctas();

        $ctas = [];
        foreach ( $templates as $template ) {
            if ( in_array( $stage['value'], $template['stages'] ) ) {
                $ctas[] = $template;
            }
        }
        if ( ! empty( $ctas ) ) {
            foreach ( $ctas as $key => $cta ) {
                $show_cta = false;
                foreach ( $cta['required_keys'] as $required_key ) {
                    if ( !$show_cta && ! in_array( $required_key, $log_keys ) ) {
                        unset( $ctas[$key] );
                    } else {
                        $show_cta = true;
                    }
                }
                foreach ( $cta['disable_keys'] as $disable_key ) {
                    if ( in_array( $disable_key, $log_keys ) ) {
                        unset( $ctas[$key] );
                    }
                }
            }
        }

        return $ctas;
    }

    public function guest( $params )
    {
        $templates = self::get_ctas();

        $ctas = [];
        foreach ( $templates as $template ) {
            if ( in_array( 0, $template['stages'] ) ) {
                $ctas[] = $template;
            }
        }

        return $ctas;
    }

    public static function get_ctas()
    {
        $templates = [
            [
                'stages' => [0],
                'required_keys' => [],
                'disable_keys' => ['system_registered'],
                'key' => 'registered',
                'type' => 'system',
                'subtype' => 'registered',
                'content' => [
                    'title' => __( 'Register', 'zume' ),
                    'description' => __( 'Register to start your training', 'zume' ),
                    'link_text' => __( 'Register', 'zume' ),
                    'link' => zume_login_url(),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [0, 1],
                'required_keys' => [],
                'disable_keys' => ['system_joined_online_training'],
                'key' => 'system_joined_online_training',
                'type' => 'system',
                'subtype' => 'joined_online_training',
                'content' => [
                    'title' => __( 'Join Online Training', 'zume' ),
                    'description' => __( 'Join the online training to learn more', 'zume' ),
                    'link_text' => __( 'Join', 'zume' ),
                    'link' => zume_wizard_url( 'join' ),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [2, 3, 4, 5, 6],
                'required_keys' => ['system_joined_friends_training', 'system_joined_online_training'],
                'disable_keys' => ['system_celebrated_joining_training'],
                'key' => 'system_celebrated_joining_training',
                'type' => 'system',
                'subtype' => 'celebrated_joining_training',
                'content' => [
                    'title' => __( 'Joined Training!', 'zume' ),
                    'description' => __( 'Congratulations!', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1, 2, 3, 4, 5, 6],
                'required_keys' => [],
                'disable_keys' => ['coaching_requested_a_coach'],
                'key' => 'coaching_requested_a_coach',
                'type' => 'coaching',
                'subtype' => 'requested_a_coach',
                'content' => [
                    'title' => __( 'Get a Coach', 'zume' ),
                    'description' => __( 'Get a coach to help you on your journey', 'zume' ),
                    'link_text' => __( 'Get a Coach', 'zume' ),
                    'link' => zume_wizard_url( 'coaching' ),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1, 2, 3, 4, 5, 6],
                'required_keys' => ['coaching_requested_a_coach'],
                'disable_keys' => ['system_celebrated_coach_request'],
                'key' => 'system_celebrated_coach_request',
                'type' => 'system',
                'subtype' => 'celebrated_coach_request',
                'content' => [
                    'title' => __( 'Requested Coach!', 'zume' ),
                    'description' => __( 'Congratulations', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1, 2, 3, 4, 5, 6],
                'required_keys' => ['system_connected_to_coach'],
                'disable_keys' => ['system_celebrated_coach_connect'],
                'key' => 'system_celebrated_coach_connect',
                'type' => 'system',
                'subtype' => 'celebrated_coach_connect',
                'content' => [
                    'title' => __( 'Connected to Coach!', 'zume' ),
                    'description' => __( 'Congratulations', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1, 2, 3, 4, 5, 6],
                'required_keys' => ['system_join_community'],
                'disable_keys' => ['system_celebrated_join_community'],
                'key' => 'system_celebrated_join_community',
                'type' => 'system',
                'subtype' => 'celebrated_join_community',
                'content' => [
                    'title' => __( 'Joined Community', 'zume' ),
                    'description' => __( 'Congratulations', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1],
                'required_keys' => [],
                'disable_keys' => ['system_plan_created'],
                'key' => 'system_plan_created',
                'type' => 'system',
                'subtype' => 'plan_created',
                'content' => [
                    'title' => __( 'Create a Training', 'zume' ),
                    'description' => __( 'Create a training to help you grow', 'zume' ),
                    'link_text' => __( 'Create a Training', 'zume' ),
                    'link' => zume_wizard_url( 'start' ),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1, 2],
                'required_keys' => ['system_plan_created'],
                'disable_keys' => ['system_celebrate_plan_created'],
                'key' => 'system_celebrate_plan_created',
                'type' => 'system',
                'subtype' => 'celebrate_plan_created',
                'content' => [
                    'title' => __( 'Created Training!', 'zume' ),
                    'description' => __( 'Congratulations', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            /* Mute for Go live: this one is for inviting people to become friends with you. */
/*             [
                'stages' => [1, 2],
                'required_keys' => [],
                'disable_keys' => ['system_invited_friends'],
                'key' => 'system_invited_friends',
                'type' => 'system',
                'subtype' => 'invited_friends',
                'content' => [
                    'title' => __( 'Invite Friends', 'zume' ),
                    'description' => __( 'Invite friends to join you on your journey', 'zume' ),
                    'link_text' => __( 'Invite Friends', 'zume' ),
                    'link' => zume_invite_friends_url(),
                ],
                'content_template' => 'card',
            ], */
            [
                'stages' => [1, 2, 3, 4, 5, 6],
                'required_keys' => [],
                'disable_keys' => ['system_set_profile'],
                'key' => 'system_set_profile',
                'type' => 'system',
                'subtype' => 'set_profile',
                'content' => [
                    'title' => __( 'Set Profile', 'zume' ),
                    'description' => __( 'Set your profile to help others know you', 'zume' ),
                    'link_text' => __( 'Set Profile', 'zume' ),
                    'link' => zume_wizard_url( 'profile' ),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1, 2, 3, 4, 5, 6],
                'required_keys' => ['system_set_profile'],
                'disable_keys' => ['system_celebrated_set_profile'],
                'key' => 'system_celebrated_set_profile',
                'type' => 'system',
                'subtype' => 'celebrated_set_profile',
                'content' => [
                    'title' => __( 'Profile Set', 'zume' ),
                    'description' => __( 'Congratulations!', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [2],
                'required_keys' => ['training_26_heard'],
                'disable_keys' => ['system_made_post_training_plan'],
                'key' => 'system_made_post_training_plan',
                'type' => 'system',
                'subtype' => 'made_post_training_plan',
                'content' => [
                    'title' => __( 'Create 3 Month Plan', 'zume' ),
                    'description' => __( 'Create a 3 month plan to help you grow', 'zume' ),
                    'link_text' => __( 'Create 3 Month Plan', 'zume' ),
                    'link' => '/create-3-month-plan',
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1, 2],
                'required_keys' => ['training_26_heard'],
                'disable_keys' => ['system_celebrated_plan_unlocked'],
                'key' => 'system_celebrated_plan_unlocked',
                'type' => 'system',
                'subtype' => 'celebrated_plan_unlocked',
                'content' => [
                    'title' => sprintf( __( '%s unlocked', 'zume' ), __( '3 month plan', 'zume' ) ),
                    'description' => __( 'Congratulations!', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/unlocked.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1, 2],
                'required_keys' => ['system_made_post_training_plan'],
                'disable_keys' => ['system_made_post_training_plan_celebrated'],
                'key' => 'system_made_post_training_plan_celebrated',
                'type' => 'system',
                'subtype' => 'made_post_training_plan_celebrated',
                'content' => [
                    'title' => __( '3-Month Plan Created', 'zume' ),
                    'description' => __( 'Congratulations!', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [3],
                'required_keys' => [],
                'disable_keys' => ['system_completed_3_month_plan'],
                'key' => 'system_completed_3_month_plan',
                'type' => 'system',
                'subtype' => 'completed_3_month_plan',
                'content' => [
                    'title' => __( 'Complete 3 Month Plan', 'zume' ),
                    'description' => __( 'Complete your 3 month plan to help you grow', 'zume' ),
                    'link_text' => __( 'Complete 3 Month Plan', 'zume' ),
                    'link' => '/complete-3-month-plan',
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1, 2, 3],
                'required_keys' => ['system_completed_3_month_plan'],
                'disable_keys' => ['system_completed_3_month_plan_celebrated'],
                'key' => 'system_completed_3_month_plan_celebrated',
                'type' => 'system',
                'subtype' => 'completed_3_month_plan_celebrated',
                'content' => [
                    'title' => __( '3 Month Plan Completed', 'zume' ),
                    'description' => __( 'Congratulations!', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            /* Muted until after post go-live */
            /* [
                'stages' => [3, 4, 5, 6],
                'required_keys' => [],
                'disable_keys' => [],
                'key' => 'report_practitioner_report',
                'type' => 'report',
                'subtype' => 'practitioner_report',
                'content' => [
                    'title' => __( 'Submit Report', 'zume' ),
                    'description' => __( 'Submit a report to help you grow', 'zume' ),
                    'link_text' => __( 'Submit Report', 'zume' ),
                    'link' => '/submit-report',
                ],
                'content_template' => 'card',
            ], */
/*             [
                'stages' => [4, 5, 6],
                'required_keys' => [],
                'disable_keys' => ['system_joined_affinity_hub'],
                'key' => 'system_joined_affinity_hub',
                'type' => 'system',
                'subtype' => 'joined_affinity_hub',
                'content' => [
                    'title' => __( 'Join a Hub', 'zume' ),
                    'description' => __( 'Join a hub to help you grow', 'zume' ),
                    'link_text' => __( 'Join a Hub', 'zume' ),
                    'link' => zume_wizard_url( 'join_the_community' ),
                ],
                'content_template' => 'card',
            ], */
            [
                'stages' => [4, 5, 6],
                'required_keys' => [],
                'disable_keys' => ['system_join_community'],
                'key' => 'system_join_community',
                'type' => 'system',
                'subtype' => 'join_community',
                'content' => [
                    'title' => __( 'Join the community', 'zume' ),
                    'link_text' => __( 'Join', 'zume' ),
                    'link' => zume_wizard_url( 'join_the_community' ),
                ],
                'content_template' => 'card',
            ],

            // HOST triggers
/*             [
                'stages' => [2],
                'required_keys' => ['training_3_heard'],
                'disable_keys' => ['training_3_shared'],
                'key' => 'training_3_shared',
                'type' => 'training',
                'subtype' => '3_shared',
                'content' => [
                    'title' => __( 'Share Spiritual Breathing', 'zume' ),
                    'description' => __( 'Share Spiritual Breathing with someone', 'zume' ),
                    'link_text' => __( 'Share Spiritual Breathing', 'zume' ),
                    'link' => '/training_3_shared',
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [2],
                'required_keys' => ['training_8_heard'],
                'disable_keys' => ['training_8_shared'],
                'key' => 'training_8_shared',
                'type' => 'training',
                'subtype' => '8_shared',
                'content' => [
                    'title' => __( 'Share Relational Stewardship', 'zume' ),
                    'description' => __( 'Share Relational Stewardship with someone', 'zume' ),
                    'link_text' => __( 'Share Relational Stewardship', 'zume' ),
                    'link' => '/training_8_shared',
                ],
                'content_template' => 'card',
            ], */
        ];
        return $templates;
    }
}
Zume_System_CTA_API::instance();
