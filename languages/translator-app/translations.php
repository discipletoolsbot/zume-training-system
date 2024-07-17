<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly.

// phpcs:disable

use Gettext\Loader\PoLoader;

class Zume_Training_Translations extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Translations';
    public $root = 'app';
    public $type = 'translations';
    public $user;
    public static $token = 'app_translations';
    public $zume_languages;
    public $language_code;
    public $language;

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

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body_checker' ] );
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
            <?php //phpcs:ignore ?>
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
                    margin-bottom: var(--s2);
                }
                img {
                    margin-bottom: var(--s2)
                }
                .checkmark {
                    display: inline-block;
                    transform: rotate(45deg);
                    height: 25px;
                    width: 12px;
                    border-bottom: 7px solid #78b13f;
                    border-right: 7px solid #78b13f;
                }
                #translations-tabs .button {
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
                span.green {
                    background-color: green;
                    width: 20px;
                    height: 20px;
                    padding: 0 .6em;
                    color: white;
                }
                span.green::after {
                    content: "\2713";
                }
                span.red {
                    background-color: red;
                    width: 20px;
                    height: 20px;
                    padding: 0 .7em;
                }
                span.red::after {
                    content: "\2717";
                }
                span.percent-100 {
                    font-weight: 900;
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
                    let magic_url = 'app/translations/';
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
    public function body_checker() {
        if ( !is_user_logged_in() ) { // test if logged in
            if ( $this->language_code === 'en' ) {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->root . '/' . $this->type ) );
            } else {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->language_code . '/' . $this->root . '/' . $this->type ) );
            }
        }
        $this->user = wp_get_current_user();

        if ( ! in_array( 'administrator', (array) $this->user->roles ) ) {  // test if approved translator role
            echo 'User ' . esc_html( $this->user->user_email ) . ' is not an administrator.';
            return;
        }

        $this->body();
    }
    public function body(){
        /* variables */
        global $zume_languages_full_list;
        ksort( $zume_languages_full_list );

        $pieces = zume_word_count_pieces( 'en' );
        $scripts = zume_word_count_scripts( 'en' );
        $activities = zume_word_count_activities( 'en' );
        $messages = zume_word_count_messages( 'en' );
        $strings = zume_word_count_english();

        $weblate = zume_get_weblate_completion();

        ?>

        <div style="top:0; left:0; position: fixed; background-color: white; padding: .5em; z-index:100; width: 100%; border-bottom: 1px solid lightgrey;">
            <div class="grid-x grid-padding-x" >
                <div class="cell medium-9" id="translator-tabs">
                    <h2>Zúme Translations Scoreboard</h2>
                </div>
                <div class="cell medium-3">
                    <?php
                    if ( in_array( 'administrator', (array) $this->user->roles ) ) {
                        echo '<a class="button hollow clear" style="float:right;" href="/app/translator">Go To Translator Portal</a>';
                    }
                    ?>
                </div>
            </div>
        </div>
        <div class="grid-x grid-padding-x" style="margin-top: 100px;">

            <!-- OVERVIEW SECTION -->
            <div class="cell medium-12" style="border-bottom: 1px solid lightgrey; padding-bottom: 1.5em;margin-bottom:1.5em;">
                <strong style="text-decoration: underline;">ENGLISH WORDS</strong>:
                <strong>Weblate:</strong> <?php echo number_format( $strings ); ?> words |
                <strong>Scripts:</strong> <?php echo number_format( $scripts ); ?> words |
                <strong>Activities:</strong> <?php echo number_format( $activities ); ?> words |
                <strong>Messages:</strong> <?php echo number_format( $messages ); ?> words |
                <strong>Pieces:</strong> <?php echo number_format( $pieces ); ?> words ||
                <strong style="text-decoration: underline;">TOTAL:</strong> <?php echo number_format( $pieces + $scripts + $activities + $messages + $strings ); ?> words
            </div>

            <!-- CONTENT LIST SECTION -->
            <div class="cell medium-12">
                <table class="hover click-table" id="content-table">
                    <thead>
                    <tr>
                        <th style="width:20px;"></th>
                        <th>Language</th>
                        <th>Weblate</th>
                        <th>Scripts</th>
                        <th>Activities</th>
                        <th>Messages</th>
                        <th>Pieces</th>
                    </tr>
                    </thead>
                    <tbody>

                    <?php
                    $count = 1;
                    $column = array_column( $zume_languages_full_list, 'code', 'name' );
                    ksort( $column );
                    foreach ( $column as $name => $code ) {
                        $s = zume_string_count_scripts( $code );
                        $a = zume_string_count_activities( $code );
                        $m = zume_string_count_messages( $code );
                        $p = zume_string_count_pieces( $code );
                        $sp = translation_get_percent( $s, 30 ) ;
                        $ap = translation_get_percent( $a, 24 );
                        $mp = translation_get_percent( $m, 32 );
                        $pp = translation_get_percent( $p, 160 );
                        $web = round( $weblate[$code] );
                        ?>
                        <tr class="<?php echo $code ?>" data-value="<?php echo esc_html( $code )  ?>">
                            <td><?php echo $count ?></td>
                            <td><a href="/<?php echo esc_attr( $code ) ?>/app/translator/?tab=status"><?php echo esc_attr( $name ) ?></a></td>
                            <td><span class="percent-<?php echo $web ?>"><?php echo $web ?>%</span></td>
                            <td><span class="percent-<?php echo $sp ?>"><?php echo $s ?>/30 | <?php echo $sp ?>%</span></td>
                            <td><span class="percent-<?php echo $ap ?>"><?php echo $a ?>/24 | <?php echo $ap ?>%</span></td>
                            <td><span class="percent-<?php echo $mp ?>"><?php echo $m ?>/32 | <?php echo $mp ?>%</span></td>
                            <td><span class="percent-<?php echo $pp ?>"><?php echo $p ?>/160 | <?php echo $pp ?>%</span></td>
                        </tr>
                        <?php
                        $count++;
                    }
                    ?>
                    </tbody>
                </table>

            </div>

            <!-- PUBLISH STATUS SECTION -->
            <div class="cell medium-12">
                <h3>PUBLISHED STATUS</h3><hr></hr>
                <table class="hover click-table" id="global-table">
                    <thead>
                    <tr>
                        <th style="width:1%"></th>
                        <th style="width:8%">Display</th>
                        <th style="width:8%">Native</th>
                        <th style="width:4%">Population</th>
                        <th style="width:2%">RTL</th>
                        <th style="width:2%">Code</th>
                        <th style="width:2%">Locale</th>
                        <th style="width:2%">Weblate</th>
                        <th style="width:4%">v4 Available</th>
                        <th style="width:4%">Translator Enabled</th>
                        <th style="width:4%">v5 Ready</th>
                        <th style="width:4%">Pieces</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    $globe_count = 1;
                    foreach ( $column as $name => $code ) {
                        $language = $zume_languages_full_list[$code];
                        ?>
                        <tr class="<?php echo esc_html( $language['code'] )  ?>" data-value="<?php echo esc_html( $language['code'] )  ?>">
                            <td><?php echo esc_html( $globe_count ) ?></td>
                            <td><?php echo esc_html( $language['enDisplayName'] ) ?></td>
                            <td><?php echo esc_html( $language['nativeName'] ) ?></td>
                            <td><?php echo esc_html( number_format( $language['population'] ) ) ?></td>
                            <td><?php echo ( $language['rtl'] ) ?'Yes' :'No' ?></td>
                            <td><?php echo esc_html( $language['code'] ) ?></td>
                            <td><?php echo esc_html( $language['locale'] ) ?></td>
                            <td><?php echo esc_html( $language['weblate'] ) ?></td>
                            <td><?php echo ( $language['enable_flags']['version_4_available'] ) ? '<span class="green"></span>' : '<span class="red"></span>' ?></td>
                            <td><?php echo ( $language['enable_flags']['translator_enabled'] ) ? '<span class="green"></span>' : '<span class="red"></span>' ?></td>
                            <td><?php echo ( $language['enable_flags']['version_5_ready'] ) ? '<span class="green"></span>' : '<span class="red"></span>' ?></td>
                            <td><?php echo ( $language['enable_flags']['pieces_pages'] ) ? '<span class="green"></span>' : '<span class="red"></span>' ?></td>
                        </tr>
                        <?php
                        $globe_count++;
                    }
                    ?>
                    </tbody>
                </table>
            </div>
            <script>
                jQuery(document).ready(function(){
                    jQuery('.en').css('background-color', 'yellow' )

                    jQuery('.click-table tr').on('click', function(e){
                        jQuery('tr').css('background-color', '')
                        let code = jQuery(this).data('value')
                        jQuery('.'+code).css('background-color', 'yellow' )
                    })
                })
            </script>

        </div>
        <?php
    }
}
Zume_Training_Translations::instance();


