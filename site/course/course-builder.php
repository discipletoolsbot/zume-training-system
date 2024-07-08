<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Course_Builder {
    /**
     * Build session content
     *
     * @param string $session_type
     * @param string $lang_code
     * @param string $session_number
     * @return array
     */
    public static function builder( $session_type = '10', $lang_code = 'en', $session_number = '0' ) {
        if ( empty( $session_number ) ) { // if 0, return all sessions
            $sessions = [];
            $n = 0;

            if ( $session_type === '10' ) {
                $n = 10;
            } else if ( $session_type === '20' ) {
                $n = 20;
            } else if ( $session_type === 'intensive' ) {
                $n = 5;
            }

            for ( $i=1; $i < $n + 1; $i++ ) {
                $sessions[] = self::_build( $session_type, $lang_code, "$i" );
            }

            return $sessions;
        }
        else {
            return self::_build( $session_type, $lang_code, $session_number );
        }
    }
    /**
     * Build menu array
     *
     * @param string $session_type
     * @param string $lang_code
     * @return array
     */
    public static function menu( $session_type, $lang_code ) {
        $menu = [];

        $content = self::builder( $session_type, $lang_code );
        foreach ( $content as $slides ) {
            $key = $slides[0]['key'];
            $menu[$key] = [
                'title' => $slides[0]['menu'][0],
                'key' => $key,
                'submenu' => [],
            ];
            foreach ( $slides as $slide ) {
                if ( empty( $slide['menu'] ) || 'title' == $slide['type'] ) {
                    continue;
                }
                $menu[$key]['submenu'][] = [
                    'key' => $slide['key'],
                    'title' => $slide['menu'][0],
                    'length' => self::_slide_length( $slide['menu'][1] ?? [], $session_type ),
                ];
            }
        }
        return $menu;
    }
    public static function pieces( $session_type, $lang_code ) {
        $pieces = [];

        $content = self::builder( $session_type, $lang_code );

        foreach ( $content as $slides ) {
            $key = $slides[0]['key'];
            $pieces[$key] = [
                'title' => $slides[0]['menu'][0],
                'key' => $key,
                'pieces' => [],
            ];
            foreach ( $slides as $slide ) {
                if ( $slide['type'] !== 'video' ) {
                    continue;
                }

                /* Get the video script id, and get the slug from training_items list by script id */
                $script_id = $slide['script_id'];
                $training_items = zume_training_items_by_script();
                $training_item = $training_items[$script_id];
                $pieces[$key]['pieces'][] = [
                    'title' => $training_item['title'],
                    'slug' => $training_item['slug'],
                    'slide_key' => str_replace( 'b', 'a', $slide['key'] ),
                ];
            }
        }

        return $pieces;
    }
    private static function _build( $session_type = '10', $lang_code = 'en', $session_number = '1' ) {

        $content = zume_content( $lang_code );
        $session = self::_session_keys( $session_type, $session_number );

        // setup slides
        $slides = [];
        foreach ( $session as $item ) {
            if ( ! $item ) {
                continue;
            }
            $slides[$item] = [];
        }

        // populate slides
        foreach ( $content as $item ) {
            if ( in_array( $item['key'], $session ) ) {
                $slides[$item['key']] = $item;
                $slides[$item['key']]['progress_bar'] = ( empty( $session_number ) ) ? [] : $session;

                // transform length to string
                $slides[$item['key']]['length'] = self::_slide_length( $item['length'], $session_type );
            }
        }

        $ordered_slides = [];
        foreach ( $slides as $slide ) {
            $ordered_slides[] = $slide;
        }

        return $ordered_slides;
    }

    private static function _session_keys( $session_type, $session_number ) {
        $session = [];

        if ( '10' === $session_type ) {

            $session['1'] = ['s1_1_1', 's1_1_2', 's1_1_3', 's1_1_4', false, 't1_a', 't1_b', 't1_c', false, 't2_a', 't2_b', 't2_c', false, 't3_a', 't3_b', 't3_c', false, 't4_a', 't4_b', 't4_c', false, 't5_a', 't5_b', 't5_c', false, 's1_1_20', 's1_1_21', 'final']; // session 1
            $session['2'] = ['s1_2_1', 's1_2_2', 's1_2_3', 's1_2_4', 's1_2_5', false, 't6_a', 't6_b', 't6_c', false, 't7_a', 't7_b', 't7_c', 't7_d', false, 't8_a', 't8_b', 't8_c', false, 's1_2_6', 's1_2_7', 'final']; // session 2
            $session['3'] = ['s1_3_1', 's1_3_2', 's1_3_3', 's1_3_4', 's1_3_5', false, 't9_a', 't9_b', 't9_c', false, 't10_a', 't10_b', 't10_c', 't10_d', 't10_e', false, 's1_3_8', false, 't11_a', 't11_b', 't11_c', 't11_d', false, 's1_3_10', 's1_3_11', 's1_3_12', 'final']; // sesssion 3
            $session['4'] = ['s1_4_1', 's1_4_2', 's1_4_3', 's1_4_4', 's1_4_5', false, 't12_a', 't12_b', 't12_c', false, 't13_a', 't13_b', 't13_c', false, 't14_a', 't14_b', 't14_c', false, 't15_a', 't15_b', 't15_c', false, 't16_a', 't16_b', 't16_c', false, 's1_4_6', 's1_4_7', 'final']; // session 4
            $session['5'] = ['s1_5_1', 's1_5_2', 's1_5_3', 's1_5_4', 's1_5_5', false, 't17_a', 't17_b', false, 't18_a', 't18_b', 't18_c', false, 't19_a', false, 't17_d', 't17_e', 'final']; // session 5
            $session['6'] = ['s1_6_1', 's1_6_2', 's1_6_3', 's1_6_4', 's1_6_5', false, 't20_a', 't20_b', 't20_c',false, 't21_a', 't21_b', 't21_c', false, 's1_6_6', 's1_6_7', 'final']; // session 6
            $session['7'] = ['s1_7_1', 's1_7_2', 's1_7_3', 's1_7_4', 's1_7_5', false, 't22_a', 't22_b', 't22_c', false, 's1_7_6', 's1_7_7', 's1_7_8', 's1_7_9', 'final']; // session 7
            $session['8'] = ['s1_8_1', 's1_8_2', 's1_8_3', 's1_8_4', 's1_8_5', false, 't23_a', 't23_b', 't23_c', false, 's1_8_6', 's1_8_7', 's1_8_8', 'final']; // session 8
            $session['9'] = ['s1_9_1', 's1_9_2', 's1_9_3', 's1_9_4', 's1_9_5', false, 't24_a', 't24_b', 't24_c', false, 't25_a', 't25_b', 't25_c', false, 't26_a', 't26_b', 't26_c', false, 't28_a', 't28_b', 't28_c', 't28_d', 't28_e', false, 't31_a', 't31_b', 't31_c','t31_d', 't31_e', false, 't32_a', 't32_b', 't32_c', false, 's1_9_9', 's1_9_10', 'final']; // session 9
            $session['10'] = ['s1_10_1', 's1_10_2', 's1_10_3', 's1_10_4', 's1_10_5', false, 's1_10_6', false, 't29_a', 't29_b', 't29_c', false, 't30_a', 't30_b', 't30_c', false, 't27_a', 't27_b', 't27_c', false, 's1_10_7', false, 'next_steps', 'congratulations', 'final']; // session 10

        }
        else if ( '20' === $session_type ) {

            $session['1'] = ['s2_1_1', 's2_1_2', 's2_1_3', 's2_1_4', false, 't1_a', 't1_b', 't1_c', false, 't2_a', 't2_b', 't2_c', false, 't3_a', 't3_b', 't3_c', false, 's2_1_5', 's2_1_6', 'final']; // session 1
            $session['2'] = ['s2_2_1', 's2_2_2', 's2_2_3', 's2_2_4', 's2_2_5', false, 't4_a', 't4_b', 't4_c', false, 's2_2_6', 's2_2_7', 'final']; // session 2
            $session['3'] = ['s2_3_1', 's2_3_2', 's2_3_3', 's2_3_4', 's2_3_5', false, 't5_a', 't5_b', 't5_c', false, 's2_3_6', 's2_3_7', 'final'];  // session 3
            $session['4'] = ['s2_4_1', 's2_4_2', 's2_4_3', 's2_4_4', 's2_4_5', false, 't6_a', 't6_b', 't6_c', false, 't8_a', 't8_b', 't8_c', false, 's2_4_6', 's2_4_7','final']; // session 4
            $session['5'] = ['s2_5_1', 's2_5_2', 's2_5_3', 's2_5_4','s2_5_5', false, 't7_a', 't7_b', 't7_cc', 't7_d', false, 's2_5_6', 's2_5_7', 'final']; // session 5
            $session['6'] = ['s2_6_1', 's2_6_2','s2_6_3', 's2_6_4', 's2_6_5', false, 't9_a', 't9_b', 't9_c', false, 't13_a', 't13_b', 't13_c', false, 't10_a', 't10_b', 't10_c', 't10_d', 't10_e', false, 's2_6_6', 's2_6_7', 'final']; // session 6
            $session['7'] = ['s2_7_1','s2_7_2', 's2_7_3', 's2_7_4', 's2_7_5', false, 's2_7_6', 's2_7_7', 's2_7_8', 'final']; // session 7
            $session['8'] = ['s2_8_1', 's2_8_2', 's2_8_3', 's2_8_4', 's2_8_5', false, 't11_a', 't11_b', 't11_c', 't11_d', false, 't12_a', 't12_b', 't12_c', false, 's2_8_6', 's2_8_7', 'final']; // session 8
            $session['9'] = ['s2_9_1', 's2_9_2', 's2_9_3', 's2_9_4', 's2_9_5', false, 's2_9_6', 's2_9_7', 's2_9_8', 's2_9_9', 'final'];    // session 9
            $session['10'] = ['s2_10_1', 's2_10_2', 's2_10_3','s2_10_4', 's2_10_5', false, 't14_a', 't14_b', 't14_c', false, 't15_a', 't15_b', 't15_c', false, 't16_a', 't16_b', 't16_c', false, 's2_10_6', 's2_10_7', 'final']; // session 10
            $session['11'] = ['s2_11_1', 's2_11_2', 's2_11_3', 's2_11_4', 's2_11_5', false, 't17_a', 't17_b', false,'t17_d', 't17_e', 'final']; // session 11
            $session['12'] = ['s2_12_1', 's2_12_2', 's2_12_3', 's2_12_4', 's2_12_5', false, 't18_a', 't18_b', 't18_c', false, 't19_a', false, 's2_12_6', 's2_12_7', 'final']; // session 12
            $session['13'] = ['s2_13_1', 's2_13_2', 's2_13_3', 's2_13_4', 's2_13_5', false, 't20_a', 't20_b', 't20_c', false, 't21_aa', 't21_b', 't21_cc', false, 's2_13_6', 's2_13_7', 'final'];     // session 13
            $session['14'] = ['s2_14_1','s2_14_2', 's2_14_3', 's2_14_4', 's2_14_5', false, 's2_14_6', 's2_14_7', 's2_14_8', 'final']; // session 14
            $session['15'] = ['s2_15_1', 's2_15_2', 's2_15_3', 's2_15_4', 's2_15_5', false, 't22_a','t22_b', 't22_c', false, 't23_a', 't23_b', 't23_c', false, 's2_15_6', 's2_15_7', 'final']; // session 15
            $session['16'] = ['s2_16_1', 's2_16_2','s2_16_3', 's2_16_4', 's2_16_5', false, 't24_a', 't24_b', 't24_c', false, 't25_a', 't25_b', 't25_c', false, 't26_a', 't26_b', 't26_c', false, 's2_16_6', 's2_16_7', 'final'];   // session 16
            $session['17'] = ['s2_17_1', 's2_17_2', 's2_17_3', 's2_17_4', 's2_17_5', false, 't29_a','t29_b', 't29_c', false, 't28_a', 't28_b', 't28_c', 't28_d', 't28_e', false, 's2_17_6', 's2_17_7', 'final']; // session 17
            $session['18'] = ['s2_18_1', 's2_18_2', 's2_18_3', 's2_18_4', 's2_18_5', false, 't31_a', 't31_b', 't31_c', 't31_d', 't31_e',false, 's2_18_6', false, 't32_a', 't32_b', 't32_c', false, 's2_18_7', 's2_18_8', 'final']; // session 18
            $session['19'] = ['s2_19_1', 's2_19_2', 's2_19_3', 's2_19_4', 's2_19_5', false, 't30_a', 't30_b', 't30_c', false, 's2_19_6', 's2_19_7', 'final']; // session 19
            $session['20'] = ['s2_20_1', 's2_20_2', 's2_20_3', 's2_20_4', 's2_20_5', 's2_20_6', false, 't27_a', 't27_b', 't27_c',false, 'next_steps', 'congratulations', 'final']; // session 20

        } else if ( 'intensive' === $session_type ) {

            $session['1'] = ['s3_1_1', 's3_1_2', 's1_1_3', 's1_1_4', false, 't1_a', 't1_b', 't1_c', false, 't2_a', 't2_b', 't2_c', false, 't3_a', 't3_b', 't3_c', false, 't4_a', 't4_b', 't4_c', false, 't5_a', 't5_b', 't5_c', false, 's1_1_20', false, 'break', false,  // session 1
                's1_2_5', false, 't6_a', 't6_b', 't6_c', false, 't7_a', 't7_b', 't7_c', 't7_d', false, 't8_a', 't8_b', 't8_c', false, 's1_2_6','final']; // session 2
            $session['2'] = ['s3_2_1', 's3_2_2', 's1_3_3', 's1_3_5', false, 't9_a', 't9_b', 't9_c', false, 't10_a', 't10_b', 't10_c', 't10_d', 't10_e', false, 's1_3_8', false, 't11_a', 't11_b', 't11_c', 't11_d', false, 's1_3_10', 's1_3_12', false, 'break',false,  // session 3
                's1_4_5', false, 't12_a', 't12_b', 't12_c', false, 't13_a', 't13_b', 't13_c', false, 't14_a', 't14_b', 't14_c',false, 't15_a', 't15_b', 't15_c', false, 't16_a', 't16_b', 't16_c', false, 's1_4_6', 'final']; // session 4
            $session['3'] = ['s3_3_1','s3_3_2', 's1_5_3', 's1_5_5', false, 't17_a','t17_b', false, 't18_a', 't18_b', 't18_c', false, 't19_a', false, 't17_d', 't17_e', false, 'break', false, // session 5
                's1_6_5', false, 't20_a', 't20_b', 't20_c', false, 't21_a', 't21_b', 't21_c',false, 's1_6_6', 's1_6_7', 'final']; // session 6
            $session['4'] = ['s3_4_1', 's3_4_2', 's1_7_3', 's1_7_5', false, 't22_a', 't22_b', 't22_c', false, 's1_7_6', 's1_7_7', 's1_7_8', false, 'break', false,  // session 7
                's1_8_5', false, 't23_a', 't23_b', 't23_c', false, 's1_8_6','s1_8_7', 'final']; // session 8
            $session['5'] = ['s3_5_1', 's3_5_2', 's1_9_3', 's1_9_4', 's1_9_5', false, 't24_a', 't24_b', 't24_c', false,'t25_a', 't25_b', 't25_c', false, 't26_a', 't26_b', 't26_c', false, 't28_a', 't28_b', 't28_c', 't28_d', 't28_e',false, 't31_a', 't31_b', 't31_c', 't31_d', 't31_e', false, 't32_a', 't32_b', 't32_c', false, 's1_9_9','s1_9_10',  // session 9
                's1_10_5', false, 's1_10_6', false,'t29_a', 't29_b', 't29_c', false, 't30_a', 't30_b', 't30_c', false, 't27_a', 't27_b', 't27_c', false, 'next_steps', 'congratulations', 'final']; // session 10

        }

        return $session[$session_number];
    }

    private static function _slide_length( $length, $session_type ) {
        if ( empty( $length ) ) {
            return '';
        }

        $template = [
            1 => __( '(1 min)', 'zume' ),
            5 => __( '(5 min)', 'zume' ),
            10 => __( '(10 min)', 'zume' ),
            15 => __( '(15 min)', 'zume' ),
            20 => __( '(20 min)', 'zume' ),
            25 => __( '(25 min)', 'zume' ),
            30 => __( '(30 min)', 'zume' ),
            35 => __( '(35 min)', 'zume' ),
            40 => __( '(40 min)', 'zume' ),
            45 => __( '(45 min)', 'zume' ),
            50 => __( '(50 min)', 'zume' ),
            55 => __( '(55 min)', 'zume' ),
            60 => __( '(60 min)', 'zume' ),
            65 => __( '(65 min)', 'zume' ),
            70 => __( '(70 min)', 'zume' ),
            75 => __( '(75 min)', 'zume' ),
            80 => __( '(80 min)', 'zume' ),
            85 => __( '(85 min)', 'zume' ),
            90 => __( '(90 min)', 'zume' ),
            6090 => __( '(60 - 90 min)', 'zume' ),
        ];

        if ( isset( $length[2] ) && 'intensive' == $session_type ) {
            $length_string = $template[ $length[2] ] ?? '';
        }
        else if ( isset( $length[1] ) && '20' == $session_type  ) {
            $length_string = $template[$length[1]] ?? '';
        }
        else {
            $length_string = $template[$length[0]] ?? '';
        }

        return $length_string;
    }

}


