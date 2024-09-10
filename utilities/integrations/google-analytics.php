<?php

// @phpcs:disable
// disabled rule for including external scripts
add_action( 'dt_blank_footer', function () {
    ?>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-591815806">
    </script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-591815806');
    </script>
    <?php
}, 999 );
// @phpcs:enable
