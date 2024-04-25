<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Coaching_Interactive extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = 'coachingchecklist';

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
        echo 'Coaching checklist interactive content';
    }
}
Zume_Activites_Coaching_Interactive::instance();
