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
    public $lang = 'en';
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
        $this->lang = get_locale();

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
        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [ $this, 'add_endpoints' ] );
            add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
        }
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

        switch ( $params['action'] ) {
            case 'get':
                // do something
                return true;
            case 'excited':
                // do something else
            default:
                return true;
        }
    }
    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }
    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }
    public function action_wp_footer(): void {}
    public function wp_enqueue_scripts() {
    }
    public function header_style(){
        ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/js/foundation.js" integrity="sha512-vsjtv6Dty7C9eeMlJ+02kvlhvVlqKsJHOFWZ1ZR5WrRlU/oTlW8d8wPHWlKX579O4OO/kW5DW9XFtQ9J3gKeKg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link href="https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/foundation-icons@2.0.0/foundation-icons.min.css" rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet">

        <style>
            #blank-template-body {
                padding: 1em;
                background-color: WhiteSmoke !important;
                font-family: Poppins, sans-serif;
            }
            .card {
                border: 1px solid #ccc;
                border-radius: 5px;
                height: 720px;
                width: 1280px;
                background-color: white;
            }
            .stage {
                height: 30px;
                padding-top: 10px;
                text-align: center;
                background-color: white !important;
                margin-bottom: 5px;
            }
            .center {
                width: 100%;
                text-align: center;
            }
            .center .title {
                text-transform: uppercase;
            }
            .center-title {
                height: 710px;
                padding-top: 200px;
            }
            .left-4 {
                width: 33%;
                float: left;
                height: 645px;
                border-right: 6px solid #5dccff;
                text-align:center;
            }
            .left-single-title {
                padding-top: 300px;
                text-align:right;
                padding-right: 2em;
                vertical-align: middle;
            }
            .left-single-title img {
                margin: 0 1em 1em 0;
            }
            .left-single-title .title {
                font-size:2.5em;
                font-weight: bold;
                text-transform: uppercase;
            }
            .left-single-title .subtitle {
                font-size:2em;
            }
            .right-8 {
                width: 66%;
                float: right;
                height: 645px;
                font-size: 2.1em;
            }
            .right-8-checkin {
                padding: 1em;
                margin: 0 1em;
            }
            .right-8-checkin img {
                width: 200px;
            }
            .right-8-pray {
                margin: 0 1em;
                padding: 1em;
                background-color: #e7f6fc;
                border-radius: 1em;
                border: 3px solid #5dccff;
            }
            .right-8-lookback {
                padding: 1em;
                margin: 0 1em;
            }
            .left-4-obey {
                width: 33%;
                float: left;
                text-align:right;
                padding-right: 2em;
            }
            .left-obey-title {
                font-size:2.5em;
                font-weight: bold;
                text-transform: uppercase;
                vertical-align: middle;
            }
            .left-obey-title img {
                margin-right: 10px;
            }
            .right-8-obey {
                border-left: 6px solid #5dccff;
                padding: 0 1.5em;
                width: 66%;
                float: right;
                font-size: 2.1em;
            }
            .activity {
                height: 20px;
                text-align: center;
                background-color: white !important;
                margin-bottom: 10px;
            }
            .left-8 {
                width: 66%;
                float: left;
                height: 645px;
            }
            .left-8-activity {
                margin: 0 1em;
                font-size: 1.8em;
                padding: 1em;
                background-color: #e7f6fc;
                border-radius: 1em;
                border: 3px solid #5dccff;
            }
            .right-4 {
                width: 33%;
                float: right;
                height: 620px;
                border-left: 6px solid #5dccff;
                text-align:center;
            }
            .right-4-activity {
                padding-top:170px;
                font-size: 1.5em;
            }
            .right-4-activity img {
                width: 250px;
            }
            .final {
                font-size: 1.8em;
                max-width: 700px;
                margin: 80px auto;
            }
            .video {
                width: 1280px;
                height: 720px;
                border-radius: 5px;
            }
            .center-activity {
                max-width:1000px;
                margin: 0 auto;
                font-size: 1.8em;
                padding: 1em;
                background-color: #e7f6fc;
                border-radius: 1em;
                border: 3px solid #5dccff;
            }
            .left-8-image {
                text-align: center;
                max-height: 600px;
                max-width: 600px;
                margin: 1em auto 0;
            }
            .left-6 {
                font-size: 1.8em;
                width: 50%;
                float: left;
                height: 635px;
                text-align: center;
                padding: 1em;
            }
            .right-6 {
                font-size: 1.8em;
                width: 50%;
                float: right;
                height: 635px;
                border-left: 6px solid #5dccff;
                text-align: center;
                padding: 1em;
            }
            .congratulations {
                font-size: 2.5em;
                font-weight: bold;
                padding: 1em;
                background-color: #e7f6fc;
                border-radius: 1em;
                border: 3px solid #5dccff;
                max-width: 1000px;
                margin: 0 auto;
            }
            .progress-bar-wrapper {
                width: fit-content;
                background-image: url('https://storage.googleapis.com/zume-file-mirror/images/horizontal-line.png');
                background-repeat: repeat-x;
                height: 20px;
                margin: 0 auto;
            }
            .progress-bar-item {
                width: 17px;
                height: 17px;
                border: 1px solid lightgrey;
                background: white;
                float:left;
            }
            .progress-bar-divider {
                width: 17px;
                height: 17px;
                float:left;
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

        <div style="margin-top: 70px;">
        <?php
        if ( isset( $_GET['type'], $_GET['session'] ) ) {
            $build = zume_course_builder( $_GET['type'], $_GET['session'] );
            foreach( $build as $slide ) {

                echo $slide['key'] . ' - ' . $slide['type'];
                echo '<br>';

                zume_get_template( $slide );
            }
        }
        ?>
        </div>
        <script>
            let type = '<?php echo $_GET['type'] ?? false; ?>';
            let session = '<?php echo $_GET['session'] ?? false; ?>';
            jQuery(document).ready(function($){
                $('select').on('change', function(){
                    let value = $(this).val();
                    let parts = value.split('_');
                    let type = parts[0];
                    let session = parts[1];
                    if ( ! session ) {
                        window.location.href = `/course_app/viewer`;
                    }
                    window.location.href = `?type=${type}&session=${session}`;
                });

                if ( type !== '' ) {
                    $("select option[value="+type+"_"+session+"]").prop('selected', true );
                }

                jQuery.each( jQuery('.middle'), function( index, value ) {
                    jQuery(this).css('margin-top', ( 615 - jQuery(this).height() ) * .5 + 'px');
                });

            });
        </script>
        <!-- .key-bar .key-bar to color the active box -->
        <style>
            <?php
            foreach( $build as $slide ) {
                echo '.' . $slide['key'] . '-bar .' . $slide['key'] . '-bar { background-color: #5dccff; }';
            }
            ?>
        </style>
        <?php
    }

}
Zume_Content_Viewer::instance();


