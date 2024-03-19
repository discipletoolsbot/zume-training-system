<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly.

function zume_get_message_list() {
    return Zume_Training_Messages_Post_Type::instance()->get_messages();
}

/**
 * Zume_PDF_Download_Post_Type Post Type Class
 * All functionality pertaining to project update post types in Zume_PDF_Download_Post_Type.
 *
 * @package  Disciple_Tools
 * @since    0.1.0
 */
class Zume_Training_Messages_Post_Type
{
    /**
     * The post type token.
     *
     * @access public
     * @since  0.1.0
     * @var    string
     */
    public $post_type;

    /**
     * The post type singular label.
     *
     * @access public
     * @since  0.1.0
     * @var    string
     */
    public $singular;

    /**
     * The post type plural label.
     *
     * @access public
     * @since  0.1.0
     * @var    string
     */
    public $plural;

    /**
     * The post type args.
     *
     * @access public
     * @since  0.1.0
     * @var    array
     */
    public $args;

    /**
     * The taxonomies for this post type.
     *
     * @access public
     * @since  0.1.0
     * @var    array
     */
    public $taxonomies;

    /**
     * Zume_PDF_Download_Post_Type The single instance of Zume_PDF_Download_Post_Type.
     * @var     object
     * @access  private
     * @since   0.1
     */
    private static $_instance = null;

    /**
     * Main Zume_PDF_Download_Post_Type Instance
     *
     * Ensures only one instance of Zume_PDF_Download_Post_Type is loaded or can be loaded.
     *
     * @since 0.1
     * @static
     * @return Zume_PDF_Download_Post_Type instance
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    /**
     * Disciple_Tools_Prayer_Post_Type constructor.
     *
     * @param string $post_type
     * @param string $singular
     * @param string $plural
     * @param array  $args
     * @param array  $taxonomies
     */
    public function __construct( $post_type = 'zume_messages', $singular = 'Zume Message', $plural = 'Zume Messages', $args = array(), $taxonomies = array() ) {
        $this->post_type = $post_type;
        $this->singular = $singular;
        $this->plural = $plural;
        $this->args = $args;
        $this->taxonomies = $taxonomies;

        add_action( 'init', array( $this, 'register_post_type' ) );

        if ( is_admin() ) {
            global $pagenow;

            add_action( 'admin_menu', array( $this, 'meta_box_setup' ), 20 );
            add_action( 'save_post', array( $this, 'meta_box_save' ) );
            add_filter( 'enter_title_here', array( $this, 'enter_title_here' ) );
            add_filter( 'post_updated_messages', array( $this, 'updated_messages' ) );

            if ( $pagenow == 'edit.php' && isset( $_GET['post_type'] ) ) {
                $pt = sanitize_text_field( wp_unslash( $_GET['post_type'] ) );
                if ( $pt === $this->post_type ) {
                    add_filter( 'manage_edit-' . $this->post_type . '_columns', array( $this, 'register_custom_column_headings' ), 10, 1 );
                    add_action( 'manage_' . $this->post_type . '_posts_custom_column', array( $this, 'register_custom_columns' ), 10, 2 );
                }
            }
        }
    } // End __construct()

