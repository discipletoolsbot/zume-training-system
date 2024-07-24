<?php
if ( !defined( 'ABSPATH' ) ) { exit; }

function zume_content_logger( $type, $subtype, $language_code ) {
    if ( is_user_logged_in() ) {
        ?>

        <?php
    } else {
        ?>
        <script>
            jQuery(document).ready(function(){
                let type = '<?php echo esc_attr( $type ) ?>'
                let subtype = '<?php echo esc_attr( $subtype ) ?>'
                let language_code = '<?php echo esc_attr( $language_code ) ?>'

                let has_scrolled = false
                jQuery(document).scroll(function() {
                    if (jQuery(document).scrollTop() >= 200 && has_scrolled === false ) {
                        makeRequest( 'POST', 'log_anonymous', { type: type, subtype: subtype, language_code: language_code }, 'zume_system/v1' )
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
        </script>
        <?php
    }
}
