<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Content {
    public static function get( ) {


    }

    public static function blocks( $array = [], $tool_number = 0 ) {

        $array[] = [
            'key' => 't1_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'God Uses Ordinary People',
                'God uses ordinary people doing simple things to make a big impact.'
            ],
        ];
        $array[] = [
            'key' => 't1_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '1', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't1_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?'
            ],
        ];

    if ( $tool_number == 1 ) {
        $array[] = [
            'key' => 't1_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'God Uses Ordinary People',
                'God uses ordinary people doing simple things to make a big impact.'
            ],
        ];
        $array[] = [
            'key' => 't1_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '1', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't1_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?'
            ],
        ];
    }
    else if ( $tool_number === 2 ) {
        $array[] = [
            'key' => 't2_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Disciples and the Church',
                'Discover the essence of being a disciple, making a disciple, and what is the church.'
            ],
        ];
        $array[] = [
            'key' => 't2_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '2', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 'b2_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'When you think of a church, what comes to mind?',
                    'What’s the difference between that picture and what’s described in the video as a "Simple Church"?',
                    'Which one do you think would be easier to multiply and why?'
                ]
            ],
        ];
    }
    else if ( $tool_number === 3 ) {
        $array[] = [
            'key' => 't3_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Hearing and Obeying God',
                'Spiritual breathing. We breathe in. We breathe out. We’re alive. Hearing and obeying God is like that, too.'
            ],
        ];
        $array[] = [
            'key' => 't3_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '3', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't3_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Why is it essential to learn to hear and recognize God’s voice?',
                    'Is hearing and responding to the Lord really like breathing? Why or why not?',
                ]
            ],
        ];
    }
    else if ( $tool_number === 4 ) {
        $array[] = [
            'key' => 't4_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'SOAPS Bible Reading',
                'Hearing from God regularly is a key element in our personal relationship with Him, and in our ability to stay obediently engaged in what He is doing around us.',
            ],
        ];
        $array[] = [
            'key' => 't4_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '4', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],

        ];
        // @todo add a discussion
    }
    else if ( $tool_number === 5 ) {
        $array[] = [
            'key' => 't5_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Accountability Groups',
                'The Bible tells us that every follower of Jesus will one day be held accountable for what we do and say and think.',
                'Accountability Groups are a great way to get ready!'
            ],
        ];
        $array[] = [
            'key' => 't5_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '5', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't5_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(20 min)',
            ],
            'left' => [
                'Practice Accountability Groups',
                'Break into groups of two or three people of the same gender.',
                'Spend the next 20 minutes working together through the Accountability Questions.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ];
    }
    else if ( $tool_number === 6 ) {
        $array[] = [
            'key' => 't6_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Producers vs Consumers',
                'If we want to make disciples who multiply – spiritual producers and not just consumers – then we need to learn and share four main ways God makes everyday followers more like Jesus:',
                [
                    'Prayer',
                    'Scripture',
                    'Body Life',
                    'Persecution and Suffering'
                ]
            ],
        ];
        $array[] = [
            'key' => 't6_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '6', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't6_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Of the four areas detailed above (prayer, God’s Word, etc.), which ones do you already practice?',
                    'Which ones do you feel unsure about?',
                    'How ready do you feel when it comes to training others?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 7 ) {

        $array[] = [
            'key' => 't7_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH'
            ],
            'right' => [
                'Prayer Cycle',
                'The Bible tells us that prayer is our chance to speak to and hear from the same God who created us!',
            ],
        ];
        $array[] = [
            'key' => 't7_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '7', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't7_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(60 min)'
            ],
            'left' => [
                'Pray the Prayer Cycle for an hour individually',
                'Set a time for the group to return and reconnect. Be sure to add a few extra minutes for everyone to both find a quiet place to pray and to make their way back to the group.'
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ];
        $array[] = [
            'key' => 't7_d',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'What is your reaction to spending an hour in prayer?',
                    'How do you feel?',
                    'Did you learn or hear anything?',
                    'What would life be like if you made this kind of prayer a regular habit?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 8 ) {

        $array[] = [
            'key' => 't8_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH'
            ],
            'right' => [
                'List of 100',
                'God has already given us the relationships we need to "Go and make disciples."',
                'These are our family, friends, neighbors, co-workers and classmates – people we’ve known all our lives or maybe just met.',
                'Stewarding the relationships you have is the best place to start.',
            ],
        ];
        $array[] = [
            'key' => 't8_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '8', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't8_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(30 min)'
            ],
            'left' => [
                'Create your own list of 100',
                'Have everyone in your group take the next 30 minutes to fill out their own list of relationships. List as many as you can.',
                'Then mark your best understanding of their relationship to God: disciple, unbeliever, or unknown.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ];
    }
    else if ( $tool_number === 9 ) {

        $array[] = [
            'key' => 't9_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Spiritual Economy',
                'In this broken world, people feel rewarded when they take, when they receive and when they gain more than those around them. But God’s Spiritual Economy is different – God invests more in those who are faithful with what they’ve already been given.'
            ],
        ];
        $array[] = [
            'key' => 't9_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '9', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't9_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                'What are some differences you see between God’s Spiritual Economy and our earthly way of getting things done?',
            ],
        ];
    }
    else if ( $tool_number === 10 ) {
        $array[] = [
            'key' => 't10_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'The Gospel',
                'One way to share God’s Good News is by telling God’s Story from Creation to Judgement – from the beginning of humankind all the way to the end of this age.',
            ],
        ];
        $array[] = [
            'key' => 't10_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '10', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't10_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'What do you learn about mankind from this story?',
                    'What do you learn about God?',
                    'Do you think it would be easier or harder to share God’s Story by telling a story like this?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 11 ) {

        $array[] = [
            'key' => 't11_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Baptism',
                'Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…”',
            ],
        ];
        $array[] = [
            'key' => 't11_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '11', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't11_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Have you ever baptized someone?',
                    'Would you even consider it?',
                    'If the Great Commission is for every follower of Jesus, does that mean every follower is allowed to baptize others? Why or why not?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 12 ) {

        $array[] = [
            'key' => 't12_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                '3-Minute Testimony',
                'As followers of Jesus, we are “witnesses" for Him, because we “testify” about the impact Jesus has had on our lives. Your story of your relationship with God is called your Testimony. It’s powerful, and it’s something no one can share better than you.',
            ],
        ];
        $array[] = [
            'key' => 't12_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '12', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't12_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(20 min)'
            ],
            'left' => [
                'Share your testimony',
                'Break into groups of two or three and practice sharing your testimony.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ];

    }
    else if ( $tool_number === 13 ) {

        $array[] = [
            'key' => 't13_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Great - Greater - Greatest Blessings',
                'Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.',
            ],
        ];
        $array[] = [
            'key' => 't13_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '13', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't13_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Is this the pattern you were taught when you first began to follow Jesus? If not, what was different?',
                    'After you came to faith, how long was it before you began to disciple others?',
                    'What do you think would happen if new followers started sharing and discipling others, immediately?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 14 ) {

        $array[] = [
            'key' => 't14_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Duckling Discipleship',
                'What do ducklings have to do with disciple making? They lead and follow at the same time.',
            ],
        ];
        $array[] = [
            'key' => 't14_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '14', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't14_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'What is one area of discipleship (reading/understanding the Bible, praying, sharing God’s Story, etc.) that you want to learn more about? Who is someone that could help you learn?',
                    'What is one area of discipleship that you feel you could share with others? Who is someone that you could share with?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 15 ) {

        $array[] = [
            'key' => 't15_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Eyes to See Where the Kingdom Isn’t',
                'Have you ever stopped to think about where God’s Kingdom... isn’t?',
                'Have you ever visited a home or a neighborhood or even a city where it seemed as if God was just... missing? These are usually the places where God wants to work the most.',
            ],
        ];
        $array[] = [
            'key' => 't15_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '15', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't15_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)'
            ],
            'right' => [
                [
                    'Who are you more comfortable sharing with -- people you already know or people you haven’t met, yet?',
                    'Why do you think that is?',
                    'How could you get better at sharing with people you’re less comfortable with?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 16 ) {

        $array[] = [
            'key' => 't16_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'The Lord’s Supper',
                'Jesus said, “I am the living bread that came down from heaven. Whoever eats this bread will live forever. This bread is my flesh, which I will give for the life of the world.”',
            ],
        ];
        $array[] = [
            'key' => 't16_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '16', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't16_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(10 min)'
            ],
            'left' => [
                'Celebrate the Lord’s Supper',
                'Spend the next 10 minutes celebrating The Lord’s Supper with your group.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ];

    }
    else if ( $tool_number === 17 ) {

        $array[] = [
            'key' => 't17_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Prayer Walking',
                'Prayer Walking is a simple way to obey God’s command to pray for others. And it’s just what it sounds like – praying to God while walking around!',
            ],
        ];
        $array[] = [
            'key' => 't17_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '17', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];

    }
    else if ( $tool_number === 18 ) {

        $array[] = [
            'key' => 't18_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Person of Peace',
                'Disciple-making can be rapidly advanced by finding a person of peace, even in a place where followers of Jesus are few and far between.',
            ],
        ];
        $array[] = [
            'key' => 't18_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '18', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't18_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Can someone who has a "bad reputation" (like the Samaritan woman or the demon-possessed man in the Gadarenes) really be a Person of Peace? Why or why not?',
                    'What is a community or segment of society near you that seems to have little (or no) Kingdom presence?',
                    'How could a Person of Peace (someone who is OPEN, HOSPITABLE, KNOWS OTHERS and SHARES) accelerate the spread of the Gospel in that community?',
                ]
            ],
        ];

    }