function zume_string_count_scripts( $language ) {
    $count = 0;
    $scripts = list_zume_scripts( $language );
    foreach ( $scripts as $script ) {
        $count += ( $script['content'] ) ? 1 : 0;
    }

    return $count;
}
function zume_string_count_activities( $language ) {
    $count = 0;
    $activities = list_zume_activities( $language );
    foreach ( $activities as $activity ) {
        $count += ( $activity['title'] ) ? 1 : 0;
        $count += ( $activity['content'] ) ? 1 : 0;
    }

    return $count;
}
function zume_string_count_messages( $language ) {
    $count = 0;
    $messages = list_zume_messages( $language );
    foreach ( $messages as $message ) {
        $count += ( $message['subject'] ) ? 1 : 0;
        $count += ( $message['body'] ) ? 1 : 0;
    }

    return $count;
}
function zume_string_count_pieces( $language ) {
    $count = 0;
    $pieces = list_zume_pieces( $language );
    foreach ( $pieces as $piece ) {
        $count += ( $piece['zume_piece_h1'] ) ? 1 : 0;
        $count += ( $piece['zume_pre_video_content'] ) ? 1 : 0;
        $count += ( $piece['zume_post_video_content'] ) ? 1 : 0;
        $count += ( $piece['zume_ask_content'] ) ? 1 : 0;
        $count += ( $piece['zume_seo_meta_description'] ) ? 1 : 0;
    }

    return $count;
}
function zume_strings_get_weblate() {

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
    foreach ( $results as $result ) {
        $languages[ $result['language']['code'] ] = $result;
    }

    set_transient( __METHOD__, $languages, 60 *60 ); // 60 minutes

    return $languages;
}
function zume_get_weblate_completion() {
    $languages = zume_strings_get_weblate();
    global $zume_languages_full_list;

    $list = [];
    foreach ( $zume_languages_full_list as $item ) {
        $list[$item['weblate']] = [
            'code' => $item['code'],
            'percent' => 0,
        ];
    }

    foreach ( $languages as $index => $language ) {
        if ( ! isset( $list[$index]['percent'] ) ) {
            $list[$index] = [
                'code' => '',
                'percent' => 0,
            ];
        }
        $list[$index]['percent'] = $language['translated_percent'];
    }

    $codes = [];
    foreach ( $list as $value ) {
        $codes[$value['code']] = $value['percent'];
    }

    $codes['asl'] = 100;

    dt_write_log( $codes );
    return $codes;
}

function translation_get_percent( $current_value, $target_value ) {
    if ( $current_value < 1 ) {
        return 0;
    }
    return round( $current_value /$target_value *100 );
}
// phpcs:enable
