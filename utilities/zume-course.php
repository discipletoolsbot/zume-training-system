<?php


class Zume_Course {

    /**
     * Zume_Admin_Menus The single instance of Zume_Admin_Menus.
     * @var    object
     * @access  private
     * @since    0.1
     */
    private static $_instance = null;

    /**
     * Main Zume_Course Instance
     *
     * Ensures only one instance of Zume_Admin_Menus is loaded or can be loaded.
     *
     * @since 0.1
     * @static
     * @return Zume_Course instance
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    } // End instance()

    /**
     * Constructor function.
     * @access  public
     * @since   0.1
     */
    public function __construct() {
    } // End __construct()

    public static function get_video_by_key( $meta_key, $player = true, $lang = null, $autoplay = false ) {
        // get language
        if ( empty( $lang ) ) {
            $current_lang = zume_current_language();
        } else {
            $current_lang = $lang;
        }

        // get custom post type by language title
        $page = self::get_page_by_title( $current_lang, OBJECT, 'zume_video' );
        if ( ! $page ) {
            return '';
        }
        $video_id = get_post_meta( $page->ID, $meta_key, true );
        if ( ! $video_id ) {
            return '';
        }
        if ( ! $player ) { // if not the player, then return just the vimeo url.
            return $video_id;
        }

        $query_params = '?transcript=false&pip=false';
        if ( $autoplay ) {
            $query_params .= '&autoplay=true';
        }
        return 'https://player.vimeo.com/video/' . $video_id . $query_params;
    }

    public static function get_alt_video_by_key( $meta_key ) {
        // get language
        $current_lang = zume_current_language();
        // get custom post type by language title
        $page = self::get_page_by_title( $current_lang, OBJECT, 'zume_video' );
        if ( ! $page ) {
            return '';
        }
        $video_url = get_post_meta( $page->ID, $meta_key, true );
        if ( ! $video_url ) {
            return '';
        }
        return $video_url;
    }

    public static function get_download_by_key( $meta_key, $lang = null ) {
        // get language
        if ( empty( $lang ) ) {
            $current_lang = zume_current_language();
        } else {
            $current_lang = $lang;
        }
        $current_mirror = zume_mirror_url();
        // get custom post type by language title
        $page = self::get_page_by_title( $current_lang, OBJECT, 'zume_download' );
        if ( ! $page ) {
            return '';
        }
        $video_id = get_post_meta( $page->ID, $meta_key, true );
        if ( ! $video_id ) {
            return '';
        }
        if ( 'video_overview' == $meta_key ) {
            return $video_id;
        }
//        return trailingslashit( get_stylesheet_directory_uri() ) . 'downloads/' . $current_lang . '/' . $video_id;
        return $current_mirror . $current_lang . '/' . $video_id;
    }

    public static function get_transcript_by_key( $meta_key ) {
        switch ( $meta_key ) {
            case '1':
                return 34;
            case '2':
                return 35;
            case '3':
                return 36;
            case '4':
                return 37;
            case '5':
                return 38;
            case '6':
                return 39;
            case '7':
                return 40;
            case '8':
                return 41;
            case '9':
                return 42;
            case '10':
                return 43;
            case '11':
                return 44;
            case '12':
                return 45;
            case '13':
                return 46;
            case '14':
                return 47;
            case '15':
                return 48;
            case '16':
                return 49;
            case '17':
                return 50;
            case '18':
                return 51;
            case '19':
                return 52;
            case '21':
                return 53;
            case '22':
                return 54;
            case '23':
                return 55;
            case '24':
                return 56;
            case '25':
                return 57;
            case '26':
                return 58;
            case '27':
                return 59;
            case '28':
                return 60;
            case '29':
                return 61;
            case '30':
                return 62;
            default:
                return -1;
        }
    }

    public static function get_page_by_title( $page_title, $output = OBJECT, $post_type = 'page' ) {
        global $wpdb, $table_prefix;

        if ( is_array( $post_type ) ) {
            $post_type           = esc_sql( $post_type );
            $post_type_in_string = "'" . implode( "','", $post_type ) . "'";
            //phpcs:disable
            $sql                 = $wpdb->prepare(
                "SELECT ID
                FROM zume_posts
                WHERE post_title = %s
                AND post_type IN ($post_type_in_string)",
                $page_title
            );
            //phpcs:enable
        } else {
            $sql = $wpdb->prepare(
                'SELECT ID
                FROM zume_posts
                WHERE post_title = %s
                AND post_type = %s',
                $page_title,
                $post_type
            );
        }

        //phpcs:ignore
        $page = $wpdb->get_var( $sql );

        if ( $page ) {
            return get_post( $page, $output );
        }

        return null;
    }
}
