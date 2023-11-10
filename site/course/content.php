<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Content {
    public static function get( ) {
        $content = [];

        self::session_1( $content );

        return $content;

    }

    public static function title( $content ) {
        return $content[0]['t'];
    }

    public static function session_1( &$content) {

        $content[] = [
            't' => __( 'Group Prayer (5min)', 'zume' ),
            'p' => __( 'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.', 'zume' ),
        ];

        $content[] = [
            't' => __( 'God Uses Ordinary People', 'zume' ),
            'p' => __( 'You\'ll see how God uses ordinary people doing simple things to make a big impact.', 'zume' ),
        ];

        return $content;
    }

}
