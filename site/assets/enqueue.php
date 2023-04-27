<?php

function zume_training_magic_url_base_allowed_js() {
    $allowed_js = [];
    $allowed_js[] = 'jquery';
    $allowed_js[] = 'jquery-core';
    $allowed_js[] = 'jquery-migrate';
    $allowed_js[] = 'lodash';
    $allowed_js[] = 'lodash-core';
    $allowed_js[] = 'foundation_js';
    $allowed_js[] = 'foundation_reveal_js';
    return $allowed_js;
}
function zume_training_magic_url_base_allowed_css() {
    $allowed_css = [];
    $allowed_css[] = 'foundation_css';
    return $allowed_css;
}

function zume_training_load_scripts( $hook ) {

    wp_enqueue_script( 'foundation_js', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/js/foundation.min.js', array('jquery'), '6.7.5' );

    wp_register_style( 'foundation_css', 'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/css/foundation.min.css', false, '6.7.5' );
    wp_enqueue_style( 'foundation_css' );

}
add_action( 'wp_enqueue_scripts', 'zume_training_load_scripts' );

add_filter( 'gutenberg_can_edit_post_type', '__return_true' );


