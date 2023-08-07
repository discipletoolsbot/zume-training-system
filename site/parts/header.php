<?php


function zume_training_header() {

    ?>

    <header>
        <div class="container d-flex justify-content-between align-items-center">
            <a class="nav__link" data-open="language-menu-reveal"><?php esc_html_e( 'Language', 'zume' ) ?></a>

            <div class="absolute-center left-0 right-0">
                <a href="/" class="logo">
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/zume-training-logo.svg' ) ?>" alt="Zume Logo" />
                </a>
            </div>

            <nav class="nav" id="nav">
                <ul class="nav__list nav__list--secondary">

                <?php if ( is_user_logged_in() ) : ?>

                    <li class="nav__item"><a href="<?php echo esc_url( '/profile' ) ?>" class="nav__link"><?php echo esc_html__( 'Profile', 'zume' ) ?></a></li>
                    <li class="nav__item"><a href="<?php echo esc_url( '/dashboard' ) ?>" class="nav__link"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a></li>
                    <?php if ( user_can( get_current_user_id(), 'manage_dt' ) ) { ?><li class="nav__item"><a href="<?php echo esc_url( '/contacts' ) ?>" class="nav__link"><?php echo esc_html__( 'Admin', 'zume' ) ?></a></li><?php } ?>
                    <li class="nav__item"><a href="<?php echo esc_url( dt_login_url( 'logout' ) ) ?>" class="nav__link"><?php echo esc_html__( 'Logout', 'zume' ) ?></a></li>

                <?php else : ?>

                    <li class="nav__item"><a href="<?php echo esc_url( dt_login_url( 'login' ) ) ?>" class="nav__link"><?php echo esc_html__( 'Sign in', 'zume' ) ?></a></li>
                    <li class="nav__item"><a href="<?php echo esc_url( dt_login_url( 'register' ) ) ?>" class="nav__link nav__link--button"><?php echo esc_html__( 'Register', 'zume' ) ?></a></li>

                <?php endif; ?>

                </ul>
            </nav>
            <button class="nav-toggle" aria-label="open navigation">
                <span class="hamburger"></span>
            </button>
        </div>


    </header>

    <?php global $zume_languages; ?>

    <div id="language-menu-reveal" class="reveal" data-reveal data-v-offset="0">
        <h3><?php esc_html_e( 'Language', 'zume' ) ?></h3>
        <hr>
        <table class="hover" id="language-table">
            <?php
            $url_pieces = zume_get_url_pieces();

            foreach ( $zume_languages as $item ){
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
                    window.location = url
                })
            })
        </script>
        <button class="close-button" data-close aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <?php

}
