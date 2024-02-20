<?php

trait Translateable {

    private $lang_code;
    private $url_parts;

    public function initialize_language() {
        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang_code = $lang_code;
        $this->url_parts = $url_parts;

        return [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ];
    }

    public function slug_matches( $type ) {
        $page_slug = $this->url_parts[0] ?? '';

        return $type === substr( $page_slug, 0, strlen( $type ) );
    }

    /**
     * Sets the locale based on the lang_code in the url
     *
     * This sets the locale for translation throughout the site
     */
    public function set_locale( $lang_code = null ) {
        if ( !$lang_code ) {
            $lang_code = $this->lang_code;
        }

        $lang_code_from_cookie = zume_get_language_cookie();

        if ( empty( $lang_code_from_cookie ) ) {
            zume_set_language_cookie( $lang_code );
        }

        if ( $lang_code !== '' ) {
            $this->lang = zume_get_language_locale( $lang_code );
            add_filter('locale', function ( $locale ) {
                return $this->lang;
            }, 100, 1);
        }
    }
}
