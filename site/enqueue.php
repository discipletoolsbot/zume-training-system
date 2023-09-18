<?php

use Kucrut\Vite;

function zume_training_magic_url_base_allowed_js( $allowed_js = [] ) {
    $allowed_js[] = 'jquery';
    $allowed_js[] = 'jquery-core';
    $allowed_js[] = 'jquery-migrate';
    $allowed_js[] = 'lodash';
    $allowed_js[] = 'lodash-core';
    $allowed_js[] = 'foundation_js';
    $allowed_js[] = 'foundation_reveal_js';
    $allowed_js[] = 'vite_bundle_js';
    return array_unique( $allowed_js );
}
function zume_training_magic_url_base_allowed_css( $allowed_css = [] ) {
    $allowed_css[] = 'foundation_css';
    $allowed_css[] = 'vite_bundle_css-0'; /* Kucrut\Vite\enqueue_asset appends a number to the handle for each css file assosciated with the js bundle */
    return array_unique( $allowed_css );
}
add_filter( 'dt_login_allowed_css', 'zume_training_magic_url_base_allowed_css' );
add_filter( 'dt_login_allowed_js', 'zume_training_magic_url_base_allowed_js' );

function zume_training_load_scripts( $hook ) {

    wp_enqueue_script( 'foundation_js', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/js/foundation.min.js', array( 'jquery' ), '6.7.5' );

    wp_register_style( 'foundation_css', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/css/foundation.min.css', false, '6.7.5' );
    wp_enqueue_style( 'foundation_css' );

    /**
     * Currently this enqueuer grabs the css that is compiled because it's imported in the js
     * file, hence the target file of main.js
     *
     * We could investigate changing this, or not using vite to bundle the scss at all, and use a
     * seperate bundler, or their may be some deeper rollup options that vite can take to make this
     * nicer, but just going simple for the time being unless we need it to work differently for some
     * reason
     */

    // @todo this is not a stable implementation. We need something better. @chris
    Vite\enqueue_asset(
        __DIR__ . '/assets/dist',
        'site/assets/src/main.js',
        [
            'handle' => 'vite_bundle_css',
            'css-only' => true,
            'dependencies' => [ 'foundation_css' ],
        ]
    );

    Vite\enqueue_asset(
        __DIR__ . '/assets/dist',
        'site/assets/src/main.js',
        [
            'handle' => 'vite_bundle_js',
            'in-footer' => true,
        ]
    );
}

/**
 * Kucrut\Vite\enqueue_asset helpfully enqueues styles assosciated with a js module
 * but only appends a -n number based on how many css files are assosciated with the js module
 *
 * so enqueueing with one enqueue_asset function above we would have
 * vite_bundle_js for the js handle and
 * vite_bundle_js-0 for the css handle.
 *
 * To make sure the handles make sense rather than the above, the -0 handle is being filtered out
 * and we are enqueueing the css-only with a better handle name such as vite_bundle_css
 */
function zume_vite_for_wp__production_assets( $assets ) {
    // filter out the js bundled css handle and unregister it.
    foreach ( $assets['styles'] as $style_handle ) {
        if ( str_contains( $style_handle, 'vite_bundle_js' ) ) {
            wp_deregister_style( $style_handle );
            unset( $assets['styles'][$style_handle] );
        }
    }

    return $assets;
}
add_filter( 'vite_for_wp__production_assets', 'zume_vite_for_wp__production_assets', 1 );

add_filter( 'gutenberg_can_edit_post_type', '__return_true' );