//    else if ( $tool_number === 19 ) {
//
//    }
    else if ( $tool_number === 20 ) {

        $array[] = [
            'key' => 't20_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Faithfulness',
                'When we help multiply disciples, we need to make sure we’re reproducing the right things. It’s important what disciples know – but it’s much more important what they DO with what they know.',
            ],
        ];
        $array[] = [
            'key' => 't20_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '20', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't20_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'Think about God’s commands that you already know. How "faithful" are you in terms of obeying and sharing those things?'
            ],
        ];

    }
    else if ( $tool_number === 21 ) {

        $array[] = [
            'key' => 't21_a',
            'type' => 'activity_center',
            'center' => [
                'ACTIVITY',
                '(75 min)',
            ],
            'left' => [
                '3/3 Group Meeting Pattern',
                'In the following video, you’ll be coached through an interactive 3/3 Group where you’ll learn a principle and then “press pause” and practice it with the group.',
            ],
            'right' => [],
        ];
        $array[] = [
            'key' => 't21_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '21', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't21_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Did you notice any differences between a 3/3 Group and a Bible Study or Small Group you’ve been a part of (or have heard about) in the past? If so, how would those differences impact the group?',
                    'Could a 3/3 Group be considered a Simple Church? Why or why not?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 22 ) {

        $array[] = [
            'key' => 't22_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'The Training Cycle',
                'Have you ever learned how to ride a bicycle? Have you ever helped someone else learn? If so, chances are you already know the Training Cycle.',
            ],
        ];
        $array[] = [
            'key' => 't22_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '22', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't22_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Have you ever been a part of a Training Cycle?',
                    'Who did you train? Or who trained you?',
                    'Could the same person be at different parts of the Training Cycle while learning different skills?',
                    'What would it look like to train someone like that?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 23 ) {

        $array[] = [
            'key' => 't23_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Leadership Cells',
                'Jesus said, “Whoever wishes to become great among you shall be your servant.”',
                'A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.',
            ],
        ];
        $array[] = [
            'key' => 't23_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '23', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't23_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Is there a group of followers of Jesus you know that are already meeting or would be willing to meet and form a Leadership Cell to learn Zúme Training?',
                    'What would it take to bring them together?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 24 ) {

        $array[] = [
            'key' => 't24_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Non-Sequential Growth',
                'When people think about disciples multiplying, they often think of it as a step-by-step process. The problem with that is — that’s not how it works best!',
            ],
        ];
        $array[] = [
            'key' => 't24_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '24', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't24_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'What is the most exciting idea you heard in this video? Why?',
                    'What is the most challenging idea? Why?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 25 ) {

        $array[] = [
            'key' => 't25_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Pace',
                'Multiplying matters and multiplying quickly matters even more. Pace matters because where we all spend our eternity — an existence that outlasts time — is determined in the very short time we call “life.“',
            ],
        ];
        $array[] = [
            'key' => 't25_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '25', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't25_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Why is pace important?',
                    'What do you need to change in your thinking, your actions, or your attitude to be better aligned with God’s priority for pace?',
                    'What is one thing you can do starting this week that will make a difference?',
                ]
            ],
        ];

    }
    else if ( $tool_number === 26 ) {

        $array[] = [
            'key' => 't26_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Always Part of Two Churches',
                'Jesus taught us that we are to stay close — to live as a small, spiritual family, to love and give our lives to one another, to celebrate and suffer — together.',
                'However, Jesus also taught us to leave our homes and loved ones behind and be willing to go anywhere — and everywhere — to share and start new spiritual families.',
                'So how can we do both?',
            ],
        ];
        $array[] = [
            'key' => 't26_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '26', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't26_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'What are some advantages of maintaining a consistent spiritual family that gives birth to new ones that grow and multiply, instead of continually growing a family and splitting it in order to grow?',
            ],
        ];

    }
