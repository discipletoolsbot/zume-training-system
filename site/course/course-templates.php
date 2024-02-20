<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * zume_course_slide_template()
 * zume_course_slide_css()
 */

function zume_course_slide_template( $slide ) {

    switch( $slide['type'] ) {
        case 'title':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <div class="center-title">
                        <img src="<?php echo $slide['center'][0] ?>" /><br>
                        <h2><?php echo $slide['center'][1] ?></h2>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'checkin':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span><br>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-checkin middle">
                            <p><?php echo $slide['right'][0]; ?></p>
                            <p><img src="<?php echo $slide['right'][1]; ?>" /></p>
                            <p><?php echo $slide['right'][2]; ?> <span style="font-weight:bold;"><?php echo $slide['right'][3]; ?></span></p>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'pray':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span><br>
                            <span class="subtitle"><?php echo $slide['left'][1]; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-pray middle">
                            <?php
                            foreach( $slide['right'] as $prayer ) {
                                echo '<p>' . $prayer . '</p>';
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'review':
        case 'overview':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-lookback middle">
                            <?php
                            foreach( $slide['right'] as $p ) {
                                if ( is_array( $p ) ) {
                                    echo '<ul>';
                                    foreach( $p as $pp ) {
                                        echo '<li>' . $pp . '</li>';
                                    }
                                    echo '</ul>';
                                } else {
                                    echo '<p><strong>' . $p . '</strong></p>';
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'challenge':
        case 'center':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <strong><span class="title"><?php echo $slide['center'][0] ?? '' ?></span> <?php echo $slide['center'][1] ?? '' ?> </strong>
                </div>
                <div>
                    <div class="center-activity middle">
                        <?php
                        foreach( $slide['left'] as $i => $v ) {
                            if ( $i == 0 ) {
                                echo '<p><strong>' . $v . '</strong></p>';
                            } else {
                                if (is_array($v)) {
                                    echo '<ul>';
                                    foreach ($v as $pp) {
                                        echo '<li>' . $pp . '</li>';
                                    }
                                    echo '</ul>';
                                } else {
                                    echo '<p>' . $v . '</p>';
                                }
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'watch':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span><br>
                            <span class="subtitle"><?php echo $slide['left'][1] ?? ''; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-lookback middle">
                            <?php
                            foreach( $slide['right'] as $i => $v ) {
                                if ( $i == 0 ) {
                                    echo '<p><strong>' . $v . '</strong></p>';
                                } else {
                                    if (is_array($v)) {
                                        echo '<ul>';
                                        foreach ($v as $pp) {
                                            echo '<li>' . $pp . '</li>';
                                        }
                                        echo '</ul>';
                                    } else {
                                        echo '<p>' . $v . '</p>';
                                    }
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'video':
            ?>
            <div class="video">
                <iframe src="<?php echo $slide['center'][0] ?>?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                >
                </iframe>
            </div>
            <?php
            break;
        case 'discuss':
        case 'look_back':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-4">
                        <div class="left-single-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span><br>
                            <span class="subtitle"><?php echo $slide['left'][1] ?? ''; ?></span>
                        </div>
                    </div>
                    <div class="right-8">
                        <div class="right-8-lookback middle">
                            <?php
                            foreach( $slide['right'] as $p ) {
                                if ( is_array( $p ) ) {
                                    echo '<ul>';
                                    foreach( $p as $pp ) {
                                        echo '<li>' . $pp . '</li>';
                                    }
                                    echo '</ul>';
                                } else {
                                    echo '<p>' . $p . '</p>';
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'left_content':
        case 'activity':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <strong> <span class="title"><?php echo $slide['center'][0] ?></span>  <?php echo $slide['center'][1] ?> </strong>
                </div>
                <div>
                    <div class="left-8 ">
                        <div class="left-8-activity middle">
                            <?php
                            foreach( $slide['left'] as $i => $v ) {
                                if ( $i == 0 ) {
                                    echo '<p><strong>' . $v . '</strong></p>';
                                } else {
                                    if (is_array($v)) {
                                        echo '<ul>';
                                        foreach ($v as $pp) {
                                            echo '<li>' . $pp . '</li>';
                                        }
                                        echo '</ul>';
                                    } else {
                                        echo '<p>' . $v . '</p>';
                                    }
                                }
                            }
                            ?>
                        </div>
                    </div>
                    <div class="right-4">
                        <div class="right-4-activity">
                            <p><img src="<?php echo $slide['right'][0]; ?>" /></p>
                            <p><?php echo $slide['right'][1]; ?></p>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'obey':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="slide-row">
                    <div class="left-4-obey">
                        <div class="left-obey-title">
                            <img src="https://placehold.co/60x60/png" /> <span class="title"><?php echo $slide['left'][0]; ?></span>
                        </div>
                    </div>
                    <div class="right-8-obey">
                        <p><?php echo $slide['right'][0]; ?></p>
                    </div>
                </div>
                <div class="slide-row">
                    <div class="left-4-obey">
                        <div class="left-obey-title ">
                            <img src="https://placehold.co/60x60/png" /> <?php echo $slide['left'][1]; ?>
                        </div>
                    </div>
                    <div class="right-8-obey">
                        <p><?php echo $slide['right'][1]; ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'left_image':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div>
                    <div class="left-8 ">
                        <div class="left-8-image">
                            <p><strong><?php echo $slide['left'][0]; ?></strong></p>
                            <p><img src="<?php echo $slide['left'][1]; ?>" /></p>
                        </div>
                    </div>
                    <div class="right-4">
                        <div class="right-4-activity">
                            <p><img src="<?php echo $slide['right'][0]; ?>" /></p>
                            <p><?php echo $slide['right'][1]; ?></p>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'next_steps':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <strong><span class="title"><?php echo $slide['center'][0] ?></span></strong>
                </div>
                <div>
                    <div class="left-6">
                        <p><strong><?php echo $slide['left'][0] ?></strong></p>
                        <p><img src="<?php echo $slide['left'][2] ?>" style="width:200px;" /></p>
                        <p><?php echo $slide['left'][1] ?></p>
                    </div>
                    <div class="right-6">
                        <p><strong><?php echo $slide['right'][0] ?></strong></p>
                        <p><img src="<?php echo $slide['right'][2] ?>" style="width:200px;" /></p>
                        <p><?php echo $slide['right'][1] ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'break':
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>-bar"><?php echo $slide['progress_bar']; ?></div>
                <div class="center">
                    <div class="congratulations middle">
                        <p><?php echo $slide['center'][0] ?></p>
                        <p><?php echo $slide['center'][1] ?? '' ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'congratulations':
            ?>
            <div class="slides-card">
                <div class="center">
                    <div class="congratulations middle">
                        <p><?php echo $slide['center'][0] ?></p>
                        <p><?php echo $slide['center'][1] ?? '' ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        case 'final':
            ?>
            <div class="slides-card">
                <div class="center">
                    <div class="final">
                        <p><img style="width:150px;" src="<?php echo $slide['center'][0] ?>" /></p>
                        <p><?php echo $slide['center'][1] ?></p>
                        <p><img style="width:200px;" src="<?php echo $slide['center'][2] ?>" /></p>
                        <p><?php echo $slide['center'][3] ?></p>
                    </div>
                </div>
            </div>
            <?php
            break;
        default:
            ?>
            <div class="slides-card">
                <div class="stage <?php echo $slide['key']; ?>"><?php echo $slide['progress_bar']; ?></div>
                <div class="center"></div>
            </div>
            <?php
            break;

    }
}

function zume_course_slide_css( $build ) {
    ?>
    <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet">
    <style>
        #blank-template-body {
            padding: 1em;
            font-family: Poppins, sans-serif;
        }

        /* center */
        .center {
            width: 100%;
            text-align: center;
        }
        .center .title {
            text-transform: uppercase;
        }
        .center-title {
            height: 710px;
            padding-top: 200px;
        }
        .center-activity {
            max-width:1000px;
            margin: 0 auto;
            font-size: 1.8em;
            padding: 1em;
            background-color: #e7f6fc;
            border-radius: 1em;
            border: 3px solid #5dccff;
        }

        /* left column */
        .left-4 {
            width: 33%;
            float: left;
            height: 645px;
            border-right: 6px solid #5dccff;
            text-align:center;
        }
        .left-single-title {
            padding-top: 300px;
            text-align:right;
            padding-right: 2em;
            vertical-align: middle;
        }
        .left-single-title img {
            margin: 0 1em 1em 0;
        }
        .left-single-title .title {
            font-size:2.5em;
            font-weight: bold;
            text-transform: uppercase;
        }
        .left-single-title .subtitle {
            font-size:2em;
        }
        .left-4-obey {
            width: 33%;
            float: left;
            text-align:right;
            padding-right: 2em;
        }
        .left-obey-title {
            font-size:2.5em;
            font-weight: bold;
            text-transform: uppercase;
            vertical-align: middle;
        }
        .left-obey-title img {
            margin-right: 10px;
        }
        .left-8 {
            width: 66%;
            float: left;
            height: 645px;
        }
        .left-8-activity {
            margin: 0 1em;
            font-size: 1.8em;
            padding: 1em;
            background-color: #e7f6fc;
            border-radius: 1em;
            border: 3px solid #5dccff;
        }
        .left-8-image {
            text-align: center;
            max-height: 600px;
            max-width: 600px;
            margin: 1em auto 0;
        }
        .left-6 {
            font-size: 1.8em;
            width: 50%;
            float: left;
            height: 635px;
            text-align: center;
            padding: 1em;
        }

        /* right column */
        .right-8 {
            width: 66%;
            float: right;
            height: 645px;
            font-size: 2.1em;
        }
        .right-8-checkin {
            padding: 1em;
            margin: 0 1em;
        }
        .right-8-checkin img {
            width: 200px;
        }
        .right-8-pray {
            margin: 0 1em;
            padding: 1em;
            background-color: #e7f6fc;
            border-radius: 1em;
            border: 3px solid #5dccff;
        }
        .right-8-lookback {
            padding: 1em;
            margin: 0 1em;
        }
        .right-8-obey {
            border-left: 6px solid #5dccff;
            padding: 0 1.5em;
            width: 66%;
            float: right;
            font-size: 2.1em;
        }
        .right-4 {
            width: 33%;
            float: right;
            height: 620px;
            border-left: 6px solid #5dccff;
            text-align:center;
        }
        .right-4-activity {
            padding-top:170px;
            font-size: 1.5em;
        }
        .right-4-activity img {
            width: 250px;
        }
        .right-6 {
            font-size: 1.8em;
            width: 50%;
            float: right;
            height: 635px;
            border-left: 6px solid #5dccff;
            text-align: center;
            padding: 1em;
        }

        /* special */
        .final {
            font-size: 1.8em;
            max-width: 700px;
            margin: 80px auto;
        }
        .video {
            width: 1280px;
            height: 720px;
            border-radius: 5px;
        }
        .congratulations {
            font-size: 2.5em;
            font-weight: bold;
            padding: 1em;
            background-color: #e7f6fc;
            border-radius: 1em;
            border: 3px solid #5dccff;
            max-width: 1000px;
            margin: 0 auto;
        }
        .slide-row {
           width: 100%;
           height: 320px;
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
    <script>
        jQuery(document).ready(function() {
            // set section heights to put content in the middle
            jQuery.each( jQuery('.middle'), function( index, value ) {
                jQuery(this).css('margin-top', ( 615 - jQuery(this).height() ) * .5 + 'px');
            });
        });
    </script>
    <?php
}
