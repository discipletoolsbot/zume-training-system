
        <!-- Download Slides -->
        <?php
        $ppt_10 = zume_download_url( 'ppt_10_session', $zume_current_language );
        $ppt_20 = zume_download_url( 'ppt_20_session', $zume_current_language );
        $ppt_intense = zume_download_url( 'ppt_intensive', $zume_current_language );
        $key_10 = zume_download_url( 'key_10_session', $zume_current_language );
        $key_20 = zume_download_url( 'key_20_session', $zume_current_language );
        $key_intense = zume_download_url( 'key_intensive', $zume_current_language );
        if ( ! ( empty( $ppt_10 ) && empty( $key_10 ) ) ) {
            ?>
            <hr>
            <div class="container-md stack-2 | py-1 w-70">
                <div class="switcher | gap-3">
                    <h2 class="brand h3 cluster align-items-center gap-1">
                        <img class="w-6rem" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/guys-reading.svg' ) ?>" alt="guys reading">
                        <?php echo esc_html__( 'Download Course Slides', 'zume' ) ?>
                    </h2>
                    <p>
                        <?php echo esc_html__( 'The entire Zúme course can be downloaded and run through Powerpoint or Keynote. This is a great solution for training in areas with weak internet. The videos are embedded in the slides and can be easily played without internet. The QR code system still requires online access for trainee checkins and activity resources.', 'zume' ) ?>
                    </p>
                </div>
            </div>
            <div class="container-md | py-1 w-70">
                <div class="switcher | gap-3 switcher-width-40">
                    <div class="stack-1 | grow-2 justify-content-center" data-fit-content>
                        <?php if ( $ppt_10 ) { ?>
                                <a class="btn" target="_blank" href="<?php echo esc_url( $ppt_10 ) ?>"><?php echo esc_html__( '10 Session Course', 'zume' ) ?> (PPT)</a>
                        <?php } ?>
                        <?php if ( $ppt_20 ) { ?>
                                <a class="btn" target="_blank" href="<?php echo esc_url( $ppt_20 ) ?>"><?php echo esc_html__( '20 Session Course', 'zume' ) ?> (PPT)</a>
                        <?php } ?>
                        <?php if ( $ppt_intense ) { ?>
                                <a class="btn" target="_blank" href="<?php echo esc_url( $ppt_intense ) ?>"><?php echo esc_html__( 'Intensive Course', 'zume' ) ?> (PPT)</a>
                        <?php } ?>
                    </div>
                    <div class="stack-1 | grow-2 justify-content-center" data-fit-content>
                        <?php if ( $key_10 ) { ?>
                                <a class="btn" target="_blank" href="<?php echo esc_url( $key_10 ) ?>"><?php echo esc_html__( '10 Session Course', 'zume' ) ?> (KEY)</a>
                        <?php } ?>
                        <?php if ( $key_20 ) { ?>
                                <a class="btn" target="_blank" href="<?php echo esc_url( $key_20 ) ?>"><?php echo esc_html__( '20 Session Course', 'zume' ) ?> (KEY)</a>
                        <?php } ?>
                        <?php if ( $key_intense ) { ?>
                                <a class="btn" target="_blank" href="<?php echo esc_url( $key_intense ) ?>"><?php echo esc_html__( 'Intensive Course', 'zume' ) ?> (KEY)</a>
                        <?php } ?>
                    </div>
                </div>
            </div>
        <?php } ?>
