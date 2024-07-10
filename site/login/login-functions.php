<?php

add_filter( 'login_url', function ( $url ) {
    if ( str_contains( $url, 'wp-login.php' ) ) {
        $url = str_replace( 'wp-login.php', 'login', $url );
    }
    return $url;
}, 100, 1 );
