<?php
if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly.

use Gettext\Loader\PoLoader;

class Zume_Training_Translator extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training Translator';
    public $root = 'app';
    public $type = 'translator';
    public $user;
    public static $token = 'app_translator';
    public $zume_languages;
    public $language_code;
    public $language;

    public $download_fields = [];
    public $script_fields = [];
    public $video_fields = [];

    public $pieces = [
        1 => 20730, // God uses ordinary people
        2 => 20731, // teach them to obey
        3 => 20732, // spiritual breathing
        4 => 20733, // soaps bible reading
        5 => 20735, // accountability groups
        6 => 20737, // consumers vs producers
        7 => 20738, // prayer cycle
        8 => 20739, // list of 100
        9 => 20740, // kingdom economy
        10 => 20741, // the gospel
        11 => 20742, // baptism
        12 => 20743, // 3-minute testimony
        13 => 20744, // greatest blessing
        14 => 20745, // duckling discipleship
        15 => 20746, // seeing where God's kingdom isn't
        16 => 20747, // the lord's supper
        17 => 20748, // prayer walking
        18 => 20750, // person of peace
        19 => 20749, // bless prayer
        20 => 20751, // faithfulness
        21 => 20752, // 3/3 group pattern
        22 => 20753, // training cycle
        23 => 20755, // leadership cells
        24 => 20756, // non-sequential
        25 => 20757, // pace
        26 => 20758, // part of two churches
        27 => 19848, // 3-month plan
        28 => 20759, // coaching checklist
        29 => 20760, // leadership in networks
        30 => 20761, // peer mentoring groups
        31 => 20762, // four fields tool
        32 => 20763, // generation mapping
    ];
    public $video_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,28,29,30,33];
    public $pieces_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,28,29,30,31,32,33];
    public $script_list = [1=>34,2=>35,3=>36,4=>37,5=>38,6=>39,7=>40,8=>41,9=>42,
                            10=>43,11=>44,12=>45,13=>46,14=>47,15=>48,16=>49,17=>50,18=>51,19=>52,
                            21=>53,22=>54,23=>55,24=>56,25=>57,26=>58,28=>60,29=>61,30=>62,33=>63,
                           ];
    public $images = [ 94, 95, 96, 97, 98, 99, 101, 104];
    public $mirror_url = 'https://storage.googleapis.com/zume-file-mirror/';

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
            'url_parts' => $url_parts,
        ] = $this->get_url_pieces_full();

        global $zume_languages_full_list;
        $this->zume_languages = $zume_languages_full_list;
        $this->language_code = $lang_code ?? $this->language_code;
        $this->language = $this->zume_languages[ $this->language_code ];


        if ( isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

            $this->download_fields = Zume_Downloads_Post_Type::instance()->get_custom_fields_settings();
            $this->script_fields = Zume_Scripts_Post_Type::instance()->get_custom_fields_settings();
            $this->video_fields = Zume_Video_Post_Type::instance()->get_custom_fields_settings();

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

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
        }
    }
    public function get_url_pieces_full( $url = null ) {
        global $zume_languages_full_list;
        if ( !$url ) {
            $url = dt_get_url_path();
        }

        $dt_url = new DT_URL( $url );

        $codes = array_keys( $zume_languages_full_list );

        $path = isset( $dt_url->parsed_url['path'] ) ? $dt_url->parsed_url['path'] : '';

        $url_parts = explode( '/', $path );

        $lang_code = 'en';
        if ( in_array( $url_parts[0], $codes ) ) {
            $lang_code = array_shift( $url_parts );
        }
        $path = implode( '/', $url_parts );

        return [
            'lang_code' => (string) $lang_code ?? 'en',
            'path' => $path,
            'url_parts' => ( $url_parts ) ? $url_parts : [],
        ];
    }
    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }
    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }
    public function header_style(){
        if ( isset( $_GET['tab'] ) && $_GET['tab'] === 'slides' ) {
            ?>
            <style>
                #blank-template-body {
                    background-color: WhiteSmoke !important;
                }
                .hollow.hollow-focus {
                    background-color: lightgreen !important;
                }
            </style>
            <?php
        } else {
            ?>
            <script src="https://cdn.tiny.cloud/1/q7cy7hksisjrvfcglos9jqi7xvy0orfu9w2ydbfig0x37ylw/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
            <style>
                table tr td {
                    vertical-align: top;
                }
                h3 {
                    font-size: var(--t1);
                    font-weight: 600;
                    padding: .5em 0;
                    color: var(--z-brand-light);
                }
                ul li {
                    margin-inline-start: var(--s3);
                    padding: 0 1em;
                    list-style-type: disc;
                    list-style-position: outside;
                    line-height: 1.5;
                }
                ol li {
                    margin-inline-start: var(--s3);
                    padding: 0 1em;
                    list-style-position: outside;
                    line-height: 1.5;
                }
                strong {
                    font-weight: 600;
                    color: var(--z-brand-light);
                }
                ol, ul {
                    margin-block-end: var(--s2);
                }
                img {
                    margin-block-end: var(--s2)
                }
                .checkmark {
                    display: inline-block;
                    transform: rotate(45deg);
                    height: 25px;
                    width: 12px;
                    border-bottom: 7px solid #78b13f;
                    border-right: 7px solid #78b13f;
                }
                #translator-tabs .button {
                    font-size: .8em;
                    padding: .8em .8em;
                }
                .hollow.hollow-focus {
                    background-color: yellow !important;
                }
                .grey-back {
                    background-color: grey;
                }
                .grey-back strong {
                    color: white;
                }
            </style>
            <?php
        }
        ?>
        <script>
            jQuery(document).ready(function($){
                jQuery('#lang-selector').on( 'change', (e) => {
                    console.log('change')
                    console.log(e.target.value)
                    let lang = e.target.value;
                    let base_url = window.location.origin;
                    let magic_url = 'app/translator/';
                    let new_url = base_url + '/' + lang + '/' + magic_url;
                    let params = window.location.search;
                    if ( params ) {
                        new_url += params;
                    }
                    console.log(new_url)
                    window.location.href = new_url;
                } )
            });
            const jsObject = [<?php echo json_encode([
                'images_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . 'assets/images' ),
                'translations' => Zume_Training_Presenter::translations(),
            ]) ?>][0]

        </script>

        <?php
    }
    public function body(){
        if(!is_user_logged_in()) { // test if logged in
            if ( $this->language_code === 'en' ) {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->root . '/' . $this->type  ) );
            } else {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->language_code . '/' . $this->root . '/' . $this->type  ) );
            }
        }
        $this->user = wp_get_current_user();

        if ( ! in_array( 'custom_language_translator', (array) $this->user->roles ) ) {  // test if approved translator role
            echo "User " . $this->user->user_email . " is not a translator.";
            return;
        }
        $approved_languages = get_user_meta( $this->user->ID, 'zume_user_languages', true );
        if ( 'en' === $this->language_code && ! in_array( 'administrator', (array) $this->user->roles ) ) {
           wp_redirect( site_url() . '/'.$approved_languages[0].'/' . $this->root . '/' . $this->type );
        }



        global $zume_languages_full_list;
        $zume_languages =$zume_languages_full_list;
        $language = $zume_languages[$this->language_code];

        $tab = $_GET['tab'] ?? 'status';
        $tabs = [
            'status' => $tab === 'status' ? '' : 'hollow',
            'weblate' => $tab === 'weblate' ? '' : 'hollow hollow-focus',
            'scripts' => $tab === 'scripts' ? '' : 'hollow hollow-focus',
            'activities' => $tab === 'activities' ? '' : 'hollow hollow-focus',
            'messages' => $tab === 'messages' ? '' : 'hollow hollow-focus',
            'pieces' => $tab === 'pieces' ? '' : 'hollow hollow-focus',
            'assets' => $tab === 'assets' ? '' : 'hollow',
            'qr_codes' => $tab === 'qr_codes' ? '' : 'hollow ',
            'translators' => $tab === 'translators' ? '' : 'hollow',
        ]
        ?>
        <div style="top:0; left:0; position: fixed; background-color: white; padding: .5em; z-index:100; width: 100%; border-bottom: 1px solid lightgrey;">
            <div class="grid-x grid-padding-x" >
                <div class="cell medium-9" id="translator-tabs">
                    <?php
                    foreach( $tabs as $tab_name => $class ) {
                        ?>
                        <a class="button <?php echo $class ?>" href="<?php echo site_url() . '/' . $this->language_code ?>/app/translator?tab=<?php echo $tab_name ?>"><span style="text-transform:uppercase;"><?php echo $tab_name ?></span></a>
                        <?php
                    }
                    if ( in_array( 'administrator', (array) $this->user->roles ) ) {
                        echo '<a class="button hollow clear" href="/app/translations">Scoreboard</a>';
                    }
                    ?>
                </div>
                <div class="cell medium-3">
                    <select id="lang-selector">
                        <option value="<?php echo $language['code'] ?>" selected><?php echo $language['name'] ?></option>
                        <option>----------</option>
                        <?php
                        foreach( $zume_languages as $k => $l ) {
                            if ( 'en' === $k  && ! in_array( 'administrator', $this->user->roles ) ) {
                                continue;
                            }
                            if ( empty( $approved_languages ) || ! in_array( $k, $approved_languages ) && ! in_array( 'administrator', $this->user->roles ) ) {
                                continue;
                            }
                            ?>
                            <option value="<?php echo $l['code'] ?>"><?php echo $l['name'] ?> (<?php echo $l['code'] ?>)</option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
            </div>
        </div>
        <div class="grid-x grid-padding-x" style="margin-top: 100px;">
            <div class="cell" id="content">
                <?php $this->$tab() ?>
            </div>
        </div>
        <?php
    }

    /**
     * false means approved
     * true means not approved, and lists approved languages
     */
    public function access_failure_test() {
        if ( empty( $this->user ) ) {
            $this->user = wp_get_current_user();
        }
        if ( in_array( 'administrator', $this->user->roles ) ) {
            return false;
        }
        if ( $this->language_code === 'en' && ! in_array( 'administrator', (array) $this->user->roles ) ) {
            return true;
        }
        $approved_languages = get_user_meta( $this->user->ID, 'zume_user_languages', true );
        if ( in_array( $this->language_code, $approved_languages ) ) {
            return false;
        }
        return true;
    }
    public function list_approved_languages( ) {
        global $zume_languages_full_list;
        if ( empty( $this->user ) ) {
            $this->user = wp_get_current_user();
        }
        $zume_languages = $zume_languages_full_list;
        echo 'You are nor approved to translate '.$zume_languages[$this->language_code]['name'].'. <br><br>Approved languages are:<br>';
        $approved_languages = get_user_meta( $this->user->ID, 'zume_user_languages', true );
        $list = [];
        foreach( $approved_languages as $lang ) {
            if ( 'en' === $lang ) {
                continue;
            }
            echo '<a href="'. site_url() . '/' . $lang . '/' . $this->root . '/' . $this->type . '">'. $zume_languages[$lang]['name'] . '</a><br>';
        }
    }
    public function translators() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        // query users with translation role
        $translators = get_users( [
            'role' => 'custom_language_translator',
            'meta_query' => [
                [
                    'key' => 'zume_user_languages',
                    'value' => $this->language_code,
                    'compare' => 'LIKE'
                ]
            ]
        ] );
        global $zume_languages_full_list;
        $zume_languages = $zume_languages_full_list;
        $language = $zume_languages[$this->language_code];
        echo '<h3>Translators for ' . $language['name'] . '</h3>';
        if ( ! empty( $translators ) ) {
            foreach( $translators as $translator ) {
                echo '<strong>' . $translator->user_login . '</strong> (' . $translator->user_email . ') <br>';
            }
        }

    }

    public function status() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        $language = $this->language;
        $weblate = zume_get_weblate();

        /**
        * Template for the status tab
        */
        ?>
        <div class="grid-x grid-padding-x grid-padding-y">


            <!-- WORD COUNT -->
            <div class="cell center grey-back">
                <strong>WORD COUNT</strong>
            </div>
            <div class="cell center">
                <div>
                    <?php
                    $weblate = zume_get_weblate();
                    $pieces_en = zume_word_count_pieces( 'en' );
                    $scripts_en = zume_word_count_scripts( 'en' );
                    $activities_en = zume_word_count_activities( 'en' );
                    $messages_en = zume_word_count_messages( 'en' );
                    $strings_en = zume_word_count_english();
                    ?>
                    <strong style="text-decoration: underline;">ENGLISH WORDS</strong>:
                    <strong>Weblate: </strong> <?php echo number_format( $weblate[$language['weblate']]['total_words'] ); ?> |
                    <strong>Scripts:</strong> <?php echo number_format( $scripts_en ); ?> |
                    <strong>Activities:</strong> <?php echo number_format( $activities_en ); ?> |
                    <strong>Messages:</strong> <?php echo number_format( $messages_en ); ?> |
                    <strong>Pieces:</strong> <?php echo number_format( $pieces_en ); ?> ||
                    <strong style="text-decoration: underline;">TOTAL:</strong> <?php echo number_format( $pieces_en + $scripts_en + $activities_en + $messages_en + $weblate[$language['weblate']]['total_words'] ); ?>
                </div>
                <div>
                    <?php
                    $pieces = zume_word_count_pieces( $language['code'] );
                    $scripts = zume_word_count_scripts( $language['code'] );
                    $activities = zume_word_count_activities( $language['code'] );
                    $messages = zume_word_count_messages( $language['code'] );
                    ?>
                    <strong style="text-decoration: underline; text-transform: uppercase;"><?php echo $language['name'] ?> WORDS</strong>:
                    <strong>Weblate:</strong> <?php echo number_format( $weblate[$language['weblate']]['translated_words'] ); ?> |
                    <strong>Scripts:</strong> <?php echo number_format( $scripts ); ?> |
                    <strong>Activities:</strong> <?php echo number_format( $activities ); ?> |
                    <strong>Messages:</strong> <?php echo number_format( $messages ); ?> |
                    <strong>Pieces:</strong> <?php echo number_format( $pieces ); ?> ||
                    <strong style="text-decoration: underline;">TOTAL:</strong> <?php echo number_format( $pieces + $scripts + $activities + $messages + $weblate[$language['weblate']]['translated_words']); ?>
                </div>
                <div>
                    <strong style="text-decoration: underline; text-transform: uppercase;">WEBLATE STRINGS: </strong>
                    <strong>English:</strong> <?php echo number_format( $weblate[$language['weblate']]['total'] ); ?> |
                    <strong><?php echo $language['name'] ?>:</strong> <?php echo number_format( $weblate[$language['weblate']]['translated'] ); ?> (<?php echo $weblate[$language['weblate']]['translated_percent']; ?>%)
                </div>
            </div>


            <!-- WEBLATE -->
            <div class="cell center grey-back">
                <strong>WEBLATE</strong>
            </div>
            <div class="cell center">
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    <img src="https://translate.disciple.tools/widget/zume-training/zume-training-system/<?php echo $this->language['weblate'] ?>/svg-badge.svg?native=1" alt="Translation status" style="height:50px;margin:0;" />
                </a>
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>
                </a>
            </div>



            <!-- SCRIPTS -->
            <div class="cell center grey-back">
                <strong>SCRIPTS</strong>
            </div>
             <div class="cell">
                <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $scripts = list_zume_scripts( $language['code'] );
                        $script_items = zume_training_items_by_script();
                        $fields = Zume_Scripts_Post_Type::instance()->get_custom_fields_settings();
                        foreach( $fields as $script_id => $item ) {
                            ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['name'] ?? '' ?> </strong>
                                </td>
                                <td style="text-align:right;">
                                     Content <?php echo empty( $scripts[$script_id]['content'] ) ? '&#10060;' : '&#9989;' ?>
                                </td>
                            </tr>
                            <?php
                        }
                    ?>
                    </tbody>
                </table>
            </div>


            <!-- ACTIVITIES -->
            <div class="cell center grey-back">
                <strong>ACTIVITIES</strong>
            </div>
            <div class="cell">
                 <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $activities = list_zume_activities( $language['code'] );
                        foreach( $activities as $item ) {
                            ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['post_title'] ?></strong>
                                </td>
                                <td style="text-align:right;">
                                     Title  <?php echo empty( $item['title'] ) ? '&#10060;' : '&#9989;' ?>
                                    | Content <?php echo empty( $item['content'] ) ? '&#10060;' : '&#9989;' ?>
                                </td>
                            </tr>
                            <?php
                        }
                    ?>
                    </tbody>
                </table>
            </div>




             <!-- MESSAGES -->
            <div class="cell center grey-back">
                <strong>MESSAGES</strong>
            </div>
            <div class="cell">
                <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $messages_other_language = list_zume_messages( $this->language_code );
                        foreach( $messages_other_language as $message ) {
                            ?>
                            <tr>
                                <td>
                                    <strong><?php echo $message['post_title'] ?></strong>
                                </td>
                                <td style="text-align:right;">
                                    subject <?php echo empty( $message['subject'] ) ? '&#10060;' : '&#9989;' ?>
                                    | body <?php echo empty( $message['body'] ) ? '&#10060;' : '&#9989;' ?>
                                </td>
                            </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>


            <!-- PIECES -->
            <div class="cell center grey-back">
                <strong>PIECES</strong>
            </div>
            <div class="cell">
                <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $pieces_list = list_zume_pieces( $language['code'] );
                        foreach( $pieces_list as $item ) {
                            ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['post_title'] ?></strong> (<?php echo $item['ID'] ?>)
                                </td>
                                <td style="text-align:right;">
                                     Title h1 <?php echo empty( $item['zume_piece_h1'] ) ? '&#10060;' : '&#9989;' ?>
                                    | Pre-Video <?php echo empty( $item['zume_pre_video_content'] ) ? '&#10060;' : '&#9989;' ?>
                                    | Post-Video <?php echo empty( $item['zume_post_video_content'] ) ? '&#10060;' : '&#9989;' ?>
                                    | Ask <?php echo empty( $item['zume_ask_content'] ) ? '&#10060;' : '&#9989;' ?>
                                    | SEO Meta Description <?php echo empty( $item['zume_seo_meta_description'] ) ? '&#10060;' : '&#9989;' ?>
                                </td>
                            </tr>
                            <?php
                        }
                    ?>
                    </tbody>
                </table>
            </div>


            </div>
        <?php
    }
    public function weblate() {
        $weblate = zume_get_weblate();
        $language = $this->language;
        ?>
        <div class="grid-x padding-x">
            <div class="cell center" style="padding-bottom: 1em;">
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    <img src="https://translate.disciple.tools/widget/zume-training/zume-training-system/<?php echo $this->language['weblate'] ?>/svg-badge.svg?native=1" alt="Translation status" style="height:50px;margin:0;" />
                </a>
            </div>
            <div class="cell center">
                <p>
                    <strong style="text-decoration: underline; text-transform: uppercase;">WEBLATE STRINGS: </strong>
                </p>
                <p>
                    <strong>English:</strong> <?php echo number_format( $weblate[$language['weblate']]['total'] ); ?>
                </p>
                <p>
                    <strong><?php echo $language['name'] ?>:</strong> <?php echo number_format( $weblate[$language['weblate']]['translated'] ); ?> (<?php echo $weblate[$language['weblate']]['translated_percent']; ?>%)
                </p>
                <p>
                    <strong style="text-decoration: underline; text-transform: uppercase;">WEBLATE WORDS: </strong>
                </p>
                <p>
                    <strong>English: </strong> <?php echo number_format( $weblate[$language['weblate']]['total_words'] ); ?>
                </p>
                <p>
                    <strong><?php echo $language['name'] ?>: </strong> <?php echo number_format( $weblate[$language['weblate']]['translated_words'] ); ?>
                </p>
                <p>Last Updated: <?php echo date( 'Y-m-d H:i:s', strtotime( $weblate[$language['weblate']]['last_change'] ) ) ?></p>
                <p>Last Author: <?php echo $weblate[$language['weblate']]['last_author'] ?></p>
             </div>
             <div class="cell center">
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>
                </a>
            </div>
    </div>
        <?php
    }
    public function pieces() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $zume_languages = $zume_languages_full_list;
        $language = $zume_languages[$this->language_code];
        $en_list = list_zume_pieces( 'en' );
        $language_list = list_zume_pieces( $language['code'] );

        $list = [];

        foreach( $en_list as $i => $v ) {
            $list[$v['zume_piece']] = [
                'en' => [],
                'lang' => [],
            ];
        }

        foreach( $en_list as $i => $v ) {
            $list[$v['zume_piece']]['en'] = $v;
        }
        foreach( $language_list as $i => $v ) {
            $list[$v['zume_piece']]['lang'] = $v;
        }
        ?>
        <div class="grid-x grid-padding-x">
            <div class="cell">
                <table style="vertical-align: text-top;">
                    <thead>
                        <tr>
                            <th colspan="2">
                                ENGLISH
                            </th>
                            <th colspan="2">
                                <span style="text-transform:uppercase;"><?php echo $language['name'] ?></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                        foreach( $list as $item ) {
                             ?>
                            <tr>
                                <td style="background-color: black; width: 10%; white-space: nowrap;"></td>
                                <td style="background-color: black; width: 40%;"></td>
                                <td style="background-color: black; width: 40%;"></td>
                                <td style="background-color: black; width: 10%;"></td>
                            </tr>
                            <tr>
                                <td>
                                     <strong>Page Title</strong>
                                </td>
                                <td>
                                    <strong><?php echo $item['en']['post_title'] ?? ''; ?></strong><br>
                                    <a href="<?php echo trailingslashit( site_url() ) . 'en/' . $item['en']['post_name'] ?>" target="_blank"><?php echo trailingslashit( site_url() ) . 'en/' . $item['en']['post_name'] ?></a>
                                </td>
                                <td>
                                    <strong><?php echo $item['lang']['post_title'] ?? ''; ?></strong><br>
                                    <a href="<?php echo trailingslashit( site_url() ) . $language['code'] . '/' . $item['lang']['post_name'] ?>" target="_blank"><?php echo trailingslashit( site_url() ) . $language['code'] . '/' . $item['lang']['post_name'] ?></a>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Title Override</strong>
                                </td>
                                <td>
                                    <?php echo $item['en']['zume_piece_h1'] ?? ''; ?>
                                </td>
                                <td>
                                    <input type="text" id="<?php echo hash('sha256', serialize($item['lang']) . 'zume_piece_h1' ) ?>" value="<?php echo $item['lang']['zume_piece_h1'] ?? '';  ?>" class="<?php echo hash('sha256', serialize($item['lang']) . 'zume_piece_h1' ) ?>" />
                                </td>
                                <td>
                                    <button class="button save_text" data-target="<?php echo hash('sha256', serialize($item['lang']) . 'zume_piece_h1' ) ?>" data-key="zume_piece_h1" data-post="<?php echo $item['lang']['ID'] ?>">Save</button>
                                    <br><span class="loading-spinner <?php echo hash('sha256', serialize($item['lang']) . 'zume_piece_h1' ) ?>"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Pre-Video</strong>
                                </td>
                                <td>
                                    <?php echo $item['en']['zume_pre_video_content'] ?? '' ; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo hash('sha256', serialize($item['lang']) . 'zume_pre_video_content' ) ?>" ><?php echo $item['lang']['zume_pre_video_content'] ?? '';  ?></textarea>
                                </td>
                                <td>
                                    <button class="button save_textarea" data-target="<?php echo hash('sha256', serialize($item['lang']) . 'zume_pre_video_content' ) ?>" data-key="zume_pre_video_content" data-post="<?php echo $item['lang']['ID'] ?>">Save</button>
                                    <br><span class="loading-spinner <?php echo hash('sha256', serialize($item['lang']) . 'zume_pre_video_content' ) ?>"></span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Post-Video</strong>
                                </td>
                                <td>
                                    <?php echo $item['en']['zume_post_video_content'] ?? '' ; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo hash('sha256', serialize($item['lang']) . 'zume_post_video_content' ) ?>" class="<?php echo hash('sha256', serialize($item['lang']) . 'zume_post_video_content' ) ?>"><?php echo $item['lang']['zume_post_video_content'] ?? '';  ?></textarea>
                                </td>
                                <td>
                                    <button class="button save_textarea" data-target="<?php echo hash('sha256', serialize($item['lang']) . 'zume_post_video_content' ) ?>" data-key="zume_post_video_content" data-post="<?php echo $item['lang']['ID'] ?>">Save</button>
                                    <br><span class="loading-spinner <?php echo hash('sha256', serialize($item['lang']) . 'zume_post_video_content' ) ?>"></span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <strong>Ask</strong>
                                </td>
                                <td>
                                    <?php echo $item['en']['zume_ask_content'] ?? '' ; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo hash('sha256', serialize($item['lang']) . 'zume_ask_content' ) ?>"><?php echo  $item['lang']['zume_ask_content'] ?? '';  ?></textarea>
                                </td>
                                <td>
                                    <button class="button save_textarea" data-target="<?php echo hash('sha256', serialize($item['lang']) . 'zume_ask_content' ) ?>" data-key="zume_ask_content" data-post="<?php echo $item['lang']['ID'] ?>">Save</button>
                                    <br><span class="loading-spinner <?php echo hash('sha256', serialize($item['lang']) . 'zume_ask_content' ) ?>"></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>SEO Description</strong>
                                </td>
                                <td>
                                    <?php echo $item['en']['zume_seo_meta_description'] ?? '' ; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo hash('sha256', serialize($item['lang']) . 'zume_seo_meta_description' ) ?>"><?php echo  $item['lang']['zume_seo_meta_description'] ?? '';  ?></textarea>
                                </td>
                                <td>
                                    <button class="button save_textarea" data-target="<?php echo hash('sha256', serialize($item['lang']) . 'zume_seo_meta_description' ) ?>" data-key="zume_seo_meta_description" data-post="<?php echo $item['lang']['ID'] ?>">Save</button>
                                    <br><span class="loading-spinner <?php echo hash('sha256', serialize($item['lang']) . 'zume_seo_meta_description' ) ?>"></span>
                                </td>
                            </tr>
                            <?php
                        } ?>
                    </tbody>
                </table>
            </div>
            <script>
                jQuery(document).ready(function($){
                    jQuery(document).foundation();

                     let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';

                    tinymce.init({
                        selector: 'textarea',
                        plugins: 'code link wordcount lists image',
                        menubar: 'insert',
                        toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                        paste_as_text: true,
                        link_class_list: [
                            {title: 'None', value: ''},
                            {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                            {title: 'Primary Button', value: 'button primary-button-hollow'},
                        ],
                        block_formats: 'Paragraph=p; Header 3=h3',
                        min_height: 500,
                        format_empty_lines: true,
                        directionality: direction
                    });

                    jQuery('.save_textarea').on( 'click', (e) => {
                        console.log('save')
                        console.log(e.target.dataset.target)

                        let target = e.target.dataset.target;
                        let content = tinymce.get(target).getContent();
                        console.log(content)

                        let key = e.target.dataset.key;
                        console.log(key)

                        let postid = e.target.dataset.post;
                        console.log(postid)

                        jQuery('.loading-spinner.' + target).addClass('active');

                        makeRequest('POST', 'translation/update', { key: key, postid: postid, content: content }, "zume_system/v1/" )
                        .then( (response) => {
                            console.log(response)
                            jQuery('.loading-spinner.' + target).removeClass('active');
                            jQuery('.loading-spinner.' + target).addClass('checkmark');
                        } )
                    } )
                    jQuery('.save_text').on( 'click', (e) => {
                        console.log('save_emails')
                        console.log(e.target.dataset.target)

                        let target = e.target.dataset.target;
                        let content = jQuery('.'+target).val();
                        let key = e.target.dataset.key;
                        let postid = e.target.dataset.post;

                        jQuery('.loading-spinner.' + target).addClass('active');

                        makeRequest('POST', 'translation/update', { key: key, postid: postid, content: content }, "zume_system/v1/" )
                        .then( (response) => {
                            console.log(response)
                            jQuery('.loading-spinner.' + target).removeClass('active');
                            jQuery('.loading-spinner.' + target).addClass('checkmark');
                        } )
                } )
              });
              </script>
        <?php
    }
    public function messages() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $languages = $zume_languages_full_list;
        $language = $languages[$this->language_code];
        $messages_english = list_zume_messages( 'en' );
        $messages_other_language = list_zume_messages( $this->language_code );

        ob_start();
        foreach( $messages_english as $message ) {
            $pid = $message['post_id'];
            ?>
            <tr><td colspan="4" style="background:black;"></td></tr>
            <tr>
                <td colspan="2">
                    <?php echo $messages_english[$pid]['post_title'] ?? '' ?> <?php echo ( $messages_english[$pid]['post_parent'] ) ? '(follow up to ' . get_the_title( $messages_english[$pid]['post_parent'] ) . ')' : '' ?>
                    <br><a href="<?php echo site_url() . '/en/app/message/?m='.$pid ?>" target="_blank"><?php echo site_url() . '/en/app/message/?m='.$pid ?></a>
                    <br><em>Marketing Logic: <?php echo $message['logic'] ?? '' ?></em>
                    <br><em>Stage: <?php echo ucwords( $message['stage'] ?? '' ) ?></em>
                </td>
                <td colspan="2">
                    <?php echo $messages_other_language[$pid]['post_title'] ?? '' ?>
                    <br><a href="<?php echo site_url() .'/'. $this->language_code . '/app/message/?m='.$pid ?>" target="_blank"><?php echo site_url() .'/'. $this->language_code . '/app/message/?m='.$pid ?></a>
                </td>
            </tr>
            <tr>
                <td style="width:10%;"><strong>Subject:</strong></td>
                <td style="width:40%">
                    <?php echo $messages_english[$pid]['subject'] ?? '' ?><br>
                </td>
                <td style="width:40%;">
                    <input type="text" class="subject_<?php echo $this->language_code ?>_<?php echo $pid ?>" value="<?php echo $messages_other_language[$pid]['subject'] ?? '' ?>" placeholder="Subject for <?php echo $language['name'] ?>" />
                </td>
                <td style="width:10%;">
                    <button class="button save_text" data-target="subject_<?php echo $this->language_code ?>_<?php echo $pid ?>" data-key="subject_<?php echo $this->language_code ?>" data-post="<?php echo $pid ?>" >Save</button>
                    <br><span class="loading-spinner subject_<?php echo $this->language_code ?>_<?php echo $pid ?>"></span>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Body:</strong>
                </td>
                <td>
                    <?php echo $messages_english[$pid]['body'] ?? '' ?><br>
                </td>
                <td>
                    <textarea id="body_<?php echo $this->language_code ?>_<?php echo $pid ?>" placeholder="Body for <?php echo $language['name'] ?>"><?php echo $messages_other_language[$pid]['body'] ?? '' ?></textarea>
                </td>
                <td>
                    <button class="button save_textarea" data-target="body_<?php echo $this->language_code ?>_<?php echo $pid ?>" data-post="<?php echo $pid ?>" data-key="body_<?php echo $this->language_code ?>" >Save</button>
                    <br><span class="loading-spinner body_<?php echo $this->language_code ?>_<?php echo $pid ?>"></span>
                </td>
            </tr>
            <?php
        }
        $table = ob_get_clean();
        ?>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>English</th>
                    <th><?php echo $language['name'] ?></th>
                    <th>Save</th>
                </tr>
            </thead>
            <tbody><?php echo $table ?></tbody>
        </table>
        <script>
            jQuery(document).ready(function($){
                jQuery(document).foundation();

                 let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';

                tinymce.init({
                    selector: 'textarea',
                    plugins: 'code link wordcount lists image',
                    menubar: 'insert',
                    toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                    paste_as_text: true,
                    link_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                        {title: 'Primary Button', value: 'button primary-button-hollow'},
                    ],
                    block_formats: 'Paragraph=p; Header 3=h3',
                    min_height: 500,
                    format_empty_lines: true,
                    directionality: direction
                });
                jQuery('.save_textarea').on( 'click', (e) => {
                    console.log('save')
                    console.log(e.target.dataset.target)

                    let target = e.target.dataset.target;
                    let content = tinymce.get(target).getContent();
                    console.log(content)

                    let key = e.target.dataset.key;
                    console.log(key)

                    let postid = e.target.dataset.post;
                    console.log(postid)

                    jQuery('.loading-spinner.' + target).addClass('active');

                    makeRequest('POST', 'translation/update', { key: key, postid: postid, content: content }, "zume_system/v1/" )
                    .then( (response) => {
                        console.log(response)
                        jQuery('.loading-spinner.' + target).removeClass('active');
                        jQuery('.loading-spinner.' + target).addClass('checkmark');
                    } )
                } )
                jQuery('.save_text').on( 'click', (e) => {
                    console.log('save_emails')
                    console.log(e.target.dataset.target)

                    let target = e.target.dataset.target;
                    let content = jQuery('.'+target).val();
                    let key = e.target.dataset.key;
                    let postid = e.target.dataset.post;

                    jQuery('.loading-spinner.' + target).addClass('active');

                    makeRequest('POST', 'translation/update', { key: key, postid: postid, content: content }, "zume_system/v1/" )
                    .then( (response) => {
                        console.log(response)
                        jQuery('.loading-spinner.' + target).removeClass('active');
                        jQuery('.loading-spinner.' + target).addClass('checkmark');
                    } )
                } )
              });
              </script>
        <?php

    }
    public function scripts() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $zume_languages = $zume_languages_full_list;
        $language = $zume_languages[$this->language_code];
        $en_list = list_zume_scripts( 'en' );
        $language_list = list_zume_scripts( $language['code'] );
        $fields = Zume_Scripts_Post_Type::instance()->get_custom_fields_settings();

        $list = [];

        foreach( $en_list as $i => $v ) {
            $list[$v['script_id']] = [
                'en' => [],
                'lang' => [],
            ];
        }

        foreach( $en_list as $i => $v ) {
            $list[$v['script_id']]['en'] = $v;
        }
        foreach( $language_list as $i => $v ) {
            $list[$v['script_id']]['lang'] = $v;
        }
        ?>
        <div class="grid-x grid-padding-x">
            <div class="cell">
                <table style="vertical-align: text-top;">
                    <thead>
                        <tr>
                            <th>
                                ENGLISH
                            </th>
                            <th>
                                <span style="text-transform:uppercase;"><?php echo $language['name'] ?></span>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                        foreach( $fields as $script_id => $item ) {
                             ?>
                            <tr>
                                <td style="background-color: grey; width: 40%; color: white;"><?php echo $item['name'] ?? '' ?></td>
                                <td style="background-color: grey; width: 40%;"></td>
                                <td style="background-color: grey; width: 10%;"></td>
                            </tr>
                            <tr>
                                <td><a href="<?php echo site_url() . '/en/app/script?s=' . $script_id  ?>"><?php echo site_url() . '/en/app/script?s=' . $script_id  ?></a></td>
                                <td><a href="<?php echo site_url() . '/'.$this->language_code.'/app/script?s=' . $script_id  ?>"><?php echo site_url() . '/'.$this->language_code.'/app/script?s=' . $script_id  ?></a></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <?php echo $en_list[$script_id]['content'] ?? ''  ?>
                                </td>
                                <td>
                                    <textarea style="height:500px;" id="<?php echo hash('sha256', $script_id . $language_list[$script_id]['post_id'] ) ?>"><?php echo $language_list[$script_id]['content'] ?? '' ;  ?></textarea>
                                </td>
                                <td>
                                    <button class="button save_textarea" data-target="<?php echo hash('sha256', $script_id . $language_list[$script_id]['post_id'] ) ?>" data-key="<?php echo $script_id ?>" data-post="<?php echo $language_list[$script_id]['post_id'] ?>">Save</button>
                                    <br><span class="loading-spinner <?php echo hash('sha256', $script_id . $language_list[$script_id]['post_id'] ) ?>"></span>
                                </td>
                            </tr>
                            <?php
                        }
                        ?>
                    </tbody>
                </table>
            </div>
            <script>
                jQuery(document).ready(function($){
                    jQuery(document).foundation();

                    let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';

                    tinymce.init({
                        selector: 'textarea',
                        plugins: 'code link wordcount lists image',
                        menubar: 'insert',
                        toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                        paste_as_text: true,
                        link_class_list: [
                            {title: 'None', value: ''},
                            {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                            {title: 'Primary Button', value: 'button primary-button-hollow'},
                        ],
                        block_formats: 'Paragraph=p; Header 3=h3',
                        min_height: 800,
                        format_empty_lines: true,
                        directionality: direction,
                    });
                    jQuery('.save_textarea').on( 'click', (e) => {
                        console.log('save')
                        console.log(e.target.dataset.target)

                        let target = e.target.dataset.target;
                        let content = tinymce.get(target).getContent();
                        console.log(content)

                        let key = e.target.dataset.key;
                        console.log(key)

                        let postid = e.target.dataset.post;
                        console.log(postid)

                        jQuery('.loading-spinner.' + target).addClass('active');

                        makeRequest('POST', 'translation/update', { key: key, postid: postid, content: content }, "zume_system/v1/" )
                        .then( (response) => {
                            console.log(response)
                            jQuery('.loading-spinner.' + target).removeClass('active');
                            jQuery('.loading-spinner.' + target).addClass('checkmark');
                        } )
                    } )
              });
              </script>
        <?php
    }
    public function activities() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $languages = $zume_languages_full_list;
        $language = $languages[$this->language_code];
        $activities_english = list_zume_activities( 'en' );
        $activities_other_language = list_zume_activities( $this->language_code );

        ob_start();
        foreach( $activities_english as $message ) {
            $pid = $message['post_id'];
            ?>
            <tr><td colspan="4" style="background:black;"></td></tr>
            <tr>
                <td colspan="2">
                    <?php echo $activities_english[$pid]['post_title'] ?? '' ?><br />
                    <a href="<?php echo site_url() . '/en/activities/' . $activities_english[$pid]['post_title'] ?>" target="_blank"><?php echo site_url() . '/en/activities/' . $activities_english[$pid]['post_title'] ?></a>
                </td>
                <td colspan="2">
                    <br />
                    <a href="<?php echo site_url() . '/' . $this->language_code . '/activities/' . $activities_other_language[$pid]['post_title'] ?>" target="_blank"><?php echo site_url() . '/' . $this->language_code . '/activities/' . $activities_other_language[$pid]['post_title'] ?></a>
                </td>
            </tr>
            <tr>
                <td><strong>Title:</strong></td>
                <td>
                    <?php echo $activities_english[$pid]['title'] ?? '' ?><br>
                </td>
                <td>
                    <input type="text" class="title_<?php echo $this->language_code ?>_<?php echo $pid ?>" value="<?php echo $activities_other_language[$pid]['title'] ?? '' ?>" placeholder="Subject for <?php echo $language['name'] ?>" />
                </td>
                <td>
                    <button class="button save_text" data-target="title_<?php echo $this->language_code ?>_<?php echo $pid ?>" data-key="title_<?php echo $this->language_code ?>" data-post="<?php echo $pid ?>" >Save</button>
                    <br><span class="loading-spinner title_<?php echo $this->language_code ?>_<?php echo $pid ?>"></span>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Content:</strong>
                </td>
                <td>
                    <?php echo $activities_english[$pid]['content'] ?? '' ?><br>
                </td>
                <td>
                    <textarea id="content_<?php echo $this->language_code ?>_<?php echo $pid ?>" placeholder="Body for <?php echo $language['name'] ?>"><?php echo $activities_other_language[$pid]['content'] ?? '' ?></textarea>
                </td>
                <td>
                    <button class="button save_textarea" data-target="content_<?php echo $this->language_code ?>_<?php echo $pid ?>" data-post="<?php echo $pid ?>" data-key="content_<?php echo $this->language_code ?>" >Save</button>
                    <br><span class="loading-spinner content_<?php echo $this->language_code ?>_<?php echo $pid ?>"></span>
                </td>
            </tr>
            <?php
        }
        $table = ob_get_clean();
        ?>
        <table>
            <thead>
                <tr>
                    <th style="width:5%;"></th>
                    <th style="width:40%;">English</th>
                    <th style="width:40%;"><?php echo $language['name'] ?></th>
                    <th  style="width:5%;">Save</th>
                </tr>
            </thead>
            <tbody><?php echo $table ?></tbody>
        </table>
        <script>
            jQuery(document).ready(function($){
                jQuery(document).foundation();

                 let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';

                tinymce.init({
                    selector: 'textarea',
                    plugins: 'code link wordcount lists image table',
                    menubar: 'insert table',
                    toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat ',
                    paste_as_text: true,
                    link_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                        {title: 'Primary Button', value: 'button primary-button-hollow'},
                    ],
                    block_formats: 'Paragraph=p; Header 3=h3',
                    min_height: 800,
                    format_empty_lines: true,
                    directionality: direction
                });
                jQuery('.save_textarea').on( 'click', (e) => {
                    console.log('save_textarea')
                    console.log(e.target.dataset.target)

                    let target = e.target.dataset.target;
                    let content = tinymce.get(target).getContent();
                    console.log(content)

                    let key = e.target.dataset.key;
                    console.log(key)

                    let postid = e.target.dataset.post;
                    console.log(postid)

                    jQuery('.loading-spinner.' + target).addClass('active');

                    makeRequest('POST', 'translation/update', { key: key, postid: postid, content: content }, "zume_system/v1/" )
                    .then( (response) => {
                        console.log(response)
                        jQuery('.loading-spinner.' + target).removeClass('active');
                        jQuery('.loading-spinner.' + target).addClass('checkmark');
                    } )
                } )
                jQuery('.save_text').on( 'click', (e) => {
                    console.log('save_text')
                    console.log(e.target.dataset.target)

                    let target = e.target.dataset.target;
                    let content = jQuery('.'+target).val();
                    let key = e.target.dataset.key;
                    let postid = e.target.dataset.post;

                    jQuery('.loading-spinner.' + target).addClass('active');

                    makeRequest('POST', 'translation/update', { key: key, postid: postid, content: content }, "zume_system/v1/" )
                    .then( (response) => {
                        console.log(response)
                        jQuery('.loading-spinner.' + target).removeClass('active');
                        jQuery('.loading-spinner.' + target).addClass('checkmark');
                    } )
                } )
              });
              </script>
        <?php

    }
    public function assets() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        $language = $this->language;
        $training_items = zume_training_items();
        ?>
        <div class="grid-x grid-padding-x" >

                <!-- VIDEO PREVIEW -->
                <div class="cell center grey-back">
                    <h2 style="color:white;">VIMEO PREVIEW</h2>
                </div>
                <div class="cell">
                    <?php
                        global $wpdb;
                        $video_fields = $this->video_fields;
                        $video_results = list_zume_videos( $this->language_code );

                        foreach( $video_fields as $key => $row ) {
                            if ( empty( $video_results[$key]) ) {
                                ?>
                                <div style="float:left; width: 420px; height: 350px; padding:1em; border: 1px solid lightgrey; margin: .5em; padding: .5em;">
                                    <?php echo $key . ' - ' . $row['name'] ?> not installed
                                </div>
                                <?php
                            } else {
                                ?>
                                <div style="float:left; width: 420px; height: 350px; padding: 1em; border: 1px solid lightgrey; margin: .5em; padding: .5em;">
                                    <strong><?php echo $row['name'] ?></strong>
                                    <div style="width:400px;height:275px;">
                                    <iframe src="https://player.vimeo.com/video/<?php echo $video_results[$key]['vimeo_id'] ?>?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:400px;height:275px;" title="<?php echo $video_results[$key]['piece_id'] ?> "></iframe><script src="https://player.vimeo.com/api/player.js"></script>
                                    </div>
                                </div>
                                <?php
                            }
                        }
                    ?>
                </div>



                <!-- IMAGE ASSETS PREVIEW -->
                <style>
                    .img-wrapper {
                        display: inline-block;
                        width: 400px;
                        height: 600px;
                        margin: 10px;
                        padding: 10px;
                        border: 1px solid lightgrey;
                        border-radius: 5px;
                        float:left;
                    }
                    .img-wrapper img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                    .img-wrapper h2 {
                        color: white;
                    }
                </style>
                <div class="cell center grey-back" style="margin-top:100px;">
                    <h2 style="color:white;">IMAGE ASSETS</h2>
                </div>
                <div class="cell">
                    <?php
                        foreach( $this->images as $image_number ) {
                            $file =  $this->mirror_url . $this->language_code .'/'. $image_number . '.png';
                              ?>
                                <div class="img-wrapper">
                                    <div>
                                        <strong><?php echo $image_number . '.png'?></strong>
                                    </div>
                                    <div>
                                        <img src="<?php echo $file ?>" >
                                    </div>
                                </div>
                            <?php
                        }
                    ?>
                </div>


            </div> <!-- wrapping div -->


        <?php
    }
    public function qr_codes() {
        $site_url = 'https://zume.training/';
        ?>
        <style>
            .qr-card {
                display: inline-block;
                width: 300px;
                margin: 10px;
                padding: 10px;
                border: 1px solid lightgrey;
                border-radius: 5px;
                float:left;
            }
            .qr-card .overflow {
                overflow: scroll;
                white-space: nowrap;
            }
            .qr-section h2 {
                color: white;
            }
        </style>


        <!-- Activities -->
        <div id="activities" class="qr-section" style="width:100%;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
            <div class="cell center grey-back">
                <h2>Activities</h2>
            </div>
            <div>
                <?php
                     $activities = [
                        'soaps',
                        'accountability',
                        'prayercycle',
                        'listof100',
                        'listof100_printable',
                        'sharegospel',
                        'sharetestimony',
                        'lordssupper',
                        'blessprayer',
                        '33group',
                        'prayerwalking',
                        '3monthplan',
                        '3monthplan_printable',
                        'coachingchecklist',
                        'coachingchecklist_printable',
                        'peermentoring',
                        '4fields',
                        'genmapping',
                    ];
                    foreach( $activities as $item ) {
                        $url = $site_url . 'app/qr/?l='.$this->language_code.'&a='.$item;
                        $url_short = 'l='.$this->language_code.'&a='.$item;
                        $qr_url = zume_create_qr_url( $url );
                        ?>
                        <div class="qr-card">
                            <div class="overflow"><h3><?php echo $item ?></h3></div>
                            <a href="<?php echo $url ?>" target="_blank">
                            <img src="<?php echo $qr_url ?>"  />
                            <div class="overflow"><?php echo $url_short ?></div>
                            </a>
                        </div>
                        <?php
                    }
                ?>
            </div>
        </div>



        <!-- Videos -->
        <div id="videos" class="qr-section" style="width:100%;margin-top:100px;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
             <div class="cell center grey-back">
                <h2>Videos</h2>
            </div>
            <div>
                <?php
                    $training_items = zume_training_items();
                    foreach( $training_items as $item ) {
                        if ( empty( $item['video'] ) ) {
                            continue;
                        }
                        $id =  intval( $item['key'] );
                        $url = $site_url . 'app/qr/?l='.$this->language_code. '&v='. $id;
                        $url_short = 'l='.$this->language_code.'&v='.$id;
                        $qr_url = zume_create_qr_url( $url );
                        ?>
                            <div class="qr-card">
                                <div class="overflow"><h3><?php echo $item['video_title'] ?></h3></div>
                                <a href="<?php echo $url ?>" target="_blank">
                                    <img src="<?php echo $qr_url ?>"  />
                                    <div class="overflow"><?php echo $url_short ?></div>
                                </a>
                            </div>
                        <?php
                    }
                ?>
            </div>
        </div>





       <!-- Checkins -->
       <div id="checkin" class="qr-section" style="width:100%;margin-top:100px;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
            <div class="cell center grey-back">
               <h2>Checkins</h2>
            </div>
            <div>
                <?php
                $list = [
                    // set a (10 Session)
                    5678 => '10 session 1', //'set_a_01', // 10 session 1
                    2468 => '10 session 2', // 'set_a_02', // 10 session 2
                    6543 => '10 session 3', // 'set_a_03', // 10 session 3
                    8764 => '10 session 4', // 'set_a_04', // 10 session 4
                    6542 => '10 session 5', // 'set_a_05', // 10 session 5
                    1235 => '10 session 6', // 'set_a_06', // 10 session 6
                    4322 => '10 session 7', // 'set_a_07', // 10 session 7
                    9870 => '10 session 8', // 'set_a_08', // 10 session 8
                    1355 => '10 session 9', // 'set_a_09', // 10 session 9
                    5430 => '10 session 10', // 'set_a_10', // 10 session 10
                    // set b (20 Session)
                    3354 => '20 session 1', // 'set_b_01', // 20 session 1
                    4568 => '20 session 2', // 'set_b_02', // 20 session 2
                    8767 => '20 session 3', // 'set_b_03', // 20 session 3
                    6787 => '20 session 4', // 'set_b_04', // 20 session 4
                    3450 => '20 session 5', // 'set_b_05', // 20 session 5
                    2344 => '20 session 6', // 'set_b_06', // 20 session 6
                    1116 => '20 session 7', // 'set_b_07', // 20 session 7
                    5431 => '20 session 8', // 'set_b_08', // 20 session 8
                    8768 => '20 session 9', // 'set_b_09', // 20 session 9
                    2347 => '20 session 10', // 'set_b_10', // 20 session 10
                    9434 => '20 session 11', // 'set_b_11', // 20 session 11
                    2348 => '20 session 12', // 'set_b_12', // 20 session 12
                    6785 => '20 session 13', // 'set_b_13', // 20 session 13
                    9872 => '20 session 14', // 'set_b_14', // 20 session 14
                    4327 => '20 session 15', // 'set_b_15', // 20 session 15
                    2871 => '20 session 16', // 'set_b_16', // 20 session 16
                    4328 => '20 session 17', // 'set_b_17', // 20 session 17
                    6548 => '20 session 18', // 'set_b_18', // 20 session 18
                    7657 => '20 session 19', // 'set_b_19', // 20 session 19
                    2767 => '20 session 20', // 'set_b_20', // 20 session 20
                    // set c (Intensive)
                    1397 => 'Intensive 1', // 'set_c_1', // Intensive 1
                    2341 => 'Intensive 2', // 'set_c_2', // Intensive 2
                    3455 => 'Intensive 3', // 'set_c_3', // Intensive 3
                    4329 => 'Intensive 4', // 'set_c_4', // Intensive 4
                    5451 => 'Intensive 5', // 'set_c_5', // Intensive 5
                ];
                foreach( $list as $i => $v ) {
                    $url = $site_url . 'app/qr/?l='.$this->language_code. '&c='. $i;
                    $url_short = 'l='.$this->language_code. '&c='. $i;
                    $qr_url = zume_create_qr_url( $url );
                    ?>
                    <div class="qr-card">
                        <h3><?php echo $v ?></h3>
                        <a href="<?php echo $url ?>" target="_blank">
                            <img src="<?php echo $qr_url ?>"  />
                            <div class="overflow"><?php echo $url_short ?></div>
                        </a>
                    </div>
                    <?php
                }
                ?>
            </div>
       </div>






       <!-- SCRIPTS -->
        <div id="scripts" class="qr-section" style="width:100%;margin-top:100px;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
            <div class="cell center grey-back">
                <h2>Scripts</h2>
            </div>
            <div>
            <?php
                $training_items = zume_training_items();
                foreach( $training_items as $item ) {
                    if ( empty( $item['script'] ) ) {
                        continue;
                    }
                    $id =  intval( $item['key'] );
                    $url = $site_url . 'app/qr/?l='.$this->language_code. '&s='. $item['script'];
                    $url_short = 'l='.$this->language_code.'&s='.$item['script'];
                    $qr_url = zume_create_qr_url( $url );
                    ?>
                    <div class="qr-card">
                        <div class="overflow"><h3><?php echo $item['video_title'] ?></h3></div>
                        <a href="<?php echo $url ?>" target="_blank">
                            <img src="<?php echo $qr_url ?>"  />
                            <div class="overflow"><?php echo $url_short ?></div>
                        </a>
                    </div>
                    <?php
                }
                ?>
            </div>
        </div>
        <?php
    }

}

