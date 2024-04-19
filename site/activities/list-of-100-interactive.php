<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.



class Zume_Activites_List100_Interactive extends Zume_Activites
{
    use Translateable;
    public $page_title = 'Zúme Activity - List of 100';
    public $root = 'zume_activities';
    public $type = 'listof100';

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
        echo 'List of 100 - Interactive';
    }
}
Zume_Activites_List100_Interactive::instance();
