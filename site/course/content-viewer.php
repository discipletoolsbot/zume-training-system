<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Content_Viewer extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'course_app';
    public $type = 'viewer';
    public static $token = 'course_app_viewer';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        [
            'lang_code' => $lang_code,
            'path' => $path,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        if ( ( $this->root . '/' . $this->type ) === ( ( $url_parts[0] ?? '' ) . '/' . ( $url_parts[1] ?? '' ) ) ) {

            $this->set_locale( $lang_code );

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_allow_non_login_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_override_header_meta', function (){ return true;
            }, 100, 1 );

            // header content
            add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
            add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
            add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 100 );
        }

    }
    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }
    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css( $allowed_css );
    }
    public function action_wp_footer(): void {}
    public function wp_enqueue_scripts() {}
    public function header_style(){
        ?>
        <style>
            #blank-template-body {
                background-color: WhiteSmoke !important;
            }
        </style>
        <?php
    }
    public function body(){
        ?>
        <div style="top:0; left:0; position: fixed; background-color: white; padding: .5em; z-index:100; width: 100%; border-bottom: 1px solid lightgrey;">
            <select>
                <option value="">Select the Session</option>
                <option value="10_0">All 10</option>
                <option value="20_0">All 20</option>
                <option value="intensive_0">All Intensive</option>
                <option disabled>------------</option>
                <option value="10_1">10 - 1</option>
                <option value="10_2">10 - 2</option>
                <option value="10_3">10 - 3</option>
                <option value="10_4">10 - 4</option>
                <option value="10_5">10 - 5</option>
                <option value="10_6">10 - 6</option>
                <option value="10_7">10 - 7</option>
                <option value="10_8">10 - 8</option>
                <option value="10_9">10 - 9</option>
                <option value="10_10">10 - 10</option>
                <option disabled>------------</option>
                <option value="20_1">20 - 1</option>
                <option value="20_2">20 - 2</option>
                <option value="20_3">20 - 3</option>
                <option value="20_4">20 - 4</option>
                <option value="20_5">20 - 5</option>
                <option value="20_6">20 - 6</option>
                <option value="20_7">20 - 7</option>
                <option value="20_8">20 - 8</option>
                <option value="20_9">20 - 9</option>
                <option value="20_10">20 - 10</option>
                <option value="20_11">20 - 11</option>
                <option value="20_12">20 - 12</option>
                <option value="20_13">20 - 13</option>
                <option value="20_14">20 - 14</option>
                <option value="20_15">20 - 15</option>
                <option value="20_16">20 - 16</option>
                <option value="20_17">20 - 17</option>
                <option value="20_18">20 - 18</option>
                <option value="20_19">20 - 19</option>
                <option value="20_20">20 - 20</option>
                <option disabled>------------</option>
                <option value="intensive_1">Intensive - 1</option>
                <option value="intensive_2">Intensive - 2</option>
                <option value="intensive_3">Intensive - 3</option>
                <option value="intensive_4">Intensive - 4</option>
                <option value="intensive_5">Intensive - 5</option>
            </select>
        </div>
        <script>
            /* trigger dropdown redirect */
            let type = '<?php echo $_GET['type'] ?? false; ?>';
            let session = '<?php echo $_GET['session'] ?? false; ?>';
            jQuery(document).ready(function($){
                $('select').on('change', function(){
                    let value = $(this).val();
                    let parts = value.split('_');
                    let type = parts[0];
                    let session = parts[1];
                    if ( ! session ) {
                        window.location.href = `/zume_app/translator?tab=view_course`;
                    }
                    window.location.href = `?type=${type}&session=${session}`;
                });

                if ( type !== '' ) {
                    $("select option[value="+type+"_"+session+"]").prop('selected', true );
                }
            });
        </style>
        <div style="margin-top: 70px;"><!-- padding for under dropdown -->

        <?php
        // slide printer
        if ( isset( $_GET['type'], $_GET['session'] ) ) {

            // get the slides for the schedule and session
            $build = zume_course_builder( $_GET['type'], $_GET['session'] );

            foreach( $build as $slide ) {

                // print keys above slides
                echo $slide['key'] . ' - ' . $slide['type'];
                echo '<br>';

                // print the slide
                echo '<div class="slide-outline">';

                zume_course_slide_template( $slide );

                echo '</div>';
            }

            // print the css
            zume_course_slide_css($build);
        }
        ?>


        </div> <!-- end padding for under dropdown -->
        <?php
    }

}
Zume_Content_Viewer::instance();







