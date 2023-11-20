<?php require __DIR__ . '/language-menu.php' ?>

<script>
    jQuery(document).ready(function($){
        jQuery('.language-selector').on('click', function(e){
            let lang = jQuery(this).data('value')
            let url = jQuery(this).data('url')
            jQuery('.language-selector:not(#row-'+lang+')').fadeTo("fast", 0.33)

            window.SHAREDFUNCTIONS.setCookie( '<?php echo esc_js( ZUME_LANGUAGE_COOKIE ) ?>', lang, '/', 365 )

            const nonce = "<?php echo esc_js( wp_create_nonce( 'wp_rest' ) ) ?>"
            const rest_endpoint = "<?php echo esc_js( esc_url_raw( rest_url() ) . 'zume_system/v1' ) ?>"
            const is_logged_in = "<?php echo esc_js( is_user_logged_in() ) ?>"

            if ( is_logged_in ) {
                fetch( rest_endpoint + '/profile', {
                    method: 'POST',
                    body: JSON.stringify( { ui_language: lang } ),
                    headers: {
                        'X-WP-Nonce': nonce
                    }
                }).then(() => {
                    window.location = url
                })
            } else {
                window.location = url
            }
        })
    })
</script>