function zume_get_template( $slide ) {

    switch( $slide['type'] ) {
        case 'title':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <div class="center-title">
                        <img src="<?php echo $slide['center'][0] ?>" /><br>
                        <h2><?php echo $slide['center'][1] ?></h2>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'checkin':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span><br>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-checkin middle">
                            <p><?php echo $slide['right'][0]; ?></p>
                            <p><img src="<?php echo $slide['right'][1]; ?>" /></p>
                            <p><?php echo $slide['right'][2]; ?> <span style="font-weight:bold;"><?php echo $slide['right'][3]; ?></span></p>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'pray':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span><br>
                            <span class="subtitle"><?php echo $slide['left'][1]; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-pray middle">
                            <?php
                            foreach( $slide['right'] as $prayer ) {
                                echo '<p>' . $prayer . '</p>';
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'review':
        case 'overview':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-lookback middle">
                            <?php
                            foreach( $slide['right'] as $p ) {
                                if ( is_array( $p ) ) {
                                    echo '<ul>';
                                    foreach( $p as $pp ) {
                                        echo '<li>' . $pp . '</li>';
                                    }
                                    echo '</ul>';
                                } else {
                                    echo '<p><strong>' . $p . '</strong></p>';
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'challenge':
        case 'center':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <strong><span class="title"><?php echo $slide['center'][0] ?? '' ?></span> <?php echo $slide['center'][1] ?? '' ?> </strong>
                </div>
                <div>
                    <div class="center-activity middle">
                        <?php
                        foreach( $slide['left'] as $i => $v ) {
                            if ( $i == 0 ) {
                                echo '<p><strong>' . $v . '</strong></p>';
                            } else {
                                if (is_array($v)) {
                                    echo '<ul>';
                                    foreach ($v as $pp) {
                                        echo '<li>' . $pp . '</li>';
                                    }
                                    echo '</ul>';
                                } else {
                                    echo '<p>' . $v . '</p>';
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'watch':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-lookback middle">
                            <?php
                            foreach( $slide['right'] as $i => $v ) {
                                if ( $i == 0 ) {
                                    echo '<p><strong>' . $v . '</strong></p>';
                                } else {
                                    if (is_array($v)) {
                                        echo '<ul>';
                                        foreach ($v as $pp) {
                                            echo '<li>' . $pp . '</li>';
                                        }
                                        echo '</ul>';
                                    } else {
                                        echo '<p>' . $v . '</p>';
                                    }
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'video':
            ?>
            <div class="video">
                <iframe src="<?php echo $slide['center'][0] ?>" width="340" height="160" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
            <?php
            break;
        case 'discuss':
        case 'look_back':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span><br>
                            <span class="subtitle"><?php echo $slide['left'][1]; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-lookback middle">
                            <?php
                            foreach( $slide['right'] as $p ) {
                                if ( is_array( $p ) ) {
                                    echo '<ul>';
                                    foreach( $p as $pp ) {
                                        echo '<li>' . $pp . '</li>';
                                    }
                                    echo '</ul>';
                                } else {
                                    echo '<p>' . $p . '</p>';
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'left_content':
        case 'activity':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <strong> <span class="title"><?php echo $slide['center'][0] ?></span>  <?php echo $slide['center'][1] ?> </strong>
                </div>
                <div>
                    <div class="left-8 ">
                        <div class="left-8-activity middle">
                            <?php
                            foreach( $slide['left'] as $i => $v ) {
                                if ( $i == 0 ) {
                                    echo '<p><strong>' . $v . '</strong></p>';
                                } else {
                                    if (is_array($v)) {
                                        echo '<ul>';
                                        foreach ($v as $pp) {
                                            echo '<li>' . $pp . '</li>';
                                        }
                                        echo '</ul>';
                                    } else {
                                        echo '<p>' . $v . '</p>';
                                    }
                                }
                            }
                            ?>
                        </div>
                    </div>
                    <div class="right-4">
                        <div class="right-4-activity">
                            <p><img src="<?php echo $slide['right'][0]; ?>" /></p>
                            <p><?php echo $slide['right'][1]; ?></p>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'obey':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div style="padding-top:100px;">
                    <div class="left-4-obey">
                        <div class="left-obey-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span>
                        </div>
                    </div>
                    <div class="right-8-obey">
                        <div class=""><p><?php echo $slide['right'][0]; ?></p></div>
                    </div>
                </div>
                <div>
                    <div class="left-4-obey">
                        <div class="left-obey-title "><img src="https://placehold.co/60x60/png" /> <?php echo $slide['left'][1]; ?></div>
                    </div>
                    <div class="right-8-obey">
                        <div class=""><p><?php echo $slide['right'][1]; ?></p></div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'left_image':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-8 ">
                        <div class="left-8-image">
                            <p><strong><?php echo $slide['left'][0]; ?></strong></p>
                            <p><img src="<?php echo $slide['left'][1]; ?>" /></p>
                        </div>
                    </div>
                    <div class="right-4">
                        <div class="right-4-activity">
                            <p><img src="<?php echo $slide['right'][0]; ?>" /></p>
                            <p><?php echo $slide['right'][1]; ?></p>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'next_steps':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <strong><span class="title"><?php echo $slide['center'][0] ?></span></strong>
                </div>
                <div>
                    <div class="left-6">
                        <p><strong><?php echo $slide['left'][0] ?></strong></p>
                        <p><img src="<?php echo $slide['left'][2] ?>" style="width:200px;" /></p>
                        <p><?php echo $slide['left'][1] ?></p>
                    </div>
                    <div class="right-6">
                        <p><strong><?php echo $slide['right'][0] ?></strong></p>
                        <p><img src="<?php echo $slide['right'][2] ?>" style="width:200px;" /></p>
                        <p><?php echo $slide['right'][1] ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'break':
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <div class="congratulations middle">
                        <p><?php echo $slide['center'][0] ?></p>
                        <p><?php echo $slide['center'][1] ?? '' ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'congratulations':
            ?>
            <div class="card">
                <div class="center">
                    <div class="congratulations middle">
                        <p><?php echo $slide['center'][0] ?></p>
                        <p><?php echo $slide['center'][1] ?? '' ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'final':
            ?>
            <div class="card">
                <div class="center">
                    <div class="final">
                        <p><img style="width:150px;" src="<?php echo $slide['center'][0] ?>" /></p>
                        <p><?php echo $slide['center'][1] ?></p>
                        <p><img style="width:200px;" src="<?php echo $slide['center'][2] ?>" /></p>
                        <p><?php echo $slide['center'][3] ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        default:
            ?>
            <div class="card">
                <div class="stage <?php echo $slide['key']; ?>"><?php echo $slide['progress_bar']; ?></div>
                <div class="center"></div>
            </div>
            <?php
            break;

    }
}

function zume_course_builder( $session_type = '10', $session_number = '1' ) {

    $session = [];

    if ( '10' === $session_type ) {

        $all['1'] = ['s1_1_1','s1_1_2','s1_1_3','s1_1_4',false,'t1_a','t1_b','t1_c',false,'t2_a','t2_b','t2_c',false,'t3_a','t3_b','t3_c',false,'t4_a','t4_b','t4_c',false,'t5_a','t5_b','t5_c',false,'s1_1_20','s1_1_21','final'];
        $all['2'] = ['s1_2_1','s1_2_2','s1_2_3','s1_2_4','s1_2_5',false,'t6_a','t6_b','t6_c',false,'t7_a','t7_b','t7_c','t7_d',false,'t8_a','t8_b','t8_c',false,'s1_2_6','s1_2_7','final'];
        $all['3'] = ['s1_3_1','s1_3_2','s1_3_3','s1_3_4','s1_3_5',false,'t9_a','t9_b','t9_c',false,'t10_a','t10_b','t10_c','t10_d','t10_e',false,'s1_3_8',false,'t11_a','t11_b','t11_c','t11_d',false,'s1_3_10','s1_3_11','final'];
        $all['4'] = ['s1_4_1','s1_4_2','s1_4_3','s1_4_4','s1_4_5',false,'t12_a','t12_b','t12_c',false,'t13_a','t13_b','t13_c',false,'t14_a','t14_b','t14_c',false,'t15_a','t15_b','t15_c',false,'t16_a','t16_b','t16_c',false,'s1_4_6','s1_4_7','final'];
        $all['5'] = ['s1_5_1','s1_5_2','s1_5_3','s1_5_4','s1_5_5',false,'t17_a','t17_b',false,'t18_a','t18_b','t18_c',false,'t19_a',false,'t17_d','t17_e','final'];
        $all['6'] = ['s1_6_1','s1_6_2','s1_6_3','s1_6_4','s1_6_5',false,'t20_a','t20_b','t20_c',false,'t21_a','t21_b','t21_c',false,'s1_6_6','s1_6_7','final'];
        $all['7'] = ['s1_7_1','s1_7_2','s1_7_3','s1_7_4','s1_7_5',false,'t22_a','t22_b','t22_c',false,'s1_7_6','s1_7_7','s1_7_8','s1_7_9','final'];
        $all['8'] = ['s1_8_1','s1_8_2','s1_8_3','s1_8_4','s1_8_5',false,'t23_a','t23_b','t23_c',false,'s1_8_6','s1_8_7','s1_8_8','final'];
        $all['9'] = ['s1_9_1','s1_9_2','s1_9_3','s1_9_4','s1_9_5',false,'t24_a','t24_b','t24_c',false,'t25_a','t25_b','t25_c',false,'t26_a','t26_b','t26_c',false,'t28_a','t28_b','t28_c','t28_d',false,'s1_9_9','s1_9_10','final'];
        $all['10'] = ['s1_10_1','s1_10_2','s1_10_3','s1_10_4','s1_10_5',false,'s1_10_6',false,'t29_a','t29_b','t29_c',false,'t31_a','t31_b','t31_c',false,'t32_a','t32_b',false,'t30_a','t30_b','t30_c',false,'t27_a','t27_b','t27_c',false,'next_steps','congratulations','final'];

        if ( empty( $session_number ) ) {
            foreach( $all as $set ) {
                $session = array_merge( $session, $set );
            }
        }
        else {
            $session = $all[$session_number];
        }
    }
    else if ( '20' === $session_type ) {

        $all['1'] = ['s2_1_1','s2_1_2','s2_1_3','s2_1_4',false,'t1_a','t1_b','t1_c',false,'t2_a','t2_b','t2_c',false,'t3_a','t3_b','t3_c',false,'s2_1_5','final'];
        $all['2'] = ['s2_2_1','s2_2_2','s2_2_3','s2_2_4','s2_2_5',false,'t4_a','t4_b','t4_c',false,'s2_2_6','s2_2_7','final'];
        $all['3'] = ['s2_3_1','s2_3_2','s2_3_3','s2_3_4','s2_3_5',false,'t5_a','t5_b','t5_c',false,'s2_3_6','s2_3_7','final'];
        $all['4'] = ['s2_4_1','s2_4_2','s2_4_3','s2_4_4','s2_4_5',false,'t6_a','t6_b','t6_c',false,'t8_a','t8_b','t8_c',false,'s2_4_6','s2_4_7','final'];
        $all['5'] = ['s2_5_1','s2_5_2','s2_5_3','s2_5_4','s2_5_5',false,'t7_a','t7_b','t7_c','t7_d',false,'s2_5_6','s2_5_7','final'];
        $all['6'] = ['s2_6_1','s2_6_2','s2_6_3','s2_6_4','s2_6_5',false,'t9_a','t9_b','t9_c',false,'t13_a','t13_b','t13_c',false,'t10_a','t10_b','t10_c','t10_d','t10_e',false,'s2_6_6','s2_6_7','final'];
        $all['7'] = ['s2_7_1','s2_7_2','s2_7_3','s2_7_4','s2_7_5',false,'s2_7_6','s2_7_7','s2_7_8','final'];
        $all['8'] = ['s2_8_1','s2_8_2','s2_8_3','s2_8_4','s2_8_5',false,'t11_a','t11_b','t11_c','t11_d',false,'t12_a','t12_b','t12_c',false,'s2_8_6','s2_8_7','final'];
        $all['9'] = ['s2_9_1','s2_9_2','s2_9_3','s2_9_4','s2_9_5',false,'s2_9_6','s2_9_7','s2_9_8','final'];
        $all['10'] = ['s2_10_1','s2_10_2','s2_10_3','s2_10_4','s2_10_5',false,'t14_a','t14_b','t14_c',false,'t15_a','t15_b','t15_c',false,'t16_a','t16_b','t16_c',false,'s2_10_6','s2_10_7','final'];
        $all['11'] = ['s2_11_1','s2_11_2','s2_11_3','s2_11_4','s2_11_5',false,'t17_a','t17_b',false,'t17_d','t17_e','final'];
        $all['12'] = ['s2_12_1','s2_12_2','s2_12_3','s2_12_4','s2_12_5',false,'t18_a','t18_b','t18_c',false,'t19_a',false,'s2_12_6','s2_12_7','final'];
        $all['13'] = ['s2_13_1','s2_13_2','s2_13_3','s2_13_4','s2_13_5',false,'t20_a','t20_b','t20_c',false,'t21_a','t21_b','t21_c',false,'s2_13_6','s2_13_7','final'];
        $all['14'] = ['s2_14_1','s2_14_2','s2_14_3','s2_14_4','s2_14_5',false,'s2_14_6','s2_14_7','s2_14_8','final'];
        $all['15'] = ['s2_15_1','s2_15_2','s2_15_3','s2_15_4','s2_15_5',false,'t22_a','t22_b','t22_c',false,'t23_a','t23_b','t23_c',false,'s2_15_6','s2_15_7','final'];
        $all['16'] = ['s2_16_1','s2_16_2','s2_16_3','s2_16_4','s2_16_5',false,'t24_a','t24_b','t24_c',false,'t25_a','t25_b','t25_c',false,'t26_a','t26_b','t26_c',false,'s2_16_6','s2_16_7','final'];
        $all['17'] = ['s2_17_1','s2_17_2','s2_17_3','s2_17_4','s2_17_5',false,'t27_a','t27_b','t27_c',false,'s2_17_6','s2_17_7','final'];
        $all['18'] = ['s2_18_1','s2_18_2','s2_18_3','s2_18_4','s2_18_5',false,'t28_a','t28_b','t28_c','t28_d',false,'t29_a','t29_b','t29_c',false,'s2_18_6','s2_18_7','final'];
        $all['19'] = ['s2_19_1','s2_19_2','s2_19_3','s2_19_4','s2_19_5',false,'t30_a','t30_b','t30_c',false,'s2_19_6','s2_19_7','final'];
        $all['20'] = ['s2_20_1','s2_20_2','s2_20_3','s2_20_4','s2_20_5',false,'t31_a','t31_b','t31_c',false,'t32_a','t32_b',false,'next_steps','congratulations','final'];

        if ( empty( $session_number ) ) {
            foreach( $all as $set ) {
                $session = array_merge( $session, $set );
            }
        }
        else {
            $session = $all[$session_number];
        }
    } else if ( 'intensive' === $session_type ) {

        $all['1'] = ['s1_1_1','s1_1_2','s1_1_3','s1_1_4',false,'t1_a','t1_b','t1_c',false,'t2_a','t2_b','t2_c',false,'t3_a','t3_b','t3_c',false,'t4_a','t4_b','t4_c',false,'t5_a','t5_b','t5_c',false,'s1_1_20',false,'break',false, // session 1
                    's1_2_1','s1_2_2','s1_2_3','s1_2_5',false,'t6_a','t6_b','t6_c',false,'t7_a','t7_b','t7_c','t7_d',false,'t8_a','t8_b','t8_c',false,'s1_2_6','final']; // session 2
        $all['2'] = ['s1_3_1','s1_3_2','s1_3_3','s1_3_5',false,'t9_a','t9_b','t9_c',false,'t10_a','t10_b','t10_c','t10_d','t10_e',false,'s1_3_8',false,'t11_a','t11_b','t11_c','t11_d',false,'s1_3_10',false,'break',false, // session 3
                    's1_4_1','s1_4_2','s1_4_3','s1_4_5',false,'t12_a','t12_b','t12_c',false,'t13_a','t13_b','t13_c',false,'t14_a','t14_b','t14_c',false,'t15_a','t15_b','t15_c',false,'t16_a','t16_b','t16_c',false,'s1_4_6','final']; // session 4
        $all['3'] = ['s1_5_1','s1_5_2','s1_5_3','s1_5_5',false,'t17_a','t17_b',false,'t18_a','t18_b','t18_c',false,'t19_a',false,'t17_d','t17_e',false,'break',false, // session 5
                    's1_6_1','s1_6_2','s1_6_3','s1_6_5',false,'t20_a','t20_b','t20_c',false,'t21_a','t21_b','t21_c',false,'s1_6_6','s1_6_7','final']; // session 6
        $all['4'] = ['s1_7_1','s1_7_2','s1_7_3','s1_7_5',false,'t22_a','t22_b','t22_c',false,'s1_7_6','s1_7_7','s1_7_8','s1_7_9',false,'break',false, // session 7
                    's1_8_1','s1_8_2','s1_8_3','s1_8_5',false,'t23_a','t23_b','t23_c',false,'s1_8_6','s1_8_7','s1_8_8','final']; // session 8
        $all['5'] = ['s1_9_1','s1_9_2','s1_9_3','s1_9_5',false,'t24_a','t24_b','t24_c',false,'t25_a','t25_b','t25_c',false,'t26_a','t26_b','t26_c',false,'t28_a','t28_b','t28_c','t28_d',false,'s1_9_9','s1_9_10',false,'break',false, // session 9
                    's1_10_1','s1_10_2','s1_10_3','s1_10_5',false,'s1_10_6',false,'t29_a','t29_b','t29_c',false,'t31_a','t31_b','t31_c',false,'t32_a','t32_b',false,'t30_a','t30_b','t30_c',false,'t27_a','t27_b','t27_c',false,'next_steps','congratulations','final']; // session 10

        if ( empty( $session_number ) ) {
            foreach( $all as $set ) {
                $session = array_merge( $session, $set );
            }
        }
        else {
            $session = $all[$session_number];
        }
    }

    $content = zume_content();
    $progress_bar = '<div class="progress-bar-wrapper">';

    $slides = [];
    foreach( $session as $index => $item ) {
        if ( ! $item ) {
            $progress_bar .= '<div class="progress-bar-divider"> </div>';
            continue;
        }

        $slides[$item] = [];

        if ( $item !== 'final' ) {
            $progress_bar .= '<div class="progress-bar-item '.$item.'-bar"></div>';
        }
    }
    $progress_bar .= '</div>';

    foreach( $content as $item ) {
        if ( in_array( $item['key'], $session ) ) {
            $slides[$item['key']] = $item;
            $slides[$item['key']]['progress_bar'] = ( empty( $session_number ) ) ? '' : $progress_bar;
        }
    }

    return $slides;
}

function zume_content() {

    $tools = array(
        1 => ['t1_a','t1_b','t1_c'], // God uses ordinary people
        2 => ['t2_a','t2_b','t2_c'], // teach them to obey
        3 => ['t3_a','t3_b','t3_c'], // spiritual breathing
        4 => ['t4_a','t4_b','t4_c'], // soaps bible reading
        5 => ['t5_a','t5_b','t5_c'], // accountability groups
        6 => ['t6_a','t6_b','t6_c'], // producer not consumer
        7 => ['t7_a','t7_b','t7_c','t7_d'], // prayer cycle
        8 => ['t8_a','t8_b','t8_c'], // list of 100
        9 => ['t9_a','t9_b','t9_c'], // spiritual economy
        10 => ['t10_a','t10_b','t10_c','t10_d','t10_e'], // the gospel
        11 => ['t11_a','t11_b','t11_c','t11_d'], // baptism
        12 => ['t12_a','t12_b','t12_c'], // 3-minute testimony
        13 => ['t13_a','t13_b','t13_c'], // greatest blessing
        14 => ['t14_a','t14_b','t14_c'], // duckling discipleship
        15 => ['t15_a','t15_b','t15_c'], // seeing where God's kingdom isn't
        16 => ['t16_a','t16_b','t16_c'], // the lord's supper
        17 => ['t17_a','t17_b','t17_c',false,'t17_d','t17_e'], // prayer walking
        18 => ['t18_a','t18_b','t18_c'], // person of peace
        19 => ['t19_a'], // bless prayer
        20 => ['t20_a','t20_b','t20_c'], // faithfulness
        21 => ['t21_a','t21_b','t21_c'], // 3/3 group pattern
        22 => ['t22_a','t22_b','t22_c'], // training cycle
        23 => ['t23_a','t23_b','t23_c'], // leadership cells
        24 => ['t24_a','t24_b','t24_c'], // non-sequential
        25 => ['t25_a','t25_b','t25_c'], // pace
        26 => ['t26_a','t26_b','t26_c'], // part of two churches
        27 => ['t27_a','t27_b','t27_c'], // 3-month plan
        28 => ['t28_a','t28_b','t28_c','t28_d'], // coaching checklist
        29 => ['t29_a','t29_b','t29_c'], // leadership in networks
        30 => ['t30_a','t30_b','t30_c'], // peer mentoring groups
        31 => ['t31_a','t31_b','t31_c'], // four fields tool
        32 => ['t32_a','t32_b'], // generation mapping
    );

    return [
        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 1
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_1_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 1'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_1_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/5678.png',
                'Or zume.training/checkin and use code:',
                '5678'
            ],
        ],
        [
            'key' => 's1_1_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.'
            ],
        ],
        [
            'key' => 's1_1_4',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear these concepts:',
                [
                    'God Uses Ordinary People',
                    'Simple Definition of Disciple & Church',
                    'Spiritual Breathing'
                ],
                'And we will add these tools to our toolkit:',
                [
                    'SOAPS Bible Reading',
                    'Accountability Groups'
                ]
            ],
        ],
        [
            'key' => 't1_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'God Uses Ordinary People',
                'God uses ordinary people doing simple things to make a big impact.'
            ],
        ],
        [
            'key' => 't1_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '1', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't1_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?'
            ],
        ],
        [
            'key' => 't2_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Disciples and the Church',
                'Discover the essence of being a disciple, making a disciple, and what is the church.'
            ],
        ],
        [
            'key' => 't2_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '2', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't2_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'When you think of a church, what comes to mind?',
                    'What’s the difference between that picture and what’s described in the video as a "Simple Church"?',
                    'Which one do you think would be easier to multiply and why?'
                ]
            ],
        ],
        [
            'key' => 't3_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Hearing and Obeying God',
                'Spiritual breathing. We breathe in. We breathe out. We’re alive. Hearing and obeying God is like that, too.'
            ],
        ],
        [
            'key' => 't3_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '3', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't3_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Why is it essential to learn to hear and recognize God’s voice?',
                    'Is hearing and responding to the Lord really like breathing? Why or why not?',
                ]
            ],
        ],
        [
            'key' => 't4_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'SOAPS Bible Reading',
                'Hearing from God regularly is a key element in our personal relationship with Him, and in our ability to stay obediently engaged in what He is doing around us.',
            ],
        ],
        [
            'key' => 't4_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '4', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],

        ],
        [
            'key' => 't4_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(30 min)',
            ],
            'left' => [
                'Practice S.O.A.P.S.',
                'Break up and work individually through the S.O.A.P.S. Bible study pattern using Matthew 6:9-13. (20 min)',
                [
                    'Scripture',
                    'Observation',
                    'Application',
                    'Prayer',
                    'Sharing'
                ],
                'Return together and share your S.O.A.P.S. in groups of two or three. (10 min) '
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/4.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't5_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Accountability Groups',
                'The Bible tells us that every follower of Jesus will one day be held accountable for what we do and say and think.',
                'Accountability Groups are a great way to get ready!'
            ],
        ],
        [
            'key' => 't5_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '5', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't5_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(20 min)',
            ],
            'left' => [
                'Practice Accountability Groups',
                'Break into groups of two or three people of the same gender.',
                'Spend the next 20 minutes working together through the Accountability Questions.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/5.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's1_1_20',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'God Uses Ordinary People',
                    'Simple Definition of Disciple & Church',
                    'Spiritual Breathing'
                ],
                'Tools heard in this session:',
                [
                    'SOAPS Bible Reading',
                    'Accountability Groups'
                ]
            ],
        ],
        [
            'key' => 's1_1_21',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.',
                'Ask the Lord to guide you to challenge at least five people you know who are believers to begin their own S.O.A.P.S. Bible reading practice daily, and then do so.'
            ],
        ],





        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 2
         *
         *
         *
         *
         **************************************************************************************************************/

        [
            'key' => 's1_2_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 2'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_2_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/2468.png',
                'Or zume.training/checkin and use code:',
                '2468'
            ],
        ],
        [
            'key' => 's1_2_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'PRAY',
                '(5 min)'
            ],
            'right' => [
                'Ask if anyone in the group has specific needs they would like the group to pray for.',
                'Thank God that He promises in His Word to listen and act when His people pray.',
                'Ask God’s Holy Spirit to lead your time, together.'
            ],
        ],
        [
            'key' => 's1_2_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_2_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'Producer not Consumer',
                ],
                'And we will add these tools to our toolkit:',
                [
                    'Prayer Cycle',
                    'List of 100'
                ]
            ],
        ],
        [
            'key' => 't6_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Producer not Consumer',
                'If we want to make disciples who multiply – spiritual producers and not just consumers – then we need to learn and share four main ways God makes everyday followers more like Jesus:',
                [
                    'Prayer',
                    'Scripture',
                    'Body Life',
                    'Persecution and Suffering'
                ]
            ],
        ],
        [
            'key' => 't6_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '6', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't6_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Of the four areas detailed above (prayer, God’s Word, etc.), which ones do you already practice?',
                    'Which ones do you feel unsure about?',
                    'How ready do you feel when it comes to training others?',
                ]
            ],
        ],
        [
            'key' => 't7_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH'
            ],
            'right' => [
                'Prayer Cycle',
                'The Bible tells us that prayer is our chance to speak to and hear from the same God who created us!',
            ],
        ],
        [
            'key' => 't7_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '7', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't7_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(60 min)'
            ],
            'left' => [
                'Pray the Prayer Cycle for an hour individually',
                'Set a time for the group to return and reconnect. Be sure to add a few extra minutes for everyone to both find a quiet place to pray and to make their way back to the group.'
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/7.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't7_d',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'What is your reaction to spending an hour in prayer?',
                    'How do you feel?',
                    'Did you learn or hear anything?',
                    'What would life be like if you made this kind of prayer a regular habit?',
                ]
            ],
        ],
        [
            'key' => 't8_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH'
            ],
            'right' => [
                'List of 100',
                'God has already given us the relationships we need to "Go and make disciples."',
                'These are our family, friends, neighbors, co-workers and classmates – people we’ve known all our lives or maybe just met.',
                'Stewarding the relationships you have is the best place to start.',
            ],
        ],
        [
            'key' => 't8_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '8', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't8_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(30 min)'
            ],
            'left' => [
                'Create your own list of 100',
                'Have everyone in your group take the next 30 minutes to fill out their own list of relationships. List as many as you can.',
                'Then mark your best understanding of their relationship to God: disciple, unbeliever, or unknown.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/8.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's1_2_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'Review',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Consumer vs. Producer Lifestyle',
                ],
                'Tools heard in this session:',
                [
                    'Prayer Cycle',
                    'List of 100',
                ],
            ],
        ],
        [
            'key' => 's1_2_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'Obey',
                'Share',
            ],
            'right' => [
                'Spend time this week praying for five people from your List of 100 that you marked as an "Unbeliever" or "Unknown." Ask God to prepare their hearts to be open to His story.',
                'Ask God who He wants you to share the List of 100 tool with. Share this person’s name with the group before you go and reach out to them before the next session.'
            ],
        ],
        [ // final slide
            'key' => 's1_2_18',
            'type' => 'final',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png', // Zume logo
                'To saturate the world with multiplying disciples in our generation.',
                'https://storage.googleapis.com/zume-file-mirror/en/jesus-globe.png', // Jesus globe
                'Zume is a community of practice for those who want to see disciple making movements.'
            ],
            'left' => [],
            'right' => [],
        ],








        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 3
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_3_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 3'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_3_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/6543.png',
                'Or zume.training/checkin and use code:',
                '6543'
            ],
        ],
        [
            'key' => 's1_3_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)'
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's1_3_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.'
            ],
        ],
        [
            'key' => 's1_3_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'Spiritual Economy',
                ],
                'And we will add these tools to our toolkit:',
                [
                    'The Gospel',
                    'Baptism',
                ]
            ],
        ],
        [
            'key' => 't9_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Spiritual Economy',
                'In this broken world, people feel rewarded when they take, when they receive and when they gain more than those around them. But God’s Spiritual Economy is different – God invests more in those who are faithful with what they’ve already been given.'
            ],
        ],
        [
            'key' => 't9_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '9', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't9_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                'What are some differences you see between God’s Spiritual Economy and our earthly way of getting things done?',
            ],
        ],
        [
            'key' => 't10_a',
            'type' => 'center',
            'center' => [],
            'left' => [
                'Jesus said, “You will receive power when the Holy Spirit comes upon you. And you will be my witnesses, telling people about me everywhere – in Jerusalem, throughout Judea, in Samaria, and to the ends of the earth.”',
                'There’s no one “best way” to tell God’s story (also called The Gospel), because the best way will depend on who you’re sharing with. Every disciple should learn to tell God’s Story in a way that’s true to scripture and connects with the audience they’re sharing with.',
            ],
            'right' => [],
        ],
        [
            'key' => 't10_b',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'What comes to mind when you hear God’s command to be His "witness" and to tell His story?',
                    'Why do you think Jesus chose ordinary people instead of some other way to share His Good News?',
                    'What would it take for you to feel more comfortable sharing God’s Story?',
                ]
            ],
        ],
        [
            'key' => 't10_c',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'The Gospel',
                'One way to share God’s Good News is by telling God’s Story from Creation to Judgement – from the beginning of humankind all the way to the end of this age.',
            ],
        ],
        [
            'key' => 't10_d',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '10', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't10_e',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'What do you learn about mankind from this story?',
                    'What do you learn about God?',
                    'Do you think it would be easier or harder to share God’s Story by telling a story like this?',
                ]
            ],
        ],
        [
            'key' => 's1_3_8',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(45 min)'
            ],
            'left' => [
                'Share the Gospel',
                'Break into groups of two or three people and take turns telling the Gospel to each other.'
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/10.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't11_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Baptism',
                'Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…”',
            ],
        ],
        [
            'key' => 't11_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '11', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't11_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Have you ever baptized someone?',
                    'Would you even consider it?',
                    'If the Great Commission is for every follower of Jesus, does that mean every follower is allowed to baptize others? Why or why not?',
                ]
            ],
        ],
        [
            'key' => 't11_d',
            'type' => 'center',
            'center' => [],
            'left' => [
                'IMPORTANT REMINDER – Have you been baptized?',
                'If not, then we encourage you to plan this before even one more session of this training. Invite your group to be a part of this important day when you celebrate saying "yes" to Jesus.'
            ],
            'right' => [],
        ],

        [
            'key' => 's1_3_10',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'The Spiritual Economy',
                ],
                'Tools heard in this session:',
                [
                    'The Gospel',
                    'Baptism',
                ],
            ],
        ],
        [
            'key' => 's1_3_11',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Ask God who He wants you to train to use the Creation to Judgment story (or some other way to share God’s Story). Share this person’s name with the group before you go.',
                'Spend time this week practicing God’s Story, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."',
                'IMPORTANT REMINDER – Your group will be celebrating the Lord’s Supper next session. Be sure to remember the supplies (bread and wine / juice).', // bonus reminder
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 4
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_4_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 4'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_4_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/8764.png',
                'Or zume.training/checkin and use code:',
                '8764'
            ],
        ],
        [
            'key' => 's1_4_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'PRAY',
                '(5 min)'
            ],
            'right' => [
                'Pray and thank God that His ways are not our ways and His thoughts are not our thoughts.',
                'Ask Him to give each member of your group the mind of Christ — always focused on His Father’s work.',
            ],
        ],
        [
            'key' => 's1_4_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_4_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear these concepts:',
                [
                    'Vision Casting the Greatest Blessing',
                    'Duckling Discipleship',
                    'Eyes to See Where the Kingdom Isn’t',
                ],
                'And we will add these tools to our toolkit:',
                [
                    '3-Minute Testimony',
                    'The Lord’s Supper',
                ],
            ],
        ],
        [
            'key' => 't12_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                '3-Minute Testimony',
                'As followers of Jesus, we are “witnesses" for Him, because we “testify” about the impact Jesus has had on our lives. Your story of your relationship with God is called your Testimony. It’s powerful, and it’s something no one can share better than you.',
            ],
        ],
        [
            'key' => 't12_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '12', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't12_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(20 min)'
            ],
            'left' => [
                'Share your testimony',
                'Break into groups of two or three and practice sharing your testimony.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/12.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't13_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Great - Greater - Greatest Blessings',
                'Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.',
            ],
        ],
        [
            'key' => 't13_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '13', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't13_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Is this the pattern you were taught when you first began to follow Jesus? If not, what was different?',
                    'After you came to faith, how long was it before you began to disciple others?',
                    'What do you think would happen if new followers started sharing and discipling others, immediately?',
                ]
            ],
        ],
        [
            'key' => 't14_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Duckling Discipleship',
                'What do ducklings have to do with disciple making? They lead and follow at the same time.',
            ],
        ],
        [
            'key' => 't14_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '14', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't14_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'What is one area of discipleship (reading/understanding the Bible, praying, sharing God’s Story, etc.) that you want to learn more about? Who is someone that could help you learn?',
                    'What is one area of discipleship that you feel you could share with others? Who is someone that you could share with?',
                ]
            ],
        ],
        [
            'key' => 't15_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Eyes to See Where the Kingdom Isn’t',
                'Have you ever stopped to think about where God’s Kingdom... isn’t?',
                'Have you ever visited a home or a neighborhood or even a city where it seemed as if God was just... missing? These are usually the places where God wants to work the most.',
            ],
        ],
        [
            'key' => 't15_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '15', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't15_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Who are you more comfortable sharing with -- people you already know or people you haven’t met, yet?',
                    'Why do you think that is?',
                    'How could you get better at sharing with people you’re less comfortable with?',
                ]
            ],
        ],
        [
            'key' => 't16_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'The Lord’s Supper',
                'Jesus said, “I am the living bread that came down from heaven. Whoever eats this bread will live forever. This bread is my flesh, which I will give for the life of the world.”',
            ],
        ],
        [
            'key' => 't16_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '16', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't16_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(10 min)'
            ],
            'left' => [
                'Celebrate the Lord’s Supper',
                'Spend the next 10 minutes celebrating The Lord’s Supper with your group.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/16.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's1_4_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Vision Casting the Greatest Blessing',
                    'Duckling Discipleship',
                    'Eyes to See Where the Kingdom Isn’t',
                ],
                'Tools heard in this session:',
                [
                    '3-Minute Testimony',
                    'The Lord’s Supper',
                ],
            ],
        ],
        [
            'key' => 's1_4_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Spend time this week practicing your 3-Minute Testimony, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."',
                'Ask God who He wants you to train with the 3-Minute Testimony tool. Share this person’s name with the group before you go.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 5
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_5_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 5'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_5_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/6542.png',
                'Or zume.training/checkin and use code:',
                '6542'
            ],
        ],
        [
            'key' => 's1_5_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.',
            ],
        ],
        [
            'key' => 's1_5_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_5_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'Person of Peace',
                ],
                'And we will add these tools to our toolkit:',
                [
                    'B.L.E.S.S. Prayer',
                    'Prayer Walking',
                ],
            ],
        ],
        [
            'key' => 't17_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Prayer Walking',
                'Prayer Walking is a simple way to obey God’s command to pray for others. And it’s just what it sounds like – praying to God while walking around!',
            ],
        ],
        [
            'key' => 't17_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '17', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't18_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Person of Peace',
                'Disciple-making can be rapidly advanced by finding a person of peace, even in a place where followers of Jesus are few and far between.',
            ],
        ],
        [
            'key' => 't18_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '18', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't18_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Can someone who has a "bad reputation" (like the Samaritan woman or the demon-possessed man in the Gadarenes) really be a Person of Peace? Why or why not?',
                    'What is a community or segment of society near you that seems to have little (or no) Kingdom presence?',
                    'How could a Person of Peace (someone who is OPEN, HOSPITABLE, KNOWS OTHERS and SHARES) accelerate the spread of the Gospel in that community?',
                ]
            ],
        ],
        [
            'key' => 't19_a',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(10 min)',
            ],
            'left' => [
                'Practice the B.L.E.S.S. Prayer',
                'Break into groups of two or three and practice praying the five areas of the B.L.E.S.S. Prayer over each other.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/18.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't17_d',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(60 - 90 min)',
            ],
            'left' => [
                'Prayer Walking',
                [
                    'Break into groups of two or three and go out into the community to practice Prayer Walking.',
                    'Choosing a location can be as simple as walking outside from where you are now, or you could plan to go to a specific destination.',
                    'Go as God leads, and plan on spending 60-90 minutes on this activity.',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/17.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't17_e',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Before you go out on your Prayer Walking activity, be sure to pray with your group to end your time together.',
                'Thank God that He loves the lost, the last and the least – including us!',
                'Ask Him to prepare your heart and the heart of those you’ll meet during your walk to be open to His work.',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 6
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_6_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 6',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_6_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/1235.png',
                'Or zume.training/checkin and use code:',
                '1235'
            ],
        ],
        [
            'key' => 's1_6_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.',
            ],
        ],
        [
            'key' => 's1_6_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_6_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'Faithfulness is Better than Knowledge',
                ],
                'And we will add this tool to our toolkit:',
                [
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 't20_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Faithfulness',
                'When we help multiply disciples, we need to make sure we’re reproducing the right things. It’s important what disciples know – but it’s much more important what they DO with what they know.',
            ],
        ],
        [
            'key' => 't20_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '20', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't20_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'Think about God’s commands that you already know. How "faithful" are you in terms of obeying and sharing those things?'
            ],
        ],
        [
            'key' => 't21_a',
            'type' => 'center',
            'center' => [
                'ACTIVITY',
                '(75 min)',
            ],
            'left' => [
                '3/3 Group Meeting Pattern',
                'In the following video, you’ll be coached through an interactive 3/3 Group where you’ll learn a principle and then “press pause” and practice it with the group.',
            ],
            'right' => [],
        ],
        [
            'key' => 't21_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '21', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't21_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Did you notice any differences between a 3/3 Group and a Bible Study or Small Group you’ve been a part of (or have heard about) in the past? If so, how would those differences impact the group?',
                    'Could a 3/3 Group be considered a Simple Church? Why or why not?',
                ]
            ],
        ],
        [
            'key' => 's1_6_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Faithfulness is Better than Knowledge',
                ],
                'Tools heard in this session:',
                [
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 's1_6_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Spend time this week obeying, training, and sharing based on the commitments you’ve made during your 3/3 Group practice.',
                'Pray and ask God who He wants you to share the 3/3 Group format with before your group meets again. Share this person’s name with the group before you go.',
            ],
        ],







        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 7
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_7_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 7'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_7_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/4322.png',
                'Or zume.training/checkin and use code:',
                '4322'
            ],
        ],
        [
            'key' => 's1_7_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray and thank God for the group’s commitment to faithfully following Jesus and invite God’s Holy Spirit to lead your time together.',
            ],
        ],
        [
            'key' => 's1_7_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_7_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'The Training Cycle',
                ],
                'And we will add this tool to our toolkit:',
                [
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 't22_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'The Training Cycle',
                'Have you ever learned how to ride a bicycle? Have you ever helped someone else learn? If so, chances are you already know the Training Cycle.',
            ],
        ],
        [
            'key' => 't22_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '22', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't22_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Have you ever been a part of a Training Cycle?',
                    'Who did you train? Or who trained you?',
                    'Could the same person be at different parts of the Training Cycle while learning different skills?',
                    'What would it look like to train someone like that?',
                ]
            ],
        ],
        [
            'key' => 's1_7_6',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(60 - 90 min)',
            ],
            'left' => [
                '3/3 Group Meeting',
                [
                    'LOOK BACK – Use last session’s Obey, Train, and Share challenges to check-in with each other. (30 min)',
                    'LOOK UP – Use Mark 5:1-20 as your group’s reading passage and answer questions 1-4 during the Look Up section. (30 min)',
                    'LOOK FORWARD – Use questions 5, 6, and 7 in the Look Forward section to develop how you will Obey, Train and Share. (30 min)',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/27.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's1_7_7',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'What did you like best about the 3/3 Group? Why?',
                    'What was the most challenging? Why?',
                ]
            ],
        ],
        [
            'key' => 's1_7_8',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concept heard in this session:',
                [
                    'The Training Cycle',
                ],
                'Tool heard in this session:',
                [
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 's1_7_9',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Pick one skill or concept you have learned in Zúme and mentor someone to reproduce it to the fourth generation.',
                'Challenge the person you mentored to continue the process to an additional (fifth) generation.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 8
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_8_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 8',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_8_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/9870.png',
                'Or zume.training/checkin and use code:',
                '9870'
            ],
        ],
        [
            'key' => 's1_8_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray and thank God for giving your group the energy, the focus and the faithfulness to come so far in this training. Ask God to have His Holy Spirit remind everyone in the group that they can do nothing without Him!'
            ],
        ],
        [
            'key' => 's1_8_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_8_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'Leadership Cells',
                ],
                'And we will practice this tool from our toolkit:',
                [
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 't23_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Leadership Cells',
                'Jesus said, “Whoever wishes to become great among you shall be your servant.”',
                'A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.',
            ],
        ],
        [
            'key' => 't23_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '23', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't23_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Is there a group of followers of Jesus you know that are already meeting or would be willing to meet and form a Leadership Cell to learn Zúme Training?',
                    'What would it take to bring them together?',
                ]
            ],
        ],
        [
            'key' => 's1_8_6',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(60 -90 min)',
            ],
            'left' => [
                '3/3 Group Meeting',
                [
                    'LOOK BACK – Use last session’s Obey, Train, and Share challenges to check-in with each other. (30 min)',
                    'LOOK UP – Use Acts 2:42-47 as your group’s reading passage and answer questions 1- 4. (30 min)',
                    'LOOK FORWARD – Use questions 5, 6, and 7 to develop how you will Obey, Train and Share. (30 min)',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/21.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's1_8_7',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concept from this session:',
                [
                    'Leadership Cells',
                ],
                'Tool from this session:',
                [
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 's1_8_8',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Select some people from your List of 100 who are already believers. Explain Leadership Cells to them and see if they would be interested to be part of one.',
                'Pray and ask God who He wants you to share the Leadership Cell tool with before your group meets again. Challenge them to then share it with someone else.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 9
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_9_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 9',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_9_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/1355.png',
                'Or zume.training/checkin and use code:',
                '1355'
            ],
        ],
        [
            'key' => 's1_9_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'PRAY',
                '(5 min)',
            ],
            'right' => [
               'Pray as a group. Invited the Holy Spirit to guide your time together.',
            ],
        ],
        [
            'key' => 's1_9_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_9_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear these concepts:',
                [
                    'Non-Sequential Growth',
                    'Pace',
                    'Always Part of Two Churches',
                ],
                'And we will add this tool to our toolkit:',
                [
                    'Coaching Checklist',
                ],
            ],
        ],
        [
            'key' => 't24_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Non-Sequential Growth',
                'When people think about disciples multiplying, they often think of it as a step-by-step process. The problem with that is — that’s not how it works best!',
            ],
        ],
        [
            'key' => 't24_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '24', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't24_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'What is the most exciting idea you heard in this video? Why?',
                    'What is the most challenging idea? Why?',
                ]
            ],
        ],
        [
            'key' => 't25_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Pace',
                'Multiplying matters and multiplying quickly matters even more. Pace matters because where we all spend our eternity — an existence that outlasts time — is determined in the very short time we call “life.“',
            ],
        ],
        [
            'key' => 't25_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '25', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't25_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Why is pace important?',
                    'What do you need to change in your thinking, your actions, or your attitude to be better aligned with God’s priority for pace?',
                    'What is one thing you can do starting this week that will make a difference?',
                ]
            ],
        ],
        [
            'key' => 't26_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Always Part of Two Churches',
                'Jesus taught us that we are to stay close — to live as a small, spiritual family, to love and give our lives to one another, to celebrate and suffer — together.',
                'However, Jesus also taught us to leave our homes and loved ones behind and be willing to go anywhere — and everywhere — to share and start new spiritual families.',
                'So how can we do both?',
            ],
        ],
        [
            'key' => 't26_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '26', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't26_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'What are some advantages of maintaining a consistent spiritual family that gives birth to new ones that grow and multiply, instead of continually growing a family and splitting it in order to grow?',
            ],
        ],
        [
            'key' => 't28_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Coaching Checklist',
                'The Coaching Checklist is a simple tool you can use to help guide you as you assist others through various parts of becoming a fully equipped disciple.',
            ],
        ],
        [
            'key' => 't28_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '28', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't28_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(20 min)',
            ],
            'left' => [
                'Coaching Checklist',
                [
                    'Get Resource - Download the Coaching Checklist and print a copy for each person or use the online qr tool.',
                    'Assess Yourself - Evaluate yourself and mark the corresponding columns on the Coaching Checklist. (10 min)',
                    'Assess Someone Else - Chose a believer from your List of 100 and fill out the coaching checklist as if you were their coach. (10 min)',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't28_d',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Which Training Tools did you feel you would be able to train well?',
                    'Are there any Training Tools that you would add or subtract from the Checklist? Why?',
                ]
            ],
        ],
        [
            'key' => 's1_9_9',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Non-Sequential Growth',
                    'Pace of Multiplication Matters',
                    'Always Part of Two Churches',
                ],
                'Tools heard in this session:',
                [
                    'Coaching Checklist',
                ],
            ],
        ],
        [
            'key' => 's1_9_10',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Practice sharing the concept of “Pace” with a friend and pray for the Lord to ingrain it deeply within your heart and soul. Ask the Lord whom He would have you share it with.',
                'If you have already started your own simple church, share the concept  “Always a Part of Two Churches” with the people in it. If not, share it with another believer you know.',
            ],
        ],


        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 10
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_10_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 10'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_10_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/5430.png',
                'Or zume.training/checkin and use code:',
                '5430'
            ],
        ],
        [
            'key' => 's1_10_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'PRAY',
                '(5 min)'
            ],
            'right' => [
                'Pray and thank God that He is faithful to complete His good work in us. ',
                'Ask Him to give your group clear heads and open hearts to the great things He wants to do in and through you.',
                'Ask the Holy Spirit to lead your time together and thank Him for His faithfulness, too. He got you through!'
            ],
        ],
        [
            'key' => 's1_10_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's1_10_5',
            'type' => 'center',
            'center' => [],
            'left' => [
                'Be encouraged ...',
                'You may not know it, but you now have more practical training on starting simple churches and making disciples who multiply than many pastors and missionaries around the world!',
                'But, Zúme Training is only the beginning! In this session, we will make a plan for what happens post-training and briefly introduce tools you’ll need later in your journey as you implement what you’ve learned.',
            ],
            'right' => [
                 ],
        ],
        [
            'key' => 's1_10_6',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'Leadership in Networks',
                ],
                'And we will add these tools to our toolkit:',
                [
                    'Four Fields',
                    'Generational Mapping',
                    'Peer Mentoring Groups',
                    'Three-Month Plan',
                ],
            ],
        ],
        [
            'key' => 't29_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Leadership in Networks',
                'What happens to churches as they grow and start new churches that start new churches? How do they stay connected and live life together as an extended, spiritual family? They become a network!',
            ],
        ],
        [
            'key' => 't29_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '29', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't29_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'Are there advantages when networks of simple churches are connected by deep, personal relationships? What are some examples that come to mind?',
            ],
        ],
        [
            'key' => 't31_a',
            'type' => 'center',
            'center' => [],
            'left' => [
                'Four Fields Diagnostic Chart',
                'The Four Fields diagnostic chart is a simple tool to be used by a leadership cell to reflect on the status of current efforts and the Kingdom activity around them.',
                'Jesus often pulled the disciples back, away from ministry to quieter places to review how the work was going. This simple tool is to help you and the co-leaders with you to follow this pattern of Jesus and to address all parts of your stewardship.',
                'Review the next two slides: Field Descriptions and Four Fields Example',
            ],
            'right' => [],
        ],
        [
            'key' => 't31_b',
            'type' => 'center',
            'center' => [],
            'left' => [
                'Field Descriptions',
                [
                    'Empty Field: Where or with whom [what people groups] are you planning to extend the Kingdom?',
                    'Seeding Field: Where or with whom are you sharing the good news of the Kingdom? How are you doing that?',
                    'Growing Field: How are you equipping people and growing them spiritually, individually and in their natural networks?',
                    'Harvesting Field: How are new spiritual families [simple churches] being formed?',
                    'Multiplying Field: With whom, how and when are you filtering for faithful people and equipping them and holding them accountable for reproduction?',
                ],

            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't31_c',
            'type' => 'left_image',
            'center' => [
                'Four Fields Example',
            ],
            'left' => [
                'Four Fields Example',
                'https://storage.googleapis.com/zume-file-mirror/en/98.png',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Resource',
            ],
        ],
        [
            'key' => 't32_a',
            'type' => 'center',
            'center' => [],
            'left' => [
                'Generation Mapping',
                'Generational mapping (a.k.a. generation mapping or gen mapping) is another simple tool to help leaders in a movement understand the growth around them.',
                'A generation tree map can be drawn on a piece of paper or multiple pieces of paper. This map helps show where there are stops in multiplication and training might be required. Health of the movement is a top concern for leaders and fruitfulness is a top way to measure health.',
                'See the example on the next slide.',
            ],
            'right' => [],
        ],
        [
            'key' => 't32_b',
            'type' => 'left_image',
            'center' => [],
            'left' => [
                'Generation Mapping Example',
                'https://storage.googleapis.com/zume-file-mirror/en/104.png',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Resource',
            ],
        ],
        [
            'key' => 't30_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Peer Mentoring Groups',
                'Making disciples who make disciples means making leaders who make leaders. How do you develop stronger leaders? By teaching them how to love one another better. Peer Mentoring Groups help leaders love deeper.',
            ],
        ],
        [
            'key' => 't30_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '30', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't30_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(45 min)',
            ],
            'left' => [
                'Peer Mentoring Group Practice',
                'Break into groups of two or three and work through the 3/3 sections of the Peer Mentoring Group.',
                'To practice, choose one person to be the "mentee" for this session and have the other members work through the suggested questions list as peer mentors.',
                'By the time you’re finished, everyone should have a basic understanding of asking and answering.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 't27_a',
            'type' => 'center',
            'center' => [],
            'left' => [
                'Three-Month Plan',
                'In His Bible, God says, "I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future."',
                'God makes plans, and He expects us to make plans, too.',
                'A Three Month Plan is a tool you can use to help focus your attention and efforts and keep them aligned with God’s priorities for making disciples who multiply.',
                'The next slide will show you how to make your Three Month Plan. We recommend using the online tool.',
            ],
            'right' => [],
        ],
        [
            'key' => 't27_b',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(30 min)',
            ],
            'left' => [
                'Make your Three Month Plan',
                [
                    'Review Questions - All questions are optional, and intended as prompts for your plan. (5 min)',
                    'Listen - Take time to be as quiet as possible and listen to what God chooses to reveal. (10 min)',
                    'Write Plan - Respond to worksheet questions and use a piece of paper or the QR code to save your answers. (15 min)',
                ],
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Online Plan Tool',
            ],
        ],
        [
            'key' => 't27_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'Take turns sharing your Three Month Plans with each other.',
                'Find a training partner(s) that is willing to check in with you weekly. Commit to doing the same for them.',
            ],
        ],







        /**************************************************************************************************************/

        /**************************************************************************************************************/

        /**************************************************************************************************************/

        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 1
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_1_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 1'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_1_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/3354.png',
                'Or zume.training/checkin and use code:',
                '3354'
            ],
        ],
        [
            'key' => 's2_1_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.'
            ],
        ],
        [
            'key' => 's2_1_4',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
            'In this session, we will discuss these concepts:',
                [
                    'God Uses Ordinary People',
                    'Simple Definition of Disciple and Church',
                    'Spiritual Breathing is Hearing and Obeying God',
                ]
            ],
        ],
        [
            'key' => 's2_1_4',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'God Uses Ordinary People',
                    'Simple Definition of Disciple and Church',
                    'Spiritual Breathing is Hearing and Obeying God',
                ]
            ],
        ],
        [
            'key' => 's2_1_5',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Practice sharing these definitions with a friend and pray for the Lord to ingrain them deeply within your heart and soul. Ask the Lord whom He would have you share them with.',
                'Share the definitions with whomever the Lord impresses on you to do so with. Then equip them to share it with someone else.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 2
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_2_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 2'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_2_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/4568.png',
                'Or zume.training/checkin and use code:',
                '4568'
            ],
        ],
        [
            'key' => 's2_2_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_2_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_2_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will add this tool to our toolkit:',
                [
                    'S.O.A.P.S Bible Reading',
                ],
            ],
        ],
        [
            'key' => 's2_2_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Tool heard in this session:',
                [
                    'S.O.A.P.S Bible Reading',
                ],
            ],
        ],
        [
            'key' => 's2_2_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.',
                'Ask the Lord to guide you to challenge at least five people you know who are believers to begin their own S.O.A.P.S. Bible reading practice daily, and then do so.',
            ],
        ],


        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 3
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_3_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 3'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_3_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/8767.png',
                'Or zume.training/checkin and use code:',
                '8767'
            ],
        ],
        [
            'key' => 's2_3_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_3_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_3_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will add this tool to our toolkit:',
                [
                    'Accountability Groups',
                ]
            ],
        ],
        [
            'key' => 's2_3_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Tool heard in this session:',
                [
                    'Accountability Groups',
                ],
            ],
        ],
        [
            'key' => 's2_3_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Find an accountability partner (same gender) and begin meeting with them on a weekly basis.',
                'Ask the Lord to guide you to challenge at least five people you know who are believers to begin their own accountability group meeting, and then do so.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 4
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_4_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 4'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_4_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/6787.png',
                'Or zume.training/checkin and use code:',
                '6787'
            ],
        ],
        [
            'key' => 's2_4_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_4_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_4_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss the concept:',
                [
                    'Producer not Consumer',
                ],
                'And we will add this tool to our toolkit:',
                [
                    'Relational Stewardship - List of 100',
                ],
            ],
        ],
        [
            'key' => 's2_4_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concept heard in this session:',
                [
                    'Producer not Consumer',
                ],
                'Tool heard in this session:',
                [
                    'Relational Stewardship - List of 100',
                ],
            ],
        ],
        [
            'key' => 's2_4_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Spend time this week praying for five people from your List of 100 that you marked as an "Unbeliever" or "Unknown." Ask God to prepare their hearts to be open to His story.',
                'Ask God who He wants you to share the List of 100 tool with. Share this person’s name with the group before you go and reach out to them before the next session.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 5
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_5_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 5'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_5_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/3450.png',
                'Or zume.training/checkin and use code:',
                '3450'
            ],
        ],
        [
            'key' => 's2_5_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_5_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_5_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will add this tool to our toolkit:',
                [
                    'The Prayer Cycle',
                ]
            ],
        ],
        [
            'key' => 's2_5_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Tool heard in this session:',
                [
                    'The Prayer Cycle',
                ],
            ],
        ],
        [
            'key' => 's2_5_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Use the prayer wheel to guide you as you pray for an hour.',
                'Share the prayer wheel with whomever the Lord impresses on you to do so with.  Challenge them to share it with others as well.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 6
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_6_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 6'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_6_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/2344.png',
                'Or zume.training/checkin and use code:',
                '2344'
            ],
        ],
        [
            'key' => 's2_6_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_6_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_6_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss these concepts:',
                [
                    'Spiritual Economy',
                    'Vision Casting the Greatest Blessing',
                    'The Gospel and How to Share it',
                ]

            ],
        ],
        [
            'key' => 's2_6_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Spiritual Economy',
                    'Vision Casting the Greatest Blessing',
                    'The Gospel and How to Share it',
                ],
            ],
        ],
        [
            'key' => 's2_6_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'If you know anyone who follows Jesus but does not share their faith, challenge them to do so by sharing with them about the Greatest Blessing. Otherwise, practice sharing about it with a friend.',
                'Ask God who He wants you to share with about the Greatest Blessing. Share this person’s name with the group before you go and reach out to them.',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 7
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_7_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 7'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_7_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/1116.png',
                'Or zume.training/checkin and use code:',
                '1116'
            ],
        ],
        [
            'key' => 's2_7_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_7_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_7_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will practice this tool in our toolkit:',
                [
                    'Sharing the Gospel',
                ],
            ],
        ],
        [
            'key' => 's2_7_6',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(50 min)',
            ],
            'left' => [
                '',
                'Break into groups of two or three people and practice telling God’s Story. ',
                'Choose 5 people from your List of 100. Have someone pretend to be each of those five people, and practice telling God’s Story in a way that you think will make sense to that particular person.',
                'After you have practiced, switch. Repetition will bring confidence. By the time your finished, you ‘ll be ready to share God’s Story.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's2_7_7',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Tool heard in this session:',
                [
                    'Sharing the Gospel',
                ],
            ],
        ],
        [
            'key' => 's2_7_8',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Spend time this week practicing God’s Story, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."',
                'Ask God who He wants you to train to use the Creation to Judgment story (or some other way to share God’s Story). Share this person’s name with the group before you go.',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 8
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_8_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 8'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_8_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/5431.png',
                'Or zume.training/checkin and use code:',
                '5431'
            ],
        ],
        [
            'key' => 's2_8_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_8_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_8_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will add these tools to our toolkit:',
                [
                    'Baptism',
                    'The 3-Minute Testimony',
                ],
            ],
        ],
        [
            'key' => 's2_8_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Tool heard in this session:',
                [
                    'Baptism',
                    'The 3-Minute Testimony',
                ],
            ],
        ],
        [
            'key' => 's2_8_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'If you know anyone who follows Jesus but has not been baptized, challenge them to do so and offer to baptize them.',
                'Ask God who He wants you to share with about baptism. Share this person’s name with the group before you go and reach out to them before the next session.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 9
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_9_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 9'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_9_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/8768.png',
                'Or zume.training/checkin and use code:',
                '8768'
            ],
        ],
        [
            'key' => 's2_9_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_9_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_9_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will practice this tool in our toolkit:',
                [
                    'Sharing Your Testimony',
                ],
            ],
        ],
        [
            'key' => 's2_9_6',
            'type' => 'center',
            'center' => [
                'ACTIVITY',
                '(50 min)'
            ],
            'left' => [
                'Share Your Testimony',
                'Break into groups of two of three and practice sharing your Three-Minute Testimony.',
                'Choose 5 people from your List of 100. Have someone pretend to be each of those five people, and practice your Testimony in a way that you think will make sense to that particular person. After you’ve practiced, switch. Pretend to be someone else’s five people from the list. By the time you’re finished, you should be able to tell your Testimony in about 3 minutes or less.',
                'Repetition builds confidence.',
            ],
            'right' => [],
        ],
        [
            'key' => 's2_9_7',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Tool heard in this session:',
                [
                    'Sharing Your Testimony',
                ],
            ],
        ],
        [
            'key' => 's2_9_8',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Spend time this week practicing your testimony, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."',
                'Ask God who He wants you to train with the 3-Minute Testimony tool. Share this person’s name with the group before you go.',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 10
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_10_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 10'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_10_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/2347.png',
                'Or zume.training/checkin and use code:',
                '2347'
            ],
        ],
        [
            'key' => 's2_10_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_10_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_10_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss these concepts:',
                [
                    'Duckling Discipleship',
                    'Eyes to See Where the Kingdom Isn’t',
                ],
                'And we will add this tool to our toolkit:',
                [
                    'The Lord’s Supper',
                ],
            ],
        ],
        [
            'key' => 's2_10_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Duckling Discipleship',
                    'Eyes to See Where the Kingdom Isn’t',
                ],
                'Tool heard in this session:',
                [
                    'The Lord’s Supper',
                ],
            ],
        ],
        [
            'key' => 's2_10_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Practice sharing this concept with a friend and pray for the Lord to ingrain it deeply within your heart and soul.',
                'Share "Duckling Discipleship" and "Eyes to see where the Kingdom Isn’t" with whomever the Lord impresses on you. Then equip them to share it with someone else.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 11
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_11_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 11'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_11_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/9434.png',
                'Or zume.training/checkin and use code:',
                '9434'
            ],
        ],
        [
            'key' => 's2_11_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_11_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_11_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will add this tool to our toolkit:',
                [
                    'Prayer Walking',
                ],
            ],
        ],
        [
            'key' => 's2_11_6',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(60-90 min)'
            ],
            'left' => [
                'Prayer Walking',
                [
                    'Break into groups of two or three and go out into the community to practice Prayer Walking.',
                    'Choosing a location can be as simple as walking outside from where you are now, or you could plan to go to a specific destination.',
                    'Go as God leads, and plan on spending 60-90 minutes on this activity.',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 12
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_12_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 12'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_12_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/2348.png',
                'Or zume.training/checkin and use code:',
                '2348'
            ],
        ],
        [
            'key' => 's2_12_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_12_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_12_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss the concept:',
                [
                    'Person of Peace',
                ],
                'And we will add this tool to our toolkit:',
                [
                    'B.L.E.S.S. Prayer',
                ],
            ],
        ],
        [
            'key' => 's2_12_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concept heard in this session:',
                [
                    'Person of Peace',
                ],
                'Tool heard in this session:',
                [
                    'B.L.E.S.S. Prayer',
                ],
            ],
        ],
        [
            'key' => 's2_12_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Pray for someone in their presence using the BLESS pattern this week.',
                'Equip someone else to pray for others using the BLESS pattern and go with them as they do it.',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 13
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_13_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 13'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_13_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/6785.png',
                'Or zume.training/checkin and use code:',
                '6785'
            ],
        ],
        [
            'key' => 's2_13_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_13_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_13_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss these concepts:',
                [
                    'Faithfulness',
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 's2_13_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Faithfulness',
                    '3/3 Group Meeting Pattern',
                ],
            ],
        ],
        [
            'key' => 's2_13_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Spend time this week obeying, training, and sharing based on the commitments you’ve made during your 3/3 Group practice.',
                'Pray and ask God who He wants you to share the 3/3 Group format with before your group meets again. Share this person’s name with the group before you go.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 14
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_14_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 14'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_14_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/9872.png',
                'Or zume.training/checkin and use code:',
                '9872'
            ],
        ],
        [
            'key' => 's2_14_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_14_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_14_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will practice this tool in our toolkit:',
                [
                    '3/3 Group Meeting',
                ],
            ],
        ],
        [
            'key' => 's2_14_6',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(45 min)'
            ],
            'left' => [
                '3/3 Group Format',
                [
                    'LOOK BACK – Use last session’s Obey, Train, and Share challenges to check-in with each other. (15 min)',
                    'LOOK UP – Use Mark 5:1-20 as your group’s reading passage and answer questions 1-4 during the Look Up section. (15 min)',
                    'LOOK FORWARD – Use questions 5, 6, and 7 in the Look Forward section to develop how you will Obey, Train and Share. (15 min)',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's2_14_7',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Tool heard in this session:',
                [
                    '3/3 Group Meeting',
                ],
            ],
        ],
        [
            'key' => 's2_14_8',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Pray and ask God if he wants you to start a 3/3 Group. If He does, look over your list of 100 and ask God who you should invite to join you. Then invite them this week and trust God to build the group.',
                'Find someone to share the 3/3 Group format with before your group meets again. Share this person’s name with the group before you go.',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 15
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_15_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 15'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_15_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/4327.png',
                'Or zume.training/checkin and use code:',
                '4327'
            ],
        ],
        [
            'key' => 's2_15_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_15_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_15_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss these concepts:',
                [
                    'Training Cycle',
                    'Leadership Cells',
                ],
            ],
        ],
        [
            'key' => 's2_15_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Training Cycle',
                    'Leadership Cells',
                ],
            ],
        ],
        [
            'key' => 's2_15_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Pick one skill or concept you have learned in Zúme and mentor someone to reproduce it to the fourth generation.',
                'Share the "Training Cycle" with believer on your list of 100.',
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 16
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_16_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 16'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_16_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/2871.png',
                'Or zume.training/checkin and use code:',
                '2871'
            ],
        ],
        [
            'key' => 's2_16_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_16_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_16_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss these concepts:',
                [
                    'Expect Non-Sequential Growth',
                    'Pace',
                    'Always Part of Two Churches',
                ],
            ],
        ],
        [
            'key' => 's2_16_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Expect Non-Sequential Growth',
                    'Pace',
                    'Always Part of Two Churches',
                ],
            ],
        ],
        [
            'key' => 's2_16_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Begin efforts to catalyze another simple church (spiritual family), or your first one.',
                'If you have already started your own simple church, share the "Always Part of Two Churches" pattern with the people in it. If not, share it with another believer you know.',
            ],
        ],






        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 17
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_17_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 17'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_17_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/4328.png',
                'Or zume.training/checkin and use code:',
                '4328'
            ],
        ],
        [
            'key' => 's2_17_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_17_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_17_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss the concept:',
                [
                    'Three-Month Plan',
                ],
            ],
        ],
        [
            'key' => 's2_17_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concept heard in this session:',
                [
                    'Three-Month Plan',
                ],
            ],
        ],
        [
            'key' => 's2_17_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Set aside time on your calendar each week to work on your Three Month Plan. Plan check-ins with your training partner weekly. Each time you’re together, ask about their results and share yours, making sure you’re both working through your plans.',
                'Share your plan with your training partner. If you don’t have a training partner, share it with another believer you know.',
            ],
        ],






        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 18
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_18_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 18'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_18_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/6548.png',
                'Or zume.training/checkin and use code:',
                '6548'
            ],
        ],
        [
            'key' => 's2_18_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_18_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_18_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss these concepts:',
                [
                    'Coaching Checklist',
                    'Leadership in Networks',
                ],
            ],
        ],
        [
            'key' => 's2_18_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concepts heard in this session:',
                [
                    'Coaching Checklist',
                    'Leadership in Networks',
                ],
            ],
        ],
        [
            'key' => 's2_18_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Identify one next step for yourself, either Modeling, Assisting, Watching, or Leaving, that you need to take with the disciple you assessed with the coaching checklist.',
                'Share the concept of "Leadership in Networks" with someone else. If you don’t have a training partner, share it with another believer you know.',
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 19
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_19_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 19'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_19_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/7657.png',
                'Or zume.training/checkin and use code:',
                '7657'
            ],
        ],
        [
            'key' => 's2_19_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_19_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_19_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will discuss the concept:',
                [
                    'Peer Mentoring Groups',
                ],
            ],
        ],
        [
            'key' => 's2_19_6',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
            ],
            'right' => [
                'Concept heard in this session:',
                [
                    'Peer Mentoring Groups',
                ],
            ],
        ],
        [
            'key' => 's2_19_7',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Discuss with your Zúme training group whether or not the members are open to continuing to meet after the conclusion of the training as a Peer Mentoring Group.',
                'Share the concept of the "Peer Mentoring Group" with two believers on your list of 100.',
            ],
        ],





        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 20
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_20_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 20'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_20_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/2767.png',
                'Or zume.training/checkin and use code:',
                '2767'
            ],
        ],
        [
            'key' => 's2_20_3',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray as a group. Invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's2_20_4',
            'type' => 'look_back',
            'center' => [],
            'left' => [
                'LOOK BACK',
            ],
            'right' => [
                'Before getting started, take some time to look back.',
                'At the end of the last session, everyone in your group was challenged to practice what you learned.',
                'Take a few moments to see how your group did this week.',
            ],
        ],
        [
            'key' => 's2_20_5',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will add these tools to our toolkit:',
                [
                    'Four Fields Tool',
                    'Generation Mapping',
                ],
            ],
        ],






        /***************************************************************************************************************
         *
         *
         *
         *
         *     Final Slides (repeated on all versions)
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 'next_steps',
            'type' => 'next_steps',
            'center' => [
                'NEXT STEPS',
            ],
            'left' => [
                'Get a Coach',
                'If you don’t have one yet, this is one of the best steps you can take in growing as a multiplying disciple.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
            ],
            'right' => [
                'Join the Community',
                'Zúme is a community of practice for those who want to see disciple making movements. Our vision is to saturate the world with multiplying disciples in our generation. Check out how others are implementing Zúme Training in their lives and communities.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
            ],
        ],
        [
            'key' => 'congratulations',
            'type' => 'congratulations',
            'center' => [
                'CONGRATULATIONS',
                'on completing Zume Training!',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 'break',
            'type' => 'break',
            'center' => [
                'TAKE A BREAK',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 'final',
            'type' => 'final',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png', // Zume logo
                'To saturate the world with multiplying disciples in our generation.',
                'https://storage.googleapis.com/zume-file-mirror/en/jesus-globe.png', // Jesus globe
                'Zume is a community of practice for those who want to see disciple making movements.'
            ],
            'left' => [],
            'right' => [],
        ],

    ]; // end course array

} // end function
