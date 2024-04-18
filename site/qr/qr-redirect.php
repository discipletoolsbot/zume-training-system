<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * The QR Redirect System supports the QR Codes that are used in the Zume Training System.
 * Note: The purpose of using the redirect is to so that when QRs are printed, or used in distributed materials, they can be updated without having to reprint the QR code.
 *
 * @since 1.0.0
 */
class Zume_QR_Redirect
{
    public $development_display = false;
    public $page_title = 'Zume Redirect';
    public $root = 'zume_app';
    public $type = 'qr';
    public $root_url = 'https://zume.training/';
    public $mirror_url = 'https://storage.googleapis.com/zume-file-mirror/';
    public $url_token = 'zume_app/qr';
    public $type_name = 'Zume Redirect';
    public $post_type = 'contacts';
    public $site_url = '';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        $this->root_url = trailingslashit( site_url() );
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
        global $wpdb, $table_prefix;

        $link = $this->root_url;

        /**
         * By Post ID
         *
         * https://zume.training/zume_app/qr/?p=20740
         * Returns the permalink url with the language for the post page.
         */
        if ( isset( $_GET['p'] ) ) {
//            dt_write_log( 'Post: ' . $_GET['p'] );

            $post_id = esc_attr( $_GET['p'] );

            $result = $wpdb->get_var( $wpdb->prepare( "
                SELECT p.post_name, pm.meta_value as zume_lang
                FROM {$table_prefix}posts p
                LEFT JOIN {$table_prefix}postmeta pm ON p.ID = pm.post_id AND pm.meta_key = 'zume_lang'
                WHERE p.ID = %d
            ", $post_id ) );

            $link = $link . $result['zume_lang'] . '/' . $result['post_name'];

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * By Video ID (Legacy)
         * (legacy support for zume4 books)
         *
         * https://zume.training/zume_app/qr/?v=2342343
         */
        else if( isset( $_GET['v'] ) && !isset( $_GET['l'] ) ) {
//            dt_write_log( 'Video: ' . $_GET['v'] );

            $link = site_url() . '/zume_app/video/?id=';
            $video_id = esc_attr( $_GET['v'] );

            $link = $link . $video_id;

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * By Language Code and Video ID
         *
         * https://zume.training/zume_app/qr/?l=en&v=33
         */
        else if ( isset( $_GET['l'], $_GET['v'] ) ) {
//            dt_write_log( 'Video Language: ' . $_GET['l'] . ' ' . $_GET['v'] );

            $requested_video_id = esc_attr( $_GET['v'] );
            $language_slug = esc_attr( $_GET['l'] );

            $list = $this->query_videos_by_language( $language_slug );

            if ( empty( $list ) ) {
                echo 'No video found for language code: ' . $language_slug;
                $this->instructions();
            }

            foreach( $list as $item ) {
                if ( $item['meta_key'] === $requested_video_id ) {
                    $video_id = $item['meta_value'];
                    break;
                }
            }

            $link = $this->root_url . 'zume_app/video/?id=' . $video_id;

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * By Language code and Download ID
         *
         * https://zume.training/zume_app/qr/?l=en&d=33
         * Returns the download link according to the language code and download id.
         */
        else if( isset( $_GET['l'], $_GET['d'] ) ) {
//            dt_write_log( 'QR Redirect: ' . $_GET['d'] . ' ' . $_GET['l'] );

            $requested_download_id = esc_attr( $_GET['d'] );
            $language_slug = esc_attr( $_GET['l'] );

            $list = $this->query_downloads_by_language( $language_slug );

            if ( empty( $list ) ) {
                echo 'No download found for language code: ' . $language_slug;
                $this->instructions();
            }

            foreach( $list as $item ) {
                if ( $item['meta_key'] === $requested_download_id ) {
                    $asset_name = $item['meta_value'];
                    break;
                }
            }

            $link = $this->mirror_url . $language_slug . '/' . $asset_name;

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * @todo maybe remove. tools strategy changeed, so this function not needed.
         * By Language Code and Tools
         *
         * https://zume.training/zume_app/qr/?l=en&t=123
         */
        else if ( isset( $_GET['l'], $_GET['t'] ) ) {
//            dt_write_log( 'Resource: ' . $_GET['l'] . ' ' . $_GET['t'] );

            $tool_id = esc_attr( $_GET['t'] );
            $language_slug = esc_attr( $_GET['l'] );

            $list = $this->query_tools_by_language( $language_slug );

            if ( empty( $list ) ) {
                echo 'No tool found for language code: ' . $language_slug;
                $this->instructions();
            }

            foreach( $list as $item ) {
                if ( $item['meta_key'] === $tool_id ) {
                    $params = $item['meta_value'];
                    break;
                }
            }

            $link = $this->root_url . $params;

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * By Language Code and Activity ID
         *
         * https://zume.training/zume_app/qr/?l=en&a=4
         */
        else if ( isset( $_GET['l'], $_GET['a'] ) ) {
//            dt_write_log( 'Activity: ' . $_GET['l'] . ' ' . $_GET['a'] );

            $activity_id = esc_attr( $_GET['a'] );
            $language_slug = esc_attr( $_GET['l'] );

            $link = $this->root_url . $language_slug . '/zume_activities/' . $activity_id;

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * By Language Code and Video Script ID
         *
         * https://zume.training/zume_app/qr/?l=en&s=4
         */
        else if ( isset( $_GET['l'], $_GET['s'] ) ) {
//            dt_write_log( 'Activity: ' . $_GET['l'] . ' ' . $_GET['s'] );

            $script_id = esc_attr( $_GET['s'] );
            $language_code = esc_attr( $_GET['l'] );

            $link = $this->root_url . $language_code . '/zume_app/script/?s=' . $script_id;

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * By Language Code and Checkin ID
         *
         * https://zume.training/zume_app/qr/?l=en&a=4
         */
        else if ( isset( $_GET['l'], $_GET['c'] ) ) {
//            dt_write_log( 'Activity: ' . $_GET['l'] . ' ' . $_GET['c'] );

            $checkin_code = esc_attr( $_GET['c'] );
            $language_slug = esc_attr( $_GET['l'] );

            $link = $this->root_url . $language_slug . '/checkin/?code=' . $checkin_code;

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * By Language Code and Other Pages
         *
         * https://zume.training/zume_app/qr/?l=en&o=coach
         */
        else if ( isset( $_GET['l'], $_GET['o'] ) ) {
//            dt_write_log( 'Activity: ' . $_GET['l'] . ' ' . $_GET['o'] );

            $other_page_redirect = esc_attr( $_GET['o'] );
            $language_slug = esc_attr( $_GET['l'] );

            switch( $other_page_redirect ) {
                case 'coaching':
                    $link = zume_get_a_coach_wizard_url();
                    break;
                case 'join_the_community':
                    $link = zume_join_the_community_wizard_url();
                    break;
                default:
                    break;
            }

            if ( $this->development_display ) {
                echo '<span style="font-size: 3em;">' . $link . '</span>';
            } else {
                header("Location: ".$link, true, 302);
            }

            exit();
        }
        /**
         * Blank match
         */
        else if ( isset( $_GET['l'] ) ) {
            $language_slug = esc_attr( $_GET['l'] );
            $this->list_all_qr_codes_by_language( $language_slug );
        }
        else {
            echo 'URL param not recognized.';
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

        echo '<div style="width:1000px;"><a href="' . $link . '"><img src="https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=' . $link . '" title="' . $link . '" alt="' . $link . '" style="width:100%;"/></a><br>' . $link . '</div>';

        exit();
    }

    public function instructions() {
        echo '
                <div>
                    <h1>QR Redirect <System></System></h1>
                    <p>Use this page to redirect to a page on the Zume Training System. Use the following URL parameters to redirect to a page.</p>

                    <strong>Main redirect examples:</strong>
                    <ul>
                        <li>Redirect by Language Code & Video ID: <a href="' . $this->root_url . 'zume_app/qr/?l=en&v=33">' . $this->root_url . 'zume_app/qr/?l=en&v=33</a></li>
                        <li>Redirect by Language Code & Download ID: <a href="' . $this->root_url . 'zume_app/qr/?l=en&d=33">' . $this->root_url . 'zume_app/qr/?l=en&d=33</a></li>
                        <li>Redirect by Language Code & Tool ID: <a href="' . $this->root_url . 'zume_app/qr/?l=en&t=4">' . $this->root_url . 'zume_app/qr/?l=en&t=4</a></li>
                    </ul>
                    <strong>Direct link examples (deprecated, do not use)</strong>
                    <ul>
                        <li>Redirect by POST ID : <a href="' . $this->root_url . 'zume_app/qr/?p=20740">' . $this->root_url . 'zume_app/qr/?p=20740</a></li>
                        <li>Redirect by Video ID : <a href="' . $this->root_url . 'zume_app/qr/?v=247062938">' . $this->root_url . 'zume_app/qr/?v=247062938</a></li>
                    </ul>

                </div>
                ';
        exit();
    }

    public function list_all_qr_codes_by_language( $language_slug ) {
        // get list of videos for language

        echo "<pre>";

        $training_items = zume_training_items();
        foreach( $training_items as $item ) {
            $link = site_url() . '/zume_app/qr/?l=' . $language_slug  . '&v='. (int) $item['key'];
            echo '<a href="'.$link.'">'.$link.'</a>' . PHP_EOL;
        }

        echo PHP_EOL . PHP_EOL;

        foreach( $training_items as $item ) {
            $link = site_url() . '/zume_app/qr/?l=' . $language_slug  . '&d='. (int) $item['key'];
            echo '<a href="'.$link.'">'.$link.'</a>' . PHP_EOL;
        }

        echo PHP_EOL . PHP_EOL;

        foreach( $training_items as $item ) {
            $link = site_url() . '/zume_app/qr/?l=' . $language_slug  . '&t='. (int) $item['key'];
            echo '<a href="'.$link.'">'.$link.'</a>' . PHP_EOL;
        }

        echo PHP_EOL . PHP_EOL;

        foreach( $training_items as $item ) {
            $link = site_url() . '/zume_app/qr/?l=' . $language_slug  . '&a='. (int) $item['key'];
            echo '<a href="'.$link.'">'.$link.'</a>' . PHP_EOL;
        }

        echo PHP_EOL . PHP_EOL;

        $video_list = $this->query_videos_by_language( $language_slug );
        foreach( $video_list as $item ) {
            if ( ! is_numeric( $item['meta_key'] ) ) {
                continue;
            }
            $link = site_url() . '/zume_app/video/?id=' . $item['meta_value'];
            echo '<a href="'.$link.'">'.$link.'</a>' . PHP_EOL;
        }

        echo PHP_EOL . PHP_EOL;

        $download_list = $this->query_downloads_by_language( $language_slug );
        foreach( $download_list as $item ) {
            if ( ! is_numeric( $item['meta_key'] ) ) {
                continue;
            }
            $link = $this->mirror_url . $language_slug . '/' . $item['meta_value'];
            echo '<a href="'.$link.'">'.$link.'</a>' . PHP_EOL;
        }

        echo PHP_EOL . PHP_EOL;

        foreach( $training_items as $activity ) {
            echo site_url() . '/' . $language_slug . '/zume_activity/'. $activity['slug'] . PHP_EOL;
        }

        echo PHP_EOL . PHP_EOL;


        echo "</pre>";


    }

    public function query_downloads_by_language( $language_slug ) {
        global $wpdb;
        global $table_prefix;

        $list = $wpdb->get_results( $wpdb->prepare( "
                    SELECT pm.meta_key, pm.meta_value
                    FROM {$table_prefix}posts p
                    JOIN {$table_prefix}postmeta pm ON pm.post_id=p.ID
                    WHERE p.post_title = %s
                      AND p.post_type = 'zume_download'
                      AND pm.meta_key != '_edit_last'
                      AND pm.meta_key != '_edit_lock';
                ", $language_slug ), ARRAY_A );

        return $list;
    }

    public function query_videos_by_language( $language_slug ) {
        global $wpdb;
        global $table_prefix;

        $list = $wpdb->get_results( $wpdb->prepare( "
                    SELECT pm.meta_key, pm.meta_value
                    FROM {$table_prefix}posts p
                    JOIN {$table_prefix}postmeta pm ON pm.post_id=p.ID
                    WHERE p.post_title = %s
                      AND p.post_type = 'zume_video'
                      AND pm.meta_key != '_edit_last'
                      AND pm.meta_key != '_edit_lock';
                ", $language_slug ), ARRAY_A );

        return $list;
    }

    public function query_tools_by_language( $language_slug ) {
        global $wpdb;
        global $table_prefix;

        $list = $wpdb->get_results( $wpdb->prepare( "
                    SELECT pm.meta_key, pm.meta_value
                    FROM {$table_prefix}posts p
                    JOIN {$table_prefix}postmeta pm ON pm.post_id=p.ID
                    WHERE p.post_title = %s
                      AND p.post_type = 'zume_qr_redirect'
                      AND pm.meta_key != '_edit_last'
                      AND pm.meta_key != '_edit_lock';
                ", $language_slug ), ARRAY_A );

        return $list;
    }

    public function query_qr_redirect( $language_slug) {
        global $wpdb;
        global $table_prefix;

        $list = $wpdb->get_results( $wpdb->prepare( "
                    SELECT pm.meta_key, pm.meta_value
                    FROM {$table_prefix}posts p
                    JOIN {$table_prefix}postmeta pm ON pm.post_id=p.ID
                    WHERE p.post_title = %s
                      AND p.post_type = 'zume_qr_redirect'
                      AND pm.meta_key != '_edit_last'
                      AND pm.meta_key != '_edit_lock';
                ", $language_slug ), ARRAY_A );

        return $list;
    }
}
Zume_QR_Redirect::instance();
