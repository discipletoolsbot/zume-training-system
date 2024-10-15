<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Book_Generator extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zume Training';
    public $root = 'book';
    public $type = 'generator';
    public $lang = 'en';
    public static $token = 'book_generator';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
        $this->lang = get_locale();

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();


        if ( isset( $url_parts[0] ) && ( ( $this->root === $url_parts[0] && $this->type === $url_parts[1] ) ) && ! dt_is_rest() ) {

            if ( isset( $_GET['lang'] ) ) {
                $this->lang = $_GET['lang'];
                $zume_languages = zume_languages();
                switch_to_locale($zume_languages[$this->lang]['locale'] );
            }

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
//            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
//            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
        [
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();
        $languages = zume_languages();
        $language = $languages[$lang_code];
        ?>
        <style>
            .slides-card .qr-code {
                width: 250px;
                height: 250px;
            }
            .title-icon {display:none;}
            .two-column>* {
                align-items:flex-start !important;
            }
            .slide-wrapper {
                padding:4em 0;
                margin: 0 auto;
            }
            .slide-switcher {
                border-bottom: 1px dashed var(--z-brand-lighter);
            }

            body {
                border-right: 1px solid white !important;
            }
            .two-column.left>:first-child {
                width: calc(25% - var(--gap-width) / 2) !important;
            }

            .two-column.left>:nth-child(2) {
                width: calc(75% - var(--gap-width) / 2) !important;
            }
            .two-column>:first-child:after {
                height: 100% !important;
            }
            .title-icon {
                display:none !important;
            }
            .slides-card {
                max-height:none !important;
            }
            .stack ul,.stack--2 ul {
                margin-bottom: 1rem;
                list-style-position: outside;
                line-height: 1.6;
                margin-left: 1.5rem;
                list-style-type: disc;
            }
            @media print{
                body{
                    background-color:white;
                    <?php
                    if ( $language['rtl'] ) {
                        ?>
                        direction: rtl !important;
                        <?php
                    }
                    if ( $language['rtl'] ) {
                        ?>
                        .slides-card .qr-code {
                            width: 150px;
                            height: 150px;
                        }
                        .slide-wrapper {
                            padding:2em 0;
                            margin: 0 auto;
                        }
                        <?php
                    }

                    ?>
                }
            }
        </style>
        <script>
            jQuery(document).ready(function(){
                jQuery('#iFrame1').bind('load', function() {
                    let iframe = document.getElementById( 'iFrame1' )
                    let height = iframe.contentWindow.document.body.scrollHeight
                    iframe.setAttribute("height", height );
                })
            })
        </script>
        <?php
    }

    public function _template( $slide ) {

        switch ( $slide['type'] ) {
            case 'title':
                ?>
                    <div class="slide-switcher" >
                        <slide-switcher>
                            <div class="slide-wrapper">
                                <div class="slides-card" style="margin-top:200px; margin-bottom: 200px;">
                                    <div class="cover-slide | title-slide | text-center">
                                        <div class="stack-1 | w-100 justify-content-center">
                                            <div class="center"><img src="<?php echo $slide['center'][0] ?>" /></div>
                                            <h2><?php echo $slide['center'][1] ?></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </slide-switcher>
                    </div>
                <?php
                break;
            case 'checkin':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                    <div class="title-area">
                                        <div class="stack">
                                            <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                            <span class="subtitle"><?php echo $slide['length'] ?></span>
                                            <div class="title-icon"><span class="icon z-icon-phone"></span></div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack">
                                            <p><?php echo $slide['right'][0] ?></p>
                                            <div class="qr-code">
                                                <img src="<?php echo $slide['right'][2] ?>" />
                                            </div>
                                            <p><?php echo $slide['right'][3] ?> <span style="font-weight:bold;"><?php echo $slide['right'][4] ?></span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'pray':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                    <div class="title-area">
                                        <div class="stack">
                                            <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                            <span class="subtitle"><?php echo $slide['length'] ?></span>
                                            <div class="title-icon">
                                                <span class="icon z-icon-pray"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack--2">
                                            <?php echo $this->render_content( $slide['right'] ) ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'overview':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                    <div class="title-area">
                                        <div class="stack">
                                            <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                            <span class="subtitle"><?php echo $slide['length'] ?></span>
                                            <div class="title-icon">
                                                <span class="icon z-icon-overview"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack content-area__text">
                                            <?php echo $this->render_content( $slide['right'], false, true ) ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'review':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                    <div class="title-area">
                                        <div class="stack">
                                            <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                            <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
                                            <div class="title-icon">
                                                <span class="icon z-icon-review"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack content-area__text">
                                            <?php echo $this->render_content( $slide['right'], false, true ) ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;

            case 'challenge':
            case 'center':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="cover-slide2">
                                    <h2 class="title text-center"><?php echo $slide['center'][0] ?? '' ?> <?php echo $slide['length'] ?? '' ?></h2>
                                    <div class="center w-70 justify-content-center">
                                        <div class="stack--2 activity-card">
                                            <?php echo $this->render_content( $slide['left'], true ) ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'watch': // read
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                    <div class="title-area">
                                        <div class="stack">
                                            <h2 class="title"><?php echo esc_html__( 'READ', 'zume' ) ?></h2>
                                            <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
                                            <div class="qr-code">
                                                <img src="<?php echo $slide['qr'] ?>" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack content-area__text">
                                            <?php echo '<p><strong>'.$slide['right'][0].'</strong></p>' ?>
                                            <?php
                                            $script_id = Zume_Course::get_transcript_by_key( $slide['id'] );
                                            $scripts = list_zume_scripts( $this->lang );
                                            echo zume_replace_placeholder( $scripts[$script_id]['content'] ?? '', $this->lang );
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'video':
                break;
            case 'look_back':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                        <div class="title-area">
                                            <div class="stack">
                                                <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                                <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
                                            </div>
                                        </div>
                                    <div class="content-area">
                                        <div class="stack--2">
                                            <?php echo $this->render_content( $slide['right'] ) ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                    </div>
                <?php
                break;
            case 'discuss':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                    <div class="title-area">
                                        <div class="stack">
                                            <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                            <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
                                            <div class="title-icon">
                                                <span class="icon z-icon-discuss"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack content-area__text">
                                            <?php echo $this->render_content( $slide['right'] ) ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                    </div>
                <?php
                break;
            case 'left_content':
            case 'activity':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column left">
                                    <div class="title-area">
                                        <div class="stack">
                                            <h2 class="title"><?php echo $slide['center'][0] ?? '' ?></h2>
                                            <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
                                            <div class="qr-code">
                                                <img src="<?php echo $slide['qr'] ?>" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack">
                                            <div class="activity-card" data-expanded-padding>
                                                <?php echo $this->render_content( $slide['left'], true, false, true ) ?>
                                            </div>
                                            <br>
                                            <?php echo $this->get_zume_activity( $this->lang, $slide['id'] ); ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'obey':
                ?>
                    <div class="slide-switcher">
                        <slide-switcher>
                            <div class="slide-wrapper">
                                <div class="slides-card" style="padding-bottom:1em;">
                                    <h2 class="title text-center" data-small><?php echo __( 'NEXT STEP', 'zume' ) ?></h2>
                                </div>
                                <div class="slides-card" style="padding-bottom:1em;">
                                    <div class="two-column left">
                                        <div class="title-area">
                                            <div class="title-icon">
                                                <span class="icon z-icon-obey-concept"></span>
                                            </div>
                                            <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                        </div>
                                        <div class="content-area">
                                            <p><?php echo $slide['right'][0] ?></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="slides-card">
                                    <div class="two-column left">
                                        <div class="title-area">
                                            <div class="title-icon">
                                                <span class="icon z-icon-share-concept"></span>
                                            </div>
                                            <h2 class="title"><?php echo $slide['left'][1] ?></h2>
                                        </div>
                                        <div class="content-area">
                                            <p><?php echo $slide['right'][1] ?></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </slide-switcher>
                    </div>
                <?php
                break;
            case 'left_image':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="two-column right">
                                    <div>
                                        <div class="cover-slide2 center text-center">
                                            <p><strong><?php echo $slide['left'][0] ?></strong></p>
                                            <div class="mw-60"><img src="<?php echo $slide['left'][1] ?>" /></div>
                                        </div>
                                    </div>
                                    <div class="content-area">
                                        <div class="stack center | text-center">
                                            <p><?php echo $slide['right'][2] ?></p>
                                            <div class="qr-code">
                                                <img src="<?php echo $slide['right'][1] ?>" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'next_steps':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="cover-slide2">
                                    <h2 class="title text-center" data-small><?php echo $slide['center'][0] ?></h2>
                                    <div class="two-column middle" data-align-start>
                                        <div>
                                            <div class="stack align-items-center">
                                                <p><strong><?php echo $slide['left'][0] ?></strong></p>
                                                <div class="qr-code"><a href="<?php echo $slide['left'][1] ?>" target="_blank"><img src="<?php echo $slide['left'][2] ?>" /></a></div>
                                                <p><?php echo $slide['left'][3] ?></p>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="stack align-items-center">
                                                <p><strong><?php echo $slide['right'][0] ?></strong></p>
                                                <div class="qr-code"><a href="<?php echo $slide['right'][1] ?>" target="_blank"><img src="<?php echo $slide['right'][2] ?>" /></a></div>
                                                <p><?php echo $slide['right'][3] ?></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'break':
                ?>
                <div class="slide-switcher">
                    <slide-switcher>
                        <div class="slide-wrapper">
                            <div class="slides-card">
                                <div class="cover-slide2">
                                    <div class="grow-1 d-flex align-items-center">
                                        <div class="center activity-card stack--2" data-large>
                                            <span><?php echo $slide['center'][0] ?? '' ?></span>
                                            <span><?php echo $slide['center'][1] ?? '' ?></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </slide-switcher>
                </div>
                <?php
                break;
            case 'congratulations':
                ?>
                    <div class="slide-switcher">
                        <slide-switcher>
                            <div class="slide-wrapper">
                                <div class="slides-card">
                                    <div class="cover-page container">
                                        <div>
                                            <div class="center activity-card" data-large>
                                                <p><?php echo $slide['center'][0] ?></p>
                                            </div>
                                            <div class="center">
                                                <p><img src="<?php echo $slide['center'][1] ?>" /></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </slide-switcher>
                    </div>
                <?php
                break;
            case 'final':
                break;
            default:
                ?>
                <course-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></course-slide>
                <?php
                break;

        }
    }

    public function get_zume_activity( $lang, $id ) {
        $activity = '';

        if( str_contains($id, '3monthplan' ) ) {
            $activity = Zume_Activites_3monthplan_Printable::instance()->list();
        }
        else if( str_contains($id, 'coachingchecklist' ) ) {
            $activity = Zume_Activites_Coaching::instance()->description();
            $activity .= '<iframe id="iFrame1" src="https://zume.training/'.$this->lang.'/activities/coachingchecklist?description=false" style="border: none; width: 100%; overflow:hidden;" height="1800px" scrolling="no"></iframe>';
        }
        else if( str_contains($id, 'listof100' ) ) {
            $this->list_of_100();
        }
        else {
            $activities = list_zume_activities( $lang );
            $activity = '';
            foreach( $activities as $row ) {
                if ( $id === $row['post_title'] ) {
                    $activity = zume_replace_placeholder( $row['content'], $lang );
                    break;
                }
            }
        }

        return $activity;
    }

    public function list_of_100() {
        for ( $x = 1; $x <= 100; $x++ ) {
            ?>
            <p><?php echo esc_html( $x ); ?> _____________________ &#9744; <?php echo esc_html__( 'Disciple', 'zume' ) ?>&nbsp;&nbsp; &#9744; <?php echo esc_html__( 'Unbeliever', 'zume' ) ?>&nbsp;&nbsp;  &#9744; <?php echo esc_html__( 'Unknown', 'zume' ) ?></p>
            <?php
        }
    }

    public function render_content( $stack = [], $bold_first = false, $bold_all = false, $is_activity = false ) {
        $item = '';
        foreach( $stack as $i => $v ) {
            if ( is_array( $v ) ) {
                $item .= '<ul class="bullets">';
                foreach(  $v as $ii => $vv ) { // first level bullets
                    if ( $is_activity && 0 === $ii ) { // remove the scan the QR step
                        continue;
                    }
                    if ( is_array( $vv ) ) { // second level bullets
                        $item .= '<ul class="bullets">';
                        foreach( $vv as $vvv ) {
                            $item .= "<li>" . $vvv . "</li>";
                        }
                        $item .= '</ul>';
                    } else {
                        $item .= "<li>" . $vv . "</li>";
                    }
                }
                $item .= '</ul>';
            }
            else if ( $bold_first && 0 === $i ) {
                $item .= "<p><strong>" . $v . "</strong></p>";
            }
            else if ( $bold_all && ! is_array($v) ) {
                $item .= "<p><strong>" . $v . "</strong></p>";
            }
            else {
                $item .= "<p>" . $v . "</p>";
            }
        }

        return $item;
    }

    public function body(){
        if ( ! isset( $_GET['type'], $_GET['session'],  $_GET['lang'] ) ) {
            $this->selector();
        }
        else {
            $course = Zume_Course_Builder::builder( $_GET['type'], $_GET['lang'], $_GET['session'] );

            ?><div class="print-content"><?php

            foreach( $course as $slide ) {
                $this->_template( $slide );
            }

            ?></div><?php
        }
    }

    public function selector() {
        $zume_languages = zume_languages();
        $site_url = trailingslashit( site_url() );

        ?>
        <div class="center p-3" id="form">
            <select class="input-field" id="type">
                <option value="10">10 Session</option>
                <option value="20">20 Session</option>
                <option value="intensive">Intensive Session</option>
            </select><br>
            <select class="input-field" id="session">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="" disabled>---------</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
            </select><br>
            <select class="input-field" id="lang">
                <?php
                foreach($zume_languages as $language ) {
                    ?><option value="<?php echo $language['code'] ?>"><?php echo $language['name'] ?></option><?php
                }
                ?>
            </select><br>
            <a class="btn" href="<?php ?>" id="launch" target="_blank">Build</a>
        </div>
        <script>
            jQuery(document).ready(function() {

                function new_href() {
                    let type = jQuery('#type').val()
                    let session = jQuery('#session').val()
                    let lang = jQuery('#lang').val()
                    let site_url = '<?php echo $site_url; ?>'
                    let url_root = '<?php echo $this->root; ?>'
                    let url_type = '<?php echo $this->type; ?>'

                    jQuery('#launch').attr( 'href', site_url + lang + '/' + url_root + '/' + url_type + '?' + 'type=' + type + '&session=' + session + '&lang=' +lang )

                    console.log( 'href', site_url + lang + '/' + url_root + '/' + url_type + '?' + 'type=' + type + '&session=' + session + '&lang=' +lang )
                }
                new_href()

                jQuery('.input-field').on( 'change', function() {
                    new_href()
                })
            })
        </script>
        <?php
    }
}
Zume_Book_Generator::instance();
