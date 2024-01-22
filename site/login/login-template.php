<?php
$dt_login = DT_Login_Fields::all_values();

/**
 * Catch Logout Request and Process Immediately
 */
if ( isset( $_GET['action'] ) && 'logout' === $_GET['action'] ) {
    wp_destroy_current_session();
    wp_clear_auth_cookie();
    wp_safe_redirect( dt_login_url( 'home' ) );
    exit;
}
if ( is_user_logged_in() ) {
    wp_safe_redirect( dt_login_url( 'redirect' ) );
    exit;
}

add_action( 'wp_head', 'wp_no_robots' );

nocache_headers();

// Fix for page title
global $wp_query;
$wp_query->is_404 = false;



// set variables
// @codingStandardsIgnoreLine
$request_action = isset( $_REQUEST['action'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['action'] ) ) : 'login';

// @codingStandardsIgnoreLine
$http_post = ( 'POST' == $_SERVER['REQUEST_METHOD'] );
$form_errors = new WP_Error();

// preset defaults
if ( isset( $_GET['key'] ) ) {
    $request_action = 'resetpass';
}
if ( !in_array( $request_action, array( 'postpass', 'logout', 'lostpassword', 'retrievepassword', 'resetpass', 'rp', 'register', 'login', 'confirmation' ), true ) && false === has_filter( 'login_form_' . $request_action ) ) {
    $request_action = 'login'; // validate action so as to default to the login screen
}


