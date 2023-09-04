<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

if ( strpos( dt_get_url_path(), 'zume_app' ) !== false || dt_is_rest() ){
    Zume_App_Local_Vision::instance();
}

class Zume_App_Local_Vision extends DT_Magic_Url_Base
{
    public $page_title = 'Local Zúme Vision';
    public $root = "zume_app";
    public $type = 'local_vision';
    public $type_name = '';
    public $post_type = 'groups';
    private $meta_key = '';
    public $us_div = 2500; // this is 2 for every 5000
    public $global_div = 25000; // this equals 2 for every 50000
    public $grid_id = 0;

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        $this->meta_key = $this->root . '_' . $this->type . '_magic_key';
        parent::__construct();

        add_action( 'rest_api_init', [ $this, 'add_endpoints' ] );


        // fail if not valid url
        $url = dt_get_url_path();
        if ( strpos( $url, $this->root . '/' . $this->type ) === false ) {
            return;
        }

        if ( !$this->check_parts_match( false ) ){
            return;
        }

        if ( isset( $_GET['grid_id'] ) && ! empty( $_GET['grid_id'] ) ) {
            $this->grid_id = $_GET['grid_id'];
        } else {
            return;
        }


        add_action( 'dt_blank_body', [ $this, 'body' ] );
        add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
        add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
        add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ], 99 );

    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'jquery-touch-punch';
        $allowed_js[] = 'mapbox-gl';
        $allowed_js[] = 'jquery-cookie';
        $allowed_js[] = 'mapbox-cookie';
        $allowed_js[] = 'heatmap-js';
        return $allowed_js;
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        $allowed_css[] = 'mapbox-gl-css';
        $allowed_css[] = 'introjs-css';
        $allowed_css[] = 'heatmap-css';
        $allowed_css[] = 'site-css';
        return $allowed_css;
    }

    public function _header(){
//        Zume_Funnel_App_Heatmap::_header();
    }

    public static function _wp_enqueue_scripts(){
//        Zume_Funnel_App_Heatmap::_wp_enqueue_scripts();
    }

    public function body(){
        $grid_stack = Disciple_Tools_Mapping_Queries::get_drilldown_by_grid_id( $this->grid_id );
        $full_name = Disciple_Tools_Mapping_Queries::get_full_name_by_grid_id( $this->grid_id );
        ?>
        <h2><?php echo $full_name ?></h2>
        <pre><?php echo var_dump($grid_stack) ?></pre>
        <?php
    }

    public function _full_name( $row ) {
        $label = '';

        if ( 1 === $row['grid_id'] ) {
            $label = 'World';
        }

        if ( ! empty( $row['admin0_name'] ) ) {
            $label = $row['admin0_name'];
        }
        if ( ! empty( $row['admin1_name'] ) ) {
            $label = $row['admin1_name']  . ', ' . $row['admin0_name'];
        }
        if ( ! empty( $row['admin2_name'] ) ) {
            $label = $row['admin2_name'] . ', ' . $row['admin1_name']  . ', ' . $row['admin0_name'];
        }
        if ( ! empty( $row['admin3_name'] ) ) {
            $label =  $row['admin3_name'] . ', ' . $row['admin2_name'] . ', ' . $row['admin1_name']  . ', ' . $row['admin0_name'];
        }

        return $label;
    }

    public function footer_javascript(){
        ?>
        <script>
            let jsObject = [<?php echo json_encode([
                'map_key' => DT_Mapbox_API::get_key(),
                'mirror_url' => dt_get_location_grid_mirror( true ),
                'theme_uri' => trailingslashit( get_stylesheet_directory_uri() ),
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'parts' => $this->parts,
                'post_type' => $this->post_type,
                'translation' => [
                    'add' => __( 'Zume', 'zume_funnels' ),
                    'title' => 'Churches'
                ],
                'grid_data' => ['data' => [], 'highest_value' => 1 ],
                'custom_marks' => [],
                'zoom' => 8
            ]) ?>][0]
        </script>
        <?php
    }

    public function add_endpoints() {
        $namespace = $this->root . '/v1';
        register_rest_route(
            $namespace,
            '/'.$this->type,
            [
                [
                    'methods'  => WP_REST_Server::CREATABLE,
                    'callback' => [ $this, 'endpoint' ],
                    'permission_callback' => '__return_true',
                ],
            ]
        );
    }

    public function endpoint( WP_REST_Request $request ) {
        $params = $request->get_params();

        if ( ! isset( $params['parts'], $params['action'] ) ) {
            return new WP_Error( __METHOD__, "Missing parameters", [ 'status' => 400 ] );
        }

        $params = dt_recursive_sanitize_array( $params );
        $action = sanitize_text_field( wp_unslash( $params['action'] ) );

        switch ( $action ) {
            case 'self':
                return Zume_Funnel_App_Heatmap::get_self( $params['grid_id'], $this->global_div, $this->us_div );
            case 'a3':
            case 'a2':
            case 'a1':
            case 'a0':
            case 'world':
                $list = Zume_Funnel_App_Heatmap::query_church_grid_totals( $action );
                return Zume_Funnel_App_Heatmap::endpoint_get_level( $params['grid_id'], $action, $list, $this->global_div, $this->us_div );
            case 'activity_data':
                $grid_id = sanitize_text_field( wp_unslash( $params['grid_id'] ) );
                $offset = sanitize_text_field( wp_unslash( $params['offset'] ) );
                return Zume_Funnel_App_Heatmap::query_activity_data( $grid_id, $offset );
            case 'grid_data':
                $grid_totals = Zume_Funnel_App_Heatmap::query_church_grid_totals();
                return Zume_Funnel_App_Heatmap::_initial_polygon_value_list( $grid_totals, $this->global_div, $this->us_div );
            default:
                return new WP_Error( __METHOD__, "Missing valid action", [ 'status' => 400 ] );
        }
    }

}
