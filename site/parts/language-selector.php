<?php require __DIR__ . '/language-menu.php' ?>

<script>
    jQuery(document).ready(function($){
        jQuery('.language-selector').on('click', function(e){
            let lang = jQuery(this).data('value')
            let url = jQuery(this).data('url')
            jQuery('.language-selector:not(#row-'+lang+')').fadeTo("fast", 0.33)

            window.SHAREDFUNCTIONS.setCookie( '<?php echo esc_js( ZUME_LANGUAGE_COOKIE ) ?>', lang, '/', 365 )

            window.location = url
        })
    })
</script>