<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Privacy_Policy extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Privacy Policy';
    public $root = 'app';
    public $type = 'privacy';
    public $lang = 'en';
    public static $token = 'app_privacy';

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

        $this->page_title = esc_html__( 'Zúme Privacy Policy', 'zume' );

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

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
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <?php
    }

    public function body(){

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container-md stack-1 | page">
            <h1 class="text-center brand-light"><?php esc_html_e( 'Zúme Privacy Policy', 'zume' ) ?></h1>
            <hr>
            <p><?php esc_html_e( 'This privacy policy has been compiled to better serve those who are concerned with how their "Personally Identifiable Information" (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.', 'zume' ) ?></p>

            <hr>
            <div class="stack">
                <h3 class="brand-light"><?php esc_html_e( 'What permissions do the social sign-on logins ask for?', 'zume' ) ?></h3>
                <p><?php esc_html_e( 'The profile elements below change depending on if Facebook or Google sign on is used.', 'zume' ) ?></p>
                <ul class="bullets">
                    <li>
                        <?php esc_html_e( 'Public Profile. This includes certain User’s Data such as id, name, picture, gender, and their locale.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'Email Address.', 'zume' ) ?>
                    </li>
                </ul>
            </div>

            <hr>
            <div class="stack" id="personal-information">
                <h3 class="brand-light"><?php esc_html_e( 'What personal information do we collect from the people through our website?', 'zume' ) ?></h3>
                <p>Some personal information is tracked for the proper functioning of the website, and other information is requested and saved for additional coaching and support.</p>
                <ul class="bullets">
                    <li>
                        <?php esc_html_e( 'A user’s real name or nickname is requested to improve the personal quality of the site and communication, as well as for customer service requests and coaching.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'A user’s language preference is stored to support proper site and communication functioning, and to help us connect the user with appropriate coaching and resources.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'A user’s email address is required to establish an account and is used for transactional communication as part of site operation.', 'zume' ) ?>
                    </li>
                    <li>
                         <?php esc_html_e( 'A user’s phone number is collected and stored for supporting the free coaching service.', 'zume' ) ?>
                    </li>
                    <li>
                         <?php esc_html_e( 'A user’s city is requested to personalize site resources and communication, and to connect users to appropriate coaching and customer service resources.', 'zume' ) ?>
                    </li>
                </ul>
            </div>

            <hr>
            <div class="stack">
                <h3 class="brand-light"><?php esc_html_e( 'When do we collect information?', 'zume' ) ?></h3>
                <ul class="bullets">
                    <li>
                        <?php esc_html_e( 'We collect your information at login.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'We also track your progress through the training course and through site usage.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'We request neccissary information through various sign up and request forms.', 'zume' ) ?>
                    </li>
                </ul>
            </div>

            <hr>
            <div class="stack">
                <h3 class="brand-light"><?php esc_html_e( 'How do we use your information?', 'zume' ) ?></h3>
                <ul class="bullets">
                    <li>
                        <?php esc_html_e( 'We use your information to create a user account in the zume system based on your email address.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'We will email you with basic transactional emails like password reset requests and other system notifications.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'We email occasional reminders and encouragements depending on your progress through the training.', 'zume' ) ?>
                    </li>
                </ul>
            </div>

            <hr>
            <div class="stack">
                <h3 class="brand-light"><?php esc_html_e( 'How do we protect your information?', 'zume' ) ?></h3>
                <p>
                    <?php esc_html_e( 'While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only team members who need the information to perform a specific job (for example, web administrator or customer service) are granted access to personally identifiable information.', 'zume' ) ?>
                </p>
                <p>
                    <?php esc_html_e( 'Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.', 'zume' ) ?>
                </p>
                <p>
                    <?php esc_html_e( 'We implement a variety of security measures when a user submits, or accesses their information to maintain the safety of your personal information.', 'zume' ) ?>
                </p>
            </div>

            <hr>
            <div class="stack">
                <h3 class="brand-light"><?php esc_html_e( 'Do we use "cookies"?', 'zume' ) ?></h3>
                <p>
                    <?php esc_html_e( 'Any use of Cookies - or of other tracking tools - unless stated otherwise, serves to identify Users and remember their preferences, for the sole purpose of providing the service required by the User.', 'zume' ) ?>
                </p>
            </div>

            <hr>
            <div class="stack">
                <h3 class="brand-light"><?php esc_html_e( 'Your Access to and Control Over Information.', 'zume' ) ?></h3>
                <p>
                    <?php esc_html_e( 'You may opt out of any future contact from us at any time. You can do the following at any time by contacting us via our contact email address:', 'zume' ) ?>
                </p>
                <p>
                    <?php esc_html_e( 'See what data we\'ve aggregated from your activities with us.', 'zume' ) ?>
                </p>
                <ul class="bullets">
                    <li>
                        <?php esc_html_e( 'Change/correct any data we have about you.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'Have us delete any data we have about you.', 'zume' ) ?>
                    </li>
                    <li>
                        <?php esc_html_e( 'Express any concern you have about our use of your data.', 'zume' ) ?>
                    </li>
                </ul>
            </div>

            <hr>
            <div class="stack">
                <h3 class="brand-light"><?php esc_html_e( 'Updates', 'zume' ) ?></h3>
                <p>
                    <?php esc_html_e( 'Our Privacy Policy may change from time to time and all updates will be posted on this page.', 'zume' ) ?>
                </p>
            </div>

        </div>
        <?php
    }
}
Zume_Training_Privacy_Policy::instance();
