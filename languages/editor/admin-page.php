<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

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
                'key' => 'pages',
                'label' => 'Pages',
            ),
            array(
                'key' => 'pieces',
                'label' => 'Pieces',
            ),
            array(
                'key' => 'course',
                'label' => 'Course',
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
            $lang_selected = sanitize_key( wp_unslash( $_GET["tlang"] ) );
        }

        $this->tab_loader( $title, $active_tab, $lang_selected, $tab_bar );
    }

    public function tab_loader( $title, $active_tab, $lang_selected, $tab_bar ) {
//        dt_write_log(__METHOD__ . '()');
//        dt_write_log($active_tab);
//        dt_write_log($lang_selected);

        $languages = zume_languages();
        if ( $lang_selected ) {
            $selected_language = $languages[$lang_selected];
        } else {
            $selected_language = array(
                'name' => 'Select Language',
                'enDisplayName' => 'Select Language',
                'code' => 'none',
                'displayCode' => 'none',
                'locale' => 'none',
                'nativeName' => 'Select Language',
                'rtl' => false,
            );
        }
        ?>
        <div class="wrap">

            <h2>
                <?php echo esc_attr( $title ) ?>

                <select id="load_language" name="load_language" style="width:300px;">
                    <option value="<?php echo esc_attr( $selected_language['code'] ) ?>" <?php echo ( $lang_selected == $selected_language['code'] ) ? esc_attr( 'selected' ) : ''; ?> selected>
                        <?php echo esc_attr( $selected_language['enDisplayName'] ) ?>
                    </option>
                    <?php
                    foreach( $languages as $language ) {
                        ?>
                        <option value="<?php echo esc_attr( $language['code'] ) ?>" <?php echo ( $lang_selected == $language['code'] ) ? esc_attr( 'selected' ) : ''; ?>>
                            <?php echo esc_attr( $language['enDisplayName'] ) ?>
                        </option>
                        <?php
                    }
                    ?>
                </select>
            </h2>

            <h2 class="nav-tab-wrapper">
                <?php foreach ( $tab_bar as $tab) : ?>
                    <a href="<?php echo  admin_url() . 'admin.php?page=' . $this->token . '&tab=' . $tab['key'] . '&tlang=' . $lang_selected ; ?>"
                       class="nav-tab <?php echo ( $active_tab == $tab['key'] ) ? esc_attr( 'nav-tab-active' ) : ''; ?>">
                        <?php echo esc_attr( $tab['label'] ) ?>
                    </a>
                <?php endforeach; ?>
            </h2>

            <?php
            if ( ! empty( $lang_selected ) ) {
                $this->template( 'begin', 1 );
                $this->$active_tab();
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

    public function general() {
        $loader = new PoLoader();
        $translations = $loader->loadFile(plugin_dir_path(__DIR__) . '/zume-fr_FR.po');

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

    public function pages() {
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
        list('zume' => $zume) = $phpScanner->getTranslations();
        dt_write_log($zume);
return;


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

    public function pieces() {
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

    public function course() {
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

    public function emails() {
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

    public function ctas() {
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

    public function assets() {
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
}
Zume_Language_Editor_Admin::instance();
