<?php

function get_sessions( $sessions = '10' ) {
    $ten_sessions = [
        array(
            't' => 'Session 1 (10)',
            'assets' => array(
                array(
                    'type' => 'pdf',
                    'key' => 'guidebook',
                ),
                array(
                    'type' => 'video',
                    'key' => 'welcome',
                ),
                array(
                    'type' => 'video',
                    'key' => 'teach-them-to-obey',
                ),
                array(
                    'type' => 'video',
                    'key' => 'spiritual-breathing',
                ),
                array(
                    'type' => 'audio',
                    'key' => 'soaps',
                ),
                array(
                    'type' => 'audio',
                    'key' => 'accountability-group',
                ),
            ),
            'sections' => array(
                array(
                    't' => __( 'Welcome to Zúme', 'zume' ),
                    'parts' => array(
                        array(
                            'type' => 'checkin',
                            't' => __( 'Checkin', 'zume' ),
                            'info' => __( 'Have all of the participants of the training check-in', 'zume' ),
                        ),
                        array(
                            'type' => 'cta',
                            't' => __( 'Download', 'zume' ),
                            'd' => __( 'You will be able to follow along on a digital PDF for this session, but please make sure that each member of your group has a printed copy of the materials for future sessions.', 'zume' ),
                            'payload' => array(
                                'label' => __( 'DOWNLOAD GUIDEBOOK', 'zume' ),
                                'key' => 'guidebook',
                            ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'Group Prayer (5min)', 'zume' ),
                    'info' => __( 'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.', 'zume' ),
                    'duration' => 5,
                ),
                array(
                    't' => __( 'God Uses Ordinary People', 'zume' ),
                    'd' => __( 'You\'ll see how God uses ordinary people doing simple things to make a big impact.', 'zume' ),
                    'duration' => 15,
                    'parts' => array(
                        array(
                            'type' => 'watch',
                            't' => __( 'WATCH', 'zume' ),
                            'd' => __( 'God uses ordinary people doing simple things to make a big impact. Watch this video on how God works.', 'zume' ),
                            'payload' => array(
                                'video' => 'welcome',
                                'script' => 'welcome-script',
                                'scriptLabel' => __( 'Zúme Video Scripts: Welcome', 'zume' ),
                            ),
                        ),
                        array(
                            'type' => 'discuss',
                            't' => __( 'DISCUSS', 'zume' ),
                            'd' => __( 'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?', 'zume' ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'Simple Definition of Disciple and Church', 'zume' ),
                    'd' => __( 'Discover the essence of being a disciple, making a disciple, and what is the church.', 'zume' ),
                    'duration' => 15,
                    'parts' => array(
                        array(
                            'type' => 'watch',
                            't' => __( 'WATCH', 'zume' ),
                            'd' => __( 'What is a disciple? And how do you make one? How do you teach a follower of Jesus to do what He told us in His Great Commission – to obey all of His commands?', 'zume' ),
                            'payload' => array(
                                'video' => 'teach-them-to-obey',
                                'script' => 'teach-them-to-obey-script',
                                'scriptLabel' => __( 'Zúme Video Scripts: Teach Them to Obey', 'zume' ),
                            ),
                        ),
                        array(
                            'type' => 'discuss',
                            't' => __( 'DISCUSS', 'zume' ),
                            'questions' => array(
                                __( 'When you think of a church, what comes to mind?', 'zume' ),
                                __( 'What\'s the difference between that picture and what\'s described in the video as a "Simple Chur<?php echo esc_url() ?>"S.O.A.P.S. Bible Reading<?php echo esc_url() ?>"Accountability Groups" section of your' ),
                            ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'LOOKING FORWARD', 'zume' ),
                    'd' => __( 'Congratulations! You\'ve completed Session 1.', 'zume' ),
                    'info' => __( 'Below are next steps to take in preparation for the next session.', 'zume' ),
                    'parts' => array(
                        array(
                            't' => __( 'OBEY', 'zume' ),
                            'd' => __( 'Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.', 'zume' ),
                        ),
                        array(
                            't' => __( 'SHARE', 'zume' ),
                            'd' => __( 'Spend time asking God who He might want you to start an Accountability Group with using the tools you\'ve learned in this session. Share this person’s name with the group before you go. Reach out to that person about starting an Accountability Group and meeting with you weekly.', 'zume' ),
                        ),
                        array(
                            't' => __( 'PRAY', 'zume' ),
                            'd' => __( 'Pray that God helps you be obedient to Him and invite Him to work in you and those around you!', 'zume' ),
                        ),
                        array(
                            't' => '#ZumeProject',
                            'd' => __( 'Take a picture of your S.O.A.P.S. Bible study and share it on social media.', 'zume' ),
                        ),
                    ),
                ),
            ),
        ),
        array(
            't' => 'Session 2',
            'assets' => array(
                array(
                    'type' => 'video',
                    'key' => 'producers-vs-consumers',
                ),
                array(
                    'type' => 'audio',
                    'key' => 'prayer-cycle',
                ),
                array(
                    'type' => 'image',
                    'key' => 'prayer-cycle-graphic',
                ),
                array(
                    'type' => 'audio',
                    'key' => 'list-of-100',
                ),
                array(
                    'type' => 'image',
                    'key' => 'list-of-100-page1',
                ),
                array(
                    'type' => 'image',
                    'key' => 'list-of-100-page2',
                ),
                array(
                    'type' => 'image',
                    'key' => 'list-of-100-page3',
                ),
                array(
                    'type' => 'pdf',
                    'key' => 'list-of-100-worksheet',
                ),
            ),
            'forms' => array(
                array(
                    'name' => 'list-of-100',
                ),
            ),
            'sections' => array(
                array(
                    't' => __( 'WELCOME BACK!', 'zume' ),
                    'parts' => array(
                        array(
                            'type' => 'checkin',
                            't' => __( 'Checkin', 'zume' ),
                            'info' => __( 'Have all of the participants of the training check-in', 'zume' ),
                        ),
                        array(
                            't' => __( 'CHECK-IN', 'zume' ),
                            'd' => array(
                                __( 'Before getting started, take some time to check-in.', 'zume' ),
                                __( 'At the end of the last session, everyone in your group was challenged in two ways:', 'zume' ),
                                array(
                                    __( 'You were asked to begin practicing the S.O.A.P.S. Bible reading method and keeping a daily journal.', 'zume' ),
                                    __( 'You were encouraged to reach out to someone about starting an Accountability Group.', 'zume' ),
                                ),
                                __( 'Take a few moments to see how your group did this week.', 'zume' ),
                            ),
                        ),
                        array(
                            't' => __( 'PRAY', 'zume' ),
                            'd' => __( 'Ask if anyone in the group has specific needs they would like the group to pray for. Ask someone to pray and ask God to help in the areas the group shared. Be sure to thank God that He promises in His Word to listen and act when His people pray. And, as always, ask God\'s Holy Spirit to lead your time, together.', 'zume' ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'Consumer vs Producer Lifestyle', 'zume' ),
                    'd' => __( 'You\'ll discover the four main ways God makes everyday followers more like Jesus.', 'zume' ),
                    'duration' => 15,
                    'parts' => array(
                        array(
                            'type' => 'watch',
                            't' => __( 'WATCH', 'zume' ),
                            'd' => array(
                                __( 'If we want to make disciples who multiply – spiritual producers and not just consumers – then we need to learn and share four main ways God makes everyday followers more like Jesus:', 'zume' ),
                                array(
                                    __( 'Prayer', 'zume' ),
                                    __( 'Scripture', 'zume' ),
                                    __( 'Body Life', 'zume' ),
                                    __( 'Persecution and Suffering', 'zume' ),
                                ),
                            ),
                            'payload' => array(
                                'video' => 'producers-vs-consumers',
                            ),
                        ),
                        array(
                            'type' => 'discuss',
                            't' => __( 'DISCUSS', 'zume' ),
                            'questions' => array(
                                __( 'Of the four areas detailed above (prayer, God\'s Word, etc.), which ones do you already practice?', 'zume' ),
                                __( 'Which ones do you feel unsure about?', 'zume' ),
                                __( 'How ready do you feel when it comes to training others?', 'zume' ),
                            ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'How to Spend an Hour in Prayer', 'zume' ),
                    'd' => __( 'See how easy it is to spend an hour in prayer.', 'zume' ),
                    'duration' => 2,
                    'parts' => array(
                        array(
                            'type' => 'read',
                            'd' => array(
                                array(
                                    't' => __( 'Prayer Cycle', 'zume' ),
                                    'd' => __( 'The Bible tells us that prayer is our chance to speak to and hear from the same God who created us!', 'zume' ),
                                ),
                            ),
                        ),
                        array(
                            'type' => 'listen',
                            'payload' => array(
                                'audio' => 'prayer-cycle',
                            ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'Practice the Prayer Cycle (60min)', 'zume' ),
                    'duration' => 60,
                    'parts' => array(
                        array(
                            't' => __( 'LEAVE', 'zume' ),
                            'd' => __( 'Spend the next 60 minutes in prayer individually, using the exercises in "The Prayer Cycle" section of the Zúme Guidebook as a guide.', 'zume' ),
                        ),
                        array(
                            't' => __( 'RETURN', 'zume' ),
                            'd' => __( 'Set a time for the group to return and reconnect. Be sure to add a few extra minutes for everyone to both find a quiet place to pray and to make their way back to the group.', 'zume' ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'DISCUSS', 'zume' ),
                    'duration' => 5,
                    'parts' => array(
                        array(
                            'type' => 'discuss',
                            'questions' => array(
                                __( 'What is your reaction to spending an hour in prayer?', 'zume' ),
                                __( 'How do you feel?', 'zume' ),
                                __( 'Did you learn or hear anything?', 'zume' ),
                                __( 'What would life be like if you made this kind of prayer a regular habit?', 'zume' ),
                            ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'Relational Stewardship – List of 100', 'zume' ),
                    'd' => __( 'A tool designed to help you be a good steward of your relationships.', 'zume' ),
                    'duration' => 2,
                    'parts' => array(
                        array(
                            'type' => 'read',
                            'd' => array(
                                array(
                                    't' => __( 'List of 100', 'zume' ),
                                    'd' => array(
                                        __( 'God has already given us the relationships we need to “Go and make disciples.” These are our family, friends, neighbors, co-workers and classmates – people we’ve known all our lives or maybe just met.', 'zume' ),
                                        __( 'Being good stewards of these relationships is the first step in multiplying disciples. Start by making a list.', 'zume' ),
                                    ),
                                ),
                            ),
                        ),
                        array(
                            'type' => 'listen',
                            'payload' => array(
                                'audio' => 'list-of-100',
                            ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'Project (30min)', 'zume' ),
                    'duration' => 30,
                    'parts' => array(
                        array(
                            'type' => 'form',
                            't' => __( 'Create your own list of 100', 'zume' ),
                            'd' => __( 'Have everyone in your group take the next 30 minutes to fill out their own inventory of relationships using the form in the "List of 100" section in your Zúme Guidebook. ', 'zume' ),
                            'payload' => array(
                                'name' => 'list-of-100',
                                'downloadLabel' => __( 'Download', 'zume' ),
                                'downloadKey' => 'list-of-100-worksheet',
                            ),
                        ),
                    ),
                ),
                array(
                    't' => __( 'LOOKING FORWARD', 'zume' ),
                    'd' => __( 'Congratulations on finishing Session 2! ', 'zume' ),
                    'info' => __( 'Below are next steps to take in preparation for the next session.', 'zume' ),
                    'parts' => array(
                        array(
                            't' => __( 'OBEY', 'zume' ),
                            'd' => __( 'Spend time this week praying for five people from your List of 100 that you marked as an "Unbeliever" or "Unknown." Ask God to prepare their hearts to be open to His story.', 'zume' ),
                        ),
                        array(
                            't' => __( 'SHARE', 'zume' ),
                            'd' => __( 'Ask God who He wants you to share the List of 100 tool with. Share this person\'s name with the group before you go and reach out to them before the next session.', 'zume' ),
                        ),
                        array(
                            't' => __( 'PRAY', 'zume' ),
                            'd' => __( 'Pray that God help you be obedient to Him and invite Him to work in you and those around you!', 'zume' ),
                        ),
                        array(
                            't' => '#ZumeProject',
                            'd' => __( 'Think others could use the 60-minute prayer tool? Share about it on social media.', 'zume' ),
                        ),
                    ),
                ),
            ),
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
