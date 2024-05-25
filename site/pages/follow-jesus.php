<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Follow_Jesus extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'how-to-follow-jesus';
    public $lang = 'en_US';
    public $lang_code = 'en';
    public static $token = 'app_how_to_follow_jesus';
    private $has_pieces_pages = false;

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

        $this->lang_code = $lang_code;

        $this->has_pieces_pages = zume_feature_flag( 'pieces_pages', $lang_code );

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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
                const lang = '<?php echo esc_attr( $this->lang_code ) ?>'


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

    private function display_link( $value, $tool, $id, $title ) {
        ?>

            <?php if ( $this->has_pieces_pages ) : ?>

                <a data-value="<?php echo esc_attr( $value ) ?>" data-tool="<?php echo esc_attr( $tool ) ?>" id="<?php echo esc_attr( $id ) ?>" class="open-modal"><?php echo esc_attr( $title ) ?></a>

            <?php else : ?>

                <span><?php echo esc_html( $title ) ?></span>

            <?php endif; ?>

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

                <?php if ( !is_user_logged_in() ): ?>

                    <a href="<?php echo esc_url( zume_start_wizard_url() ) ?>" class="mx-auto btn large light uppercase"><?php echo esc_html__( 'Register', 'zume' ) ?></a>

                <?php endif; ?>

            </div>
        </div>

        <div class="page bg-gray-100">
            <div class="container-md center">
                <ul class="stack-2 | accordion | w-100" data-accordion>
                    <li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What is a follower of Jesus?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <div class="container stack">
                                <p>
                                    <strong><?php esc_html( $this->display_link( '20730', '1', 'god-uses-ordinary-people', 'God Uses Ordinary People' ) ) ?></strong><br>
                                    <?php esc_html_e( "You'll see how God uses ordinary people doing simple things to make a big impact.", 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><?php esc_html( $this->display_link( '20731', '2', 'simple-definition-of-disciple-and-church', 'Simple Definition of Disciple and Church' ) ) ?></strong><br>
                                    <?php esc_html_e( 'Discover the essence of being a disciple, making a disciple, and what is the church.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><?php esc_html( $this->display_link( '20744', '13', 'vision-casting-the-greatest-blessing', 'Vision Casting the Greatest Blessing' ) ) ?></strong><br>
                                    <?php esc_html_e( 'Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.', 'zume' ) ?>
                                </p>
                            </div>

                        </div>
                    </li><li class="accordion-item rounded shadow" data-accordion-item>
                        <a href="#" class="accordion-title"><h2><?php echo esc_html__( 'What are the activities of a follower of Jesus?', 'zume' ) ?></h2></a>

                        <div class="accordion-content" data-tab-content>
                            <div class="container stack-2">
                                <p>
                                    <strong><?php esc_html( $this->display_link( '20737', '6', 'consumer-vs-producer-lifestyle', 'Consumer vs Producer Lifestyle' ) ) ?></strong><br>
                                    <?php esc_html_e( "You'll discover the four main ways God makes everyday followers more like Jesus.", 'zume' ) ?>
                                </p>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Prayer', 'zume' ) ?></h4>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20732', '3', 'spiritual-breathing-is-hearing-and-obeying-god', 'Spiritual Breathing is Hearing and Obeying God' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Being a disciple means we hear from God and we obey God.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20738', '7', 'how-to-spend-an-hour-in-prayer', 'How to Spend an Hour in Prayer' ) ) ?></strong><br>
                                        <?php esc_html_e( 'See how easy it is to spend an hour in prayer.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20749', '19', 'the-bless-prayer-pattern', 'The BLESS Prayer Pattern' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Practice a simple mnemonic to remind you of ways to pray for others.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Bible Reading', 'zume' ) ?></h4>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20733', '4', 'soaps-bible-reading', 'S.O.A.P.S. Bible Reading' ) ) ?></strong><br>
                                        <?php esc_html_e( 'A tool for daily Bible study that helps you understand, obey, and share God’s Word.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20751', '20', 'faithfulness-is-better-than-knowledge', 'Faithfulness is Better Than Knowledge' ) ) ?></strong><br>
                                        <?php esc_html_e( "It's important what disciples know — but it's much more important what they DO with what they know.", 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Community', 'zume' ) ?></h4>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20752', '21', '3-3-group-meeting-pattern', '3/3 Group Meeting' ) ) ?></strong><br>
                                        <?php esc_html_e( "A 3/3 Group is a way for followers of Jesus to meet, pray, learn, grow, fellowship and practice obeying and sharing what they've learned. In this way, a 3/3 Group is not just a small group but a Simple Church.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20735', '5', 'accountability-groups', 'Accountability Groups' ) ) ?></strong><br>
                                        <?php esc_html_e( 'A tool for two or three people of the same gender to meet weekly and encourage each other in areas that are going well and reveal areas that need correction.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20758', '26', 'always-part-of-two-churches', 'Always Part of Two Churches' ) ) ?></strong><br>
                                        <?php esc_html_e( "Learn how to obey Jesus' commands by going AND staying.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20747', '16', 'the-lords-supper-and-how-to-lead-it', 'The Lord’s Supper and How To Lead It' ) ) ?></strong><br>
                                        <?php esc_html_e( "It's a simple way to celebrate our intimate connection and ongoing relationship with Jesus. Learn a simple way to celebrate.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20742', '11', 'baptism-and-how-to-do-it', 'Baptism and How To Do It' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…” Learn how to put this into practice.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Sacrifice and Suffering', 'zume' ) ?></h4>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20740', '9', 'the-kingdom-economy', 'The Kingdom Economy' ) ) ?></strong><br>
                                        <?php esc_html_e( "Learn how God's economy is different from the world's. God invests more in those who are faithful with what they've already been given.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20746', '15', 'eyes-to-see-where-the-kingdom-isnt', 'Eyes to See Where The Kingdom Isn’t' ) ) ?></strong><br>
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
                                        <strong><?php esc_html( $this->display_link( '20745', '14', 'duckling-discipleship-leading-immediately', 'Duckling Discipleship – Leading Immediately' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Learn what ducklings have to do with disciple-making', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20753', '22', 'training-cycle-for-maturing-disciples', 'Training Cycle for Maturing Disciples' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Learn the training cycle and consider how it applies to disciple making.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20756', '24', 'expect-non-sequential-growth', 'Expect Non-Sequential Growth' ) ) ?></strong><br>
                                        <?php esc_html_e( "See how disciple making doesn't have to be linear. Multiple things can happen at the same time.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20757', '25', 'pace-of-multiplication-matters', 'Pace of Multiplication Matters' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Multiplying matters and multiplying quickly matters even more. See why pace matters.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( 'Speaking to people YOU KNOW about Jesus', 'zume' ) ?></h4>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20739', '8', 'relational-stewardship-list-of-100', 'Relational Stewardship – List of 100' ) ) ?></strong><br>
                                        <?php esc_html_e( 'A tool designed to help you be a good steward of your relationships.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20741', '10', 'the-gospel-and-how-to-share-it', 'The Gospel and How to Share It' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Learn a way to share God’s Good News from the beginning of humanity all the way to the end of this age.', 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20743', '12', 'prepare-your-3-minute-testimony', 'Prepare Your 3-Minute Testimony' ) ) ?></strong><br>
                                        <?php esc_html_e( 'Learn how to share your testimony in three minutes by sharing how Jesus has impacted your life.', 'zume' ) ?>
                                    </p>
                                </div>
                                <div class="stack">
                                    <h4><?php esc_html_e( "Speaking to people YOU DON'T KNOW about Jesus", 'zume' ) ?></h4>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20750', '18', 'a-person-of-peace-and-how-to-find-one', 'A Person of Peace and How To Find One' ) ) ?></strong><br>
                                        <?php esc_html_e( "Learn who a person of peace might be and how to know when you've found one.", 'zume' ) ?>
                                    </p>
                                    <p>
                                        <strong><?php esc_html( $this->display_link( '20748', '17', 'prayer-walking-and-how-to-do-it', 'Prayer Walking and How To Do It' ) ) ?></strong><br>
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
                                    <strong><?php esc_html( $this->display_link( '20761', '30', 'peer-mentoring-group', 'Peer Mentoring Groups' ) ) ?></strong><br>
                                    <?php esc_html_e( 'This is a group that consists of people who are leading and starting 3/3 Groups. It also follows a 3/3 format and is a powerful way to assess the spiritual health of God’s work in your area.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><?php esc_html( $this->display_link( '20759', '28', 'coaching-checklist', 'Coaching Checklist' ) ) ?></strong><br>
                                    <?php esc_html_e( 'A powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><?php esc_html( $this->display_link( '20755', '55', 'leadership-cells', 'Leadership Cells' ) ) ?></strong><br>
                                    <?php esc_html_e( 'A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.', 'zume' ) ?>
                                </p>
                                <p>
                                    <strong><?php esc_html( $this->display_link( '20760', '29', 'leadership-in-networks', 'Leadership in Networks' ) ) ?></strong><br>
                                    <?php esc_html_e( 'Learn how multiplying churches stay connected and live life together as an extended, spiritual family.', 'zume' ) ?>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="reveal large" id="pieces-wrapper" data-reveal data-v-offset="20">
            <button class="ms-auto close-btn" data-close aria-label="<?php esc_html_e( 'Close', 'zume' ); ?>" type="button">
                <span class="icon z-icon-close"></span>
            </button>
            <div id="pieces-content"></div>
        </div>

        <?php
    }
}
Zume_Training_Follow_Jesus::instance();
