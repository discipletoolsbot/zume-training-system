<?php

function zume_language_codes() {
    global $zume_languages;
    $codes = array();
    foreach ( $zume_languages as $lang ) {
        $codes[] = $lang['code'];
    }
    return $codes;
}



