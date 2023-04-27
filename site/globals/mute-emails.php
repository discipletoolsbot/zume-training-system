<?php


add_filter('dt_block_development_emails', 'zume_tools_disable_dt_email' );
function zume_tools_disable_dt_email(){
    dt_write_log( __METHOD__ );
    return true;
}


add_filter('wp_mail','zume_tools_disable_wp_emails', 10,1);
function zume_tools_disable_wp_emails( $args ){
    dt_write_log( __METHOD__ );
    dt_write_log( $args );
    unset ( $args['to'] );
    return $args;
}

add_action( 'init', 'wp_disable_new_user_notifications' );
function wp_disable_new_user_notifications() {
    remove_action( 'register_new_user', 'wp_send_new_user_notifications' );
    remove_action( 'edit_user_created_user', 'wp_send_new_user_notifications', 10, 2 );
}
