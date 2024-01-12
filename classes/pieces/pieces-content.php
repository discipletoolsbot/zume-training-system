<?php

function pieces_content( $postid, $lang, $strings ) {

    if ( 'en' !== $lang && ! is_wp_error( $postid ) ){
        $postid = zume_get_translation( $postid, $lang );
    }
    if ( is_wp_error( $postid ) ) {
        return '';
    }

    $meta = get_post_meta( (int) $postid );

    $tool_number = $meta['zume_piece'][0] ?? 0;
    $pre_video_content = $meta['zume_pre_video_content'][0] ?? '';
    $post_video_content = $meta['zume_post_video_content'][0] ?? '';
    $ask_content = $meta['zume_ask_content'][0] ?? '';
    $h1_title = empty( $meta['zume_piece_h1'][0] ) ? get_the_title( $postid ) : $meta['zume_piece_h1'][0];

    $args = Zume_V5_Pieces::vars( $tool_number );

    if ( empty( $args ) ) {
        return '';
    }

    $alt_video = $args['alt_video'];
    $image_url = $args['image_url'];
    $audio = $args['audio'];
    $has_video = $args['has_video'];
    $video_id = $args['video_id'];

    ?>

    <div class="container-xsm stack-2 | py-2 f-1 | pieces-page">

        <?php if ( ! empty( $image_url ) ) : ?>
            <img class="hidden" src="<?php echo esc_url( $image_url ) ?>" alt="<?php echo esc_html( $h1_title ) ?>"/>
        <?php endif; ?>

        <div class="stack-1">
            <h1 class="center brand"><?php echo esc_html( $h1_title ) ?></h1>

            <div class="stack-1 s-1">
                <?php echo wp_kses_post( wpautop( $pre_video_content ) ) ?>
            </div>
        </div>


        <!-- video block -->
        <?php if ( $has_video ) : ?>
            <div class="stack-1">
                <?php if ( $audio ) :  ?>
                    <h3 class="center"><?php echo esc_html( $strings['lra'] ) ?? '' ?></h3>
                    <a class="btn large uppercase text-center"
                       href="<?php echo esc_url( Zume_Course::get_download_by_key( '33' ) ) ?>"
                       target="_blank" rel="noopener noreferrer nofollow">
                        <?php echo esc_html( $strings['d'] ) ?? '' ?>
                    </a>
                <?php else : ?>
                    <h3 class="center"><?php echo esc_html( $strings['wtv'] ) ?? '' ?></h3>
                <?php endif; ?>

                <?php if ( $alt_video ) : ?>
                    <video width="960" style="border: 1px solid lightgrey;max-width: 960px;width:100%;" controls>
                        <source src="<?php echo esc_url( zume_mirror_url() . zume_current_language() . '/'.$video_id.'.mp4' ) ?>" type="video/mp4" >
                        Your browser does not support the video tag.
                    </video>
                <?php else : ?>
                    <div class="responsive-embed widescreen">
                        <iframe style="border: 1px solid lightgrey;"  src="<?php echo esc_url( Zume_Course::get_video_by_key( $video_id ) ) ?>" width="560" height="315"
                                frameborder="1" webkitallowfullscreen mozallowfullscreen allowfullscreen>
                        </iframe>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <!-- post-video block -->
        <div class="">
            <div class="stack-1 | s-1"><?php echo wp_kses_post( wpautop( $post_video_content ) ) ?></div>
        </div>

        <!-- question block -->
        <div class="stack-1">
            <h3 class="center"><?php echo esc_html( $strings['ay'] ) ?? '' ?></h3>
            <?php echo wp_kses_post( wpautop( $ask_content ) ) ?>
        </div>
    </div>

    <?php

}
