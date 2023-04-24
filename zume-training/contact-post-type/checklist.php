<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


/**
 * Class Zume_Coaching_Checklist_Magic_Link
 */
class Zume_Coaching_Checklist_Magic_Link extends DT_Magic_Url_Base {

    public $page_title = 'Coaching Checklist';
    public $page_description = 'Zúme personal coaching checklist.';
    public $root = "zume_app";
    public $type = 'coaching_checklist';
    public $type_name = 'Zúme Coaching Checklist';
    public $post_type = 'contacts';
    private $meta_key;
    public $show_bulk_send = true; // enables bulk send of magic links from list page
    public $show_app_tile = true; // enables app tile sharing features

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

        /**
         * post type and module section
         */
        add_action( 'rest_api_init', [ $this, 'add_endpoints' ] );

        /**
         * tests if other URL
         */
        $url = dt_get_url_path();
        if ( strpos( $url, $this->root . '/' . $this->type ) === false ) {
            return;
        }
        /**
         * tests magic link parts are registered and have valid elements
         */
        if ( !$this->check_parts_match() ){
            return;
        }

        // load if valid url
        add_action( 'dt_blank_body', [ $this, 'body' ] ); // body for no post key
        add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
        add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return $allowed_js;
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return $allowed_css;
    }

    /**
     * Writes custom styles to header
     *
     * @see DT_Magic_Url_Base()->header_style() for default state
     */
    public function header_style(){
        ?>
        <style>
            body {
                background-color: white;
                padding: 1em;
            }
        </style>
        <?php
    }

    /**
     * Writes javascript to the footer
     *
     * @see DT_Magic_Url_Base()->footer_javascript() for default state
     */
    public function footer_javascript(){
        ?>
        <script>
            // console.log('insert footer_javascript')

            let jsObject = [<?php echo json_encode([
                'map_key' => DT_Mapbox_API::get_key(),
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'parts' => $this->parts,
                'translations' => [
                    'add' => __( 'Add Magic', 'zume-coaching-checklist' ),
                ],
            ]) ?>][0]

            jQuery(document).ready(function($){
                // setup
                window.makeRequest( "POST", jsObject.parts.type, { action: 'get', parts: jsObject.parts }, jsObject.parts.root + '/v1/' ).done(function(data){
                    console.log(data)
                    jQuery.each(data, function(i,v){
                        if ( 'zume_coaching_checklist' === i.substr(0, 23) ) {
                            jQuery.each(v, function(ii,vv){

                                let btn = jQuery('.'+i+'_'+vv)
                                btn.removeClass('empty-select-button').addClass('selected-select-button')
                            })
                        }
                    })

                    jQuery('.loading-spinner').removeClass('active')
                })
                .fail(function(e) {
                    console.log(e)
                    jQuery('#error').html(e)
                })

                // listen for changes
                $('.dt_multi_select').on("click", function (e){
                    $(this).addClass("loading")
                    let key = $(this).data('field-key')
                    let item = $(this).data('option-key')
                    let btn = $('.'+key+'_'+item)

                    let turn_off = false
                    if (btn.hasClass('selected-select-button')){
                        turn_off = true
                        btn.removeClass('selected-select-button')
                        btn.addClass('empty-select-button')
                    } else {
                        btn.addClass('selected-select-button')
                        btn.removeClass('empty-select-button')
                    }

                    window.makeRequest( "POST", jsObject.parts.type, { action: 'update', parts: jsObject.parts, field_key: key, option_value: item, turn_off: turn_off }, jsObject.parts.root + '/v1/' ).done(function(data){
                        if ( 'on' === data ) {
                            btn.addClass('selected-select-button')
                            btn.removeClass('empty-select-button')
                        } else {
                            btn.removeClass('selected-select-button')
                            btn.addClass('empty-select-button')
                        }
                    })
                    .fail(function(e) {
                        console.log(e)
                        jQuery('#error').html(e)
                    })
                })

                $('.ost_button').on('click', function(e){
                    let fk = jQuery(this).data('field-key')
                    let ok = jQuery(this).data('option-key')

                    // if h is unchecked (cannot ost without h)
                    let hbtn = jQuery('.'+fk+'_h')
                    if ( ! ( hbtn.hasClass('selected-select-button') || hbtn.hasClass('added')  ) ){
                        hbtn.addClass('added').click()
                    }
                    // if t selected and s is unchecked. (cannot t without s)
                    if ( 't' === ok ) {
                        let sbtn = jQuery('.'+fk+'_s')
                        if ( ! ( sbtn.hasClass('selected-select-button') || sbtn.hasClass('added')  ) ){
                            sbtn.addClass('added').click()
                        }
                    }
                })

                // handle modals
                jQuery('.coaching-checklist-modal-open').on('click', function(){
                    let ccurl = jQuery(this).data('value')
                    jQuery('#modal-large-cc').foundation('open')
                    jQuery('#modal-large-cc-content').empty().append(`<iframe src="${ccurl}" style="width:100%;height:${window.innerHeight - 85}px;border:0;"></iframe>`)
                })
                jQuery('.additional-close').on('click', function(){
                    jQuery('#modal-large-cc').foundation('close')
                })
            })

        </script>
        <?php
        return true;
    }

    public function body(){
        $post_type = $this->post_type;
        $post_fields = DT_Posts::get_post_field_settings( $post_type, true );
        $post = DT_Posts::get_post( $post_type, $this->parts['post_id'], false, false, true );
        if ( is_wp_error( $post ) ) {
            dt_write_log( $post );
            return;
        }
        $zume_coaching_checklist_items = zume_coaching_checklist_items();
        ?>
        <div id="custom-style"></div>
        <div id="wrapper">
            <div class="grid-x" style="width: 100%;max-width:400px; margin: 0 auto;">
                <div class="cell center">
                    <h2 id="title">Zúme Coaching Checklist</h2>
                    <p><?php echo esc_html( $post['name'] ) ?></p>
                    <span class="loading-spinner active"></span>
                </div>
                <div class="cell">

                    <p><strong>Concepts</strong></p>
                    <?php
                    foreach ($post_fields as $field_key => $field_options ) :
                        if ( isset( $field_options["tile"] ) && $field_options["tile"] === "zume_coaching_checklist" ) :
                            $string = explode( '_', $field_key );
                            $id = $string[3];

                            if ( 'concept' === $zume_coaching_checklist_items[$id]['type'] ) :
                                $this->_row( $post, $post_fields, $field_key, $field_options, $zume_coaching_checklist_items[$id] );
                            endif;
                        endif;
                    endforeach;
                    ?>
                    <p><strong>Tools</strong></p>
                    <?php
                    foreach ($post_fields as $field_key => $field_options ) :
                        if ( isset( $field_options["tile"] ) && $field_options["tile"] === "zume_coaching_checklist" ) :
                            $string = explode( '_', $field_key );
                            $id = $string[3];
                            if ( 'tool' === $zume_coaching_checklist_items[$id]['type'] ) :
                                $this->_row( $post, $post_fields, $field_key, $field_options, $zume_coaching_checklist_items[$id] );
                            endif;
                        endif;
                    endforeach;
                    ?>

                    <?php
                    $total_done = 0;
                    $total = 0;
                    foreach ($post_fields as $field_key => $field_options ) {
                        if ( isset( $field_options["tile"] ) && $field_options["tile"] === "zume_coaching_checklist" ) {
                            $total += sizeof( $field_options["default"] );
                            if ( isset( $post[$field_key] ) ){
                                $total_done += sizeof( $post[$field_key] );
                            }
                        }
                    }
                    ?>
                    <p><?php esc_html_e( 'Completed', 'zume-coaching-checklist' ); ?> <?php echo esc_html( $total_done ); ?>/<?php echo esc_html( $total ); ?></p>
                    <hr>

                </div>
                <div class="cell">
                    <div class="grid-x grid-padding-x grid-padding-y">
                        <div class="cell small-1">
                            <button type="button" class="dt_multi_select empty-select-button select-button button" style="padding:5px" >H</button>
                        </div>
                        <div class="cell small-4">
                            <h2><strong>H</strong>eard</h2>
                        </div>
                        <div class="cell small-7">
                            Have you heard about the concept or skill? (If not, you can click the link and review.)
                        </div>
                        <div class="cell small-1">
                            <button type="button" class="dt_multi_select empty-select-button select-button button" style="padding:5px" >O</button>
                        </div>
                        <div class="cell small-4">
                            <h2><strong>O</strong>beyed</h2>
                        </div>
                        <div class="cell small-7">
                            Obeying a skill is to practice it. Obeying a concept is to accept it as good and right.
                        </div>
                        <div class="cell small-1">
                            <button type="button" class="dt_multi_select empty-select-button select-button button" style="padding:5px" >S</button>
                        </div>
                        <div class="cell small-4">
                            <h2><strong>S</strong>hared</h2>
                        </div>
                        <div class="cell small-7">
                            Have you shared the concept or skill with others?
                        </div>
                        <div class="cell small-1">
                            <button type="button" class="dt_multi_select empty-select-button select-button button" style="padding:5px" >T</button>
                        </div>
                        <div class="cell small-4">
                            <h2><strong>T</strong>rained</h2>
                        </div>
                        <div class="cell small-7">
                            Have you trained someone else in the concept or skill?
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="reveal large" id="modal-large-cc" data-v-offset="0" data-reveal>
            <h3 id="modal-large-cc-title">&nbsp;<span class="show-for-small-only additional-close">Return to Checklist</span></h3>
            <hr>
            <div id="modal-large-cc-content"></div>
            <button class="close-button" data-close aria-label="Close modal" type="button">
               <span class="hide-for-small-only additional-close"> Return to Checklist</span><span aria-hidden="true"> &times; </span>
            </button>
        </div>
        <?php
    }

    public function _row( $post, $post_fields, $field_key, $field_options, $item ) {
        $url = $item['url'] ?? 'https://zume.training/training';
        $post_fields[$field_key]["hidden"] = false;
        $post_fields[$field_key]["custom_display"] = false;

        ?>
        <div style="display: flex">
            <div style="flex-grow: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                <a data-value="<?php echo esc_url( $url ); ?>" class="coaching-checklist-modal-open" target="_blank"><?php echo esc_html( $field_options["name"] ); ?></a>
            </div>
            <div style="white-space:nowrap;">
                <div class="small button-group" style="display: inline-block; margin-bottom: 5px;">
                    <?php foreach ( $post_fields[$field_key]["default"] as $option_key => $option_value ): ?>
                        <button id="<?php echo esc_html( $option_key ) ?>" type="button"
                                data-field-key="<?php echo esc_html( $field_key ); ?>"
                                data-option-key="<?php echo esc_html( $option_key ) ?>"
                                class="dt_multi_select empty-select-button <?php echo esc_html( $field_key ); ?>_<?php echo esc_html( $option_key ) ?> select-button button <?php echo ( 'h' !== $option_key ) ? 'ost_button' :''; ?>" style="padding:5px">
                            <?php echo esc_html( $post_fields[$field_key]["default"][$option_key]["label"] ) ?>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * Register REST Endpoints
     * @link https://github.com/DiscipleTools/disciple-tools-theme/wiki/Site-to-Site-Link for outside of wordpress authentication
     */
    public function add_endpoints() {
        $namespace = $this->root . '/v1';
        register_rest_route(
            $namespace, '/'.$this->type, [
                [
                    'methods'  => "POST",
                    'callback' => [ $this, 'endpoint' ],
                    'permission_callback' => function( WP_REST_Request $request ){
                        $magic = new DT_Magic_URL( $this->root );
                        return $magic->verify_rest_endpoint_permissions_on_post( $request );
                    },
                ],
            ]
        );
    }

    public function endpoint( WP_REST_Request $request ) {
        $params = $request->get_params();
        $params = dt_recursive_sanitize_array( $params );

        if ( ! isset( $params['parts'], $params['action'] ) ) {
            return new WP_Error( __METHOD__, "Missing parameters", [ 'status' => 400 ] );
        }

        $post_id = $params["parts"]["post_id"]; //has been verified in verify_rest_endpoint_permissions_on_post()
        $action = sanitize_text_field( wp_unslash( $params['action'] ) );

        switch ( $action ) {
            case 'get':
                $p = DT_Posts::get_post( $this->post_type, $post_id, false, false );
                if ( is_wp_error( $p ) ) {
                    dt_write_log( $p );
                    return [];
                } else {
                    return $p;
                }
            case 'update':
                if ( isset( $params['field_key'] ) && !empty( $params['field_key'] ) && isset( $params['option_value'] ) && !empty( $params['option_value'] ) ){
                    $fields = [
                        $params['field_key'] => [
                            'values' => [
                                [
                                    'value' => $params['option_value'],
                                    'delete' => $params['turn_off']
                                ]
                            ]
                        ],
                    ];

                    $update = DT_Posts::update_post( $this->post_type, $post_id, $fields, false, false );
                    if ( is_wp_error( $update ) ){
                        return $update;
                    }

                    if ( $params['turn_off'] ) {
                        return 'off';
                    } else {
                        return 'on';
                    }
                }

                return false;
            default:
                return new WP_Error( __METHOD__, "Incorrect action", [ 'status' => 400 ] );
        }
    }

    /**
     * Post Type Tile Examples
     */
    public function dt_settings_apps_list( $apps_list ) {
        $apps_list[$this->meta_key] = [
            'key' => $this->meta_key,
            'url_base' => $this->root. '/'. $this->type,
            'label' => $this->page_title,
            'description' => $this->page_description,
        ];
        return $apps_list;
    }
}
Zume_Coaching_Checklist_Magic_Link::instance();




