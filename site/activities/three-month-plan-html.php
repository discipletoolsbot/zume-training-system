<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_3monthplan_Html extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = '3monthplan_html';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
    public function body(){
        $questions = Zume_Training_Dashboard::three_month_plan_questions();
        ?>
        <div class="activity-page">
            <div class="container-md center">
                <h1 class="activity-title">3-Month Plan</h1>
            </div>
            <hr>
            <div class="container-md activity-content">
                <div id="pieces-content" class="stack">
                    <?php
                    foreach( $questions as $question ){
                        ?>
                        <div class="stack--3">
                            <label><?php echo $question ?></label>
                            <div style="width:100%;height:3em;border-bottom:1px solid grey;"></div>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </div>
        </div>
        </hr>
        <?php
    }
}
Zume_Activites_3monthplan_Html::instance();
