<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Coaching_Two extends Zume_Activites
{
    public $page_title = 'Coaching Checklist';
    public $root = 'activities';
    public $type = 'coachingchecklist_two';
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

        $this->page_title = esc_html__( 'Coaching Checklist', 'zume' );

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
        return [
            'jquery',
        ];
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
                <h2><?php echo esc_html__( 'Coaching Checklist', 'zume' ) ?></h2>
                <?php echo esc_html__( '1. Self-evaluate yourself using Heard, Obeyed, Shared, Trained.', 'zume' ) ?><br>
                <?php echo esc_html__( '2. Coach others by using Model, Assist, Watch, Leave.', 'zume' ) ?>
            </div>
            <div class="activity-content">
                <table class="coaching-table">
                    <tr>
                        <td>
                            <strong class="coaching_table_title"><?php echo esc_html__( 'Training Tools/Concepts', 'zume' ) ?></strong>
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
                            <em><?php echo esc_html__( 'Ask yourself, have I', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            1
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo esc_html__( 'Heard', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo esc_html__( 'Obeyed', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo esc_html__( 'Shared', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo esc_html__( 'Trained', 'zume' ) ?>
                        </td>
                    </tr>
                    <tr class="coaching_header">
                        <td class="coaching_right">
                            <em><?php echo esc_html__( 'Ask yourself, what does my disciple need', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            2
                        </td>
                        <td class="coaching_column">
                            <?php echo esc_html__( 'Model', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo esc_html__( 'Assist', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo esc_html__( 'Watch', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo esc_html__( 'Leave', 'zume' ) ?>
                        </td>
                    </tr>
                    <?php
                    $training_items = zume_training_items();
                    foreach ( $training_items as $training_item ) {
                        ?>
                        <tr class="coaching_row">
                            <td class="coaching_title coaching_bottom">
                                <?php echo esc_html( $training_item['title'] ); ?>
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
                <strong><?php echo esc_html__( 'Heard', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Have I heard about this tool or concept?', 'zume' ) ?>
                </p>
                <strong><?php echo esc_html__( 'Obeyed', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Have I obeyed this tool or concept? If a tool, have I practiced it on my own? If a concept, have you reflected on how it changes your perspective?', 'zume' ) ?>
                </p>
                <strong><?php echo esc_html__( 'Shared', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Have I shared this tool or concept? If a tool, have you shown anyone how to use this tool? If a concept, have you shared this concept with anyone?', 'zume' ) ?>
                </p>
                <strong><?php echo esc_html__( 'Trained', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Have I trained others to share this tool or concept? If a tool, have I trained someone to share the tool with someone else? If a concept, have I trained someone to share the concept with someone else?', 'zume' ) ?>
                </p>
            </div>
            <br>
            <div>
                <strong><?php echo esc_html__( 'Model', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Modeling is simply providing an example of a practice or tool. It is the briefest part of the training cycle. It usually only needs to be done once. It is simply creating an awareness that a practice or a tool exists and giving a general idea of what it looks like. Modeling repeatedly is not an effective way to equip someone.', 'zume' ) ?>
                </p>
                <strong><?php echo esc_html__( 'Assist', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Assisting is allowing the learner to practice the skill. This takes longer than the modeling phase. It requires “hand-holding” on the part of the mentor. The mentor needs to be directive and take an active role in coaching the learner. This phase does not last until the learner is fully competent, but merely until they understand the basics of the skill. If this phase is continued too long, then the learner will develop a dependence on the mentor and never advance to full competence.', 'zume' ) ?>
                </p>
                <strong><?php echo esc_html__( 'Watch', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Watching is the longest phase. It involves more indirect contact with the learner. It seeks to develop full competence in all facets of a skill. It may be ten times or more as long as the first two phases combined. As the learner progresses in skill, the contact with the mentor may become less regular and more ad hoc.', 'zume' ) ?>
                </p>
                <strong><?php echo esc_html__( 'Leave', 'zume' ) ?></strong>
                <p>
                    <?php echo esc_html__( 'Leaving is a sort of graduation when the learner becomes a peer of the mentor. Periodic contact and peer mentoring may continue to take place if the learner and mentor are in the same network. When a parent releases a child to ride their bicycle completely unsupervised, that is the LEAVE phase.', 'zume' ) ?>
                </p>
            </div>
        </div>
        <?php
    }
}
Zume_Activites_Coaching_Two::instance();
