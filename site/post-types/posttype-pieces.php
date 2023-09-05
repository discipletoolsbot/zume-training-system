<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Training_Pieces_Post_Type
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

        if ( is_admin() && isset( $_GET['post_type'] ) && $this->post_type === $_GET['post_type'] ){

            add_filter( 'manage_'.$this->post_type.'_posts_columns', [ $this, 'set_custom_edit_columns' ] );
            add_action( 'manage_'.$this->post_type.'_posts_custom_column', [ $this, 'custom_column' ], 10, 2 );
        }

    }
    public function remove_slug( $permalink, $post, $leavename ){
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
            add_meta_box( 'qrcode', esc_html__( 'QR Code', 'text-domain' ), [ $this, 'metabox_qr' ], $this->post_type, 'side', 'high' );
            add_meta_box( 'pieces-content-box', 'Pieces Content', [ $this, 'metabox_pieces' ], $this->post_type, 'normal', 'high' );
        }
    }
    public function metabox_qr( $post ) {
        $full_link = get_page_link( $post->ID );
        ?>
        <a href="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=<?php echo esc_url( $full_link ) ?>"><img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=<?php echo esc_url( $full_link ) ?>" title="<?php echo esc_url( $full_link ) ?>" alt="<?php echo esc_url( $full_link ) ?>" style="width:100%;"/></a>
        <br>Links to:
        <br><?php echo esc_url( $full_link );  ?>
        <br>
        <?php
    }

    public function metabox_pieces( $post ) {
        wp_nonce_field( 'zume_piece_nonce'.get_current_user_id(), 'zume_piece_nonce' );

        $values = get_post_custom( $post->ID );

        $number = isset( $values['zume_piece'] ) ? $values['zume_piece'][0] : 0;

        ?>
        <h3>Pieces Page</h3>
        <select name="zume_piece">
            <option></option>
            <?php
            for ( $x = 1; $x <= 32; $x++ ) {
                $selected = false;
                if ( $x == $number ) {
                    $selected = true;
                }
                $post_number = zume_landing_page_post_id( $x );
                ?>
                <option value="<?php echo esc_attr( $x ) ?>" <?php echo ( $selected ) ? 'selected' : ''; ?> ><?php echo esc_attr( $x ) . ' - '; echo esc_html( get_the_title( $post_number ) ) ?></option>
                <?php
            }
            ?></select><br>    <h3>Piece Title (override) for the &lt;h1&gt;</h3>
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
    }



    public function zume_pieces_save( $post_id ) {

        // Bail if we're doing an auto save
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return;
        }

        // if our nonce isn't there, or we can't verify it, bail
        if ( ! isset( $_POST['zume_piece_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['zume_piece_nonce'] ) ), 'zume_piece_nonce'.get_current_user_id() ) ) { return;
        }

        // if our current user can't edit this post, bail
        if ( !current_user_can( 'edit_posts' ) ) { return;
        }

        if ( isset( $_POST['zume_piece'] ) ) {
            update_post_meta( $post_id, 'zume_piece', sanitize_text_field( wp_unslash( $_POST['zume_piece'] ) ) );
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
                'hierarchical' => false,
                'show_in_rest' => true,
                'supports' => array( 'title',  'thumbnail',  'wp-block-styles' , 'align-wide', )
            )
        );
    }

    // Add the custom columns to the book post type:
    public function set_custom_edit_columns( $columns ) {
        unset( $columns['author'] );

        return $columns;
    }

    // Add the data to the custom columns for the book post type:
    public function custom_column( $column, $post_id ) {
        switch ( $column ) {
            default:
                break;
        }
    }
} // End Class
Zume_Training_Pieces_Post_Type::instance();
