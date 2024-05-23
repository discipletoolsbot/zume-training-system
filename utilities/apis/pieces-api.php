<?php
if ( !defined( 'ABSPATH' ) ) { exit; }
/**
 * Custom endpoints file
 */

class Zume_Pieces_Endpoints
{
    private $namespace;
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        if ( dt_is_rest() ) {
            $this->namespace = 'zume_system/v1';
            add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
        }
    }

    public function add_api_routes() {
        register_rest_route(
            $this->namespace, '/piece', [
                'methods' => 'GET',
                'callback' => [ $this, 'get_piece_page_content' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function get_piece_page_content( WP_REST_Request $request ){
        $params = $request->get_params();
        if ( ! isset( $params['id'], $params['lang'], $params['strings'] ) ) {
            return new WP_Error( 'log_param_error', 'Missing parameters', array( 'status' => 400 ) );
        }
        $lang = 'en';
        if ( ! empty( $params['lang'] ) ) {
            $lang = sanitize_text_field( wp_unslash( $params['lang'] ) );
        }

        $postid = sanitize_text_field( wp_unslash( $params['id'] ) );
        $strings = dt_recursive_sanitize_array( $params['strings'] );

        ob_start();

        pieces_content( $postid, $lang, $strings );

        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
}
Zume_Pieces_Endpoints::instance();


function pieces_content( $postid, $lang, $strings ) {

    $meta = get_post_meta( (int) $postid );

    if ( $meta['zume_lang'][0] !== $lang ) {
        $translated_postid = get_piece_translation_id( $postid, $lang );

        if ( $translated_postid !== $postid ) {
            $meta = get_post_meta( $translated_postid );
        }
    }

    $tool_number = $meta['zume_piece'][0] ?? 0;
    $pre_video_content = zume_replace_placeholder( $meta['zume_pre_video_content'][0] ?? '', $lang );
    $post_video_content = zume_replace_placeholder( $meta['zume_post_video_content'][0] ?? '', $lang );
    $ask_content = zume_replace_placeholder( $meta['zume_ask_content'][0] ?? '', $lang );
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

    <div class="container-xsm stack-2 | py-2 f-1 | pieces-page content">

        <?php if ( ! empty( $image_url ) ) : ?>
            <img class="hidden" src="<?php echo esc_url( $image_url ) ?>" alt="<?php echo esc_html( $h1_title ) ?>"/>
        <?php endif; ?>

        <div class="stack-1">
            <h1 class="center brand"><?php echo esc_html( $h1_title ) ?></h1>

            <div class="stack"><?php echo wp_kses_post( wpautop( $pre_video_content ) ) ?></div>
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
        <div class="stack"><?php echo wp_kses_post( wpautop( $post_video_content ) ) ?></div>

        <!-- question block -->
        <div class="stack">
            <h3 class="center"><?php echo esc_html( $strings['ay'] ) ?? '' ?></h3>
            <?php echo wp_kses_post( wpautop( $ask_content ) ) ?>
        </div>
    </div>

    <?php
}

function get_piece_translation_id( $postid, $lang_code ) {
    global $zume_languages_by_code;
    $post = get_post( $postid );
    $slug = $post->post_name;

    $slug_parts = explode( '-', $slug );
    $lang_part = $slug_parts[ count( $slug_parts ) - 1 ];

    if ( $lang_part === $lang_code ) {
        return $postid;
    }

    if ( !isset( $zume_languages_by_code[$lang_code] ) ) {
        return $postid;
    }

    if ( !isset( $zume_languages_by_code[$lang_part] ) ) {
        $slug_parts[] = $lang_code;
    } else {
        $slug_parts[ count( $slug_parts ) - 1 ] = $lang_code;
    }


    $translation_slug = implode( '-', $slug_parts );

    $post = zume_get_post_by_slug( $translation_slug, 'zume_pieces' );

    return $post->ID;
}

function pieces_by_lang_code( $lang_code ) {
    global $wpdb;

    $posts = $wpdb->get_results( $wpdb->prepare(
        "SELECT
            p.ID,
            p.post_title,
            p.post_name,
            pm1.meta_value as zume_piece,
            pm2.meta_value as zume_piece_h1,
            pm3.meta_value as zume_pre_video_content,
            pm4.meta_value as zume_post_video_content,
            pm5.meta_value as zume_ask_content,
            pm6.meta_value as zume_seo_meta_description
        FROM zume_posts p
        JOIN zume_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
        LEFT JOIN zume_postmeta pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'zume_piece'
        LEFT JOIN zume_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'zume_piece_h1'
        LEFT JOIN zume_postmeta pm3 ON p.ID = pm3.post_id AND pm3.meta_key = 'zume_pre_video_content'
        LEFT JOIN zume_postmeta pm4 ON p.ID = pm4.post_id AND pm4.meta_key = 'zume_post_video_content'
        LEFT JOIN zume_postmeta pm5 ON p.ID = pm5.post_id AND pm5.meta_key = 'zume_ask_content'
        LEFT JOIN zume_postmeta pm6 ON p.ID = pm6.post_id AND pm6.meta_key = 'zume_seo_meta_description'
        WHERE
            p.post_type = 'zume_pieces'
            AND p.post_status = 'publish'
            AND pm1.meta_value IS NOT NULL
        ORDER BY cast(pm1.meta_value as unsigned)
          ", $lang_code ), ARRAY_A );

    // dt_write_log( $posts );

    return $posts;
}

