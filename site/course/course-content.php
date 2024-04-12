<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

function zume_content( $lang_code = 'en') {

//    if ( get_transient( __FUNCTION__.'_'.$lang_code ) ) {
//        return get_transient( __FUNCTION__.'_'.$lang_code );
//    }


    $mirror_url = 'https://storage.googleapis.com/zume-file-mirror/' . $lang_code . '/';
    $checkin_base_url = site_url() . '/' . $lang_code . '/checkin/?code=';
    $activity_base_url = trailingslashit( site_url() ) . 'zume_app/qr/?l=' . $lang_code . '&a=';
    $other_page_base_url = trailingslashit( site_url() ) . 'zume_app/qr/?l=' . $lang_code . '&o=';

    $content = [
        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 1
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_1_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 1', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 1', 'zume' ),  // title
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_1_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '5678',
                zume_create_qr_url( $checkin_base_url . '5678' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '5678'
            ],
        ],
        [
            'key' => 's1_1_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.', 'zume' )
            ],
        ],
        [
            'key' => 's1_1_4',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'God Uses Ordinary People', 'zume' ),
                    __( 'Simple Definition of Disciple & Church', 'zume' ),
                    __( 'Spiritual Breathing', 'zume' )
                ],
                __( 'And we will add these tools to our toolkit:', 'zume' ),
                [
                    __( 'SOAPS Bible Reading', 'zume' ),
                    __( 'Accountability Groups', 'zume' )
                ]
            ],
        ],
        [
            'key' => 't1_a',
            'type' => 'watch',
            'menu' => [
                __( 'God Uses Ordinary People', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'God Uses Ordinary People', 'zume' ),
                __( 'God uses ordinary people doing simple things to make a big impact.', 'zume' )
            ],
        ],
        [
            'key' => 't1_b',
            'type' => 'video',
            'script_id' => 34,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '1', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't1_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                __( 'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?', 'zume' )
            ],
        ],
        [
            'key' => 't2_a',
            'type' => 'watch',
            'menu' => [
                __( 'Disciples and the Church', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Disciples and the Church', 'zume' ),
                __( 'Discover the essence of being a disciple, making a disciple, and what is the church.', 'zume' ),
            ],
        ],
        [
            'key' => 't2_b',
            'type' => 'video',
            'script_id' => 35,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '2', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't2_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'When you think of a church, what comes to mind?', 'zume' ),
                    __( 'What’s the difference between that picture and what’s described in the video as a "Simple Church"?', 'zume' ),
                    __( 'Which one do you think would be easier to multiply and why?', 'zume' )
                ]
            ],
        ],
        [
            'key' => 't3_a',
            'type' => 'watch',
            'menu' => [
                __( 'Hearing and Obeying God', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Hearing and Obeying God', 'zume' ),
                __( 'Spiritual breathing. We breathe in. We breathe out. We’re alive. Hearing and obeying God is like that, too.', 'zume' )
            ],
        ],
        [
            'key' => 't3_b',
            'type' => 'video',
            'script_id' => 36,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '3', true, $lang_code), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't3_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Why is it essential to learn to hear and recognize God’s voice?', 'zume' ),
                    __( 'Is hearing and responding to the Lord really like breathing? Why or why not?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't4_a',
            'type' => 'watch',
            'menu' => [
                __( 'SOAPS Bible Reading', 'zume' ),
                [35]
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'SOAPS Bible Reading', 'zume' ),
                __( 'Hearing from God regularly is a key element in our personal relationship with Him, and in our ability to stay obediently engaged in what He is doing around us.', 'zume' ),
            ],
        ],
        [
            'key' => 't4_b',
            'type' => 'video',
            'script_id' => 37,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '4', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],

        ],
        [
            'key' => 't4_c',
            'type' => 'activity',
            'menu' => [
                __( 'Practice S.O.A.P.S.', 'zume' ),
                [30],
            ],
            'length' => [30],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
                '(30 min)',
            ],
            'left' => [
                __( 'Practice S.O.A.P.S.', 'zume' ),
                __( 'Scan QR code and work individually through the SOAPS Bible study pattern using Matthew 6:9-13. (20 min)', 'zume' ),
                [
                    __( 'Scripture', 'zume' ),
                    __( 'Observation', 'zume' ),
                    __( 'Application', 'zume' ),
                    __( 'Prayer', 'zume' ),
                    __( 'Sharing', 'zume' ),
                ],
                __( 'Return together and share your S.O.A.P.S. in groups of two or three. (10 min)', 'zume' )
            ],
            'right' => [
                $activity_base_url . 'soaps',
                zume_create_qr_url( $activity_base_url . 'soaps' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't5_a',
            'type' => 'watch',
            'menu' => [
                __( 'Accountability Groups', 'zume' ),
                [25],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Accountability Groups', 'zume' ),
                __( 'The Bible tells us that every follower of Jesus will one day be held accountable for what we do and say and think.', 'zume' ),
                __( 'Accountability Groups are a great way to get ready!', 'zume' ),
            ],
        ],
        [
            'key' => 't5_b',
            'type' => 'video',
            'script_id' => 38,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '5', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't5_c',
            'type' => 'activity',
            'menu' => [],
            'length' => [20],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Practice Accountability Groups', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume' ),
                    __( 'Break into groups of two or three people of the same gender.', 'zume' ),
                    __( 'Spend the next 20 minutes working together through the Accountability Questions.', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . 'accountability',
                zume_create_qr_url( $activity_base_url . 'accountability' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's1_1_20',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'God Uses Ordinary People', 'zume' ),
                    __( 'Simple Definition of Disciple & Church', 'zume' ),
                    __( 'Spiritual Breathing', 'zume' )
                ],
                __( 'Tools heard in this session:', 'zume' ),
                [
                    __( 'SOAPS Bible Reading', 'zume' ),
                    __( 'Accountability Groups', 'zume' )
                ]
            ],
        ],
        [
            'key' => 's1_1_21',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.', 'zume' ),
                __( 'Ask the Lord to guide you to challenge at least five people you know who are believers to begin their own S.O.A.P.S. Bible reading practice daily, and then do so.', 'zume' ),
            ],
        ],





        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 2
         *
         *
         *
         *
         **************************************************************************************************************/

        [
            'key' => 's1_2_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 2', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 2', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_2_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '2468',
                zume_create_qr_url( $checkin_base_url . '2468' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '2468'
            ],
        ],
        [
            'key' => 's1_2_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Ask if anyone in the group has specific needs they would like the group to pray for.', 'zume' ),
                __( 'Thank God that He promises in His Word to listen and act when His people pray.', 'zume' ),
                __( 'Ask God’s Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_2_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_2_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'Producer Not Consumer', 'zume' ),
                ],
                __( 'And we will add these tools to our toolkit:', 'zume' ),
                [
                    __( 'Prayer Cycle', 'zume' ),
                    __( 'List of 100', 'zume' )
                ]
            ],
        ],
        [
            'key' => 't6_a',
            'type' => 'watch',
            'menu' => [
                __( 'Producer Not Consumer', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Producer Not Consumer', 'zume' ),
                __( 'If we want to make disciples who multiply – spiritual producers and not just consumers – then we need to learn and share four main ways God makes everyday followers more like Jesus:', 'zume' ),
                [
                    __( 'Prayer', 'zume' ),
                    __( 'Scripture', 'zume' ),
                    __( 'Body Life', 'zume' ),
                    __( 'Persecution and Suffering', 'zume' )
                ]
            ],
        ],
        [
            'key' => 't6_b',
            'type' => 'video',
            'script_id' => 39,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '6', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't6_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Of the four areas detailed above (prayer, God’s Word, etc.), which ones do you already practice?', 'zume' ),
                    __( 'Which ones do you feel unsure about?', 'zume' ),
                    __( 'How ready do you feel when it comes to training others?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't7_a',
            'type' => 'watch',
            'menu' => [
                __( 'Prayer Cycle', 'zume' ),
                [75],
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' )
            ],
            'right' => [
                __( 'Prayer Cycle', 'zume' ),
                __( 'The Bible tells us that prayer is our chance to speak to and hear from the same God who created us!', 'zume' ),
            ],
        ],
        [
            'key' => 't7_b',
            'type' => 'video',
            'script_id' => 40,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '7', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't7_c',
            'type' => 'activity',
            'menu' => [],
            'length' => [60],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Pray the Prayer Cycle for an hour individually', 'zume' ),
                __( 'Scan the QR code to get the prayer cycle guide on your phone.', 'zume' ),
                __( 'Set a time for the group to return and reconnect. Be sure to add a few extra minutes for everyone to both find a quiet place to pray and to make their way back to the group.', 'zume' ),
            ],
            'right' => [
                $activity_base_url . 'prayercycle',
                zume_create_qr_url( $activity_base_url . 'prayercycle' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't7_d',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'What is your reaction to spending an hour in prayer?', 'zume' ),
                    __( 'How do you feel?', 'zume' ),
                    __( 'Did you learn or hear anything?', 'zume' ),
                    __( 'What would life be like if you made this kind of prayer a regular habit?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't8_a',
            'type' => 'watch',
            'menu' => [
                __( 'List of 100', 'zume' ),
                [35],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' )
            ],
            'right' => [
                __( 'List of 100', 'zume' ),
                __( 'God has already given us the relationships we need to "Go and make disciples."', 'zume' ),
                __( 'These are our family, friends, neighbors, co-workers and classmates – people we’ve known all our lives or maybe just met.', 'zume' ),
                __( 'Stewarding the relationships you have is the best place to start.', 'zume' ),
            ],
        ],
        [
            'key' => 't8_b',
            'type' => 'video',
            'script_id' => 41,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '8', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't8_c',
            'type' => 'activity',
            'menu' => [
                __( 'Create your own list of 100', 'zume' ),
            ],
            'length' => [30],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Create your own list of 100', 'zume' ),
                [
                    __( 'Scan QR code or use a piece of paper.', 'zume' ),
                    __( 'Have everyone in your group take the next 30 minutes to fill out their own list of relationships. List as many as you can.', 'zume' ),
                    __( 'Then mark your best understanding of their relationship to God: disciple, unbeliever, or unknown.', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . 'listof100',
                zume_create_qr_url( $activity_base_url . 'listof100' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's1_2_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Producer Not Consumer', 'zume' ),
                ],
                __( 'Tools heard in this session:', 'zume' ),
                [
                    __( 'Prayer Cycle', 'zume' ),
                    __( 'List of 100', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's1_2_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Obey', 'zume' ),
                __( 'Share', 'zume' ),
            ],
            'right' => [
                __( 'Spend time this week praying for five people from your List of 100 that you marked as an "Unbeliever" or "Unknown." Ask God to prepare their hearts to be open to His story.', 'zume' ),
                __( 'Ask God who He wants you to share the List of 100 tool with. Share this person’s name with the group before you go and reach out to them before the next session.', 'zume' ),
            ],
        ],
        [ // final slide
            'key' => 's1_2_18',
            'type' => 'final',
            'menu' => [],
            'length' => [],
            'center' => [
                $mirror_url . 'Zume-logo-blue.png', // Zume logo
                __( 'To saturate the world with multiplying disciples in our generation.', 'zume' ),
                $mirror_url . 'jesus-globe.png', // Jesus globe
                __( 'Zume is a community of practice for those who want to see disciple making movements.', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],








        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 3
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_3_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 3', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 3', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_3_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '6543',
                zume_create_qr_url( $checkin_base_url . '6543' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '6543'
            ],
        ],
        [
            'key' => 's1_3_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the ways you experienced Him in the last session and invite His Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_3_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' )
            ],
        ],
        [
            'key' => 's1_3_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'Spiritual Economy', 'zume' ),
                ],
                __( 'And we will add these tools to our toolkit:', 'zume' ),
                [
                    __( 'The Gospel', 'zume' ),
                    __( 'Baptism', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't9_a',
            'type' => 'watch',
            'menu' =>  [
                __( 'Spiritual Economy', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Spiritual Economy', 'zume' ),
                __( 'In this broken world, people feel rewarded when they take, when they receive and when they gain more than those around them. But God’s Spiritual Economy is different – God invests more in those who are faithful with what they’ve already been given.', 'zume' ),
            ],
        ],
        [
            'key' => 't9_b',
            'type' => 'video',
            'script_id' => 42,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '9', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't9_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                __( 'What are some differences you see between God’s Spiritual Economy and our earthly way of getting things done?', 'zume' ),
            ],
        ],
        [
            'key' => 't10_a',
            'type' => 'center',
            'menu' => [
                __( 'The Gospel', 'zume' ),
                [25],
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Jesus said, “You will receive power when the Holy Spirit comes upon you. And you will be my witnesses, telling people about me everywhere – in Jerusalem, throughout Judea, in Samaria, and to the ends of the earth.”', 'zume' ),
                __( 'There’s no one “best way” to tell God’s story (also called the gospel), because the best way will depend on who you’re sharing with. Every disciple should learn to tell God’s story in a way that’s true to scripture and connects with the audience they’re sharing with.', 'zume' ),
            ],
            'right' => [],
        ],
        [
            'key' => 't10_b',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'What comes to mind when you hear God’s command to be His "witness" and to tell His story?', 'zume' ),
                    __( 'Why do you think Jesus chose ordinary people instead of some other way to share His good news?', 'zume' ),
                    __( 'What would it take for you to feel more comfortable sharing God’s story?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't10_c',
            'type' => 'watch',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'The Gospel', 'zume' ),
                __( 'One way to share God’s good news is by telling God’s story from Creation to Judgement – from the beginning of humankind all the way to the end of this age.', 'zume' ),
            ],
        ],
        [
            'key' => 't10_d',
            'type' => 'video',
            'script_id' => 43,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '10', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't10_e',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'What do you learn about mankind from this story?', 'zume' ),
                    __( 'What do you learn about God?', 'zume' ),
                    __( 'Do you think it would be easier or harder to share God’s story by telling a story like this?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's1_3_8',
            'type' => 'activity',
            'menu' => [],
            'length' => [45],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Share the Gospel', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume' ),
                    __( 'Break into groups of two or three people.', 'zume' ),
                    __( 'Take turns telling the Gospel to each other.', 'zume' ),
                ],

            ],
            'right' => [
                $activity_base_url . 'sharegospel',
                zume_create_qr_url( $activity_base_url . 'sharegospel' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't11_a',
            'type' => 'watch',
            'menu' => [
                __( 'Baptism', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Baptism', 'zume' ),
                __( 'Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…”', 'zume' ),
            ],
        ],
        [
            'key' => 't11_b',
            'type' => 'video',
            'script_id' => 44,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '11', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't11_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Have you ever baptized someone?', 'zume' ),
                    __( 'Would you even consider it?', 'zume' ),
                    __( 'If the Great Commission is for every follower of Jesus, does that mean every follower is allowed to baptize others? Why or why not?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't11_d',
            'type' => 'center',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'IMPORTANT REMINDER – Have you been baptized?', 'zume' ),
                __( 'If not, then we encourage you to plan this before even one more session of this training. Invite your group to be a part of this important day when you celebrate saying "yes" to Jesus.', 'zume' ),
            ],
            'right' => [],
        ],

        [
            'key' => 's1_3_10',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'The Spiritual Economy', 'zume' ),
                ],
                __( 'Tools heard in this session:', 'zume' ),
                [
                    __( 'The Gospel', 'zume' ),
                    __( 'Baptism', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's1_3_11',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Ask God who He wants you to train to use the Creation to Judgment story (or some other way to share God’s story). Share this person’s name with the group before you go.', 'zume' ),
                __( 'Spend time this week practicing God’s story, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."', 'zume' ),
                __( 'IMPORTANT REMINDER – Your group will be celebrating the Lord’s Supper next session. Be sure to remember the supplies (bread and wine / juice).', 'zume' ), // bonus reminder
            ],
        ],
        [
            'key' => 's1_3_12',
            'type' => 'center',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'IMPORTANT REMINDER - Your group will be celebrating the Lord‘s Supper next session. Be sure to remember the supplies (bread and wine / juice).', 'zume' ),
            ],
            'right' => [],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 4
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_4_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 4', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 4', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_4_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '8764',
                zume_create_qr_url( $checkin_base_url . '8764' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '8764'
            ],
        ],
        [
            'key' => 's1_4_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God that He invites us to share His Good News with others.', 'zume' ),
                __( 'Ask Him to give each member of your group the mind of Christ — and to fill each one with His Spirit.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_4_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_4_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Vision Casting the Greatest Blessing', 'zume' ),
                    __( 'Duckling Discipleship', 'zume' ),
                    __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                ],
                __( 'And we will add these tools to our toolkit:', 'zume' ),
                [
                    __( 'Three-Minute Testimony', 'zume' ),
                    __( 'The Lord’s Supper', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 't12_a',
            'type' => 'watch',
            'menu' => [
                __( 'Three-Minute Testimony', 'zume' ),
                [35],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Three-Minute Testimony', 'zume' ),
                __( 'As followers of Jesus, we are “witnesses" for Him, because we “testify” about the impact Jesus has had on our lives. Your story of your relationship with God is called your Testimony. It’s powerful, and it’s something no one can share better than you.', 'zume' ),
            ],
        ],
        [
            'key' => 't12_b',
            'type' => 'video',
            'script_id' => 45,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '12', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't12_c',
            'type' => 'activity',
            'menu' => [],
            'length' => [30],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Practice sharing your testimony', 'zume' ),
                [
                    __('Scan QR code.', 'zume'),
                    __('Work on writing out your story and keeping it to only three minutes. (10 min)', 'zume'),
                    __('Break into groups of two to three and practice sharing. (20 min)', 'zume'),
                ]
            ],
            'right' => [
                $activity_base_url . 'sharetestimony',
                zume_create_qr_url( $activity_base_url . 'sharetestimony' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't13_a',
            'type' => 'watch',
            'menu' => [
                __( 'Great - Greater - Greatest Blessings', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Great - Greater - Greatest Blessings', 'zume' ),
                __( 'Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.', 'zume' ),
            ],
        ],
        [
            'key' => 't13_b',
            'type' => 'video',
            'script_id' => 46,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '13', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't13_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Is this the pattern you were taught when you first began to follow Jesus? If not, what was different?', 'zume' ),
                    __( 'After you came to faith, how long was it before you began to disciple others?', 'zume' ),
                    __( 'What do you think would happen if new followers started sharing and discipling others, immediately?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't14_a',
            'type' => 'watch',
            'menu' => [
                __( 'Duckling Discipleship', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Duckling Discipleship', 'zume' ),
                __( 'What do ducklings have to do with disciple making? They lead and follow at the same time.', 'zume' ),
            ],
        ],
        [
            'key' => 't14_b',
            'type' => 'video',
            'script_id' => 47,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '14', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't14_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'What is one area of discipleship (reading/understanding the Bible, praying, sharing God’s story, etc.) that you want to learn more about? Who is someone that could help you learn?', 'zume' ),
                    __( 'What is one area of discipleship that you feel you could share with others? Who is someone that you could share with?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't15_a',
            'type' => 'watch',
            'menu' => [
                __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                __( 'Have you ever stopped to think about where God’s Kingdom... isn’t?', 'zume' ),
                __( 'Have you ever visited a home or a neighborhood or even a city where it seemed as if God was just... missing? These are usually the places where God wants to work the most.', 'zume' ),
            ],
        ],
        [
            'key' => 't15_b',
            'type' => 'video',
            'script_id' => 48,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '15', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't15_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Who are you more comfortable sharing with -- people you already know or people you haven’t met, yet?', 'zume' ),
                    __( 'Why do you think that is?', 'zume' ),
                    __( 'How could you get better at sharing with people you’re less comfortable with?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't16_a',
            'type' => 'watch',
            'menu' => [
                __( 'The Lord’s Supper', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'The Lord’s Supper', 'zume' ),
                __( 'Jesus said, “I am the living bread that came down from heaven. Whoever eats this bread will live forever. This bread is my flesh, which I will give for the life of the world.”', 'zume' ),
            ],
        ],
        [
            'key' => 't16_b',
            'type' => 'video',
            'script_id' => 49,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '16', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't16_c',
            'type' => 'activity',
            'menu' => [],
            'length' => [10],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Celebrate the Lord’s Supper', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume'),
                    __( 'Spend the next 10 minutes celebrating the Lord’s Supper with your group.', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . 'lordssupper',
                zume_create_qr_url( $activity_base_url . 'lordssupper' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's1_4_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Vision Casting the Greatest Blessing', 'zume' ),
                    __( 'Duckling Discipleship', 'zume' ),
                    __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                ],
                __( 'Tools heard in this session:', 'zume' ),
                [
                    __( 'Three-Minute Testimony', 'zume' ),
                    __( 'The Lord’s Supper', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's1_4_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Spend time this week practicing your Three-Minute Testimony, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."', 'zume' ),
                __( 'Ask God who He wants you to train with the Three-Minute Testimony tool. Share this person’s name with the group before you go.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 5
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_5_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 5', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 5', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_5_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '6542',
                zume_create_qr_url( $checkin_base_url . '6542' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '6542'
            ],
        ],
        [
            'key' => 's1_5_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the ways He works through the testimony of His people. Invite His Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_5_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_5_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'Person of Peace', 'zume' ),
                ],
                __( 'And we will add these tools to our toolkit:', 'zume' ),
                [
                    __( 'B.L.E.S.S. Prayer', 'zume' ),
                    __( 'Prayer Walking', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 't17_a',
            'type' => 'watch',
            'menu' => [
                __( 'Prayer Walking', 'zume' ),
                [5],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Prayer Walking', 'zume' ),
                __( 'Prayer Walking is a simple way to obey God’s command to pray for others. And it’s just what it sounds like – praying to God while walking around!', 'zume' ),
            ],
        ],
        [
            'key' => 't17_b',
            'type' => 'video',
            'script_id' => 50,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '17', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't18_a',
            'type' => 'watch',
            'menu' => [
                __( 'Person of Peace', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Person of Peace', 'zume' ),
                __( 'Disciple-making can be rapidly advanced by finding a person of peace, even in a place where followers of Jesus are few and far between.', 'zume' ),
            ],
        ],
        [
            'key' => 't18_b',
            'type' => 'video',
            'script_id' => 51,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '18', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't18_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Can someone who has a "bad reputation" (like the Samaritan woman or the demon-possessed man in the Gadarenes) really be a Person of Peace? Why or why not?', 'zume' ),
                    __( 'What is a community or segment of society near you that seems to have little (or no) Kingdom presence?', 'zume' ),
                    __( 'How could a Person of Peace (someone who is OPEN, HOSPITABLE, KNOWS OTHERS and SHARES) accelerate the spread of the Gospel in that community?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't19_a',
            'type' => 'activity',
            'menu' => [
                __( 'The B.L.E.S.S. Prayer', 'zume' ),
                [10],
            ],
            'length' => [10],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Practice the B.L.E.S.S. Prayer', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume' ),
                    __( 'Break into groups of two or three and practice praying the five areas of the B.L.E.S.S. Prayer over each other.', 'zume' ),
                ],
            ],
            'right' => [
                $activity_base_url . 'blessprayer',
                zume_create_qr_url( $activity_base_url . 'blessprayer' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't17_d',
            'type' => 'activity',
            'menu' => [
                __( 'Prayer Walking Activity', 'zume' ),
                [6090],
            ],
            'length' => [6090],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Prayer Walking', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume'),
                    __( 'Break into groups of two or three and go out into the community to practice Prayer Walking.', 'zume' ),
                    __( 'Choosing a location can be as simple as walking outside from where you are now, or you could plan to go to a specific destination.', 'zume' ),
                    __( 'Go as God leads, and plan on spending 60-90 minutes on this activity.', 'zume' ),
                    __( 'This session ends with the prayer walking activity.', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . 'prayerwalking',
                zume_create_qr_url( $activity_base_url . 'prayerwalking' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't17_e',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Before you go out on your Prayer Walking activity, be sure to pray with your group to end your time together.', 'zume' ),
                __( 'Thank God that He loves the lost, the last and the least – including us!', 'zume' ),
                __( 'Ask Him to prepare your heart and the heart of those you‘ll meet during your walk to be open to His work.', 'zume' ),
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 6
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_6_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 6', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 6', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_6_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '1235',
                zume_create_qr_url( $checkin_base_url . '1235' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '1235'
            ],
        ],
        [
            'key' => 's1_6_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for what He did in the last session, ask Him to help when you find it hard to obey, and invite His Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_6_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_6_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'Faithfulness is Better than Knowledge', 'zume' ),
                ],
                __( 'And we will add this tool to our toolkit:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 't20_a',
            'type' => 'watch',
            'menu' => [
                __( 'Faithfulness', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Faithfulness', 'zume' ),
                __( 'When we help multiply disciples, we need to make sure we’re reproducing the right things. It’s important what disciples know – but it’s much more important what they DO with what they know.', 'zume' ),
            ],
        ],
        [
            'key' => 't20_b',
            'type' => 'video',
            'script_id' => 52,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '20', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't20_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                __( 'Think about God’s commands that you already know. How "faithful" are you in terms of obeying and sharing those things?', 'zume' ),
            ],
        ],
        [
            'key' => 't21_a',
            'type' => 'watch',
            'menu' => [
                __( '3/3 Group Meeting', 'zume' ),
                [75],
            ],
            'length' => [75],
            'center' => [],
            'left' => [
                __( 'Watch', 'zume' ),
            ],
            'right' => [
                __( '3/3 Group Meeting', 'zume' ),
                __( 'In the following video, you’ll be coached through an interactive 3/3 Group where you’ll learn a principle and then “press pause” and practice it with the group.', 'zume' ),
            ],
        ],
        [
            'key' => 't21_b',
            'type' => 'video',
            'script_id' => 53,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '21', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't21_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Did you notice any differences between a 3/3 Group and a Bible Study or Small Group you’ve been a part of (or have heard about) in the past? If so, how would those differences impact the group?', 'zume' ),
                    __( 'Could a 3/3 Group be considered a Simple Church? Why or why not?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's1_6_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Faithfulness is Better than Knowledge', 'zume' ),
                ],
                __( 'Tools heard in this session:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's1_6_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Spend time this week obeying, training, and sharing based on the commitments you’ve made during your 3/3 Group practice.', 'zume' ),
                __( 'Pray and ask God who He wants you to share the 3/3 Group format with before your group meets again. Share this person’s name with the group before you go.', 'zume' ),
            ],
        ],







        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 7
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_7_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 7', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 7', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_7_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '4322',
                zume_create_qr_url( $checkin_base_url . '4322' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '4322'
            ],
        ],
        [
            'key' => 's1_7_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the group’s commitment to faithfully following Jesus and invite God’s Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_7_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_7_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'The Training Cycle', 'zume' ),
                ],
                __( 'And we will add this tool to our toolkit:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 't22_a',
            'type' => 'watch',
            'menu' => [
                __( 'The Training Cycle', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'The Training Cycle', 'zume' ),
                __( 'Have you ever learned how to ride a bicycle? Have you ever helped someone else learn? If so, chances are you already know the Training Cycle.', 'zume' ),
            ],
        ],
        [
            'key' => 't22_b',
            'type' => 'video',
            'script_id' => 54,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '22', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't22_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Have you ever been a part of a Training Cycle?', 'zume' ),
                    __( 'Who did you train? Or who trained you?', 'zume' ),
                    __( 'Could the same person be at different parts of the Training Cycle while learning different skills?', 'zume' ),
                    __( 'What would it look like to train someone like that?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's1_7_6',
            'type' => 'activity',
            'menu' => [],
            'length' => [6090],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( '3/3 Group Meeting', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume' ),
                    __( 'LOOK BACK – Use last session’s Obey, Train, and Share challenges to check-in with each other. (30 min)', 'zume' ),
                    __( 'LOOK UP – Use Mark 5:1-20 as your group’s reading passage and answer questions 1-4 during the Look Up section. (30 min)', 'zume' ),
                    __( 'LOOK FORWARD – Use questions 5, 6, and 7 in the Look Forward section to develop how you will Obey, Train and Share. (30 min)', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . '33group',
                zume_create_qr_url( $activity_base_url . '33group' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's1_7_7',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'What did you like best about the 3/3 Group? Why?', 'zume' ),
                    __( 'What was the most challenging? Why?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's1_7_8',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concept heard in this session:', 'zume' ),
                [
                    __( 'The Training Cycle', 'zume' ),
                ],
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's1_7_9',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Pick one skill or concept you have learned in Zúme and mentor someone to reproduce it to the fourth generation.', 'zume' ),
                __( 'Challenge the person you mentored to continue the process to an additional (fifth) generation.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 8
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_8_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 8', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 8', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_8_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '9870',
                zume_create_qr_url( $checkin_base_url . '9870' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '9870'
            ],
        ],
        [
            'key' => 's1_8_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for giving your group the energy, the focus and the faithfulness to come so far in this training. Ask God to have His Holy Spirit remind everyone in the group that they can do nothing without Him!', 'zume' ),
            ],
        ],
        [
            'key' => 's1_8_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_8_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'Leadership Cells', 'zume' ),
                ],
                __( 'And we will practice this tool from our toolkit:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 't23_a',
            'type' => 'watch',
            'menu' => [
                __( 'Leadership Cells', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Leadership Cells', 'zume' ),
                __( 'Jesus said, “Whoever wishes to become great among you shall be your servant.”', 'zume' ),
                __( 'A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.', 'zume' ),
            ],
        ],
        [
            'key' => 't23_b',
            'type' => 'video',
            'script_id' => 55,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '23', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't23_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Is there a group of followers of Jesus you know that are already meeting or would be willing to meet and form a Leadership Cell to learn Zúme Training?', 'zume' ),
                    __( 'What would it take to bring them together?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's1_8_6',
            'type' => 'activity',
            'menu' => [],
            'length' => [6090],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( '3/3 Group Meeting', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume' ),
                    __( 'LOOK BACK – Use last session’s Obey, Train, and Share challenges to check-in with each other. (30 min)', 'zume' ),
                    __( 'LOOK UP – Use Acts 2:42-47 as your group’s reading passage and answer questions 1- 4. (30 min)', 'zume' ),
                    __( 'LOOK FORWARD – Use questions 5, 6, and 7 to develop how you will Obey, Train and Share. (30 min)', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . '33group',
                zume_create_qr_url( $activity_base_url . '33group' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's1_8_7',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concept from this session:', 'zume' ),
                [
                    __( 'Leadership Cells', 'zume' ),
                ],
                __( 'Tool from this session:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's1_8_8',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Select some people from your List of 100 who are already believers. Explain Leadership Cells to them and see if they would be interested to be part of one.', 'zume' ),
                __( 'Pray and ask God who He wants you to share the Leadership Cell tool with before your group meets again. Challenge them to then share it with someone else.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 9
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_9_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 9', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 9', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_9_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '1355',
                zume_create_qr_url( $checkin_base_url . '1355' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '1355'
            ],
        ],
        [
            'key' => 's1_9_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God that his ways are not our ways and His thoughts are not our thoughts. Ask Him to give each member of your group the mind of Christ - always focused on His Father‘s work. Ask the Holy Spirit to lead your time together and make it the best session yet.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_9_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_9_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Non-Sequential Growth', 'zume' ),
                    __( 'Pace', 'zume' ),
                    __( 'Always Part of Two Churches', 'zume' ),
                ],
                __( 'And we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'Coaching Checklist', 'zume' ),
                    __( 'Four Fields', 'zume' ),
                    __( 'Generational Mapping', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 't24_a',
            'type' => 'watch',
            'menu' => [
                __( 'Non-Sequential Growth', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Non-Sequential Growth', 'zume' ),
                __( 'When people think about disciples multiplying, they often think of it as a step-by-step process. The problem with that is — that’s not how it works best!', 'zume' ),
            ],
        ],
        [
            'key' => 't24_b',
            'type' => 'video',
            'script_id' => 56,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '24', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't24_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'What is the most exciting idea you heard in this video? Why?', 'zume' ),
                    __( 'What is the most challenging idea? Why?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't25_a',
            'type' => 'watch',
            'menu' => [
                __( 'Pace', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Pace', 'zume' ),
                __( 'Multiplying matters and multiplying quickly matters even more. Pace matters because where we all spend our eternity — an existence that outlasts time — is determined in the very short time we call “life.“', 'zume' ),
            ],
        ],
        [
            'key' => 't25_b',
            'type' => 'video',
            'script_id' => 57,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '25', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't25_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Why is pace important?', 'zume' ),
                    __( 'What do you need to change in your thinking, your actions, or your attitude to be better aligned with God’s priority for pace?', 'zume' ),
                    __( 'What is one thing you can do starting this week that will make a difference?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't26_a',
            'type' => 'watch',
            'menu' => [
                __( 'Always Part of Two Churches', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Always Part of Two Churches', 'zume' ),
                __( 'Jesus taught us that we are to stay close — to live as a small, spiritual family, to love and give our lives to one another, to celebrate and suffer — together.', 'zume' ),
                __( 'However, Jesus also taught us to leave our homes and loved ones behind and be willing to go anywhere — and everywhere — to share and start new spiritual families.', 'zume' ),
            ],
        ],
        [
            'key' => 't26_b',
            'type' => 'video',
            'script_id' => 58,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '26', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't26_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                __( 'What are some advantages of maintaining a consistent spiritual family that gives birth to new ones that grow and multiply, instead of continually growing a family and splitting it in order to grow?', 'zume' ),
            ],
        ],
        [
            'key' => 't28_a',
            'type' => 'watch',
            'menu' => [
                __( 'Coaching Checklist', 'zume' ),
                [25],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Coaching Checklist', 'zume' ),
                __( 'The Coaching Checklist is a simple tool you can use to help guide you as you assist others through various parts of becoming a fully equipped disciple.', 'zume' ),
            ],
        ],
        [
            'key' => 't28_b',
            'type' => 'video',
            'script_id' => 60,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '28', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't28_c',
            'type' => 'activity',
            'menu' => [],
            'length' => [20],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Coaching Checklist', 'zume' ),
                [
                    __( 'Scan the QR code or find a piece of paper.', 'zume' ),
                    __( 'Assess Yourself - Evaluate yourself and mark the corresponding columns on the Coaching Checklist.', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . 'coachingchecklist',
                zume_create_qr_url( $activity_base_url . 'coachingchecklist' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't28_d',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Which tools and concepts did you feel you would be able to train well?', 'zume' ),
                    __( 'Which tools and concepts did you feel you would struggle to train well?', 'zume' ),
                    __( 'Are there any tools or concepts that you would add or subtract from the checklist? Why?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't28_e',
            'type' => 'activity',
            'menu' => [],
            'length' => [],
            'center' => [
            ],
            'left' => [
                __( 'REMEMBER - Be sure to share your Coaching Checklist results with a training partner or other mentor.', 'zume' ),
                __( 'If you don’t have a coach or mentor, scan the QR code and request one now.', 'zume' ),
            ],
            'right' => [
                trailingslashit( site_url() ) . $lang_code . '/get-a-coach',
                zume_create_qr_url( trailingslashit( site_url() ) . $lang_code . '/get-a-coach' ),
                __( 'Get a Coach', 'zume' ),
            ],
        ],
        [
            'key' => 't31_a',
            'type' => 'center',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Four Fields and Generational Mapping are tools designed to serve growing movement efforts.', 'zume' ),
                __( 'REMINDER: Zúme coaches are available to help you apply these tools in your local area.', 'zume' ),
            ],
            'right' => [],
        ],
        [
            'key' => 't31_b',
            'type' => 'center',
            'menu' => [
                __( 'Four Fields', 'zume' ),
                [15],
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Four Fields', 'zume' ),
                __( 'Jesus often pulled the disciples away from ministry to quieter places to review how the work was going.', 'zume' ),
                __( 'Four Fields is used by a leadership cell to reflect on current efforts and Kingdom activity around them. It especially helps leaders balance efforts, so that no field is overlooked.', 'zume' ),
                __( 'Review the next two slides: Field Descriptions and Four Fields Example', 'zume' ),
            ],
            'right' => [],
        ],
        [
            'key' => 't31_c',
            'type' => 'center',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Field Descriptions', 'zume' ),
                [
                    __( 'Empty Field: Where or with whom [what people groups] are you planning to extend the Kingdom?', 'zume' ),
                    __( 'Seeding Field: Where or with whom are you sharing the good news of the Kingdom? How are you doing that?', 'zume' ),
                    __( 'Growing Field: How are you equipping people and growing them spiritually, individually and in their natural networks?', 'zume' ),
                    __( 'Harvesting Field: How are new spiritual families [simple churches] being formed?', 'zume' ),
                    __( 'Multiplying Field: With whom, how and when are you filtering for faithful people and equipping them and holding them accountable for reproduction?', 'zume' ),
                ],
            ],
            'right' => [
                zume_create_qr_url( $activity_base_url . '4fields' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't31_d',
            'type' => 'left_image',
            'menu' => [],
            'length' => [],
            'center' => [
                __( 'Four Fields Example', 'zume' ),
            ],
            'left' => [
                __( 'Four Fields Example', 'zume' ),
                $mirror_url . '98.png',
            ],
            'right' => [
                $activity_base_url . '4fields',
                zume_create_qr_url( $activity_base_url . '4fields' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't31_e',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [
            ],
            'left' => [
                __( 'Discuss', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Identify an empty field around you. What communities or people groups that you are connected to have no gospel activity?', 'zume' ),
                    __( 'How is long-term growth affected if one of the fields is neglected? Give examples.', 'zume' ),
                    __( 'Which Zúme tools could help in which field?', 'zume')
                ]
            ],
        ],
        [
            'key' => 't32_a',
            'type' => 'center',
            'menu' =>  [
                __( 'Generational Mapping', 'zume' ),
                [15],
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Generational Mapping', 'zume' ),
                __( 'Generational mapping (a.k.a. generation mapping or gen mapping) is another simple tool to help leaders in a movement understand the growth around them.', 'zume' ),
                __( 'A generation tree map can be drawn on a piece of paper or multiple pieces of paper. This map helps show where there are stops in multiplication and training might be required. Health of the movement is a top concern for leaders and fruitfulness is a top way to measure health.', 'zume' ),
                __( 'See the example on the next slide.', 'zume' ),
            ],
            'right' => [],
        ],
        [
            'key' => 't32_b',
            'type' => 'left_image',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Generational Mapping Example', 'zume' ),
                $mirror_url . '104.png',
            ],
            'right' => [
                $activity_base_url . 'genmapping',
                zume_create_qr_url( $activity_base_url . 'genmapping' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't32_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'Discuss', 'zume' ),
            ],
            'right' => [
                __( 'Use the Generational Mapping example to discuss the following:', 'zume' ),
                [
                    __( 'Which leaders are seeing multiplication?', 'zume' ),
                    __( 'Which groups would you expect to multiply next?', 'zume' ),
                    __( 'Which leaders could help and strengthen other leaders?', 'zume' ),
                    __( 'Do you see a pattern of weak accountability in any of the generations?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's1_9_9',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Non-Sequential Growth', 'zume' ),
                    __( 'Pace of Multiplication Matters', 'zume' ),
                    __( 'Always Part of Two Churches', 'zume' ),
                ],
                __( 'Tools heard in this session:', 'zume' ),
                [
                    __( 'Coaching Checklist', 'zume' ),
                    __( 'Four Fields', 'zume' ),
                    __( 'Generational Mapping', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's1_9_10',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Practice sharing the concept of “Pace” with a friend and pray for the Lord to ingrain it deeply within your heart and soul. Ask the Lord whom He would have you share it with.', 'zume' ),
                __( 'If you have already started your own simple church, share the concept  “Always a Part of Two Churches” with the people in it. If not, share it with another believer you know.', 'zume' ),
            ],
        ],


        /***************************************************************************************************************
         *
         *
         *
         *
         *      10 SESSION 10
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's1_10_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 10', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 10', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's1_10_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '5430',
                zume_create_qr_url( $checkin_base_url . '5430' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '5430'
            ],
        ],
        [
            'key' => 's1_10_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God that He is faithful to complete His good work in us. ', 'zume' ),
                __( 'Ask Him to give your group clear heads and open hearts to the great things He wants to do in and through you.', 'zume' ),
                __( 'Ask the Holy Spirit to lead your time together and thank Him for His faithfulness, too. He got you through!', 'zume' ),
            ],
        ],
        [
            'key' => 's1_10_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_10_5',
            'type' => 'center',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Be encouraged ...', 'zume' ),
                __( 'You may not know it, but you now have more practical training on starting simple churches and making disciples who multiply than many pastors and missionaries around the world!', 'zume' ),
                __( 'Yet Zúme Training is only the beginning! In this session, we will make a plan for what happens post-training and briefly introduce tools you’ll need later in your journey as you implement what you’ve learned.', 'zume' ),
            ],
            'right' => [
            ],
        ],
        [
            'key' => 's1_10_6',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'Leadership in Networks', 'zume' ),
                ],
                __( 'And we will add these tools to our toolkit:', 'zume' ),
                [
                    __( 'Peer Mentoring Groups', 'zume' ),
                    __( 'Three-Month Plan', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 't29_a',
            'type' => 'watch',
            'menu' => [
                __( 'Leadership in Networks', 'zume' ),
                [15],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Leadership in Networks', 'zume' ),
                __( 'What happens to churches as they grow and start new churches that start new churches? How do they stay connected and live life together as an extended, spiritual family? They become a network!', 'zume' ),
            ],
        ],
        [
            'key' => 't29_b',
            'type' => 'video',
            'script_id' => 61,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '29', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't29_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                __( 'Are there advantages when networks of simple churches are connected by deep, personal relationships? What are some examples that come to mind?', 'zume' ),
            ],
        ],

        [
            'key' => 't30_a',
            'type' => 'watch',
            'menu' => [
                __( 'Peer Mentoring Groups', 'zume' ),
                [50],
            ],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'WATCH', 'zume' ),
            ],
            'right' => [
                __( 'Peer Mentoring Groups', 'zume' ),
                __( 'Making disciples who make disciples means making leaders who make leaders.', 'zume' ),
                __( 'Peer Mentoring groups gather leaders together and help them love and encourage one another in their faith and leadership.', 'zume' ),
            ],
        ],
        [
            'key' => 't30_b',
            'type' => 'video',
            'script_id' => 62,
            'menu' => [],
            'length' => [],
            'center' => [
                Zume_Course::get_video_by_key( '30', true, $lang_code ), // video
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 't30_c',
            'type' => 'activity',
            'menu' => [],
            'length' => [45],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Peer Mentoring Group Practice', 'zume' ),
               [
                   __( 'Scan the QR code.', 'zume' ),
                   __( 'Break into groups of two or three. Use the 3/3 formatted Peer Mentoring Group outline.', 'zume' ),
                   __( 'Choose one person in the group to be the "mentee" and have the other members work through the suggested questions list as peer mentors.',  'zume' ),
               ],

            ],
            'right' => [
                $activity_base_url . 'peermentoring',
                zume_create_qr_url( $activity_base_url . 'peermentoring' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 't27_a',
            'type' => 'center',
            'menu' => [
                __( 'Three-Month Plan', 'zume' ),
                [40],
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Three-Month Plan', 'zume' ),
                __( 'In His Bible, God says, "I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future."', 'zume' ),
                __( 'God makes plans, and He expects us to make plans, too.', 'zume' ),
                __( 'A Three Month Plan is a tool you can use to help focus your attention and efforts and keep them aligned with God’s priorities for making disciples who multiply.', 'zume' ),
                __( 'The next slide will show you how to make your Three Month Plan. We recommend using the online tool.', 'zume' ),
            ],
            'right' => [],
        ],
        [
            'key' => 't27_b',
            'type' => 'activity',
            'menu' => [],
            'length' => [30],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Make your Three Month Plan', 'zume' ),
                [
                    __( 'Read - Scan the QR code. You don‘t have to commit to every item, rather they are intended as prompts for your plan. (5 min)', 'zume' ),
                    __( 'Listen - Take time to be as quiet as possible and listen to what God chooses to reveal. (10 min)', 'zume' ),
                    __( 'Record Your Plan - Write commitments on a piece of paper or use the online tool to save your answers. (15 min)', 'zume' ),
                ],
            ],
            'right' => [
                $activity_base_url . '3monthplan',
                zume_create_qr_url( $activity_base_url . '3monthplan' ),
                __( 'Online Plan Tool', 'zume' ),
            ],
        ],
        [
            'key' => 't27_c',
            'type' => 'discuss',
            'menu' => [],
            'length' => [10],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                __( 'Take turns sharing your Three Month Plans with each other.', 'zume' ),
                __( 'Find a training partner(s) that is willing to check in with you weekly. Commit to doing the same for them.', 'zume' ),
            ],
        ],
        [
            'key' => 's1_10_7',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concept heard in this session:', 'zume' ),
                [
                    __( 'Leadership in Networks', 'zume' ),
                ],
                __( 'Tools heard in this session:', 'zume' ),
                [
                    __( 'Peer Mentoring Groups', 'zume' ),
                    __( 'Three-Month Plan', 'zume' ),
                ],
            ],
        ],







        /**************************************************************************************************************/

        /**************************************************************************************************************/

        /**************************************************************************************************************/

        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 1
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_1_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 1', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 1', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_1_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '3354',
                zume_create_qr_url( $checkin_base_url . '3354' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '3354'
            ],
        ],
        [
            'key' => 's2_1_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.', 'zume' )
            ],
        ],
        [
            'key' => 's2_1_4',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'God Uses Ordinary People', 'zume' ),
                    __( 'Simple Definition of Disciple and Church', 'zume' ),
                    __( 'Spiritual Breathing is Hearing and Obeying God', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's2_1_5',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'God Uses Ordinary People', 'zume' ),
                    __( 'Simple Definition of Disciple and Church', 'zume' ),
                    __( 'Spiritual Breathing is Hearing and Obeying God', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's2_1_6',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Practice sharing these definitions with a friend and pray for the Lord to ingrain them deeply within your heart and soul. Ask the Lord whom He would have you share them with.', 'zume' ),
                __( 'Share the definitions with whomever the Lord impresses on you to do so with. Then equip them to share it with someone else.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 2
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_2_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 2', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 2', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_2_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '4568',
                zume_create_qr_url( $checkin_base_url . '4568' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '4568'
            ],
        ],
        [
            'key' => 's2_2_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Ask if anyone in the group has specific needs they would like the group to pray for.', 'zume' ),
                __( 'Thank God that He promises in His Word to listen and act when His people pray.', 'zume' ),
                __( 'Ask God’s Holy Spirit to lead your time, together.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_2_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_2_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'S.O.A.P.S Bible Reading', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_2_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'S.O.A.P.S Bible Reading', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_2_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.', 'zume' ),
                __( 'Ask the Lord to guide you to challenge at least five people you know who are believers to begin their own S.O.A.P.S. Bible reading practice daily, and then do so.', 'zume' ),
            ],
        ],


        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 3
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_3_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 3', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 3', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_3_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '8767',
                zume_create_qr_url( $checkin_base_url . '8767' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '8767'
            ],
        ],
        [
            'key' => 's2_3_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for His presence in our lives. Pray for each person in the group to have ears to hear His voice and grace to obey what He says.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_3_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_3_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'Accountability Groups', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's2_3_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'Accountability Groups', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_3_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Find an accountability partner (same gender) and begin meeting with them on a weekly basis.', 'zume' ),
                __( 'Ask the Lord to guide you to challenge at least five people you know who are believers to begin their own accountability group meeting, and then do so.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 4
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_4_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 4', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 4', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_4_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '6787',
                zume_create_qr_url( $checkin_base_url . '6787' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '6787'
            ],
        ],
        [
            'key' => 's2_4_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God that He is making us like Jesus. Invite the Holy Spirit to lead your time together.',  'zume' ),
            ],
        ],
        [
            'key' => 's2_4_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_4_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss the concept:', 'zume' ),
                [
                    __( 'Producer Not Consumer', 'zume' ),
                ],
                __( 'And we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'List of 100', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_4_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concept heard in this session:', 'zume' ),
                [
                    __( 'Producer Not Consumer', 'zume' ),
                ],
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'List of 100', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_4_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Spend time this week praying for five people from your List of 100 that you marked as an "Unbeliever" or "Unknown." Ask God to prepare their hearts to be open to His story.', 'zume' ),
                __( 'Ask God who He wants you to share the List of 100 tool with. Share this person’s name with the group before you go and reach out to them before the next session.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 5
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_5_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 5', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 5', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_5_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '3450',
                zume_create_qr_url( $checkin_base_url . '3450' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '3450'
            ],
        ],
        [
            'key' => 's2_5_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for His love for all of the people in our lives. Pray for each person in the group to see those around you the way God sees them.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_5_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_5_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'The Prayer Cycle', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 't7_cc',
            'type' => 'activity',
            'menu' => [],
            'length' => [60],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Pray the Prayer Cycle for an hour individually', 'zume' ),
                __( 'Set a time for the group to return and reconnect. Be sure to add a few extra minutes for everyone to both find a quiet place to pray and to make their way back to the group.', 'zume' ),
                __( 'If your time is flexible, take the full hour. Pray each section for 5 full minutes. This will make this session longer than a one hour training.', 'zume' ),
                __( 'If you can‘t take a longer session, then reduce the prayer sections from 5 minutes to 3 minutes each.', 'zume' ),
            ],
            'right' => [
                $activity_base_url . 'prayercycle',
                zume_create_qr_url( $activity_base_url . 'prayercycle' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's2_5_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'The Prayer Cycle', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_5_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Use the prayer cycle to guide you as you pray for an hour sometime this week.', 'zume' ),
                __( 'Share the prayer cycle with whomever the Lord directs you. Challenge them to share it with others as well.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 6
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_6_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 6', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 6', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_6_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '2344',
                zume_create_qr_url( $checkin_base_url . '2344' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '2344'
            ],
        ],
        [
            'key' => 's2_6_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the ways you experienced Him in the last session and invite His Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_6_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_6_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Spiritual Economy', 'zume' ),
                    __( 'Vision Casting the Greatest Blessing', 'zume' ),
                    __( 'The Gospel', 'zume' ),
                ]

            ],
        ],
        [
            'key' => 's2_6_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Spiritual Economy', 'zume' ),
                    __( 'Vision Casting the Greatest Blessing', 'zume' ),
                    __( 'The Gospel', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_6_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Practice sharing the Spiritual Economy concept with a friend and pray for the Lord to ingrain it deeply within your heart and soul. Ask the Lord whom He would have you share it with.', 'zume' ),
                __( 'Ask God who He wants you to share with about the Greatest Blessing. Have them practice it as well. Share this person‘s name with the group before you go and reach out to them.', 'zume' ),
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 7
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_7_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 7', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 7', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_7_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '1116',
                zume_create_qr_url( $checkin_base_url . '1116' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '1116'
            ],
        ],
        [
            'key' => 's2_7_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray for each member of your group to experience the blessings of following Jesus, leading others to follow Jesus, and equipping others to start new spiritual families.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_7_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_7_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will practice this tool in our toolkit:', 'zume' ),
                [
                    __( 'Sharing the Gospel', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_7_6',
            'type' => 'activity',
            'menu' => [],
            'length' => [50],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Practice Sharing the Gospel', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume' ),
                    __( 'Break into groups of two or three people and practice telling God’s story to each other.', 'zume' ),
                    __( 'After you have practiced, switch. Repetition will bring confidence. By the time you are finished, you‘ll be ready to share God’s story.', 'zume' ),
                ],
            ],
            'right' => [
                $activity_base_url . 'sharegospel',
                zume_create_qr_url( $activity_base_url . 'sharegospel' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's2_7_7',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'Sharing the Gospel', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_7_8',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Ask God who He wants you to train to use the Creation to Judgment story (or some other way to share God’s story). Share this person’s name with the group before you go.', 'zume' ),
                __( 'Spend time this week practicing God’s story, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."', 'zume' ),
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 8
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_8_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 8', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 8', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_8_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '5431',
                zume_create_qr_url( $checkin_base_url . '5431' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '5431'
            ],
        ],
        [
            'key' => 's2_8_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God that He invites us to share His Good News with others. Ask Him to give each member of your group the mind of Christ — and to fill each one with His Spirit.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_8_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_8_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will add these tools to our toolkit:', 'zume' ),
                [
                    __( 'Baptism', 'zume' ),
                    __( 'Three-Minute Testimony', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_8_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'Baptism', 'zume' ),
                    __( 'Three-Minute Testimony', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_8_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'If you know anyone who follows Jesus but has not been baptized, challenge them to do so and offer to baptize them. Otherwise, practice the skill with a friend.', 'zume' ),
                __( 'Ask God who He wants you to share with about what baptism is and how to do it. Have them practice it as well. Share this person‘s name with the group before you go and reach out to them before the next session.', 'zume' ),
            ]
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 9
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_9_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 9', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 9', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_9_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '8768',
                zume_create_qr_url( $checkin_base_url . '8768' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '8768'
            ],
        ],
        [
            'key' => 's2_9_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the gift of being united with Christ‘s death, burial, and resurrection. Ask God‘s Holy Spirit to lead your time, together.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_9_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_9_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will practice this tool in our toolkit:', 'zume' ),
                [
                    __( 'Three-Minute Testimony', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_9_6',
            'type' => 'center',
            'menu' => [],
            'length' => [50],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Share Your Testimony', 'zume' ),
                [
                    __( 'Break into groups of two of three and practice sharing your Three-Minute Testimony.', 'zume' ),
                    __( 'Choose 5 people from your List of 100. Have someone pretend to be each of those five people, and practice your Testimony in a way that you think will make sense to that particular person.', 'zume' ),
                    __( 'After you’ve practiced, switch. Pretend to be someone else’s five people from the list. By the time you’re finished, you should be able to tell your Testimony in about 3 minutes or less.', 'zume' ),
                ],
                __( 'Repetition builds confidence.', 'zume' ),
            ],
            'right' => [],
        ],
        [
            'key' => 's2_9_7',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool practiced in this session:', 'zume' ),
                [
                    __( 'Three-Minute Testimony', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_9_8',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Spend time this week practicing your testimony, and then share it with at least one person from your List of 100 that you marked as "Unbeliever" or "Unknown."', 'zume' ),
                __( 'Ask God who He wants you to train with the Three-Minute Testimony tool. Share this person’s name with the group before you go.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_9_9',
            'type' => 'center',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'IMPORTANT REMINDER - Your group will be celebrating the Lord‘s Supper next session. Be sure to remember the supplies (bread and wine / juice).', 'zume' ),
            ],
            'right' => [],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 10
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_10_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 10', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 10', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_10_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '2347',
                zume_create_qr_url( $checkin_base_url . '2347' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '2347'
            ],
        ],
        [
            'key' => 's2_10_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the ways He works through our testimony and invite His Holy Spirit to lead your time together.',  'zume' ),
            ],
        ],
        [
            'key' => 's2_10_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_10_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Duckling Discipleship', 'zume' ),
                    __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                ],
                __( 'And we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'The Lord’s Supper', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_10_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Duckling Discipleship', 'zume' ),
                    __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                ],
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'The Lord’s Supper', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_10_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'If your family are believers and live locally, lead the Lord‘s Supper with them. Otherwise, practice the skill with a believing friend.', 'zume' ),
                __( 'Share "Duckling Discipleship" and "Eyes to See Where the Kingdom Isn’t" with whomever the Lord impresses on you. Then equip them to share it with someone else.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 11
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_11_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 11', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 11', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_11_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '9434',
                zume_create_qr_url( $checkin_base_url . '9434' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '9434'
            ],
        ],
        [
            'key' => 's2_11_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for how He is at work in your life and the lives of others around you. Pray for the group to have eyes to see where the Kingdom isn‘t, yet.',  'zume' ),
            ],
        ],
        [
            'key' => 's2_11_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_11_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'Prayer Walking', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_11_6',
            'type' => 'activity',
            'menu' => [],
            'length' => [6090],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( 'Prayer Walking', 'zume' ),
                [
                    __( 'Break into groups of two or three and go out into the community to practice Prayer Walking.', 'zume' ),
                    __( 'Choosing a location can be as simple as walking outside from where you are now, or you could plan to go to a specific destination.', 'zume' ),
                    __( 'Go as God leads, and plan on spending 60-90 minutes on this activity.', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . 'prayerwalking',
                zume_create_qr_url( $activity_base_url . 'prayerwalking' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 12
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_12_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 12', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 12', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_12_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '2348',
                zume_create_qr_url( $checkin_base_url . '2348' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '2348'
            ],
        ],
        [
            'key' => 's2_12_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for what He did in the last session, ask Him to help when you find it hard to obey, and invite His Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_12_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_12_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss the concept:', 'zume' ),
                [
                    __( 'Person of Peace', 'zume' ),
                ],
                __( 'And we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'B.L.E.S.S. Prayer', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_12_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concept heard in this session:', 'zume' ),
                [
                    __( 'Person of Peace', 'zume' ),
                ],
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'B.L.E.S.S. Prayer', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_12_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Pray for someone in their presence using the BLESS pattern this week.', 'zume' ),
                __( 'Equip someone else to pray for others using the BLESS pattern and go with them as they do it.', 'zume' ),
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 13
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_13_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 13', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 13', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_13_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '6785',
                zume_create_qr_url( $checkin_base_url . '6785' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '6785'
            ],
        ],
        [
            'key' => 's2_13_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for what you learned in the last session. Pray for God‘s Spirit to help you be faithful to put into practice all you are learning.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_13_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_13_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Faithfulness', 'zume' ),
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [ // modified time from 75 to 40 min, original t21_a
            'key' => 't21_aa',
            'type' => 'watch',
            'menu' => [],
            'length' => [40],
            'center' => [],
            'left' => [
                __( 'Watch', 'zume' ),
            ],
            'right' => [
                __( '3/3 Group Meeting', 'zume' ),
                __( 'In the following video, you’ll be coached through an interactive 3/3 Group where you’ll learn a principle and then “press pause” and practice it with the group.', 'zume' ),
            ],
        ],
        [ // modified time from 10 to 5 minutes, original t21_c
            'key' => 't21_cc',
            'type' => 'discuss',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'DISCUSS', 'zume' ),
            ],
            'right' => [
                [
                    __( 'Did you notice any differences between a 3/3 Group and a Bible Study or Small Group you’ve been a part of (or have heard about) in the past? If so, how would those differences impact the group?', 'zume' ),
                    __( 'Could a 3/3 Group be considered a Simple Church? Why or why not?', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's2_13_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Faithfulness', 'zume' ),
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_13_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Spend time this week obeying, training, and sharing based on the commitments you’ve made during your 3/3 Group practice.', 'zume' ),
                __( 'Pray and ask God who He wants you to share the 3/3 Group format with before your group meets again. Share this person’s name with the group before you go.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 14
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_14_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 14', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 14', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_14_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '9872',
                zume_create_qr_url( $checkin_base_url . '9872' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '9872'
            ],
        ],
        [
            'key' => 's2_14_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the group’s commitment to faithfully following Jesus and invite God’s Holy Spirit to lead your time together.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_14_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_14_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will practice this tool in our toolkit:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_14_6',
            'type' => 'activity',
            'menu' => [
                __( '3/3 Group Meeting', 'zume' ),
            ],
            'length' => [45],
            'center' => [
                __( 'ACTIVITY', 'zume' ),
            ],
            'left' => [
                __( '3/3 Group Meeting', 'zume' ),
                [
                    __( 'Scan the QR code.', 'zume' ),
                    __( 'LOOK BACK – Use last session’s Obey, Train, and Share challenges to check-in with each other. (15 min)', 'zume' ),
                    __( 'LOOK UP – Use Mark 5:1-20 as your group’s reading passage and answer questions 1-4 during the Look Up section. (15 min)', 'zume' ),
                    __( 'LOOK FORWARD – Use questions 5, 6, and 7 in the Look Forward section to develop how you will Obey, Train and Share. (15 min)', 'zume' ),
                ]
            ],
            'right' => [
                $activity_base_url . '33group',
                zume_create_qr_url( $activity_base_url . '33group' ),
                __( 'Activity Resource', 'zume' ),
            ],
        ],
        [
            'key' => 's2_14_7',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( '3/3 Group Meeting', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_14_8',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Pray and ask God if he wants you to start a 3/3 Group. If He does, look over your list of 100 and ask God who you should invite to join you. Then invite them this week and trust God to build the group.', 'zume' ),
                __( 'Find someone to share the 3/3 Group format with before your group meets again. Share this person’s name with the group before you go.', 'zume' ),
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 15
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_15_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 15', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 15', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_15_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '4327',
                zume_create_qr_url( $checkin_base_url . '4327' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '4327'
            ],
        ],
        [
            'key' => 's2_15_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Ask if anyone in the group has specific needs they would like the group to pray for. Thank God that He promises in His Word to listen and act when His people pray. Ask God’s Holy Spirit to lead your time, together.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_15_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_15_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Training Cycle', 'zume' ),
                    __( 'Leadership Cells', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_15_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Training Cycle', 'zume' ),
                    __( 'Leadership Cells', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_15_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Pick one skill or concept you have learned in Zúme and mentor someone to reproduce it to the fourth generation.', 'zume' ),
                __( 'Share the "Training Cycle" with a believer on your list of 100.', 'zume' ),
            ],
        ],




        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 16
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_16_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 16', 'zume' )
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 16', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_16_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '2871',
                zume_create_qr_url( $checkin_base_url . '2871' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '2871'
            ],
        ],
        [
            'key' => 's2_16_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for giving your group the energy, the focus and the faithfulness to come so far in this training. Ask God to have His Holy Spirit remind everyone in the group that they can do nothing without Him!', 'zume' ),
            ],
        ],
        [
            'key' => 's2_16_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_16_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Expect Non-Sequential Growth', 'zume' ),
                    __( 'Pace', 'zume' ),
                    __( 'Always Part of Two Churches', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_16_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Expect Non-Sequential Growth', 'zume' ),
                    __( 'Pace', 'zume' ),
                    __( 'Always Part of Two Churches', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_16_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Practice sharing the concept of “Pace” with a friend and pray for the Lord to ingrain it deeply within your heart and soul. Ask the Lord whom He would have you share it with.', 'zume' ),
                __( 'If you have already started your own simple church, share the "Always Part of Two Churches" pattern with the people in it. If not, share it with another believer you know.', 'zume' ),
            ],
        ],






        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 17
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_17_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 17', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 17', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_17_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '4328',
                zume_create_qr_url( $checkin_base_url . '4328' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '4328'
            ],
        ],
        [
            'key' => 's2_17_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for how He continues to speak through the word, prayer, the body, and persecution and suffering. Pray for each person in the group to have ears to hear His voice and grace to obey what He says.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_17_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_17_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss this concept:', 'zume' ),
                [
                    __( 'Leadership in Networks', 'zume' ),
                ],
                __( 'And we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'Coaching Checklist', 'zume' ),
                ]
            ],
        ],
        [
            'key' => 's2_17_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concept heard in this session:', 'zume' ),
                [
                    __( 'Leadership in Networks', 'zume' ),
                ],
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'Coaching Checklist', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_17_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Identify one next step for yourself, either Modeling, Assisting, Watching, or Leaving, that you need to take with the disciple you assessed with the coaching checklist.', 'zume' ),
                __( 'Share the concept of “Leadership in Networks” with someone else. Then train them to share it with someone else.', 'zume' ),
            ],
        ],






        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 18
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_18_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 18', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 18', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_18_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '6548',
                zume_create_qr_url( $checkin_base_url . '6548' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '6548'
            ],
        ],
        [
            'key' => 's2_18_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God that his ways are not our ways and His thoughts are not our thoughts. Ask Him to give each member of your group the mind of Christ - always focused on His Father‘s work. Ask the Holy Spirit to lead your time together and make it the best session yet.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_18_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_18_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will hear and discuss these concepts:', 'zume' ),
                [
                    __( 'Four Fields', 'zume' ),
                    __( 'Generational Mapping', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_18_6',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Take a moment to listen to God and ask if there are any action steps you or your group needs to take based on the Four Fields discussion you just had.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_18_7',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Concepts heard in this session:', 'zume' ),
                [
                    __( 'Four Fields', 'zume' ),
                    __( 'Generational Mapping', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_18_8',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Go through each of the Zúme training items and determine which field(s) each is relevant to and label a four fields chart with the items.', 'zume' ),
                __( 'Share the Generational Mapping tool with another believer you know as a vision casting exercise.', 'zume' ),
            ],
        ],



        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 19
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_19_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 19', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 19', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_19_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '7657',
                zume_create_qr_url( $checkin_base_url . '7657' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '7657'
            ],
        ],
        [
            'key' => 's2_19_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God for the Body of Christ. Pray for mutual love and encouragement to continue to grow between each member of your group as you draw near to Jesus.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_19_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_19_5',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'Peer Mentoring Groups', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_19_6',
            'type' => 'review',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'REVIEW', 'zume' ),
            ],
            'right' => [
                __( 'Tool heard in this session:', 'zume' ),
                [
                    __( 'Peer Mentoring Groups', 'zume' ),
                ],
            ],
        ],
        [
            'key' => 's2_19_7',
            'type' => 'obey',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OBEY', 'zume' ),
                __( 'SHARE', 'zume' ),
            ],
            'right' => [
                __( 'Discuss with your Zúme training group whether or not the members are open to continuing to meet after the conclusion of the training as a Peer Mentoring Group.', 'zume' ),
                __( 'Share the concept of the "Peer Mentoring Group" with two believers on your list of 100.', 'zume' ),
            ],
        ],





        /***************************************************************************************************************
         *
         *
         *
         *
         *      20 SESSION 20
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 's2_20_1',
            'type' => 'title',
            'menu' => [
                __( 'SESSION 20', 'zume' ),
            ],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png',  // location image
                __( 'SESSION 20', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 's2_20_2',
            'type' => 'checkin',
            'menu' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'CHECK-IN', 'zume' ),
            ],
            'right' => [
                __( 'Have all of the participants and facilitator check-in.', 'zume' ),
                $checkin_base_url . '2767',
                zume_create_qr_url( $checkin_base_url . '2767' ),
                __( 'Or zume.training/checkin and use code:', 'zume' ),
                '2767'
            ],
        ],
        [
            'key' => 's2_20_3',
            'type' => 'pray',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'PRAY', 'zume' ),
            ],
            'right' => [
                __( 'Pray and thank God that He is faithful to complete His good work in us.', 'zume' ),
                __( 'Ask Him to give your group clear heads and open hearts to the great things He wants to do in and through you.', 'zume' ),
                __( 'Ask the Holy Spirit to lead your time together and thank Him for His faithfulness, too. He got you through!', 'zume' ),
            ],
        ],
        [
            'key' => 's2_20_4',
            'type' => 'look_back',
            'menu' => [],
            'length' => [5],
            'center' => [],
            'left' => [
                __( 'LOOK BACK', 'zume' ),
            ],
            'right' => [
                __( 'Before getting started, take some time to look back.', 'zume' ),
                __( 'At the end of the last session, everyone in your group was challenged to practice what you learned.', 'zume' ),
                __( 'Take a few moments to see how your group did this week.', 'zume' ),
            ],
        ],
        [
            'key' => 's2_20_5',
            'type' => 'center',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'Be encouraged ...', 'zume' ),
                __( 'You may not know it, but you now have more practical training on starting simple churches and making disciples who multiply than many pastors and missionaries around the world!', 'zume' ),
                __( 'Yet Zúme Training is only the beginning! In this session, we will make a plan for what happens post-training.', 'zume' ),
            ],
            'right' => [
            ],
        ],
        [
            'key' => 's2_20_6',
            'type' => 'overview',
            'menu' => [],
            'length' => [],
            'center' => [],
            'left' => [
                __( 'OVERVIEW', 'zume' ),
            ],
            'right' => [
                __( 'In this session, we will add this tool to our toolkit:', 'zume' ),
                [
                    __( 'Three-Month Plan', 'zume' ),
                ],
            ],
        ],






        /***************************************************************************************************************
         *
         *
         *
         *
         *     Final Slides (repeated on all versions)
         *
         *
         *
         *
         **************************************************************************************************************/
        [
            'key' => 'next_steps',
            'type' => 'activity',
            'menu' => [],
            'length' => [],
            'center' => [
                __( 'NEXT STEP', 'zume' ),
            ],
            'left' => [
                __( 'Join a Community', 'zume' ),
                __( 'The training portion of Zúme is ending, but the practicing of tools and concepts continues.', 'zume' ),
                __( 'Don‘t do it alone. Find a community for encouragement and growth.', 'zume' ),
                __( 'Join Zume community using the QR code.', 'zume' ),
            ],
            'right' => [
                $other_page_base_url . 'join_the_community',
                zume_create_qr_url( $other_page_base_url . 'join_the_community' ),
                __( 'Join the Community', 'zume' ),
            ],
        ],
        [
            'key' => 'congratulations',
            'type' => 'congratulations',
            'menu' => [],
            'length' => [],
            'center' => [
                __( 'CONGRATULATIONS on completing Zume Training!', 'zume' ),
                'https://storage.googleapis.com/zume-file-mirror/images/VideoGraphic-2.svg',
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 'break',
            'type' => 'break',
            'menu' => [],
            'length' => [],
            'center' => [
                __( 'TAKE A BREAK', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],
        [
            'key' => 'final',
            'type' => 'final',
            'menu' => [],
            'length' => [],
            'center' => [
                'https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png', // Zume logo
                __( 'To saturate the world with multiplying disciples in our generation.', 'zume' ),
                'https://storage.googleapis.com/zume-file-mirror/en/jesus-globe.png', // Jesus globe
                __( 'Zume is a community of practice for those who want to see disciple making movements.', 'zume' ),
            ],
            'left' => [],
            'right' => [],
        ],

    ]; // end course array

    set_transient( __FUNCTION__.'_'.$lang_code, $content, 24 * HOUR_IN_SECONDS );

    return $content;

} // end function
