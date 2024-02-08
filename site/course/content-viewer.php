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
        <style>
            #blank-template-body {
                padding: 1em;
                background-color: WhiteSmoke !important;
            }
            .card {
                padding: 1em;
                border: 1px solid #ccc;
                border-radius: 5px;
                height: 720px;
                width: 1280px;
                background-color: white;
            }
            .stage {
                height: 30px;
                text-align: center;
                background-color: white !important;
                margin-bottom: 5px;
            }
            .activity {
                height: 20px;
                text-align: center;
                background-color: white !important;
                margin-bottom: 10px;
            }
            .activity-right-4 {
                width: 33%;
                float: right;
                height: 620px;
                background-color: grey;
            }
            .activity-left-8 {
                width: 66%;
                float: left;
                height: 620px;
                background-color: blue;
            }
            .center {
                width: 100%;
                height: 700px;
            }
            .left-4 {
                width: 33%;
                float: left;
                height: 645px;
                background-color: grey;
            }
            .right-8 {
                width: 66%;
                float: right;
                height: 645px;
                background-color: blue;
            }
            .right-4 {
                width: 33%;
                float: right;
                height: 645px;
                background-color: grey;
            }
            .left-8 {
                width: 66%;
                float: left;
                height: 645px;
                background-color: blue;
            }
            .center-video {
                width: 100%;
                height: 100%;
                background-color: red;
            }
            .center-full {
                text-align:center;
                width: 100%;
                height: 100%;
                background-color: green;
            }
        </style>
        <?php
    }
    public function body(){
        ?>
        <select>
            <option value="">Select the Session</option>
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
        </select>

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

            });
        </script>
        <?php
    }

}
Zume_Content_Viewer::instance();


function zume_get_template( $slide ) {

    switch( $slide['type'] ) {
        case 'title':
            ?>
            <div class="card">
                <div class="center"></div>
            </div>
            <?php
            break;
        case 'checkin':
            ?>
            <div class="card">
                <div class="stage">&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634</div>
                <div class="center"></div>
            </div>
            <?php
            break;

        case 'activity':
        case 'activity_center':
            ?>
            <div class="card">
                <div class="stage">&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634</div>
                <div class="activity">Activity</div>
                <div class="center">
                    <div class="activity-left-8"></div>
                    <div class="activity-right-4"></div>
                </div>
            </div>
            <?php
            break;
        case 'challenge':
        case 'left_content':
            ?>
            <div class="card">
                <div class="stage">&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634</div>
                <div class="center">
                    <div class="left-8"></div>
                    <div class="right-4"></div>
                </div>
            </div>
            <?php
            break;
        case 'video':
            ?>
            <div class="card">
                <div class="center-video"></div>
            </div>
            <?php
            break;
        case 'final':
            ?>
            <div class="card">
                <div class="center"></div>
            </div>
            <?php
            break;
        case 'watch':
        case 'pray':
        case 'overview':
        case 'discuss':
        case 'review':
        case 'look_back':
        case 'obey':
        case 'right_content':
        default:
            ?>
            <div class="card">
                <div class="stage">&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634&#9476&#9634&#9634&#9634&#9476&#9634&#9634</div>
                <div class="center">
                    <div class="left-4"></div>
                    <div class="right-8"></div>
                </div>
            </div>
            <?php
            break;

    }
}

