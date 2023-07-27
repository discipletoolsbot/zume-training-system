<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Training_Messages_Post_Type
{
    public $post_type;
    public $singular;
    public $plural;
    public $args;
    public $taxonomies;
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Disciple_Tools_Prayer_Post_Type constructor.
     *
     * @param array $args
     * @param array $taxonomies
     */
    public function __construct( $args = [], $taxonomies = [] ) {
        $this->post_type = 'zume_messages';
        $this->singular = 'Zume Message';
        $this->plural = 'Zume Messages';
        $this->root = 'zume_app';
        $this->type = 'messages';
        $this->meta_key = 'zume_app_messages_magic_key';
        $this->args = $args;
        $this->taxonomies = $taxonomies;

        add_action( 'init', [ $this, 'register_post_type' ] );
        add_filter( 'post_type_link', array( $this, 'remove_slug' ), 10, 3 );
        add_action( 'add_meta_boxes', [ $this, 'add_metabox' ] );
        add_action( 'save_post', [ $this, 'zume_messages_save' ] );

        if ( is_admin() && isset( $_GET['post_type'] ) && $this->post_type === $_GET['post_type'] ){

            add_filter( 'manage_'.$this->post_type.'_posts_columns', [ $this, 'set_custom_edit_columns' ] );
            add_action( 'manage_'.$this->post_type.'_posts_custom_column', [ $this, 'custom_column' ], 10, 2 );
        }

    }
    public function remove_slug( $permalink, $post, $leavename ){
        global $wp_post_types;
        foreach ( $wp_post_types as $type => $custom_post ){
            if ( $custom_post->_builtin == false && $type == $post->post_type ){
                $custom_post->rewrite['slug'] = $custom_post->rewrite !== false ? trim( $custom_post->rewrite['slug'], '/' ) : '';
                $permalink = str_replace( '/' . $custom_post->rewrite['slug'] . '/', '/', $permalink );
            }
        }
        return $permalink;
    }
    public function add_metabox( $post_type ) {
        if ( $this->post_type === $post_type ) {
            add_meta_box( 'replacement-content-box', 'Replacement Fields', [ $this, 'metabox_replacement' ], $this->post_type, 'normal', 'high' );
            add_meta_box( 'email-content-box', 'Email Content', [ $this, 'metabox_messages' ], $this->post_type, 'normal', 'high' );
            add_meta_box( 'sms-content-box', 'SMS Content', [ $this, 'metabox_sms' ], $this->post_type, 'normal', 'high' );
            add_meta_box( 'message-hierarchy-box', 'Schedule Order', [ $this, 'metabox_message_hierarchy' ], $this->post_type, 'side', 'high' );
        }
    }

    public function metabox_replacement( $post ) {
        ?>
       [first_name] - First Name<br>
       [communication_preference_magic_link] - Communication Preferences Magic Link<br>
        <?php
    }

    public function metabox_message_hierarchy( $post ) {
        $hierarchy = $this->get_message_hierarchy( $post->ID );
        if ( ! empty( $hierarchy['parents']) ) {
            foreach( $hierarchy['parents'] as $parent ) {
                ?>
                <a href="<?php echo admin_url() . 'post.php?post=' . $parent['ID'] . '&action=edit' ?>"><?php echo $parent['post_title'] ?></a><br>
                <?php
            }
        }
        echo '<hr><strong>(This Message) '.$post->post_title.'</strong><br><hr>';
        if ( ! empty( $hierarchy['children']) ) {
            foreach( $hierarchy['children'] as $children ) {
                ?>
                <a href="<?php echo admin_url() . 'post.php?post=' . $children['ID'] . '&action=edit' ?>"><?php echo $children['post_title'] ?></a><br>
                <?php
            }
        }
        ?>
        <br>
        <?php
    }

    public function get_message_hierarchy( $post_id ) {
        global $wpdb;
        $list = $wpdb->get_results(
            "SELECT ID, post_parent, post_title
                    FROM $wpdb->posts
                    WHERE post_type = 'zume_messages'", ARRAY_A );

        $children = $this->get_message_children( $post_id, $list, [], $post_id );
        $parents = array_reverse( $this->get_message_parent( $post_id, $list, [], $post_id ), true);
        return [
            'parents' => $parents,
            'children' => $children
        ];
    }

    public function get_message_parent( $post_id, $list, $parents, $self_post_id  ) {
        foreach( $list as $item ) {
            if ( $item['ID'] == $post_id ) {
                if ( $self_post_id !== $post_id ) {
                    $parents[$post_id] = $item;
                }
                if( $item['post_parent'] != '0' ) {
                    $parents = $this->get_message_parent( $item['post_parent'], $list, $parents, $self_post_id );
                }
            }
        }
        return $parents;
    }
    public function get_message_children( $post_id, $list, $children, $self_post_id  ) {
        foreach( $list as $item ) {
            if ( $item['post_parent'] == $post_id ) {
                $children[$post_id] = $item;
                $children = $this->get_message_children( $item['ID'], $list, $children, $self_post_id );
            }
        }
        return $children;
    }

    public function metabox_messages( $post ) {
        wp_nonce_field( 'zume_message_nonce'.get_current_user_id(), 'zume_message_nonce' );
        $values = get_post_custom( $post->ID );
        ?>
        <h3>Subject Line</h3>
        <input name="zume_email_subject" type="text"  style="width:100%;" value="<?php echo esc_html( isset( $values['zume_email_subject'] ) ? $values['zume_email_subject'][0] : '' ) ?>" /><br><br>
        <hr>

        <h3>Body</h3>
        <?php
            $content = isset( $values['zume_email_body'] ) ? $values['zume_email_body'][0] : '';
            wp_editor( $content, 'zume_email_body', array( 'media_buttons' => true ) );
        ?>

        <h3>Footer</h3>
        <select name="zume_email_footer">
            <option value="default">Default Footer</option>
            <option value="none">No Footer</option>
        </select><br><br>
        <?php
    }

    public function metabox_sms( $post ) {
        wp_nonce_field( 'zume_message_nonce'.get_current_user_id(), 'zume_message_nonce' );
        $values = get_post_custom( $post->ID );
        ?>
        <h3>SMS Message</h3>
        <input name="zume_piece_h1" type="text" id="zume_sms_body" style="width:100%;"  value="<?php echo esc_html( isset( $values['zume_sms_body'] ) ? $values['zume_sms_body'][0] : '' ) ?>" /><br><br>
        <?php
    }

    public function zume_messages_save( $post_id ) {

        // Bail if we're doing an auto save
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return;
        }

        // if our nonce isn't there, or we can't verify it, bail
        if ( ! isset( $_POST['zume_message_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['zume_message_nonce'] ) ), 'zume_message_nonce'.get_current_user_id() ) ) { return;
        }

        // if our current user can't edit this post, bail
        if ( !current_user_can( 'edit_posts' ) ) { return;
        }

        if ( isset( $_POST['zume_email_subject'] ) ) {
            update_post_meta( $post_id, 'zume_email_subject', sanitize_text_field( wp_unslash( $_POST['zume_email_subject'] ) ) );
        }
        if ( isset( $_POST['zume_email_body'] ) ) {
            $my_data = wp_kses_post( wp_unslash( $_POST['zume_email_body'] ) );
            update_post_meta( $post_id, 'zume_email_body', $my_data );
        }
        if ( isset( $_POST['zume_email_footer'] ) ) {
            update_post_meta( $post_id, 'zume_email_footer', sanitize_text_field( wp_unslash( $_POST['zume_email_footer'] ) ) );
        }
        if ( isset( $_POST['zume_sms_body'] ) ) {
            update_post_meta( $post_id, 'zume_sms_body', sanitize_text_field( wp_unslash( $_POST['zume_sms_body'] ) ) );
        }
    }


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
    }

    // Add the custom columns to the book post type:
    public function transition_post( $new_status, $old_status, $post ) {
        if ( 'publish' == $new_status && $post->post_type == 'zume_messages' ) {

//            $post_id = $post->ID;
//            $slug = trim( strtolower( $post->post_title ) );
//            $slug = str_replace( ' ', '-', $slug );
//            $slug = str_replace( '"', '', $slug );
//            $slug = str_replace( '&', '', $slug );
//            $slug = str_replace( "'", '', $slug );
//            $slug = str_replace( ',', '', $slug );
//            $slug = str_replace( ':', '', $slug );
//            $slug = str_replace( ';', '', $slug );
//            $slug = str_replace( '.', '', $slug );
//            $slug = str_replace( '/', '', $slug );
//            $slug = urlencode( $slug );
//
//            $current_public_key = get_post_meta( $post_id, $this->meta_key, true );
//            if ( $slug !== $current_public_key ) {
//                update_post_meta( $post_id, $this->meta_key, $slug );
//                global $wpdb;
//                $wpdb->query( $wpdb->prepare( "UPDATE $wpdb->posts SET guid = %s WHERE ID = %s;", trailingslashit( site_url() ) . $this->root . '/' . $this->type . '/' . $slug, $post_id ) );
//            }
        }
    }

    // Add the custom columns to the book post type:
    public function set_custom_edit_columns( $columns ) {
        unset( $columns['author'] );
//        $columns['url'] = 'URL';

        return $columns;
    }

    // Add the data to the custom columns for the book post type:
    public function custom_column( $column, $post_id ) {
        switch ( $column ) {
            case 'url' :
//                $public_key = get_post_meta( $post_id, $this->meta_key, true );
//                echo '<a href="' . esc_url( trailingslashit( site_url() ) ) . esc_attr( $this->root ) . '/' . esc_attr( $this->type ) . '/' . esc_attr( $public_key ) . '">'. esc_url( trailingslashit( site_url() ) ) . esc_attr( $this->root ) . '/' . esc_attr( $this->type ) . '/' . esc_attr( $public_key ) .'</a>';
                break;
        }
    }
} // End Class
Zume_Training_Messages_Post_Type::instance();
