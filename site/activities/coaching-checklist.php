<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Coaching extends Zume_Activites
{
    public $page_title = 'Coaching Checklist';
    public $root = 'activities';
    public $type = 'coachingchecklist';
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
            .activity-page {
                margin: 0 auto;
                width: 100%;
                max-width: 1200px;
                border-color: white;
            }
            .activity-title {
                text-align: center;
            }
            .activity-content {
            }
            .coaching_column {
                border-left: 1px solid grey;
                width: 140px;
                text-align: center;
            }
            .coaching_title {
                width: 50%;
            }
            .coaching_header td {
                background-color: white;
                border-bottom: 4px solid grey;
            }
            .coaching_bottom {
                border-bottom: 1px solid grey;
            }
            .coaching-table {
                width: 100%;
                font-size: .8em;
                font-family: Arial, sans-serif;
            }
            .coaching-table td {
                padding: .7em;
            }
            .coaching_row td {

            }
            .coaching_right {
                text-align: right;
            }
            .coaching_table_title {
                font-size: 1.5em;
                font-weight: bold;
            }
        </style>
        <div class="activity-page">
            <div class="activity-title">
                <h1 ><?php echo __( 'Coaching Checklist', 'zume' ) ?></h1>
                <p>
                    <?php echo __( '1. Self-evaluate with Heard, Obeyed, Shared, Trained.', 'zume' ) ?><br>
                    <?php echo __( '2. Coach others with Model, Assist, Watch, Leave.', 'zume' ) ?>
                </p>
                </br>
            </div>
            <div class="activity-content">
                <table class="coaching-table">
                    <tr>
                        <td>
                            <strong class="coaching_table_title"><?php echo __( 'Training Tools/Concepts', 'zume' ) ?></strong>
                        </td>
                        <td>
                        </td>
                        <td class=" coaching_bottom">
                        </td>
                        <td class=" coaching_bottom">
                        </td>
                        <td class=" coaching_bottom">
                        </td>
                        <td class=" coaching_bottom">

                        </td>
                    </tr>
                    <tr>
                        <td class="coaching_right">
                            <em><?php echo __( 'Ask yourself, have I', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            1
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Heard', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Obeyed', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Shared', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Trained', 'zume' ) ?>
                        </td>
                    </tr>
                    <tr class="coaching_header">
                        <td class="coaching_right">
                            <em><?php echo __( 'Ask yourself, what does my disciple need', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            2
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Model', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Assist', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Watch', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Leave', 'zume' ) ?>
                        </td>
                    </tr>
                    <?php
                    $training_items = zume_training_items();
                    foreach( $training_items as $training_item ) {
                        ?>
                        <tr class="coaching_row">
                            <td class="coaching_title coaching_bottom">
                                <?php echo $training_item['title']; ?>
                            </td>
                            <td class="coaching_bottom">
                            </td>
                            <td class="coaching_column coaching_bottom">
                            </td>
                            <td class="coaching_column coaching_bottom">
                            </td>
                            <td class="coaching_column coaching_bottom">
                            </td>
                            <td class="coaching_column coaching_bottom">
                            </td>
                        </tr>
                        <?php
                    }
                    ?>
                </table>
            </div>
        </div>
        <?php
    }
}
Zume_Activites_Coaching::instance();