function zume_coaching_checklist_items() : array {
    return [
        1 => [
            'label' => _x( "God Uses Ordinary People", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "You'll see how God uses ordinary people doing simple things to make a big impact.",
            'url' => 'https://zume.training/god-uses-ordinary-people/',
            'type' => 'concept'
        ],
        2 => [
            'label' => _x( "Definition of Disciple & Church", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Discover the essence of being a disciple, making a disciple, and what is the church.",
            'url' => 'https://zume.training/definition-of-disciple-and-church/',
            'type' => 'concept'
        ],
        3 => [
            'label' => _x( "Breathing: Hearing & Obeying", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Being a disciple means we hear from God and we obey God.",
            'url' => 'https://zume.training/spiritual-breathing-is-hearing-and-obeying-god/',
            'type' => 'concept'
        ],
        4 => [
            'label' => _x( "SOAPS Bible Reading", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "A tool for daily Bible study that helps you understand, obey, and share God’s Word.",
            'url' => 'https://zume.training/soaps-bible-reading/',
            'type' => 'tool'
        ],
        5 => [
            'label' => _x( "Accountability Groups", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "A tool for two or three people of the same gender to meet weekly and encourage each other in areas that are going well and reveal areas that need correction.",
            'url' => 'https://zume.training/accountability-groups/',
            'type' => 'tool'
        ],
        6 => [
            'label' => _x( "Consumer vs Producer Lifestyle", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "You'll discover the four main ways God makes everyday followers more like Jesus.",
            'url' => 'https://zume.training/consumer-vs-producer-lifestyle/',
            'type' => 'concept'
        ],
        7 => [
            'label' => _x( "Prayer Wheel (Hour in Prayer)", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "See how easy it is to spend an hour in prayer.",
            'url' => 'https://zume.training/how-to-spend-an-hour-in-prayer/',
            'type' => 'tool'
        ],
        8 => [
            'label' => _x( "Relational Stewardship (List 100)", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "A tool designed to help you be a good steward of your relationships.",
            'url' => 'https://zume.training/relational-stewardship-list-of-100/',
            'type' => 'tool'
        ],
        9 => [
            'label' => _x( "Kingdom Economy", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn how God's economy is different from the world's. God invests more in those who are faithful with what they've already been given.",
            'url' => 'https://zume.training/the-kingdom-economy/',
            'type' => 'concept'
        ],
        10 => [
            'label' => _x( "How to Share the Gospel", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn a way to share God’s Good News from the beginning of humanity all the way to the end of this age.",
            'url' => 'https://zume.training/the-gospel-and-how-to-share-it/',
            'type' => 'tool'
        ],
        11 => [
            'label' => _x( "How to Baptize", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…” Learn how to put this into practice.",
            'url' => 'https://zume.training/baptism-and-how-to-do-it/',
            'type' => 'tool'
        ],
        12 => [
            'label' => _x( "3 Minute Testimony", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn how to share your testimony in three minutes by sharing how Jesus has impacted your life.",
            'url' => 'https://zume.training/prepare-your-3-minute-testimony/',
            'type' => 'tool'
        ],
        13 => [
            'label' => _x( "Greatest Blessing", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.",
            'url' => 'https://zume.training/vision-casting-the-greatest-blessing/',
            'type' => 'tool'
        ],
        14 => [
            'label' => _x( "Duckling Discipleship", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn what ducklings have to do with disciple-making.",
            'url' => 'https://zume.training/duckling-discipleship-leading-sooner/',
            'type' => 'concept'
        ],
        15 => [
            'label' => _x( "See Where the Kingdom Isn't", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Begin to see where God’s Kingdom isn’t. These are usually the places where God wants to work the most.",
            'url' => 'https://zume.training/eyes-to-see-where-the-kingdom-isnt/',
            'type' => 'concept'
        ],
        16 => [
            'label' => _x( "Lord's Supper", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "It’s a simple way to celebrate our intimate connection and ongoing relationship with Jesus. Learn a simple way to celebrate.",
            'url' => 'https://zume.training/the-lords-supper-and-how-to-lead-it/',
            'type' => 'tool'
        ],
        17 => [
            'label' => _x( "Prayer Walking", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "It’s a simple way to obey God’s command to pray for others. And it's just what it sounds like — praying to God while walking around!",
            'url' => 'https://zume.training/prayer-walking/',
            'type' => 'tool'
        ],
        18 => [
            'label' => _x( "Person of Peace", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn who a person of peace might be and how to know when you've found one.",
            'url' => 'https://zume.training/a-person-of-peace-and-how-to-find-one/',
            'type' => 'concept'
        ],
        19 => [
            'label' => _x( "BLESS Prayer Pattern", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Practice a simple mnemonic to remind you of ways to pray for others.",
            'url' => 'https://zume.training/the-bless-prayer-pattern/',
            'type' => 'tool'
        ],
        20 => [
            'label' => _x( "Faithfulness is Better", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "It's important what disciples know — but it's much more important what they DO with what they know.",
            'url' => 'https://zume.training/faithfulness-is-better-than-knowledge/',
            'type' => 'concept'
        ],
        21 => [
            'label' => _x( "3/3 Group Format", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "A 3/3 Group is a way for followers of Jesus to meet, pray, learn, grow, fellowship and practice obeying and sharing what they've learned. In this way, a 3/3 Group is not just a small group but a Simple Church.",
            'url' => 'https://zume.training/3-3-group-meeting-pattern/',
            'type' => 'tool'
        ],
        22 => [
            'label' => _x( "Training Cycle", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn the training cycle and consider how it applies to disciple making.",
            'url' => 'https://zume.training/training-cycle-for-maturing-disciples/',
            'type' => 'concept'
        ],
        23 => [
            'label' => _x( "Leadership Cells", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.",
            'url' => 'https://zume.training/leadership-cells/',
            'type' => 'concept'
        ],
        24 => [
            'label' => _x( "Non-Sequential Growth", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "See how disciple making doesn't have to be linear. Multiple things can happen at the same time.",
            'url' => 'https://zume.training/expect-non-sequential-growth/',
            'type' => 'concept'
        ],
        25 => [
            'label' => _x( "Pace Matters", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Multiplying matters and multiplying quickly matters even more.",
            'url' => 'https://zume.training/pace-of-multiplication-matters/',
            'type' => 'concept'
        ],
        26 => [
            'label' => _x( "Being Part of Two Churches", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn how to obey Jesus' commands by going AND staying.",
            'url' => 'https://zume.training/always-part-of-two-churches/',
            'type' => 'concept'
        ],
        27 => [
            'label' => _x( "Coaching Checklist", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "A powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply.",
            'url' => 'https://zume.training/coaching-checklist/',
            'type' => 'tool'
        ],
        28 => [
            'label' => _x( "Leadership in Networks", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Learn how multiplying churches stay connected and live life together as an extended, spiritual family.",
            'url' => 'https://zume.training/leadership-in-networks/',
            'type' => 'concept'
        ],
        29 => [
            'label' => _x( "Peer Mentoring Group", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "This is a group that consists of people who are leading and starting 3/3 Groups. It also follows a 3/3 format and is a powerful way to assess the spiritual health of God’s work in your area.",
            'url' => 'https://zume.training/peer-mentoring-groups/',
            'type' => 'concept'
        ],
        30 => [
            'label' => _x( "Four Fields Tool", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "The four fields diagnostic chart is a simple tool to be used by a leadership cell to reflect on the status of current efforts and the kingdom activity around them.",
            'url' => 'https://zume.training/four-fields-tool/',
            'type' => 'tool'
        ],
        31 => [
            'label' => _x( "Generational Mapping", "coaching checklist", 'zume-coaching-checklist' ),
            'description' => "Generation mapping is another simple tool to help leaders in a movement understand the growth around them.",
            'url' => 'https://zume.training/generational-mapping/',
            'type' => 'tool'
        ],
    ];
}

function zume_coaching_checklist_options() : array {
    return [
        "h" => [ "label" => _x( "H", "Coaching Checklist Initial for: Heard", 'zume-coaching-checklist' ) ],
        "o" => [ "label" => _x( "O", "Coaching Checklist Initial for: Obeying", 'zume-coaching-checklist' ) ],
        "s" => [ "label" => _x( "S", "Coaching Checklist Initial for: Sharing", 'zume-coaching-checklist' ) ],
        "t" => [ "label" => _x( "T", "Coaching Checklist Initial for: Training", 'zume-coaching-checklist' ) ],
    ];
}

function zume_write_checklist_row( $post, $post_fields, $field_key, $field_options, $item ) {
    $url = $item['url'] ?? 'https://zume.training/training';
    $post_fields[$field_key]["hidden"] = false;
    $post_fields[$field_key]["custom_display"] = false;

    ?>
    <div style="display: flex">
        <div style="flex-grow: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
            <a data-value="<?php echo esc_url( $url ); ?>" class="coaching-checklist-modal-open" target="_blank"><?php echo esc_html( $field_options["name"] ); ?></a>
        </div>
        <div style="white-space:nowrap;">
            <div class="small button-group" style="display: inline-block; margin-bottom: 5px;">
                <?php foreach ( $post_fields[$field_key]["default"] as $option_key => $option_value ): ?>
                    <?php
                    $class = ( in_array( $option_key, $post[$field_key] ?? [] ) ) ?
                        "selected-select-button" : "empty-select-button";
                    $ost = ( 'h' !== $option_key && "empty-select-button" === $class ) ? 'ost_button' : '';
                    ?>
                    <button id="<?php echo esc_html( $option_key ) ?>" type="button"
                            data-field-key="<?php echo esc_html( $field_key ); ?>"
                            data-option-key="<?php echo esc_html( $option_key ) ?>"
                            class="dt_multi_select <?php echo esc_html( $class ) ?> <?php echo esc_html( $field_key ); ?>_<?php echo esc_html( $option_key ) ?> select-button button <?php echo esc_html( $ost ) ?>" style="padding:5px">
                        <?php echo esc_html( $post_fields[$field_key]["default"][$option_key]["label"] ) ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <?php
}

class Zume_Coaching_Checklist_Tile
{
    public $page_title = 'Coaching Checklist';
    public $page_description = 'Zúme Coaching Checklist for Zúme Training.';
    public $root = "zume_app";
    public $type = 'coaching_checklist';
    public $post_type = 'contacts';
    private $meta_key = 'zume_app_coaching_checklist_magic_key';

    private static $_instance = null;
    public static function instance(){
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct(){
        add_filter( "dt_custom_fields_settings", [ $this, "dt_custom_fields_settings" ], 10, 2 );
    }

    /**
     * @param array $fields
     * @param string $post_type
     * @return array
     */
    public function dt_custom_fields_settings( array $fields, string $post_type = "" ) {
        if ( $post_type === "contacts" ){

            $options = zume_coaching_checklist_options();

            $zume_coaching_checklist_items = zume_coaching_checklist_items();

            foreach ( $zume_coaching_checklist_items as $item_key => $item ){
                $fields["zume_coaching_checklist_" . $item_key ] = [
                    "name" => $item['label'],
                    "description" => $item['description'],
                    "default" => $options,
                    "tile" => "zume_coaching_checklist",
                    "type" => "multi_select",
                    "hidden" => true,
                    "custom_display" => true,
                ];
            }
        }
        return $fields;
    }

    public function dt_settings_apps_list( $apps_list ) {
        $apps_list[$this->meta_key] = [
            'key' => $this->meta_key,
            'url_base' => $this->root. '/'. $this->type,
            'label' => $this->page_title,
            'description' => $this->page_description,
        ];
        return $apps_list;
    }

}
Zume_Coaching_Checklist_Tile::instance();
