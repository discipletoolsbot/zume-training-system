<?php

require_once('translator-magic-url.php');
if ( dt_is_rest() ) {
    require_once('translator-api.php');
}

if ( is_admin() ) {
    global $zume_translation_file_list;
    require_once('admin-page.php');
}