function zume_course_builder( $session_type = '10', $session_number = '1' ) {

    $session = [];

    if ( '10' === $session_type ) {
        switch( $session_number ) {
            case '1':
                $session = ['s_1', 's_2', 's_3', 's_4', 's_5', 's_6', 's_7', 's_8', 's_9', 's_10', 's_11', 's_12', 's_13', 's_14', 's_15', 's_16', 's_17', 's_18', 's_19', 's_20', 's_21', 's_22' ];
                break;
            case '2':
                $session = ['s_23','s_24','s_25','s_26','s_27','s_28','s_29','s_30','s_31','s_32','s_33','s_34','s_35','s_36','s_37','s_38','s_39','s_40','s_41','s_42'];
                break;
            case '3':
                $session = ['s_43','s_44','s_45','s_46','s_47','s_48','s_49','s_50','s_51','s_52','s_53','s_54','s_55','s_56','s_57','s_58','s_59','s_60','s_61','s_62'];
                break;
            case '4':
                $session = ['s_63','s_64','s_65','s_66','s_67','s_68','s_69','s_70','s_71','s_72','s_73','s_74','s_75','s_76','s_77','s_78','s_79','s_80','s_81','s_82','s_83','s_84','s_85','s_86','s_87','s_88'];
                break;
            case '5':
                $session = ['s_86','s_87','s_88','s_89','s_90','s_91','s_92','s_93','s_94','s_95','s_96','s_97','s_98','s_99'];
                break;
            case '6':
                $session = ['s_100','s_101','s_102','s_103','s_104','s_105','s_106','s_107','s_108','s_109','s_110','s_111','s_112','s_113'];
                break;
            case '7':
                $session = ['s_114','s_115','s_116','s_117','s_118','s_119','s_120','s_121','s_122','s_123','s_124','s_125','s_126'];
                break;
            case '8':
                $session = ['s_127','s_128','s_129','s_130','s_131','s_132','s_133','s_134','s_135','s_136','s_137','s_138'];
                break;
            case '9':
                $session = ['s_139','s_140','s_141','s_142','s_143','s_144','s_145','s_146','s_147','s_148','s_149','s_150','s_151','s_152','s_153','s_154','s_155','s_156','s_157','s_158','s_159','s_160','s_161'];
                break;
            case '10':
                $session = ['s_162','s_163','s_164','s_165','s_166','s_167','s_168','s_169','s_170','s_171','s_172','s_173','s_174','s_175','s_176','s_177','s_178','s_179','s_180','s_181','s_182','s_183','s_184','s_185','s_186','s_187','s_188','s_189','s_190','s_191','s_192','s_193','s_194','s_195','s_196','s_197','s_198','s_199','s_200','s_201','s_202','s_203','s_204','s_205','s_206','s_207','s_208','s_209','s_210','s_211','s_212','s_213','s_214','s_215','s_216','s_217','s_218','s_219','s_220','s_221','s_222','s_223','s_224','s_225','s_226','s_227','s_228','s_229','s_230','s_231','s_232','s_233','s_234','s_235','s_236','s_237','s_238','s_239','s_240','s_241','s_242'];
                break;
            default:
                return;
        }
    }
    else if ( '20' === $session_type ) {

    }

    $build = [];

    $content = zume_content();

    foreach( $content as $item ) {
        if ( in_array( $item['key'], $session ) ) {
            $build[] = $item;
        }
    }

    return $build;
}

