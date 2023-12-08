<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * The QR Redirect System supports the QR Codes that are used in the Zume Training System.
 * Note: The purpose of using the redirect is to so that when QRs are printed, or used in distributed materials, they can be updated without having to reprint the QR code.
 *
 * @since 1.0.0
 */
class Zume_QR_Redirect extends Zume_Magic_Page
{
    public $page_title = 'Zume Redirect';
    public $root = 'zume_app';
    public $type = 'qr';
    public $root_url = 'https://zume.training/';
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

        // fail except for exact url match
        if ( substr( $url, 0, strlen( $this->url_token ) ) !== $this->root . '/' . $this->type ) {
            return;
        }

        // show instructions if no url params
        if ( empty( $_GET) ) {
            $this->instructions();
        }
        // print qr code for url redirect
        if ( isset( $_GET['showqr'] ) ) {
            $this->show_qr();
        }
        // redirect to url
        else {
            $this->redirect();
        }
    }

    public function redirect() {
        global $wpdb;

        $link = $this->root_url;

        /**
         * Redirect by Post ID
         *
         * https://zume.vision/zume_app/qr/?p=123
         *
         * Returns the permalink url with the language for the post page.
         */
        if ( isset( $_GET['p'] ) ) {
            $post_id = $_GET['p'];

            $language_slug = $wpdb->get_var( $wpdb->prepare( "
                SELECT t.slug
                FROM wp_term_relationships tr
                JOIN wp_term_taxonomy tt_l ON tt_l.term_taxonomy_id=tr.term_taxonomy_id AND tt_l.taxonomy = 'language'
                JOIN wp_terms t ON tt_l.term_id = t.term_id
                WHERE tr.object_id = %d
            ", $post_id ) );
            $post_name = $wpdb->get_var( $wpdb->prepare( "
                SELECT p.post_name
                FROM wp_posts p
                WHERE p.ID = %d
            ", $post_id ) );

            $link = $link . '/' . $language_slug . '/' . $post_name;

            header("Location: ".$link, true, 302);

        }
        /**
         * Redirect by Resource ID and Language code
         *
         * https://zume.vision/zume_app/qr/?r=123&l=en
         *
         * Returns the permalink url with the language for the post page.
         */
        else if ( isset( $_GET['r'], $_GET['l'] ) ) {
            dt_write_log( 'QR Redirect: ' . $_GET['r'] . ' ' . $_GET['l'] );
            $link = zume_mirror_url();

            $resource_id = $_GET['r'];
            $language_slug = $_GET['l'];



            if ( $resource_id <= 32 ) {
                $resource_id = 32;
            } else if ( $resource_id >= 32 && $resource_id <= 62 ) {
                $list = $wpdb->get_results( $wpdb->prepare( "
                    SELECT pm.meta_key, pm.meta_value
                    FROM wp_posts p
                    JOIN wp_postmeta pm ON pm.post_id=p.ID
                    WHERE p.post_title = %s
                      AND p.post_type = 'zume_video'
                      AND pm.meta_key != '_edit_last'
                      AND pm.meta_key != '_edit_lock';
                ", $language_slug ), ARRAY_A );

                dt_write_log( $list );

            }

            // header("Location: ".$link, true, 302);

            exit();
        }
        else {
            echo 'URL param not regognized.';
            $this->instructions();
        }

        exit;
    }

    public function show_qr()
    {
        $url = dt_get_url_path();
        $url = str_replace('?showqr=true&', '', $url);
        $url = str_replace('&showqr=true&', '', $url);
        $url = str_replace('&showqr=true', '', $url);
        $url = str_replace( site_url(), '', $url);

        $link = $this->root_url . $url;


        echo '<div style="width:1000px;"><a href="' . $link . '"><img src="https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=' . $link . '" title="' . $link . '" alt="' . $link . '" style="width:100%;"/></a></div>';

        exit();
    }

    public function instructions() {
echo '
<div>
    <h1>QR Redirect <System></System></h1>
    <p>Use this page to redirect to a page on the Zume Training System.</p>
    <p>Use the following URL parameters to redirect to a page.</p>

    Examples:
    <ul>
        <li>Redirect by POST ID : <a href="' . $this->root_url . 'zume_app/qr/?p=123">' . $this->root_url . 'zume_app/qr/?p=20740</a></li>
        <li>Redirect by Resource ID and Language Code : <a href="' . $this->root_url . 'zume_app/qr/?r=123&l=en">' . $this->root_url . 'zume_app/qr/?r=1&l=en</a></li>
        <li>Redirect by Video ID : <a href="' . $this->root_url . 'zume_app/qr/?v=123">' . $this->root_url . 'zume_app/qr/?p=123</a></li>
    </ul>

</div>

';
        exit();
    }
}
Zume_QR_Redirect::instance();