<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * zume_course_slide_template()
 * zume_course_slide_css()
 */

function zume_course_slide_template( $slide ) {

    switch ( $slide['type'] ) {
        case 'title':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <title-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></title-slide>
            </div>
            <?php
            break;
        case 'checkin':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <checkin-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></checkin-slide>
            </div>
            <?php
            break;
        case 'pray':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <pray-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></pray-slide>
            </div>
            <?php
            break;
        case 'review':
        case 'overview':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <overview-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></overview-slide>
            </div>
            <?php
            break;
        case 'challenge':
        case 'center':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <center-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></center-slide>
            </div>
            <?php
            break;
        case 'watch':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <watch-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></watch-slide>
            </div>
            <?php
            break;
        case 'video':
            ?>
            <div class="video-slide">
                <video-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></video-slide>
            </div>
            <?php
            break;
        case 'discuss':
        case 'look_back':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <discuss-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></discuss-slide>
            </div>
            <?php
            break;
        case 'left_content':
        case 'activity':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <activity-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></activity-slide>
            </div>
            <?php
            break;
        case 'obey':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <obey-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></obey-slide>
            </div>
            <?php
            break;
        case 'left_image':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <left-image-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></left-image-slide>
            </div>
            <?php
            break;
        case 'next_steps':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <next-steps-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></next-steps-slide>
            </div>
            <?php
            break;
        case 'break':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <break-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></break-slide>
            </div>
            <?php
            break;
        case 'congratulations':
            ?>
            <div class="slides-card">
                <congratulations-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></congratulations-slide>
            </div>
            <?php
            break;
        case 'final':
            ?>
            <div class="slides-card">
                <final-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></final-slide>
            </div>
            <?php
            break;
        default:
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>"><?php echo $slide['progress_bar']; ?></div>
                <course-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></course-slide>
            </div>
            <?php
            break;

    }
}

function zume_course_slide_css( $build ) {
    ?>
    <style>
        #blank-template-body {
            padding: 1em;
        }
        /* progress bar row */
        .stage {
            height: 30px;
            padding-top: 10px;
            text-align: center;
            background-color: white !important;
            margin-bottom: 5px;
        }
        .progress-bar-wrapper {
            width: fit-content;
            background-image: url('https://storage.googleapis.com/zume-file-mirror/images/horizontal-line.png');
            background-repeat: repeat-x;
            height: 20px;
            margin: 0 auto;
        }
        .progress-bar-item {
            width: 17px;
            height: 17px;
            border: 1px solid lightgrey;
            background: white;
            float:left;
        }
        .progress-bar-divider {
            width: 17px;
            height: 17px;
            float:left;
        }
        <?php
            // itemized progress bar active incicator. Puts blue background on active slide
           foreach( $build as $slide ) {
               echo '.' . $slide['key'] . '-bar .' . $slide['key'] . '-bar { background-color: #5dccff; }';
           }
        ?>
    </style>

    <?php
}