function zume_content() {
    $samp = [
        'key' => '',
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
            'key' => 's_4',
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
            'key' => 's_5',
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
            'key' => 's_12',
            'type' => 'video',
            'center' => [
                '3' // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_13',
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
            'type' => 'activity',
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
            'key' => 's_18',
            'type' => 'video',
            'center' => [
                '5' // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_19',
            'type' => 'activity',
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
            'key' => 's_21',
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
            'key' => 's_27',
            'type' => 'overview',
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
            'type' => 'watch',
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
            'key' => 's_31',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_34',
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
            'key' => 's_35',
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
            'key' => 's_36',
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
            'key' => 's_37',
            'type' => 'video',
            'center' => [
                '8', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_38',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_39',
            'type' => 'additional_panel',
            'center' => [
                'List of 100 Examples',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_40',
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
            'key' => 's_41',
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
            'key' => 's_42',
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
            'key' => 's_43',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 3'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_44',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 6543'
            ],
        ],
        [
            'key' => 's_45',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)'
            ],
            'right' => [
                'Pray and thank God for the results and invite His Holy Spirit to lead your time together.'
            ],
        ],
        [
            'key' => 's_46',
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
            'key' => 's_47',
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
            'key' => 's_48',
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
            'key' => 's_49',
            'type' => 'video',
            'center' => [
                '9', // video
            ],
            'left' => [],
            'right' => [],
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
                'What are some differences you see between God’s Spiritual Economy and our earthly way of getting things done?',
            ],
        ],
        [
            'key' => 's_50',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'READ',
            ],
            'right' => [
                'Jesus said, “You will receive power when the Holy Spirit comes upon you. And you will be my witnesses, telling people about me everywhere – in Jerusalem, throughout Judea, in Samaria, and to the ends of the earth.”',
                'There’s no one “best way” to tell God’s story (also called The Gospel), because the best way will depend on who you’re sharing with. Every disciple should learn to tell God’s Story in a way that’s true to scripture and connects with the audience they’re sharing with.',
            ],
        ],
        [
            'key' => 's_51',
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
            'key' => 's_52',
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
            'key' => 's_53',
            'type' => 'video',
            'center' => [
                '10', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_54',
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
            'key' => 's_55',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(45 min)'
            ],
            'left' => [
                [
                    'Share the Gospel',
                    'Break into groups of two or three people and take turns telling the Gospel to each other.'
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_56',
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
            'key' => 's_57',
            'type' => 'video',
            'center' => [
                '11', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_58',
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
            'key' => 's_59',
            'type' => 'challenge',
            'center' => [
                'IMPORTANT REMINDER – Have you been baptized?',
                'If not, then we encourage you to plan this before even one more session of this training. Invite your group to be a part of this important day when you celebrate saying "yes" to Jesus.',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_60',
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
            'key' => 's_61',
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
        [ // final slide
            'key' => 's_62',
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


        // Session 4

        [
            'key' => 's_63',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 4'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_64',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 8764'
            ],
        ],
        [
            'key' => 's_65',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'PRAY',
                '(5 min)'
            ],
            'right' => [
                'Pray and thank God for the results and invite His Holy Spirit to lead your time together.',
            ],
        ],
        [
            'key' => 's_66',
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
            'key' => 's_67',
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
            'key' => 's_68',
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
            'key' => 's_69',
            'type' => 'video',
            'center' => [
                '12',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_70',
            'type' => 'activity',
            'center' => [],
            'left' => [
                'Share your testimony',
                'Break into groups of two or three and practice sharing your testimony.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_71',
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
            'key' => 's_72',
            'type' => 'video',
            'center' => [
                '13', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_73',
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
            'key' => 's_74',
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
            'key' => 's_75',
            'type' => 'video',
            'center' => [
                '14', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_76',
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
            'key' => 's_77',
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
            'key' => 's_78',
            'type' => 'video',
            'center' => [
                '15', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_79',
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
            'key' => 's_80',
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
            'key' => 's_81',
            'type' => 'video',
            'center' => [
                '16', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_82',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_83',
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
            'key' => 's_84',
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
        [ // final slide
            'key' => 's_85',
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

        // Session 5

        [
            'key' => 's_86',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 5'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_87',
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
            'key' => 's_88',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray and thank God for the results and invite His Holy Spirit to lead your time together.',
            ],
        ],
        [
            'key' => 's_89',
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
            'key' => 's_90',
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
            'key' => 's_91',
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
            'key' => 's_92',
            'type' => 'video',
            'center' => [
                '17', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_93',
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
            'key' => 's_94',
            'type' => 'video',
            'center' => [
                '18', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_95',
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
            'key' => 's_96',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_97',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_98',
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
        [
            'key' => 's_99',
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

        // Session 6

        [
            'key' => 's_100',
            'type' => 'title',
            'center' => [
                'Welcome to Zúme!',
                'Session 6',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_101',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 1235'
            ],
        ],
        [
            'key' => 's_102',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'Pray',
                '(5 min)',
            ],
            'right' => [
                'Pray and thank God for the results and invite His Holy Spirit to lead your time together.',
            ],
        ],
        [
            'key' => 's_103',
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
            'key' => 's_104',
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
            'key' => 's_105',
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
            'key' => 's_106',
            'type' => 'video',
            'center' => [
                '20', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_107',
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
            'key' => 's_108',
            'type' => 'activity_center',
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
            'key' => 's_109',
            'type' => 'video',
            'center' => [
                '21', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_110',
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
            'key' => 's_111',
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
            'key' => 's_112',
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
        [ // final slide
            'key' => 's_113',
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

        // Session 7

        [
            'key' => 's_114',
            'type' => 'title',
            'center' => [
                'Welcome to Zúme!',
                'Session 7',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_115',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 1356'
            ],
        ],
        [
            'key' => 's_116',
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
            'key' => 's_117',
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
            'key' => 's_118',
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
            'key' => 's_119',
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
            'key' => 's_120',
            'type' => 'video',
            'center' => [
                '22', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_121',
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
            'key' => 's_122',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_123',
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
            'key' => 's_124',
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
            'key' => 's_125',
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
        [ // final slide
            'key' => 's_126',
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

        // Session 8

        [
            'key' => 's_127',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 8',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_128',
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
            'key' => 's_129',
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
            'key' => 's_130',
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
            'key' => 's_131',
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
            'key' => 's_132',
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
            'key' => 's_133',
            'type' => 'video',
            'center' => [
                '23', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_134',
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
            'key' => 's_135',
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
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_136',
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
            'key' => 's_137',
            'type' => 'obey',
            'center' => [],
            'left' => [
                'OBEY',
                'SHARE',
            ],
            'right' => [
                'Select some people from your List of 100 who are already believers. Explain Leadership Cells to them and see if they would be interested to be part of one.',
                'Pray and ask God who He wants you to share the Leadership Cell tool with before your group meets again. Challenge them to then share it with someone else. Share this person’s name and who they shared it with.',
            ],
        ],
        [
            'key' => 's_138',
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

        // Session 9

        [
            'key' => 's_139',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 9',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_140',
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
            'key' => 's_141',
            'type' => 'pray',
            'center' => [],
            'left' => [
                'PRAY',
                '(5 min)',
            ],
            'right' => [
                'Pray and thank God that His ways are not our ways and His thoughts are not our thoughts.',
                'Ask Him to give each member of your group the mind of Christ — always focused on His Father’s work.',
            ],
        ],
        [
            'key' => 's_142',
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
            'key' => 's_143',
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
            'key' => 's_144',
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
            'key' => 's_145',
            'type' => 'video',
            'center' => [
                '24', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_146',
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
            'key' => 's_147',
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
            'key' => 's_148',
            'type' => 'video',
            'center' => [
                '25', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_149',
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
            'key' => 's_150',
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
            'key' => 's_151',
            'type' => 'video',
            'center' => [
                '26', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_152',
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
            'key' => 's_153',
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
            'key' => 's_154',
            'type' => 'video',
            'center' => [
                '28', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_155',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(10 min)',
            ],
            'left' => [
                'Coaching Checklist (Self-Assessment)',
                [
                    'Scan the QR code',
                    'Evaluate yourself and mark the corresponding column based on the following:',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],
        [
            'key' => 's_156',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Which Training Tools did you feel you would be able to train well?',
                    'Which ones made you feel vulnerable as a trainer?',
                    'Are there any Training Tools that you would add or subtract from the Checklist? Why?',
                ]
            ],
        ],
        [
            'key' => 's_157',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
                '(10 min)',
            ],
            'right' => [
                'Have each person share one next step, either Modeling, Assisting, Watching, or Leaving, that you need to take with the disciple you assessed with the coaching checklist.',
            ],
        ],
        [
            'key' => 's_158',
            'type' => 'center',
            'center' => [
                'REMEMBER',
                'The Coaching Checklist is a powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply.',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_159',
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
            'key' => 's_160',
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
        [ // final slide
            'key' => 's_161',
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

        // Session 10

        [
            'key' => 's_162',
            'type' => 'title',
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/zume-training-logo.png',  // location image
                'Session 10'
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_163',
            'type' => 'checkin',
            'center' => [],
            'left' => [
                'Check-in',
            ],
            'right' => [
                'Have all of the participants and facilitator check-in.',
                'https://storage.googleapis.com/zume-file-mirror/en/qr/checkin.png',
                'Or zume.training/checkin and use code 5430'
            ],
        ],
        [
            'key' => 's_164',
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
            'key' => 's_165',
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
            'key' => 's_166',
            'type' => 'overview',
            'center' => [],
            'left' => [
                'OVERVIEW',
            ],
            'right' => [
                'You may not know it, but you now have more practical training on starting simple churches and making disciples who multiply than many pastors and missionaries around the world!',
                'But, Zúme Training is only the beginning! In this session we will make a plan for what happens post-training and briefly introduce tools you’ll need later in your journey as you implement what you’ve learned.',
            ],
        ],
        [
            'key' => 's_167',
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
            'key' => 's_168',
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
            'key' => 's_169',
            'type' => 'video',
            'center' => [
                '29', // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's_170',
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
            'key' => 's_170',
            'type' => 'right_content',
            'center' => [],
            'left' => [
                'The Four Fields diagnostic chart is a simple tool to be used by a leadership cell to reflect on the status of current efforts and the Kingdom activity around them.',
                'Jesus often pulled the disciples back, away from ministry to quieter places to review how the work was going. This simple tool is to help you and the co-leaders with you to follow this pattern of Jesus and to address all parts of your stewardship.',
            ],
            'right' => [
                '',
            ],
        ],
        [
            'key' => 's_171',
            'type' => 'right_content',
            'center' => [],
            'left' => [
                'Four Fields',
                [
                    'Empty Field: Where or with whom [what people groups] are you planning to extend the Kingdom?',
                    'Seeding Field: Where or with whom are you sharing the good news of the Kingdom? How are you doing that?',
                    'Growing Field: How are you equipping people and growing them spiritually, individually and in their natural networks?',
                    'Harvesting Field: How are new spiritual families [simple churches] being formed?',
                    'Multiplying Field: With whom, how and when are you filtering for faithful people and equipping them and holding them accountable for reproduction?',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ],





    ]; // end array

}

