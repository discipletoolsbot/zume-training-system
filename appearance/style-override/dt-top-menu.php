<?php

add_filter( 'dt_nav', function ( $menu ) {
    if ( isset( $menu['admin']['site']['icon'] ) ) {
        $menu['admin']['site']['icon'] = plugin_dir_url( __FILE__ ) . 'training-logo.svg';
    }
    if ( isset( $menu['main']['metrics'] ) ) {
        unset( $menu['main']['metrics'] );
    }
    return $menu;
}, 1, 199 );
