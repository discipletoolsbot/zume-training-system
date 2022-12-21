<?php
/**
 * Custom endpoints file
 */

/**
 * Class Disciple_Tools_Users_Endpoints
 */
class DT_Users_Endpoints
{

    private $version = 1;
    private $context = 'dt';
    private $namespace;

    /**
     * Disciple_Tools_Users_Endpoints constructor.
     */
    public function __construct() {
        $this->namespace = $this->context . '/v' . $this->version;
        add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
        add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
    }

    /**
     * Setup for API routes
     */
    public function add_api_routes() {
        register_rest_route(
            $this->namespace, '/users/register', [
                'methods' => 'POST',
                'callback' => [ $this, 'register_user' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }

    public function register_user( WP_REST_Request $request ){
        $params = $request->get_params();

        if ( isset( $params['user-email'], $params['user-display'] ) ){
            $user_roles = [ 'multiplier' ];
            if ( isset( $params['user-user_role'] ) ){
                $user_roles = [ $params['user-user_role'] ];
            }
            if ( isset( $params['user-roles'] ) && !empty( $params['user-roles'] ) ){
                $user_roles =$params['user-roles'];
            }
            $user_login = $params['user-user_login'] ?? $params['user-email'];
            $user_login = $params['user-username'] ?? $user_login;
            if ( isset( $params['user-password'] ) ) {
                $password = $params['user-password'];
            }
            if ( isset( $params['user-optional-fields'] ) ) {
                $optional_fields = $params['user-optional-fields'];
            }
            if ( isset( $params['locale'] ) ) {
                $locale = $params['locale'];
            }
            if ( isset( $params['return_contact'] ) ) {
                $return_contact = true;
            }

            $user_object = wp_get_current_user();
            $user_object->add_cap( 'create_users' );
            $user_object->add_cap( 'create_contacts' );
            $user_object->add_cap( 'access_contacts' );

            $user_id = Disciple_Tools_Users::create_user(
                $user_login,
                $params['user-email'],
                $params['user-display'],
                $user_roles,
                $params['corresponds_to_contact'] ?? null,
                $locale ?? null,
                $return_contact ?? false,
                $password ?? null,
                $optional_fields ?? [],
                false
            );

            if ( is_wp_error( $user_id ) ) {
                return $user_id;
            }

            $contact_id = Disciple_Tools_Users::get_contact_for_user( $user_id );

            // final statements. must be last because they wipe the caps on the user_object
            $added_to_training = add_user_to_blog( 1, $user_id, 'subscriber' );
            $added_to_vision = add_user_to_blog( 12, $user_id, 'subscriber' );

            $response = wp_remote_post('https://zume5.training/tools/wp-json/jwt-auth/v1/token', [
                    'method'      => 'POST',
                    'timeout'     => 45,
                    'redirection' => 5,
                    'httpversion' => '1.0',
                    'blocking'    => true,
                    'headers'     => array(),
                    'body'        => array(
                        'username' => $params['user-email'],
                        'password' => $password
                    ),
                    'cookies'     => array()
                ]
            );

            $body = json_decode( wp_remote_retrieve_body( $response ), true );

            return [
                'user_id' => $user_id,
                'contact_id' => $contact_id,
                'added_to_training' => $added_to_training,
                'added_to_vision' => $added_to_vision,
                'jwt' => $body,
                ];
        } else {
            return new WP_Error( 'missing_error', 'Missing fields', [ 'status' => 400 ] );
        }
    }

}
new DT_Users_Endpoints();
