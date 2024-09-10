<?php

add_action( 'dt_post_updated', function ( $post_type, $post_id, $fields, $existing_post, $post ) {
    if ( 'groups' === $post_type && isset( $existing_post['group_type'] ) && $existing_post['group_type']['key'] === 'church' ) {

        if (
            $existing_post['location_grid_meta'][0]['level'] !== $post['location_grid_meta'][0]['level'] ||
            $existing_post['location_grid_meta'][0]['lat'] !== $post['location_grid_meta'][0]['lat'] ||
            $existing_post['location_grid_meta'][0]['lng'] !== $post['location_grid_meta'][0]['lng'] ||
            $existing_post['location_grid_meta'][0]['label'] !== $post['location_grid_meta'][0]['label'] ||
            $existing_post['location_grid_meta'][0]['grid_id'] !== $post['location_grid_meta'][0]['grid_id']
        ) {
            zume_log_update(
                [
                    'type' => 'practicing',
                    'subtype' => 'new_church',
                    'post_id' => $post_id,
                    'user_id' => (int) $post['assigned_to']['id'],
                ], [
                    'user_id' => (int) $post['assigned_to']['id'],
                    'post_id' => $post_id,
                    'lat' => (float) $post['location_grid_meta'][0]['lat'],
                    'lng' => (float) $post['location_grid_meta'][0]['lng'],
                    'level' => $post['location_grid_meta'][0]['level'],
                    'label' => $post['location_grid_meta'][0]['label'],
                    'grid_id' => (int) $post['location_grid_meta'][0]['grid_id'],
                ]
            );
        }
    }
}, 10, 5 );
