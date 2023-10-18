<footer class="footer">

    <div class="container stack-2 | position-relative">

        <div class="cluster | justify-content-between gapx-4 gapy-2 | footer-links">
            <div class="cluster gapx-4 gapy-2 | footer-links-list" role="list">
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_about_url() ) ?>"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_get_a_coach_url() ) ?>"><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></a>
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_how_to_follow_jesus() ) ?>"><?php echo esc_html__( 'How to Follow Jesus', 'zume' ) ?></a>
            </div>

            <div class="cluster gapx-4 gapy-2 justify-flex-end | footer-links-list" role="list">
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_guidebook_url() ) ?>"><?php echo esc_html__( 'Guidebook', 'zume' ) ?></a>
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_mobile_app_url() ) ?>"><?php echo esc_html__( 'Mobile App', 'zume' ) ?></a>
                <a role="listitem" class="link-light" href="https://give.zume.vision/" target="_blank"><?php echo esc_html__( 'Donate', 'zume' ) ?></a>
            </div>
        </div>

        <div class="absolute top bottom center w-3rem m-0 show-for-large">

            <?php //phpcs:ignore ?>
            <?php echo file_get_contents( plugin_dir_path( __DIR__ ) . '/assets/images/Zume-Z-crop.svg' ) ?>

        </div>

        <div class="cluster container | justify-content-between">
            <span>&copy; 2023 Zume. All rights reserved.</span>
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
    <button class="close-button" data-close aria-label="<?php esc_html_e( 'Close', 'zume-training' ); ?>" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="reveal large" id="modal-large" data-v-offset="0" data-reveal>
    <h3 id="modal-large-title"></h3>
    <div id="modal-large-content"></div>
    <button class="close-button" data-close aria-label="<?php esc_html_e( 'Close', 'zume-training' ); ?>" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="reveal small" id="modal-small" data-v-offset="0" data-reveal>
    <h3 id="modal-small-title"></h3>
    <div id="modal-small-content"></div>
    <button class="close-button" data-close aria-label="<?php esc_html_e( 'Close', 'zume-training' ); ?>" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
