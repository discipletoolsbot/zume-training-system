<?php
/*
add_filter( 'dt_block_development_emails', 'zume_system_patches_disable_dt_email' );
function zume_system_patches_disable_dt_email(){
    dt_write_log( __METHOD__ );
    return false;
}
*/

add_filter( 'pre_wp_mail', 'zume_system_patches_disable_wp_emails', 10, 2 );
function zume_system_patches_disable_wp_emails( $_, $args ){
    dt_write_log( __METHOD__ );
    dt_write_log( $args );

    if ( !isset( $args['headers'] ) || empty( $args['headers'] ) ) {
        return false;
    }

    /* If the email is marked as from the zume system, let it through */
    $zume_header_marker = ZUME_EMAIL_HEADER;
    $headers = $args['headers'];
    if ( is_string( $headers ) && str_contains( $headers, $zume_header_marker ) ) {
        return null;
    }
    if ( is_array( $headers ) ) {
        foreach ( $headers as $header ) {
            if ( str_contains( $header, $zume_header_marker ) ) {
                return null;
            }
        }
    }

    return false;
}

add_action( 'init', 'wp_disable_new_user_notifications' );
function wp_disable_new_user_notifications() {
    remove_action( 'register_new_user', 'wp_send_new_user_notifications' );
    remove_action( 'edit_user_created_user', 'wp_send_new_user_notifications', 10, 2 );
}
