<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_List100_Printable extends Zume_Activites
{
    public $page_title = 'List of 100 Printable';
    public $root = 'activities';
    public $type = 'listof100_printable';
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
    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return [];
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return [];
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
                vertical-align: bottom;
            }
            .print_table_line {
                border-bottom: 1px solid black;
                width: 70%;
            }
            .print_table_number {
                text-align: center;
            }
            .print_table_check_column {
                width: 25%;
                white-space: nowrap;
                text-align: center;
            }
            .print_cell {
                padding: 2em 0 0;
            }
        </style>
        <div class="activity-page">
            <div style="text-align:center;">
                <h1><?php echo esc_html__( 'List of 100', 'zume' ) ?></h1>
            </div>
            <hr>
            <div>
                <table class="unstriped print_table" >
                <?php
                for ($x = 1; $x <= 100; $x++) {
                    ?>
                    <tr class="print_table_row">
                        <td class="print_cell print_table_number"><?php echo $x; ?></td>
                        <td class="print_cell print_table_line"></td>
                        <td class="print_cell print_table_check_column">&#9744; <?php echo __( 'Disciple', 'zume' ) ?>&nbsp;&nbsp; &#9744; <?php echo __( 'Unbeliever', 'zume' ) ?>&nbsp;&nbsp;  &#9744; <?php echo __( 'Unknown', 'zume' ) ?></td>
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
Zume_Activites_List100_Printable::instance();
