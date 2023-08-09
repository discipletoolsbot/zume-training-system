<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Magic_Page extends DT_Magic_Url_Base {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Prints scripts or data before the closing body tag on the front end.
     *
     */
    public function action_wp_footer() : void {
        require trailingslashit( plugin_dir_path( __DIR__ ) ) . 'parts/footer.php';
    }
}
