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

function zume_course_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Course', $current_lang );
}

function zume_three_month_plan_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Three-Month Plan', $current_lang );
}

function zume_mobile_app_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Mobile App', $current_lang );
}

function zume_follow_jesus_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Follow Jesus', $current_lang );
}

function zume_resources_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Resources', $current_lang );
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
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'Guidebook', $current_lang );
    return $url;
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
