<?php
if ( is_admin() ) {
    global $zume_translation_file_list;
    require_once('admin-page.php');
}
require_once('magic-translator.php');
