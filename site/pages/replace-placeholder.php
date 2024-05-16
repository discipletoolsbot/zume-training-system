<?php

/**
 * [smallbutton_getacoach] Small button with link to the Get a Coach form
 * [largebutton_getacoach]  Large button with link to the Get a Coach form
 *
 * []
 *
 *
 *
 */

function zume_replace_placeholder( $content, $language_code = NULL ) {
    if ( is_null( $language_code ) ) {
        // get current
        $language_code = 'en';
    }

    // user magic link
    if ( str_contains( $content, '[magiclink_') ) {
        if ( str_contains( $content, '[magiclink_annualreport]') ) {
            $magic_link = '<a class="" href="">Annual Report Link</a>';
            $content = str_replace( '[magiclink_annualreport]', $magic_link, $content );
        }
    }

    // static place holders
    $place_holders = [
        '[buttonsmall_getacoach]',
        '[buttonlarge_getacoach]',
        '[buttonsmall_joincommunity]',
        '[buttonlarge_joincommunity]',
        '[buttonsmall_dashboard]',
        '[buttonlarge_dashboard]',
        '[buttonsmall_onlinetraining]',
        '[buttonlarge_onlinetraining]',
        '[buttonsmall_checkin]',
        '[buttonlarge_checkin]',
        '[buttonsmall_10session]',      // button directly to the 10 session
        '[buttonsmall_20session]',      // button directly to the 20 session
        '[buttonsmall_downloadcourse]',
        '[link_10session]',             // link directly to the 10 session
        '[link_20session]',             // link directly to the 20 session
        '[link_downloadcourse]',        // link to download the powerpoint
        '[link_share]',                 // link to share page
    ];
    $replacement_string = [
        '<a class="button small" href="">Get a Coach</a>', //'[buttonsmall_getacoach]',
        '<a class="button large" href="">Get a Coach</a>', //'[buttonlarge_getacoach]',
        '<a class="button small" href="">Join the Zúme Community</a>', //'[buttonsmall_joincommunity]',
        '<a class="button large" href="">Join the Zúme Community</a>', //'[buttonlarge_joincommunity]',
        '<a class="button small" href="">Zúme Dashboard</a>', //'[buttonsmall_dashboard]',
        '<a class="button large" href="">Zúme Dashboard</a>', //'[buttonlarge_dashboard]',
        '<a class="button small" href="">Zúme Online Training Groups</a>', //'[buttonsmall_onlinetraining]',
        '<a class="button large" href="">Zúme Online Training Groups</a>', //'[buttonlarge_onlinetraining]',
        '<a class="button small" href="">Check-in for Training</a>', //'[buttonsmall_checkin]',
        '<a class="button large" href="">Check-in for Training</a>', //'[buttonlarge_checkin]',
        '<a class="button small" href="">10 Session Course</a>', //'[buttonsmall_10session]',
        '<a class="button small" href="">20 Session Course</a>', //'[buttonsmall_20session]',
        '<a class="button small" href="">Download Slide Presentation</a>', //'[buttonsmall_downloadcourse]',
        '<a class="" href="">10 Session Course</a>', //'[link_10session]',
        '<a class="" href="">20 Session Course</a>', //'[link_20session]',
        '<a class="" href="">Download Slide Presentation</a>', //'[link_downloadcourse]',
        '<a class="" href="">Share Zúme Page</a>', //'[link_share]',
    ];

    return str_replace( $place_holders, $replacement_string, $content );
}
