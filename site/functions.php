<?php

function zume_get_url_pieces() {
    $url = dt_get_url_path();
    $codes = zume_language_codes();

    $url_parts = explode( '/', $url );

    $lang_code = 'en';
    if ( in_array( $url_parts[0], $codes ) ) {
        $lang_code = $url_parts[0];
        array_shift( $url_parts );
    }
    $path = implode( '/', $url_parts );

    return [
        'lang_code' => $lang_code,
        'path' => $path,
    ];
}