<footer class="footer">

    <div class="container stack-2 | position-relative">

        <div class="cluster | justify-content-between gapx-4 gapy-2 | footer-links">
            <div class="cluster gapx-4 gapy-2 | footer-links-list" role="list">

                <?php if ( is_user_logged_in() ) : ?>

                    <a role="listitem" class="link-light" href="<?php echo esc_url( zume_about_url() ) ?>"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                    <a role="listitem" class="link-light" href="<?php echo esc_url( zume_training_url() ) ?>"><?php echo esc_html__( 'Training', 'zume' ) ?></a>
                    <a role="listitem" class="link-light" href="<?php echo esc_url( zume_get_a_coach_url() ) ?>"><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></a>

                <?php else : ?>

                    <a role="listitem" class="link-light" href="<?php echo esc_url( zume_make_a_plan_wizard_url() ) ?>"><?php echo esc_html__( 'Register', 'zume' ) ?></a>
                    <a role="listitem" class="link-light" href="<?php echo esc_url( zume_how_to_follow_jesus() ) ?>"><?php echo esc_html__( 'How to Follow Jesus', 'zume' ) ?></a>
                    <a role="listitem" class="link-light" href="<?php echo esc_url( zume_get_a_coach_url() ) ?>"><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></a>

                <?php endif; ?>

            </div>

            <div class="cluster gapx-4 gapy-2 justify-flex-end | footer-links-list" role="list">
                <!-- <a role="listitem" class="link-light" href="#"><?php echo esc_html__( 'Launch Course', 'zume' ) ?></a> -->
                <launch-course
                    translations="<?php echo esc_attr( json_encode( [
                        'launch_course' => __( 'Launch Course', 'zume' ),
                        'ten_session_course' => __( '10 Session Course', 'zume' ),
                        'twenty_session_course' => __( '20 Session Course', 'zume' ),
                        'three_day_intensive_course' => __( '3 Day Intensive Course', 'zume' ),
                    ] ) ) ?>"
                    urls="<?php echo esc_attr( json_encode( [
                        'launch_ten_session_course' => zume_10_session_url(),
                        'launch_twenty_session_course' => zume_20_session_url(),
                        'launch_intensive_session_course' => zume_intensive_session_url(),
                    ] ) ) ?>"
                    position="top"
                    asLink
                ></launch-course>
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_guidebook_url() ) ?>"><?php echo esc_html__( 'Resources', 'zume' ) ?></a>
                <a role="listitem" class="link-light" href="https://give.zume.vision/" target="_blank"><?php echo esc_html__( 'Donate', 'zume' ) ?> <?php require plugin_dir_path( __DIR__ ) . 'assets/images/external-link.svg' ?></a>
            </div>
        </div>

        <div class="absolute top bottom center w-3rem m-0 show-for-large">

            <?php //phpcs:ignore ?>
            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/Zume-Z-crop.svg' ) ?>

        </div>

        <div class="cluster | justify-content-between gapx-4 gapy-2 | footer-links">
            <span class="copyright">&copy; 2023 Zume. All rights reserved.</span>
            <div class="cluster | s-1 justify-flex-end f-0" role="list">
                <a href="#" class="link-light" role="listitem">
                    <div class="icon"><?php require plugin_dir_path( __DIR__ ) . 'assets/images/facebook.svg' ?></div>
                </a>
                <a href="#" class="link-light" role="listitem">
                    <div class="icon"><?php require plugin_dir_path( __DIR__ ) . 'assets/images/instagram.svg' ?></div>
                </a>
            </div>
        </div>
    </div>

</footer>

<!-- General Use Modals-->
<div class="reveal full" id="modal-full" data-v-offset="0" data-reveal>
    <h3 id="modal-full-title"></h3>
    <div id="modal-full-content"></div>
    <button class="close-button" data-close aria-label="<?php esc_html_e( 'Close', 'zume' ); ?>" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="reveal large" id="modal-large" data-v-offset="0" data-reveal>
    <h3 id="modal-large-title"></h3>
    <div id="modal-large-content"></div>
    <button class="close-button" data-close aria-label="<?php esc_html_e( 'Close', 'zume' ); ?>" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="reveal small" id="modal-small" data-v-offset="0" data-reveal>
    <h3 id="modal-small-title"></h3>
    <div id="modal-small-content"></div>
    <button class="close-button" data-close aria-label="<?php esc_html_e( 'Close', 'zume' ); ?>" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
