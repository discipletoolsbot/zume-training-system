<?php
/**
 * @see https://polylang.wordpress.com/documentation/documentation-for-developers/functions-reference/
 * Wrap all polylang integration function in a if function exists test, so if the plugin is turned off or upgraded
 * the site doesn't error out.
 * use: function_exists('pll_the_languages' )
 */



/**
 * Tests if polylang plugin is installed.
 * Must check for plugin existence, because when the polylang plugin is updated, it will be deleted and reinstalled, which
 * could create an error on update if dependent functions are not protected.
 * @return bool
 */
function zume_has_polylang() {
    if ( function_exists( 'pll_the_languages' ) ) {
        return true;
    } else {
        return false;
    }
}

function zume_the_languages( $args = array() ) {
    if ( function_exists( 'pll_the_languages' ) ) {
        return pll_the_languages( $args );
    }
    else {
        return new WP_Error( 'Polylang_missing', 'Polylang plugin missing' );
    }
}



function zume_default_language() {
    if ( function_exists( 'pll_the_languages' ) ) {
        return pll_default_language();
    }
    else {
        return new WP_Error( 'Polylang_missing', 'Polylang plugin missing' );
    }
}



function zume_get_translation( $post_id, $slug = 'en' ) {
}

/**
 * @param string $page_title
 * @param string $lang_code
 *
 * @return string|\WP_Error
 */
function zume_get_posts_translation_url( $page_title, $lang_code = 'en' ) {
    $post_id = zume_core_posts( $page_title );
    $list = zume_language_relationships( $post_id );

    if ( empty( $lang_code ) ) {
        $lang_code = 'en';
    }

    $trans_id = $list[$lang_code] ?? $post_id;

    $trans_object = get_post( $trans_id, OBJECT );
    if ( $lang_code === 'en' ) {
        return site_url( '/' )  . $trans_object->post_name . '/';
    }

    return site_url( '/' ) . $lang_code . '/' . $trans_object->post_name . '/';
}

