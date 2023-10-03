<?php

add_action( 'dt_post_created', function( $post_type, $post_id, $initial_fields, $args ) {
    if ( 'groups' === $post_type ) {
        zume_log_insert( 'system', 'first_practitioner_report', [ 'user_id' => $initial_fields['assigned_to'] ], true  );
    }
}, 10, 4 );
