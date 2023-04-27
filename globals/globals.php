<?php

if ( ! function_exists( 'zume_mirror_url') ) {
    function zume_mirror_url(){
        return 'https://storage.googleapis.com/zume-file-mirror/';
    }
}
if ( ! function_exists( 'zume_landing_page_post_id') ) {
    function zume_landing_page_post_id(int $number): int
    {
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
            27 => 19848, // 3-month plan
            28 => 20759, // coaching checklist
            29 => 20760, // leadership in networks
            30 => 20761, // peer mentoring groups
            31 => 20762, // four fields tool
            32 => 20763, // generation mapping
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
            19848 => 27, // 3-month plan
            20759 => 28, // coaching checklist
            20760 => 29, // leadership in networks
            20761 => 30, // peer mentoring groups
            20762 => 31, // four fields tool
            20763 => 32, // generation mapping

        );

        return $list[$number] ?? 0;
    }
}
