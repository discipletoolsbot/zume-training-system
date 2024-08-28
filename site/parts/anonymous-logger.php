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
                        zumeRequest.post( 'log_anonymous', { type: type, subtype: subtype, language_code: language_code } )
                            .then((log) => {
                                console.log(log)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                        has_scrolled = true
                    }
                });
            })
        </script>
        <?php
    }
}
