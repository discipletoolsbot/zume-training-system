<?php global $zume_languages_by_code; ?>

<div id="language-menu-reveal" class="reveal" data-reveal data-v-offset="0">
    <h3><?php esc_html_e( 'Language', 'zume' ) ?></h3>
    <hr>
    <table class="hover" id="language-table">
        <?php

        $dt_url = new DT_URL( dt_get_url_path() );
        $url_pieces = zume_get_url_pieces();

        foreach ( $zume_languages_by_code as $item ){
            if ( 'en' === $item['code'] ) {
                $url = esc_url( trailingslashit( site_url() ) . $url_pieces['path'] ) . '?' . $dt_url->parsed_url['query'];
            } else {
                $url = esc_url( site_url() ) . '/' . $item['code'] . '/' . $url_pieces['path'] . '?' . $dt_url->parsed_url['query'];
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
    <button class="close-button" data-close aria-label="Close modal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>