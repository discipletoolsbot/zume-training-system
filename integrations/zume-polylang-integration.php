<?php
/**
 * @see https://polylang.wordpress.com/documentation/documentation-for-developers/functions-reference/
 * Wrap all polylang integration function in a if function exists test, so if the plugin is turned off or upgraded
 * the site doesn't error out.
 * use: function_exists('pll_the_languages' )
 */



/**
 * Tests if polylang plugin is installed.
 * Must check for plugin existence, because when the polylang plugin is updated, it will be deleted and reinstalled, which
 * could create an error on update if dependent functions are not protected.
 * @return bool
 */
function zume_has_polylang() {
    if ( function_exists( 'pll_the_languages' ) ) {
        return true;
    } else {
        return false;
    }
}

function zume_the_languages( $args = array() ) {
    if ( function_exists( 'pll_the_languages' ) ) {
        return pll_the_languages( $args );
    }
    else {
        return new WP_Error( 'Polylang_missing', 'Polylang plugin missing' );
    }
}

function zume_current_language() {
    if ( function_exists( 'pll_the_languages' ) ) {
        $current_language = pll_current_language();
        return ( ! empty( $current_language ) ) ? $current_language : 'en';
    }
    else {
        return 'en';
    }
}

function zume_default_language() {
    if ( function_exists( 'pll_the_languages' ) ) {
        return pll_default_language();
    }
    else {
        return new WP_Error( 'Polylang_missing', 'Polylang plugin missing' );
    }
}

function zume_get_translation( $post_id, $slug = 'en' ) {
    if ( function_exists( 'pll_the_languages' ) ) {
        if ( empty( $slug ) ) {
            $slug = 'en';
        }
        return pll_get_post( $post_id, $slug );
    }
    else {
        return new WP_Error( 'Polylang_missing', 'Polylang plugin missing' );
    }
}

/**
 * @param        $page_title
 * @param string $lang_code
 *
 * @return string|\WP_Error
 */
function zume_get_posts_translation_url( $page_title, $lang_code = 'en' ) {
    $post_id = zume_core_posts( $page_title );
    $list = zume_language_relationships( $post_id );

    if ( empty( $lang_code ) ) {
        $lang_code = 'en';
    }

    $trans_id = $list[$lang_code] ?? $post_id;

    $trans_object = get_post( $trans_id, OBJECT );
    if ( $lang_code === 'en' ) {
        return site_url( '/' )  . $trans_object->post_name . '/';
    }

    return site_url( '/' ) . $lang_code . '/' . $trans_object->post_name . '/';
}

function zume_core_posts( $page_title ) {
    $ids = [
        'Dashboard' => 26,
        'Overview' => 644,
        'About' => 664,
        'Resources' => 845,
        'Profile' => 19684,
        'FAQ' => 19708,
        'Course' => 19720,
        'Vision' => 19811,
        'Three-Month Plan' => 19848,
        'Home' => 19850,
        'Login' => 20131,
        'Privacy Policy' => 20203,
        'One Page Course' => 20386,
        'Translation Progress' => 20716,
        'Training' => 20729,
    ];
    $lc = strtolower( $page_title );
    return $ids[$page_title] ?? $ids[$lc] ?? 0;
}
function zume_language_relationships( $post_id ) {
    global $wpdb;
    $list = $wpdb->get_var( $wpdb->prepare(
        "
			SELECT description
			FROM wp_term_taxonomy tr
            WHERE tr.description LIKE %s AND tr.taxonomy = 'post_translations';
		",
        '%' . $wpdb->esc_like( $post_id ) . '%'
    ) );
    return maybe_unserialize( $list );
}
function zume_get_post_by_slug( $post_slug, $post_type = 'zume_page' ) {
    global $wpdb;

    $post = $wpdb->get_row( $wpdb->prepare(
        " SELECT * FROM $wpdb->posts
            WHERE post_name = %s
            AND post_type = %s
        ",
        $post_slug,
        $post_type,
    ) );

    return $post;
}
