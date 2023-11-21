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

                    <a href="<?php echo esc_url( zume_share_url() ) ?>" class="btn dark nav__button d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="currentColor" x="0px" y="0px" width="1.4em" height="1.4em" viewBox="0 0 30 30">
                            <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
                        </svg>
                    </a>
                </div>
            </nav>
            <button class="nav-toggle" aria-label="open navigation">
                <span class="hamburger"></span>
            </button>
        </div>


    </header>

    <?php require __DIR__ . '/language-selector.php' ?>