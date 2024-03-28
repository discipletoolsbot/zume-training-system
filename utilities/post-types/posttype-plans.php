<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

if ( ! class_exists( 'DT_Module_Base' ) ) {
    dt_write_log( 'Disciple.Tools System not loaded. Cannot load custom post type.' );
    return;
}

add_filter( 'dt_post_type_modules', function ( $modules ) {
    $modules['zume_plans_base'] = [
        'name' => 'Zume Plans',
        'enabled' => true,
        'locked' => true,
        'prerequisites' => [ 'contacts_base' ],
        'post_type' => 'zume_plans',
        'description' => 'Default starter functionality',
    ];

    return $modules;
}, 20, 1 );

/**
 * Class Disciple_Tools_Plugin_Starter_Template_Base
 * Load the core post type hooks into the Disciple.Tools system
 */
class Zume_Plans_Post_Type extends DT_Module_Base {

    public $post_type = 'zume_plans';
    public $module = 'zume_plans_base';
    public $single_name = 'Plan';
    public $plural_name = 'Plans';
    public static function post_type(){
        return 'zume_plans';
    }

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
        if ( !self::check_enabled_and_prerequisites() ){
            return;
        }

        //setup post type
        add_action( 'after_setup_theme', [ $this, 'after_setup_theme' ], 100 );
        add_filter( 'dt_set_roles_and_permissions', [ $this, 'dt_set_roles_and_permissions' ], 20, 1 ); //after contacts

        //setup tiles and fields
        add_filter( 'dt_custom_fields_settings', [ $this, 'dt_custom_fields_settings' ], 10, 2 );
        add_filter( 'dt_details_additional_tiles', [ $this, 'dt_details_additional_tiles' ], 10, 2 );
        add_action( 'dt_details_additional_section', [ $this, 'dt_details_additional_section' ], 20, 2 );
        add_action( 'wp_enqueue_scripts', [ $this, 'scripts' ], 99 );
        add_filter( 'dt_get_post_type_settings', [ $this, 'dt_get_post_type_settings' ], 20, 2 );

        // hooks
        add_action( 'post_connection_removed', [ $this, 'post_connection_removed' ], 10, 4 );
        add_action( 'post_connection_added', [ $this, 'post_connection_added' ], 10, 4 );
        add_filter( 'dt_post_update_fields', [ $this, 'dt_post_update_fields' ], 10, 3 );
        add_filter( 'dt_post_create_fields', [ $this, 'dt_post_create_fields' ], 10, 2 );
        add_action( 'dt_post_created', [ $this, 'dt_post_created' ], 10, 3 );
        add_action( 'dt_comment_created', [ $this, 'dt_comment_created' ], 10, 4 );