switch ( $request_action ) {

    case 'lostpassword' :
    case 'retrievepassword' :
        $sent = false;
        $user_login_response = '';

        if ( $http_post ) {
            if ( isset( $_POST['retrieve_password_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['retrieve_password_nonce'] ) ), 'retrieve_password' ) ) {

                $form_errors = DT_Login_Email::retrieve_password();
                if ( ! is_wp_error( $form_errors ) ) {
                    $sent = true;
                }

                if ( isset( $_POST['user_login'] ) ) {
                    $user_login_response = sanitize_text_field( wp_unslash( $_POST['user_login'] ) );
                }
            }
        }

        if ( isset( $_GET['error'] ) ) {
            if ( 'invalidkey' == $_GET['error'] ) {
                $form_errors->add( 'invalidkey', __( 'Your password reset link appears to be invalid. Please request a new link below.', 'zume' ) );
            } elseif ( 'expiredkey' == $_GET['error'] ) {
                $form_errors->add( 'expiredkey', __( 'Your password reset link has expired. Please request a new link below.', 'zume' ) );
            }
        }

        $lostpassword_redirect = ! empty( $_REQUEST['redirect_to'] ) ? sanitize_text_field( wp_unslash( $_REQUEST['redirect_to'] ) ) : '';
        $redirect_to = apply_filters( 'lostpassword_redirect', $lostpassword_redirect );

        do_action( 'lost_password' );

        $translated_error_messages = [
            'retrieve-password-missing-nonce' => __( 'Missing form verification. Refresh and try again.', 'zume' ),
            'retrieve-password-missing-username-email' => __( 'Missing username or email address.', 'zume' ),
            'retrieve-password-no-username-email' => __( 'ERROR: Enter a username or email address.', 'zume' ),
            'retrieve-password-bad-email-address' => __( 'ERROR: There is no user registered with that email address.', 'zume' ),
            'retrieve-password-bad-username' => __( 'ERROR: There is no user registered with that username.', 'zume' ),
            'invalidcombo' => __( 'ERROR: Invalid username or email.', 'zume' ),
        ];

        ?>

        <div id="login">
            <div class="grid-container rounded-multi">
                <div class="hide-for-small-only hide-for-medium-only | text-center bg-brand-light shadow">
                    <div class="cover center | w-100">
                        <div class="w-25 p0"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Thinking-01.svg' ) ?>" alt=""></div>
                    </div>
                </div>
                <div class="cover | text-center bg-white px-1 py-0 shadow rounded-start-on-medium">
                    <h1 class="brand"><?php esc_html_e( 'Get New Password', 'zume' ) ?></h1>

                    <?php if ( ! empty( $form_errors->errors ) ) : ?>

                        <div class="warning banner">

                            <?php

                            if ( isset( $translated_error_messages[$form_errors->get_error_code()] ) ) {
                                echo esc_html( $translated_error_messages[$form_errors->get_error_code()] );
                            } else {
                                echo esc_html( $form_errors->get_error_message() );
                            }

                            ?>

                        </div>

                    <?php endif; ?>

                    <div class="wp_lostpassword_form">

                        <?php if ( ! $sent ) : ?>

                            <form class="stack--1" name="lostpasswordform" id="lostpasswordform" action="<?php echo esc_url( dt_login_url( 'lostpassword' ) ); ?>" method="post">
                                <label class="show-for-sr" for="user_login" ><?php echo esc_html__( 'Email Address', 'zume' ); ?></label>
                                <input type="text" name="user_login" id="user_login" class="input" placeholder="<?php echo esc_html__( 'Email Address', 'zume' ); ?>" value="<?php echo esc_attr( $user_login_response ); ?>" size="20" />
                                <?php wp_nonce_field( 'retrieve_password', 'retrieve_password_nonce', false, true ) ?>
                                <?php
                                /**
                                 * Fires inside the lostpassword form tags, before the hidden fields.
                                 *
                                 * @since 2.1.0
                                 */
                                do_action( 'lostpassword_form' ); ?>
                                <input type="hidden" name="redirect_to" value="<?php echo esc_attr( $redirect_to ); ?>" />
                                <input type="submit" name="wp-submit" id="wp-submit" class="btn light uppercase" value="<?php echo esc_html__( 'Get New Password', 'zume' ); ?>" />
                            </form>

                        <?php elseif ( $sent ): ?>

                            <?php echo esc_html__( 'Your password reset email has been sent. Check your email or junk mail for the link to reset your password.', 'zume' ) ?>

                        <?php endif; ?>

                    </div>
                    <div>
                        <?php zume_login_form_links() ?>
                    </div>
                </div>
            </div>
        </div>

        <?php
        break;

    case 'resetpass' :
    case 'rp' :
        // @codingStandardsIgnoreStart
        list( $rp_path ) = explode( '?', wp_unslash( $_SERVER['REQUEST_URI'] ) );
        $rp_cookie = 'wp-resetpass-' . COOKIEHASH;
        if ( isset( $_GET['key'] ) && isset( $_GET['login'] ) ) {
            $value = sprintf( '%s:%s', wp_unslash( $_GET['login'] ), wp_unslash( $_GET['key'] ) );
            setcookie( $rp_cookie, $value, 0, $rp_path, COOKIE_DOMAIN, is_ssl(), true );
            wp_safe_redirect( remove_query_arg( array( 'key', 'login' ) ) );
            exit;
        }

        if ( isset( $_COOKIE[ $rp_cookie ] ) && 0 < strpos( sanitize_text_field( wp_unslash( $_COOKIE[ $rp_cookie ] ) ), ':' ) ) {
            list( $rp_login, $rp_key ) = explode( ':', wp_unslash( $_COOKIE[ $rp_cookie ] ), 2 );
            $user                      = check_password_reset_key( $rp_key, $rp_login );
            if ( isset( $_POST['pass1'] ) && ! hash_equals( $rp_key, $_POST['rp_key'] ) ) {
                $user = false;
            }
        } else {
            $user = false;
        }


        if ( ! $user || is_wp_error( $user ) ) {
            setcookie( $rp_cookie, ' ', time() - YEAR_IN_SECONDS, $rp_path, COOKIE_DOMAIN, is_ssl(), true );
            if ( $user && $user->get_error_code() === 'expired_key' ) {
                wp_redirect( dt_login_url( 'expiredkey' ) );
            } else {
                wp_redirect( dt_login_url( 'invalidkey' ) );
            }
            exit;
        }

        $form_errors = new WP_Error();

        if ( isset( $_POST['pass1'] ) && $_POST['pass1'] != $_POST['pass2'] ) {
            $form_errors->add( 'password_reset_mismatch', __( 'Passwords do not match. Please, try again.', 'zume' ) );
        }

        /**
         * Fires before the password reset procedure is validated.
         *
         * @since 3.5.0
         *
         * @param object           $errors WP Error object.
         * @param WP_User|WP_Error $user   WP_User object if the login and reset key match. WP_Error object otherwise.
         */
        do_action( 'validate_password_reset', $form_errors, $user );

    if ( ( ! $form_errors->get_error_code() ) && isset( $_POST['pass1'] ) && !empty( $_POST['pass1'] ) ) {
            reset_password( $user, $_POST['pass1'] );
            setcookie( $rp_cookie, ' ', time() - YEAR_IN_SECONDS, $rp_path, COOKIE_DOMAIN, is_ssl(), true );
            // @codingStandardsIgnoreEnd
            ?>
        <div id="login">
            <div id="inner-content" class="grid-container rounded-multi">
                <div class="hide-for-small-only hide-for-medium-only | text-center bg-brand-light shadow">
                    <div class="cover center w-100">
                        <div class="w-25 p0"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Thinking-01.svg' ) ?>" alt=""></div>
                    </div>
                </div>
                <div class="cover | text-center bg-white px-1 py-0 shadow rounded-start-on-medium">
                    <div>
                        <?php printf( esc_html__( 'Your password is reset. %1$s You can login here %2$s', 'zume' ), '<a href="' . esc_url( dt_login_url( 'login' ) ) . '">', '</a>' ) ?>
                    </div>
                </div>
            </div>
        </div>
            <?php

            exit;
        }

        ?>
        <style>
            meter{
                width:100%;
            }
            /* Webkit based browsers */
            meter[value="1"]::-webkit-meter-optimum-value { background: red; }
            meter[value="2"]::-webkit-meter-optimum-value { background: yellow; }
            meter[value="3"]::-webkit-meter-optimum-value { background: orange; }
            meter[value="4"]::-webkit-meter-optimum-value { background: green; }

            /* Gecko based browsers */
            meter[value="1"]::-moz-meter-bar { background: red; }
            meter[value="2"]::-moz-meter-bar { background: yellow; }
            meter[value="3"]::-moz-meter-bar { background: orange; }
            meter[value="4"]::-moz-meter-bar { background: green; }

        </style>
        <div id="login">
            <div id="inner-content" class="grid-container rounded-multi">
                <div class="hide-for-small-only hide-for-medium-only | text-center bg-brand-light shadow">
                    <div class="cover center | w-100">
                        <div class="w-25 p0"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Thinking-01.svg' ) ?>" alt=""></div>
                    </div>
                </div>
                <div class="cover | text-center bg-white px-1 py-0 shadow rounded-start-on-medium">
                    <h1 class="brand"><?php esc_html_e( 'Reset Password', 'zume' ) ?></h1>
                    <?php if ( ! empty( $form_errors->errors ) ) :?>
                        <div class="warning banner">
                            <?php
                            echo esc_html( $form_errors->get_error_message() );
                            ?>
                        </div>
                    <?php endif; ?>
                    <div class="">
                        <form class="stack--1" name="resetpassform" id="resetpassform" action="<?php echo esc_url( dt_login_url( 'resetpass' ) ); ?>" method="post" autocomplete="off" data-abide novalidate>
                            <div>
                                <label class="show-for-sr" for="pass1"><?php esc_html_e( 'Password Required', 'zume' ) ?> <strong>*</strong></label>
                                <input class="input" type="password" id="pass1" name="pass1" placeholder="<?php esc_html_e( 'Password', 'zume' ) ?> *" aria-errormessage="password-error-1" required >
                                <span class="form-error" id="password-error-too-weak">
                                    <?php esc_html_e( 'Please choose a stronger password. This one is too weak.', 'zume' ) ?>
                                </span>

                            </div>
                            <meter max="4" id="password-strength-meter" value="0"></meter>
                            <div>
                                <label class="show-for-sr" for="pass2"><?php esc_html_e( 'Re-enter Password', 'zume' ) ?> <strong>*</strong></label>
                                <input class="input" type="password" name="pass2" placeholder="<?php esc_html_e( 'Re-enter Password', 'zume' ) ?> *" aria-errormessage="password-error-2" data-equalto="pass1">
                                <span class="form-error" id="password-error-2">
                                    <?php esc_html_e( 'Passwords do not match. Please, try again.', 'zume' ) ?>
                                </span>
                            </div>

                            <?php
                            /**
                             * Fires following the 'Strength indicator' meter in the user password reset form.
                             *
                             * @since 3.9.0
                             *
                             * @param WP_User $user User object of the user whose password is being reset.
                             */
                            do_action( 'resetpass_form', $user );
                            ?>
                            <input type="hidden" id="user_login" value="<?php echo esc_attr( $rp_login ); ?>" autocomplete="off" />
                            <input type="hidden" name="rp_key" value="<?php echo esc_attr( $rp_key ); ?>" />

                            <input type="hidden" name="wp-submit" id="wp-submit" value="" />

                            <button class="btn light">
                                <?php esc_html_e( 'Reset Password', 'zume' ); ?>
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
        <script>
            const strength = {
                0: "Worst",
                1: "Bad",
                2: "Weak",
                3: "Good",
                4: "Strong"
            }
            const minStrength = 3

            const form = document.getElementById('resetpassform')
            const password = document.getElementById('pass1');
            const passwordStrengthError = document.getElementById('password-error-too-weak')
            const meter = document.getElementById('password-strength-meter');

            password.addEventListener('input', function() {
                const result = getPasswordStrength()
                // Update the password strength meter
                meter.value = result.score;

                if ( result.score >= minStrength ) {
                    passwordStrengthError.style.display = 'none'
                }
            });

            form.addEventListener('submit', function(event) {
                const result = getPasswordStrength()

                if ( result.score < minStrength ) {
                    event.preventDefault()
                    passwordStrengthError.style.display = 'block'
                }
            })

            function getPasswordStrength() {
                const val = password.value;
                const result = zxcvbn(val);

                return result
            }

        </script>
    <?php // @codingStandardsIgnoreStart ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.2.0/zxcvbn.js"></script>
        <?php // @codingStandardsIgnoreEnd ?>
        <?php
        break;

    case 'register' :
        $register = DT_Login_Email::instance();
        $reg_status = $register->custom_registration_function();

        $has_email_error = is_wp_error( $reg_status );
        ?>

            <div id="login">
                <div class="grid-container rounded-multi">
                    <div class="hide-for-small-only hide-for-medium-only | text-center bg-brand-light px-1 py-0 shadow">
                        <div class="cover">
                            <section>
                                <h2 class="white"><?php echo esc_html__( 'Hello!', 'zume' ) ?></h2>
                                <h3 class="white"><?php echo esc_html__( 'Create a Zume Account', 'zume' ) ?></h3>
                            </section>
                            <div class="center w-100">
                                <div class="w-50 py-2"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/desk.svg' ) ?>" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <div class="stack-3 | bg-white px-1 py-0 shadow rounded-start-on-medium">
                        <h1 class="brand text-center"><?php esc_html_e( 'Register', 'zume' ) ?></h1>
                        <div class="">

                            <div class="stack-1 sso-register <?php echo $has_email_error ? 'hidden' : '' ?>">

                                <?php

                                [ 'lang_code' => $lang_code ] = zume_get_url_pieces();

                                if ( strlen( $lang_code ) === 4 ) {
                                    $lang_code = implode( '_', str_split( $lang_code, 2 ) );
                                }

                                if ( $lang_code === 'pt' ) {
                                    $lang_code = 'pt_pt';
                                }


                                $dt_url = new DT_URL( $url );
                                $query_params = $dt_url->query_params;
                                $query_redirect_to = $query_params->get( 'redirect_to' );

                                do_shortcode( "[dt_firebase_login_ui lang_code=$lang_code redirect_to=$query_redirect_to]" )

                                ?>

                                <span class="line-text f--1"><span><?php echo esc_html__( 'Or', 'zume' ) ?></span></span>

                                <button class="btn outline-dark register-email-toggle"><?php echo esc_html__( 'Register with Email', 'zume' ) ?></button>

                            </div>

                            <div id="email_signup_form" class="<?php echo $has_email_error ? '' : 'hidden' ?> stack">

                                <button class="btn outline-dark fit-content register-email-toggle"><?php echo esc_html__( 'Back', 'zume' ) ?></button>

                                <?php if ( is_wp_error( $reg_status ) ) :?>
                                    <div class="cell warning banner">
                                        <?php echo esc_html( $reg_status->get_error_message() ) ?>
                                    </div>
                                <?php endif; ?>
                                <div class="">
                                    <div class="wp_register_form">
                                        <style>
                                            meter{
                                                width:100%;
                                            }
                                            /* Webkit based browsers */
                                            meter[value="1"]::-webkit-meter-optimum-value { background: red; }
                                            meter[value="2"]::-webkit-meter-optimum-value { background: yellow; }
                                            meter[value="3"]::-webkit-meter-optimum-value { background: orange; }
                                            meter[value="4"]::-webkit-meter-optimum-value { background: green; }

                                            /* Gecko based browsers */
                                            meter[value="1"]::-moz-meter-bar { background: red; }
                                            meter[value="2"]::-moz-meter-bar { background: yellow; }
                                            meter[value="3"]::-moz-meter-bar { background: orange; }
                                            meter[value="4"]::-moz-meter-bar { background: green; }

                                        </style>
                                        <div>
                                            <form class="stack--1" id="loginform" action="" method="POST" data-abide novalidate>
                                                <div>
                                                    <label class="show-for-sr" for="email"><?php esc_html_e( 'Email', 'zume' ) ?> <strong>*</strong></label>
                                                    <input class="input" type="email" name="email" id="email" value="" aria-errormessage="email-error" placeholder="<?php esc_html_e( 'Email', 'zume' ) ?>*" required>
                                                    <span class="form-error" id="email-error">
                                                        <?php esc_html_e( 'Badly formatted email address', 'zume' ) ?>
                                                    </span>
                                                </div>
                                                <div>
                                                    <label class="show-for-sr"><?php esc_html_e( 'Password', 'zume' ) ?> <strong>*</strong></label>
                                                    <input class="input" type="password" id="password" name="password" placeholder="<?php esc_html_e( 'Password', 'zume' ) ?>*" aria-errormessage="password-error-too-weak" required >
                                                    <span class="form-error" id="password-error-too-weak">
                                                        <?php esc_html_e( 'Password is not strong enough', 'zume' ) ?>
                                                    </span>
                                                </div>
                                                <meter max="4" id="password-strength-meter" value="0"></meter>
                                                <div>
                                                    <label class="show-for-sr"><?php esc_html_e( 'Re-enter Password', 'zume' ) ?> <strong>*</strong></label>
                                                    <input class="input" id="password2" name="password2" type="password" placeholder="<?php esc_html_e( 'Re-enter Password', 'zume' ) ?>*" aria-errormessage="password-error-2" data-equalto="password" required>
                                                    <span class="form-error" id="password-error-2">
                                                        <?php esc_html_e( 'Passwords do not match. Please, try again.', 'zume' ) ?>
                                                    </span>
                                                </div>
                                                <div data-abide-error class="warning banner" style="display: none;">
                                                    <p><i class="fi-alert"></i><?php esc_html_e( 'There are some errors in your form.', 'zume' ) ?></p>
                                                </div>
                                                <?php wp_nonce_field( 'login_form', 'login_form_nonce' ) ?>
                                                <div>
                                                    <div class="g-recaptcha" id="g-recaptcha"></div>
                                                    <button class="btn light w-100" id="submit">
                                                        <?php esc_html_e( 'Register', 'zume' ) ?>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        <?php // @codingStandardsIgnoreStart
                                        if ( isset( $dt_login['google_captcha_client_key'] ) && !empty( $dt_login['google_captcha_client_key'] ) ) :
                                            ?>
                                            <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
                                        <?php // @codingStandardsIgnoreEnd
                                        endif;
                                        ?>
                                        <script>
                                            const strength = {
                                                0: "Worst",
                                                1: "Bad",
                                                2: "Weak",
                                                3: "Good",
                                                4: "Strong"
                                            }
                                            const minStrength = 3

                                            const form = document.getElementById('loginform')
                                            const password = document.getElementById('password');
                                            const passwordStrengthError = document.getElementById('password-error-too-weak')
                                            const meter = document.getElementById('password-strength-meter');

                                            password.addEventListener('input', function() {
                                                const result = getPasswordStrength()
                                                // Update the password strength meter
                                                meter.value = result.score;

                                                if ( result.score >= minStrength ) {
                                                    passwordStrengthError.style.display = 'none'
                                                }
                                            });

                                            form.addEventListener('submit', function(event) {
                                                const result = getPasswordStrength()

                                                if ( result.score < minStrength ) {
                                                    event.preventDefault()
                                                    passwordStrengthError.style.display = 'block'
                                                }
                                            })

                                            function getPasswordStrength() {
                                                const val = password.value;
                                                const result = zxcvbn(val);

                                                return result
                                            }

                                        </script>
                                        <?php // @codingStandardsIgnoreStart ?>
                                        <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.2.0/zxcvbn.js"></script>
                                        <?php // @codingStandardsIgnoreEnd ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section class="text-center">
                            <?php zume_login_form_links() ?>
                        </section>
                    </div>
                </div>
            </div>

        <?php
        break;

    case 'confirmation' :
        if ( ! isset( $_GET['request_id'] ) ) {
            wp_die( 'Invalid request.' );
        }

        $request_id = (int) $_GET['request_id'];

        if ( isset( $_GET['confirm_key'] ) ) {
            $key    = sanitize_text_field( wp_unslash( $_GET['confirm_key'] ) );
            $result = wp_validate_user_request_key( $request_id, $key );
        } else {
            $result = new WP_Error( 'invalid_key', 'Invalid key' );
        }

        if ( is_wp_error( $result ) ) {
            wp_die( esc_attr( serialize( $result ) ) );
        }

        /**
         * Fires an action hook when the account action has been confirmed by the user.
         *
         * Using this you can assume the user has agreed to perform the action by
         * clicking on the link in the confirmation email.
         *
         * After firing this action hook the page will redirect to wp-login a callback
         * redirects or exits first.
         *
         * @param int $request_id Request ID.
         */
        do_action( 'user_request_action_confirmed', $request_id );

        $message = _wp_privacy_account_request_confirmed_message( $request_id );

        login_header( __( 'User action confirmed.', 'zume' ), $message );
        login_footer();
        exit; // @todo possibly remove

    case 'login' :
    default:
        ?>

            <div id="login">
                <div class="grid-container rounded-multi">
                    <div class="hide-for-small-only hide-for-medium-only | text-center bg-brand-light px-1 py-0 shadow">
                        <div class="cover">
                            <h2 class="white"><?php echo esc_html__( 'Welcome back!', 'zume' ) ?></h2>
                            <div class="center | w-100">
                                <div class="w-70"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Jesus-01.svg' ) ?>" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center bg-white px-1 py-0 shadow rounded-start-on-medium">
                        <h1 class="brand"><?php esc_html_e( 'Login', 'zume' ) ?></h1>
                        <div class="stack-1">

                            <?php

                            [ 'lang_code' => $lang_code ] = zume_get_url_pieces();

                            if ( strlen( $lang_code ) === 4 ) {
                                $lang_code = implode( '_', str_split( $lang_code, 2 ) );
                            }

                            if ( $lang_code === 'pt' ) {
                                $lang_code = 'pt_pt';
                            }

                            $dt_url = new DT_URL( $url );
                            $query_params = $dt_url->query_params;
                            $query_redirect_to = $query_params->get( 'redirect_to' );

                            do_shortcode( "[dt_firebase_login_ui lang_code=$lang_code redirect_to=$query_redirect_to]" )

                            ?>

                            <span class="line-text f--1"><span><?php echo esc_html__( 'or sign in with email', 'zume' ) ?></span></span>

                            <?php
                            if ( isset( $_GET['login'] ) && $_GET['login'] === 'failed' ) {
                                ?>
                                <div class="banner warning center">
                                    <?php echo esc_html__( 'Username or password does not match. Try again.', 'zume' ); ?>
                                </div>
                                <?php
                            }
                            ?>

                            <?php if ( $dt_login['identity_providers_email'] !== 'on' ): ?>

                                <div class="" >
                                    <div class="wp_login_form">
                                        <?php
                                        $request_uri = isset( $_SERVER['REQUEST_URI'] ) ? esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
                                        $args = array(
                                            'redirect' => dt_login_url( 'redirect', site_url( $request_uri ) ),
                                            'id_username' => 'user',
                                            'id_password' => 'pass',
                                            'value_remember' => true,
                                            'label_username' => __( 'Email Address', 'zume' ),
                                            'label_password' => __( 'Password', 'zume' ),
                                            'label_remember' => __( 'Remember Me', 'zume' ),
                                            'label_log_in' => __( 'Login', 'zume' ),
                                        );
                                        zume_login_form( $args );
                                        ?>
                                    </div>
                                </div>

                            <?php endif; ?>

                            <?php

                            [ 'lang_code' => $lang_code ] = zume_get_url_pieces();

                            if ( strlen( $lang_code ) === 4 ) {
                                $lang_code = implode( '_', str_split( $lang_code, 2 ) );
                            }

                            if ( $lang_code === 'pt' ) {
                                $lang_code = 'pt_pt';
                            }

                            ?>

                            <section class="">
                                <?php zume_login_form_links() ?>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        <?php
    break;

} // end action switch

function zume_login_form_links() {
    $dt_login = DT_Login_Fields::all_values();
    ?>
    <div class="stack--1">
        <?php if ( ! isset( $_GET['checkemail'] ) || ! in_array( wp_unslash( $_GET['checkemail'] ), array( 'confirm', 'newpass' ) ) ) : ?>

            <?php
            // register link
            $dt_url = dt_get_url_path();
            $query_params = ( new DT_URL( $dt_url ) )->query_params;
            $action = $query_params->get( 'action' );
            if ( DT_Login_Fields::can_users_register() && !$query_params->has( 'action' ) ) {
                ?>

                <p class="f--1">
                    <span><?php echo esc_html__( 'Don\'t have an account?', 'zume' ) ?></span>
                    <a href="<?php echo esc_url( dt_login_url( 'register' ) ) ?>"><?php esc_html_e( 'Register', 'zume' ) ?></a>
                </p>

                <?php

            }

            if ( empty( $action ) ) {
                ?>

                <p class="f--1">
                    <a href="<?php echo esc_url( dt_login_url( 'lostpassword' ) ); ?>"><?php esc_html_e( 'Lost your password?', 'zume' ); ?></a>
                </p>

                <?php
            }

            // registration link
            if ( in_array( $action, [ 'register', 'lostpassword' ] ) ) {
                ?>

                <p class="f--1">
                    <span><?php echo esc_html__( 'Already have an account?', 'zume' ) ?></span>
                    <a href="<?php echo esc_url( dt_login_url( 'login' ) ) ?>"><?php esc_html_e( 'Login', 'zume' ) ?></a>
                </p>

                <?php
            }

            if ( $action === 'lostpassword' ) {
                ?>

                <?php
            }
            ?>
        <?php endif; ?>
    </div>
    <?php
}


/**
 * Provides a simple login form for use anywhere within WordPress.
 *
 * The login form HTML is echoed by default. Pass a false value for `$echo` to return it instead.
 *
 * @since 3.0.0
 *
 * @param array $args {
 *     Optional. Array of options to control the form output. Default empty array.
 *
 *     @type bool   $echo           Whether to display the login form or return the form HTML code.
 *                                  Default true (echo).
 *     @type string $redirect       URL to redirect to. Must be absolute, as in "https://example.com/mypage/".
 *                                  Default is to redirect back to the request URI.
 *     @type string $form_id        ID attribute value for the form. Default 'loginform'.
 *     @type string $label_username Label for the username or email address field. Default 'Username or Email Address'.
 *     @type string $label_password Label for the password field. Default 'Password'.
 *     @type string $label_remember Label for the remember field. Default 'Remember Me'.
 *     @type string $label_log_in   Label for the submit button. Default 'Log In'.
 *     @type string $id_username    ID attribute value for the username field. Default 'user_login'.
 *     @type string $id_password    ID attribute value for the password field. Default 'user_pass'.
 *     @type string $id_remember    ID attribute value for the remember field. Default 'rememberme'.
 *     @type string $id_submit      ID attribute value for the submit button. Default 'wp-submit'.
 *     @type bool   $remember       Whether to display the "rememberme" checkbox in the form.
 *     @type string $value_username Default value for the username field. Default empty.
 *     @type bool   $value_remember Whether the "Remember Me" checkbox should be checked by default.
 *                                  Default false (unchecked).
 *
 * }
 * @return void|string Void if 'echo' argument is true, login form HTML if 'echo' is false.
 */
function zume_login_form( $args = array() ) {
    $defaults = array(
        'echo'           => true,
        // Default 'redirect' value takes the user back to the request URI.
        'redirect'       => '',
        'form_id'        => 'loginform',
        'label_username' => __( 'Username or Email Address' ),
        'label_password' => __( 'Password' ),
        'label_remember' => __( 'Remember Me' ),
        'label_log_in'   => __( 'Log In' ),
        'id_username'    => 'user_login',
        'id_password'    => 'user_pass',
        'id_remember'    => 'rememberme',
        'id_submit'      => 'wp-submit',
        'remember'       => true,
        'value_username' => '',
        // Set 'value_remember' to true to default the "Remember me" checkbox to checked.
        'value_remember' => false,
    );

    /**
     * Filters the default login form output arguments.
     *
     * @since 3.0.0
     *
     * @see wp_login_form()
     *
     * @param array $defaults An array of default login form arguments.
     */
    $args = wp_parse_args( $args, apply_filters( 'login_form_defaults', $defaults ) );

    /**
     * Filters content to display at the top of the login form.
     *
     * The filter evaluates just following the opening form tag element.
     *
     * @since 3.0.0
     *
     * @param string $content Content to display. Default empty.
     * @param array  $args    Array of login form arguments.
     */
    $login_form_top = apply_filters( 'login_form_top', '', $args );

    /**
     * Filters content to display in the middle of the login form.
     *
     * The filter evaluates just following the location where the 'login-password'
     * field is displayed.
     *
     * @since 3.0.0
     *
     * @param string $content Content to display. Default empty.
     * @param array  $args    Array of login form arguments.
     */
    $login_form_middle = apply_filters( 'login_form_middle', '', $args );

    /**
     * Filters content to display at the bottom of the login form.
     *
     * The filter evaluates just preceding the closing form tag element.
     *
     * @since 3.0.0
     *
     * @param string $content Content to display. Default empty.
     * @param array  $args    Array of login form arguments.
     */
    $login_form_bottom = apply_filters( 'login_form_bottom', '', $args );

    $form =
        sprintf(
            '<form name="%1$s" id="%1$s" action="%2$s" method="post" class="stack--1">',
            esc_attr( $args['form_id'] ),
            esc_url( site_url( 'wp-login.php', 'login_post' ) )
        ) .
        $login_form_top .
        sprintf(
            '<p class="login-username">
                <label for="%1$s" class="show-for-sr">%2$s</label>
                <input type="text" name="log" id="%1$s" autocomplete="username" class="input" value="%3$s" size="20" placeholder="%2$s" />
            </p>',
            esc_attr( $args['id_username'] ),
            esc_html( $args['label_username'] ),
            esc_attr( $args['value_username'] )
        ) .
        sprintf(
            '<p class="login-password">
                <label for="%1$s" class="show-for-sr">%2$s</label>
                <input type="password" name="pwd" id="%1$s" autocomplete="current-password" spellcheck="false" class="input" value="" size="20" placeholder="%2$s" />
            </p>',
            esc_attr( $args['id_password'] ),
            esc_html( $args['label_password'] )
        ) .
        $login_form_middle .
        ( $args['remember'] ?
            sprintf(
                '<p class="login-remember text-start"><label class="input-label"><input class="input" name="rememberme" type="checkbox" id="%1$s" value="forever"%2$s /> %3$s</label></p>',
                esc_attr( $args['id_remember'] ),
                ( $args['value_remember'] ? ' checked="checked"' : '' ),
                esc_html( $args['label_remember'] )
            ) : ''
        ) .
        sprintf(
            '<p class="login-submit">
                <input type="submit" name="wp-submit" id="%1$s" class="btn light uppercase w-100" value="%2$s" />
                <input type="hidden" name="redirect_to" value="%3$s" />
            </p>',
            esc_attr( $args['id_submit'] ),
            esc_attr( $args['label_log_in'] ),
            esc_url( $args['redirect'] )
        ) .
        $login_form_bottom .
        '</form>';

    if ( $args['echo'] ) {
        //phpcs:disable
        echo $form;
        //phpcs:enable
    } else {
        return $form;
    }
}
