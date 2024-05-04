<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_List100 extends Zume_Activites
{
    public $page_title = 'List of 100';
    public $root = 'activities';
    public $type = 'listof100';
    public $lang = 'en';

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

        $this->lang = $lang_code;

        /* Redirect /checkin to /{lang_code}/checkin */
        /* This facilitates QR codes sending users to /checkin not knowing what language they may have previously been using */
        $url = dt_get_url_path();
        if ( $url === $this->type ) {
            $lang_code_from_cookie = zume_get_language_cookie();
            if ( $lang_code_from_cookie !== 'en' ) {
                wp_redirect( $lang_code_from_cookie . '/' . $this->type );
                exit;
            }
        }

    }

    public function body(){
        ?>
        <style>
            .print_table {
                margin: 0 auto;
                width: 100%;
                max-width: 1200px;
                border-color: white;
            }
            .print_table_row {
                vertical-align: middle;
            }
            .print_table_line {
                white-space: nowrap;
                width: 100%;
            }
            .print_input {
                width: 100%;
                padding: 10px 5px;
                background-color: white;
                margin: 0;
            }
            .print_table_number {
                text-align: center;
            }
            .print_table_check_column {
                width: 100%;
                white-space: nowrap;
                text-align: center;
            }
            .print_cell {
                padding: .5em;
                background-color: lightgrey;
            }
            input[type='radio'].print_radio {
                transform: scale(2);
                margin-left: 20px;
            }
            table.unstriped tbody tr {
                border-top: 1px solid lightgrey;
                border-bottom: 0;
                background-color: white;
            }
            table td {
                border-bottom: 1px solid white !important;
            }
</style>
        <div class="activity-page">
            <header class="bg-brand">
                <div class="activity-header center">
                    <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                </div>
            </header>
            <div style="text-align:center;padding-top:1em;">
                <h1><?php echo esc_html__( 'List of 100', 'zume' ) ?></h1>
                <a class="f-0 center" href="<?php site_url() ?>/<?php echo $this->lang ?>/activities/listof100_printable" target="_blank"><?php echo esc_html__( 'Switch to Printable Version', 'zume' ) ?></a>
            </div>
            <hr>
            <div>
                <table class="unstriped print_table" >
                    <?php
                    for ($x = 1; $x <= 100; $x++) {
                        ?>
                        <tr class="print_table_row">
                            <td class="print_cell print_table_number"><?php echo esc_attr( $x ); ?></td>
                            <td class="print_cell print_table_line"><input type="text" class="print_input" name="listof100_input_<?php echo esc_attr( $x ); ?>" placeholder="<?php echo esc_attr( $x ); ?>." /></td>
                            <td class="print_cell print_table_check_column">
                                <input type="radio" class="print_radio" name="listof100_radio_<?php echo esc_attr( $x ); ?>" value="" />&nbsp; <?php echo __( 'Disciple', 'zume' ) ?>&nbsp;
                                <input type="radio" class="print_radio" name="listof100_radio_<?php echo esc_attr( $x ); ?>" value=""  />&nbsp; <?php echo __( 'Unbeliever', 'zume' ) ?>&nbsp;
                                <input type="radio" class="print_radio" name="listof100_radio_<?php echo esc_attr( $x ); ?>" value=""  />&nbsp; <?php echo __( 'Unknown', 'zume' ) ?>
                            </td>
                        </tr>
                        <?php
                    }
                    ?>
                </table>
            </div>
        </div>
        </hr>
        <?php
    }
}
Zume_Activites_List100::instance();
