
    <nav class="bg-brand white py-3 | site-menu off-canvas position-left justify-content-between py-1" id="siteOffCanvas" data-off-canvas data-transition="overlap">
        <div class="stack | my-3 mx-0" role="list">

            <?php if ( is_user_logged_in() ) : ?>

                <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="link-light nav__link"><span class="icon z-icon-dashboard"></span><span><?php echo esc_html__( 'Dashboard', 'zume' ) ?></span></a>
                <a role="listitem" href="<?php echo esc_url( zume_resources_url() ) ?>" class="link-light nav__link"><span class="icon z-icon-resources"></span><span><?php echo esc_html__( 'Resources', 'zume' ) ?></span></a>

                <?php $user_stage = zume_get_user_stage() ?>

                <?php if ( !isset( $user_stage['state']['requested_a_coach'] ) ) : ?>

                    <a role="listitem" href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-coach"></div> <span><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></span></a>

                <?php endif; ?>

                <?php if ( !isset( $user_stage['state']['join_community'] ) ) : ?>

                    <a role="listitem" href="<?php echo esc_url( zume_join_the_community_wizard_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-community"></div> <span><?php echo esc_html__( 'Join the Community', 'zume' ) ?></span></a>

                <?php endif; ?>

            <?php else : ?>

                <a role="listitem" href="<?php echo esc_url( zume_about_url() ) ?>" class="link-light nav__link"><span class="icon z-icon-info"></span> <span><?php echo esc_html__( 'About', 'zume' ) ?></span></a>
                <a role="listitem" href="<?php echo esc_url( zume_training_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-my-training"></div> <span><?php echo esc_html__( 'Training', 'zume' ) ?></span></a>
                <a role="listitem" href="<?php echo esc_url( zume_resources_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-resources"></div> <span><?php echo esc_html__( 'Resources', 'zume' ) ?></span></a>
                <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'register' ) ) ?>" class="link-light nav__link outline"><div class="icon z-icon-invite"></div> <span><?php echo esc_html__( 'Register', 'zume' ) ?></span></a>
                <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'login' ) ) ?>" class="link-light nav__link"><div class="icon z-icon-profile"></div> <span><?php echo esc_html__( 'Login', 'zume' ) ?></span></a>

            <?php endif; ?>

            <hr>

            <a role="listitem" href="<?php echo esc_url( zume_checkin_url() ) ?>" class="link-light nav__link"><div class="icon z-icon-checkin"></div> <span><?php echo esc_html__( 'Check-in', 'zume' ) ?></span></a>

            <?php $code = zume_current_language() ?>
            <?php $display_code = zume_get_language_display_code( $code ) ?>

            <a data-open="language-menu-reveal" role="listitem" href="#" class="link-light nav__link">
                <?php require plugin_dir_path( __DIR__ ) . 'assets/images/globe-outline.svg' ?>
                <span><?php echo esc_html( strtoupper( $display_code ) ) ?></span>
            </a>

        </div>
    </nav>