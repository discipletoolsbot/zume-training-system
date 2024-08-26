<?php
if ( !defined( 'ABSPATH' ) ) { exit; }

function zume_content_logger( $type, $subtype, $language_code ) {
    if ( is_user_logged_in() ) {
        ?>

        <?php
    } else {
        ?>
        <script>
            let jsObject = [<?php echo json_encode([
                'map_key' => DT_Mapbox_API::get_key(),
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
            ]) ?>][0]
            /* <![CDATA[ */
            jQuery(document).ready(function(){
                let type = '<?php echo esc_attr( $type ) ?>'
                let subtype = '<?php echo esc_attr( $subtype ) ?>'
                let language_code = '<?php echo esc_attr( $language_code ) ?>'

                let has_scrolled = false
                jQuery(document).scroll(function() {
                    if (jQuery(document).scrollTop() >= 200 && has_scrolled === false ) {
                        makeRequest( 'POST', 'log_anonymous', { type: type, subtype: subtype, language_code: language_code } )
                            .then((log) => {
                                console.log(log)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                            .always(() => {
                                this.loading = false
                            })
                        has_scrolled = true
                    }
                });
            })
            function makeRequest(type, url, data, base = 'zume_system/v1/') {
                //make sure base has a trailing slash if url does not start with one
                if (!base.endsWith('/') && !url.startsWith('/')) {
                    base += '/';
                }
                const options = {
                    type: type,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    url: url.startsWith('http') ? url : `${jsObject.root}${base}${url}`,
                    beforeSend: (xhr) => {
                        xhr.setRequestHeader('X-WP-Nonce', jsObject.nonce);
                    },
                };

                if (data ) {
                    options.data = type === 'GET' ? data : JSON.stringify(data);
                }

                return jQuery.ajax(options);
            }
        </script>
        <?php
    }
}
