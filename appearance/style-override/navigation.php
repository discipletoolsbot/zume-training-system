<?php

class Zume_Training_Navigation
{
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
//        add_filter( 'dt_nav', [ $this, 'dt_nav' ], 999, 1 );
//        add_action( 'dt_nav_add_post_settings', [ $this, 'view_list' ] );
    }

    public function dt_nav( $tabs ) {

        // swap logo
        $tabs['admin']['site']['icon'] = trailingslashit( plugin_dir_url( __FILE__ ) ) . 'zume-training-logo.svg';

        $user_view = get_user_option( 'custom_user_view' );

        unset( $tabs['main']['contacts'] );
        unset( $tabs['main']['groups'] );
        unset( $tabs['main']['trainings'] );
        unset( $tabs['main']['metrics'] );

        // first training view
        if ( 'first' === $user_view ) {

            unset( $tabs['main']['contacts'] );
            unset( $tabs['main']['groups'] );
            unset( $tabs['main']['trainings'] );
            unset( $tabs['main']['metrics'] );

            unset( $tabs['admin']['notifications'] );
            unset( $tabs['admin']['add_new'] );
            unset( $tabs['admin']['settings']['submenu']['help'] );

        }
        else if ( 'contacts' === $user_view ) {

            unset( $tabs['main']['metrics'] );

            unset( $tabs['admin']['notifications'] );
            unset( $tabs['admin']['add_new'] );
            unset( $tabs['admin']['settings']['submenu']['help'] );

        }
        else if ( 'groups' === $user_view ) {

            unset( $tabs['main']['metrics'] );

            unset( $tabs['admin']['notifications'] );
            unset( $tabs['admin']['add_new'] );
            unset( $tabs['admin']['settings']['submenu']['help'] );

        }
        else if ( 'trainings' === $user_view ) {

            unset( $tabs['main']['metrics'] );

            unset( $tabs['admin']['notifications'] );
            unset( $tabs['admin']['add_new'] );
            unset( $tabs['admin']['settings']['submenu']['help'] );

        }
        // full view removes nothing

        array_unshift( $tabs['main'],
            [
                'link' => esc_url( site_url( '/course/' ) ),
                'label' => esc_html__( 'Training', 'zume' ),
                'submenu' => [
                    'home' => [
                        'link' => esc_url( site_url( '/training/' ) ),
                        'label' => esc_html__( 'Training', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'works' => [
                        'link' => esc_url( site_url( '/course/' ) ),
                        'label' => esc_html__( 'How it Works', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'course' => [
                        'link' => esc_url( site_url( '/course/' ) ),
                        'label' => esc_html__( 'Download Guidebook', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'zume_faq' => [
                        'link' => esc_url( site_url( '/zume-faq/' ) ),
                        'label' => esc_html__( 'FAQs', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],

                ],
            ],
            [
                'link' => esc_url( site_url( '/dashboard/' ) ),
                'label' => esc_html__( 'Dashboard', 'zume' ),
                'submenu' => [],
                'hidden' => false,
            ],
            [
                'link' => esc_url( site_url( '/contacts/' ) ),
                'label' => esc_html__( 'My Zúme', 'zume' ),
                'hidden' => false,
                'submenu' => [
                    'contacts' => [
                        'link' => esc_url( site_url( '/contacts/' ) ),
                        'label' => esc_html__( 'Contacts', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'groups' => [
                        'link' => esc_url( site_url( '/groups/' ) ),
                        'label' => esc_html__( 'Groups', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'trainings' => [
                        'link' => esc_url( site_url( '/trainings/' ) ),
                        'label' => esc_html__( 'Trainings', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'metrics' => [
                        'link' => esc_url( site_url( '/metrics/' ) ),
                        'label' => esc_html__( 'Metrics', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                ],
            ],
            [
                'link' => '#',
                'label' => esc_html__( 'Community', 'zume' ),
                'hidden' => false,
                'submenu' => [
                    'zume_vision' => [
                        'link' => esc_url( site_url( '/zume-vision/' ) ),
                        'label' => esc_html__( 'Vision', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'contacts' => [
                        'link' => esc_url( site_url( '/zume-news/' ) ),
                        'label' => esc_html__( 'Stories', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                    'groups' => [
                        'link' => esc_url( site_url( '/zume-map/' ) ),
                        'label' => esc_html__( 'Global Map', 'zume' ),
                        'icon' => '',
                        'hidden' => false,
                    ],
                ],
            ]
        );


        return $tabs;
    }

    public function view_list() {
        $user_views = [
            [
                'label' => 'First Training Focus',
                'link' => '',
                'value' => 'first',
            ],
            [
                'label' => 'Evangelism Focus',
                'link' => '',
                'value' => 'multi',
            ],
            [
                'label' => 'Group Growing Focus',
                'link' => '',
                'value' => 'movement',
            ],
            [
                'label' => 'Training Focus',
                'link' => '',
                'value' => 'training',
            ],
        ];
        ?>
        <li>
            <button>
                <i class="fi-eye" style="color:white; background-color: #005a87; border-radius:10px;  font-size:2rem;"></i>
            </button>
            <ul class="submenu menu vertical">
                <?php
                foreach ( $user_views as $site ){
                    echo '<li><a class="user_view" data-value="'. esc_html( $site['value'] ) .'">'. esc_html( $site['label'] ) .'</a>';
                }
                ?>
            </ul>
        </li>
        <script>
            // add listeners
            jQuery(document).ready(function(){
                jQuery('.user_view').on('click', function(e){
                    makeRequest('POST', '/user_view', {'view': e.currentTarget.dataset.value}, 'zume-training/v1')
                        .done(function(data){
                            console.log('return')
                            console.log(data)

                            window.location.reload()
                        })
                })
            })
        </script>
        <?php
    }
}
Zume_Training_Navigation::instance();