Zume_Training_Translator::instance();

if (!function_exists('list_zume_pieces')) {
    function list_zume_pieces($language_code)
    {
        global $wpdb, $table_prefix;

        $sql = $wpdb->prepare("SELECT p.*,
                                    pm.post_id,
                                    pm.meta_value as zume_lang,
                                    pm1.meta_value as zume_piece,
                                    pm2.meta_value as zume_piece_h1,
                                    pm3.meta_value as zume_pre_video_content,
                                    pm4.meta_value as zume_post_video_content,
                                    pm5.meta_value as zume_ask_content,
                                    pm6.meta_value as zume_seo_meta_description
                                FROM zume_posts p
                                JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
                                LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
                                LEFT JOIN zume_postmeta pm2 ON pm2.post_id = p.ID AND pm2.meta_key = 'zume_piece_h1'
                                LEFT JOIN zume_postmeta pm3 ON pm3.post_id = p.ID AND pm3.meta_key = 'zume_pre_video_content'
                                LEFT JOIN zume_postmeta pm4 ON pm4.post_id = p.ID AND pm4.meta_key = 'zume_post_video_content'
                                LEFT JOIN zume_postmeta pm5 ON pm5.post_id = p.ID AND pm5.meta_key = 'zume_ask_content'
                                LEFT JOIN zume_postmeta pm6 ON pm6.post_id = p.ID AND pm6.meta_key = 'zume_seo_meta_description'
                                WHERE p.post_type = 'zume_pieces'
                                ORDER BY CAST(pm1.meta_value AS unsigned );",
                            $language_code );
        $results = $wpdb->get_results($sql, ARRAY_A);

        if (empty($results) || is_wp_error($results)) {
            return [];
        }

        $pieces = [];
        foreach ($results as $result) {
            $pieces[$result['post_id']] = $result;
        }

        return $pieces;
    }
}
if (!function_exists('list_zume_downloads')) {
    function list_zume_downloads($language_code)
    {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, pm.meta_key, pm.meta_value
                                        FROM zume_posts p
                                        JOIN zume_postmeta pm ON pm.post_id=p.ID
                                        WHERE p.post_title = %s
                                            AND p.post_type = 'zume_download'
                                            AND pm.meta_key > 30
                                            AND pm.meta_key < 75
                                        ORDER BY CAST(pm.meta_key AS unsigned);",
                                    $language_code);
        $results = $wpdb->get_results($sql, ARRAY_A);

        if (empty($results) || is_wp_error($results)) {
            return [];
        }
        $downloads = [];
        foreach ($results as $result) {
            $downloads[$result['meta_key']] = $result['meta_value'];
        }
        return $downloads;
    }
}
if (!function_exists('list_zume_scripts')) {
    function list_zume_scripts( $language_code )
    {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, pm.post_id, SUBSTRING( pm.meta_key, 1, 2) as script_id, pm.meta_value as content
                                FROM zume_posts p
                                JOIN zume_postmeta pm ON pm.post_id=p.ID
                                WHERE p.post_type = 'zume_scripts'
                                AND p.post_title = %s
                                AND SUBSTRING( pm.meta_key, 1, 2) > 30
                                AND SUBSTRING( pm.meta_key, 1, 2) < 75
                                ORDER BY CAST(pm.meta_key AS unsigned);",
                             $language_code);

        $results = $wpdb->get_results($sql, ARRAY_A);
        if (empty($results) || is_wp_error($results)) {
            return [];
        }
        $scripts = [];
        foreach ($results as $result) {
            $scripts[$result['script_id']] = $result;
        }
        return $scripts;
    }
}
if (!function_exists('list_zume_activities')) {
    function list_zume_activities( $language_code )
    {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, pm.post_id, %s as language_code, pm.meta_id, pm.meta_value as title, pm1.meta_value as content
                                        FROM zume_posts p
                                        LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key LIKE CONCAT( 'title_', %s )
                                        LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'content_', %s )
                                        WHERE p.post_type = 'zume_activities';",
                                $language_code, $language_code, $language_code );

        $results = $wpdb->get_results($sql, ARRAY_A);
        if (empty($results) || is_wp_error($results)) {
            return [];
        }
        $activities = [];
        foreach( $results as $activity) {
            $activities[$activity['post_id']] = $activity;
        }
        return $activities;
    }
}

