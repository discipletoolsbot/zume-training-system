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
                vertical-align: top;
            }
            .coaching_column strong {
                text-transform: uppercase;
            }
            .coaching_title {
                width: 50%;
            }
            .coaching_header td {
                background-color: white;
                border-bottom: 6px solid grey;
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
            <h1><?php echo esc_html__( 'Coaching Checklist', 'zume' ) ?></h1>
        </div>
        <div class="activity-content">
            <table class="coaching-table">
                <tr>
                    <td class="coaching_right">
                        <em><?php echo esc_html__( 'Self-Evaluation', 'zume' ) ?> ...</em>
                    </td>
                    <td>
                        1
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong><?php echo esc_html__( 'Heard', 'zume' ) ?></strong>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong><?php echo esc_html__( 'Obeyed', 'zume' ) ?></strong>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong><?php echo esc_html__( 'Shared', 'zume' ) ?></strong>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong><?php echo esc_html__( 'Trained', 'zume' ) ?></strong>
                    </td>
                </tr>
                <tr>
                    <td class="coaching_right">
                        <em><?php echo esc_html__( 'Mentee Development Level', 'zume' ) ?> ...</em>
                    </td>
                    <td>
                        2
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Unaware', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Unskilled', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Competent', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Skilled', 'zume' ) ?>
                    </td>
                </tr>
                <tr>
                    <td class="coaching_right">
                        <em><?php echo esc_html__( 'Mentor’s Role', 'zume' ) ?> ...</em>
                    </td>
                    <td>
                        3
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong> <?php echo esc_html__( 'Model', 'zume' ) ?> </strong><br><?php echo esc_html__( 'Train new information and ensure understanding', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong> <?php echo esc_html__( 'Assist', 'zume' ) ?> </strong><br><?php echo esc_html__( 'Stop and stay with them until they have the basics', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong> <?php echo esc_html__( 'Watch', 'zume' ) ?> </strong><br><?php echo esc_html__( 'Stay engaged until consistently competent', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <strong> <?php echo esc_html__( 'Leave', 'zume' ) ?> </strong><br><?php echo esc_html__( 'Relate to them as co-laborer', 'zume' ) ?>
                    </td>
                </tr>
                <tr>
                    <td class="coaching_right">
                        <em><?php echo esc_html__( 'Mentor’s Behaviors', 'zume' ) ?> ...</em>
                    </td>
                    <td>
                        4
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Direct and inform', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Direct and support', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Support and encourage', 'zume' ) ?>
                    </td>
                    <td class="coaching_column coaching_bottom">
                        <?php echo esc_html__( 'Receive updates', 'zume' ) ?>
                    </td>
                </tr>
                <tr>
                    <td class="coaching_right">
                        <em><?php echo esc_html__( 'Planning Responsibilities', 'zume' ) ?> ...</em>
                    </td>
                    <td>
                        5
                    </td>
                    <td class="coaching_column">
                        <?php echo esc_html__( 'Mentor decides', 'zume' ) ?>
                    </td>
                    <td class="coaching_column">
                        <?php echo esc_html__( 'Discuss and Mentor decides', 'zume' ) ?>
                    </td>
                    <td class="coaching_column">
                        <?php echo esc_html__( 'Discuss and Mentee decides', 'zume' ) ?>
                    </td>
                    <td class="coaching_column">
                        <?php echo esc_html__( 'Mentee decides', 'zume' ) ?>
                    </td>
                </tr>
                <tr class="coaching_header">
                    <td>
                        <strong class="coaching_table_title"><?php echo esc_html__( 'Training Tools/Concepts', 'zume' ) ?></strong>
                    </td>
                    <td>
                    </td>
                    <td class="coaching_column coaching_bottom" style="border-bottom-color:black;">
                    </td>
                    <td class="coaching_column coaching_bottom" style="border-bottom-color:red;">
                    </td>
                    <td class="coaching_column coaching_bottom" style="border-bottom-color:orange;">
                    </td>
                    <td class="coaching_column coaching_bottom" style="border-bottom-color:green;">
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
                        <td class="coaching_column coaching_bottom ">
                        </td>
                        <td class="coaching_column coaching_bottom ">
                        </td>
                        <td class="coaching_column coaching_bottom ">
                        </td>
                        <td class="coaching_column coaching_bottom ">
                        </td>
                    </tr>
                    <?php
                }
                ?>
            </table>
        </div>
        <br></br>
        <?php if ( ! isset( $_GET['description'] ) ) : ?>
            <br></br>
            <h2><?php echo esc_html__( 'Self-Evaluation', 'zume' ) ?></h2>
            <div>
                <p>
                    <strong><?php echo esc_html__( 'Heard', 'zume' ) ?></strong> - <?php echo esc_html__( 'Have I heard about this tool or concept?', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Obeyed', 'zume' ) ?></strong> - <?php echo esc_html__( 'Have I obeyed this tool or concept? If a tool, have I practiced it on my own? If a concept, have you reflected on how it changes your perspective?', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Shared', 'zume' ) ?></strong> - <?php echo esc_html__( 'Have I shared this tool or concept? If a tool, have you shown anyone how to use this tool? If a concept, have you shared this concept with anyone?', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Trained', 'zume' ) ?></strong> - <?php echo esc_html__( 'Have I trained others to share this tool or concept? If a tool, have I trained someone to share the tool with someone else? If a concept, have I trained someone to share the concept with someone else?', 'zume' ) ?>
                </p>
            </div>
            <hr>
            <h2><?php echo esc_html__( 'Mentee Development Level', 'zume' ) ?></h2>
            <div>
                <p>
                    <strong><?php echo esc_html__( 'Unaware', 'zume' ) ?></strong> - <?php echo esc_html__( 'Is the Mentee unaware, unfamiliar, or misunderstanding the tool?', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Unskilled', 'zume' ) ?></strong> - <?php echo esc_html__( 'Is the Mentee somewhat familiar with but still not sure about the tool?', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Competent', 'zume' ) ?></strong> - <?php echo esc_html__( 'Does the Mentee understand the tool and is able to train the basics of the tool?', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Skilled', 'zume' ) ?></strong> - <?php echo esc_html__( 'Does the Mentee feel confident and able to effectively train the tool?', 'zume' ) ?>
                </p>
            </div>
            <hr>
            <h2><?php echo esc_html__( 'Mentor’s Role', 'zume' ) ?></h2>
            <div>
                <p>
                    <strong><?php echo esc_html__( 'Model', 'zume' ) ?> - (<?php echo esc_html__( 'Train new information and ensure understanding', 'zume' ) ?>)</strong> <?php echo esc_html__( 'Modeling is simply providing an example of a practice or tool. It is the briefest part of the training cycle. It usually only needs to be done once. It is simply creating an awareness that a practice or a tool exists and giving a general idea of what it looks like. Modeling repeatedly is not an effective way to equip someone.', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Assist', 'zume' ) ?> - (<?php echo esc_html__( 'Stop and stay with them until they have the basics', 'zume' ) ?>)</strong> <?php echo esc_html__( 'Assisting is allowing the learner to practice the skill. This takes longer than the modeling phase. It requires “hand-holding” on the part of the mentor. The mentor needs to be directive and take an active role in coaching the learner. This phase does not last until the learner is fully competent, but merely until they understand the basics of the skill. If this phase is continued too long, then the learner will develop a dependence on the mentor and never advance to full competence.', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Watch', 'zume' ) ?>- (<?php echo esc_html__( 'Stay engaged until consistently competent', 'zume' ) ?>)</strong> <?php echo esc_html__( 'Watching is the longest phase. It involves more indirect contact with the learner. It seeks to develop full competence in all facets of a skill. It may be ten times or more as long as the first two phases combined. As the learner progresses in skill, the contact with the mentor may become less regular and more ad hoc.', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo esc_html__( 'Leave', 'zume' ) ?> - (<?php echo esc_html__( 'Relate to them as co-laborer', 'zume' ) ?>)</strong> <?php echo esc_html__( 'Leaving is a sort of graduation when the learner becomes a peer of the mentor. Periodic contact and peer mentoring may continue to take place if the learner and mentor are in the same network. When a parent releases a child to ride their bicycle completely unsupervised, that is the LEAVE phase.', 'zume' ) ?>
                </p>
            </div>
<br>
            <?php
         endif;
    }
}
Zume_Activites_Coaching::instance();
