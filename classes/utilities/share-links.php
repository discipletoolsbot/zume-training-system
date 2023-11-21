<?php

function share_links( $title, $url ) {

    ?>

  <div id="share" tabindex="-1" class="stack--2" v-scope="share({ url:'<?php echo esc_attr( $url ) ?>', title: '<?php echo esc_attr( $title ) ?>', shareFeedback: '<?php echo esc_attr__( 'Thanks!', 'zume' ) ?>', copyFeedback: '<?php echo esc_attr__( 'Link copied', 'zume' ) ?>' })">
    <div class="stack--2" hidden :hidden="!noOptionsAvailable()">
      <p><?php echo esc_html__( 'Copy this link and send it to your friends 🙂', 'zume' ) ?></p>
      <p class=""><code><?php echo esc_attr( $url ) ?></code></p>
    </div>
    <div :class="!noOptionsAvailable() ? 'cluster gap--1' : null" hidden :hidden="noOptionsAvailable()">
      <div class="position-relative" v-if="webShareSupported">
        <button class="btn" @click="share">
          <!-- Share icon -->
          <span><?php echo esc_html__( 'Share', 'zume' ) ?></span>
        </button>
        <p role="alert" aria-live="polite" id="shareFeedback" class="context-alert" data-state="empty" :data-state="shareFeedback.length ? null : 'empty'">{{ shareFeedback }}</p>
      </div>
      <div class="position-relative" v-if="clipboardSupported">
        <button class="btn" data-theme="ghost" @click="copyLink">
          <!-- Link icon -->
          <span><?php echo esc_html__( 'Copy link', 'zume' ) ?></span>
        </button>
        <p role="alert" aria-live="polite" id="copyFeedback" class="context-alert" data-state="empty" :data-state="copyFeedback.length ? null : 'empty'">{{ copyFeedback }}</p>
      </div>
    </div>
  </div>

    <?php
}

?>