if (!function_exists('list_zume_videos')) {
    function list_zume_videos($language_code)
    {
        global $wpdb;

            $sql = $wpdb->prepare("SELECT p.post_title, pm.post_id, pm.meta_key as piece_id, pm.meta_value as vimeo_id
                                    FROM zume_posts p
                                    JOIN zume_postmeta pm ON pm.post_id=p.ID
                                    WHERE p.post_title = %s
                                    AND p.post_type = 'zume_video'
                                    AND SUBSTRING( pm.meta_key, 1, 2) > 0
                                    AND SUBSTRING( pm.meta_key, 1, 2) < 75
                                    ORDER BY CAST(pm.meta_key AS unsigned);",
                                    $language_code);
       $videos_raw = $wpdb->get_results($sql, ARRAY_A);

        if (empty($videos_raw) || is_wp_error($videos_raw)) {
            return [];
        }

        $videos = [];
        foreach( $videos_raw as $video ) {
            $videos[$video['piece_id']] = $video;
        }

        return $videos;
    }
}
if ( ! function_exists( 'list_zume_messages' ) ) {
    function list_zume_messages( $language_code ) {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, p.post_parent, pm.post_id, %s as language_code, pm.meta_value as subject, pm1.meta_value as body, pm2.meta_value as logic, pm3.meta_value as stage
                                        FROM zume_posts p
                                        LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key LIKE CONCAT( 'subject_', %s )
                                        LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'body_', %s )
                                        LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'logic'
										LEFT JOIN zume_postmeta pm3 ON pm3.post_id=p.ID AND pm3.meta_key = 'stage'
                                        WHERE p.post_type = 'zume_messages'", $language_code, $language_code, $language_code );
        $results = $wpdb->get_results($sql, ARRAY_A);
        if (empty($results) || is_wp_error($results)) {
            return [];
        }
        $messages = [];
        foreach( $results as $message ) {
            $messages[$message['post_id']] = $message;
        }
        return $messages;


    }
}


