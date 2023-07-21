<?php

trait Translateable {

    public function get_lang_code( &$url_parts ) {
        $codes = zume_language_codes();

        $lang_code = '';
        if ( in_array( $url_parts[0], $codes ) ) {
            $lang_code = $url_parts[0];
            array_shift( $url_parts );
        }

        $this->lang_code = $lang_code;

        return $lang_code;
    }

    public function set_locale( $lang_code ) {

        if ( $lang_code !== '' ) {
            $this->lang = get_zume_language_locale( $lang_code );
            add_filter('locale', function( $locale ) {
                return $this->lang;
            }, 100, 1);
        }

    }
}