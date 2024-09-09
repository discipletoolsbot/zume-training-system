<?php

add_action( 'dt_post_created', function ( $post_type, $post_id, $fields, $args ) {
    if ( 'groups' === $post_type && isset( $fields['group_type'] ) && $fields['group_type'] === 'church' ) {
        update_post_meta( $post_id, 'group_type', 'church' );

        $church = DT_Posts::get_post( 'groups', $post_id );

        zume_log_insert( 'practicing', 'new_church', [
            'user_id' => $fields['assigned_to'],
            'post_id' => $post_id,
            'lat' => $church['location_grid_meta'][0]['lat'],
            'lng' => $church['location_grid_meta'][0]['lng'],
            'level' => $church['location_grid_meta'][0]['level'],
            'label' => $church['location_grid_meta'][0]['label'],
            'grid_id' => $church['location_grid_meta'][0]['grid_id'],
        ] );
        $churches = zume_get_user_churches();

        if ( empty( $churches ) ) {
            zume_log_insert( 'practicing', 'first_practitioner_report', [ 'user_id' => $fields['assigned_to'] ], true );
        }
        if ( isset( $fields['parent_groups'] ) ) {
            zume_log_insert( 'practicing', 'seeing_generational_fruit', [ 'user_id' => $fields['assigned_to'] ], true );
        }
    }
}, 10, 4 );
