<?php global $zume_languages_by_code; ?>

<div id="language-menu-reveal" class="reveal" data-reveal data-v-offset="0">
    <button class="close-btn | ms-auto m--1" data-close aria-label="<?php esc_html_e( 'Close', 'zume' ); ?>" type="button">
        <span class="icon z-icon-close"></span>
    </button>
    <h3><?php esc_html_e( 'Language', 'zume' ) ?></h3>
    <hr>
    <table class="hover bypass-nav-click" id="language-table">
        <?php

        $dt_url = new DT_URL( dt_get_url_path() );
        $url_pieces = zume_get_url_pieces();

        foreach ( $zume_languages_by_code as $item ){
            $is_v4 = ( ! $item['enable_flags']['version_5_ready'] && $item['enable_flags']['version_4_available'] );
            $is_v5 = $item['enable_flags']['version_5_ready'];

            $query = '';
            if ( isset( $dt_url->parsed_url['query'] ) ) {
                $query = '?' . $dt_url->parsed_url['query'];
            }

            if ( 'en' === $item['code'] ) {
                $url = esc_url( trailingslashit( site_url() ) ) . $url_pieces['path'] . $query;
            }
            else if ( $is_v5 ) {
                $url = esc_url( trailingslashit( site_url() ) ) . $item['code'] . '/' . $url_pieces['path'] . $query;
            }
            else if ( $is_v4 ) {
                $requested_path = $url_pieces['path'];
                if ( in_array( $requested_path, ['training', 'about', 'resources'] ) ) {
                    $requested_path = $requested_path . '-' . $item['code'];
                }
                if ( in_array( $requested_path, ['get-a-coach', 'checkin', 'share', 'login', 'dashboard', 'presenter'] ) ) {
                    $requested_path = 'training-' . $item['code'];
                }

                $url = 'https://legacy.zume.training/' . $item['code'] . '/' . $requested_path . $query;
            } else {
                continue;
            }

            ?>
            <tr role="button" class="language-selector" data-url="<?php echo esc_url( $url ) ?>" data-value="<?php echo esc_attr( $item['code'] ) ?>" id="row-<?php echo esc_attr( $item['code'] ) ?>">
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

</div>
