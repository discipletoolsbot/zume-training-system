<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

function zume_replace_placeholder( $content, $language_code, $user_id = NULL ) {
     return Zume_Replace_Placeholder::instance()->replace_content( $content, $language_code, $user_id );
}

class Zume_Replace_Placeholder {
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {}

    public function replace_content( $content, $language_code, $user_id ) {

        $base_url = trailingslashit( site_url() ). $language_code . '/';
        $mirror_url = zume_mirror_url();
        $wizard_root = 'wizard/';

        // simple placeholder replacements
        $place_holders = [
            '[buttonsmall_getacoach]', // Get a Coach
            '[buttonlarge_getacoach]',
            '[link_getacoach]',

            '[buttonsmall_joincommunity]', // Join a Zume Community
            '[buttonlarge_joincommunity]',
            '[link_joincommunity]',

            '[buttonsmall_dashboard]', // Dashboard
            '[buttonlarge_dashboard]',
            '[link_dashboard]',

            '[buttonsmall_onlinetraining]', // Join Online Group
            '[buttonlarge_onlinetraining]',
            '[link_onlinetraining]',

            '[buttonsmall_checkin]', // Check-in
            '[buttonlarge_checkin]',
            '[link_checkin]',

            '[buttonsmall_10session]', // 10 session course
            '[buttonlarge_10session]',
            '[link_10session]',

            '[buttonsmall_20session]', // 20 session course
            '[buttonlarge_20session]',
            '[link_20session]',

            '[buttonsmall_downloadcourse]', // download course link
            '[buttonlarge_downloadcourse]',
            '[link_downloadcourse]',

            '[buttonsmall_share]', // share page
            '[buttonlarge_share]',
            '[link_share]',

            '[image_pace1]',
            '[image_pace2]',
            '[image_pace3]',
            '[image_pace4]',

            '[image_prayercycle]',
            '[image_fourfields]',
            '[image_genmap]',
        ];
        $replacement_string = [
            '<a class="button small" href="'.$base_url.$wizard_root.'get-a-coach">'. __( 'Get a Coach', 'zume' ) .'</a>', // Get a Coach
            '<a class="button large" href="'.$base_url.$wizard_root.'get-a-coach">'. __( 'Get a Coach', 'zume' ) .'</a>',
            '<a class="" href="'.$base_url.$wizard_root.'get-a-coach">'. __( 'Get a Coach', 'zume' ) .'</a>',

            '<a class="button small" href="'.$base_url.$wizard_root.'join-a-training">'. __( 'Join the Zúme Community', 'zume' ) .'</a>', // Join a Zume Community
            '<a class="button large" href="'.$base_url.$wizard_root.'join-a-training">'. __( 'Join the Zúme Community', 'zume' ) .'</a>',
            '<a class="" href="'.$base_url.$wizard_root.'join-a-training">'. __( 'Join the Zúme Community', 'zume' ) .'</a>',

            '<a class="button small" href="'.$base_url.'dashboard">'. __( 'Zúme Dashboard', 'zume' ) .'</a>', // Dashboard
            '<a class="button large" href="'.$base_url.'dashboard">'. __( 'Zúme Dashboard', 'zume' ) .'</a>',
            '<a class="" href="'.$base_url.'dashboard">'. __( 'Zúme Dashboard', 'zume' ) .'</a>',

            '<a class="button small" href="'.$base_url.$wizard_root.'join-a-training">'. __( 'Zúme Online Training Groups', 'zume' ) .'</a>', // Join Online Group
            '<a class="button large" href="'.$base_url.$wizard_root.'join-a-training">'. __( 'Zúme Online Training Groups', 'zume' ) .'</a>',
            '<a class="" href="'.$base_url.$wizard_root.'join-a-training">'. __( 'Zúme Online Training Groups', 'zume' ) .'</a>',

            '<a class="button small" href="'.$base_url.$wizard_root.'checkin">'. __( 'Check-in', 'zume' ) .'</a>',
            '<a class="button large" href="'.$base_url.$wizard_root.'checkin">'. __( 'Check-in', 'zume' ) .'</a>',
            '<a class="" href="'.$base_url.$wizard_root.'checkin">'. __( 'Check-in', 'zume' ) .'</a>',

            '<a class="button small" href="'.$base_url.'presenter?session=index">10 Session Course</a>',
            '<a class="button large" href="'.$base_url.'presenter?session=index">10 Session Course</a>',
            '<a class="" href="'.$base_url.'presenter?session=index">10 Session Course</a>',

            '<a class="button small" href="'.$base_url.'presenter?type=20&session=index">20 Session Course</a>',
            '<a class="button large" href="'.$base_url.'presenter?type=20&session=index">20 Session Course</a>',
            '<a class="" href="'.$base_url.'presenter?type=20&session=index">20 Session Course</a>',

            '<a class="button small" href="">Download Slide Presentation</a>',
            '<a class="button large" href="">Download Slide Presentation</a>',
            '<a class="" href="">Download Slide Presentation</a>',

            '<a class="button small" href="'.$base_url.'share">Share Zúme Page</a>',
            '<a class="button large" href="'.$base_url.'share">Share Zúme Page</a>',
            '<a class="" href="'.$base_url.'share">Share Zúme Page</a>',

            '<img src="'.$mirror_url.'/images/pace1.png" alt="" width="640" height="100">', // image pace
            '<img src="'.$mirror_url.'/images/pace2.png" alt="" width="640" height="100">',
            '<img src="'.$mirror_url.'/images/pace3.png" alt="" width="640" height="100">',
            '<img src="'.$mirror_url.'/images/pace4.png" alt="" width="640" height="100">',

            '<img src="'.$mirror_url.$language_code.'/99.png" alt="prayer cycle">', // prayer cycle
            '<img src="'.$mirror_url.$language_code.'/98.png" alt="four fields">', // four fields
            '<img src="'.$mirror_url.$language_code.'/104.png" alt="genmap">', // genmap
        ];

        $content = str_replace( $place_holders, $replacement_string, $content );

        // user driven placeholder replacements
        if ( str_contains( $content, '[magic' ) ) {
            $content = $this->replace_magic_link( $content, $language_code, $user_id );
        }

        return $content;
    }

    public function replace_magic_link( $content, $language_code, $user_id ) {

        $base_url = trailingslashit( site_url() ). $language_code . '/';

        if ( empty( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        // static place holders
        $place_holders = [
            '[magicbuttonsmall_annualreport]',
            '[magicbuttonlarge_annualreport]',
            '[magiclink_annualreport]',

            '[magicbuttonsmall_preferences]',
            '[magicbuttonlarge_preferences]',
            '[magiclink_preferences]',
        ];
        $replacement_string = [
            '<a class="button small" href="'.$base_url.'">Zúme Annual Report</a>',
            '<a class="button large" href="'.$base_url.'">Zúme Annual Report</a>',
            '<a class="" href="'.$base_url.'">Zúme Annual Report</a>',

            '<a class="button small" href="'.$base_url.'">Update Communication Preferences</a>',
            '<a class="button large" href="'.$base_url.'">Update Communication Preferences</a>',
            '<a class="" href="'.$base_url.'">Update Communication Preferences</a>',
        ];

        return str_replace( $place_holders, $replacement_string, $content );
    }
}
Zume_Replace_Placeholder::instance();
