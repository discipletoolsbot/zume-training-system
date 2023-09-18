<footer class="footer">

    <div class="container stack-2">

        <div class="cluster | justify-content-between">
            <div class="cluster s4" role="list">
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_about_url() ) ?>">About</a>
                <a role="listitem" class="link-light" href="<?php echo esc_url( zume_resources_url() ) ?>">Resources</a>
                <a role="listitem" class="link-light" href="/how-to-follow-jesus">How to follow Jesus</a>
            </div>

            <div class="cluster s4 justify-flex-end" role="list">
                <a role="listitem" class="link-light" href="/book">Zume Guidebook</a>
                <a role="listitem" class="link-light" href="/mobile-app">Zume Mobile App</a>
                <a role="listitem" class="link-light" href="/donate">Donate</a>
            </div>
        </div>

        <div class="cluster justify-content-between">
            <span>&copy; Zume. All rights reserved.</span>
            <div class="cluster | s1 justify-flex-end f-0" role="list">
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
