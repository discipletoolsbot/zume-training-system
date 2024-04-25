<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Coaching_Html extends Zume_Activites
{
    public $page_title = 'Zúme Activity - Coaching Checklist';
    public $root = 'zume_activities';
    public $type = 'coachingchecklist_html';

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
    public function content_header( $post_id ){
        echo '';
    }
    public function content_body( $post_id ){
        echo 'Coaching Checklist Content - HTML';
    }
}
Zume_Activites_Coaching_Html::instance();
