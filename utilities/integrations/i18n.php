<?php

/**
 * Loads the zume text domain
 */
function zume_i18n() : void {
    if ( dt_is_rest() ) {
    }
    $domain = 'zume';
    load_plugin_textdomain( $domain, false, trailingslashit( dirname( plugin_basename( __FILE__ ) ) ). '../../languages' );
}

add_filter( 'determine_locale', 'zume_determine_locale'  );
add_filter( 'locale', 'zume_determine_locale'  );

/**
 * Filters the locale for the current request.
 *
 * @param string $locale The locale.
 * @return string The locale.
 */
function zume_determine_locale( string $locale ) : string {
    if ( dt_is_rest() ) {
        $lang_code = isset( $_COOKIE['zume_language'] ) ? sanitize_text_field( wp_unslash( $_COOKIE['zume_language'] ) ) : null;
    } else {
        [
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        $language_code = zume_get_language_cookie();

        if ( empty( $language_code ) || $language_code !== $lang_code ) {
            zume_set_language_cookie( $lang_code );
        }
    }

    $locale = zume_get_language_locale( $lang_code );

	return $locale;
}