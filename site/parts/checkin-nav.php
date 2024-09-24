    <header class="header">
        <div class="d-flex justify-content-between px-1">
            <div class="d-flex gap-0">
                <button class="nav-toggle" aria-label="open navigation" data-toggle="siteOffCanvas">
                    <span class="hamburger"></span>
                </button>

                <h1 class="h5 f-medium mb0"><?php echo esc_html__( 'My Progress', 'zume' ) ?></h1>
            </div>

            <nav class="d-flex align-items-center gap-0">
                <div class="cluster | s--2 | nav nav__list" role="list">
                    <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>
                    <a role="listitem" href="<?php echo esc_url( zume_resources_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Resources', 'zume' ) ?></a>
                </div>
                <span class="nav__bar | bar bg-white"></span>
                <div class="d-flex align-items-center">

                    <?php $code = zume_current_language() ?>
                    <?php $display_code = zume_get_language_display_code( $code ) ?>

                    <button class="nav__link" data-open="language-menu-reveal" data-tool>
                        <?php require plugin_dir_path( __DIR__ ) . 'assets/images/globe-outline.svg' ?>
                        <span><?php echo esc_html( strtoupper( $display_code ) ) ?></span>
                    </button>
                </div>
            </nav>
        </div>
    </header>

    <?php require __DIR__ . '/mobile-nav.php' ?>

    <?php require __DIR__ . '/language-selector.php' ?>
