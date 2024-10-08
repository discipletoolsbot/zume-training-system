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

    public function zume_course_slide_template( $slide ) {

        switch ( $slide['type'] ) {
            case 'title':
                ?>
                <title-slide slide="<?php echo esc_attr( json_encode( $slide ) ) ?>">
                    <div>
                        <div class="slides-card">
                            ${this.renderProgressBar()}
                            <div class="cover-slide | title-slide | text-center">
                                <div class="stack-1 | w-100 grow-1 justify-content-center">
                                    <div class="center | w-40"><img src=${this.slide['center'][0]} /></div>
                                    <h2>${this.slide['center'][1]}</h2>
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
                        ${this.renderProgressBar()}
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon"><span class="icon z-icon-phone"></span></div>
                                    <h2 class="title">${this.slide['left'][0]}</h2>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack">
                                    <p>${this.slide['right'][0]}</p>
                                    <div class="qr-code">
                                        <a
                                            href="${this.slide['right'][1]}"
                                            class="bypass-nav-click"
                                            target="_blank"
                                        >
                                            <img src="${this.slide['right'][2]}" />
                                        </a>
                                    </div>
                                    <p>${this.slide['right'][3]} <span style="font-weight:bold;">${this.slide['right'][4]}</span></p>
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
                        ${this.renderProgressBar()}
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-pray"></span>
                                    </div>
                                    <div class="stack">
                                        <h2 class="title">${this.slide['left'][0]}</h2>
                                        <span class="subtitle">${this.slide['length']}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="activity-card stack--2" expanded-padding>
                                    ${this.renderContent(this.slide['right'])}
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
                        ${this.renderProgressBar()}
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-review"></span>
                                    </div>
                                    <h2 class="title">${this.slide['left'][0]}</h2>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack content-area__text">
                                    ${this.renderContent(this.slide['right'], false, true)}
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
                        ${this.renderProgressBar()}
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-overview"></span>
                                    </div>
                                    <h2 class="title">${this.slide['left'][0]}</h2>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack content-area__text">
                                    ${this.renderContent(this.slide['right'], false, true)}
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
                        ${this.renderProgressBar()}
                        <div class="cover-slide">
                            <h2 class="title text-center">${this.slide['center'][0] ?? ''} ${this.slide['length'] ?? ''}</h2>
                            <div class="center w-70 grow-1 justify-content-center">
                                <div class="stack--2 activity-card">
                                    ${this.renderContent(this.slide['left'], true)}
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
                        ${this.renderProgressBar()}
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-course"></span>
                                    </div>
                                    <div class="stack">
                                        <h2 class="title">${this.slide['left'][0]}</h2>
                                        <span class="subtitle">${this.slide['length'] ?? ''}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack content-area__text">
                                    ${this.renderContent(this.slide['right'], true)}
                                    <div>
                                        <button
                                            class="watch-btn | btn tight d-flex align-items-center gap--1"
                                            type="button"
                                            @click=${this.nextSlide}
                                        >
                                            <span>${this.slide['left'][0]}</span>
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
                        ${this.renderProgressBar()}
                        <div class="two-column left">
                            <div>
                                <div class="title-area">
                                    <div class="title-icon">
                                        <span class="icon z-icon-look-back"></span>
                                    </div>
                                    <div class="stack">
                                        <h2 class="title">${this.slide['left'][0]}</h2>
                                        <span class="subtitle">${this.slide['length']}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="activity-card | stack--2" expanded-padding>
                                    ${this.renderContent(this.slide['right'])}
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
                                        <h2 class="title">${this.slide['left'][0]}</h2>
                                        <span class="subtitle">${this.slide['length'] ?? ''}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="content-area">
                                <div class="stack content-area__text">
                                    ${this.renderContent(this.slide['right'])}
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

    public function body(){
        // session
        // view
        // slide
        if ( ! isset( $_GET['type'],  $_GET['lang'] ) ) {
            return;
        }


        $session_keys = Zume_Course_Builder::builder( $_GET['type'], $_GET['lang'], 0 );
        dt_write_log($session_keys);



        ?>
        <div class="">
            <!--?lit$752283893$-->
            <course-guide><!---->
                <div class="course-guide">
                    <div class="stack | py-4 snap-content2" data-outline-slides="">
                        <!--?lit$752283893$--><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><title-slide id="s1_1_1" incontainer="" dir="ltr"><!---->
                                    <div>
                                        <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                            <!--?lit$752283893$-->
                                            <div class="stage s1_1_1-bar">
                                                <div class="progress-bar-wrapper">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-stage">
                                                        <!--?lit$752283893$--><!---->
                                                        <div class="progress-bar-item active"></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!---->
                                                    </div>
                                                    <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                    <div class="progress-bar-stage">
                                                        <!--?lit$752283893$--><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!---->
                                                    </div>
                                                    <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                    <div class="progress-bar-stage">
                                                        <!--?lit$752283893$--><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!---->
                                                    </div>
                                                    <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                    <div class="progress-bar-stage">
                                                        <!--?lit$752283893$--><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!---->
                                                    </div>
                                                    <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                    <div class="progress-bar-stage">
                                                        <!--?lit$752283893$--><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!---->
                                                    </div>
                                                    <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                    <div class="progress-bar-stage">
                                                        <!--?lit$752283893$--><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!---->
                                                    </div>
                                                    <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                    <div class="progress-bar-stage">
                                                        <!--?lit$752283893$--><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!----><!---->
                                                        <div class="progress-bar-item "></div>
                                                        <!---->
                                                    </div>
                                                    <!---->
                                                </div>
                                            </div>

                                            <div class="cover-slide | title-slide | text-center">
                                                <div class="stack-1 | w-100 grow-1 justify-content-center">
                                                    <div class="center | w-40"><img src="https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png"></div>
                                                    <h2><!--?lit$752283893$-->SESSION 1</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </title-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><checkin-slide id="s1_1_2" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage s1_1_2-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon"><span class="icon z-icon-phone"></span></div>
                                                    <h2 class="title"><!--?lit$752283893$-->CHECK-IN</h2>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack">
                                                    <p><!--?lit$752283893$-->Have all of the participants and facilitator check-in.</p>
                                                    <div class="qr-code">
                                                        <img src="https://zume.training/make/qr?s=qrl&amp;sf=50&amp;wq=0&amp;d=https%3A%2F%2Fzume.training%2Fen%2Fcheckin%2F%3Fcode%3D5678">
                                                    </div>
                                                    <p><!--?lit$752283893$-->Or zume.training/checkin and use code: <span style="font-weight:bold;"><!--?lit$752283893$-->5678</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </checkin-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><pray-slide id="s1_1_3" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage s1_1_3-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                        <span class="icon z-icon-pray"></span>
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->PRAY</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(5 min)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="activity-card stack--2" expanded-padding="">
                                                    <!--?lit$752283893$--><!----><p><!--?lit$752283893$-->Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.</p><!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </pray-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><overview-slide id="s1_1_4" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage s1_1_4-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                        <span class="icon z-icon-overview"></span>
                                                    </div>
                                                    <h2 class="title"><!--?lit$752283893$-->OVERVIEW</h2>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <!--?lit$752283893$--><!----><p><strong><!--?lit$752283893$-->In this session, we will hear and discuss these concepts:</strong></p><!----><!---->
                                                    <ul class="bullets">
                                                        <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->God Uses Ordinary People</li><!----><!----><li><!--?lit$752283893$-->Simple Definition of Disciple &amp; Church</li><!----><!----><li><!--?lit$752283893$-->Spiritual Breathing</li><!---->
                                                    </ul>
                                                    <!----><!----><p><strong><!--?lit$752283893$-->And we will add these tools to our toolkit:</strong></p><!----><!---->
                                                    <ul class="bullets">
                                                        <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->S.O.A.P.S. Bible Reading</li><!----><!----><li><!--?lit$752283893$-->Accountability Groups</li><!---->
                                                    </ul>
                                                    <!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </overview-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><watch-slide id="t1_a" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t1_a-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->READ</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(5 min)</span>
                                                        <div class="qr-code"><span target="_blank" class="bypass-nav-click" href="https://zume.training/app/qr/?l=en&amp;a=accountability"><img src="https://zume.training/make/qr?s=qrl&amp;sf=50&amp;wq=0&amp;d=https%3A%2F%2Fzume.training%2Fapp%2Fqr%2F%3Fl%3Den%26a%3Daccountability"></span></div>
                                                        <span class="subtitle">Watch video</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <div class="text">
                                                        <h3>God Uses Ordinary People</h3>
                                                        <hr>
                                                    </div>
                                                    <div class="activity__content">
                                                        <p>Welcome to Zúme training. Zúme is the Greek word for “yeast.”</p>
                                                        <p>Jesus tells us that the Kingdom of God is like a woman who took a small amount of “zúme” and put into a great amount of dough.</p>
                                                        <p>As she worked the yeast into the mix, it spread until all of the dough was leavened.</p>
                                                        <p>Jesus was showing us that an ordinary person can take something very small and use it to make an impact that’s very big!</p>
                                                        <p>Our dream is to do what Jesus said -- to help ordinary people around the world use small tools to make a big impact in God’s kingdom!</p>
                                                        <p>Jesus’ final instructions to His followers were simple. He said — All authority in heaven and earth has been given to Me. Therefore — Go and Make Disciples of all nations Baptizing Them in the name of the Father, Son and Holy Spirit, Teaching them to obey all I have commanded, And I will be with you always - even to the end of the age.</p>
                                                        <p>Jesus’ command was simple -- Make Disciples</p>
                                                        <p>His instructions on how to do that were simple -- Make disciples wherever you’re going</p>
                                                        <ul>
                                                            <li>Make disciples by baptizing them in the name of the Father, Son and Holy Spirit</li>
                                                            <li>Make disciples by teaching them to obey all He commanded</li>
                                                        </ul>
                                                        <p>So what are the steps to make a disciple?</p>
                                                        <ul>
                                                            <li>We make disciples all the time - wherever we’re going and as we go</li>
                                                            <li>When someone decides to follow Jesus - they should be baptized</li>
                                                            <li>As they grow - we should teach every disciple how to obey everything that Jesus commanded.</li>
                                                        </ul>
                                                        <p>Since one of the things He commanded is to make disciples, that means that every disciple who follows Jesus needs to learn how to make disciples too.</p>
                                                        <p>Those disciples are to make disciples. And those disciples are to make disciples, too.</p>
                                                        <p>Multiplying disciples. That’s how Zúme works</p>
                                                        <p>It’s like yeast - worked all through the dough until all of the dough is leavened.</p>
                                                        <p>When Jesus gave this command to go make disciples, He also gave a promise.</p>
                                                        <p>Jesus said - I will be with you always. Even to the very end of the age.</p>
                                                        <p>Every follower of Jesus should count on the promise that Jesus is always with us. Because He is!</p>
                                                        <p>But that also means every follower of Jesus should commit to the fact that Jesus wants each of&nbsp;us to make disciples. Because He does.</p>
                                                        <p>Jesus said - All authority in heaven and earth has been given to Me. Therefore go and make&nbsp;disciples.</p>
                                                        <p>The authority that Jesus relies on when He sends us -- is His authority.</p>
                                                        <p>Jesus says there is no authority higher than that. No tradition has more authority.</p>
                                                        <p>No culture has more authority. No law on earth has more authority.</p>
                                                        <p>Jesus said - Go and make disciples.</p>
                                                        <p>And like Zúme - like yeast - we’ll keep going and growing until all the work is done.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </watch-slide></slide-switcher>
                        </div>

                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><discuss-slide id="t1_c" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t1_c-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                        <span class="icon z-icon-discuss"></span>
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->DISCUSS</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(10 min)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <!--?lit$752283893$--><!----><p><!--?lit$752283893$-->If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?</p><!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </discuss-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><watch-slide id="t2_a" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t2_a-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->READ</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(5 min)</span>
                                                        <div class="qr-code"><span target="_blank" class="bypass-nav-click" href="https://zume.training/app/qr/?l=en&amp;a=accountability"><img src="https://zume.training/make/qr?s=qrl&amp;sf=50&amp;wq=0&amp;d=https%3A%2F%2Fzume.training%2Fapp%2Fqr%2F%3Fl%3Den%26a%3Daccountability"></span></div>
                                                        <span class="subtitle">Watch video</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <div class="text">
                                                        <h3>Simple Definition of Disciple and Church</h3>
                                                        <hr>
                                                    </div>
                                                    <div class="activity__content">
                                                        <p class="p1">Welcome back to Zúme training. In this session, we’ll talk about disciples and the church.</p>
                                                        <p class="p1"><strong>What is a disciple? And how do you make one?</strong></p>
                                                        <p class="p1">How do you teach a follower of Jesus to obey all of His commands?&nbsp;How do you take someone who’s lived their life as a captive of the world and equip them to&nbsp;become a citizen of God’s kingdom?</p>
                                                        <p class="p1">The meaning of the word disciple is a follower. So a disciple is a follower of God.&nbsp;Jesus said - All authority in heaven and earth has been given to Me.&nbsp;So in God’s kingdom, Jesus is our King. We are His citizens, subjects of His will. His desires, purposes, intentions, priorities and values are the highest and best.&nbsp;His Word is the law. So what is the law of the kingdom? What does Jesus tell His citizens to do?</p>
                                                        <p class="p1">Jesus said -- Love the Lord God with all your heart, with all your soul, with all your mind and with all your strength. Jesus said -- Love your neighbor as yourself.&nbsp;Jesus said that God’s commands from the Old Testament -- all the law and the prophets -- can be summarized in these two things -- Love God and Love People. Jesus said -- Make disciples.&nbsp;Jesus said -- Teach them to obey all that I’ve commanded.</p>
                                                        <p class="p1">Since making disciples includes teaching them all that Jesus commanded -- the New Testament can be summarized in this one thing -- Make Disciples.</p>
                                                        <p class="p1">A disciple is a follower of Jesus who Loves God, Loves People and Makes Disciples.</p>
                                                        <p class="p1"><strong>So what is a church?</strong></p>
                                                        <p class="p1">You may be used to thinking of the church as a building - a place where you go. But God’s Word&nbsp;talks about the church as a gathering - a people you belong to.</p>
                                                        <p class="p1">The word “church” is used in the Bible three different ways:</p>
                                                        <ul>
                                                            <li class="p1"><strong>the universal church</strong> -- all the people who were, are and will ever be followers of Jesus</li>
                                                            <li class="p1"><strong>the city or regional church</strong> -- all the people who follow Jesus and live in or around a certain area of the world</li>
                                                            <li class="p1"><strong>the church at home</strong> -- all the people who follow Jesus and meet where one or more of them live.</li>
                                                        </ul>
                                                        <p class="p1">A spiritual family - followers of Jesus who Love God, Love People and Make Disciples and who&nbsp;meet together locally make up this last kind of church - the church at home or the simple church.</p>
                                                        <p class="p1">When groups of these simple churches connect to do something bigger, together, they can form a&nbsp;city or regional church.</p>
                                                        <p class="p1">All of those simple churches networked into regions and stretched across history make up the&nbsp;universal church.</p>
                                                        <p class="p1">THAT’S CHURCH WITH A CAPITAL “C”</p>
                                                        <p class="p1"><strong>Simple churches are spiritual families</strong> with Jesus as their center and their King.&nbsp;Simple churches are spiritual families who Love God, Love Others and Make Disciples who Multiply.&nbsp;Some churches have Buildings and Programs and Budgets and Staff. But simple churches don’t need any of these things in order to Love God, Love Others and Make Disciples who Multiply.&nbsp;And since anything extra makes a church more complicated and harder to multiply, our training&nbsp;leaves things like Buildings and Programs and Budgets and Staff to the city or regional church&nbsp;built from multiplying simple churches.</p>
                                                        <p class="p1">Remember “zúme” means “yeast” -- a simple, single cell organism that reproduces quickly.</p>
                                                        <p class="p1">With Zúme training - we’re going to be like that yeast - simple and multiplying. But before we start multiplying - let’s make sure we know what God wants reproduced.&nbsp; Because multiplication can be good - but not always.&nbsp;Cancer is multiplication. And it’s deadly.&nbsp;So how do we reproduce life and not death? And how do we make sure we’re disciples worth&nbsp;reproducing?</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </watch-slide></slide-switcher>
                        </div>

                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><discuss-slide id="t2_c" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t2_c-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                        <span class="icon z-icon-discuss"></span>
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->DISCUSS</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(10 min)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <!--?lit$752283893$--><!---->
                                                    <ul class="bullets">
                                                        <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->When you think of a church, what comes to mind?</li><!----><!----><li><!--?lit$752283893$-->What’s the difference between that picture and what’s described in the video as a "Simple Church"?</li><!----><!----><li><!--?lit$752283893$-->Which one do you think would be easier to multiply and why?</li><!---->
                                                    </ul>
                                                    <!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </discuss-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><watch-slide id="t3_a" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t3_a-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->READ</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(5 min)</span>
                                                        <div class="qr-code"><span target="_blank" class="bypass-nav-click" href="https://zume.training/app/qr/?l=en&amp;a=accountability"><img src="https://zume.training/make/qr?s=qrl&amp;sf=50&amp;wq=0&amp;d=https%3A%2F%2Fzume.training%2Fapp%2Fqr%2F%3Fl%3Den%26a%3Daccountability"></span></div>
                                                        <span class="subtitle">Watch video</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <div class="text">
                                                        <h3>Spiritual Breathing is Hearing and Obeying God</h3>
                                                        <hr>
                                                    </div>
                                                    <div class="activity__content">
                                                        <p>Welcome back to Zúme training.&nbsp;In this session, we’ll talk about hearing from God and obeying what we hear.</p>
                                                        <p>Breathing is life. We breathe in. We breathe out. Life.</p>
                                                        <p>Breathing is just as important in God’s Kingdom.&nbsp;In fact, God calls His Spirit - “breath”.</p>
                                                        <p>In the Kingdom, we breathe IN when we HEAR from God.&nbsp;We breathe in when we HEAR from God through HIS WORD - the Bible.&nbsp;We breathe in when we HEAR from God through PRAYER - our conversations with Him.&nbsp;We breathe in when we HEAR from God through HIS BODY - the church, other followers of Jesus.&nbsp;We breathe in when we HEAR from God through HIS WORKS - the events, experiences and&nbsp;sometimes even the persecutions and sufferings He allows His children to go through.</p>
                                                        <p>In the Kingdom we breathe OUT when we ACT on what we hear from God. We breathe OUT&nbsp;when we OBEY.</p>
                                                        <p>Sometimes breathing out to OBEY means changing our thoughts, our words or our actions to&nbsp;bring them into alignment with Jesus and His will.</p>
                                                        <p>Sometimes breathing out to OBEY means sharing what Jesus has shared with us - giving away&nbsp;what He gave us - so that others can be blessed just as God is blessing us.</p>
                                                        <p>For a follower of Jesus - this breathing IN and breathing OUT is critical. It’s our very life.&nbsp;Jesus said - the Son can do nothing by himself. He does only what he sees the Father doing.&nbsp;Whatever the Father does, the Son also does.</p>
                                                        <p>Jesus said - I don't speak on my own authority. The Father who sent me has commanded me&nbsp;what to say and how to say it.</p>
                                                        <p>Jesus said that every word He spoke and every work He accomplished was based on HEARING&nbsp;from God and OBEYING what He heard.</p>
                                                        <p>Breathe IN - Hear from God.&nbsp;Breathe OUT - Obey what you hear and share it with others.</p>
                                                        <p>Jesus said that His followers would also hear from God because of His Holy Spirit - His Breath -&nbsp;that would be breathed into every one of us who follows Him.</p>
                                                        <p>Jesus said - the Helper, the Holy Spirit, whom the Father will send in my name, will teach you all&nbsp;things and remind you of everything that I have told you.</p>
                                                        <p>Breathe IN - Hear from God.&nbsp;Breathe OUT - Obey what you hear and share it with others.</p>
                                                        <p>Jesus was showing us how to live.</p>
                                                        <p>So how do we hear God’s voice? How do we know what to obey?</p>
                                                        <p>Jesus called Himself “The Good Shepherd”. Jesus called His followers His “sheep”.&nbsp;Jesus said - My sheep hear My voice, and I know them, and they follow Me.&nbsp;Jesus said - Whoever belongs to God hears what God says. The reason you do not hear is that&nbsp;you do not belong to God.</p>
                                                        <p>As followers of Jesus, we have to be committed to hearing His voice.</p>
                                                        <ul>
                                                            <li>We HEAR His voice by being still.</li>
                                                            <li>We HEAR His voice by focusing on Jesus.</li>
                                                            <li>We HEAR His voice in our thoughts, our visions, our feelings and impressions.</li>
                                                            <li>We HEAR His voice when we write down and test what we hear.</li>
                                                        </ul>
                                                        <p>Not every voice, not every thought, not every vision, feeling or impression is God’s voice.&nbsp;Sometimes it is the voice of the enemy. Jesus said our enemy is a liar and the father of lies. Jesus&nbsp;said our enemy comes to steal, kill and destroy.</p>
                                                        <p>But God says that we WILL hear from Him and we will know it is Him when He speaks.&nbsp;With practice and prayer, we can know God’s voice better. We can learn to know whether what&nbsp;we hear is from God or another voice.</p>
                                                        <p>Here are some ways to test what we hear:</p>
                                                        <ul>
                                                            <li>When Jesus speaks - His voice will always be consistent with what His Written Word - The&nbsp;Bible - has already told us. His spoken voice will never contradict His written voice.</li>
                                                            <li>When Jesus speaks - His voice will give our hearts a sense of hope and peace. His voice will&nbsp;not leave us condemned or discouraged. Jesus does not condemn. Jesus corrects in love.</li>
                                                            <li>Jesus’s voice will not express the works of the flesh - sexual immorality and impurity,&nbsp;debauchery, idolatry and witchcraft, hatred and discord, jealousy and fits of rage, selfish&nbsp;ambitions, dissensions, factions and envy, drunkenness and orgies. These things are not from&nbsp;God’s voice.</li>
                                                            <li>When Jesus speaks - His voice will express the fruit of God’s Spirit - love and joy, peace and&nbsp;patience, kindness and goodness, faithfulness, gentleness and self-control.</li>
                                                            <li>When Jesus speaks - His voice gives us a sense of confidence instead of doubt. We&nbsp;experience inside ourselves a knowledge and peace that what we’re hearing is from God. We&nbsp;may not hear everything at once. We may hear only part of what we eventually will need to&nbsp;know. But what we hear will be solid - not shifting or changing.</li>
                                                        </ul>
                                                        <p>The good news for every follower of Jesus is that when we breathe IN and HEAR from God and&nbsp;when we breathe OUT and OBEY what we hear and SHARE with others what we’ve heard - God&nbsp;will speak even more clearly.</p>
                                                        <p>His breath will breathe through us even more.</p>
                                                        <p>We will HEAR His voice more clearly.&nbsp;We will KNOW His voice and not another’s.&nbsp;We will SEE His work in the world and be able to join in and work with Him.</p>
                                                        <p>We breathe in. We breathe out. Life</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </watch-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><discuss-slide id="t3_c" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t3_c-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                        <span class="icon z-icon-discuss"></span>
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->DISCUSS</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(10 min)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <!--?lit$752283893$--><!---->
                                                    <ul class="bullets">
                                                        <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->Why is it essential to learn to hear and recognize God’s voice?</li><!----><!----><li><!--?lit$752283893$-->Is hearing and responding to the Lord really like breathing? Why or why not?</li><!---->
                                                    </ul>
                                                    <!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </discuss-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><watch-slide id="t4_a" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t4_a-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->READ</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(5 min)</span>
                                                        <div class="qr-code"><span target="_blank" class="bypass-nav-click" href="https://zume.training/app/qr/?l=en&amp;a=accountability"><img src="https://zume.training/make/qr?s=qrl&amp;sf=50&amp;wq=0&amp;d=https%3A%2F%2Fzume.training%2Fapp%2Fqr%2F%3Fl%3Den%26a%3Daccountability"></span></div>
                                                        <span class="subtitle">Watch video</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <div class="text">
                                                        <h3>S.O.A.P.S. Bible Study</h3>
                                                        <hr>
                                                    </div>
                                                    <div class="activity__content">
                                                        <p>Jesus said -- “make disciples of all nations, baptizing them in the name of the Father, Son and&nbsp;Holy Spirit and teaching them to obey all I that I commanded…”</p>
                                                        <p>If every follower of Jesus is going to obey all that Jesus commanded, then they need to know&nbsp;what Jesus commands.</p>
                                                        <p>The Great Commandment and The Great Commission are a great summary of what God has to&nbsp;say to us, but if a follower is going to grow into the full measure of what God created them to&nbsp;be, then they need to know and obey even more.</p>
                                                        <p>SOAPS stands for:</p>
                                                        <ul>
                                                            <li style="font-weight: bold"><strong>Scripture</strong></li>
                                                            <li style="font-weight: bold"><strong>Observation</strong></li>
                                                            <li style="font-weight: bold"><strong>Application</strong></li>
                                                            <li style="font-weight: bold"><strong>Prayer</strong></li>
                                                            <li style="font-weight: bold"><strong>Sharing</strong></li>
                                                        </ul>
                                                        <p>It’s a simple way to learn and remember an effective Bible study method that any follower of&nbsp;Jesus can use. Let’s look at each section a little more.</p>
                                                        <p>When you read or listen to the Bible:</p>
                                                        <ul>
                                                            <li><strong>Scripture</strong>: Write out one or more verses that are particularly meaningful to you, today.</li>
                                                            <li><strong>Observation</strong>: Rewrite those verses or key points from those scriptures in your own words to&nbsp;help you better understand the meaning.</li>
                                                            <li><strong>Application</strong>: Think about what it means to obey these commands or concepts in your own life.&nbsp; What would you have to do? What would you have to do differently? Write these down.</li>
                                                            <li><strong>Prayer</strong>: Write out a prayer that tells God what you’ve read in His word and what you&nbsp;understand about obeying His commands and putting what you’ve learned to work.</li>
                                                            <li><strong>Sharing</strong>: Ask God who He wants you to share with about what you’ve learned and how you’re&nbsp;applying it.</li>
                                                        </ul>
                                                        <p>So let’s put SOAPS to work:</p>
                                                        <ul>
                                                            <li><strong>Scripture</strong> - The Bible says -- “For my thoughts are not your thoughts, nor are your ways My&nbsp;ways,” declares the Lord. “For as the heavens are higher than the earth, so are My ways&nbsp;higher than your ways and My thoughts than your thoughts.” Isaiah 55:8-9.</li>
                                                            <li><strong>Observation</strong> - As a human, I’m limited in what I know and what I know how to do. God is not&nbsp;limited in any way. He sees and knows everything. He can do anything.</li>
                                                            <li><strong>Application</strong> - Since God knows everything and His ways are best, I’ll have much more success&nbsp;in life if I follow Him instead of relying on my way of doing things.</li>
                                                            <li><strong>Prayer</strong> - Lord, I don’t know how to live a good life that pleases you and helps others. My ways&nbsp;lead to mistakes. My thoughts lead to hurt. Please teach me Your ways and Your thoughts,&nbsp;instead. Let Your Holy Spirit guide me as I follow You.</li>
                                                            <li><strong>Sharing</strong> - I will share these verses and this application with my friend, Steve, who is going&nbsp;through a difficult time and needs direction for important decisions he’s facing.</li>
                                                        </ul>
                                                        <p>SOAPS Bible Study. One of the simple tools in the Zúme Toolkit.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </watch-slide></slide-switcher>
                        </div>

                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><watch-slide id="t5_a" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t5_a-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->ACTIVITY</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(20 min)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <div class="text">
                                                        <h3>Practice S.O.A.P.S.</h3>
                                                        <hr>
                                                    </div>
                                                    <div class="activity__content">
                                                        <!--?lit$752283893$--><!----><p><strong><!--?lit$752283893$-->Practice S.O.A.P.S.</strong></p><!----><!----><p><!--?lit$752283893$-->Scan QR code and work individually through the SOAPS Bible study pattern using Matthew 6:9-13. (20 min)</p><!----><!---->
                                                        <ul class="bullets">
                                                            <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->Scripture</li><!----><!----><li><!--?lit$752283893$-->Observation</li><!----><!----><li><!--?lit$752283893$-->Application</li><!----><!----><li><!--?lit$752283893$-->Prayer</li><!----><!----><li><!--?lit$752283893$-->Sharing</li><!---->
                                                        </ul>
                                                        <!----><!----><p><!--?lit$752283893$-->Return together and share your S.O.A.P.S. in groups of two or three. (10 min)</p><!---->
                                                        <hr>

                                                        <h3 class="activity-title">SOAPS Bible Study</h3>
                                                        <br>
                                                        <h3>Scripture</h3>
                                                        <p>Write out one or more verses that are particularly meaningful to you, today.</p>
                                                        <h3>Observation</h3>
                                                        <p>Rewrite those verses or key points in your own words to better understand.</p>
                                                        <h3>Application</h3>
                                                        <p>Think about what it means to obey these commands in your own life.</p>
                                                        <h3>Prayer</h3>
                                                        <p>Write out a prayer telling God what you’ve learned and how you plan to obey.</p>
                                                        <h3>Sharing</h3>
                                                        <p>Ask God who He wants you to share with about what you’ve learned/applied.</p>
                                                        <hr>
                                                        <h3>Here’s an example of S.O.A.P.S. at work:</h3>
                                                        <p><strong>S</strong> – “For my thoughts are not your thoughts, nor are your ways My ways,” declares the Lord. “For as the heavens are higher than the earth, so are My ways higher than your ways and My thoughts than your thoughts.” Isaiah 55:8-9</p>
                                                        <p><strong>O</strong> – As a human, I’m limited in what I know and what I know how to do. God is not limited in any way. He sees and knows EVERYTHING. He can do ANYTHING.</p>
                                                        <p><strong>A</strong> – Since God knows everything and His ways are best, I’ll have much more success in life if I follow Him instead of relying on my own way of doing things.</p>
                                                        <p><strong>P</strong> – Lord, I don’t know how to live a good life that pleases You and helps others. My ways lead to mistakes. My thoughts lead to hurt. Please teach me Your ways and Your thoughts, instead. Let your Holy Spirit guide me as I follow You.</p>
                                                        <p><strong>S</strong> – I will share these verses and this application with my friend, Steve, who is going through a difficult time and needs direction for important decisions he’s facing.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </watch-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><watch-slide id="t5_a" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t5_a-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->READ</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(5 min)</span>
                                                        <div class="qr-code"><span target="_blank" class="bypass-nav-click" href="https://zume.training/app/qr/?l=en&amp;a=accountability"><img src="https://zume.training/make/qr?s=qrl&amp;sf=50&amp;wq=0&amp;d=https%3A%2F%2Fzume.training%2Fapp%2Fqr%2F%3Fl%3Den%26a%3Daccountability"></span></div>
                                                        <span class="subtitle">Watch video</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <div class="text">
                                                        <h3>Accountability Groups</h3>
                                                        <hr>
                                                    </div>
                                                    <div class="activity__content">
                                                        <p>Jesus said - “From everyone who has been given much, much will be demanded; and from the one&nbsp;who has been entrusted with much, much more will be asked.”</p>
                                                        <p>Jesus shared many stories of accountability and told us many truths of how we will be held&nbsp;responsible for what we do and say.</p>
                                                        <p>Jesus tells us these things now, so we can be ready for later. And because we will be&nbsp;accountable to him one day, it’s good to practice being accountable to one another now.</p>
                                                        <p>Accountability Groups are made up of two or three people of the same gender - men with men,&nbsp;women with women - who meet once a week to discuss a set of questions that help reveal areas&nbsp;where things are going right and other areas that need correction.</p>
                                                        <p>Every follower of Jesus will be held accountable, so every follower of Jesus should practice&nbsp;accountability with others.</p>
                                                        <p>Accountability Groups. Another simple tool in the Zúme Toolkit.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </watch-slide></slide-switcher>
                        </div>

                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><watch-slide id="t5_a" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage t5_a-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                    </div>
                                                    <div class="stack">
                                                        <h2 class="title"><!--?lit$752283893$-->ACTIVITY</h2>
                                                        <span class="subtitle"><!--?lit$752283893$-->(20 min)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <div class="text">
                                                        <h3>Practice Accountability Groups</h3>
                                                        <hr>
                                                    </div>
                                                    <div class="activity__content">
                                                        <ul class="bullets">
                                                            <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->Scan the QR code.</li><!----><!----><li><!--?lit$752283893$-->Break into groups of two or three people of the same gender.</li><!----><!----><li><!--?lit$752283893$-->Spend the next 20 minutes working together through the Accountability Questions.</li><!---->
                                                        </ul>
                                                        <!---->
                                                        <hr>
                                                        <strong>Accountability Questions</strong>
                                                        <ol>
                                                            <li>How have you seen God at work?</li>
                                                            <li>Have you been a testimony this week to the greatness of Jesus Christ with both your words and actions?</li>
                                                            <li>Have you been exposed to sexually alluring material or allowed your mind to entertain inappropriate sexual thoughts?</li>
                                                            <li>Have you acknowledged God’s ownership in your use of money?</li>
                                                            <li>Have you coveted anything?</li>
                                                            <li>Have you hurt someone’s reputation or feelings by your words?</li>
                                                            <li>Have you been dishonest in word or action or exaggerated?</li>
                                                            <li>Have you given into an addictive (or lazy or undisciplined) behavior?</li>
                                                            <li>Have you been a slave to clothing, friends, work, or possessions?</li>
                                                            <li>Have you failed to forgive someone?</li>
                                                            <li>What worries or anxieties are you facing?</li>
                                                            <li>Have you complained or grumbled?</li>
                                                            <li>Have you maintained a thankful heart?</li>
                                                            <li>Have you been honoring, understanding and generous in your important relationships?</li>
                                                            <li>What temptations in thought, word, or action have you faced and how did you respond?</li>
                                                            <li>How have you taken opportunities to serve or bless others, especially believers?</li>
                                                            <li>Have you seen specific answers to prayer?</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </watch-slide></slide-switcher>
                        </div>
                        <!----><!---->

                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><review-slide id="s1_1_20" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage s1_1_20-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="two-column left">
                                            <div>
                                                <div class="title-area">
                                                    <div class="title-icon">
                                                        <span class="icon z-icon-review"></span>
                                                    </div>
                                                    <h2 class="title"><!--?lit$752283893$-->REVIEW</h2>
                                                </div>
                                            </div>
                                            <div class="content-area">
                                                <div class="stack content-area__text">
                                                    <!--?lit$752283893$--><!----><p><strong><!--?lit$752283893$-->Concepts heard in this session:</strong></p><!----><!---->
                                                    <ul class="bullets">
                                                        <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->God Uses Ordinary People</li><!----><!----><li><!--?lit$752283893$-->Simple Definition of Disciple &amp; Church</li><!----><!----><li><!--?lit$752283893$-->Spiritual Breathing</li><!---->
                                                    </ul>
                                                    <!----><!----><p><strong><!--?lit$752283893$-->Tools heard in this session:</strong></p><!----><!---->
                                                    <ul class="bullets">
                                                        <!--?lit$752283893$--><!----><li><!--?lit$752283893$-->S.O.A.P.S. Bible Reading</li><!----><!----><li><!--?lit$752283893$-->Accountability Groups</li><!---->
                                                    </ul>
                                                    <!---->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </review-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><obey-slide id="s1_1_21" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <!--?lit$752283893$-->
                                        <div class="stage s1_1_21-bar">
                                            <div class="progress-bar-wrapper">
                                                <!--?lit$752283893$--><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!----><!----><div class="progress-bar-divider"></div><!----><!---->
                                                <div class="progress-bar-stage">
                                                    <!--?lit$752283893$--><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item active"></div>
                                                    <!----><!---->
                                                    <div class="progress-bar-item "></div>
                                                    <!---->
                                                </div>
                                                <!---->
                                            </div>
                                        </div>

                                        <div class="obey-slide">
                                            <div class="two-column left">
                                                <div>
                                                    <div class="title-area">
                                                        <div class="title-icon">
                                                            <span class="icon z-icon-obey-concept"></span>
                                                        </div>
                                                        <h2 class="title"><!--?lit$752283893$-->OBEY</h2>
                                                    </div>
                                                </div>
                                                <div class="content-area">
                                                    <p><!--?lit$752283893$-->Begin practicing the S.O.A.P.S. Bible reading between now and your next meeting. Focus on Matthew 5-7, read it at least once a day. Keep a daily journal using the S.O.A.P.S. format.</p>
                                                </div>
                                            </div>
                                            <div class="two-column left">
                                                <div>
                                                    <div class="title-area">
                                                        <div class="title-icon">
                                                            <span class="icon z-icon-share-concept"></span>
                                                        </div>
                                                        <h2 class="title"><!--?lit$752283893$-->SHARE</h2>
                                                    </div>
                                                </div>
                                                <div class="content-area">
                                                    <p><!--?lit$752283893$-->Find an accountability partner (same gender) and begin meeting with them on a weekly basis.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </obey-slide></slide-switcher>
                        </div>
                        <!----><!---->
                        <div class="slide-switcher">
                            <slide-switcher incontainer=""><!----><final-slide id="final" incontainer="" dir="ltr"><!---->
                                    <div class="slides-card2" style="--slide-unit: 11.307px; --slide-height: 636.0187500000001px; --slide-width: 1130.7px;">
                                        <div class="cover-page">
                                            <div class="center stack | text-center w-50">
                                                <div class="w-30"><img src="https://storage.googleapis.com/zume-file-mirror/en/Zume-logo-blue.png"></div>
                                                <p><!--?lit$752283893$-->To saturate the world with multiplying disciples in our generation.</p>
                                                <div class="w-30"><img src="https://storage.googleapis.com/zume-file-mirror/en/jesus-globe.png"></div>
                                                <p><!--?lit$752283893$-->Zúme is a community of practice for those who want to see disciple making movements.</p>
                                            </div>
                                        </div>
                                    </div>
                                </final-slide></slide-switcher>
                        </div>
                        <!---->

                    </div>
                </div>
            </course-guide>
        </div>
        <?php
    }
}
Zume_Book_Generator::instance();
