<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

use Gettext\Loader\PoLoader;
use Gettext\Generator\MoGenerator;
use Gettext\Generator\PoGenerator;

class Zume_Training_Translator extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training Translator';
    public $root = 'zume_app';
    public $type = 'translator';
    public $user;
    public static $token = 'zume_app_translator';
    public $zume_languages;
    public $language_code;
    public $language;

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
    public $video_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,28,29];
    public $pieces_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,28,29,30,31,32];
    public $script_list = [1=>34,2=>35,3=>36,4=>37,5=>38,6=>39,7=>40,8=>41,9=>42,
                            10=>43,11=>44,12=>45,13=>46,14=>47,15=>48,16=>49,17=>50,18=>51,19=>52,
                            21=>53,22=>54,23=>55,24=>56,25=>57,26=>58,28=>60,29=>61,30=>62,
                           ];
    public $images = [93, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104];
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
        ] = zume_get_url_pieces();

        $this->zume_languages = zume_languages();
        $this->language_code = $lang_code ?? $this->language_code;
        $this->language = $this->zume_languages[ $this->language_code ];

        if ( isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

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
                p {
                    margin-block-end: var(--s2);
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
                .hollow.hollow-focus {
                    background-color: lightgreen !important;
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
                    let magic_url = 'zume_app/translator/';
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

        $zume_languages = zume_languages();
        $language = $zume_languages[$this->language_code];

        $tab = $_GET['tab'] ?? 'translators';
        $tabs = [
            'translators' => $tab === 'translators' ? '' : 'hollow',
            'status' => $tab === 'status' ? '' : 'hollow',
            'pieces' => $tab === 'pieces' ? '' : 'hollow hollow-focus',
            'emails' => $tab === 'emails' ? '' : 'hollow hollow-focus',
            'activities' => $tab === 'activities' ? '' : 'hollow hollow-focus',
            'scripts' => $tab === 'scripts' ? '' : 'hollow hollow-focus',
            'strings' => $tab === 'strings' ? '' : 'hollow',
            'ctas' => $tab === 'ctas' ? '' : 'hollow',
            'slides' => $tab === 'slides' ? '' : 'hollow',
            'qr_codes' => $tab === 'qr_codes' ? '' : 'hollow ',
        ]
        ?>
        <div style="top:0; left:0; position: fixed; background-color: white; padding: .5em; z-index:100; width: 100%; border-bottom: 1px solid lightgrey;">
            <div class="grid-x grid-padding-x" >
                <div class="cell medium-9">
                    Zume Translation for <?php echo $language['name'] ?><br>
                    <?php
                    foreach( $tabs as $tab_name => $class ) {
                        ?>
                        <a class="button <?php echo $class ?>" href="<?php echo site_url() . '/' . $this->language_code ?>/zume_app/translator?tab=<?php echo $tab_name ?>"><span style="text-transform:uppercase;"><?php echo $tab_name ?></span></a>
                        <?php
                    }
                    ?>
                </div>
                <div class="cell medium-3">
                    <select id="lang-selector">
                        <option value="<?php echo $language['code'] ?>" selected><?php echo $language['name'] ?></option>
                        <option>----------</option>
                        <?php
                        foreach( $zume_languages as $k => $l ) {
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
        <div class="grid-x grid-padding-x" style="margin-top: 120px;">
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
    /**
     * @return void
     */
    public function list_approved_languages( ) {
        if ( empty( $this->user ) ) {
            $this->user = wp_get_current_user();
        }
        $zume_languages = zume_languages();
        echo 'You are nor approved to translate '.$zume_languages[$this->language_code]['name'].'. <br><br>Approved languages are:<br>';
        $approved_languages = get_user_meta( $this->user->ID, 'zume_user_languages', true );
        $list = [];
        foreach( $approved_languages as $lang ) {
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
        $zume_languages = zume_languages();
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
        $zume_languages = $this->zume_languages;
        $language = $this->language;

        $training_items = zume_training_items();
        $video_titles = array_column( $training_items, 'title', 'key_int' );
        $script_titles = array_column( $training_items, 'title', 'script' );
        $video_to_script = array_filter( array_column( $training_items, 'script', 'key_int' ) );


        $downloads = list_zume_downloads( $this->language_code );
        $videos = list_zume_videos( $this->language_code );
        $pieces_list = list_zume_pieces( $language['code'] );


        /**
        * Template for the status tab
        */
        ?>
        <div class="grid-x grid-padding-x">
            <div class="cell">
                <table style="vertical-align: text-top;">
                    <tbody>

                        <!-- PO STRINGS -->
                        <tr style="background-color:grey; color:white;">
                            <th colspan="2" style="text-transform:uppercase;">
                                PO STRINGS <?php echo $language['name'] ?>
                            </th>
                        </tr>
                         <tr>
                            <td>
                                <?php
                                    $filename = plugin_dir_path(__DIR__) . '/zume-' . $language['locale'] . '.po';
                                    $string_count = 0;
                                    $missing_count = 0;
                                    $already_translated = [];
                                    $strings = $this->get_translation_strings();
                                    if ( ! empty( $strings ) ) {
                                        foreach( $strings as $file => $array ) {
                                            foreach( $array as $trans ) {
                                                if ( in_array( $trans['original'], $already_translated ) ) {
                                                    continue;
                                                }
                                                $already_translated[] = $trans['original'];
                                                $string_count++;
                                                if ( empty( $trans['translation'] ) ) {
                                                    $missing_count++;
                                                }
                                            }
                                        }
                                    }
                                    if (file_exists($filename)) {
                                        ?>
                                        <strong>Total Strings:</strong> <?php echo $string_count; ?><br>
                                        <strong style="color:red;">Missing Strings:</strong> <?php echo $missing_count; ?>
                                        <?php
                                    }
                                ?>
                            </td>
                            <td>
                                <?php
                                if (file_exists($filename)) {
                                    echo 'PO file last modified: ' . gmdate("F d, Y H:i:s.", filemtime($filename));
                                }
                                ?>
                            </td>
                        </tr>


                        <!-- PIECES -->
                        <tr style="background-color:grey; color:white;">
                            <th colspan="2" style="text-transform:uppercase;">
                                PIECES
                            </th>
                        </tr>
                        <?php
                        foreach( $pieces_list as $item ) {
                            ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['post_title'] ?></strong> (<?php echo $item['ID'] ?>)
                                </td>
                                <td>
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



                        <!-- EMAILS -->
                        <tr style="background-color:grey; color:white;">
                            <th colspan="2">
                                EMAILS
                            </th>
                        </tr>
                        <?php
                            $messages_other_language = $this->query_emails( $this->language_code );
                            foreach( $messages_other_language as $message ) {
                                ?>
                                <tr>
                                    <td>
                                        <strong><?php echo $message['title'] ?></strong> (<?php echo $message['post_id'] ?>)
                                    </td>
                                    <td>
                                        subject <?php echo empty( $message['subject'] ) ? '&#10060;' : '&#9989;' ?>
                                        | body <?php echo empty( $message['body'] ) ? '&#10060;' : '&#9989;' ?>
                                    </td>
                                </tr>
                        <?php } ?>



                        <!-- VIDEO ASSETS -->
                        <tr style="background-color:grey; color:white;">
                            <th colspan="2">
                                VIDEO ASSETS
                            </th>
                        </tr>
                        <?php
                            foreach( $this->video_list as $video_id ) {
                                $pdf = false;
                                $mp4 = false;
                                if( isset( $downloads[$video_to_script[$video_id]] ) ) {
                                    $pdf = $this->mirror_url . $this->language_code . '/' . $downloads[$video_to_script[$video_id]];
                                }
                                if( isset( $training_items[$video_id]['key_int'] ) ) {
                                    $mp4 = $this->mirror_url . $this->language_code . '/' . $training_items[$video_id]['key_int'] . '.mp4';
                                }
                                  ?>
                                    <tr>
                                        <td>
                                            <strong><?php echo $training_items[$video_id]['title'] ?> (<?php echo $video_id ?>)</strong>
                                        </td>
                                        <td>
                                            Vimeo  <?php echo empty( $videos[$training_items[$video_id]['key_int']] ) ? '&#10060;' : '&#9989;' ; ?>
                                            | Script <?php echo empty( $downloads[$training_items[$video_id]['script']] ) ? '&#10060;' : '&#9989;'  ; ?>
                                            | <a href="<?php echo $mp4 ?>">MP4</a> <span data-target="<?php echo $mp4; ?>" class="mp4 loading-spinner active"></span>
                                            | <a href="<?php echo $pdf; ?>">PDF</a> <span data-target="<?php echo $pdf; ?>" class="pdf loading-spinner active"></span>
                                        </td>
                                    </tr>
                                <?php
                            }
                        ?>


                        <!-- IMAGES -->
                        <tr style="background-color:grey; color:white;">
                            <th colspan="2">
                                IMAGES
                            </th>
                        </tr>
                        <?php

                            foreach( $this->images as $image_number ) {
                                $file =  $this->mirror_url . $this->language_code .'/'. $image_number . '.png';
                              ?>
                                <tr>
                                    <td>
                                        <strong><?php echo $image_number . '.png'?></strong>
                                    </td>
                                    <td>
                                        <span data-target="<?php echo $file; ?>" class="image loading-spinner active"></span>
                                        <a href="<?php echo $file ?>" target="_blank"><img src="<?php echo $file ?>" style="max-width: 100px; max-height: 100px;"> View</a>
                                    </td>
                                </tr>
                            <?php
                            }
                        ?>


                    </tbody>
                </table>
            </div>
        </div>
        <script>
            jQuery(document).ready(function() {
                jQuery('.pdf').each(function() {
                    let target = jQuery(this).data('target');
                    console.log(target)
                    if ( target ) {
                         jQuery(this).load(target, function(response, status, xhr) {
                            if (status == "error") {
                                jQuery(this).removeClass('active').html('&#10060;');
                            }
                            else {
                                jQuery(this).removeClass('active').html('&#9989;');
                            }
                        });
                    } else {
                        jQuery(this).removeClass('active').html('&#10060;');
                    }
                });
                jQuery('.mp4').each(function() {
                    let target = jQuery(this).data('target');
                    console.log(target)
                    if ( target ) {
                         jQuery(this).load(target, function(response, status, xhr) {
                            if (status == "error") {
                                jQuery(this).removeClass('active').html('&#10060;');
                            }
                            else {
                                jQuery(this).removeClass('active').html('&#9989;');
                            }
                        });
                    } else {
                        jQuery(this).removeClass('active').html('&#10060;');
                    }
                });
                jQuery('.image').each(function() {
                    let target = jQuery(this).data('target');
                    console.log(target)
                    if ( target ) {
                         jQuery(this).load(target, function(response, status, xhr) {
                            if (status == "error") {
                                jQuery(this).removeClass('active').html('&#10060;');
                            }
                            else {
                                jQuery(this).removeClass('active').html('&#9989;');
                            }
                        });
                    } else {
                        jQuery(this).removeClass('active').html('&#10060;');
                    }
                });
            });
        </script>
        <?php
    }
    public function pieces() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        $zume_languages = zume_languages();
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
                            <?php
                        } ?>
                    </tbody>
                </table>
            </div>
            <script>
                jQuery(document).ready(function($){
                    jQuery(document).foundation();

                    tinymce.init({
                        selector: 'textarea',
                        plugins: 'code link wordcount lists image',
                        menubar: 'insert',
                        toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                        link_class_list: [
                            {title: 'None', value: ''},
                            {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                            {title: 'Primary Button', value: 'button primary-button-hollow'},
                        ],
                        block_formats: 'Paragraph=p; Header 3=h3',
                        min_height: 500,
                        format_empty_lines: true
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

    public function emails() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        $languages = zume_languages();
        $language = $languages[$this->language_code];
        $messages_english = $this->query_emails( 'en' );
        $messages_other_language = $this->query_emails( $this->language_code );

        ob_start();
        foreach( $messages_english as $pid => $message ) {
            ?>
            <tr><td colspan="4" style="background:black;"></td></tr>
            <tr><td colspan="4"><?php echo $messages_english[$pid]['title'] ?? '' ?> <?php echo ( $messages_english[$pid]['post_parent_id'] ) ? '(follow up to ' . get_the_title( $messages_english[$pid]['post_parent_id'] ) . ')' : '' ?></td></tr>
            <tr>
                <td><strong>Subject:</strong></td>
                <td>
                    <?php echo $messages_english[$pid]['subject'] ?? '' ?><br>
                </td>
                <td>
                    <input type="text" class="subject_<?php echo $this->language_code ?>_<?php echo $pid ?>" value="<?php echo $messages_other_language[$pid]['subject'] ?? '' ?>" placeholder="Subject for <?php echo $language['name'] ?>" />
                </td>
                <td>
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

                tinymce.init({
                    selector: 'textarea',
                    plugins: 'code link wordcount lists image',
                    menubar: 'insert',
                    toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                    link_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                        {title: 'Primary Button', value: 'button primary-button-hollow'},
                    ],
                    block_formats: 'Paragraph=p; Header 3=h3',
                    min_height: 500,
                    format_empty_lines: true
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
    public function query_emails( $langauge_code ) {
        global $wpdb;
        $results = $wpdb->get_results(
            "SELECT p.post_title, p.post_parent, pm.post_id, pm.meta_key, pm.meta_value
            FROM zume_posts p
            LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID
            WHERE p.post_type = 'zume_messages'
                AND p.post_status != 'auto-draft'
                AND pm.meta_key != '_edit_last'
                AND pm.meta_key != '_edit_lock'
                AND pm.meta_key != 'last_modified'", ARRAY_A );

        $emails = [];
        foreach( $results as $result ) {
            $explode = explode('_', $result['meta_key']);
            if ( ! isset( $explode[1]) ) {
                continue;
            }
            if ( $explode[1] == $langauge_code ) {
                if ( ! isset( $emails[$result['post_id']] ) ) {
                    $emails[$result['post_id']] = [
                    'post_id' => '',
                    'post_parent_id' => '',
                    'title' => '',
                    'language_code' => '',
                    'subject' => '',
                    'body' => '',
                    'footer' => '',
                ];
                }

                $emails[$result['post_id']]['post_id'] = $result['post_id'];
                $emails[$result['post_id']]['post_parent_id'] = $result['post_parent'];
                $emails[$result['post_id']]['title'] = $result['post_title'];
                $emails[$result['post_id']]['language_code'] = $langauge_code;
                if ( $explode[0] == 'subject' ) {
                    $emails[$result['post_id']]['subject'] = $result['meta_value'];
                }
                if ( $explode[0] == 'body' ) {
                    $emails[$result['post_id']]['body'] = $result['meta_value'] ?? '';
                }
                if ( $explode[0] == 'footer' ) {
                    $emails[$result['post_id']]['footer'] = $result['meta_value'] ?? '';
                }

            }
        }
        return $emails;
    }

    public function scripts() {
        if( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        $zume_languages = zume_languages();
        $language = $zume_languages[$this->language_code];
        $en_list = list_zume_scripts( 'en' );
        $language_list = list_zume_scripts( $language['code'] );
        $fields = Zume_PDF_DOwnload_Post_Type::instance()->get_custom_fields_settings();

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
                        foreach( $list as $item ) {
                             ?>
                            <tr>
                                <td style="background-color: grey; width: 40%; color: white;"><?php echo $fields[$item['en']['script_id'] .'_script']['name'] ?? '' ?></td>
                                <td style="background-color: grey; width: 40%;"></td>
                                <td style="background-color: grey; width: 10%;"></td>
                            </tr>
                            <tr>
                                <td>
                                    <?php echo $item['en']['content'] ?? ''  ?>
                                </td>
                                <td>
                                    <textarea style="height:500px;" id="<?php echo hash('sha256', $item['lang']['script_id'] . $item['lang']['post_id'] ) ?>"><?php echo $item['lang']['content'] ?? '' ;  ?></textarea>
                                </td>
                                <td>
                                    <button class="button save_textarea" data-target="<?php echo hash('sha256', $item['lang']['script_id'] . $item['lang']['post_id'] ) ?>" data-key="<?php echo $item['lang']['script_id'] ?>_script" data-post="<?php echo $item['lang']['post_id'] ?>">Save</button>
                                    <br><span class="loading-spinner <?php echo hash('sha256', $item['lang']['script_id'] . $item['lang']['post_id'] ) ?>"></span>
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

                    tinymce.init({
                        selector: 'textarea',
                        plugins: 'code link wordcount lists image',
                        menubar: 'insert',
                        toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                        link_class_list: [
                            {title: 'None', value: ''},
                            {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                            {title: 'Primary Button', value: 'button primary-button-hollow'},
                        ],
                        block_formats: 'Paragraph=p; Header 3=h3',
                        min_height: 800,
                        format_empty_lines: true
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
        $languages = zume_languages();
        $language = $languages[$this->language_code];
        $messages_english = $this->query_activities( 'en' );
        $messages_other_language = $this->query_activities( $this->language_code );

        ob_start();
        foreach( $messages_english as $pid => $message ) {
            ?>
            <tr><td colspan="4" style="background:black;"></td></tr>
            <tr>
                <td colspan="2">
                    <?php echo $messages_english[$pid]['post_title'] ?? '' ?><br />
                    <a href="<?php echo site_url() . '/en/zume_activities/' . $messages_english[$pid]['post_title'] ?>" target="_blank"><?php echo site_url() . '/en/zume_activities/' . $messages_english[$pid]['post_title'] ?></a>
                </td>
                <td colspan="2">
                    <br />
                    <a href="<?php echo site_url() . '/' . $this->language_code . '/zume_activities/' . $messages_other_language[$pid]['post_title'] ?>" target="_blank"><?php echo site_url() . '/' . $this->language_code . '/zume_activities/' . $messages_other_language[$pid]['post_title'] ?></a>
                </td>
            </tr>
            <tr>
                <td><strong>Title:</strong></td>
                <td>
                    <?php echo $messages_english[$pid]['title'] ?? '' ?><br>
                </td>
                <td>
                    <input type="text" class="title_<?php echo $this->language_code ?>_<?php echo $pid ?>" value="<?php echo $messages_other_language[$pid]['title'] ?? '' ?>" placeholder="Subject for <?php echo $language['name'] ?>" />
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
                    <?php echo $messages_english[$pid]['content'] ?? '' ?><br>
                </td>
                <td>
                    <textarea id="content_<?php echo $this->language_code ?>_<?php echo $pid ?>" placeholder="Body for <?php echo $language['name'] ?>"><?php echo $messages_other_language[$pid]['content'] ?? '' ?></textarea>
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

                tinymce.init({
                    selector: 'textarea',
                    plugins: 'code link wordcount lists image table',
                    menubar: 'insert table',
                    toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat ',
                    link_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                        {title: 'Primary Button', value: 'button primary-button-hollow'},
                    ],
                    block_formats: 'Paragraph=p; Header 3=h3',
                    min_height: 800,
                    format_empty_lines: true
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
    public function query_activities( $langauge_code ) {
        global $wpdb;
        $results = $wpdb->get_results(
            "SELECT p.post_title, p.post_parent, pm.post_id, pm.meta_key, pm.meta_value
            FROM zume_posts p
            LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID
            WHERE p.post_type = 'zume_activities'
            AND p.post_status != 'auto-draft'
            AND pm.meta_key != '_edit_last'
            AND pm.meta_key != '_edit_lock'
            AND pm.meta_key != 'last_modified';", ARRAY_A );

        $activities = [];
        foreach( $results as $result ) {
            $explode = explode('_', $result['meta_key']);
            if ( ! isset( $explode[1]) ) {
                continue;
            }
            if ( $explode[1] == $langauge_code ) {
                if ( ! isset( $activities[$result['post_id']] ) ) {
                    $activities[$result['post_id']] = [
                    'post_id' => '',
                    'post_parent_id' => '',
                    'post_title' => '',
                    'language_code' => '',
                    'title' => '',
                    'content' => '',
                ];
                }

                $activities[$result['post_id']]['post_id'] = $result['post_id'];
                $activities[$result['post_id']]['post_parent_id'] = $result['post_parent'];
                $activities[$result['post_id']]['post_title'] = $result['post_title'];
                $activities[$result['post_id']]['language_code'] = $langauge_code;
                if ( $explode[0] == 'title' ) {
                    $activities[$result['post_id']]['title'] = $result['meta_value'];
                }
                if ( $explode[0] == 'content' ) {
                    $activities[$result['post_id']]['content'] = $result['meta_value'] ?? '';
                }
            }
        }
//dt_write_log($activities);
        return $activities;
    }

    public function ctas() {
        $ctas = Zume_System_CTA_API::get_ctas();
        foreach( $ctas as $cta ) {
            ?>
            <div class="cta">
                <h3><?php echo $cta['content']['title'] ?></h3>
                <p><?php echo $cta['content']['description'] ?></p>
                <a href="<?php echo $cta['content']['link'] ?>" class="button"><?php echo $cta['content']['link_text'] ?></a>
            </div>
            <?php
        }

    }

    public function slides() {

        $zume_languages = zume_languages();
        $language = $zume_languages[$this->language_code];
        //load the new text domain
        $new_language = $language['locale'];
        load_textdomain( 'zume', plugin_dir_path(__DIR__) .'/zume-'.$new_language.'.mo' );

        ?>

       <div style="
                top:90px;
                left:0;
                position: fixed;
                background-color: white;
                padding: .5em;
                z-index:100;
                width: 100%;
                border-bottom: 1px solid lightgrey;
                ">
            <select id="course_selector">
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
                $('#course_selector').on('change', function(){
                    let value = $(this).val();
                    let parts = value.split('_');
                    let type = parts[0];
                    let session = parts[1];
                    if ( ! session ) {
                        window.location.href = `/zume_app/translator/?tab=slides`;
                    }
                    window.location.href = `?tab=slides&type=${type}&session=${session}`;
                });

                if ( type !== '' ) {
                    $("select option[value="+type+"_"+session+"]").prop('selected', true );
                }
            });
        </script>
        <div style="margin-top: 70px;"><!-- padding for under dropdown -->

        <?php
        // slide printer
        if ( isset( $_GET['type'], $_GET['session'] ) ) {

            // get the slides for the schedule and session
            $build = Zume_Course_Builder::builder( $_GET['type'], $language['code'], $_GET['session'] );

            if ( empty( $_GET['session'] ) ) {
                foreach( $build as $session ) {
                    foreach( $session as $slide ) {
                        // print keys above slides
                        echo $slide['key'] . ' - ' . $slide['type'];
                        echo '<br>';

                        // print the slide
                        echo '<div class="slide-outline">';

                        zume_course_slide_template( $slide );

                        echo '</div>';
                    }
                }
            } else {
                foreach( $build as $slide ) {
                    // print keys above slides
                    echo $slide['key'] . ' - ' . $slide['type'];
                    echo '<br>';

                    // print the slide
                    echo '<div class="slide-outline">';

                    zume_course_slide_template( $slide );

                    echo '</div>';
                }
            }

            // print the css
            zume_course_slide_css($build);
        }
        ?>


        </div> <!-- end padding for under dropdown -->
        <?php

    }

    public function qr_codes() {
        ?>
        <a href="#checkin">Checkins</a> | <a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#scripts">Scripts</a><br>
        <style>
            .qr-table img {
                width: 150px;
                margin: 0 auto;
            }
        </style>
        <h2 id="checkin">Checkins</h2>
         <table class="qr-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>QR Code</th>
                </tr>
            </thead>
           <tbody>
                <?php
                $list = [
                    // set a
                    5678 => 'set_a_01', // 10 session 1
                    2468 => 'set_a_02', // 10 session 2
                    6543 => 'set_a_03', // 10 session 3
                    8764 => 'set_a_04', // 10 session 4
                    6542 => 'set_a_05', // 10 session 5
                    1235 => 'set_a_06', // 10 session 6
                    4322 => 'set_a_07', // 10 session 7
                    9870 => 'set_a_08', // 10 session 8
                    1355 => 'set_a_09', // 10 session 9
                    5430 => 'set_a_10', // 10 session 10
                    // set b
                    3354 => 'set_b_01', // 20 session 1
                    4568 => 'set_b_02', // 20 session 2
                    8767 => 'set_b_03', // 20 session 3
                    6787 => 'set_b_04', // 20 session 4
                    3450 => 'set_b_05', // 20 session 5
                    2344 => 'set_b_06', // 20 session 6
                    1116 => 'set_b_07', // 20 session 7
                    5431 => 'set_b_08', // 20 session 8
                    8768 => 'set_b_09', // 20 session 9
                    2347 => 'set_b_10', // 20 session 10
                    9434 => 'set_b_11', // 20 session 11
                    2348 => 'set_b_12', // 20 session 12
                    6785 => 'set_b_13', // 20 session 13
                    9872 => 'set_b_14', // 20 session 14
                    4327 => 'set_b_15', // 20 session 15
                    2871 => 'set_b_16', // 20 session 16
                    4328 => 'set_b_17', // 20 session 17
                    6548 => 'set_b_18', // 20 session 18
                    7657 => 'set_b_19', // 20 session 19
                    2767 => 'set_b_20', // 20 session 20
                ];
                foreach( $list as $i => $v ) {
                    $url = site_url() . '/zume_app/qr/?l='.$this->language_code. '&c='. $i;
                    $qr_url = zume_create_qr_url( $url );
                    echo '<tr>';
                    echo '<td>Code: '. $i . ' for ' . $v . '</td>';
                    echo '<td><a href="' . $url . '" target="_blank">' . $url . '</a></td>';
                    echo '<td><img src="' . $qr_url . '" /></td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
        <div id="activities" style="height: 100px;"></div>
        <a href="#checkin">Checkins</a> | <a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#scripts">Scripts</a><br>
        <h2>Activities</h2>
         <table class="qr-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>QR Code</th>
                </tr>
            </thead>
            <tbody>
                <?php
                 $activities = [
                    'soaps',
                    'accountability',
                    'prayercycle',
                    'listof100',
                    'sharegospel',
                    'sharetestimony',
                    'lordssupper',
                    'blessprayer',
                    '33groupmk5',
                    '33groupa2',
                    '33groupm6',
                    'prayerwalking',
                    '3monthplan',
                    'coachingchecklist',
                    'peermentoring',
                    '4fields',
                    'genmapping',
                ];
                foreach( $activities as $item ) {
//                    dt_write_log( $item );
                    $url = site_url() . '/zume_app/qr/?l='.$this->language_code.'&a='.$item;
                    $qr_url = zume_create_qr_url( $url );
                    echo '<tr>';
                    echo '<td>' . $item . '</td>';
                    echo '<td><a href="' . $url . '" target="_blank">' . $url . '</a></td>';
                    echo '<td><img src="' . $qr_url . '" /></td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
         <div id="videos" style="height: 100px;"></div>
         <a href="#checkin">Checkins</a> | <a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#scripts">Scripts</a><br>
        <h2>Videos</h2>
        <table class="qr-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>QR Code</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $training_items = zume_training_items();
                foreach( $training_items as $item ) {
                    if ( empty( $item['script'] ) ) {
                        continue;
                    }
                    $id =  intval( $item['key'] );
                    $url = site_url() . '/zume_app/qr/?l='.$this->language_code. '&v='. $id;
                    $qr_url = zume_create_qr_url( $url );
                    echo '<tr>';
                    echo '<td>' . $item['title'] . '</td>';
                    echo '<td><a href="' . $url . '" target="_blank">' . $url . '</a></td>';
                    echo '<td><img src="' . $qr_url . '" /></td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>

        <!-- SCRIPTS -->
         <div id="scripts" style="height: 100px;"></div>
         <a href="#checkin">Checkins</a> | <a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#scripts">Scripts</a><br>
        <h2>Scripts</h2>
        <table class="qr-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>QR Code</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $training_items = zume_training_items();
                foreach( $training_items as $item ) {
                    if ( empty( $item['script'] ) ) {
                        continue;
                    }
                    $id =  intval( $item['key'] );
                    $url = site_url() . '/zume_app/qr/?l='.$this->language_code. '&s='. $item['script'];
                    $qr_url = zume_create_qr_url( $url );
                    echo '<tr>';
                    echo '<td>' . $item['title'] . '</td>';
                    echo '<td><a href="' . $url . '" target="_blank">' . $url . '</a></td>';
                    echo '<td><img src="' . $qr_url . '" /></td>';
                    echo '</tr>';
                }
                ?>
            </tbody>
        </table>
        <?php
    }

    public function strings() {
        $zume_languages = zume_languages();
        $language = $zume_languages[$this->language_code];
        $string_count = 0;
        $missing_count = 0;
        $already_translated = [];
        $strings = $this->get_translation_strings();

        ob_start();
            foreach( $strings as $file => $array ) {
                 ?>
                    <tr>
                        <td colspan="3" style="background: grey; color: white;"><?php echo $file; ?></td>
                    </tr>
                <?php
                foreach( $array as $trans ) {
                    if ( in_array( $trans['original'], $already_translated ) ) {
                        continue;
                    }
                    $already_translated[] = $trans['original'];
                    $string_count++;
                    if ( empty( $trans['translation'] ) ) {
                        $missing_count++;
                    }
                    ?>
                    <tr>
                        <td><?php echo $trans['line']; ?></td>
                        <td><?php echo $trans['original']; ?></td>
                        <td><?php echo $trans['translation']; ?></td>
                    </tr>
                    <?php
                }
            }
        $table_content = ob_get_clean();
        ?>
        <p>Total Translation Strings: <?php echo $string_count ?> | Missing Translation Strings: <?php echo $missing_count ?></p>
        <table class="qr-table">
            <thead>
                <tr>
                    <th>Line</th>
                    <th>English</th>
                    <th><?php echo $language['name'] ?></th>
                </tr>
            </thead>
            <tbody>
                <?php echo $table_content; ?>
            </tbody>
        </table>
        <?php
    }
    public function get_translation_strings() {
        $languages = zume_languages();
        $locale = $languages[$this->language_code]['locale'];
        $locale_file = plugin_dir_path(__DIR__) . '/zume-' . $locale . '.po';
        if ( ! file_exists( $locale_file ) ) {
            echo 'No translation file found';
            return;
        }
        $loader = new PoLoader();
        $translations = $loader->loadFile($locale_file );


        $strings = [];
        foreach( $translations as $translation ) {
            $references = $translation->getReferences();
            foreach( $references as $file_name => $reference ) {
                if ( ! isset( $strings[$file_name] ) ) $strings[$file_name] = [];
                foreach( $reference as $line ) {
                    $strings[$file_name][] = [
                        'line' => $line,
                        'original' => $translation->getOriginal(),
                        'translation' => $translation->getTranslation(),
                    ];
                }
                usort($strings[$file_name], fn($a, $b) => $a['line'] <=> $b['line']);
            }
        }

        return $strings;
    }

}

Zume_Training_Translator::instance();

if ( ! function_exists( 'list_zume_pieces' ) ) {
    function list_zume_pieces( $language_code ) {
        global $wpdb, $table_prefix;
        $term_id = get_term_id_by_lang_code( $language_code );

        $sql = $wpdb->prepare( "SELECT p.*, pm.meta_value as zume_piece, pm2.meta_value as zume_piece_h1, pm3.meta_value as zume_pre_video_content, pm4.meta_value as zume_post_video_content, pm5.meta_value as zume_ask_content
                FROM {$table_prefix}posts p
                JOIN {$table_prefix}term_relationships tr ON tr.object_id = p.ID AND tr.term_taxonomy_id = %s
                JOIN {$table_prefix}postmeta pm ON pm.post_id = p.ID AND pm.meta_key = 'zume_piece' AND pm.meta_value != ''
                LEFT JOIN {$table_prefix}postmeta pm2 ON pm2.post_id = p.ID AND pm2.meta_key = 'zume_piece_h1'
                LEFT JOIN {$table_prefix}postmeta pm3 ON pm3.post_id = p.ID AND pm3.meta_key = 'zume_pre_video_content'
                LEFT JOIN {$table_prefix}postmeta pm4 ON pm4.post_id = p.ID AND pm4.meta_key = 'zume_post_video_content'
                LEFT JOIN {$table_prefix}postmeta pm5 ON pm5.post_id = p.ID AND pm5.meta_key = 'zume_ask_content'
                ORDER BY CAST(pm.meta_value AS unsigned );",
            $term_id );
        $results = $wpdb->get_results( $sql, ARRAY_A );
        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }

        return $results;
    }
}
if ( ! function_exists( 'list_zume_downloads' ) ) {
    function list_zume_downloads( $language_code ) {
        global $wpdb;

        $sql = $wpdb->prepare( "SELECT p.post_title, pm.meta_key, pm.meta_value
                FROM zume_posts p
                JOIN zume_postmeta pm ON pm.post_id=p.ID
                WHERE p.post_title = %s
                AND p.post_type = 'zume_download'
                AND SUBSTRING( pm.meta_key, 1, 2) > 30 AND SUBSTRING( pm.meta_key, 1, 2) < 65;",
            $language_code );
        $results = $wpdb->get_results( $sql, ARRAY_A );
        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }
        $downloads = [];
        foreach( $results as $result ) {
            $downloads[$result['meta_key']] = $result['meta_value'];
        }
        return $downloads;
    }
}
if ( ! function_exists( 'list_zume_scripts' ) ) {
    function list_zume_scripts( $language_code ) {
        global $wpdb;

        $sql = $wpdb->prepare( "SELECT p.post_title, pm.post_id, SUBSTRING( pm.meta_key, 1, 2) as script_id, pm.meta_value as content
                            FROM zume_posts p
                            JOIN zume_postmeta pm ON pm.post_id=p.ID
                            WHERE p.post_type = 'zume_download'
                            AND pm.meta_key LIKE '%_script'
                            AND p.post_title = %s;", $language_code );

            $results = $wpdb->get_results( $sql, ARRAY_A );
        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }
        return $results;
    }
}
if ( ! function_exists( 'list_zume_videos' ) ) {
    function list_zume_videos( $language_code ) {
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT p.post_title, pm.meta_key, pm.meta_value
                FROM zume_posts p
                JOIN zume_postmeta pm ON pm.post_id=p.ID
                WHERE p.post_title = %s
                AND p.post_type = 'zume_video'
				AND pm.meta_key != '_edit_last'
				AND pm.meta_key != '_edit_modified'
				AND pm.meta_key != '_edit_lock';",
            $language_code );
        $results = $wpdb->get_results( $sql, ARRAY_A );
        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }
        $downloads = [];
        foreach( $results as $result ) {
            $downloads[$result['meta_key']] = $result['meta_value'];
        }
        return $downloads;
    }
}

if ( ! function_exists('get_term_id_by_lang_code') ) {
    function get_term_id_by_lang_code( $language_code ) {
        global $wpdb, $table_prefix;
        $sql = $wpdb->prepare( "SELECT tt.term_taxonomy_id
                FROM {$table_prefix}terms t
                JOIN {$table_prefix}term_taxonomy tt ON tt.term_id = t.term_id
                WHERE t.slug = %s AND tt.taxonomy = 'language';", $language_code );
        $result = $wpdb->get_var( $sql );
        if ( empty( $result ) || is_wp_error( $result ) ) {
            return false;
        }
        return $result;
    }
}
