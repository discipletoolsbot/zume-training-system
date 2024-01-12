<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Follow_Jesus extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'how-to-follow-jesus';
    public $lang = 'en';
    public static $token = 'zume_app_follow_jesus';

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
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->set_locale( $lang_code );

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', '__return_true', 100, 1 );
            add_filter( 'dt_allow_non_login_access', '__return_true', 100, 1 );
            add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );

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
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();

                const piecesContent = document.querySelector('#pieces-content')
                const lang = '<?php echo esc_attr( $this->lang ) ?>'


                document.querySelectorAll('.open-modal').forEach((element) => {
                    element.addEventListener('click', (event) => {
                        const { value, tool } = event.srcElement.dataset

                        piecesContent.innerHTML = `<span class="loading-spinner active"></span>`

                        makeRequest( 'GET', 'piece', { id: value, lang, strings: [<?php echo json_encode([
                            'wtv' => esc_html__( 'Watch This Video', 'zume' ),
                            'ay' => esc_html__( 'Ask Yourself', 'zume' ),
                            'd' => esc_html__( 'Download Free Guidebook', 'zume' ),
                            'lra' => esc_html__( 'Listen and Read Along', 'zume' ),
                        ]) ?>][0] }, 'zume_system/v1' )
                            .done(function (data) {
                                piecesContent.innerHTML = data
                            })

                        jQuery('#pieces-wrapper').foundation('open')

                    })
                })
            });
        </script>
        <?php
    }

    public function body(){
        global $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="cover | position-relative">
            <div class="hidden multiply-cover color flip show-for-large"></div>
            <div class="hidden multiply-cover color show-for-large"></div>
            <div class="container-xsm stack-2 | page">
                <h1 class="text-center"><?php echo esc_html__( 'How to Follow Jesus', 'zume' ) ?></h1>
                <div class="video-thumbnail shadow position-relative rounded">
                    <div class="responsive-embed widescreen m0">
                        <iframe width="640" height="360" src="<?php echo esc_url( Zume_Course::get_video_by_key( '68' ) ) ?>" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div class="video-thumbnail__footer bg-brand-light white text-center stack p-1">
                        <p class="w-80 mx-auto"><?php echo esc_html__( 'Watch this important video explaining the 4 relationships of your new life', 'zume' ) ?></p>
                    </div>
                </div>
                <p class="hidden mx-auto"><?php echo esc_html__( 'The sections below, will teach you what it means to be a follower (disciple) of Jesus', 'zume' ) ?></p>

                <a href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="mx-auto btn large light uppercase"><?php echo esc_html__( 'Register', 'zume' ) ?></a>
            </div>
        </div>

        <div class="page bg-gray-100">
            <div class="container-md center">
                <ul class="stack-2 | accordion" data-accordion>
                    <li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What is a follower of Jesus?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <div class="container stack">
                                <p>
                                    <strong><a data-value="20730" data-tool="1" id="god-uses-ordinary-people" class="open-modal"><?php esc_html_e( 'God Uses Ordinary People', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( "You'll see how God uses ordinary people doing simple things to make a big impact.", 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><a data-value="20731" data-tool="2" id="simple-definition-of-disciple-and-church" class="open-modal"><?php esc_html_e( 'Simple Definition of Disciple and Church', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( 'Discover the essence of being a disciple, making a disciple, and what is the church.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><a data-value="20744" data-tool="13" id="vision-casting-the-greatest-blessing"  class="open-modal"><?php esc_html_e( 'Vision Casting the Greatest Blessing', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( 'Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.', 'zume' ) ?>
                                </p>
                            </div>

                        </div>
                    </li><li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What are the activities of a follower of Jesus?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <div class="container stack-2">
                                <p>
                                    <strong><a data-value="20737" data-tool="6" id="consumer-vs-producer-lifestyle" class="open-modal"><?php esc_html_e( 'Consumer vs Producer Lifestyle', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( "You'll discover the four main ways God makes everyday followers more like Jesus.", 'zume' ) ?>
                                </p>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Prayer', 'zume' ) ?></h4>
                                    <p>
                                        <strong><a data-value="20732" data-tool="3" id="spiritual-breathing-is-hearing-and-obeying-god" class="open-modal"><?php esc_html_e( 'Spiritual Breathing is Hearing and Obeying God', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Being a disciple means we hear from God and we obey God.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20738" data-tool="7" id="how-to-spend-an-hour-in-prayer"  class="open-modal"><?php esc_html_e( 'How to Spend an Hour in Prayer', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'See how easy it is to spend an hour in prayer.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20749" data-tool="19" id="the-bless-prayer-pattern" class="open-modal"><?php esc_html_e( 'The BLESS Prayer Pattern', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Practice a simple mnemonic to remind you of ways to pray for others.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Bible Reading', 'zume' ) ?></h4>
                                    <p>
                                        <strong><a data-value="20733" data-tool="4" id="soaps-bible-reading" class="open-modal"><?php esc_html_e( 'SOAPS Bible Reading', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'A tool for daily Bible study that helps you understand, obey, and share God’s Word.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a  data-value="20751" data-tool="20" id="faithfulness-is-better-than-knowledge" class="gmo open-modal"><?php esc_html_e( 'Faithfulness is Better Than Knowledge', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "It's important what disciples know — but it's much more important what they DO with what they know.", 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Community', 'zume' ) ?></h4>
                                    <p>
                                        <strong><a data-value="20752" data-tool="21" id="3-3-group-meeting-pattern" class="open-modal"><?php esc_html_e( '3/3 Group Meeting Pattern', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "A 3/3 Group is a way for followers of Jesus to meet, pray, learn, grow, fellowship and practice obeying and sharing what they've learned. In this way, a 3/3 Group is not just a small group but a Simple Church.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20735" data-tool="5" id="accountability-groups" class="open-modal"><?php esc_html_e( 'Accountability Groups', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'A tool for two or three people of the same gender to meet weekly and encourage each other in areas that are going well and reveal areas that need correction.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20758" data-tool="26" id="always-part-of-two-churches" class="open-modal"><?php esc_html_e( 'Always Part of Two Churches', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "Learn how to obey Jesus' commands by going AND staying.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20747" data-tool="16" id="the-lords-supper-and-how-to-lead-it" class="open-modal"><?php esc_html_e( 'The Lord’s Supper and How To Lead It', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "It's a simple way to celebrate our intimate connection and ongoing relationship with Jesus. Learn a simple way to celebrate.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20742" data-tool="11" id="baptism-and-how-to-do-it" class="open-modal"><?php esc_html_e( 'Baptism and How To Do It', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…” Learn how to put this into practice.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Sacrifice and Suffering', 'zume' ) ?></h4>
                                    <p>
                                        <strong><a data-value="20740" data-tool="9" id="the-kingdom-economy" class="open-modal"><?php esc_html_e( 'The Kingdom Economy', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "Learn how God's economy is different from the world's. God invests more in those who are faithful with what they've already been given.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20746" data-tool="15" id="eyes-to-see-where-the-kingdom-isnt" class="open-modal"><?php esc_html_e( 'Eyes to See Where The Kingdom Isn’t', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Begin to see where God’s Kingdom isn’t. These are usually the places where God wants to work the most.', 'zume' ) ?>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </li><li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'How do I obey Jesus and help others become followers with me?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <div class="container stack-2">
                                <p class="container-md">
                                    <em><?php esc_html_e( 'Then Jesus came to them and said, "All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age."', 'zume' ) ?></em>
                                    (<a target="_blank" href="https://www.biblegateway.com/passage/?search=Matthew+28%3A18-20&version=NIV"><?php esc_html_e( 'Matthew 28:18-20', 'zume' ) ?> <?php require plugin_dir_path( __DIR__ ) . 'assets/images/external-link.svg' ?></a>)
                                </p>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Teaching others to obey and follow Jesus with you', 'zume' ) ?> <br></h4>
                                    <p>
                                        <strong><a data-value="20745" data-tool="14" id="duckling-discipleship-leading-immediately" class="open-modal"><?php esc_html_e( 'Duckling Discipleship – Leading Immediately', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Learn what ducklings have to do with disciple-making', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20753" data-tool="22" id="training-cycle-for-maturing-disciples" class="open-modal"><?php esc_html_e( 'Training Cycle for Maturing Disciples', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Learn the training cycle and consider how it applies to disciple making.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20756" data-tool="24" id="expect-non-sequential-growth" class="open-modal"><?php esc_html_e( 'Expect Non-Sequential Growth', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "See how disciple making doesn't have to be linear. Multiple things can happen at the same time.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20757" data-tool="25" id="pace-of-multiplication-matters" class="open-modal"><?php esc_html_e( 'Pace of Multiplication Matters', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Multiplying matters and multiplying quickly matters even more. See why pace matters.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Speaking to people YOU KNOW about Jesus', 'zume' ) ?></h4>
                                    <p>
                                        <strong><a data-value="20739" data-tool="8" id="relational-stewardship-list-of-100" class="open-modal"><?php esc_html_e( 'Relational Stewardship – List of 100', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'A tool designed to help you be a good steward of your relationships.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20741" data-tool="10" id="the-gospel-and-how-to-share-it" class="open-modal"><?php esc_html_e( 'The Gospel and How to Share It', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Learn a way to share God’s Good News from the beginning of humanity all the way to the end of this age.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a data-value="20743" data-tool="12" id="prepare-your-3-minute-testimony" class="open-modal"><?php esc_html_e( 'Prepare Your 3-Minute Testimony', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( 'Learn how to share your testimony in three minutes by sharing how Jesus has impacted your life.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( "Speaking to people YOU DON'T KNOW about Jesus", 'zume' ) ?></h4>
                                    <p>
                                        <strong><a data-value="20750" data-tool="18" id="a-person-of-peace-and-how-to-find-one" class="open-modal"><?php esc_html_e( 'A Person of Peace and How To Find One', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "Learn who a person of peace might be and how to know when you've found one.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><a  data-value="20748" data-tool="17" id="prayer-walking-and-how-to-do-it" class="open-modal"><?php esc_html_e( 'Prayer Walking and How To Do It', 'zume' ) ?></a></strong><br>
                                        <?php esc_html_e( "It's a simple way to obey God’s command to pray for others. And it's just what it sounds like — praying to God while walking around!", 'zume' ) ?>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </li><li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What if many friends, family and others start following Jesus with me?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <div class="container stack">
                                <p>
                                    <strong><a data-value="20761" data-tool="30" id="peer-mentoring-group" class="open-modal"><?php esc_html_e( 'Peer Mentoring Groups', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( 'This is a group that consists of people who are leading and starting 3/3 Groups. It also follows a 3/3 format and is a powerful way to assess the spiritual health of God’s work in your area.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><a data-value="20759" data-tool="28" id="coaching-checklist" class="open-modal"><?php esc_html_e( 'Coaching Checklist', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( 'A powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><a data-value="20755" data-tool="55" id="leadership-cells" class="open-modal"><?php esc_html_e( 'Leadership Cells', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( 'A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><a data-value="20760" data-tool="29" id="leadership-in-networks" class="open-modal"><?php esc_html_e( 'Leadership in Networks', 'zume' ) ?></a></strong><br>
                                    <?php esc_html_e( 'Learn how multiplying churches stay connected and live life together as an extended, spiritual family.', 'zume' ) ?>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="reveal large" id="pieces-wrapper" data-reveal data-v-offset="20">
            <button class="ms-auto d-block w-2rem" data-close aria-label="Close modal" type="button">
                <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/close-button-01.svg' ) ?>" alt="close button">
            </button>
            <div id="pieces-content"></div>
        </div>

        <?php
    }
}
Zume_Training_Follow_Jesus::instance();
