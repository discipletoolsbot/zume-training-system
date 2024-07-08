<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Coaching_Host extends Zume_Activites
{
    public $page_title = 'Coaching Checklist (HOST)';
    public $root = 'activities';
    public $type = 'coachingchecklist_host';
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

        $this->page_title = esc_html__( 'Coaching Checklist', 'zume' ) . ' - ' . esc_html__( 'H.O.S.T', 'zume' );

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
                <h2><?php echo __( 'Coaching Checklist', 'zume' ) ?> ( <?php echo __( 'H.O.S.T.', 'zume' ) ?> )</h2>
                <?php echo __( 'Self-evaluate yourself using Heard, Obeyed, Shared, Trained.', 'zume' ) ?><br>
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
                    <tr class="coaching_header">
                        <td class="coaching_right">
                            <em><?php echo __( 'Ask yourself, have I', 'zume' ) ?> ...</em>
                        </td>
                        <td>

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
            <br>
            <div>
                <strong><?php echo __( 'Heard', 'zume' ) ?></strong>
                <p>
                    <?php echo __( 'Have I heard about this tool or concept?', 'zume' ) ?>
                </p>
                <strong><?php echo __( 'Obeyed', 'zume' ) ?></strong>
                <p>
                    <?php echo __( 'Have I obeyed this tool or concept? If a tool, have I practiced it on my own? If a concept, have you reflected on how it changes your perspective?', 'zume' ) ?>
                </p>
                <strong><?php echo __( 'Shared', 'zume' ) ?></strong>
                <p>
                    <?php echo __( 'Have I shared this tool or concept? If a tool, have you shown anyone how to use this tool? If a concept, have you shared this concept with anyone?', 'zume' ) ?>
                </p>
                <strong><?php echo __( 'Trained', 'zume' ) ?></strong>
                <p>
                    <?php echo __( 'Have I trained others to share this tool or concept? If a tool, have I trained someone to share the tool with someone else? If a concept, have I trained someone to share the concept with someone else?', 'zume' ) ?>
                </p>
            </div>
        </div>
        <?php
    }
}
Zume_Activites_Coaching_Host::instance();
