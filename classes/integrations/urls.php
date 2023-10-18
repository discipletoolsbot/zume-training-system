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

function zume_get_a_coach_wizard_url() {
    $redirect_url = zume_wizard_url( 'coaching' );
    return zume_login_url( 'register', $redirect_url );
}
function zume_make_a_plan_wizard_url() {
    $redirect_url = zume_wizard_url( 'plan' );
    return zume_login_url( 'register', $redirect_url );
}
function zume_join_a_training_wizard_url() {
    $redirect_url = zume_wizard_url( 'join' );
    return zume_login_url( 'register', $redirect_url );
}

function zume_wizard_url( $type = 'plan' ) {
    $lang_code = zume_current_language();

    $wizard_root = 'wizard';

    switch ( $type ) {
        case 'plan':
            $url = "$wizard_root/getting-started";
            break;
        case 'coaching':
            $url = "$wizard_root/connect-to-coach";
            break;
        case 'join':
            $url = "$wizard_root/join-a-training";
            break;
        default:
            $url = '';
    }

    if ( $lang_code === 'en' ) {
        return dt_create_site_url( $url );
    }

    return dt_create_site_url( $lang_code . '/' . $url );
}

function zume_dashboard_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    $url = zume_get_posts_translation_url( 'Dashboard', $current_language );
    return $url;
}

function zume_checkin_url() {
    $current_language = zume_current_language();
    if ( $current_language === 'en' ) {
        return dt_create_site_url( 'zume_app/checkin' );
    }
    return dt_create_site_url( $current_language . '/zume_app/checkin' );
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

function zume_url( $slug ) {
    $current_lang = zume_current_language();

    if ( $current_lang === 'en' ) {
        return site_url( '/' ) . $slug;
    }

    return site_url( '/' ) . $current_lang . '/' . $slug;
}
