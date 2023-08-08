<?php

trait Translateable {
    public function set_locale( $lang_code ) {
        if ( $lang_code !== '' ) {
            $this->lang = get_zume_language_locale( $lang_code );
            add_filter('locale', function( $locale ) {
                return $this->lang;
            }, 100, 1);
        }
    }
}