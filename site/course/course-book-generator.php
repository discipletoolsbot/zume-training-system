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
    public static $token = 'app_faq';

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

            $this->register_url_and_access();
            $this->header_content();

            // page content
//            add_action( 'dt_blank_head', [ $this, '_header' ] );
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
        ?>
        <style>
            .slides-card2 {border:0 !important;}
            .progress-bar-wrapper {display:none;}
            .watch-btn {display:none;}
            .piece { margin: 0 auto; max-width: 1200px;}
            .slides-card2 { height: fit-content !important;}
            .qr-code img { width: 200px;}
            .title-icon {display:none;}
            .two-column>* {align-items:flex-start !important;}
            .slides-card2 .activity-card {
                padding: calc(var(--slide-unit) * 2);
                background-color: #e7f6fc;
                border-radius: calc(var(--slide-unit) * 2);
                border: calc(var(--slide-unit) * .3) solid var(--z-brand-lighter);
                box-shadow: 0 calc(var(--slide-unit) * .3) calc(var(--slide-unit) * .2) 0 #0c1a2130;
            }
            .slide-switcher { border-top: 1px dashed var(--z-brand-lighter); margin-top:1em;}
            @media print{
                body{ background-color:white}
            }
            body {
                border-right: 1px solid white !important;
            }
        </style>
        <?php
    }

    public function _template( $slide ) {

        switch ( $slide['type'] ) {
            case 'title':
                ?>
                <title-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div>
                        <div class="slides-card">
                            <div class="cover-slide | title-slide | text-center">
                                <div class="stack-1 | w-100 grow-1 justify-content-center">
                                    <div class="center | w-40"><img src="<?php echo $slide['center'][0] ?>" /></div>
                                    <h2><?php echo $slide['center'][1] ?></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </title-slide>
                <?php
                break;
            case 'checkin':
                ?>
                <checkin-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon"><span class="icon z-icon-phone"></span></div>
                                    <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack">
                                    <p><?php echo $slide['right'][0] ?></p>
                                    <div class="qr-code">
                                        <a
                                            href="${this.slide['right'][1]}"
                                            class="bypass-nav-click"
                                            target="_blank"
                                        >
                                            <img src="${this.slide['right'][2]}" />
                                        </a>
                                    </div>
                                    <p><?php echo $slide['right'][3] ?> <span style="font-weight:bold;"><?php echo $slide['right'][4] ?></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </checkin-slide>
                <?php
                break;
            case 'pray':
                ?>
                <pray-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-pray"></span>
                                    </div>
                                    <div class="stack">
                                        <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                        <span class="subtitle"><?php echo $slide['length'] ?></span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="activity-card stack--2" expanded-padding>
                                    <?php echo $this->render_content( $slide['right'] ) ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </pray-slide>
                <?php
                break;
            case 'review':
                ?>
                <review-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-review"></span>
                                    </div>
                                    <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack content-area__text">
                                    <?php echo $this->render_content( $slide['right'], false, true ) ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </review-slide>
                <?php
                break;
            case 'overview':
                ?>
                <overview-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-overview"></span>
                                    </div>
                                    <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack content-area__text">
                                    <?php echo $this->render_content( $slide['right'], false, true ) ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </overview-slide>
                <?php
                break;
            case 'challenge':
            case 'center':
                ?>
                <center-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="cover-slide">
                            <h2 class="title text-center"><?php echo $slide['center'][0] ?? '' ?> <?php echo $slide['length'] ?? '' ?></h2>
                            <div class="center w-70 grow-1 justify-content-center">
                                <div class="stack--2 activity-card">
                                    <?php echo $this->render_content( $slide['right'], true ) ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </center-slide>
                <?php
                break;
            case 'watch':
                ?>
                <watch-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-course"></span>
                                    </div>
                                    <div class="stack">
                                        <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                        <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack content-area__text">
                                    <?php echo $this->render_content( $slide['right'], true ) ?>
                                    <div>
                                        <button
                                            class="watch-btn | btn tight d-flex align-items-center gap--1"
                                            type="button"
                                            @click=${this.nextSlide}
                                        >
                                            <span><?php echo $slide['left'][0] ?></span>
                                            <span class="icon z-icon-watch f-3"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </watch-slide>
                <?php
                break;
            case 'video':
                ?>
                <video-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">video</video-slide>
                <?php
                break;
            case 'look_back':
                ?>
                <look-back-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-look-back"></span>
                                    </div>
                                    <div class="stack">
                                        <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                        <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="activity-card | stack--2" expanded-padding>
                                    <?php echo $this->render_content( $slide['right'] ) ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </look-back-slide>
                <?php
                break;
            case 'discuss':
                ?>
                <discuss-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        ${this.renderProgressBar()}
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-discuss"></span>
                                    </div>
                                    <div class="stack">
                                        <h2 class="title"><?php echo $slide['left'][0] ?></h2>
                                        <span class="subtitle"><?php echo $slide['length'] ?? '' ?></span>
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
                </discuss-slide>
                <?php
                break;
            case 'left_content':
            case 'activity':
                ?>
                <activity-slide slide="">
                    <div class="slides-card activity-slide | position-relative">
                        <div class="cover-slide">
                            <button
                                type="button"
                                class="activity-btn | btn icon-btn absolute top ${this.dir === 'rtl' ? 'left' : 'right'} z-1 m-0 bypass-nav-click d-flex gap--2"
                                @click=${this.openMenu}
                            >
                                <span class="icon z-icon-info"></span><span>${jsObject.translations.view_activity}</span>
                            </button>
                            <h2 class="title text-center" data-small>${this.slide['center'][0]} ${this.slide['length']}</h2>
                            <div class="two-column right">
                                <div>
                                    <div class="activity-card | stack--2" data-expanded-padding>
                                        ${this.renderContent(this.slide['left'], true)}
                                    </div>
                                </div>
                                <div class="content-area">
                                    <div class="stack center | text-center">
                                        <div class="qr-code"><a href="${this.slide['right'][0]}" target="_blank" class="bypass-nav-click"><img src="${this.slide['right'][1]}" /></a></div>
                                        <p>${this.slide['right'][2]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                </activity-slide>
                <?php
                break;
            case 'obey':
                ?>
                <obey-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        ${this.renderProgressBar()}
                        <div class="obey-slide">
                            <div class="two-column left">
                                <div>
                                    <div class="title-area">
                                        <div class="title-icon">
                                            <span class="icon z-icon-obey-concept"></span>
                                        </div>
                                        <h2 class="title">${this.slide['left'][0]}</h2>
                                    </div>
                                </div>
                                <div class="content-area">
                                    <p>${this.slide['right'][0]}</p>
                                </div>
                            </div>
                            <div class="two-column left">
                                <div>
                                    <div class="title-area">
                                        <div class="title-icon">
                                            <span class="icon z-icon-share-concept"></span>
                                        </div>
                                        <h2 class="title">${this.slide['left'][1]}</h2>
                                    </div>
                                </div>
                                <div class="content-area">
                                    <p>${this.slide['right'][1]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </obey-slide>
                <?php
                break;
            case 'left_image':
                ?>
                <left-image-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        ${this.renderProgressBar()}
                        <div class="two-column right">
                            <div>
                                <div class="cover-slide center text-center">
                                    <p><strong>${this.slide['left'][0]}</strong></p>
                                    <div class="mw-60"><img src="${this.slide['left'][1]}" /></div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack center | text-center">
                                    <div class="qr-code"><a href="${this.slide['right'][0]}" target="_blank"><img src="${this.slide['right'][1]}" /></a></div>
                                    <p>${this.slide['right'][2]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </left-image-slide>
                <?php
                break;
            case 'next_steps':
                ?>
                <next-steps-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        ${this.renderProgressBar()}
                        <div class="cover-slide">
                            <h2 class="title text-center" data-small>${this.slide['center'][0]}</h2>
                            <div class="two-column middle" data-align-start>
                                <div>
                                    <div class="stack align-items-center">
                                        <p><strong>${this.slide['left'][0]}</strong></p>
                                        <div class="qr-code"><a href="${this.slide['left'][1]}" target="_blank"><img src="${this.slide['left'][2]}" /></a></div>
                                        <p>${this.slide['left'][3]}</p>
                                    </div>
                                </div>
                                <div>
                                    <div class="stack align-items-center">
                                        <p><strong>${this.slide['right'][0]}</strong></p>
                                        <div class="qr-code"><a href="${this.slide['right'][1]}" target="_blank"><img src="${this.slide['right'][2]}" /></a></div>
                                        <p>${this.slide['right'][3]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </next-steps-slide>
                <?php
                break;
            case 'break':
                ?>
                <break-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        ${this.renderProgressBar()}
                        <div class="cover-slide">
                            <div class="grow-1 d-flex align-items-center">
                                <div class="center activity-card stack--2" data-large>
                                    <span>${this.slide['center'][0]}</span>
                                    ${
                                    this.slide['center'][1]
                                    ? html`<span>${this.slide['center'][1]}</span>`
                                    : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </break-slide>
                <?php
                break;
            case 'congratulations':
                ?>
                <congratulations-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="cover-page container">
                            <div>
                                <div class="center activity-card" data-large>
                                    <p>${this.slide['center'][0]}</p>
                                </div>
                                <div class="center">
                                    <p><img src="${this.slide['center'][1] ?? ''}" /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </congratulations-slide>
                <?php
                break;
            case 'final':
                ?>
                <final-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div class="slides-card">
                        <div class="cover-page">
                            <div class="center stack | text-center w-50">
                                <div class="w-30"><img src="${this.slide['center'][0]}" /></div>
                                <p>${this.slide['center'][1]}</p>
                                <div class="w-30"><img src="${this.slide['center'][2]}" /></div>
                                <p>${this.slide['center'][3]}</p>
                                <a class="btn tight" href="${jsObject.home_url}">${jsObject.translations.home}</a>
                                <button class="btn tight" @click=${this.dispatchOpenMenu}>${jsObject.translations.menu}</button>
                            </div>
                        </div>
                    </div>
                </final-slide>
                <?php
                break;
            default:
                ?>
                <course-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>"></course-slide>
                <?php
                break;

        }
    }

    public function render_content( $stack = [], $bold_first = false, $bold_all = false ) {
        $item = '';
        foreach( $stack as $i => $v ) {
            if ( is_array( $v ) ) {
                $item += '<ul class="bullets">';
                foreach( $stack as $vv ) {
                    $item += "<li>" . $vv . "</li>";
                }
                $item += '</ul>';
            }
            else if ( $bold_first && 0 === $i ) {
                $item += "<p><strong>" . $v . "</strong></p>";
            }
            else if ( $bold_all ) {
                $item += "<p><strong>" . $v . "</strong></p>";
            }
            else {
                $item += "<p>" . $v . "</p>";
            }
        }

        return $item;
    }

    public function body(){
        if ( ! isset( $_GET['type'],  $_GET['lang'] ) ) {
            return;
        }

        $course = Zume_Course_Builder::builder( $_GET['type'], $_GET['lang'], 0 );

        foreach( $course as $session_number => $slides ) {
            foreach( $slides as $slide ) {
                $this->_template( $slide );
            }
        }


    }
}
Zume_Book_Generator::instance();
