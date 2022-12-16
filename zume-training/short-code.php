<?php

if ( ! function_exists( 'disciple_tools_login_shortcode' ) ) {
    add_action( 'init', 'disciple_tools_login_shortcode' );
    function disciple_tools_login_shortcode() {
        add_shortcode( 'disciple_tools_login_widget', [ 'DT_Login_Widget', 'load' ] );
    }
}

if ( ! class_exists( 'DT_Login_Widget' ) ) {
    class DT_Login_Widget {

        private static $_instance = null;
        public static function instance() {
            if ( is_null( self::$_instance ) ) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function __construct() {
            add_action( 'rest_api_init', array( $this,  'add_api_routes' ) );
        }

        public static function load() {
            ?>
            <script>
                const d = new Date();
                window.time = d.getTime();
                let params = {
                    "title": "Test Contact " + window.time
                }
                let queryParams = JSON.stringify(params) //jQuery.param( params )


            </script>
            <div style="text-align: center;">
                <button class="button" onclick="window.register_user()">Register User</button><br>
                <button class="button" onclick="window.api_remote_get('dt/v1/user/my').done(function(data){console.log(data)})">Remote Me</button><br>
                <button class="button" id="test">Test Loggedin</button><br>
                <hr>
                <button class="button" id="goodLogin">Good Login</button><br>
                <button class="button" id="badLogin">Bad Login</button><br>
                <button class="button" id="logout">Logout</button><br>
                <hr>
                <button class="button" onclick="window.is_logged_in()">Is Logged In?</button><br>
                <button class="button" onclick="window.api_remote_post('dt-posts/v2/contacts/70').done(function(data){console.log(data)})">Remote Contact</button><br>
                <hr>
                <button class="button" onclick="window.api_remote_post('dt-posts/v2/contacts/', params).done(function(data){console.log(data)})">Remote Create Contact</button><br>
                <button class="button" onclick="window.api_remote_post('dt-posts/v2/trainings/', params).done(function(data){console.log(data)})">Remote Create Training</button><br>
                <button class="button" onclick="window.api_remote_get('dt/v1/users/get_users/?get_all=1').done(function(data){console.log(data)})">Remote Users</button><br>
                <hr>
                <button class="button" onclick="window.api_post('test', 'test').done(function(data){console.log(data)})">Local</button><br>
            </div>
            <div id="response"></div>

            <script>
                jQuery(document).ready(function(){

                    window.jsObject = [<?php echo json_encode([
                        'root' => esc_url_raw( rest_url() ),
                        'nonce' => wp_create_nonce( 'wp_rest' ),
                        'translations' => [
                            'add' => __( 'Add Magic', 'prayer-global' ),
                        ],
                    ]) ?>][0]

                    window.user_object = false

                    window.api_post = ( action, data ) => {
                        return jQuery.ajax({
                            type: "POST",
                            data: JSON.stringify({ action: action, data: data }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: window.jsObject.root + 'dt-login/v1/login',
                            beforeSend: function (xhr) {
                                if (localStorage.token) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                                }
                            }
                        })
                            .fail(function(e) {
                                console.log(e)
                            })
                    }
                    window.api_remote_post = ( endpoint, data ) => {
                        return jQuery.ajax({
                            type: "POST",
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: `https://zume5.training/tools/wp-json/`+endpoint,
                            beforeSend: function (xhr) {
                                if (localStorage.token) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                                }
                            }
                        })
                            .fail(function(e) {
                                console.log(e)
                            })
                    }
                    window.api_remote_get = ( endpoint ) => {
                        return jQuery.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: `https://zume5.training/tools/wp-json/`+endpoint,
                            beforeSend: function (xhr) {
                                if (localStorage.token) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                                }
                            }
                        })
                            .fail(function(e) {
                                console.log(e)
                            })
                    }


                    window.register_user = () => {
                        let new_user_params = {
                            'user-email': window.time + '@email.com',
                            'user-display': window.time,
                            'user-password': window.time,
                            'locale': 'en'
                        }
                        window.api_remote_post('dt/v1/users/register', new_user_params)
                            .done(function(data){
                                console.log(data)
                                window.user_object = data
                                localStorage.token = data.jwt.token;
                                localStorage.user_display_name = data.jwt.user_display_name
                            })
                    }
                    window.is_logged_in = () => {
                        window.api_post('is_logged_in', '')
                            .done(function(data){
                                console.log(data)
                            })
                    }


                    jQuery('#test').click(function() {
                        jQuery.ajax({
                            type: 'POST',
                            url: 'https://zume5.training/tools/wp-json/jwt-auth/v1/token/validate',
                            beforeSend: function(xhr) {
                                if (localStorage.token) {
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                                }
                            },
                            success: function(data) {
                                if ( data ) {
                                    alert('Hello ' + localStorage.user_display_name + '!');
                                } else {
                                    alert("Sorry, you are not logged in.");
                                }
                            },
                            error: function() {
                                alert("Sorry, you are not logged in.");
                            }
                        });
                    });
                    jQuery('#goodLogin').click(function() {
                        jQuery.ajax({
                            type: "POST",
                            url: "https://zume5.training/tools/wp-json/jwt-auth/v1/token",
                            data: {
                                username: "chris@chasm.solutions",
                                password: "Dc6AfizvlJZoIw0YNr#uq@KD"
                            },
                            success: function(data) {
                                console.log(data)
                                localStorage.token = data.token;
                                localStorage.user_display_name = data.user_display_name
                            },
                            error: function() {
                                alert("Login Failed");
                            }
                        });
                    });
                    jQuery('#badLogin').click(function() {
                        jQuery.ajax({
                            type: "POST",
                            url: "https://zume5.training/tools/wp-json/jwt-auth/v1/token",
                            data: {
                                username: "chris@chasm.solutions",
                                password: "foobarfoobar"
                            },
                            success: function(data) {
                                alert("ERROR: it is not supposed to alert.");
                            },
                            error: function() {
                                alert("Login Failed");
                            }
                        });
                    });
                    jQuery('#logout').click(function() {
                        localStorage.clear();
                    });
                })
            </script>
            <?php
        }

        public function add_api_routes() {
            $namespace = 'dt-login/v1';
            register_rest_route( $namespace, '/login', array(
                array(
                    'methods'         => WP_REST_Server::CREATABLE,
                    'callback'        => array( $this, 'login' ),
                    'permission_callback' => '__return_true'
                ),
            ) );
        }

        public function login( WP_REST_Request $request ){
            $params = $request->get_params();

            if ( !isset( $params['action'], $params['data'] ) ) {
                return new WP_Error( 'missing_error', 'Missing fields', [ 'status' => 400 ] );
            }

            $action = $params['action'];
            $data = $params['data'];

            switch ( $action ) {
                case 'is_logged_in':
                    return ( is_user_logged_in() ) ? 'Logged In' : 'Not Logged In';
                case 'test':
                    return true;
                case 'login':
                    $user_id = $data['user_id'];
                    $user = get_user_by( 'id', $user_id );
                    wp_set_current_user( $user_id, $user->user_login );
                    wp_set_auth_cookie( $user_id );
                    do_action( 'wp_login', $user->user_login, $user );
                    return $user;
                    break;
                default:
                    return false;

            }
        }
    }
    DT_Login_Widget::instance();
}


