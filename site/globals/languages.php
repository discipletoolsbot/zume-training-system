<?php

function zume_training_languages( $code_list = false ) {
   $languages = json_decode( file_get_contents( __DIR__ . '/languages.json' ), true );
   if ( $code_list ) {
      $codes = [];
      foreach ( $languages as $language ) {
         $codes[] = $language['code'];
      }
      return $codes;
   } else {
        return $languages;
   }
}