/*
* // Notes on bundles of slides
$tools = array(
   1 => ['t1_a','t1_b','t1_c'],                // God uses ordinary people
   2 => ['t2_a','t2_b','t2_c'],                // teach them to obey
   3 => ['t3_a','t3_b','t3_c'],                // spiritual breathing
   4 => ['t4_a','t4_b','t4_c'],                // soaps bible reading
   5 => ['t5_a','t5_b','t5_c'],                // accountability groups
   6 => ['t6_a','t6_b','t6_c'],                // producer not consumer
   7 => ['t7_a','t7_b','t7_c','t7_d'],         // prayer cycle
   8 => ['t8_a','t8_b','t8_c'],                // list of 100
   9 => ['t9_a','t9_b','t9_c'],                // spiritual economy
   10 => ['t10_a','t10_b','t10_c','t10_d','t10_e'], // the gospel
   11 => ['t11_a','t11_b','t11_c','t11_d'],    // baptism
   12 => ['t12_a','t12_b','t12_c'],            // 3-minute testimony
   13 => ['t13_a','t13_b','t13_c'],            // greatest blessing
   14 => ['t14_a','t14_b','t14_c'],            // duckling discipleship
   15 => ['t15_a','t15_b','t15_c'],            // seeing where God's kingdom isn't
   16 => ['t16_a','t16_b','t16_c'],            // the lord's supper
   17 => ['t17_a','t17_b','t17_c',false,'t17_d','t17_e'], // prayer walking
   18 => ['t18_a','t18_b','t18_c'],            // person of peace
   19 => ['t19_a'],                            // bless prayer
   20 => ['t20_a','t20_b','t20_c'],            // faithfulness
   21 => ['t21_a','t21_b','t21_c'],            // 3/3 group pattern
   22 => ['t22_a','t22_b','t22_c'],            // training cycle
   23 => ['t23_a','t23_b','t23_c'],            // leadership cells
   24 => ['t24_a','t24_b','t24_c'],            // non-sequential
   25 => ['t25_a','t25_b','t25_c'],            // pace
   26 => ['t26_a','t26_b','t26_c'],            // part of two churches
   27 => ['t27_a','t27_b','t27_c'],            // 3-month plan
   28 => ['t28_a','t28_b','t28_c','t28_d'],    // coaching checklist
   29 => ['t29_a','t29_b','t29_c'],            // leadership in networks
   30 => ['t30_a','t30_b','t30_c'],            // peer mentoring groups
   31 => ['t31_a','t31_b','t31_c','t31_d','t31_e'],  // four fields tool
   32 => ['t32_a','t32_b'],                    // generation mapping
);
*/
