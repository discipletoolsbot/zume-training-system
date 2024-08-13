<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

if ( strpos( dt_get_url_path(), 'zume_app' ) !== false || dt_is_rest() ){
    Zume_Funnel_Public_Heatmap_Churches::instance();
}

class Zume_Funnel_Public_Heatmap_Churches extends DT_Magic_Url_Base
{
    public $page_title = 'Zúme Churches Map';
    public $root = 'zume_app';
    public $type = 'heatmap_churches';
    public $type_name = '';
    public $post_type = 'groups';
    private $meta_key = '';
    public $lang_code = 'en';
    public $locale = '';
    public $us_div = 2500; // this is 2 for every 5000
    public $global_div = 25000; // this equals 2 for every 50000

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
        if ( str_contains( $url, $this->root . '/' . $this->type ) === false ) {
            return;
        }

        if ( !$this->check_parts_match( false ) ){
            return;
        }

        $this->lang_code = sanitize_key( ( $_GET['lang'] ) ?? 'en' );
        $languages = zume_languages();
        $selected_language = $languages[$this->lang_code] ?? $languages['en'];
        $this->locale = $selected_language['locale'];

        add_action( 'dt_blank_body', [ $this, 'body' ] );
        add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
        add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
        add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ], 99 );

        switch_to_locale($selected_language['locale']);
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
        Zume_Funnel_App_Heatmap::_header();
        ?>
        <script>
            let jsObject = [<?php echo json_encode([
                'map_key' => DT_Mapbox_API::get_key(),
                'mirror_url' => dt_get_location_grid_mirror( true ),
                'theme_uri' => trailingslashit( get_stylesheet_directory_uri() ),
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'parts' => $this->parts,
                'lang_code' => $this->lang_code,
                'locale' => $this->locale,
                'post_type' => $this->post_type,
                'title' => $this->page_title,
                'translation' => zume_map_translation_strings(),
                'grid_data' => [ 'data' => [], 'highest_value' => 1 ],
                'custom_marks' => [],
                'zoom' => 8,
            ]) ?>][0]

            /* custom content */
            function load_self_content( data ) {
                let pop_div = data.population_division_int * 2
                jQuery('#custom-paragraph').html(`
                  <span class="self_name ucwords temp-spinner bold">${data.name}</span> is one of <span class="self_peers  bold">${data.peers}</span>
                  administrative divisions in <span class="parent_name ucwords bold">${data.parent_name}</span> and it has a population of
                  <span class="self_population  bold">${data.population}</span>.
                  In order to reach the community goal of 2 churches for every <span class="population_division  bold">${pop_div.toLocaleString("en-US")}</span> people,
                  <span class="self_name ucwords  bold">${data.name}</span> needs
                  <span class="self_needed bold">${data.needed}</span> new churches.
                `)
            }
            /* custom level content */
            function load_level_content( data, level ) {
                let gl = jQuery('#'+level+'-list-item')
                gl.empty()
                if ( false !== data ) {
                    gl.append(`
                        <div class="cell">
                          <strong>${data.name}</strong><br>
                          ${jsObject.translation.population}: <span>${data.population}</span><br>
                          ${jsObject.translation.needed}: <span>${data.needed}</span><br>
                          ${jsObject.translation.churches_needed}: <span class="reported_number">${data.reported}</span><br>
                          ${jsObject.translation.churches_reported}: <span>${data.percent}</span>%
                          <meter class="meter" value="${data.percent}" min="0" low="33" high="66" optimum="100" max="100"></meter>
                        </div>
                    `)
                }
            }
        </script>
        <?php

        $this->customized_welcome_script();
        return true;
    }

    public static function _wp_enqueue_scripts(){
        Zume_Funnel_App_Heatmap::_wp_enqueue_scripts();
    }

    public function body(){
        DT_Mapbox_API::geocoder_scripts();
        include( 'html/heatmap-html.php' );
    }

    public function footer_javascript(){

    }

    public function customized_welcome_script(){
        ?>
        <script>
            jQuery(document).ready(function($){
                let asset_url = '<?php echo esc_url( trailingslashit( plugin_dir_url( __FILE__ ) ) . 'images/' ) ?>'
                $('.training-content').append(`
                <div class="grid-x grid-padding-x" >
                    <div class="cell center">
                        <img class="training-screen-image" src="${asset_url + 'search.svg'}" alt="search icon" />
                        <h2><?php echo esc_html__('Search', 'zume' ) ?></h2>
                        <p><?php echo esc_html__('Search for any city or place with the search input.', 'zume' ) ?></p>
                    </div>
                    <div class="cell center">
                        <img class="training-screen-image" src="${asset_url + 'zoom.svg'}" alt="zoom icon"  />
                        <h2><?php echo esc_html__('Zoom', 'zume' ) ?></h2>
                        <p><?php echo esc_html__('Scroll zoom with your mouse or pinch zoom with track pads and phones to focus on sections of the map.', 'zume' ) ?></p>
                    </div>
                    <div class="cell center">
                        <img class="training-screen-image" src="${asset_url + 'drag.svg'}" alt="drag icon"  />
                        <h2><?php echo esc_html__('Drag', 'zume' ) ?></h2>
                        <p><?php echo esc_html__('Click and drag the map any direction to look at a different part of the map.', 'zume' ) ?></p>
                    </div>
                    <div class="cell center">
                        <img class="training-screen-image" src="${asset_url + 'click.svg'}" alt="click icon" />
                        <h2><?php echo esc_html__('Click', 'zume' ) ?></h2>
                        <p><?php echo esc_html__('Click a single section and reveal a details panel with more information about the location.', 'zume' ) ?></p>
                    </div>
                </div>
                `)

            })
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
            return new WP_Error( __METHOD__, 'Missing parameters', [ 'status' => 400 ] );
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
                return Zume_Funnel_App_Heatmap::get_activity_grid_id( $grid_id, $offset );
            case 'grid_data':
                $grid_totals = Zume_Funnel_App_Heatmap::query_church_grid_totals();
                return Zume_Funnel_App_Heatmap::_initial_polygon_value_list( $grid_totals, $this->global_div, $this->us_div );
            default:
                return new WP_Error( __METHOD__, 'Missing valid action', [ 'status' => 400 ] );
        }
    }
}