    /**
     * Register the post type.
     *
     * @access public
     * @return void
     */
    public function register_post_type() {
        register_post_type($this->post_type, /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
            // let's now add all the options for this post type
            args: array(
                'labels' => array(
                    'name' => $this->plural, /* This is the Title of the Group */
                    'singular_name' => $this->singular, /* This is the individual type */
                    'all_items' => 'All '.$this->plural, /* the all items menu item */
                    'add_new' => 'Add New', /* The add new menu item */
                    'add_new_item' => 'Add New '.$this->singular, /* Add New Display Title */
                    'edit' => 'Edit', /* Edit Dialog */
                    'edit_item' => 'Edit '.$this->singular, /* Edit Display Title */
                    'new_item' => 'New '.$this->singular, /* New Display Title */
                    'view_item' => 'View '.$this->singular, /* View Display Title */
                    'search_items' => 'Search '.$this->plural, /* Search Custom Type Title */
                    'not_found' => 'Nothing found in the Database.', /* This displays if there are no entries yet */
                    'not_found_in_trash' => 'Nothing found in Trash', /* This displays if there is nothing in the trash */
                    'parent_item_colon' => ''
                ), /* end of arrays */
                'description' => $this->singular, /* Custom Type Description */
                'public' => true,
                'publicly_queryable' => false,
                'exclude_from_search' => false,
                'show_ui' => true,
                'query_var' => false,
                'show_in_nav_menus' => true,
                'menu_position' => 10, /* this is what order you want it to appear in on the left hand side menu */
                'menu_icon' => 'dashicons-editor-customchar', /* the icon for the custom post type menu. uses built-in dashicons (CSS class name) */
                'rewrite' => [ 'slug' => 'concept', 'with_front' => false ], /* you can specify its url slug */
                'has_archive' => false, /* you can rename the slug here */
                'capabilities' => [
                    'create_posts'        => 'create_'.$this->post_type,
                    'edit_post'           => 'edit_'.$this->post_type, // needed for bulk edit
                    'read_post'           => 'read_'.$this->post_type,
                    'delete_post'         => 'delete_'.$this->post_type, // delete individual post
                    'delete_others_posts' => 'delete_others_'.$this->post_type.'s',
                    'delete_posts'        => 'delete_'.$this->post_type.'s', // bulk delete posts
                    'edit_posts'          => 'edit'.$this->post_type.'s', //menu link in WP Admin
                    'edit_others_posts'   => 'edit_others_'.$this->post_type.'s',
                    'publish_posts'       => 'publish_'.$this->post_type.'s',
                    'read_private_posts'  => 'read_private_'.$this->post_type.'s',
                ],
                'capability_type' => 'page',
                'hierarchical' => true,
                'show_in_rest' => true,
                'supports' => array( 'title',  'page-attributes',  'wp-block-styles' , 'align-wide', )
            )
        );
    } // End register_post_type()


    /**
     * Add custom columns for the "manage" screen of this post type.
     *
     * @access public
     *
     * @param  string $column_name
     *
     * @since  0.1.0
     * @return void
     */
    public function register_custom_columns( $column_name, $post_id ) {
        switch ( $column_name ) {
            case 'delay':
                $days = get_post_meta( $post_id, 'delay', true );
                if ( $days ) {
                    echo $days;
                } else {
                    echo '0';
                }
                break;
            case 'logic':
                echo get_post_meta( $post_id, 'logic', true );
                break;

            default:
                break;
        }
    }

    /**
     * Add custom column headings for the "manage" screen of this post type.
     *
     * @access public
     *
     * @param  array $defaults
     *
     * @since  0.1.0
     * @return mixed/void
     */
    public function register_custom_column_headings( $defaults ) {

        $new_columns = array( 'delay' => 'delay', 'logic' => 'logic' );

        $last_item = array();

        if ( count( $defaults ) > 2 ) {
            $last_item = array_slice( $defaults, -1 );

            array_pop( $defaults );
        }
        $defaults = array_merge( $defaults, $new_columns );

        if ( is_array( $last_item ) && 0 < count( $last_item ) ) {
            foreach ( $last_item as $k => $v ) {
                $defaults[ $k ] = $v;
                break;
            }
        }

        return $defaults;
    } // End register_custom_column_headings()

