<?php //phpcs:ignore ?>
<?php

/**
 * This variable is a translation placeholder for when we create the customizable gospel presentation. It will be included in the course-content.php file. in the future.
 */
$three_circles_for_translation = [
    [
        'key' => 't10_a',
        'type' => 'center',
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
        'center' => [],
        'left' => [
            __( 'DISCUSS', 'zume' ),
            __( '(10 min)', 'zume' ),
        ],
        'right' => [
            [
                __( 'What comes to mind when you hear God’s command to be His "witness" and to tell His story?', 'zume' ),
                __( 'Why do you think Jesus chose ordinary people instead of some other way to share His good news?', 'zume' ),
                __( 'What would it take for you to feel more comfortable sharing God’s story?', 'zume' ),
            ],
        ],
    ],
    [
        'key' => 't10_c',
        'type' => 'watch',
        'center' => [],
        'left' => [
            __( 'WATCH', 'zume' ),
            __( '(5 min)', 'zume' ),
        ],
        'right' => [
            __( 'The Gospel', 'zume' ),
            __( 'One way to share God‘s good news is by using a visual presentation called 3 Circles.', 'zume' ),
        ],
    ],
    [
        'key' => 't10_d',
        'type' => 'video',
        'center' => [
            Zume_Course::get_video_by_key( '10', true, $lang_code = 'en' ), // video
        ],
        'left' => [],
        'right' => [],
    ],
    [
        'key' => 't10_e',
        'type' => 'discuss',
        'center' => [],
        'left' => [
            __( 'DISCUSS', 'zume' ),
            __( '(10 min)', 'zume' ),
        ],
        'right' => [
            [
                __( 'What do you learn about mankind from this story?', 'zume' ),
                __( 'What do you learn about God?', 'zume' ),
                __( 'Do you think it would be easier or harder to share God’s story by telling a story like this?', 'zume' ),
            ],
        ],
    ],
    // coaching checklist alternative version
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
                __( 'Select a person from your list of 100.', 'zume' ),
                __( 'Use the coaching checklist and evaluate your selected person. Ask yourself, "What does this person need for each of the tools and concepts?"', 'zume' ),
                __( 'Check off the checklist.', 'zume' ),

            ],
        ],
        'right' => [
//            $activity_base_url . 'coaching_mawl',
//            create_qr_url( $activity_base_url . 'coaching_mawl' ),
            __( 'Activity Resource', 'zume' ),
        ],
    ],
    // alternate version of the coaching checklist activity
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
            ],
        ],
        'right' => [
//            $activity_base_url . 'coachingchecklist',
//            create_qr_url( $activity_base_url . 'coachingchecklist' ),
            __( 'Activity Resource', 'zume' ),
        ],
    ],
];
