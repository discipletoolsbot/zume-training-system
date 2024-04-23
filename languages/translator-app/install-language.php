<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

if ( is_admin() ) {
    add_action( 'admin_menu', 'install_language_admin_menu' );

    function install_language_admin_menu() {
        add_menu_page( 'Install Language', 'Install Language', 'manage_options', 'install-language', ['Zume_Install_Languages','install_language_admin_page'], 'dashicons-tickets', 6  );
    }

    class Zume_Install_Languages {
        public static function install_language_admin_page(){
            global $zume_languages_full_list, $wpdb;
            ?>
            <div class="wrap">
                <h2>Install Zume Language</h2><hr></hr>
                <div style="text-align:center;" class="center">
                    <form method="post" action="">
                        <input type="hidden" name="<?php echo __FUNCTION__ ?>_nonce" id="<?php echo __FUNCTION__ ?>_nonce" value="<?php echo esc_attr( wp_create_nonce( __FUNCTION__ ) ) ?>" />
                        <label for="language">Language:</label>
                        <select name="language">
                            <option value="">Select Language</option>
                            <option value="" disable>---</option>
                            <?php
                            foreach ($zume_languages_full_list as $value) {
                                if ( $value['code'] === 'en') {
                                    continue;
                                }
                                echo '<option value="' . $value['code'] . '">' . $value['name'] . '</option>';
                            }
                            ?>
                        </select>
                        <input type="submit" name="submit" class="button" value="Install">
                    </form>
                </div>




                <hr></hr>



                <?php
                if ( isset( $_POST['language'] ) && wp_verify_nonce( $_POST[__FUNCTION__ . '_nonce'], __FUNCTION__ ) ) {
                    $language = $zume_languages_full_list[ $_POST['language'] ];
                    $language_code = $language['code'];
                    ?>


                    <h1><?php echo 'Language: ' . $language['name'] ?></h1>


                    <hr></hr>



                    <h2>Pieces</h2>
                    <?php
                    /* Check that all training items are installed as pieces pages. */
                    $training_items = zume_training_items();
                    foreach( $training_items as $item ) {
                        if ( $item['key'] === 27 ) {
                            continue;
                        }
                        $installed = $wpdb->get_var( $wpdb->prepare(
                            "SELECT p.ID
                            FROM zume_posts p
                            JOIN zume_postmeta pm ON p.ID=pm.post_id AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
                            JOIN zume_postmeta pm1 ON p.ID=pm1.post_id AND pm1.meta_key = 'zume_piece' AND pm1.meta_value = %s
                            WHERE p.post_type = 'zume_pieces'", $language_code, $item['key'] ) );
                        if ( $installed ) {
                            echo '<p>' . $item['title'] . ' - <a href="'.site_url().'/wp-admin/post.php?post='.$installed.'&action=edit">&#10003;</a></p>';
                        } else {
                            $added = self::install_piece( $item, $language );
                            if ( is_wp_error( $added ) || empty( $added ) ) {
                                echo '<p>' . $item['title'] . ' - &#x2718;</p>';
                            } else {
                                echo '<p>' . $item['title'] . ' - <a href="'.site_url().'/wp-admin/post.php?post='.$added.'&action=edit">&#10003; (Added New - '.$added.')</a></p>';
                            }
                        }
                    }
                    ?>


                    <hr></hr>


                    <h2>Scripts</h2>
                    <?php
                    /* Check that script language is installed. */
                    $script_id = $wpdb->get_var( $wpdb->prepare(
                        "SELECT p.ID
                        FROM zume_posts p
                        WHERE p.post_type = 'zume_scripts' AND p.post_title = %s", $language_code ) );
                    if ( $script_id ) {
                        echo '<p>Script - &#10003;</p>';

                        $meta = get_post_meta( $script_id );
                        $fields = Zume_Scripts_Post_Type::instance()->get_custom_fields_settings();

                        if ( $meta ) {
                            foreach( $fields as $key => $item ) {
                               if ( ! isset( $meta[$key] ) ) {
                                   update_post_meta( $script_id, $key, '' );
                                   echo '<p>Added ' . $item['title'] . '('. $key .') - &#10003;</p>';
                               }
                            }
                        }
                    } else {
                        echo '<p>Script - &#x2718;</p>';
                        echo '<p><a href="/wp-admin/edit.php?post_type=zume_download">Got to add new record for the language.</a></p>';
                        // @todo trigger install
                    }
                    ?>

                    <hr></hr>



                    <h2>Downloads</h2>
                    <?php
                    /* Check that script language is installed. */
                    $download_id = $wpdb->get_var( $wpdb->prepare(
                        "SELECT p.ID
                        FROM zume_posts p
                        WHERE p.post_type = 'zume_download' AND p.post_title = %s", $language_code ) );

                    if ( $download_id ) {
                        echo '<p>Downloads - &#10003;</p>';

                        $meta = get_post_meta( $download_id );
                        $fields = Zume_Downloads_Post_Type::instance()->get_custom_fields_settings();

                        foreach( $fields as $key => $item ) {
                            if ( ! isset( $meta[$key] ) ) {
                                update_post_meta( $download_id, $key, '' );
                                echo '<p>Added ' . $item['title'] . '('. $key .') - &#10003;</p>';
                            }
                        }
                    } else {
                        echo '<p>Downloads - &#x2718;</p>';
                        echo '<p><a href="/wp-admin/edit.php?post_type=zume_download">Got to add new record for the language.</a></p>';
                        // @todo trigger install
                    }
                    ?>


                    <hr></hr>


                    <h2>Videos</h2>
                    <?php
                    /* Check that video language is installed. */
                    $video_id = $wpdb->get_var( $wpdb->prepare(
                        "SELECT p.ID
                        FROM zume_posts p
                        WHERE p.post_type = 'zume_video' AND p.post_title = %s", $language_code ) );
                    if ( $video_id ) {
                        echo '<p>Video - &#10003;</p>';

                        $meta = get_post_meta( $video_id );
                        $fields = Zume_Video_Post_Type::instance()->get_custom_fields_settings();

                        $training_items = zume_training_items();
                        foreach( $fields as $key => $item ) {
                            if ( ! isset( $meta[$key] ) ) {
                                update_post_meta( $video_id, $key, '' );
                                echo '<p>Added ' . $item['title'] . '('.$key.') - &#10003;</p>';
                            }
                        }
                    } else {
                        echo '<p>Video - &#x2718;</p>';
                        echo '<p><a href="/wp-admin/edit.php?post_type=zume_video">Got to add new record for the language.</a></p>';
                        // @todo trigger install
                    }
                    ?>


                    <hr></hr>



                    <h2>Messages</h2>
                    <?php
                    /* Check that video language is installed. */
                    $message_ids = $wpdb->get_col(
                        "SELECT p.ID
                        FROM zume_posts p
                        WHERE p.post_type = 'zume_messages' AND p.post_status = 'publish'");
                    if ( $message_ids ) {
                        echo '<p>Message - &#10003;</p>';

                        foreach( $message_ids as $message ) {
                            $meta = get_post_meta( $message );
                            if ( $meta ) {
                                foreach( $zume_languages_full_list as $item ) {
                                    if ( ! isset( $meta['subject_'.$item['code']] ) ) {
                                        update_post_meta( $message, 'subject_'.$item['code'], '' );
                                        echo '<p>Added ' . $item['name'] . ' subject_'.$item['code'].' - &#10003;</p>';
                                    }
                                    if ( ! isset( $meta['body_'.$item['code']] ) ) {
                                        update_post_meta( $message, 'body_'.$item['code'], '' );
                                        echo '<p>Added ' . $item['name'] . ' body_'.$item['code'].'  - &#10003;</p>';
                                    }
                                }
                            }
                        }
                    } else {
                        echo '<p>Message - &#x2718;</p>';
                        echo '<p><a href="/wp-admin/edit.php?post_type=zume_messages">Got to add new record for the language.</a></p>';
                    }
                    ?>

                    <hr></hr>
                    <h2>.po and .mo Files</h2>
                    <?php
                    /* Check that .po and .mo files are installed. */
                    $po_file = plugin_dir_path(__DIR__) .'zume-'. $language['locale'] . '.po';
                    echo $po_file;
                    if ( file_exists( $po_file )  ) {
                        echo ' &#10003;';
                    } else {
                        echo ' &#x2718;';
                    }
                    echo '<br>';
                    $mo_file = plugin_dir_path(__DIR__) .'zume-'. $language['locale'] . '.mo';
                    echo $mo_file;
                    if ( file_exists( $mo_file ) ) {
                        echo ' &#10003;';
                    } else {
                        echo ' &#x2718;';
                    }
                    echo '<br>';
                    ?>


                    <hr></hr>
                    <h2>Options</h2>
                    Options Install Required: <?php echo self::install_options() ? 'Yes (And they have also been updated)' : 'No' ?>

                    <?php }
                ?>
            </div>
            <?php
        }

        public static function install_piece( $piece, $language ) {
            $title = $piece['title'] . ' ' . $language['code'];
            $zume_piece = $piece['key'];
            $zume_lang = $language['code'];
            return wp_insert_post( [
                'post_title' => $title,
                'post_type' => 'zume_pieces',
                'post_status' => 'publish',
                'meta_input' => [
                    'zume_piece' => $zume_piece,
                    'zume_lang' => $zume_lang,
                    'zume_piece_h1' => '',
                    'zume_pre_video_content' => '',
                    'zume_post_video_content' => '',
                    'zume_ask_content' => '',
                    'zume_seo_meta_description' => '',
                ],
            ] );
        }

        /**
         * This function insures that the global zume_languages list is master for the DT dt_working_languages option for users.
         * This is key to allow translators to access the translation interface.
         * @return bool
         */
        public static function install_options() {
            global $zume_languages_full_list;
            $options = [];
            foreach( $zume_languages_full_list as $lang ) {
                $options[$lang['code']] = [
                    'label' => $lang['name'],
                    'native_name' => $lang['nativeName'],
                    'flag' => $lang['flag'],
                    'rtl' => $lang['rtl'],
                ];
            }

            $current_options = get_option( 'dt_working_languages' );
            $needs_update = false;
            foreach( $options as $key => $value ) {
                if ( !isset( $current_options[$key] ) ) {
                    $needs_update = true;
                    break;
                }
            }

            if ( $needs_update ) {
                update_option( 'dt_working_languages', $options, false );
                dt_write_log( 'Global languages list updated' );
                return true;
            } else {
                return false;
            }
        }
    }

}












/*

$global_languages_list = [
    'en' => [ 'label' => 'English', 'native_name' => 'English', 'flag' => '🇺🇸', 'rtl' => false ],
    'am' => [ 'label' => 'Amharic', 'native_name' => 'አማርኛ (AmarəÑña)', 'flag' => '🇪🇹', 'rtl' => false ],
    'ar' => [ 'label' => 'Arabic', 'native_name' => 'العربية', 'flag' => '🇦🇪', 'rtl' => true ],
    'ar_jo' => [ 'label' => 'Arabic (Jordan)', 'native_name' => 'اللهجة الأردنية', 'flag' => '🇯🇴', 'rtl' => true ],
    'ar_tn' => [ 'label' => 'Arabic (Tunisian)', 'native_name' => 'اللهجة الأردنية', 'flag' => '🇯🇴', 'rtl' => true ],
    'ar_ma' => [ 'label' => 'Arabic (Moroccan)', 'native_name' => 'اللهجة الأردنية', 'flag' => '🇯🇴', 'rtl' => true ],
    'hy' => [ 'label' => 'Armenian', 'native_name' => 'Հայերեն', 'flag' => '🇦🇲', 'rtl' => false ],
    'az' => [ 'label' => 'Azerbaijani', 'native_name' => 'Azərbaycanca', 'flag' => '🇦🇿', 'rtl' => false ],
    'asl' => [ 'label' => 'American Sign Language', 'native_name' => 'American Sign Language', 'flag' => '🇺🇸', 'rtl' => false ],
    'bn' => [ 'label' => 'Bengali', 'native_name' => 'বাংলা', 'flag' => '🇮🇳', 'rtl' => false ],
    'bho' => [ 'label' => 'Bhojpuri', 'native_name' => 'भोजपुरी', 'flag' => '🇮🇳', 'rtl' => false ],
    'bs' => [ 'label' => 'Bosnian', 'native_name' => 'Bosanski', 'flag' => '🇧🇦', 'rtl' => false ],
    'bg' => [ 'label' => 'Bulgarian', 'native_name' => 'Български', 'flag' => '🇧🇬', 'rtl' => false ],
    'my' => [ 'label' => 'Burmese', 'native_name' => 'မြန်မာ', 'flag' => '🇲🇲', 'rtl' => false ],
    'zhhk' => [ 'label' => 'Cantonese (Traditional)', 'native_name' => '粵語 (繁體))', 'flag' => '🇨🇳', 'rtl' => false ],
    'zhcn' => [ 'label' => 'Chinese (Simplified)', 'native_name' => '中文简体 (简化的汉，中国)', 'flag' => '🇨🇳', 'rtl' => false ],
    'zhtw' => [ 'label' => 'Chinese (Traditional)', 'native_name' => '國語（繁體)', 'flag' => '🇨🇳', 'rtl' => false ],
    'hr' => [ 'label' => 'Croatian', 'native_name' => 'Hrvatski', 'flag' => '🇭🇷', 'rtl' => false ],
    'fo' => [ 'label' => 'Faroese', 'native_name' => 'Føroyskt', 'flag' => '🇫🇴', 'rtl' => false ],
    'fr' => [ 'label' => 'French', 'native_name' => 'Français', 'flag' => '🇫🇷', 'rtl' => false ],
    'de' => [ 'label' => 'German', 'native_name' => 'Deutsch', 'flag' => '🇩🇪', 'rtl' => false ],
    'gu' => [ 'label' => 'Gujarati', 'native_name' => 'ગુજરાતી', 'flag' => '🇮🇳', 'rtl' => false ],
    'ha' => [ 'label' => 'Hausa', 'native_name' => 'هَرْشَن هَوْسَ', 'flag' => '🇳🇬', 'rtl' => true ],
    'hi' => [ 'label' => 'Hindi', 'native_name' => 'हिन्दी', 'flag' => '🇮🇳', 'rtl' => false ],
    'id' => [ 'label' => 'Indonesian', 'native_name' => 'Bahasa Indonesia', 'flag' => '🇮🇩', 'rtl' => false ],
    'it' => [ 'label' => 'Italian', 'native_name' => 'Italiano', 'flag' => '🇮🇹', 'rtl' => false ],
    'ja' => [ 'label' => 'Japanese', 'native_name' => '日本語', 'flag' => '🇯🇵', 'rtl' => false ],
    'kn' => [ 'label' => 'Kannada', 'native_name' => 'ಕನ್ನಡ', 'flag' => '🇮🇳', 'rtl' => false ],
    'ko' => [ 'label' => 'Korean', 'native_name' => '한국어', 'flag' => '🇰🇷', 'rtl' => false ],
    'ku' => [ 'label' => 'Kurdish', 'native_name' => 'کورمانجی', 'flag' => '🏳️', 'rtl' => true, ],
    'lo' => [ 'label' => 'Lao', 'native_name' => 'ภาษาไทย', 'flag' => '🇹🇭', 'rtl' => false ],
    'lv' => [ 'label' => 'Latvian', 'native_name' => 'Latviešu', 'flag' => '🇱🇻', 'rtl' => false ],
    'mai' => [ 'label' => 'Maithili', 'native_name' => '𑒧𑒻𑒟𑒱𑒪𑒲', 'flag' => '🇹🇭', 'rtl' => false ],
    'ml' => [ 'label' => 'Malayalam', 'native_name' => 'മലയാളം', 'flag' => '🇮🇳', 'rtl' => false ],
    'mr' => [ 'label' => 'Marathi', 'native_name' => 'मराठी', 'flag' => '🇮🇳', 'rtl' => false ],
    'mn' => [ 'label' => 'Mongolian', 'native_name' => 'Монгол хэл', 'flag' => '🇲🇳', 'rtl' => false ],
    'ne' => [ 'label' => 'Nepali', 'native_name' => 'नेपाली', 'flag' => '🇳🇵', 'rtl' => false ],
    'or' => [ 'label' => 'Oriya', 'native_name' => 'ଓଡ଼ିଆ', 'flag' => '🇮🇳', 'rtl' => false ],
    'fa' => [ 'label' => 'Persian', 'native_name' => 'فارسی (Fārsi)', 'flag' => '🇮🇷', 'rtl' => true ],
    'pl' => [ 'label' => 'Polish', 'native_name' => 'Polski', 'flag' => '🇵🇱', 'rtl' => false ],
    'pt' => [ 'label' => 'Portuguese', 'native_name' => 'Português', 'flag' => '🇧🇷', 'rtl' => false ],
    'pa' => [ 'label' => 'Punjabi', 'native_name' => 'ਪੰਜਾਬੀ', 'flag' => '🇮🇳', 'rtl' => true ],
    'pa_pk' => [ 'label' => 'Punjabi (Pakistan)', 'native_name' => 'پنجابی', 'flag' => '🇵🇰', 'rtl' => true ],
    'ro' => [ 'label' => 'Romanian', 'native_name' => 'Română', 'flag' => '🇷🇴', 'rtl' => false ],
    'ru' => [ 'label' => 'Russian', 'native_name' => 'Русский Язык', 'flag' => '🇷🇺', 'rtl' => false ],
    'sl' => [ 'label' => 'Slovenian', 'native_name' => 'Slovenščina', 'flag' => '🇸🇮', 'rtl' => false ],
    'so' => [ 'label' => 'Somali', 'native_name' => 'Af Soomaali', 'flag' => '🇸🇴', 'rtl' => false ],
    'es' => [ 'label' => 'Spanish', 'native_name' => 'Español', 'flag' => '🇪🇸', 'rtl' => false ],
    'es_es' => [ 'label' => 'Spanish (Spain)', 'native_name' => 'Español (Español)', 'flag' => '🇪🇸', 'rtl' => false ],
    'swa' => [ 'label' => 'Swahili', 'native_name' => '𐒖wahili', 'flag' => '🇪🇹', 'rtl' => false ],
    'ta' => [ 'label' => 'Tamil', 'native_name' => 'தமிழ்', 'flag' => '🇮🇳', 'rtl' => false ],
    'te' => [ 'label' => 'Telugu', 'native_name' => 'తెలుగు', 'flag' => '🇮🇳', 'rtl' => false ],
    'th' => [ 'label' => 'Thai', 'native_name' => 'ภาษาไทย', 'flag' => '🇹🇭', 'rtl' => false ],
    'tr' => [ 'label' => 'Turkish', 'native_name' => 'Türkçe', 'flag' => '🇹🇷', 'rtl' => false ],
    'uk' => [ 'label' => 'Ukrainian', 'native_name' => 'Українська', 'flag' => '🇺🇦', 'rtl' => false ],
    'ur' => [ 'label' => 'Urdu', 'native_name' => 'اُردُو', 'flag' => '🇵🇰', 'rtl' => true ],
    'vi' => [ 'label' => 'Vietlabelse', 'native_name' => 'OʻZbekcha, OʻZbek Tili,', 'flag' => '🇻🇳', 'rtl' => false ],
    'yo' => [ 'label' => 'Yoruba', 'native_name' => 'Èdè Yorùbá', 'flag' => '🇳🇬', 'rtl' => false ],
];
update_option( 'dt_working_languages', $global_languages_list, false );
dt_write_log( 'Global languages list updated' );

*/
