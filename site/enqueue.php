<?php

use Kucrut\Vite;

function zume_training_magic_url_base_allowed_js( $allowed_js = [] ) {
    $allowed_js[] = 'jquery';
    $allowed_js[] = 'jquery-core';
    $allowed_js[] = 'jquery-migrate';
    $allowed_js[] = 'lodash';
    $allowed_js[] = 'lodash-core';
    $allowed_js[] = 'moment';
    $allowed_js[] = 'datepicker';
    $allowed_js[] = 'shared-functions';
    $allowed_js[] = 'foundation_js';
    $allowed_js[] = 'foundation_reveal_js';
    $allowed_js[] = 'vite_bundle_js';
    $allowed_js[] = 'svg-loader';

    return array_unique( $allowed_js );
}
function zume_training_magic_url_base_allowed_css( $allowed_css = [] ) {
    $allowed_css[] = 'foundation_css';
    $allowed_css[] = 'vite_bundle_css';
    return array_unique( $allowed_css );
}
add_filter( 'dt_login_allowed_css', 'zume_training_magic_url_base_allowed_css' );
add_filter( 'dt_login_allowed_js', 'zume_training_magic_url_base_allowed_js' );

function zume_training_load_scripts( $hook ) {

    wp_register_script( 'svg-loader', 'https://unpkg.com/external-svg-loader@1.6.10/svg-loader.min.js', array(), '1.6.10' );
    wp_enqueue_script( 'svg-loader' );

    wp_register_script( 'foundation_js', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/js/foundation.min.js', array( 'jquery' ), '6.7.5' );
    wp_enqueue_script( 'foundation_js' );

    wp_register_style( 'foundation_css', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/css/foundation.min.css', array(), '6.7.5' );
    wp_enqueue_style( 'foundation_css' );

    wp_register_style( 'vite_bundle_css', plugin_dir_url( __DIR__ ) . 'site/assets/dist/assets/main.css', array( 'foundation_css' ), filemtime( plugin_dir_path( __DIR__ ) . 'site/assets/dist/assets/main.css' ) );
    wp_enqueue_style( 'vite_bundle_css' );

    wp_register_script( 'vite_bundle_js', plugin_dir_url( __DIR__ ) . 'site/assets/dist/assets/main.js', array(), filemtime( plugin_dir_path( __DIR__ ) . 'site/assets/dist/assets/main.js' ) );
    wp_enqueue_script( 'vite_bundle_js' );
}

add_filter( 'gutenberg_can_edit_post_type', '__return_true' );
