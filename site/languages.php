<?php

function zume_language_codes() {
    global $zume_languages;
    $codes = array();
    foreach ( $zume_languages as $lang ) {
        $codes[] = $lang['code'];
    }
    return $codes;
}

/**
 * Returns the locale for a specific language code.
 *
 * If the code doesn't exist, returns an empty string
 *
 * @param string $code
 *
 * @return string
 */
function get_zume_language_locale( $code ) {
    global $zume_languages;
    $locale = '';
    foreach ( $zume_languages as $lang ) {
        if ( $lang['code'] === $code ) {
            $locale = $lang['locale'];
        }
    }
    return $locale;
}



