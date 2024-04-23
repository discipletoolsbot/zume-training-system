<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Training_Pieces_Post_Type
{

    public $post_type;
    public $singular;
    public $plural;
    public $root;
    public $type;
    public $meta_key;
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
        $this->post_type = 'zume_pieces';
        $this->singular = 'Zume Pieces';
        $this->plural = 'Zume Pieces';
        $this->root = 'zume_app';
        $this->type = 'pieces';
        $this->meta_key = 'zume_app_pieces_magic_key';
        $this->args = $args;
        $this->taxonomies = $taxonomies;

        add_action( 'init', [ $this, 'register_post_type' ] );
        add_filter( 'post_type_link', array( $this, 'remove_slug' ), 10, 3 );
        add_action( 'add_meta_boxes', [ $this, 'add_metabox' ] );
        add_action( 'save_post', [ $this, 'zume_pieces_save' ] );

        if ( is_admin() ) {
            global $pagenow;
            if ( $pagenow == 'edit.php' && isset( $_GET['post_type'] ) ) {
                $pt = sanitize_text_field( wp_unslash( $_GET['post_type'] ) );
                if ( $pt === $this->post_type ) {
                    // manage colunms
                    add_filter( 'manage_'.$this->post_type.'_posts_columns', [ $this, 'manage_columns' ] );

                    // make columns sortable
                    add_filter( 'manage_edit-'.$this->post_type.'_sortable_columns', [ $this, 'set_sortable_columns' ] );

                    // populate column cells
                    add_action( 'manage_'.$this->post_type.'_posts_custom_column', [ $this, 'register_custom_columns' ], 10, 2 );

                    // set query to sort
                    add_action( 'pre_get_posts', [ $this, 'sort_custom_column_query' ] );

                    add_filter( 'query_vars', [ $this, 'custom_query_vars_filter' ] );

                }
            }
        }

    }
    public function remove_slug( $permalink, $post, $leavename ) {
        global $wp_post_types;
        foreach ( $wp_post_types as $type => $custom_post ){
            if ( $custom_post->_builtin == false && $type == $post->post_type ){
                if ( ! $custom_post->rewrite ) {
                    $custom_post->rewrite = array();
                }
                $custom_post->rewrite['slug'] = ! empty( $custom_post->rewrite['slug'] ) ? trailingslashit( $custom_post->rewrite['slug'] ) : '';
                $permalink = str_replace( '/' . $custom_post->rewrite['slug'] . '/', '/', $permalink );
            }
        }
        return $permalink;
    }
    public function add_metabox( $post_type ) {
        if ( $this->post_type === $post_type ) {
            add_meta_box( 'pieces-content-box', 'Pieces Content', [ $this, 'metabox_pieces' ], $this->post_type, 'normal', 'high' );
        }
    }

    public function metabox_pieces( $post ) {
        wp_nonce_field( 'zume_piece_nonce'.get_current_user_id(), 'zume_piece_nonce' );

        $values = get_post_custom( $post->ID );

        $number = isset( $values['zume_piece'] ) ? $values['zume_piece'][0] : 0;

        $training_items = zume_training_items();

        ?>
        <h3>Pieces Page</h3>
        <select name="zume_piece">
            <option></option>
            <?php
            foreach( $training_items as $item ) {
                $selected = false;
                if ( $item['key'] == $number ) {
                    $selected = true;
                }
                ?>
                <option value="<?php echo esc_attr( $item['key'] ) ?>" <?php echo ( $selected ) ? 'selected' : ''; ?> ><?php echo esc_html( $item['key'] ) . ' - '; echo esc_html( $item['title'] ) ?></option>
                <?php
            }

            ?></select><br>

        <h3>Language</h3>
        <select name="zume_lang">
            <option></option>
            <?php
            global $zume_languages_full_list;
            $zume_languages = $zume_languages_full_list;
            foreach( $zume_languages as $languages ) {
                $selected = false;
                if ( isset( $values['zume_lang'][0] ) && $languages['code'] == $values['zume_lang'][0] ) {
                    $selected = true;
                }
                ?>
                <option value="<?php echo esc_attr( $languages['code'] ) ?>" <?php echo ( $selected ) ? 'selected' : ''; ?> ><?php echo esc_html( $languages['name'] ) ?> (<?php echo $languages['code'] ?>)</option>
                <?php
            }
            ?>
        </select><br>

        <h3>Piece Title (override) for the &lt;h1&gt;</h3>
        <input name="zume_piece_h1" class="regular-text" id="zume_piece_h1" value="<?php echo esc_html( isset( $values['zume_piece_h1'] ) ? $values['zume_piece_h1'][0] : '' ) ?>" /><br><br>
        <hr>

        <h3>Pre-Video Content</h3>
        <?php
        $content = isset( $values['zume_pre_video_content'] ) ? $values['zume_pre_video_content'][0] : '';
        wp_editor( $content, 'zume_pre_video_content', array( 'media_buttons' => true ) );

        ?>
        <h3>Post-Video Content</h3>
        <?php
        $content = isset( $values['zume_post_video_content'] ) ? $values['zume_post_video_content'][0] : '';
        wp_editor( $content, 'zume_post_video_content', array( 'media_buttons' => true ) );

        ?>
        <h3>"Ask Yourself" Content</h3>
        <?php
        $content = isset( $values['zume_ask_content'] ) ? $values['zume_ask_content'][0] : '';
        wp_editor( $content, 'zume_ask_content', array( 'media_buttons' => true ) );

        ?>
        <h3>SEO Meta Description</h3>
        <?php
        $content = isset( $values['zume_seo_meta_description'] ) ? $values['zume_seo_meta_description'][0] : '';
        wp_editor( $content, 'zume_seo_meta_description', array( 'media_buttons' => true ) );
    }


    public function zume_pieces_save( $post_id ) {

        $post = get_post( $post_id );

        // Bail if we're doing an auto save
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        if ( 'auto-draft' === $post->post_status ) {
            return;
        }

        // if our nonce isn't there, or we can't verify it, bail
        if ( ! isset( $_POST['zume_piece_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['zume_piece_nonce'] ) ), 'zume_piece_nonce'.get_current_user_id() ) ) {
            return;
        }

        // if our current user can't edit this post, bail
        if ( !current_user_can( 'edit_posts' ) ) {
            return;
        }

        if ( isset( $_POST['zume_piece'] ) ) {
            update_post_meta( $post_id, 'zume_piece', sanitize_text_field( wp_unslash( $_POST['zume_piece'] ) ) );
        }
        if ( isset( $_POST['zume_lang'] ) ) {
            update_post_meta( $post_id, 'zume_lang', sanitize_text_field( wp_unslash( $_POST['zume_lang'] ) ) );
        }
        if ( isset( $_POST['zume_piece_h1'] ) ) {
            update_post_meta( $post_id, 'zume_piece_h1', sanitize_text_field( wp_unslash( $_POST['zume_piece_h1'] ) ) );
        }
        if ( isset( $_POST['zume_pre_video_content'] ) ) {
            $my_data = wp_kses_post( wp_unslash( $_POST['zume_pre_video_content'] ) );
            update_post_meta( $post_id, 'zume_pre_video_content', $my_data );
        }
        if ( isset( $_POST['zume_post_video_content'] ) ) {
            $my_data = wp_kses_post( wp_unslash( $_POST['zume_post_video_content'] ) );
            update_post_meta( $post_id, 'zume_post_video_content', $my_data );
        }
        if ( isset( $_POST['zume_ask_content'] ) ) {
            $my_data = wp_kses_post( wp_unslash( $_POST['zume_ask_content'] ) );
            update_post_meta( $post_id, 'zume_ask_content', $my_data );
        }
        if ( isset( $_POST['zume_seo_meta_description'] ) ) {
            $my_data = wp_kses_post( wp_unslash( $_POST['zume_seo_meta_description'] ) );
            update_post_meta( $post_id, 'zume_seo_meta_description', $my_data );
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
            array(
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
                'rewrite' => false, /* you can specify its url slug */
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
                'hierarchical' => false,
                'show_in_rest' => true,
                'supports' => array( 'title',  'thumbnail',  'wp-block-styles' , 'align-wide', )
            )
        );
    }

    public function register_custom_column_headings( $defaults ) {

        $new_columns = array(  'zume_piece' => 'Piece', 'zume_lang' => 'Language' );

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
    }

    public function manage_columns( $columns )
    {
        // save date to the variable
        $date = $columns['date'];
        // unset the 'date' column
        unset( $columns['date'] );

        // add your column as new array element and give it table header text
        $columns['zume_piece'] = __('Piece');
        $columns['zume_lang'] = __('Language');

        $columns['date'] = $date; // set the 'date' column again, after the custom column

        return $columns;
    }

    public function sort_custom_column_query( $query )
    {
        if ( isset( $query->query_vars['zume_piece'] ) ) {
            $query->set( 'meta_key', 'zume_piece' );
            $query->set( 'meta_value', $query->query_vars['zume_piece'] );
        }

        if ( isset( $query->query_vars['zume_lang'] ) ) {
            $query->set( 'meta_key', 'zume_lang' );
            $query->set( 'meta_value', $query->query_vars['zume_lang'] );
        }
    }

    function set_sortable_columns( $columns )
    {
        $columns['zume_piece'] = 'Piece';
        $columns['zume_lang'] = 'Langugaes';
        return $columns;
    }

    public function register_custom_columns( $column_name, $post_id ) {
        switch ( $column_name ) {
            case 'zume_piece':
                $piece = get_post_meta( $post_id, 'zume_piece', true );
                echo $piece;
                break;
            case 'zume_lang':
                $piece = get_post_meta( $post_id, 'zume_lang', true );
                echo $piece;
                break;

            default:
                break;
        }
    }

    public function custom_query_vars_filter( $vars ) {
        $vars[] .= 'zume_piece';
        $vars[] .= 'zume_lang';
        return $vars;
    }

} // End Class
Zume_Training_Pieces_Post_Type::instance();