function zume_word_count_scripts( $language ) {
    $count = 0;
    $scripts = list_zume_scripts( $language );
    foreach( $scripts as $script ) {
        $count += str_word_count( $script['content'] ?? '' );
    }

    return $count;
}
function zume_word_count_activities( $language ) {
    $count = 0;
    $activities = list_zume_activities( $language );
    foreach( $activities as $activity ) {
        $count += str_word_count( $activity['title'] ?? '' );
        $count += str_word_count( $activity['content'] ?? '' );
    }

    return $count;
}
function zume_word_count_messages( $language ) {
    $count = 0;
    $messages = list_zume_messages( $language );
    foreach( $messages as $message ) {
        $count += str_word_count( $message['subject'] );
        $count += str_word_count( $message['body'] );
    }

    return $count;
}
function zume_word_count_pieces( $language ) {
    $count = 0;
    $pieces = list_zume_pieces( $language );
    foreach( $pieces as $piece ) {
        $count += str_word_count( $piece['zume_piece_h1'] ?? '' );
        $count += str_word_count( $piece['zume_pre_video_content'] ?? '' );
        $count += str_word_count( $piece['zume_post_video_content'] ?? '' );
        $count += str_word_count( $piece['zume_ask_content'] ?? '' );
        $count += str_word_count( $piece['zume_seo_meta_description'] ?? '' );
    }

    return $count;
}
function zume_word_count_english() {
    $count = 0;
    $loader = new PoLoader();
    $translations = $loader->loadFile(plugin_dir_path(__DIR__) . 'zume.pot' );

    $strings = array_keys( $translations->getTranslations() );
    foreach( $strings as $string ) {
        $count += str_word_count( $string );
    }

    return $count;
}
function zume_po_strings_count( $locale ) {

    $count = 0;
    $loader = new PoLoader();

    if ( $locale == 'en' ) {
        $translations = $loader->loadFile(plugin_dir_path(__DIR__) . 'zume.pot' );
        $strings = array_keys( $translations->getTranslations() );
    } else {
        $translations = $loader->loadFile(plugin_dir_path(__DIR__) . 'zume-'.$locale.'.po' );
        $strings = array_keys( $translations->getTranslations() );
    }

    foreach( $strings as $string ) {
        if ( !empty( $string ) ) {
            $count++;
        }
    }

    return $count;
}
function zume_get_weblate() {

    if ( get_transient( __METHOD__ ) ) {
        return get_transient( __METHOD__ );
    }

    $results = [];

    $page_1 = 'https://translate.disciple.tools/api/components/zume-training/zume-training-system/translations/?format=json';
    $body_1 = json_decode( wp_remote_retrieve_body( wp_remote_get( $page_1 ) ), true );
    if ( ! isset( $body_1['results'] ) ) {
        return $results;
    }
    if ( ! empty( $body_1['next'] ) ) {
        $page_2 = 'https://translate.disciple.tools/api/components/zume-training/zume-training-system/translations/?format=json&page=2';
        $body_2 = json_decode( wp_remote_retrieve_body( wp_remote_get( $page_2 ) ), true );
        if ( isset( $body_2['results'] ) ) {
            $results = array_merge( $body_1['results'], $body_2['results'] );
        }
    }
    if ( ! empty( $body_2['next'] ) ) {
        $page_3 = 'https://translate.disciple.tools/api/components/zume-training/zume-training-system/translations/?format=json&page=3';
        $body_3 = json_decode( wp_remote_retrieve_body( wp_remote_get( $page_3 ) ), true );
        if ( isset( $body_3['results'] ) ) {
            $results = array_merge( $results, $body_3['results'] );
        }
    }

    $languages = [];
    foreach( $results as $result ) {
        $languages[ $result['language']['code'] ] = $result;
    }

    set_transient( __METHOD__, $languages, 60*60 ); // 60 minutes

    return $languages;
}