    /**
     * Update messages for the post type admin.
     *
     * @since  0.1.0
     *
     * @param  array $messages Array of messages for all post types.
     *
     * @return array           Modified array.
     */
    public function updated_messages( $messages ) {
        global $post;

        $messages[ $this->post_type ] = array(
            0  => '', // Unused. Messages start at index 1.
            1  => sprintf(
                '%3$s updated. %1$sView %4$s%2$s',
                '<a href="' . esc_url( get_permalink( $post->ID ) ) . '">',
                '</a>',
                $this->singular,
                strtolower( $this->singular )
            ),
            2  => $this->singular.' updated.',
            3  => $this->singular.' deleted.',
            4  => sprintf( '%s updated.', $this->singular ),
            /* translators: %s: date and time of the revision */
            5  => isset( $_GET['revision'] ) ? sprintf( '%1$s restored to revision from %2$s', $this->singular, wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
            6  => sprintf( '%1$s published. %3$sView %2$s%4$s', $this->singular, strtolower( $this->singular ), '<a href="' . esc_url( get_permalink( $post->ID ) ) . '">', '</a>' ),
            7  => sprintf( '%s saved.', $this->singular ),
            8  => sprintf( '%1$s submitted. %2$sPreview %3$s%4$s', $this->singular, strtolower( $this->singular ), '<a target="_blank" href="' . esc_url( add_query_arg( 'preview', 'true', get_permalink( $post->ID ) ) ) . '">', '</a>' ),
            9  => sprintf(
                '%1$s scheduled for: %2$s. %3$sPreview %4$s',
                strtolower( $this->singular ),
                // translators: Publish box date format, see http://php.net/date
                '<strong>' . date_i18n( 'M j, Y @ G:i',
                    strtotime( $post->post_date ) ) . '</strong>',
                '<a target="_blank" href="' . esc_url( get_permalink( $post->ID ) ) . '">',
                '</a>'
            ),
            10 => sprintf( '%1$s draft updated. %2$sPreview %3$s%4$s', $this->singular, strtolower( $this->singular ), '<a target="_blank" href="' . esc_url( add_query_arg( 'preview', 'true', get_permalink( $post->ID ) ) ) . '">', '</a>' ),
        );

        return $messages;
    } // End updated_messages()

    /**
     * Setup the meta box.
     *
     * @access public
     * @since  0.1.0
     * @return void
     */
    public function meta_box_setup() {
        add_meta_box( $this->post_type . '_scribes', 'Messages', array( $this, 'metabox_messages' ), $this->post_type, 'normal', 'high' );
        add_meta_box( $this->post_type . '_schedule', 'Schedule Order', [ $this, 'metabox_message_hierarchy' ], $this->post_type, 'side', 'high' );
        add_meta_box( $this->post_type . '_delay', 'Delay', [ $this, 'metabox_delay' ], $this->post_type, 'side', 'high' );
        add_meta_box( $this->post_type . '_logic', 'Marketing Logic', [ $this, 'metabox_action' ], $this->post_type, 'side', 'high' );
    } // End meta_box_setup()

    /**
     * Meta box for Status Information
     *
     * @access public
     * @since  0.1.0
     */
    public function metabox_messages() {
        $this->meta_box_content( 'messages' ); // prints
    }
    public function metabox_message_hierarchy( $post ) {
        $hierarchy = $this->get_message_hierarchy( $post->ID );
        if ( ! empty( $hierarchy['parents'] ) ) {
            foreach ( $hierarchy['parents'] as $parent ) {
                ?>
                <a href="<?php echo esc_url( admin_url() . 'post.php?post=' . $parent['ID'] . '&action=edit' ) ?>"><?php echo esc_html( $parent['post_title'] ) ?></a><br>
                <?php
            }
        }
        echo '<hr><strong>(This Message) ' . esc_html( $post->post_title ) . '</strong><br><hr>';
        if ( ! empty( $hierarchy['children'] ) ) {
            foreach ( $hierarchy['children'] as $children ) {
                ?>
                <a href="<?php echo esc_url( admin_url() . 'post.php?post=' . $children['ID'] . '&action=edit' ) ?>"><?php echo esc_html( $children['post_title'] ) ?></a><br>
                <?php
            }
        }
        ?>
        <br>
        <?php
    }

    public function get_message_hierarchy( $post_id ) {
        global $wpdb, $table_prefix;
        $list = $wpdb->get_results(
            "SELECT ID, post_parent, post_title
                    FROM {$table_prefix}posts
                    WHERE post_type = 'zume_messages'", ARRAY_A );

        $children = $this->get_message_children( $post_id, $list, [], $post_id );

        $parents = array_reverse( $this->get_message_parent( $post_id, $list, [], $post_id ), true);

        return [
            'parents' => $parents,
            'children' => $children
        ];
    }

    public function get_message_parent( $post_id, $list, $parents, $self_post_id ) {
        foreach ( $list as $item ) {
            if ( $item['ID'] == $post_id ) {
                if ( $self_post_id !== $post_id ) {
                    $parents[$post_id] = $item;
                }
                if ( $item['post_parent'] != '0' ) {
                    $parents = $this->get_message_parent( $item['post_parent'], $list, $parents, $self_post_id );
                }
            }
        }
        return $parents;
    }
    public function get_message_children( $post_id, $list, $children, $self_post_id ) {
        foreach ( $list as $item ) {
            if ( $item['post_parent'] == $post_id ) {
                $children[$post_id] = $item;
                $children = $this->get_message_children( $item['ID'], $list, $children, $self_post_id );
            }
        }
        return $children;
    }

    public function metabox_delay( $post ) {
        $fields = get_post_custom( $post->ID );
        $delay = isset( $fields['delay'] ) ? $fields['delay'][0] : 0;
        ?>
        <select name="delay" id="delay">
            <option value="0" <?php selected( $delay, 0 ) ?>>No Delay</option>
            <option value="1" <?php selected( $delay, 1 ) ?>>1 Day</option>
            <option value="2" <?php selected( $delay, 2 ) ?>>2 Days</option>
            <option value="3" <?php selected( $delay, 3 ) ?>>3 Days</option>
            <option value="4" <?php selected( $delay, 4 ) ?>>4 Days</option>
            <option value="5" <?php selected( $delay, 5 ) ?>>5 Days</option>
            <option value="6" <?php selected( $delay, 6 ) ?>>6 Days</option>
            <option value="7" <?php selected( $delay, 7 ) ?>>1 Week</option>
            <option value="14" <?php selected( $delay, 14 ) ?>>2 Weeks</option>
            <option value="21" <?php selected( $delay, 21 ) ?>>3 Weeks</option>
            <option value="28" <?php selected( $delay, 28 ) ?>>4 Weeks</option>
        </select>
        <?php
    }

    public function metabox_action( $post ) {
        $fields = get_post_custom( $post->ID );
            ?>
            <strong><label for="logic">Marketing Logic</label></strong><br>
            <textarea name="logic" id="logic" style="width:100%;height:200px;"><?php echo isset($fields['logic'][0]) ? esc_textarea( $fields['logic'][0] ) : ''  ?></textarea>
            <?php
        if ( isset( $fields['action'] ) ) {
            ?>
            <strong><label for="action">Action</label></strong><br>
            <input type="text" name="action" id="action" value="<?php echo isset($fields['action'][0]) ? esc_attr( $fields['action'][0] ) : ''  ?>" />
            <?php
        }
    }

    /**
     * The contents of our meta box.
     *
     * @param string $section
     */
    public function meta_box_content( $section = 'scribe' ) {
        global $post_id;
        $fields = get_post_custom( $post_id );
        $field_data = $this->get_custom_fields_settings();

        echo '<input type="hidden" name="' . esc_attr( $this->post_type ) . '_noonce" id="' . esc_attr( $this->post_type ) . '_noonce" value="' . esc_attr( wp_create_nonce( 'video_noonce_action' ) ) . '" />';

        if ( 0 < count( $field_data ) ) {
            echo '<table class="form-table">' . "\n";
            echo '<tbody>' . "\n";

            foreach ( $field_data as $k => $v ) {

                if ( $v['section'] == $section ) {

                    $data = $v['default'];
                    if ( isset( $fields[ $k ] ) && isset( $fields[ $k ][0] ) ) {
                        $data = $fields[ $k ][0];
                    }

                    $type = $v['type'];

                    switch ( $type ) {

                        case 'url':
                            echo '<tr valign="top"><th scope="row"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></th><td><input name="' . esc_attr( $k ) . '" type="text" id="' . esc_attr( $k ) . '" class="regular-text" value="' . esc_attr( $data ) . '" />' . "\n";
                            echo '<p class="description">' . esc_html( $v['description'] ) . '</p>' . "\n";
                            echo '</td><tr/>' . "\n";
                            break;
                        case 'text':
                            echo '<tr valign="top"><td style="padding:2px;"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></td>
                                <td style="padding:2px;"><input name="' . esc_attr( $k ) . '" type="text" id="' . esc_attr( $k ) . '" class="regular-text" style="width:100%;" value="' . esc_attr( $data ) . '" /></td></tr>';
                            break;
                        case 'textarea':
                            echo '<tr valign="top"><td style="padding:2px;vertical-align: top;"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></td>
                                <td style="padding:2px;"><textarea name="' . esc_attr( $k ) . '" type="text" id="' . esc_attr( $k ) . '" class="regular-text" style="width:100%;height:150px;" />' .  $data  . '</textarea>';
                            echo '</td></tr>' . "\n";
                            break;
                        case 'link':
                            echo '<tr valign="top"><th scope="row"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></th>
                                <td><input name="' . esc_attr( $k ) . '" type="text" id="' . esc_attr( $k ) . '" class="regular-text" value="' . esc_attr( $data ) . '" />' . "\n";
                            echo '<a href="'. esc_url( zume_mirror_url() ) .esc_attr( get_the_title( $post_id ) ).'/'.esc_attr( $data ).'" target="_blank">Check Link</a>';
                            echo '</td></tr>' . "\n";
                            break;
                        case 'begin':
                            echo '<tr valign="top"><th scope="row"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></th></tr>';
                            break;
                        case 'hr_end':
                            echo '<tr valign="top"><td colspan="2"><hr></td></tr>';
                            break;
                        case 'select':
                            echo '<tr valign="top"><td style="padding:2px;vertical-align: top;" >
                                <label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></td>
                                <td style="padding:2px;">
                                <select name="' . esc_attr( $k ) . '" id="' . esc_attr( $k ) . '" class="regular-text">';
                            // Iterate the options
                            foreach ( $v['default'] as $vv ) {
                                echo '<option value="' . esc_attr( $vv ) . '" ';
                                if ( $vv == $data ) {
                                    echo 'selected';
                                }
                                echo '>' . esc_html( $vv ) . '</option>';
                            }
                            echo '</select>' . "\n";
                            echo '</td><tr/>' . "\n";
                            break;

                        default:
                            break;
                    }
                }
            }
            echo '</tbody>' . "\n";
            echo '</table>' . "\n";
        }
    } // End meta_box_content()

    /**
     * Save meta box fields.
     *
     * @access public
     * @since  0.1.0
     *
     * @param  int $post_id
     *
     * @return int $post_id
     */
    public function meta_box_save( $post_id ) {
        dt_write_log( $_POST );

        // Bail if we're doing an auto save
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return;
        }

        // Verify
        if ( get_post_type() != $this->post_type ) {
            return $post_id;
        }

        $key = $this->post_type . '_noonce';
        if ( isset( $_POST[ $key ] ) && !wp_verify_nonce( sanitize_key( $_POST[ $key ] ), 'video_noonce_action' ) ) {
            return $post_id;
        }

        if ( isset( $_POST['post_type'] ) && 'page' == sanitize_text_field( wp_unslash( $_POST['post_type'] ) ) ) {
            if ( !current_user_can( 'edit_page', $post_id ) ) {
                return $post_id;
            }
        } else {
            if ( !current_user_can( 'edit_post', $post_id ) ) {
                return $post_id;
            }
        }

        if ( isset( $_GET['action'] ) ) {
            if ( $_GET['action'] == 'trash' || $_GET['action'] == 'untrash' || $_GET['action'] == 'delete' ) {
                return $post_id;
            }
        }

        $field_data = $this->get_custom_fields_settings();
        $fields = array_keys( $field_data );

        foreach ( $fields as $f ) {
            if ( !isset( $_POST[ $f ] ) ) {
                continue;
            }

            ${$f} = strip_tags( trim( sanitize_text_field( wp_unslash( $_POST[ $f ] ) ) ) );

            // Escape the URLs.
            if ( 'url' == $field_data[ $f ]['type'] ) {
                ${$f} = esc_url( ${$f} );
            }

            if ( 'textarea' == $field_data[ $f ]['type'] ) {
                update_post_meta( $post_id, $f, trim( sanitize_textarea_field( wp_unslash( $_POST[ $f ] ) ) ) );
            } elseif ( get_post_meta( $post_id, $f ) == '' ) {
                add_post_meta( $post_id, $f, ${$f}, true );
            } elseif ( ${$f} != get_post_meta( $post_id, $f, true ) ) {
                update_post_meta( $post_id, $f, ${$f} );
            } elseif ( ${$f} == '' ) {
                delete_post_meta( $post_id, $f, get_post_meta( $post_id, $f, true ) );
            }
        }
        return $post_id;
    } // End meta_box_save()



    /**
     * Customise the "Enter title here" text.
     *
     * @access public
     * @since  0.1.0
     *
     * @param  string $title
     *
     * @return string
     */
    public function enter_title_here( $title ) {
        if ( get_post_type() == $this->post_type ) {
            $title = 'Enter the title here';
        }

        return $title;
    } // End enter_title_here()

    /**
     * Get the settings for the custom fields.
     *
     * @access public
     * @since  0.1.0
     * @return array
     */
    public function get_custom_fields_settings() {
        $fields = array();

        $languages = zume_languages();
        foreach( $languages as $language ) {
            $fields['begin_'.$language['code']] = array(
                'name'        => strtoupper( $language['name'] ),
                'default'     => '',
                'type'        => 'begin',
                'section'     => 'messages',
            );
            $fields['subject_'.$language['code']] = array(
                'name'        => 'Subject',
                'default'     => '',
                'type'        => 'text',
                'section'     => 'messages',
            );
            $fields['body_' . $language['code']] = array(
                'name'        => 'Body',
                'default'     => '',
                'type'        => 'textarea',
                'section'     => 'messages',
            );
            $fields['footer_' . $language['code']] = array(
                'name'        => 'Footer',
                'default'     => [
                    '',
                    'Link',
                    'Link2',
                    'Link3',
                ],
                'type'        => 'select',
                'section'     => 'messages',
            );
            $fields['end_' . $language['code']] = array(
                'name'        => 'End',
                'default'     => '',
                'type'        => 'hr_end',
                'section'     => 'messages',
            );
        }

        $fields['delay'] = array(
            'name'        => 'Delay',
            'default'     => '',
            'type'        => 'delay',
            'section'     => 'action',
        );
        $fields['logic'] = array(
            'name'        => 'Logic',
            'default'     => '',
            'type'        => 'textarea',
            'section'     => 'action',
        );

        return apply_filters( 'zume_messages_fields_settings', $fields );
    } // End get_custom_fields_settings()

    /**
     * Run on activation.
     *
     * @access public
     * @since  0.1.0
     */
    public function activation() {
        $this->flush_rewrite_rules();
    } // End activation()

    /**
     * Flush the rewrite rules
     *
     * @access public
     * @since  0.1.0
     */
    private function flush_rewrite_rules() {
        $this->register_post_type();
        flush_rewrite_rules();
    } // End flush_rewrite_rules()

} // End Class
Zume_Training_Messages_Post_Type::instance();
