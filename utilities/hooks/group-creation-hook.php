<?php

add_action( 'dt_post_created', function ( $post_type, $post_id, $fields, $args ) {
    if ( 'groups' === $post_type && isset( $fields['group_type'] ) && $fields['group_type'] === 'church' ) {
        update_post_meta( $post_id, 'group_type', 'church' );

        zume_log_insert( 'practicing', 'new_church', [ 'user_id' => $fields['assigned_to'], 'post_id' => $post_id ] );
        $churches = zume_get_user_churches();

        if ( empty( $churches ) ) {
            zume_log_insert( 'practicing', 'first_practitioner_report', [ 'user_id' => $fields['assigned_to'] ], true );
        }
        if ( isset( $fields['parent_groups'] ) ) {
            zume_log_insert( 'practicing', 'seeing_generational_fruit', [ 'user_id' => $fields['assigned_to'] ], true );
        }
    }
}, 10, 4 );
