    <header>
        <div class="d-flex | justify-content-between">

            <a href="<?php echo esc_url( zume_home_url() ) ?>" class="logo">
                <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/ZumeTraining-Small.png' ) ?>" alt="Zume Logo" />
            </a>

            <nav class="nav" id="nav" role="list">
                <div class="cluster | s--2 | nav__list nav__list--secondary" role="list">

                    <?php if ( user_can( get_current_user_id(), 'manage_dt' ) ) { ?>

                        <a role="listitem" href="<?php echo esc_url( '/contacts' ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'DTools', 'zume' ) ?></a>

                    <?php } ?>

                    <?php if ( is_user_logged_in() ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_course_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Course', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Check-in', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_profile_url() ) ?>" class="nav__icon link-light"><?php require plugin_dir_path( __DIR__ ) . 'assets/images/profile.svg' ?></a>

                    <?php endif; ?>

                    <?php if ( !is_user_logged_in() ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_about_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_course_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Course', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Check-in', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( dt_login_url( 'login' ) ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Login', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn outline dark nav__button"><?php echo esc_html__( 'Register', 'zume' ) ?></a>

                    <?php endif; ?>

                    <?php $code = zume_current_language() ?>
                    <?php $display_code = zume_get_language_display_code( $code ) ?>

                    <button class="btn dark nav__button d-flex align-items-center gap--4" data-open="language-menu-reveal">
                        <?php require plugin_dir_path( __DIR__ ) . 'assets/images/globe-outline.svg' ?>
                        <?php echo esc_html( strtoupper( $display_code ) ) ?>
                    </button>
                </div>
            </nav>
            <button class="nav-toggle" aria-label="open navigation">
                <span class="hamburger"></span>
            </button>
        </div>


    </header>

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
