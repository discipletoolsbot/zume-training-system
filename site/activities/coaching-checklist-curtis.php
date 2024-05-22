<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Coaching_Four extends Zume_Activites
{
    public $page_title = 'Coaching Checklist (4 Level)';
    public $root = 'activities';
    public $type = 'coaching_four';
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
                vertical-align: top;
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
            </div>
            <div class="activity-content">
                <table class="coaching-table">
                    <tr>
                        <td class="coaching_right">
                            <em><?php echo __( 'Development Level', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            1
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Unaware', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Unskilled', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Competent', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Skilled', 'zume' ) ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="coaching_right">
                            <em><?php echo __( 'Mentor’s Role', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            2
                        </td>
                        <td class="coaching_column coaching_bottom">
                            (<?php echo __( 'Model', 'zume' ) ?>)<br><?php echo __( 'Train new information and ensure understanding', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            (<?php echo __( 'Assist', 'zume' ) ?>)<br><?php echo __( 'Stop and stay with them until they have the basics', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            (<?php echo __( 'Watch', 'zume' ) ?>)<br><?php echo __( 'Stay engaged until consistently competent', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            (<?php echo __( 'Leave', 'zume' ) ?>)<br><?php echo __( 'Relate to them as co-laborer', 'zume' ) ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="coaching_right">
                            <em><?php echo __( 'Mentor’s Behaviors', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            3
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Direct and inform', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Direct and support', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Support and encourage', 'zume' ) ?>
                        </td>
                        <td class="coaching_column coaching_bottom">
                            <?php echo __( 'Receive updates', 'zume' ) ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="coaching_right">
                            <em><?php echo __( 'Planning Responsibilities', 'zume' ) ?> ...</em>
                        </td>
                        <td>
                            4
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Mentor decides', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Discuss and Mentor decides', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Discuss and Mentee decides', 'zume' ) ?>
                        </td>
                        <td class="coaching_column">
                            <?php echo __( 'Mentee decides', 'zume' ) ?>
                        </td>
                    </tr>
                    <tr class="coaching_header">
                        <td>
                            <strong class="coaching_table_title"><?php echo __( 'Training Tools/Concepts', 'zume' ) ?></strong>
                        </td>
                        <td>
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
            <br></br>
            <?php /** ?>
            <hr>
            <h2>Development Level ...</h2>
            <div>
                <p>
                    <strong><?php echo __( 'Unaware', 'zume' ) ?></strong> -  <?php echo __( '', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo __( 'Unskilled', 'zume' ) ?></strong> -  <?php echo __( '', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo __( 'Competent', 'zume' ) ?></strong> -  <?php echo __( '', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo __( 'Skilled', 'zume' ) ?></strong> -  <?php echo __( '', 'zume' ) ?>
                </p>
            </div>
            <hr>
            <h2>Mentor's Role ...</h2>
            <div>
                <p>
                    <strong><?php echo __( 'Model', 'zume' ) ?> - (<?php echo __( 'Train new information and ensure understanding', 'zume' ) ?>)</strong> <?php echo __( 'Modeling is simply providing an example of a practice or tool. It is the briefest part of the training cycle. It usually only needs to be done once. It is simply creating an awareness that a practice or a tool exists and giving a general idea of what it looks like. Modeling repeatedly is not an effective way to equip someone.', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo __( 'Assist', 'zume' ) ?> - (<?php echo __( 'Stop and stay with them until they have the basics', 'zume' ) ?>)</strong> <?php echo __( 'Assisting is allowing the learner to practice the skill. This takes longer than the modeling phase. It requires “hand-holding” on the part of the mentor. The mentor needs to be directive and take an active role in coaching the learner. This phase does not last until the learner is fully competent, but merely until they understand the basics of the skill. If this phase is continued too long, then the learner will develop a dependence on the mentor and never advance to full competence.', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo __( 'Watch', 'zume' ) ?>- (<?php echo __( 'Stay engaged until consistently competent', 'zume' ) ?>)</strong> <?php echo __( 'Watching is the longest phase. It involves more indirect contact with the learner. It seeks to develop full competence in all facets of a skill. It may be ten times or more as long as the first two phases combined. As the learner progresses in skill, the contact with the mentor may become less regular and more ad hoc.', 'zume' ) ?>
                </p>
                <p>
                    <strong><?php echo __( 'Leave', 'zume' ) ?> - (<?php echo __( 'Relate to them as co-laborer', 'zume' ) ?>)</strong> <?php echo __( 'Leaving is a sort of graduation when the learner becomes a peer of the mentor. Periodic contact and peer mentoring may continue to take place if the learner and mentor are in the same network. When a parent releases a child to ride their bicycle completely unsupervised, that is the LEAVE phase.', 'zume' ) ?>
                </p>
            </div>
            <hr>
            <h2>Mentor’s Behaviors ...</h2>
            <div>
                <p>
                    <strong><?php echo __( 'Direct and Inform', 'zume' ) ?></strong> -
                </p>
                <p>
                    <strong><?php echo __( 'Direct and Support', 'zume' ) ?></strong> -
                </p>
                <p>
                    <strong><?php echo __( 'Support and Encourage', 'zume' ) ?></strong> -
                </p>
                <p>
                    <strong><?php echo __( 'Receive Updates', 'zume' ) ?></strong> -
                </p>
            </div>
            <hr>
            <h2>Planning Responsibilities ...</h2>
            <div>
                <p>
                    <strong><?php echo __( 'Mentor decides', 'zume' ) ?></strong> -
                </p>
                <p>
                    <strong><?php echo __( 'Discuss and Mentor decides', 'zume' ) ?></strong> -
                </p>
                <p>
                    <strong><?php echo __( 'Discuss and Mentee decides', 'zume' ) ?></strong> -
                </p>
                <p>
                    <strong><?php echo __( 'Mentee decides', 'zume' ) ?></strong> -
                </p>
            </div>
        </div>
        <?php
        **/

    }
}
Zume_Activites_Coaching_Four::instance();
