<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

// resource functions

function zume_mirror_url() {
    return 'https://storage.googleapis.com/zume-file-mirror/';
}

function zume_url( $slug ) {
    $current_lang = zume_current_language();

    if ( $current_lang === 'en' ) {
        return site_url( '/' ) . $slug;
    }

    return site_url( '/' ) . $current_lang . '/' . $slug;
}
/**
 * Get the login/register url for zume, with an optional redirect url
 *
 * $type can be 'login' | 'register', or any other input to dt_login_url
 *
 * @param string $type
 * @param string $redirect_url
 *
 * @return string
 */
function zume_login_url( $type = 'login', $redirect_url = false ) {
    if ( $redirect_url ) {
        $url = dt_create_site_url( '', [ 'redirect_to' => rawurlencode( $redirect_url ) ] );
        return dt_login_url( $type, $url );
    }

    return dt_login_url( $type );
}




function zume_getting_started_url( $type ) {
    $params = [ 'flow' => 'start' ];
    return zume_start_wizard_url( $type, $params );
}
function zume_start_wizard_url( $type = 'register', $params = [] ) {
    $redirect_url = zume_wizard_url( 'start', $params );
    return zume_login_url( $type, $redirect_url );
}
function zume_make_a_group_wizard_url() {
    $redirect_url = zume_wizard_url( 'make_a_group' );
    return zume_login_url( 'register', $redirect_url );
}
function zume_set_profile_wizard() {
    $redirect_url = zume_wizard_url( 'profile' );
    return zume_login_url( 'register', $redirect_url );
}
function zume_get_a_coach_wizard_url() {
    $redirect_url = zume_wizard_url( 'coaching' );
    return zume_login_url( 'register', $redirect_url );
}
function zume_join_the_community_wizard_url() {
    $redirect_url = zume_wizard_url( 'join_the_community' );
    return zume_login_url( 'login', $redirect_url );
}
function zume_join_a_public_plan_wizard_url( $code = null ) {
    $params = empty( $code ) ? [] : [ 'code' => $code ];
    $redirect_url = zume_wizard_url( 'join', $params );
    return zume_login_url( 'register', $redirect_url );
}
function zume_connect_with_friend_wizard_url( $code = null ) {
    $params = empty( $code ) ? [] : [ 'code' => $code ];
    $redirect_url = zume_wizard_url( 'friend', $params );
    return zume_login_url( 'register', $redirect_url );
}
function zume_join_friends_training_wizard_url( $code = null ) {
    $params = empty( $code ) ? [] : [ 'code' => $code ];
    $redirect_url = zume_wizard_url( 'plan', $params );
    return zume_login_url( 'register', $redirect_url );
}
function zume_checkin_wizard_url( $code = null ) {
    $params = empty( $code ) ? [] : [ 'code' => $code ];
    $redirect_url = zume_wizard_url( 'checkin', $params );
    return zume_login_url( 'register', $redirect_url );
}

/**
 * Get the url for the wizard.
 *
 * $type can be one of plan|coaching|join|friend|plan|checkin
 * $params is an assosciative array of query param key value pairs
 *
 * @param string $type
 * @param array $params
 */
function zume_wizard_url( $type = 'start', $params = [] ) {
    $lang_code = zume_current_language();

    $wizard_root = 'wizard';

    switch ( $type ) {
        case 'start':
            $url = "$wizard_root/getting-started";
            break;
        case 'profile':
            $url = "$wizard_root/set-profile";
            break;
        case 'coaching':
            $url = "$wizard_root/get-a-coach";
            break;
        case 'join':
            $url = "$wizard_root/join-a-training";
            break;
        case 'friend':
            $url = "$wizard_root/connect-with-friend";
            break;
        case 'plan':
            $url = "$wizard_root/join-friends-training";
            break;
        case 'checkin':
            $url = "$wizard_root/checkin";
            break;
        case 'join_the_community':
            $url = "$wizard_root/join-the-community";
            break;
        case 'make_a_group':
            $url = "$wizard_root/make-a-group";
            break;
        default:
            $url = '';
    }

    if ( $lang_code === 'en' ) {
        return dt_create_site_url( $url, $params );
    }

    return dt_create_site_url( $lang_code . '/' . $url, $params );
}

function zume_dashboard_page_url( $page ) {
    return zume_url( 'dashboard/' . $page );
}
function zume_checkin_url() {
    return zume_url( 'checkin' );
}
function zume_checkin_dashboard_url() {
    return zume_url( 'checkin-dashboard' );
}
function zume_invite_friends_url() {
    return zume_url( 'app/friend-invite' );
}
function zume_invite_training_url() {
    return zume_url( 'app/plan-invite' );
}
function zume_get_a_coach_url() {
    return zume_url( 'get-a-coach' );
}
function zume_how_to_follow_jesus() {
    return zume_url( 'how-to-follow-jesus' );
}
function zume_resources_url() {
    return zume_url( 'resources' );
}
function zume_share_url() {
    return zume_url( 'share' );
}
function zume_donate_url() {
    return zume_url( 'donate' );
}
function zume_privacy_url() {
    return zume_url( 'privacy' );
}
function zume_10_session_url() {
    return zume_url( 'presenter?session=index' );
}
function zume_20_session_url() {
    return zume_url( 'presenter?type=20&session=index' );
}
function zume_intensive_session_url() {
    return zume_url( 'presenter?type=intensive&session=index' );
}
function zume_pieces_pages_url( $slug ) {
    return zume_url( $slug );
}





// Maybe redundant/legacy??
function zume_home_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    if ( 'en' === $current_language ) {
        $home_url = site_url();
    } else {
        $home_url = site_url() . '/' . $current_language;
    }
    return $home_url;
}
function zume_dashboard_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    $url = zume_get_posts_translation_url( 'Dashboard', $current_language );
    return $url;
}
function zume_training_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    $url = zume_get_posts_translation_url( 'Training', $current_language );
    return $url;
}
function zume_about_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'About', $current_lang );
    return $url;
}
function zume_download_url( $meta_key, $current_language = false ) {
    global $wpdb;
    if ( ! $current_language ) {
        $current_language = zume_current_language();
    }
    $url = null;

    $post_id = $wpdb->get_var( $wpdb->prepare( "SELECT p.ID FROM zume_posts p WHERE p.post_type = 'zume_download' AND p.post_title = %s", $current_language ) );
    if ( empty( $post_id ) ) {
        return $url;
    }
    $file_name = get_post_meta( $post_id, $meta_key, true );
    if ( empty( $file_name ) ) {
        return $url;
    }

    return zume_mirror_url() . $current_language . '/' . $file_name;
}

function zume_coaching_url( $path = '' ) {
    $coaching = 'coaching';
    if ( !empty( $path ) ) {
        $coaching .= "/$path";
    }
    return site_url( $coaching );
}
