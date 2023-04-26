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
        if (is_null( self::$_instance )) {
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
    public function __construct( $args = [], $taxonomies = []) {
        $this->post_type = 'zume_pieces';
        $this->singular = 'Zume Pieces' ;
        $this->plural = 'Zume Pieces' ;
        $this->root = 'zume_app';
        $this->type = 'pieces';
        $this->meta_key = 'zume_app_pieces_magic_key';
        $this->args = $args;
        $this->taxonomies = $taxonomies;

        add_action( 'init', [ $this, 'register_post_type' ] );
        add_action( 'add_meta_boxes', [ $this, 'add_metabox_qr' ]);
        add_filter( 'post_type_link', array( $this, 'remove_slug' ), 10, 3 );

        if ( is_admin() && isset( $_GET['post_type'] ) && $this->post_type === $_GET['post_type'] ){

            add_filter( 'manage_'.$this->post_type.'_posts_columns', [ $this, 'set_custom_edit_columns' ] );
            add_action( 'manage_'.$this->post_type.'_posts_custom_column', [ $this, 'custom_column' ], 10, 2 );
        }

    }

    public function add_metabox_qr( $post_type ) {
        if ( $this->post_type === $post_type ) {
            add_meta_box('qrcode', esc_html__('QR Code', 'text-domain'), [$this, 'metabox_qr'], $this->post_type, 'side', 'high');
        }
    }
    public function metabox_qr( $meta_id ) {
        global $post;
        $full_link = get_page_link( $post->ID );
        ?>
        <a href="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=<?php echo esc_url( $full_link ) ?>"><img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=<?php echo esc_url( $full_link ) ?>" title="<?php echo esc_url( $full_link ) ?>" alt="<?php echo esc_url( $full_link ) ?>" style="width:100%;"/></a>
        <br>Links to:
        <br><?php echo esc_url( $full_link );  ?>
        <br>
        <?php
    }

    function remove_slug( $permalink, $post, $leavename ){
        global $wp_post_types;
        foreach( $wp_post_types as $type => $custom_post ){
            if( $custom_post->_builtin == false && $type == $post->post_type   ){
                $custom_post->rewrite['slug'] = trim( $custom_post->rewrite['slug'], '/' );
                $permalink = str_replace( '/' . $custom_post->rewrite['slug'] . '/', '/', $permalink );
            }
        }
        return $permalink;
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
    public function set_custom_edit_columns( $columns) {
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


class Zume_Training_Pieces_URL extends DT_Magic_Url_Base
{
    public $magic = false;
    public $parts = false;
    public $page_title = 'Title';
    public $root = 'starter_app';
    public $type = 'home';
    public $postid = false;
    public static $token = 'starter_app_home';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        if ( $this->postid ) {
            return;
        }

        $url = explode( '/', dt_get_url_path() );
        $languages = zume_training_languages( true );
        if ( isset( $url[0]) && in_array( $url[0], $languages ) && isset( $url[1]) ) {

            global $wpdb;
            $this->postid = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type = %s", $url[1], 'zume_pieces' ) );
            if ( ! $this->postid ) {
                return;
            }

            $this->page_title = get_the_title( $this->postid );

            // register url and access
            add_action('template_redirect', [$this, 'theme_redirect']);
            add_filter('dt_blank_access', function () {
                return true;
            }, 100, 1); // allows non-logged in visit
            add_filter('dt_allow_non_login_access', function () {
                return true;
            }, 100, 1);
            add_filter('dt_override_header_meta', function () {
                return true;
            }, 100, 1);

            // header content
            add_filter('dt_blank_title', [$this, 'page_tab_title']);
            add_action('wp_print_scripts', [$this, 'print_scripts'], 1500);
            add_action('wp_print_styles', [$this, 'print_styles'], 1500);

            // page content
            add_action('dt_blank_head', [$this, '_header']);
            add_action('dt_blank_body', [$this, 'body']);
            add_action('dt_blank_footer', [$this, '_footer']);

            add_filter('dt_magic_url_base_allowed_css', [$this, 'dt_magic_url_base_allowed_css'], 10, 1);
            add_filter('dt_magic_url_base_allowed_js', [$this, 'dt_magic_url_base_allowed_js'], 10, 1);
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
    }

    public function body(){
        echo  get_the_title( $this->postid );
    }
}
Zume_Training_Pieces_URL::instance();
