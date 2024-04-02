<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

function zume_get_url_pieces( $url = null ) {

    if ( !$url ) {
        $url = dt_get_url_path();
    }

    $dt_url = new DT_URL( $url );

    $codes = zume_language_codes();

    $path = isset( $dt_url->parsed_url['path'] ) ? $dt_url->parsed_url['path'] : '';

    $url_parts = explode( '/', $path );

    $lang_code = 'en';
    if ( in_array( $url_parts[0], $codes ) ) {
        $lang_code = array_shift( $url_parts );
    }
    $path = implode( '/', $url_parts );

    return [
        'lang_code' => $lang_code,
        'path' => $path,
        'url_parts' => ( $url_parts ) ? $url_parts : [],
    ];
}

if ( ! function_exists( 'zume_current_language' ) ) {
    function zume_current_language() {
        if ( function_exists( 'pll_the_languages' ) ) {
            $current_language = pll_current_language();
            return ( ! empty( $current_language ) ) ? $current_language : 'en';
        }

        $locale = get_locale();

        if ( empty( $local ) || 'en_US' === $locale ) {
            return 'en';
        }

        return $locale;
    }
}

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

function zume_make_a_plan_wizard_url() {
    $redirect_url = zume_wizard_url( 'start' );
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
        default:
            $url = '';
    }

    if ( $lang_code === 'en' ) {
        return dt_create_site_url( $url, $params );
    }

    return dt_create_site_url( $lang_code . '/' . $url, $params );
}

function zume_dashboard_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    $url = zume_get_posts_translation_url( 'Dashboard', $current_language );
    return $url;
}

function zume_checkin_url() {
    return zume_url( 'zume_app/checkin' );
}
function zume_invite_friends_url() {
    return zume_url( 'zume_app/friend_invite' );
}
function zume_invite_training_url() {
    return zume_url( 'zume_app/plan_invite' );
}

function zume_training_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    $url = zume_get_posts_translation_url( 'Training', $current_language );
    return $url;
}

function zume_course_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Course', $current_lang );
}

function zume_three_month_plan_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Three-Month Plan', $current_lang );
}

function zume_mobile_app_url() {
    return zume_url( 'mobile-app' );
}

function zume_follow_jesus_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Follow Jesus', $current_lang );
}

function zume_get_a_coach_url() {
    return zume_url( 'get-a-coach' );
}

function zume_how_to_follow_jesus() {
    return zume_url( 'how-to-follow-jesus' );
}

function zume_vision_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Vision', $current_lang );
}

function zume_overview_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Overview', $current_lang );
}

function zume_guidebook_url() {
    return zume_url( 'book' );
}

function zume_share_url() {
    return zume_url( 'share' );
}
function zume_donate_url() {
    return zume_url( 'donate' );
}

function zume_profile_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'Profile', $current_lang );
    return $url;
}

function zume_about_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'About', $current_lang );
    return $url;
}

function zume_faq_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'FAQ', $current_lang );
    return $url;
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

function zume_url( $slug ) {
    $current_lang = zume_current_language();

    if ( $current_lang === 'en' ) {
        return site_url( '/' ) . $slug;
    }

    return site_url( '/' ) . $current_lang . '/' . $slug;
}
