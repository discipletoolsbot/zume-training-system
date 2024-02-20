<?php

/**
 * @deprecated
 */
function get_sessions( $sessions = '10' ) { // @todo remove and deprecated
    $ten_sessions = [
        array(
            't' => 'Session 1 (10)',
        ),
        array(
            't' => 'Session 2 (10)',
        ),
        array(
            't' => 'Session 3 (10)',
        ),
        array(
            't' => 'Session 4 (10)',
        ),
        array(
            't' => 'Session 5 (10)',
        ),
        array(
            't' => 'Session 6 (10)',
        ),
        array(
            't' => 'Session 7 (10)',
        ),
        array(
            't' => 'Session 8 (10)',
        ),
        array(
            't' => 'Session 9 (10)',
        ),
        array(
            't' => 'Session 10 (10)',
        ),
    ];

    $twenty_sessions = [
        array(
            't' => 'Session 1 (20)',
        ),
        array(
            't' => 'Session 2 (20)',
        ),
        array(
            't' => 'Session 3 (20)',
        ),
        array(
            't' => 'Session 4 (20)',
        ),
        array(
            't' => 'Session 5 (20)',
        ),
        array(
            't' => 'Session 6 (20)',
        ),
        array(
            't' => 'Session 7 (20)',
        ),
        array(
            't' => 'Session 8 (20)',
        ),
        array(
            't' => 'Session 9 (20)',
        ),
        array(
            't' => 'Session 10 (20)',
        ),
        array(
            't' => 'Session 11 (20)',
        ),
        array(
            't' => 'Session 12 (20)',
        ),
        array(
            't' => 'Session 13 (20)',
        ),
        array(
            't' => 'Session 14 (20)',
        ),
        array(
            't' => 'Session 15 (20)',
        ),
        array(
            't' => 'Session 16 (20)',
        ),
        array(
            't' => 'Session 17 (20)',
        ),
        array(
            't' => 'Session 18 (20)',
        ),
        array(
            't' => 'Session 19 (20)',
        ),
        array(
            't' => 'Session 20 (20)',
        ),
    ];

    $intensive = [
        array(
            't' => 'Session 1 (intensive)',
        ),
        array(
            't' => 'Session 2 (intensive)',
        ),
        array(
            't' => 'Session 3 (intensive)',
        ),
    ];

    switch ( $sessions ) {
        case '10':
            return $ten_sessions;
        case '20':
            return $twenty_sessions;
        case 'intensive':
            return $intensive;
        default:
            return $ten_sessions;
    }
}
