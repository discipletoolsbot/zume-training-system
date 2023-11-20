<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Content {
    public static function get( ) {
        $content = [];

        self::session_1( $content );

        return $content;

    }

    public static function session_1( &$content) {

        $panel = 'panel_1';
        $content[$panel][] = __( 'Welcome to Zúme', 'zume' );
        $content[$panel][] = __( 'Checkin', 'zume' );

        $panel = 'panel_2';
        $content[$panel][] = __( 'Group Prayer (5min)', 'zume' );
        $content[$panel][] = __( 'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.', 'zume' );

        $panel = 'panel_3';
        $content[$panel][] = __( 'Watch and Discuss (15min)', 'zume' );
        $content[$panel][] = __( 'God uses ordinary people doing simple things to make a big impact. Watch this video on how God works.', 'zume' ) ;
        $content[$panel][] = esc_url( zume_mirror_url() . zume_current_language() ) . '/1.mp4';
        $content[$panel][] = esc_url( Zume_Course::get_video_by_key( '1' ) );
        $content[$panel][] = esc_url( Zume_Course::get_download_by_key( '34' ) );
        $content[$panel][] = __( 'DISCUSS', 'zume' );
        $content[$panel][] = __( 'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?', 'zume' );

        $panel = 'panel_4';
        $content[$panel][] = __( 'Watch and Discuss (15min)', 'zume' );
        $content[$panel][] = __( 'What is a disciple? And how do you make one? How do you teach a follower of Jesus to do what He told us in His Great Commission – to obey all of His commands?', 'zume' );
        $content[$panel][] = esc_url( zume_mirror_url() . zume_current_language() ) . '/2.mp4';
        $content[$panel][] = esc_url( Zume_Course::get_video_by_key( '2' ) );
        $content[$panel][] = esc_url( Zume_Course::get_download_by_key( '35' ) );
        $content[$panel][] = __( 'Zúme Video Scripts: Teach Them to Obey', 'zume' );
        $content[$panel][] = __( 'DISCUSS', 'zume' );
        $content[$panel][] = __( 'When you think of a church, what comes to mind?', 'zume' );
        $content[$panel][] = __( 'What’s the difference between that picture and what’s described in the video as a "Simple Church"?', 'zume' );
        $content[$panel][] = __( 'Which one do you think would be easier to multiply and why?', 'zume' );

        $panel = 'panel_5';
        $content[$panel][] = __( 'Watch and Discuss (15min)', 'zume' );
        $content[$panel][] = __( 'We breathe in. We breathe out. We’re alive. Spiritual Breathing is like that, too.', 'zume' );
        $content[$panel][] = esc_url( zume_mirror_url() . zume_current_language() ) . '/3.mp4';
        $content[$panel][] = esc_url( Zume_Course::get_video_by_key( '3' ) );
        $content[$panel][] = __( 'Zúme Video Scripts: Spiritual Breathing', 'zume' );
        $content[$panel][] = __( 'DISCUSS', 'zume' );
        $content[$panel][] = __( 'Why is it essential to learn to hear and recognize God’s voice?', 'zume' );
        $content[$panel][] = __( 'Is hearing and responding to the Lord really like breathing? Why or why not?', 'zume' );

        $panel = 'panel_6';
        $content[$panel][] = __( 'Listen and Read Along (3min)', 'zume' );
        $content[$panel][] = __( 'S.O.A.P.S. Bible Reading', 'zume' );
        $content[$panel][] = __( 'Hearing from God regularly is a key element in our personal relationship with Him, and in our ability to stay obediently engaged in what He is doing around us.', 'zume' );
        $content[$panel][] = __( 'Find the "S.O.A.P.S. Bible Reading" section in your Zúme Guidebook and listen to the audio overview.', 'zume' );
        $content[$panel][] = esc_url( zume_mirror_url() . zume_current_language() ) . '/4.mp4';
        $content[$panel][] = esc_url( Zume_Course::get_video_by_key( '4' ) );
        $content[$panel][] = esc_url( Zume_Course::get_download_by_key( '37' ) );

        $panel = 'panel_7';
        $content[$panel][] = __( 'Listen and Read Along (3min)', 'zume' );
        $content[$panel][] = __( 'Accountability Groups', 'zume' );
        $content[$panel][] = __( 'The Bible tells us that every follower of Jesus will one day be held accountable for what we do and say and think. Accountability Groups are a great way to get ready!', 'zume' );
        $content[$panel][] = __( 'Find the "Accountability Groups" section in your Zúme Guidebook, and listen to the audio below.', 'zume' );
        $content[$panel][] = esc_url( zume_mirror_url() . zume_current_language() ) . '/5.mp4';
        $content[$panel][] = esc_url( Zume_Course::get_video_by_key( '5' ) );
        $content[$panel][] = esc_url( Zume_Course::get_download_by_key( '38' ) );
        $content[$panel][] = __( 'Zúme Video Scripts: Accountability Groups', 'zume' );


        $panel = 'panel_8';
        $content[$panel][] = __( 'Practice (45min)', 'zume' );
        $content[$panel][] = __( 'BREAK UP', 'zume' );
        $content[$panel][] = __( 'Break into groups of two or three people of the same gender.', 'zume' );
        $content[$panel][] = __( 'SHARE', 'zume' );
        $content[$panel][] = __( 'Spend the next 45 minutes working together through Accountability Questions – List 2 in the "Accountability Groups" section of your', 'zume' );
        $content[$panel][] = esc_url( Zume_Course::get_download_by_key( '33' ) );
        $content[$panel][] = __( 'Zúme Guidebook', 'zume' );

        $panel = 'panel_9';
        $content[$panel][] = __( 'LOOKING FORWARD', 'zume' );
        $content[$panel][] = __( 'Congratulations! You’ve completed Session 1.', 'zume' );
        $content[$panel][] = __( 'Below are next steps to take in preparation for the next session.', 'zume' );
        $content[$panel][] = __( 'OBEY', 'zume' );
        $content[$panel][] = __( 'Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.', 'zume' );
        $content[$panel][] = __( 'SHARE', 'zume' );
        $content[$panel][] = __( 'Spend time asking God who He might want you to start an Accountability Group with using the tools you’ve learned in this session. Share this person’s name with the group before you go. Reach out to that person about starting an Accountability Group and meeting with you weekly.', 'zume' );
        $content[$panel][] = __( 'PRAY', 'zume' );
        $content[$panel][] = __( 'Pray that God helps you be obedient to Him and invite Him to work in you and those around you!', 'zume' );
        $content[$panel][] = __( 'Take a picture of your S.O.A.P.S. Bible study and share it on social media.', 'zume' );


        return $content;

    }

}
