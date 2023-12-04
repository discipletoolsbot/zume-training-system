<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_QR_Redirect extends Zume_Magic_Page
{
    public $page_title = 'Zume Redirect';
    public $root = 'zume_app';
    public $type = 'qr';
    public $url_token = 'zume_app/qr';
    public $type_name = 'Zume Redirect';
    public $post_type = 'contacts';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        $url = dt_get_url_path();

        if ( substr( $url, 0, strlen( $this->url_token ) ) !== $this->root . '/' . $this->type ) {
            return;
        }

        $this->redirect();
    }

    public function redirect() {
        if ( ! isset( $_GET['code'], $_GET['link'] ) ) {
            return;
        }

        $code =  $_GET['code'];

        $qr_list = [

        ];

        $link = 'https://zume.training/';
        wp_redirect( $link );
        exit;
    }
}
Zume_QR_Redirect::instance();
