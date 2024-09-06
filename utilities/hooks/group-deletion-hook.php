<?php

add_action( 'dt_before_post_deleted', function ( $post_type, $post_id ) {
    if ( 'groups' === $post_type ) {
        $post = DT_Posts::get_post( $post_type, $post_id );

        if ( isset( $post['group_type'] ) && $post['group_type']['key'] === 'church' ) {
            zume_log_insert( 'practicing', 'deleted_church', [
                'post_id' => $post_id,
                'post_type' => 'groups',
            ] );
        }
    }
}, 10, 2 );
