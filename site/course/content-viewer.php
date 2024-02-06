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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <?php
    }
    public function body(){
        ?>
        <pre>
            <?php
            print_r( zume_content() );
            ?>
        </pre>
        <?php
    }

}
Zume_Content_Viewer::instance();

function zume_content() {
    $samp = [
        'type' => 'single',
        'center' => [],
        'left' => [],
        'right' => [],
    ];

    return [
        // session 1
        [
            'key' => 's_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 1'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 5678'
            ],
        ],
        [
            'key' => 's_3',
            'type' => 'right_content',
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
            'key' => 's_4',
            'type' => 'right_content',
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
            'key' => 's_5',
            'type' => 'right_content',
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
            'key' => 's_6',
            'type' => 'video',
            'center' => [
                '1' // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_7',
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
            'key' => 's_8',
            'type' => 'right_content',
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
            'key' => 's_9',
            'type' => 'video',
            'center' => [
                '2' // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_10',
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
            'key' => 's_11',
            'type' => 'single',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Hearing and Obeying God',
                'Spiritual breathing. We breathe in. We breathe out. We’re alive. Hearing and obeying God is like that, too.'
            ],
        ],
        's_12' => [
            'key' => 'key_1',
            'type' => 'video',
            'center' => [
                '3' // video
            ],
            'left' => [],
            'right' => [],

        ],
        [
            'key' => 's_12',
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
            'key' => 's_14',
            'type' => 'single',
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
            'key' => 's_15',
            'type' => 'video',
            'center' => [
                '4' // video
            ],
            'left' => [],
            'right' => [],

        ],
        [
            'key' => 's_16',
            'type' => 'single',
            'center' => [],
            'left' => [
                'ACTIVITY',
                '(30 min)',
            ],
            'right' => [
                'Practice S.O.A.P.S.',
                '(20 min) Break up and work individually through the S.O.A.P.S. Bible study pattern using Matthew 6:9-13.',
                [
                    'Scripture',
                    'Observation',
                    'Application',
                    'Prayer',
                    'Sharing'
                ],
                '(10 min) Return together and share your S.O.A.P.S. in groups of two or three.'
            ],
        ],
        [
            'key' => 's_17',
            'type' => 'single',
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
            'key' => 's_18',
            'type' => 'single',
            'center' => [
                '5' // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_19',
            'type' => 'single',
            'center' => [],
            'left' => [
                'ACTIVITY',
                '(20 min)',
            ],
            'right' => [
                'Practice Accountability Groups',
                'Break into groups of two or three people of the same gender.',
                'Spend the next 20 minutes working together through the Accountability Questions.',
            ],
        ],
        [
            'key' => 's_20',
            'type' => 'single',
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
            'key' => 's_21',
            'type' => 'single',
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
        [ // final slide
            'key' => 's_22',
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

        // Session 2

        [
            'key' => 's_23',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 2'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_24',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 2468'
            ],
        ],
        [
            'key' => 's_25',
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
            'key' => 's_26',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_27',
            'type' => 'single',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'In this session, we will hear this concept:',
                [
                    'Consumer vs. Producer Lifestyle',
                ],
                'And we will add these tools to our toolkit:',
                [
                    'Prayer Cycle',
                    'List of 100'
                ]
            ],
        ],
        [
            'key' => 's_28',
            'type' => 'single',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Producers vs Consumers',
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
            'key' => 's_29',
            'type' => 'video',
            'center' => [
                '6', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_30',
            'type' => 'single',
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
            'key' => 's_31',
            'type' => 'single',
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
            'key' => 's_32',
            'type' => 'video',
            'center' => [
                '7', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_33',
            'type' => 'single',
            'center' => [
                'ACTIVITY',
                '(60 min)'
            ],
            'left' => [
                'Pray the Prayer Cycle for an hour individually',
                'Set a time for the group to return and reconnect. Be sure to add a few extra minutes for everyone to both find a quiet place to pray and to make their way back to the group.'
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_33',
            'type' => 'additional_panel',
            'center' => [
                'PRAYER CYCLE',
                '(60 min)',
            ],
            'left' => [
                'Praise',
                'Praise Him for things that are on your mind right now.',
                'Wait',
                'Be silent and let Him pull together reflections for you.',
                'Confess',
                'Ask the Holy Spirit to show you anything in your life that might be displeasing to Him.',
                'Read the Word',
                'Ask',
                '',
                'Make requests on behalf of yourself.',
                'Intercession',
                'Make requests on behalf of others.',
            ],
            'right' => [
                'Pray the Word',
                'Pray specific passages.',
                'Give Thanks',
                'Give thanks to the Lord for the things in your life.',
                'Sing',
                'Sing a song of praise',
                'Meditate',
                'Ask the Lord to speak to you.',
                'Listen',
                'Spend time merging the things you heard in the last hour.',
                'Praise',
                'Praise the Lord for the time you have had.'
            ],
        ],
        [
            'key' => 's_33',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                'What is your reaction to spending an hour in prayer?',
                'How do you feel?',
                'Did you learn or hear anything?',
                'What would life be like if you made this kind of prayer a regular habit?',
            ],
        ],
        [
            'key' => 's_33',
            'type' => 'single',
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
            'key' => 's_33',
            'type' => 'video',
            'center' => [
                '8', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_33',
            'type' => 'single',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_33',
            'type' => 'additional_panel',
            'center' => [
                'List of 100 Examples',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_33',
            'type' => 'single',
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
            'key' => 's_33',
            'type' => 'single',
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
            'key' => 's_22',
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

        // Session 3

        [
            'key' => 's_1',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 3'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_2',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 5678'
            ],
        ],
        's_42' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_43' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_44' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_45' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_46' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_47' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_48' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_49' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_50' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_51' => [
            'key' => 's_33',
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        //  'key' => 's_33',
        's_52' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_53' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_54' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_55' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_56' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_57' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_58' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_59' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_60' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_61' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_62' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_63' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_64' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_65' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_66' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_67' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_68' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_69' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_70' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_71' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_72' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_73' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_74' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_75' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_76' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_77' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_78' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_79' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_80' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_81' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_82' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_83' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_84' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_85' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_86' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_87' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_88' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_89' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_90' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_91' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_92' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_93' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_94' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_95' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_96' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_97' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_98' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_99' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_100' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_101' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_102' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_103' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_104' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_105' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_106' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_107' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_108' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_109' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_110' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_111' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_112' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_113' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_114' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_115' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_116' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_117' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_118' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_119' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_120' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_121' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_122' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_123' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_124' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_125' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_126' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_127' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_128' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_129' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_130' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_131' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_132' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_133' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_134' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_135' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_136' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_137' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_138' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_139' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_140' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_141' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_142' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_143' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_144' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_145' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_146' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_147' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_148' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_149' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_150' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_151' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_152' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_153' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_154' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_155' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_156' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_157' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_158' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_159' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_160' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_161' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_162' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_163' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_164' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_165' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_166' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_167' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_168' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_169' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_170' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_171' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_172' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_173' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_174' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_175' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_176' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_177' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_178' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_179' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
        's_180' => [
            'type' => 'single',
            'center' => [],
            'left' => [],
            'right' => [],
        ],
    ];

}



































































