function zume_core_posts( $page_title ) {
    $ids = [
        'Dashboard' => 26,
        'Overview' => 644,
        'About' => 664,
        'Resources' => 845,
        'Profile' => 19684,
        'FAQ' => 19708,
        'Course' => 19720,
        'Vision' => 19811,
        'Three-Month Plan' => 19848,
        'Home' => 19850,
        'Login' => 20131,
        'Privacy Policy' => 20203,
        'One Page Course' => 20386,
        'Translation Progress' => 20716,
        'Training' => 20729,
    ];
    $lc = strtolower( $page_title );
    return $ids[$page_title] ?? $ids[$lc] ?? 0;
}
function zume_language_relationships( $post_id ) {
    global $wpdb, $table_prefix;
    $list = $wpdb->get_var( $wpdb->prepare(
        "
			SELECT description
			FROM zume_term_taxonomy tr
            WHERE tr.description LIKE %s AND tr.taxonomy = 'post_translations';
		",
        '%' . $wpdb->esc_like( $post_id ) . '%'
    ) );
    return maybe_unserialize( $list );
}
function zume_get_post_by_slug( $post_slug, $post_type = 'zume_page' ) {
    global $wpdb, $table_prefix;

    $post = $wpdb->get_row( $wpdb->prepare(
        ' SELECT * FROM zume_posts
            WHERE post_name = %s
            AND post_type = %s
        ',
        $post_slug,
        $post_type,
    ) );

    return $post;
}
if ( !function_exists( 'zume_english_pieces' ) ) {
    function zume_english_pieces() {
        return [
            1 => 20730, // God uses ordinary people
            2 => 20731, // teach them to obey
            3 => 20732, // spiritual breathing
            4 => 20733, // soaps bible reading
            5 => 20735, // accountability groups
            6 => 20737, // consumers vs producers
            7 => 20738, // prayer cycle
            8 => 20739, // list of 100
            9 => 20740, // kingdom economy
            10 => 20741, // the gospel
            11 => 20742, // baptism
            12 => 20743, // 3-minute testimony
            13 => 20744, // greatest blessing
            14 => 20745, // duckling discipleship
            15 => 20746, // seeing where God's kingdom isn't
            16 => 20747, // the lord's supper
            17 => 20748, // prayer walking
            18 => 20750, // person of peace
            19 => 20749, // bless prayer
            20 => 20751, // faithfulness
            21 => 20752, // 3/3 group pattern
            22 => 20753, // training cycle
            23 => 20755, // leadership cells
            24 => 20756, // non-sequential
            25 => 20757, // pace
            26 => 20758, // part of two churches
            27 => 19848, // post training plan
            28 => 20759, // coaching checklist
            29 => 20760, // leadership in networks
            30 => 20761, // peer mentoring groups
            31 => 20762, // four fields tool
            32 => 20763, // generation mapping
            69 => 23797, // 3-circles
        ];
    }
}
if ( !function_exists( 'zume_landing_page_post_id' ) ) {
    function zume_landing_page_post_id( int $number ): int {
        /**
         * These are the root post ids for the english page, which is used to find the translation page in the
         * polylang system.
         */
        $list = array(
            1 => 20730, // God uses ordinary people
            2 => 20731, // teach them to obey
            3 => 20732, // spiritual breathing
            4 => 20733, // soaps bible reading
            5 => 20735, // accountability groups
            6 => 20737, // consumers vs producers
            7 => 20738, // prayer cycle
            8 => 20739, // list of 100
            9 => 20740, // kingdom economy
            10 => 20741, // the gospel
            11 => 20742, // baptism
            12 => 20743, // 3-minute testimony
            13 => 20744, // greatest blessing
            14 => 20745, // duckling discipleship
            15 => 20746, // seeing where God's kingdom isn't
            16 => 20747, // the lord's supper
            17 => 20748, // prayer walking
            18 => 20750, // person of peace
            19 => 20749, // bless prayer
            20 => 20751, // faithfulness
            21 => 20752, // 3/3 group pattern
            22 => 20753, // training cycle
            23 => 20755, // leadership cells
            24 => 20756, // non-sequential
            25 => 20757, // pace
            26 => 20758, // part of two churches
            27 => 19848, // post training plan
            28 => 20759, // coaching checklist
            29 => 20760, // leadership in networks
            30 => 20761, // peer mentoring groups
            31 => 20762, // four fields tool
            32 => 20763, // generation mapping
            69 => 23797, // 3-circles
            20730 => 1, // God uses ordinary people
            20731 => 2, // teach them to obey
            20732 => 3, // spiritual breathing
            20733 => 4, // soaps bible reading
            20735 => 5, // accountability groups
            20737 => 6, // consumers vs producers
            20738 => 7, // prayer cycle
            20739 => 8, // list of 100
            20740 => 9, // kingdom economy
            20741 => 10, // the gospel
            20742 => 11, // baptism
            20743 => 12, // 3-minute testimony
            20744 => 13, // greatest blessing
            20745 => 14, // duckling discipleship
            20746 => 15, // seeing where God's kingdom isn't
            20747 => 16, // the lord's supper
            20748 => 17, // prayer walking
            20750 => 18, // person of peace
            20749 => 19, // bless prayer
            20751 => 20, // faithfulness
            20752 => 21, // 3/3 group pattern
            20753 => 22, // training cycle
            20755 => 23, // leadership cells
            20756 => 24, // non-sequential
            20757 => 25, // pace
            20758 => 26, // part of two churches
            19848 => 27, // post training plan
            20759 => 28, // coaching checklist
            20760 => 29, // leadership in networks
            20761 => 30, // peer mentoring groups
            20762 => 31, // four fields tool
            20763 => 32, // generation mapping
            23797 => 69, // 3-circles

        );

        return $list[$number] ?? 0;
    }
}
