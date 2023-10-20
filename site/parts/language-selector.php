<?php global $zume_languages_by_code; ?>

<div id="language-menu-reveal" class="reveal" data-reveal data-v-offset="0">
    <h3><?php esc_html_e( 'Language', 'zume' ) ?></h3>
    <hr>
    <table class="hover" id="language-table">
        <?php
        $url_pieces = zume_get_url_pieces();

        foreach ( $zume_languages_by_code as $item ){
            if ( 'en' === $item['code'] ) {
                $url = esc_url( trailingslashit( site_url() ) . $url_pieces['path'] );
            } else {
                $url = esc_url( site_url() ) . '/' . $item['code'] . '/' . $url_pieces['path'];
            }
            ?>
            <tr class="language-selector" data-url="<?php echo esc_url( $url ) ?>" data-value="<?php echo esc_attr( $item['code'] ) ?>" id="row-<?php echo esc_attr( $item['code'] ) ?>">
                <td><?php echo esc_html( $item['nativeName'] ) ?></td>
                <td><?php echo esc_html( $item['enDisplayName'] ) ?></td>
            </tr>
            <?php
        }
        ?>
    </table>
    <style>
        .language-selector {
            cursor: pointer;
        }
    </style>
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
    <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
