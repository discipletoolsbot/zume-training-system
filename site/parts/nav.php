<?php // WARNING: this file contains a desktop and mobile version of the nav. So both need editing ?>
    <header class="header">
        <div class="d-flex justify-content-between px-1">
            <div class="d-flex gap-0">
                <button class="nav-toggle" aria-label="open navigation" data-toggle="siteOffCanvas">
                    <span class="hamburger"></span>
                </button>

                <a href="<?php echo esc_url( zume_home_url() ) ?>" class="logo">
                    <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/zume-training-logo-white-short.svg' ) ?>" alt="Zume Logo" />
                </a>
            </div>

            <nav class="d-flex align-items-center gap-0">
                <div class="cluster | s--2 | nav nav__list" role="list">

                    <?php if ( is_user_logged_in() ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_resources_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Resources', 'zume' ) ?></a>

                    <?php else : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_about_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_training_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Training', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_resources_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Resources', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'register' ) ) ?>" class="btn outline dark nav__button"><?php echo esc_html__( 'Register', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'login' ) ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Login', 'zume' ) ?></a>

                    <?php endif; ?>
                </div>
                <span class="nav__bar | bar bg-white"></span>
                <div class="d-flex align-items-center">
                    <a class="nav__link" role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" data-tool>
                        <div class="icon z-icon-checkin"></div>
                        <span><?php echo esc_html__( 'Check-in', 'zume' ) ?></span>
                    </a>

                    <?php if ( zume_feature_flag( 'pieces_pages', zume_current_language() ) ) : ?>

                        <a class="nav__link" role="listitem" id="share-button" href="<?php echo esc_url( zume_share_url() ) ?>" aria-label="Share" data-tool>
                            <div class="icon z-icon-share"></div>
                            <span><?php echo esc_html__( 'Share', 'zume' ) ?></span>
                        </a>

                    <?php endif; ?>


                    <?php $code = zume_current_language() ?>
                    <?php $display_code = zume_get_language_display_code( $code ) ?>

                    <button class="nav__link" data-open="language-menu-reveal" data-tool>
                        <?php require plugin_dir_path( __DIR__ ) . 'assets/images/globe-outline.svg' ?>
                        <span><?php echo esc_html( strtoupper( $display_code ) ) ?></span>
                    </button>
                </div>
            </nav>
        </div>
    </header>

    <?php require __DIR__ . '/mobile-nav.php' ?>

    <?php require __DIR__ . '/language-selector.php' ?>
