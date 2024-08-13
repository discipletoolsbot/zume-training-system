<?php

add_action( 'dt_post_created', function ( $post_type, $post_id, $initial_fields, $args ) {
    if ( 'groups' === $post_type ) {
        update_post_meta( $post_id, 'group_type', 'church' );

        zume_log_insert( 'practicing', 'new_church', [ 'user_id' => $initial_fields['assigned_to'], 'post_id' => $post_id ] );
        zume_log_insert( 'practicing', 'first_practitioner_report', [ 'user_id' => $initial_fields['assigned_to'] ], true );
        if ( isset( $initial_fields['parent_groups'] ) ) {
            zume_log_insert( 'practicing', 'seeing_generational_fruit', [ 'user_id' => $initial_fields['assigned_to'] ], true );
        }
    }
}, 10, 4 );