        //list
        add_filter( 'dt_user_list_filters', [ $this, 'dt_user_list_filters' ], 10, 2 );
        add_filter( 'dt_filter_access_permissions', [ $this, 'dt_filter_access_permissions' ], 20, 2 );
    }

    public function after_setup_theme(){
        $this->single_name = 'Plan';
        $this->plural_name = 'Plans';

        if ( class_exists( 'Disciple_Tools_Post_Type_Template' ) ) {
            new Disciple_Tools_Post_Type_Template( $this->post_type, $this->single_name, $this->plural_name );
        }
    }

    public function dt_get_post_type_settings( $settings, $post_type ){
        if ( $post_type === $this->post_type ){
            $settings['label_singular'] = 'Plan';
            $settings['label_plural'] = 'Plans';
        }
        return $settings;
    }

    /**
     * @todo define the permissions for the roles
     * Documentation
     * @link https://github.com/DiscipleTools/Documentation/blob/master/Theme-Core/roles-permissions.md#rolesd
     */
    public function dt_set_roles_and_permissions( $expected_roles ){

        if ( !isset( $expected_roles['my_starter_role'] ) ){
            $expected_roles['my_starter_role'] = [

                'label' => 'Plans',
                'description' => 'Does something Cool',
                'permissions' => [
                    'access_contacts' => true,
                    // @todo more capabilities
                ],
            ];
        }

        // if the user can access contact they also can access this post type
        foreach ( $expected_roles as $role => $role_value ){
            if ( isset( $expected_roles[$role]['permissions']['access_contacts'] ) && $expected_roles[$role]['permissions']['access_contacts'] ){
                $expected_roles[$role]['permissions']['access_' . $this->post_type ] = true;
                $expected_roles[$role]['permissions']['create_' . $this->post_type] = true;
                $expected_roles[$role]['permissions']['update_' . $this->post_type] = true;
            }
        }

        if ( isset( $expected_roles['dt_admin'] ) ){
            $expected_roles['dt_admin']['permissions']['view_any_'.$this->post_type ] = true;
            $expected_roles['dt_admin']['permissions']['update_any_'.$this->post_type ] = true;
        }
        if ( isset( $expected_roles['administrator'] ) ){
            $expected_roles['administrator']['permissions']['view_any_'.$this->post_type ] = true;
            $expected_roles['administrator']['permissions']['update_any_'.$this->post_type ] = true;
            $expected_roles['administrator']['permissions']['delete_any_'.$this->post_type ] = true;
        }

        return $expected_roles;
    }

    /**
     * @todo define fields
     * Documentation
     * @link https://github.com/DiscipleTools/Documentation/blob/master/Theme-Core/fields.md
     */
    public function dt_custom_fields_settings( $fields, $post_type ){
        if ( $post_type === $this->post_type ){
            $fields['status'] = [
                'name'        => 'Status',
                'description' => 'Set the current status.',
                'type'        => 'key_select',
                'default'     => [
                    'inactive' => [
                        'label' => 'Inactive',
                        'description' => 'No longer active.',
                        'color' => '#F43636',
                    ],
                    'active'   => [
                        'label' => 'Active',
                        'description' => 'Is active.',
                        'color' => '#4CAF50',
                    ],
                ],
                'tile'     => 'status',
                'icon' => get_template_directory_uri() . '/dt-assets/images/status.svg',
                'default_color' => '#366184',
                'show_in_table' => 10,
            ];
            $fields['assigned_to'] = [
                'name'        => 'Assigned To',
                'description' => 'Select the main person who is responsible for reporting on this record.',
                'type'        => 'user_select',
                'default'     => '',
                'tile' => 'status',
                'icon' => get_template_directory_uri() . '/dt-assets/images/assigned-to.svg',
                'show_in_table' => 16,
            ];
            $fields['visibility'] = [
                'name'        => 'Plan Visibility',
                'description' => 'Set the current status.',
                'type'        => 'key_select',
                'default'     => [
                    'private' => [
                        'label' => 'Private',
                        'description' => 'No longer active.',
                        'color' => '#F43636',
                    ],
                    'public'   => [
                        'label' => 'Public',
                        'description' => 'Is active.',
                        'color' => '#4CAF50',
                    ],
                ],
                'tile'     => 'status',
                'icon' => get_template_directory_uri() . '/dt-assets/images/status.svg',
                'default_color' => '#366184',
                'show_in_table' => 10,
            ];
            $fields['time_of_day_note'] = [
                'name'        => 'Time of Day Note',
                'description' => 'Time of day, like "4-6 in the evening"',
                'type'        => 'text',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['location_note'] = [
                'name'        => 'Location Note',
                'description' => 'Location of the training description, like "Zoom" or "At the church"',
                'type'        => 'text',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['zoom_link_note'] = [
                'name'        => 'Zoom Link',
                'description' => 'Link to zoom meeting',
                'type'        => 'text',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['timezone_note'] = [
                'name'        => 'Time Zone',
                'description' => 'Time zone of the training',
                'type'        => 'text',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['language_note'] = [
                'name'        => 'Language',
                'description' => 'Language of the training',
                'type'        => 'text',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/languages.svg',
            ];
            $fields['join_key'] = [
                'name'        => 'Join Key',
                'description' => 'Key to join the training, like a password or meeting ID',
                'type'        => 'text',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/qrcode-solid.svg',
            ];

            $fields['set_a_01'] = [
                'name'        => '10 Session 01',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_02'] = [
                'name'        => '10 Session 02',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_03'] = [
                'name'        => '10 Session 03',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_04'] = [
                'name'        => '10 Session 04',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_05'] = [
                'name'        => '10 Session 05',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_06'] = [
                'name'        => '10 Session 06',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_07'] = [
                'name'        => '10 Session 07',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_08'] = [
                'name'        => '10 Session 08',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_09'] = [
                'name'        => '10 Session 09',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_a_10'] = [
                'name'        => '10 Session 10',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];


            $fields['set_b_01'] = [
                'name'        => '20 Session 01',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_02'] = [
                'name'        => '20 Session 02',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_03'] = [
                'name'        => '20 Session 03',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_04'] = [
                'name'        => '20 Session 04',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_05'] = [
                'name'        => '20 Session 05',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_06'] = [
                'name'        => '20 Session 06',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_07'] = [
                'name'        => '20 Session 07',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_08'] = [
                'name'        => '20 Session 08',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_09'] = [
                'name'        => '20 Session 09',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_10'] = [
                'name'        => '20 Session 10',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_11'] = [
                'name'        => '20 Session 11',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_12'] = [
                'name'        => '20 Session 12',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_13'] = [
                'name'        => '20 Session 13',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_14'] = [
                'name'        => '20 Session 14',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_15'] = [
                'name'        => '20 Session 15',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_16'] = [
                'name'        => '20 Session 16',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_17'] = [
                'name'        => '20 Session 17',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_18'] = [
                'name'        => '20 Session 18',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_19'] = [
                'name'        => '20 Session 19',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];
            $fields['set_b_20'] = [
                'name'        => '20 Session 20',
                'description' => '',
                'type'        => 'date',
                'default'     => '',
                'tile' => 'details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/date-start.svg',
            ];


            $fields['participants'] = [
                'name' => 'Participants',
                'description' => '',
                'type' => 'connection',
                'post_type' => 'contacts',
                'p2p_direction' => 'to',
                'p2p_key' => $this->post_type.'_to_contacts',
                'tile' => 'participants',
                'icon' => get_template_directory_uri() . '/dt-assets/images/group-type.svg',
                'create-icon' => get_template_directory_uri() . '/dt-assets/images/add-contact.svg',
                'show_in_table' => 35,
            ];
        }

        if ( $post_type === 'contacts' ){
            $fields[$this->post_type] = [
                'name' => $this->plural_name,
                'description' => '',
                'type' => 'connection',
                'post_type' => $this->post_type,
                'p2p_direction' => 'from',
                'p2p_key' => $this->post_type.'_to_contacts',
                'tile' => 'profile_details',
                'icon' => get_template_directory_uri() . '/dt-assets/images/group-type.svg',
                'create-icon' => get_template_directory_uri() . '/dt-assets/images/add-group.svg',
                'show_in_table' => 35,
            ];
        }

        return $fields;
    }

    public function dt_details_additional_tiles( $tiles, $post_type = '' ){
        if ( $post_type === $this->post_type ){
            $tiles['participants'] = [ 'label' => 'Participants' ];
            $tiles['install'] = [ 'label' => 'Install' ];
        }
        return $tiles;
    }

    public function dt_details_additional_section( $section, $post_type ){

        if ( $post_type === $this->post_type && $section === 'install' ) {
//            $fields = DT_Posts::get_post_field_settings( $post_type );
//            $post = DT_Posts::get_post( $this->post_type, get_the_ID() );
            ?>
            <div class="section-subheader">
                <?php echo esc_html( 'Start date' ) ?>
            </div>
            <div>
                <input type="date" id="start_date" class="" value="" />
                <button class="button" id="install_10_sessions">Add 10 Sessions</button>
                <button class="button" id="install_20_sessions">Add 20 Sessions</button>
            </div>
            <script>
                jQuery(document).ready(function(){
                    let start_date = jQuery('#start_date')
                    let post_id = <?php echo esc_js( get_the_ID() ); ?>;
                    jQuery('#install_10_sessions').click(function(){
                        let date = Math.floor(new Date(start_date.val()).getTime() / 1000)
                        let list = {
                            'set_a_01': date + (0 * 604800 ),
                            'set_a_02': date + (1 * 604800 ),
                            'set_a_03': date + (2 * 604800 ),
                            'set_a_04': date + (3 * 604800 ),
                            'set_a_05': date + (4 * 604800 ),
                            'set_a_06': date + (5 * 604800 ),
                            'set_a_07': date + (6 * 604800 ),
                            'set_a_08': date + (7 * 604800 ),
                            'set_a_09': date + (8 * 604800 ),
                            'set_a_10': date + (9 * 604800 ),
                        };
                        window.API.update_post('zume_plans', post_id, list )
                    });
                    jQuery('#install_20_sessions').click(function(){
                        console.log('install 20 sessions');
                        let date = Math.floor(new Date(start_date.val()).getTime() / 1000)
                        let list = {
                            'set_b_01': date + ( 0 * 604800 ),
                            'set_b_02': date + ( 1 * 604800 ),
                            'set_b_03': date + ( 2 * 604800 ),
                            'set_b_04': date + ( 3 * 604800 ),
                            'set_b_05': date + ( 4 * 604800 ),
                            'set_b_06': date + ( 5 * 604800 ),
                            'set_b_07': date + ( 6 * 604800 ),
                            'set_b_08': date + ( 7 * 604800 ),
                            'set_b_09': date + ( 8 * 604800 ),
                            'set_b_10': date + ( 9 * 604800 ),
                            'set_b_11': date + ( 10 * 604800 ),
                            'set_b_12': date + ( 11 * 604800 ),
                            'set_b_13': date + ( 12 * 604800 ),
                            'set_b_14': date + ( 13 * 604800 ),
                            'set_b_15': date + ( 14 * 604800 ),
                            'set_b_16': date + ( 15 * 604800 ),
                            'set_b_17': date + ( 16 * 604800 ),
                            'set_b_18': date + ( 17 * 604800 ),
                            'set_b_19': date + ( 18 * 604800 ),
                            'set_b_20': date + ( 19 * 604800 ),
                        };
                        window.API.update_post('zume_plans', post_id, list )
                    });
                });
            </script>
        <?php }
    }

    public function post_connection_added( $post_type, $post_id, $field_key, $value ){
        if ( $post_type === $this->post_type ){
            if ( $field_key === 'participants' ){
                $user_id = zume_get_user_id_by_contact_id( $value );
                if ( empty( $user_id ) ){
                    return;
                }

                DT_Posts::add_shared( $post_type, $post_id, $user_id, null, false, false, true );

                zume_log_insert(
                    'system',
                    'plan_created',
                    [
                        'user_id' => $user_id,
                    ],
                );
            }
        }
    }

    //action when a post connection is removed during create or update
    public function post_connection_removed( $post_type, $post_id, $field_key, $value ){
//        if ( $post_type === $this->post_type ){
//            // execute your code here, if connection removed
//        }
    }

    //filter at the start of post update
    public function dt_post_update_fields( $fields, $post_type, $post_id ){
        if ( $post_type === $this->post_type ){
            // execute your code here
            if ( empty( $fields['join_key'] ) ) {
                update_post_meta( $post_id, 'join_key', $this->generate_join_key() );
            }
        }
        return $fields;
    }


    //filter when a comment is created
    public function dt_comment_created( $post_type, $post_id, $comment_id, $type ){
    }

    public function generate_join_key() {
        global $wpdb;
        $key = substr( md5( rand( 10000, 100000 ) ), 0, 3 ) . substr( md5( rand( 10000, 100000 ) ), 0, 3 );
        $key_exists = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'join_key' AND meta_value = %s", $key ) );
        while ( $key_exists ){
            $key = substr( md5( rand( 10000, 100000 ) ), 0, 3 ) . substr( md5( rand( 10000, 100000 ) ), 0, 3 );
            $key_exists = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'join_key' AND meta_value = %s", $key ) );
        }
        return $key;
    }

    // filter at the start of post creation
    public function dt_post_create_fields( $fields, $post_type ){
        if ( $post_type === $this->post_type ){
            $post_fields = DT_Posts::get_post_field_settings( $post_type );
            if ( !isset( $fields['status'] ) || empty( $fields['status'] ) ) {
                $fields['status'] = 'active';
            }
            if ( empty( $post_fields['join_key'] ) ) {
                $fields['join_key'] = $this->generate_join_key();
            }
        }
        return $fields;
    }

    //action when a post has been created
    public function dt_post_created( $post_type, $post_id, $initial_fields ){
        if ( $post_type === $this->post_type ){
            if ( isset( $initial_fields['assigned_to'] ) ){
                zume_log_insert(
                    'system',
                    'plan_created',
                    [
                        'user_id' => $initial_fields['assigned_to'],
                    ],
                );
            }
            if ( empty( $post_fields['join_key'] ) ) {
                update_post_meta( $post_id, 'join_key', $this->generate_join_key() );
            }
        }
    }

    private static function count_records_assigned_to_me_by_status(){
        global $wpdb;
        $post_type = self::post_type();
        $current_user = get_current_user_id();

        $results = $wpdb->get_results( $wpdb->prepare( "
            SELECT status.meta_value as status, count(pm.post_id) as count
            FROM $wpdb->postmeta pm
            INNER JOIN $wpdb->posts a ON( a.ID = pm.post_id AND a.post_type = %s and a.post_status = 'publish' )
            INNER JOIN $wpdb->postmeta status ON ( status.post_id = pm.post_id AND status.meta_key = 'status' )
            WHERE pm.meta_key = 'assigned_to'
            AND pm.meta_value = CONCAT( 'user-', %s )
            GROUP BY status.meta_value
        ", $post_type, $current_user ), ARRAY_A);

        return $results;
    }

    //list page filters function
    private static function count_records_by_status(){
        global $wpdb;
        $results = $wpdb->get_results($wpdb->prepare( "
            SELECT status.meta_value as status, count(status.post_id) as count
            FROM $wpdb->postmeta status
            INNER JOIN $wpdb->posts a ON( a.ID = status.post_id AND a.post_type = %s and a.post_status = 'publish' )
            WHERE status.meta_key = 'status'
            GROUP BY status.meta_value
        ", self::post_type() ), ARRAY_A );

        return $results;
    }

    //build list page filters
    public static function dt_user_list_filters( $filters, $post_type ){
        /**
         * @todo process and build filter lists
         */
        if ( $post_type === self::post_type() ){
            $records_assigned_to_me_by_status_counts = self::count_records_assigned_to_me_by_status();
            $fields = DT_Posts::get_post_field_settings( $post_type );
            /**
             * Setup my filters
             */
            $active_counts = [];
            $status_counts = [];
            $total_my = 0;
            foreach ( $records_assigned_to_me_by_status_counts as $count ){
                $total_my += $count['count'];
                dt_increment( $status_counts[$count['status']], $count['count'] );
            }

            // add assigned to me tab
            $filters['tabs'][] = [
                'key' => 'assigned_to_me',
                'label' => 'Assigned to me',
                'count' => $total_my,
                'order' => 20,
            ];
            // add assigned to me filters
            $filters['filters'][] = [
                'ID' => 'my_all',
                'tab' => 'assigned_to_me',
                'name' => 'All',
                'query' => [
                    'assigned_to' => [ 'me' ],
                    'sort' => 'status',
                ],
                'count' => $total_my,
            ];
            //add a filter for each status
            foreach ( $fields['status']['default'] as $status_key => $status_value ) {
                if ( isset( $status_counts[$status_key] ) ){
                    $filters['filters'][] = [
                        'ID' => 'my_' . $status_key,
                        'tab' => 'assigned_to_me',
                        'name' => $status_value['label'],
                        'query' => [
                            'assigned_to' => [ 'me' ],
                            'status' => [ $status_key ],
                            'sort' => '-post_date',
                        ],
                        'count' => $status_counts[$status_key],
                    ];
                }
            }

            if ( DT_Posts::can_view_all( self::post_type() ) ){
                $records_by_status_counts = self::count_records_by_status();
                $status_counts = [];
                $total_all = 0;
                foreach ( $records_by_status_counts as $count ){
                    $total_all += $count['count'];
                    dt_increment( $status_counts[$count['status']], $count['count'] );
                }

                // add by Status Tab
                $filters['tabs'][] = [
                    'key' => 'by_status',
                    'label' => 'All By Status',
                    'count' => $total_all,
                    'order' => 30,
                ];
                // add assigned to me filters
                $filters['filters'][] = [
                    'ID' => 'all',
                    'tab' => 'by_status',
                    'name' => 'All',
                    'query' => [
                        'sort' => '-post_date',
                    ],
                    'count' => $total_all,
                ];

                foreach ( $fields['status']['default'] as $status_key => $status_value ) {
                    if ( isset( $status_counts[$status_key] ) ){
                        $filters['filters'][] = [
                            'ID' => 'all_' . $status_key,
                            'tab' => 'by_status',
                            'name' => $status_value['label'],
                            'query' => [
                                'status' => [ $status_key ],
                                'sort' => '-post_date',
                            ],
                            'count' => $status_counts[$status_key],
                        ];
                    }
                }
            }
        }
        return $filters;
    }

    // access permission
    public static function dt_filter_access_permissions( $permissions, $post_type ){
        if ( $post_type === self::post_type() ){
            if ( DT_Posts::can_view_all( $post_type ) ){
                $permissions = [];
            }
        }
        return $permissions;
    }

    // scripts
    public function scripts(){
        if ( is_singular( $this->post_type ) && get_the_ID() && DT_Posts::can_view( $this->post_type, get_the_ID() ) ){
            $test = '';
            // @todo add enqueue scripts
        }
    }
}
Zume_Plans_Post_Type::instance();

