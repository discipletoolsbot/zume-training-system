<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Course_20Session extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'course_app';
    public $type = '20session';
    public $lang = 'en';
    public static $token = 'course_app_10session';

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
//        wp_enqueue_style( 'course-app-presenter-css', plugin_dir_url(__FILE__) .  'presenter.css', [], fileatime( plugin_dir_path(__FILE__) . 'presenter.css' ) );
    }
    public function header_style(){
        ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/js/foundation.js" integrity="sha512-vsjtv6Dty7C9eeMlJ+02kvlhvVlqKsJHOFWZ1ZR5WrRlU/oTlW8d8wPHWlKX579O4OO/kW5DW9XFtQ9J3gKeKg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link href="https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/foundation-icons@2.0.0/foundation-icons.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <link rel="stylesheet" id="site-css-css" href="<?php echo plugin_dir_url(__FILE__) .  'presenter.css' ?>?ver=<?php echo time() ?>" type="text/css" media="all">
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();

                // Center the blocks vertically
                let section_height = jQuery('section').height()
                let blocks = jQuery('.section-block')
                jQuery.each( blocks, function( key, value ) {
                    let block_height = jQuery(value).height()
                    let remaining_height = section_height - block_height
                    remaining_height = remaining_height / 2 // half of the remaining height
                    remaining_height = remaining_height - 25 // subtract the top label padding
                    console.log(remaining_height)
                    if ( remaining_height > 0 ) {
                        jQuery(value).css('margin-top', remaining_height )
                    }
                })


                let video_remaining_height = window.innerHeight - 1080
                let video_top_margin = video_remaining_height / 2
                let video_blocks = jQuery('.video-inner-block')
                jQuery.each( video_blocks, function( key, value ) {
                    if ( video_top_margin > 0 ) {
                        jQuery(value).css('margin-top', video_top_margin)
                    } else {
                    }
                })

                jQuery('.video-placeholder').click(function(){
                    let video_id = jQuery(this).attr('data-video-id')
                    let video_iframe = '<iframe class="video-iframe" src="https://player.vimeo.com/video/' + video_id + '?autoplay=1&loop=0&autopause=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
                    jQuery(this).replaceWith(video_iframe)
                })

                jQuery('#hamburger-menu').click(function(){
                    jQuery('#offCanvas').foundation('open');
                })


                jQuery('section').click(function(e){
                    if ( jQuery(this).next()[0].id && ! jQuery(this).hasClass('video') ) {
                        Foundation.SmoothScroll.scrollToLoc('#'+jQuery(this).next()[0].id, {
                            duration: 1000,
                            threshold: 50,
                            offset: 100
                        }, function() {
                            console.log('scrolled');
                        });
                    }

                })
                jQuery('.menu-link').click(function(e){
                    e.preventDefault()
                    let section_id = jQuery(this).attr('data-section')
                    Foundation.SmoothScroll.scrollToLoc('#'+section_id, {
                        duration: 1000,
                        threshold: 50,
                        offset: 100
                    }, function() {
                        console.log('scrolled');
                    });
                    jQuery('#offCanvas').foundation('close')

                })

            })
        </script>
        <?php
    }
    public function body(){
        ?>

        <div id="hamburger-menu">
            <i class="fi-list"></i>
        </div>

        <div class="off-canvas position-left" id="offCanvas" data-off-canvas data-transition="overlap">
            <div style="text-align:center;padding: 1em;">
                <img src="https://zume5.training/wp-content/themes/zume-training-v5/assets/images/zume-logo.svg" width="150px" alt="Zume" >
                <br>
                20 Sessions
                <hr>
            </div>

            <!-- Your menu or Off-canvas content goes here -->
            <ul id="training-menu" class="vertical menu accordion-menu" data-accordion-menu data-multi-expand="true">
                <li>
                    <a class="uppercase">Session 1</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="section-check-in-1">Check in</a></li>
                        <li><a class="menu-link" data-section="section-group-prayer-1">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="section-overview-1">Overview</a></li>
                        <li><a class="menu-link" data-section="section-ordinary-people-1">God Uses Ordinary People <span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="section-definition-disciple">Simple Definition of a Disciple<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="section-spiritual-breathing-1">Spiritual Breathing<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="section-homework-1">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 2</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">S.O.A.P.S Bible Reading<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: S.O.A.P.S.<span>(35 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 3</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Accountability Groups<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Accountability Groups<span>(35 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 4</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Consumer vs. Producer Lifestyle<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Relational Stewardship - List of 100<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Create List of 100<span>(20 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 5</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">How to Spend an Hour in Prayer<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Prayer Cycle<span>(35 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 6</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">The Kingdom Economy<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Discuss: Should Every Disciple Share?<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Vision Casting the Greatest Blessing<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">The Gospel and How to Share It<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Prepare to Share the Gospel Next Week<span>(20 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 7</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Practice: Sharing the Gospel<span>(50 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 8</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Baptism and How to Do It<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Prepare Your 3-Minute Testimony<span>(20 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Prepare to Share Your Testimony Next Week<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 9</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Practice: Sharing Your Testimony<span>(50 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 10</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Duckling Discipleship - Leading Immediately<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Eyes to See Where the kingdom Isn't<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">The Lord's Supper and how to Lead It<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: The Lord's Supper<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 11</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Prayer Walking and How to Do It<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Prayer Walking<span>(35 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 12</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">A Person of Peace and How to Find One<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">The BLESS Prayer Pattern<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: BLESS Prayer<span>(20 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 13</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Faithfulness is Better Than Knowledge<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">3/3 Group Meeting Pattern<span>(35 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 14</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Practice: 3/3 Group<span>(50 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 15</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Discuss: 3/3 Group Experience from Last Two Weeks<span>(20 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Training Cycle for Maturing Disciples<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Leadership Cells<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 16</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Expect Non-Sequential Growth<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Pace of Multiiplication Matters<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Always Part of Two Churches<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 17</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Three-Month Plan<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Create Three-Month Plan<span>(25 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Discuss: Share Three-Month Plan with Group<span>(10 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 18</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Coaching Check-List<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Coaching Network Self-Assessment<span>(20 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Leadership in Networks<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 19</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Peer Mentoring Groups<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Peer Mentoring Groups<span>(35 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
                <li>
                    <a class="uppercase">Session 20</a>
                    <ul class="nested vertical menu">
                        <li><a class="menu-link" data-section="">Check in</a></li>
                        <li><a class="menu-link" data-section="">Look Back<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Group Prayer<span>(5 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Overview</a></li>
                        <li><a class="menu-link" data-section="">Four Fields Tools<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Four Fields<span>(10 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Generational Mapping<span>(15 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Practice: Generational Mapping<span>(10 min)</span></a></li>
                        <li><a class="menu-link" data-section="">Look Forward<span>(5 min)</span></a></li>
                    </ul>
                </li>
            </ul>
            <br><br><br><br><br><br><br><br>
        </div>
        <div class="off-canvas-content" data-off-canvas-content>

            <section id="section-check-in-1">
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="cell">
                            <span class="section-block-title "><?php esc_html_e( 'Session 1', 'zume' ) ?> : <?php esc_html_e( 'Check in', 'zume' ) ?></span>
                        </div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y center">
                        <div class="cell ">
                            <p class="section-instruction">
                                <?php esc_html_e( 'Have all participants of the training check-in.', 'zume' ) ?>
                            </p>
                        </div>
                        <div class="cell">
                            <p>
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=323a68&data=https://zume5.training/zume_app/checkin/?code=1354" width="300px" alt="QR Code" />
                            </p>
                            <p class="section-concept">
                                or <br>
                                zume.training/checkin and use code <strong class="text-lightblue"><a href="https://zume5.training/zume_app/checkin/?code=1354" target="_blank">1354</a></strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Group Prayer -->
            <section id="section-group-prayer-1">
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="cell">
                            <span class="section-block-title"><?php esc_html_e( 'Group Prayer (5min)', 'zume' ) ?></span>
                        </div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y single">
                        <div class="cell auto"></div>
                        <div class="large-9 cell activity-description well">
                            <div class="grid-x grid-padding-x grid-padding-y center" >
                                <div class="cell session-boxes">
                                    <?php esc_html_e( 'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.', 'zume' ) ?>
                                </div>
                            </div>
                        </div>
                        <div class="cell auto"></div>
                    </div>
                </div>
            </section>


            <!-- Watch and Discuss Series -->
            <section id="section-ordinary-people-1">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Consider This Thought', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-2 cell section-block-side"><img src="<?php echo $image_url . 'Hero-Thinking1.svg' ?>" /></div>
                        <div class="large-10 cell section-vertical-divider">
                            <div class="section-discussion">
                                <?php esc_html_e( 'God uses ordinary people doing simple things to make a big impact.', 'zume' ) ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="video" id="section-ordinary-people-2">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="video-inner-block">
                    <div class="grid-x grid-margin-x grid-margin-y" >
                        <div class="small-12 small-centered cell">
                            <div class="video-placeholder" data-video-id="<?php echo esc_attr( Zume_Course::get_video_by_key( '1', false ) ) ?>"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-ordinary-people-3">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="section-block-title cell"><?php esc_html_e( 'Discuss', 'zume' ) ?></div>
                        <div class="large-10 cell section-vertical-divider-right">
                            <div class="section-discussion">
                                <ol>
                                    <li><?php esc_html_e( 'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?', 'zume' ) ?></li>
                                </ol>
                            </div>
                        </div>
                        <div class="large-2 cell section-block-side">
                            <img src="<?php echo $image_url . 'TableofFour.svg' ?>" />
                        </div>
                    </div>
                </div>
            </section>


            <!-- Watch and Discuss Series -->
            <section id="section-definition-disciple-1">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Consider This Thought', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-2 cell section-block-side"><img src="<?php echo $image_url . 'Hero-Thinking1.svg' ?>" /></div>
                        <div class="large-10 cell section-vertical-divider">
                            <div class="section-discussion">
                                <?php esc_html_e( 'What is a disciple? And how do you make one? How do you teach a follower of Jesus to do what He told us in His Great Commission – to obey all of His commands?', 'zume' ) ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="video" id="section-definition-disciple-2">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="video-inner-block">
                    <div class="grid-x grid-margin-x grid-margin-y" >
                        <div class="small-12 small-centered cell">
                            <div class="video-placeholder" data-video-id="<?php echo esc_attr( Zume_Course::get_video_by_key( '2', false ) ) ?>"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-definition-disciple-3">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="section-block-title cell"><?php esc_html_e( 'Discuss', 'zume' ) ?></div>
                        <div class="large-10 cell section-vertical-divider-right">
                            <div class="section-discussion">
                                <ol>
                                    <li><?php esc_html_e( 'When you think of a church, what comes to mind?', 'zume' ) ?></li>
                                    <li><?php esc_html_e( 'What\'s the difference between that picture and what\'s described in the video as a "Simple Church"?', 'zume' ) ?>
                                    </li>
                                    <li><?php esc_html_e( 'Which one do you think would be easier to multiply and why?', 'zume' ) ?></li>
                                </ol>
                            </div>
                        </div>
                        <div class="large-2 cell section-block-side">
                            <img src="<?php echo $image_url . 'TableofFour.svg' ?>" /></div>
                    </div>
                </div>
            </section>



            <!-- Watch and Discuss Series -->
            <section id="section-spiritual-breathing-1">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Consider This Thought', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-2 cell section-block-side"><img src="<?php echo $image_url . 'Hero-Thinking1.svg' ?>" /></div>
                        <div class="large-10 cell section-vertical-divider">
                            <div class="section-discussion">
                                <?php esc_html_e( 'We breathe in. We breathe out. We\'re alive. Spiritual Breathing is like that, too.', 'zume' ) ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="video" id="section-spiritual-breathing-2">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="video-inner-block">
                    <div class="grid-x grid-margin-x grid-margin-y" >
                        <div class="small-12 small-centered cell">
                            <div class="video-placeholder" data-video-id="<?php echo esc_attr( Zume_Course::get_video_by_key( '3', false ) ) ?>"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-spiritual-breathing-3">
                <div class="section-top-label"><?php esc_html_e( 'Watch and Discuss (15min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="section-block-title cell"><?php esc_html_e( 'Discuss', 'zume' ) ?></div>
                        <div class="large-10 cell section-vertical-divider-right">
                            <div class="section-discussion">
                                <ol>
                                    <li><?php esc_html_e( 'Why is it essential to learn to hear and recognize God\'s voice?', 'zume' ) ?></li>
                                    <li><?php esc_html_e( 'Is hearing and responding to the Lord really like breathing? Why or why not?', 'zume' ) ?></li>
                                </ol>
                            </div>
                        </div>
                        <div class="large-2 cell section-block-side">
                            <img src="<?php echo $image_url . 'TableofFour.svg' ?>" />
                        </div>
                    </div>
                </div>
            </section>



            <!-- Listen and Read Series -->
            <section id="section-soaps-bible-1">
                <div class="section-top-label"><?php esc_html_e( 'Listen and Read Along (3min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Toolkit', 'zume' ) ?> : <?php esc_html_e( 'S.O.A.P.S. Bible Reading', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-2 cell section-block-side"><img src="<?php echo $image_url . 'Hero-Thinking1.svg' ?>" /></div>
                        <div class="large-10 cell section-vertical-divider">
                            <div class="section-discussion">
                                <p><?php esc_html_e( 'Hearing from God regularly is a key element in our personal relationship with Him, and in our ability to stay obediently engaged in what He is doing around us.', 'zume' ) ?></p>
                                <!--                        <p class="section-instruction">--><?php //esc_html_e( 'Find the "S.O.A.P.S. Bible Reading" section in your Zúme Guidebook and listen to the audio overview.', 'zume' ) ?><!--</p>-->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="video" id="section-soaps-bible-2">
                <div class="section-top-label"><?php esc_html_e( 'Listen and Read Along (3min)', 'zume' ) ?></div>
                <div class="video-inner-block">
                    <div class="grid-x grid-margin-x grid-margin-y" >
                        <div class="small-12 small-centered cell">
                            <div class="video-placeholder" data-video-id="<?php echo esc_attr( Zume_Course::get_video_by_key( '4', false ) ) ?>"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-soaps-bible-3">
                <div class="section-top-label"><?php esc_html_e( 'Practice (45min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Practice (45min)', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-8 cell section-vertical-divider-right">
                            <div class="section-instructions">
                                <ol>
                                    <li><?php esc_html_e( 'Break into groups of two or three people of the same gender.', 'zume' ) ?></li>
                                    <li><?php esc_html_e( 'Spend the next 45 minutes working together through Accountability Questions in the "Accountability Groups" section of the guidebook.', 'zume' ) ?></li>
                                </ol>
                            </div>
                        </div>
                        <div class="large-4 cell"><span class="sub-caption">Get the List</span><br><img src="<?php echo $image_url . 'download-en-book.png' ?>" /><br>or<br>zume.training/accountability</div>
                    </div>
                </div>
            </section>
            <section id="section-soaps-bible-4">
                <div class="section-top-label"><?php esc_html_e( 'Debrief (45min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Practice (45min)', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-8 cell section-vertical-divider-right">
                            <div class="section-instructions">
                                <ol>
                                    <li><?php esc_html_e( 'Break into groups of two or three people of the same gender.', 'zume' ) ?></li>
                                    <li><?php esc_html_e( 'Spend the next 45 minutes working together through Accountability Questions in the "Accountability Groups" section of the guidebook.', 'zume' ) ?></li>
                                </ol>
                            </div>
                        </div>
                        <div class="large-4 cell"><span class="sub-caption">Get the List</span><br><img src="<?php echo $image_url . 'download-en-book.png' ?>" /><br>or<br>zume.training/accountability</div>
                    </div>
                </div>
            </section>


            <!-- Listen and Read Series -->
            <section id="section-accountability-1">
                <div class="section-top-label"><?php esc_html_e( 'Listen and Read Along (3min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Toolkit', 'zume' ) ?>: <?php esc_html_e( 'Accountability Groups', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-2 cell section-block-side"><img src="<?php echo $image_url . 'Hero-Thinking1.svg' ?>" /></div>
                        <div class="large-10 cell section-vertical-divider">
                            <div class="section-discussion">
                                <p><?php esc_html_e( 'The Bible tells us that every follower of Jesus will one day be held accountable for what we do and say and think. Accountability Groups are a great way to get ready!', 'zume' ) ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="video" id="section-accountability-2">
                <div class="section-top-label"><?php esc_html_e( 'Listen and Read Along (3min)', 'zume' ) ?></div>
                <div class="video-inner-block">
                    <div class="grid-x grid-margin-x grid-margin-y" >
                        <div class="small-12 small-centered cell">
                            <div class="video-placeholder" data-video-id="<?php echo esc_attr( Zume_Course::get_video_by_key( '5', false ) ) ?>"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-accountability-3">
                <div class="section-top-label"><?php esc_html_e( 'Practice (45min)', 'zume' ) ?></div>
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell"><?php esc_html_e( 'Practice (45min)', 'zume' ) ?></div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y align-middle">
                        <div class="large-8 cell section-vertical-divider-right">
                            <div class="section-instructions">
                                <ol>
                                    <li><?php esc_html_e( 'Break into groups of two or three people of the same gender.', 'zume' ) ?></li>
                                    <li><?php esc_html_e( 'Spend the next 45 minutes working together through Accountability Questions in the "Accountability Groups" section of the guidebook.', 'zume' ) ?></li>
                                </ol>
                            </div>
                        </div>
                        <div class="large-4 cell"><span class="sub-caption">Get the List</span><br><img src="<?php echo $image_url . 'download-en-book.png' ?>" /><br>or<br>zume.training/accountability</div>
                    </div>
                </div>
            </section>


            <section id="section-homework-1"><!-- Step Title -->
                <div class="section-block">
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="section-block-title cell">
                            <?php esc_html_e( 'Congratulations! You\'ve completed Session 1.', 'zume' ) ?>
                        </div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="large-3 cell activity-title"><?php esc_html_e( 'OBEY', 'zume' ) ?></div>
                        <div class="large-9 cell activity-description">
                            <?php esc_html_e( 'Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.', 'zume' ) ?>
                        </div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="large-3 cell activity-title"><?php esc_html_e( 'SHARE', 'zume' ) ?></div>
                        <div class="large-9 cell activity-description">
                            <?php esc_html_e( 'Spend time asking God who He might want you to start an Accountability Group with using the tools you\'ve learned in this session. Share this person’s name with the group before you go. Reach out to that person about starting an Accountability Group and meeting with you weekly.', 'zume' ) ?>

                        </div>
                    </div>
                    <div class="grid-x grid-margin-x grid-margin-y">
                        <div class="large-3 cell activity-title">
                            <?php esc_html_e( 'PRAY', 'zume' ) ?>
                        </div>
                        <div class="large-9 cell activity-description">
                            <?php esc_html_e( 'Pray that God helps you be obedient to Him and invite Him to work in you and those around you!', 'zume' ) ?>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <?php
    }
}
Zume_Course_20Session::instance();