//    else if ( $tool_number === 27 ) {
//
//    }
    else if ( $tool_number === 28 ) {

        $array[] = [
            'key' => 't28_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Coaching Checklist',
                'The Coaching Checklist is a simple tool you can use to help guide you as you assist others through various parts of becoming a fully equipped disciple.',
            ],
        ];
        $array[] = [
            'key' => 't28_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '28', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't28_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(10 min)',
            ],
            'left' => [
                'Coaching Checklist (Self-Assessment)',
                [
                    'Scan the QR code',
                    'Evaluate yourself and mark the corresponding column based on the following:',
                ]
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ];
        $array[] = [
            'key' => 't28_d',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                [
                    'Which Training Tools did you feel you would be able to train well?',
                    'Which ones made you feel vulnerable as a trainer?',
                    'Are there any Training Tools that you would add or subtract from the Checklist? Why?',
                ]
            ],
        ];
        $array[] = [
            'key' => 't28_e',
            'type' => 'review',
            'center' => [],
            'left' => [
                'REVIEW',
                '(10 min)',
            ],
            'right' => [
                'Have each person share one next step, either Modeling, Assisting, Watching, or Leaving, that you need to take with the disciple you assessed with the coaching checklist.',
            ],
        ];
        $array[] = [
            'key' => 't28_f',
            'type' => 'center',
            'center' => [
                'REMEMBER',
                'The Coaching Checklist is a powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply.',
            ],
            'left' => [],
            'right' => [],
        ];

    }
    else if ( $tool_number === 29 ) {

        $array[] = [
            'key' => 't29_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Leadership in Networks',
                'What happens to churches as they grow and start new churches that start new churches? How do they stay connected and live life together as an extended, spiritual family? They become a network!',
            ],
        ];
        $array[] = [
            'key' => 't29_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '29', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
        $array[] = [
            'key' => 't29_c',
            'type' => 'discuss',
            'center' => [],
            'left' => [
                'DISCUSS',
                '(10 min)',
            ],
            'right' => [
                'Are there advantages when networks of simple churches are connected by deep, personal relationships? What are some examples that come to mind?',
            ],
        ];

    }
    else if ( $tool_number === 30 ) {

        $array[] = [
            'key' => 't30_a',
            'type' => 'watch',
            'center' => [],
            'left' => [
                'WATCH',
            ],
            'right' => [
                'Peer Mentoring Groups',
                'Making disciples who make disciples means making leaders who make leaders. How do you develop stronger leaders? By teaching them how to love one another better. Peer Mentoring Groups help leaders love deeper.',
            ],
        ];
         $array[] = [
            'key' => 't30_b',
            'type' => 'video',
            'center' => [
                Zume_Course::get_video_by_key( '30', true, 'en' ), // video
            ],
            'left' => [],
            'right' => [],
        ];
         $array[] = [
            'key' => 't30_c',
            'type' => 'activity',
            'center' => [
                'ACTIVITY',
                '(45 min)',
            ],
            'left' => [
                'Peer Mentoring Groups',
                'Break into groups of two or three and work through the 3/3 sections of the Peer Mentoring Group format on the next slide. ',
                'Peer Mentoring is something that happens once a month or once a quarter and takes some time for the whole group to participate, so you will not have time for everyone to experience the full mentoring process in this session.',
                'To practice, choose one person in your group to be the "mentee" for this session and have the other members spend time acting as Peer Mentors by working through the suggested questions list and providing guidance and encouragement for the Mentee’s work.',
                'By the time you’re finished, everyone should have a basic understanding of asking and answering.',
            ],
            'right' => [
                'https://storage.googleapis.com/zume-file-mirror/en/qr/placeholder.png',
                'Activity Resource',
            ],
        ];

    }


    return $array;
    }



}
