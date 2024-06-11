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

            <nav class="d-flex gap-0">
                <div class="cluster | s--2 | nav nav__list nav__list--secondary" role="list">

                    <?php if ( is_user_logged_in() ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>

                    <?php else : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_about_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_training_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Training', 'zume' ) ?></a>

                    <?php endif; ?>

                    <a role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Check-in', 'zume' ) ?></a>

                    <?php if ( zume_feature_flag( 'pieces_pages', zume_current_language() ) ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_share_url() ) ?>" class="btn dark nav__button d-flex align-items-center"><?php echo esc_html__( 'Share', 'zume' ) ?></a>

                    <?php endif; ?>

                    <?php if ( !is_user_logged_in() ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'register' ) ) ?>" class="btn outline dark nav__button"><?php echo esc_html__( 'Register', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'login' ) ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Login', 'zume' ) ?></a>

                    <?php endif; ?>

                </div>

                <div class="d-flex align-items-center">

                    <?php if ( zume_feature_flag( 'pieces_pages', zume_current_language() ) ) : ?>

                        <a role="listitem" id="share-button" href="<?php echo esc_url( zume_share_url() ) ?>" class="d-flex align-items-center nav__link white" aria-label="Share"><div class="icon z-icon-share"></div></a>

                    <?php endif; ?>


                    <?php $code = zume_current_language() ?>
                    <?php $display_code = zume_get_language_display_code( $code ) ?>

                    <button class="nav__link white d-flex align-items-center gap--4" data-open="language-menu-reveal">
                        <?php require plugin_dir_path( __DIR__ ) . 'assets/images/globe-outline.svg' ?>
                        <span class="language-display-code"><?php echo esc_html( strtoupper( $display_code ) ) ?></span>
                    </button>
                </div>
            </nav>
        </div>
    </header>

    <nav class="bg-brand white py-3 | site-menu off-canvas position-left justify-content-between py-1" id="siteOffCanvas" data-off-canvas data-transition="overlap">
        <div class="stack | my-3 mx-0" role="list">

            <?php if ( is_user_logged_in() ) : ?>

                <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn dark nav__link"><span class="icon z-icon-dashboard"></span><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>

            <?php else : ?>

            <a role="listitem" href="<?php echo esc_url( zume_about_url() ) ?>" class="link-light nav__link"><span class="icon z-icon-info"></span> <?php echo esc_html__( 'About', 'zume' ) ?></a>
            <a role="listitem" href="<?php echo esc_url( zume_training_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-my-training"></div> <?php echo esc_html__( 'Training', 'zume' ) ?></a>

            <?php endif; ?>

            <a role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-checkin"></div> <?php echo esc_html__( 'Check-in', 'zume' ) ?></a>

            <?php if ( is_user_logged_in() ) : ?>

                <?php $user_stage = zume_get_user_stage() ?>

                <?php if ( !isset( $user_stage['state']['requested_a_coach'] ) ) : ?>

                    <a role="listitem" href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-coach"></div> <?php echo esc_html__( 'Get a Coach', 'zume' ) ?></a>

                <?php endif; ?>

                <?php if ( !isset( $user_stage['state']['join_community'] ) ) : ?>

                    <a role="listitem" href="<?php echo esc_url( zume_join_the_community_wizard_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-community"></div> <?php echo esc_html__( 'Join the Community', 'zume' ) ?></a>

                <?php endif; ?>

            <?php else : ?>

                <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'register' ) ) ?>" class="link-light nav__link outline"><div class="icon z-icon-invite"></div> <?php echo esc_html__( 'Register', 'zume' ) ?></a>
                <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'login' ) ) ?>" class="link-light nav__link"><div class="icon z-icon-profile"></div> <?php echo esc_html__( 'Login', 'zume' ) ?></a>

            <?php endif; ?>

        </div>
    </nav>
    <?php require __DIR__ . '/language-selector.php' ?>
