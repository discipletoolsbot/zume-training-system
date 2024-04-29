<?php
if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly.


class Zume_Training_Translator extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training Translator';
    public $root = 'app';
    public $type = 'translations';
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

        global $zume_languages_full_list;
        $zume_languages =$zume_languages_full_list;
        $language = $zume_languages[$this->language_code];

        $tab = $_GET['tab'] ?? 'translators';
        $tabs = [
            'translators' => $tab === 'translators' ? '' : 'hollow',
            'status' => $tab === 'status' ? '' : 'hollow',
            'pieces' => $tab === 'pieces' ? '' : 'hollow hollow-focus',
            'activities' => $tab === 'activities' ? '' : 'hollow hollow-focus',
            'scripts' => $tab === 'scripts' ? '' : 'hollow hollow-focus',
            'messages' => $tab === 'messages' ? '' : 'hollow hollow-focus',
            'assets' => $tab === 'assets' ? '' : 'hollow',
            'qr_codes' => $tab === 'qr_codes' ? '' : 'hollow ',
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
}
