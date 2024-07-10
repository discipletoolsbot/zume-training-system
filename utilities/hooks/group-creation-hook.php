<?php

add_action( 'dt_post_created', function ( $post_type, $post_id, $initial_fields, $args ) {
    if ( 'groups' === $post_type ) {
        zume_log_insert( 'reports', 'new_church', [ 'user_id' => $initial_fields['assigned_to'], 'post_id' => $post_id ] );
        zume_log_insert( 'system', 'first_practitioner_report', [ 'user_id' => $initial_fields['assigned_to'] ], true );
        if ( isset( $initial_fields['parent_groups'] ) ) {
            zume_log_insert( 'system', 'seeing_generational_fruit', [ 'user_id' => $initial_fields['assigned_to'] ], true );
        }
    }
}, 10, 4 );
