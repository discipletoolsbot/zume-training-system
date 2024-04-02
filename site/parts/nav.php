    <header class="header">
        <div class="d-flex | justify-content-between">

            <a href="<?php echo esc_url( zume_home_url() ) ?>" class="logo">
                <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/ZumeTraining-Small.png' ) ?>" alt="Zume Logo" />
            </a>

            <nav class="nav" id="nav" role="list">
                <div class="cluster | s--2 | nav__list nav__list--secondary" role="list">

                    <?php if ( is_user_logged_in() ) : ?>
                        <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Check-in', 'zume' ) ?></a>

                        <?php if ( zume_feature_flag( 'pieces_pages', zume_current_language() ) ) : ?>

                            <a role="listitem" href="<?php echo esc_url( zume_share_url() ) ?>" class="btn dark nav__button d-flex align-items-center"><?php echo esc_html__( 'Share', 'zume' ) ?></a>

                        <?php endif; ?>

                    <?php endif; ?>

                    <?php if ( !is_user_logged_in() ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_about_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_training_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Training', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Check-in', 'zume' ) ?></a>

                        <?php if ( zume_feature_flag( 'pieces_pages', zume_current_language() ) ) : ?>

                            <a role="listitem" href="<?php echo esc_url( zume_share_url() ) ?>" class="btn dark nav__button d-flex align-items-center"><?php echo esc_html__( 'Share', 'zume' ) ?></a>

                        <?php endif; ?>

                        <a role="listitem" href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>" class="btn outline dark nav__button"><?php echo esc_html__( 'Register', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( dt_login_url( 'login' ) ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Login', 'zume' ) ?></a>

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

    <?php require __DIR__ . '/language-selector.php' ?>
