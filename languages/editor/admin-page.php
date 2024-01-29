<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

# https://github.com/php-gettext/gettext

use Gettext\Loader\PoLoader;
use Gettext\Generator\MoGenerator;
use Gettext\Scanner\PhpScanner;
use Gettext\Translations;

class Zume_Language_Editor_Admin
{
    public $token;
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function __construct() {
        $this->token = 'zume_language_editor';
        add_action( "admin_menu", array( $this, "register_menu" ) );
    }

    public function register_menu() {
        add_menu_page( 'Zume Lang Editor', 'Zume Lang Editor', 'manage_options', $this->token, array( $this, 'zume_content' ), 'dashicons-admin-site', 9 );
    }

    public function zume_content() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_attr__( 'You do not have sufficient permissions to access this page.' ) );
        }

        $title = 'Zume Language Editor';

        $tab_bar = array(
            array(
                'key' => 'general',
                'label' => 'General Strings',
            ),
            array(
                'key' => 'all_strings',
                'label' => 'Files',
            ),
            array(
                'key' => 'pages',
                'label' => 'Pages',
            ),
            array(
                'key' => 'course',
                'label' => 'Course',
            ),
            array(
                'key' => 'pieces',
                'label' => 'Pieces',
            ),
            array(
                'key' => 'emails',
                'label' => 'Emails',
            ),
            array(
                'key' => 'ctas',
                'label' => 'CTAs',
            ),
            array(
                'key' => 'assets',
                'label' => 'Assets',
            ),
        );

        // determine active tabs
        $active_tab = 'general';
        $lang_selected = '';

        if ( isset( $_GET["tab"] ) ) {
            $active_tab = sanitize_key( wp_unslash( $_GET["tab"] ) );
        }

        if ( isset( $_GET["tlang"] ) ) {
            $lang_selected = sanitize_locale_name( wp_unslash( $_GET["tlang"] ) );
        }

        $this->tab_loader( $title, $active_tab, $lang_selected, $tab_bar );
    }

    public function tab_loader( $title, $active_tab, $lang_selected, $tab_bar ) {
//        dt_write_log(__METHOD__ . '()');
//        dt_write_log($active_tab);
//        dt_write_log($lang_selected);

        $languages = zume_languages();
        ?>
        <div class="wrap">

            <h2>
                <?php echo esc_attr( $title ) ?>

                <select id="load_language" name="load_language" style="width:300px;">
                    <option>Select Language</option>
                    <?php
                    foreach( $languages as $language ) {
                        ?>
                        <option value="<?php echo $language['code'] ?>" <?php echo ( $language['code'] == $lang_selected ) ? 'selected' : '' ; ?>>
                            <?php echo esc_attr( $language['enDisplayName'] ) ?>
                        </option>
                        <?php
                    }
                    ?>
                </select>
            </h2>

            <h2 class="nav-tab-wrapper">
                <?php foreach ( $tab_bar as $tab) : ?>
                    <a href="<?php echo admin_url() . 'admin.php?page=' . $this->token . '&tab=' . $tab['key'] . '&tlang=' . $lang_selected ; ?>"
                       class="nav-tab <?php echo ( $active_tab == $tab['key'] ) ? esc_attr( 'nav-tab-active' ) : ''; ?>">
                        <?php echo esc_attr( $tab['label'] ) ?>
                    </a>
                <?php endforeach; ?>
            </h2>

            <?php
            if ( ! empty( $lang_selected ) ) {
                $this->template( 'begin', 1 );
                $this->$active_tab( $languages[$lang_selected] );
                $this->template( 'end' );
            }
            ?>

        </div><!-- End wrap -->
        <script>
            jQuery(document).ready(function(){
                jQuery('#load_language').change(function(){
                    var lang = jQuery(this).val();
                    window.location.href = '<?php echo admin_url() . 'admin.php?page=' . $this->token . '&tab=' . $active_tab . '&tlang=' ?>' + lang;
                });
            })
        </script>
        <?php
    }

    public function ordered_strings( $language ) {
        $locale = $language['locale'];
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



    public function general( $language ) {
        $scan = $this->ordered_strings( $language );

        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>

                    </td>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach( $scan as $file => $list ) {
                    ?>
                    <tr style="background-color:darkgrey;" id="<?php echo $file ?>">
                        <td>
                            <strong> <?php echo $file ?> </strong>
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>
                    <?php
                    foreach( $list as $row ) {
                        ?>
                        <tr>
                            <td>
                                <?php echo $row['original'] ?>
                            </td>
                            <td>
                                <textarea name="" style="width:100%;"><?php echo $row['translation'] ?></textarea>
                            </td>
                            <td>
                                <button type="button" class="button small">Save</button>
                            </td>
                        </tr>
                        <?php
                    }
                }
                ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <?php
    }

    public function all_strings( $language ) {
        $scan = $this->ordered_strings( $language );

        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        Files
                    </td>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach( $scan as $file => $list ) {
                    ?>
                    <tr>
                        <td>
                            <strong><a href="#<?php echo $file ?>"><?php echo $file ?></a></strong>
                        </td>
                    </tr>
                    <?php
                }
                ?>
                </tbody>
            </table>
            <!-- End Box -->
        </form>
        <?php
    }

    public function pages( $language ) {
        $scan = $this->ordered_strings( $language );
        $allowed_pages = [
            'front-page.php',
            'functions/utilities/enqueue-scripts.php',
            'functions/zume-v4-seo-strings.php',
            'parts/content-share.php',
            'template-pieces-page.php',
            'template-zume-landing.php',
            'template-zume-login.php',
            'template-zume-about.php',
            'template-zume-dashboard.php',
            'functions/utilities/menu.php',
            'functions/login/zume-login.php',
            'functions/zume-v4-groups.php',
            'template-zume-resources.php',
            'template-zume-training.php',
            'functions/zume-dashboard.php',
            'template-zume-overview.php',
            'template-zume-progress.php',
            'functions/zume-three-month-plan.php',
            'template-zume-3plan.php',
            'template-zume-faq.php',
            'template-zume-privacy-policy.php',
            'template-zume-course.php',
            'template-zume-vision.php',
            'template-gmo.php',
            'parts/nav-offcanvas-topbar.php',
        ];
        $string_count = 0;
        $already_translated = [];

        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }

        ob_start();
        foreach( $scan as $file => $list ) {
            if ( ! in_array( $file, $allowed_pages ) ) {
                continue;
            }
            ?>
            <tr style="background-color:darkgrey;">
                <td>
                    <strong> <?php echo $file ?> </strong>
                </td>
                <td></td>
                <td></td>
            </tr>
            <?php
            foreach( $list as $row ) {
                if ( in_array( $row['original'], $already_translated ) ) {
                    continue;
                }
                $already_translated[] = $row['original'];
                $string_count++;
                ?>
                <tr>
                    <td>
                        <?php echo $row['original'] ?>
                    </td>
                    <td>
                        <textarea name="" style="width:100%;"><?php echo $row['translation'] ?></textarea>
                    </td>
                    <td>
                        <button type="button" class="button small">Save</button>
                    </td>
                </tr>
                <?php
            }
        }
        $table_content = ob_get_clean();
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>Strings: <?php echo $string_count ?></td>
                </tr>
                </thead>
                <tbody>
                <?php echo $table_content ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <?php
    }

    public function pieces( $language ) {
        $string_count = 0;

//        dt_write_log($this->get_zume_pieces( $language['code'] ));

        $english_list = $this->get_zume_pieces( 'en' );
        $trans_list = $this->get_zume_pieces( $language['code'] );

        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }

        ob_start();
        foreach( $english_list as $post_id => $items ) {
            $trans_post_id = zume_get_translation( $post_id, $language['code'] );
            dt_write_log($trans_post_id);
            ?>
            <tr style="background-color:darkgrey;">
                <td>
                    <strong><?php echo $post_id ?></strong>
                </td>
                <td></td>
                <td></td>
            </tr>
            <?php
            foreach( $items as $key => $item ) {
                if ( ! $item ) {
                    continue;
                }
                if ( str_starts_with( $key, '_' ) ) {
                    continue;
                }
                if ( 'zume_piece' == $key ) {
                    continue;
                }
                $string_count++;
                ?>
                <tr>
                    <td style="width:45%; max-width: 300px;">
                        <span style="color:grey;"><?php echo $key ?></span><br>
                        <textarea style="width: 100%;
                                        border: none;
                                        overflow:hidden;
                                        color:black;
                                        -webkit-box-sizing: border-box; /* <=iOS4, <= Android  2.3 */
                                        -moz-box-sizing: border-box; /* FF1+ */
                                        box-sizing: border-box;" disabled><?php echo $item ?></textarea>
                    </td>
                    <td style="width:45%; max-width: 300px;">
                        <span style="color:grey;"><?php echo $key ?></span><br>
                        <?php echo wp_editor( get_post_meta( $trans_post_id, $key, true ), 'trans'.$string_count, array( 'media_buttons' => false ) );  ?>

                    </td>
                    <td>
                        <button type="button" class="button small">Save</button>
                    </td>
                </tr>
                <?php
            }
        }
        $table_content = ob_get_clean();
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>Strings: <?php echo $string_count ?></td>
                </tr>
                </thead>
                <tbody>
                <?php echo $table_content ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <script>
            jQuery(document).ready(function() {
                jQuery('textarea').each(function() {
                    textAreaAdjust(this);
                });
            });
            function textAreaAdjust(element) {
                element.style.height = "1px";
                element.style.height = (25+element.scrollHeight)+"px";
            }
        </script>
        <?php
    }

    public function get_zume_pieces( $language_code = 'en' ) {
        global $wpdb, $table_prefix;
        $list = $wpdb->get_results($wpdb->prepare(
            "SELECT p.ID, p.post_title, p.post_content
                    FROM {$table_prefix}term_relationships tr
                    LEFT JOIN {$table_prefix}posts p ON p.ID=tr.object_id AND p.post_type = 'zume_pieces'
                    WHERE tr.term_taxonomy_id = (SELECT tt.term_taxonomy_id
                        FROM {$table_prefix}terms t
                        JOIN {$table_prefix}term_taxonomy tt ON tt.term_id=t.term_id
                        WHERE tt.taxonomy = 'language' AND t.slug = %s LIMIT 1)
                        AND p.ID IS NOT NULL;", $language_code ), ARRAY_A);

        $data = [];
        foreach( $list as $v ) {
            $meta = array_map( function( $a ) { return $a[0]; }, get_post_meta( $v['ID'] ) );
            $data[$v['ID']] = [
                'title' => $v['post_title'],
                'content' => $v['post_content'],
            ];
            $data[$v['ID']] = array_merge( $data[$v['ID']], $meta );
        }
        return $data;
    }

    public function course( $language ) {
        $scan = $this->ordered_strings( $language );
        $allowed_pages = ['functions/zume-content.php'];
        $string_count = 0;
        $already_translated = [];

        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }

        ob_start();
        foreach( $scan as $file => $list ) {
            if ( ! in_array( $file, $allowed_pages ) ) {
                continue;
            }
            ?>
            <tr style="background-color:darkgrey;">
                <td>
                    <strong> <?php echo $file ?> </strong>
                </td>
                <td></td>
                <td></td>
            </tr>
            <?php
            foreach( $list as $row ) {
                if ( in_array( $row['original'], $already_translated ) ) {
                    continue;
                }
                $already_translated[] = $row['original'];
                $string_count++;
                ?>
                <tr>
                    <td>
                        <?php echo $row['original'] ?>
                    </td>
                    <td>
                        <textarea name="" style="width:100%;"><?php echo $row['translation'] ?></textarea>
                    </td>
                    <td>
                        <button type="button" class="button small">Save</button>
                    </td>
                </tr>
                <?php
            }
        }
        $table_content = ob_get_clean();
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>Strings: <?php echo $string_count ?></td>
                </tr>
                </thead>
                <tbody>
                    <?php echo $table_content ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <?php
    }

    public function emails( $language ) {
        $list = [
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],

        ];
        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>

                    </td>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach( $list as $row ) {
                    ?>
                    <tr>
                        <td>
                            <?php echo $row['msg_source'] ?>
                        </td>
                        <td>
                            <input type="text" name="" style="width:100%;" value="<?php echo $row['msg_trans'] ?>">
                        </td>
                        <td>
                            <button type="button" class="button small">Save</button>
                        </td>
                    </tr>
                    <?php
                }
                ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <?php
    }

    public function ctas( $language ) {
        $list = [
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],

        ];
        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>

                    </td>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach( $list as $row ) {
                    ?>
                    <tr>
                        <td>
                            <?php echo $row['msg_source'] ?>
                        </td>
                        <td>
                            <input type="text" name="" style="width:100%;" value="<?php echo $row['msg_trans'] ?>">
                        </td>
                        <td>
                            <button type="button" class="button small">Save</button>
                        </td>
                    </tr>
                    <?php
                }
                ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <?php
    }

    public function assets( $language ) {
        $list = [
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],
            [
                'msg_source' => 'Text text text text text text text text text text text text text text text text text text text text',
                'msg_trans' => '',
            ],

        ];
        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>

                    </td>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach( $list as $row ) {
                    ?>
                    <tr>
                        <td>
                            <?php echo $row['msg_source'] ?>
                        </td>
                        <td>
                            <input type="text" name="" style="width:100%;" value="<?php echo $row['msg_trans'] ?>">
                        </td>
                        <td>
                            <button type="button" class="button small">Save</button>
                        </td>
                    </tr>
                    <?php
                }
                ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <?php
    }

    public function template( $section, $columns = 2 ) {
        switch ( $columns ) {

            case '1':
                switch ( $section ) {
                    case 'begin':
                        ?>
                        <div class="wrap">
                        <div id="poststuff">
                        <div id="post-body" class="metabox-holder columns-1">
                        <div id="post-body-content">
                        <!-- Main Column -->
                        <?php
                        break;


                    case 'end':
                        ?>
                        </div><!-- postbox-container 1 -->
                        </div><!-- post-body meta box container -->
                        </div><!--poststuff end -->
                        </div><!-- wrap end -->
                        <?php
                        break;
                }
                break;

            case '2':
                switch ( $section ) {
                    case 'begin':
                        ?>
                        <div class="wrap">
                        <div id="poststuff">
                        <div id="post-body" class="metabox-holder columns-2">
                        <div id="post-body-content">
                        <!-- Main Column -->
                        <?php
                        break;
                case 'right_column':
                    ?>
                    <!-- End Main Column -->
                    </div><!-- end post-body-content -->
                    <div id="postbox-container-1" class="postbox-container">
                    <!-- Right Column -->
                    <?php
                    break;
                    case 'end':
                        ?>
                        </div><!-- postbox-container 1 -->
                        </div><!-- post-body meta box container -->
                        </div><!--poststuff end -->
                        </div><!-- wrap end -->
                        <?php
                        break;
                }
                break;
        }
    }

    public function box( $section, $title = '', $args = array() ) {

        $args = wp_parse_args( $args, array(
            'row_container' => true,
            'col_span' => 1,
            'striped' => true,
        ) );

        switch ( $section ) {
            case 'top':
                ?>
                <!-- Begin Box -->
                <table class="widefat <?php echo $args['striped'] ? 'striped' : '' ?>">
                <thead><th colspan="<?php echo esc_attr( $args['col_span'] ) ?>"><?php echo esc_html( $title ) ?></th></thead>
                <tbody>

                <?php
                echo $args['row_container'] ? '<tr><td>' : '';

                break;
            case 'bottom':

                echo $args['row_container'] ? '</tr></td>' : '';
                ?>
                </tbody></table><br>
                <!-- End Box -->
                <?php
                break;
        }
    }

    /**
    public function scan_sample_pages( $language ) {
        $phpScanner = new PhpScanner(
            Translations::create('zume'),
        );
        $phpScanner->setDefaultDomain('zume');
        $phpScanner->extractCommentsStartingWith('i18n:', 'Translators:');

        foreach ( scandir( WP_PLUGIN_DIR . '/zume-training-system/site/' ) as $file) {
            if ( str_starts_with($file, '.') ) {
                continue;
            }

            if ( is_dir(WP_PLUGIN_DIR . '/zume-training-system/site/' . $file ) ) {
                foreach( scandir( WP_PLUGIN_DIR . '/zume-training-system/site/' . $file ) as $subfile ) {
                    if ( str_starts_with($subfile, '.') || ! str_ends_with($subfile, '.php' ) ) {
                        continue;
                    }
                    dt_write_log( WP_PLUGIN_DIR . '/zume-training-system/site/' . $file . '/'. $subfile);
                    $phpScanner->scanFile(WP_PLUGIN_DIR . '/zume-training-system/site/' . $file . '/'. $subfile);
                }
            }

            if (  str_ends_with($file, '.php' ) ) {
                dt_write_log(WP_PLUGIN_DIR . '/zume-training-system/site/' . $file);
                $phpScanner->scanFile(WP_PLUGIN_DIR . '/zume-training-system/site/' . $file);
            }

        }
        list( 'zume' => $translations ) = $phpScanner->getTranslations();

        if ( isset( $_POST[__FUNCTION__.'_nonce'] ) && ! empty( $_POST[__FUNCTION__.'_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[__FUNCTION__.'_nonce'] ) ), __FUNCTION__ . get_current_user_id() ) ) {
            // add actions
        }
        ?>
        <form method="post" action="">
            <?php wp_nonce_field( __FUNCTION__ . get_current_user_id(), __FUNCTION__.'_nonce', false, true ) ?>

            <!-- Box -->
            <table class="widefat striped">
                <thead>
                <tr>
                    <td style="width:45%;">
                        English
                    </td>
                    <td style="width:45%;">
                        Translation
                    </td>
                    <td>

                    </td>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach( $translations as $key => $translation ) {
                    ?>
                    <tr>
                        <td>
                            <?php echo $key ?>
                        </td>
                        <td>
                            <input type="text" name="" style="width:100%;" value="<?php echo $translation->getTranslation() ?>">

                        </td>
                        <td>
                            <button type="button" class="button small">Save</button>
                        </td>
                    </tr>
                    <?php
                }
                ?>
                </tbody>
            </table>
            <br>
            <!-- End Box -->
        </form>
        <?php
    }
     * */
}
Zume_Language_Editor_Admin::instance();
