<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Kitchen_Sink extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'kitchen-sink';
    public $lang = 'en';
    public static $token = 'app_kitchen_sink';

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

        $page_slug = $url_parts[0] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
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
        global $zume_languages_by_code;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="stack-3">
            <div class="container stack">
                <h1 class="text-center"><?php echo esc_html__( 'Kitchen Sink', 'zume' ) ?></h1>

                <h2 class="brand">Methodology</h2>

                <p>
                    The <a href="https://cube.fyi/">CUBE CSS methodology</a> has been attempted to be put into practice in this project.
                </p>

                <p>CUBE stands for Composition, Utility, Block and Exceptions</p>

                <p>The idea behind it is to reduce the amount of CSS written and to work with CSS and the browser rather than against it.</p>

                <p>Another principle behind the CSS for zume is intrinsic web design, which is built into the CUBE CSS methodology by creating compositional structures that adapt to the screen size based on the intrinsic content within them, rather than the screen size dictating extrinsically how the content should behave on the screen.</p>

                <p>As such the structural composition of the project is made up of components from <a href="every-layout.dev">Every Layout</a> which attempt to reduce the need for media queries and screen breakpoints, and instead let the component react to the screen size, rather than the screen size dictating what the component does.</p>

                <p>The project also makes use of <a href="https://www.fluid-type-scale.com/">fluid spacing and typography</a> sizes using scss to create css using <code>clamp</code> to adjust the size of margins/padding/gaps and font sizes as the screen size changes.</p>

                <p>You'll notice if you use the developer tools to change the size of the screen in responsive mode, that the sizes of the fonts adjust as the screen size changes.</p>

                <h2 class="brand" id="typography">Typography</h2>

                <h1>Header 1</h1>
                <h2>Header 2</h2>
                <h3>Header 3</h3>
                <h4>Header 4</h4>
                <h5>Header 5</h5>
                <h6>Header 6</h6>
                <p>Some body text. Sint dolore magna magna laboris reprehenderit labore velit occaecat cillum sint occaecat non cupidatat ad. In commodo quis quis mollit cupidatat ut sit magna irure. Eiusmod do voluptate quis velit dolor do ullamco quis veniam nostrud esse adipisicing. Qui pariatur tempor laborum esse. Fugiat velit mollit mollit proident. Dolore deserunt quis mollit qui nostrud. Non cillum laborum esse commodo cillum sit eu fugiat fugiat pariatur sunt qui anim.</p>
                <ul role='list'>
                    <li>This</li>
                    <li>is</li>
                    <li>an</li>
                    <li>unordered</li>
                    <li>list</li>
                </ul>
                <ol>
                    <li>ordered</li>
                    <li>list</li>
                </ol>
            </div>

            <div class="container stack">
                <h2 class="brand">Forms</h2>
                <div class="stack">
                    <input class="input" type="text" placeholder="text input">
                    <div class="form-group">
                        <label for="this-input" class="input-label">A label</label>
                        <input id="this-input" type="text">
                    </div>
                    <div class="form-control">
                        <input id="checkbox-1" type="checkbox">
                        <label for="checkbox-1">Checkbox 1</label>
                    </div>
                    <div class="form-control f-1 brand-light">
                        <input id="larger-checkbox" type="checkbox" checked>
                        <label for="larger-checkbox">larger checkbox</label>
                    </div>
                    <div class="form-control f-1 brand-light">
                        <input id="disabled-checkbox" type="checkbox" checked disabled>
                        <label for="disabled-checkbox">disabled checkbox</label>
                    </div>
                    <div class="form-control f-1">
                        <input name="radio" id="radio-1" type="radio" checked>
                        <label for="radio-1">Radio 1</label>
                    </div>
                    <div class="form-control f-1">
                        <input name="radio" id="radio-2" type="radio">
                        <label for="radio-2">Radio 2</label>
                    </div>
                    <div class="form-control f-1">
                        <input name="radio" id="radio-3" type="radio" disabled>
                        <label for="radio-3">Radio 3</label>
                    </div>
                </div>
            </div>

            <div class="container stack">
                <h2 class="brand">Buttons and links</h2>
                <div class="cluster">
                    <a class="d-block" href="#">Normal links in a page</a>
                    <button class="btn d-block">.btn</button>
                    <button class="btn d-block">.btn.light</button>
                    <button class="btn outline d-block">.btn.outline</button>
                    <button class="btn large">.btn.large</button>
                </div>
            </div>
            <div class="bg-brand py-4">
                <div class="container stack">
                    <h2 class="white">Buttons and links on a dark background</h2>
                    <div class="cluster">
                        <a href="#" class="link-light">a.link-light</a>
                        <button class="btn dark d-block">.btn.dark</button>
                        <button class="btn outline dark d-block">.btn.outline.dark</button>
                        <button class="btn dark large">.btn.dark.large</button>
                    </div>
                </div>
            </div>

            <div class="container stack">
                <h1 class="brand f-4 text-center uppercase">Composition</h1>

                <h2>The Stack</h2>

                <p>Probably the most used composition class is the stack</p>

                <p>This creates a stack of elements which all have the same spacing between them, to create a sense of uniformity and flow.</p>

                <p><code>.stack</code> or <code>.stack-{-5...5}</code> Creates a vertical flex box where each element has the same top margin to space them out equally.</p>

                <p>An example of the usage of the stack is this paragraph and the preceding ones</p>

                <p class="s-2">An element within the stack can change it's own spacing by using the class <code>.s-{-5...5}</code> This paragraph is using <code>.s-2</code> to increase the spacing above it.</p>
                <p class="s--4">Or we could use a negative number like <code>.s--4</code> to cuddle this paragraph up a little closer to the one above.</p>
            </div>

            <div class="container stack">
                <h2>The container</h2>
                <p>The <code>.container</code> class creates an intrinsically adjusting ~90% screen width horizontally centered area.</p>
                <p>For larger screens it has a max-width to prevent extremely wide content being hard to read, and on smaller screens it has a dynamically increasing width using CSS calc. This allows the gutter on either side of the container to get smaller as the screen size reduces so that we don't need to use media queries and we get to maximise the small screen space.</p>
                <p><code>width: calc(90% + ( 10 / 100 * $min-width ) - ( 2 * $small-margin ) );</code> is where the magic happens</p>
            </div>

            <div class="container-md stack">
                <p>We also have a smaller ~70% container <code>.container-md</code> which similarly has a dynamic gutter.</p>
            </div>

            <div class="container stack">
                <h2>The cluster</h2>
                <p>This component allows elements within the cluster to wrap around onto the next line when there isn't enough space</p>
                <p>It doesn't control the width of the elements though, so the widths of elements will be based on their content</p>
                <p>It is useful for any group of elements that you want to wrap around if there isn't enough space.</p>
                <div class="cluster white">
                    <div class="px-2 bg-brand">This</div>
                    <div class="px-2 bg-brand">is</div>
                    <div class="px-2 bg-brand">a</div>
                    <div class="px-2 bg-brand">set</div>
                    <div class="px-2 bg-brand">of</div>
                    <div class="px-2 bg-brand">clustered</div>
                    <div class="px-2 bg-brand">elements</div>
                </div>
                <p>If you want them all to be the same width for uniformity then the grid helps with that.</p>
            </div>

            <div class="container stack">
                <h2>The Grid</h2>
                <p>Sometimes we want to have elements in columns, but allow them to wrap onto the next lines. We can do that with the grid class.</p>
                <p>This class uses CSS grid, and allows all of the elements in the grid to not only have the same width, but also the same height.</p>
                <div class="grid">
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                </div>

            </div>

            <div class="container stack">
                <h2>The switcher</h2>
                <p>The switcher is a flex container that switches elements from a row, to a column when the elements reach a certain width</p>
                <p>For the basic switcher that is ~50rem</p>
                <div class="switcher">
                    <div class="bg-brand py-4"></div>
                    <div class="bg-brand py-4"></div>
                </div>
                <p>We can change the width at which elements switch by adjusting the <code>--switcher-max-width</code> css variable on the switcher.</p>
                <p>We have the classes <code>.switcher-width-{40|20|10}</code> for changing the switch width to 40/20/10 rem respectively</p>
                <p>e.g. <code>.switcher-width-40</code></p>
                <div class="switcher switcher-width-40">
                    <div class="bg-brand py-4"></div>
                    <div class="bg-brand py-4"></div>
                </div>
                <p>With 5 or more elements in a switcher, it stops acting as a switcher and stays in column mode, as the elements would otherwise get a little squished.</p>
                <div class="switcher">
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                    <div class="bg-brand py-0"></div>
                </div>
            </div>

            <div class="container stack center">
                <h3>The Center</h3>

                <p class="w-50"><code>.center</code> center aligns everything horizontally within it using flex box</p>
            </div>

            <div class="bg-brand white">
                <div class="container cover-page center">
                    <h3 class="py-2">The Page Cover</h3>
                    <div class="stack">
                        <p>The Page cover allows a section to cover the whole of the screen using a <code>min-height: 100vh</code></p>
                        <p><code>.cover-page</code> centers a div vertically on the page, with a min-gap of 1rem with an optional top and bottom element.</p>
                        <p>This works well unless you have a nav bar covering over the header section</p>
                        <p>The cover classes pair well with the .center class to create a centered element</p>
                    </div>
                    <p class="py-2">There should be no more than 3 elements in a cover* component</p>
                </div>
            </div>

            <div class="container stack">
                <h3 class="text-center">The normal cover</h3>
                <div class="switcher | s-2">
                    <div class="cover grow-2">
                        <h4 class="text-center">An example of cover in a 2 column</h4>
                        <div>
                            <p>This cover doesn't aim to cover the screen, but applies the same concept of the .cover-page, where 3 elements can be arranged with the middle one centered in the container.</p>
                            <p>If the cover div has some intrinsic height because of e.g. a 2 column layout, then one column can use the .cover class to centrally align some content in that column. Optionally with a header element and/or a footer element.</p>
                        </div>
                        <p class="text-center">And an optional footer</p>
                    </div>
                    <div class="center">
                        <img class="w-50" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Thinking-01.svg' ) ?>" alt="">
                    </div>
                </div>
            </div>

            <div class="container stack">
                <h3 class="text-center">The image cover</h3>
                <div class="switcher s-2">
                    <div class="cover-img center">
                        <h4>Optional header element</h4>
                        <img class="w-10" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Thinking-01.svg' ) ?>" alt="">
                        <p>Optional footer</p>
                    </div>
                    <div class="stack">
                        <p>The above 2 covers, require the central element to be a <code>div</code>. The <code>.cover-img</code> class allows the central element to be an <code>img</code> element instead.</p>
                        <p>let's add a little more text in here to see it working</p>
                        <p>Eu et sit officia sint reprehenderit magna cupidatat veniam id voluptate veniam consectetur. Duis esse deserunt culpa adipisicing velit consectetur ullamco voluptate labore irure. Nulla sunt dolor irure cupidatat est incididunt aliqua cillum sit aute. Lorem dolor Lorem amet tempor fugiat. Qui quis consectetur nostrud id culpa laborum. Qui tempor amet deserunt eu irure exercitation dolore elit cillum reprehenderit magna sint.</p>
                    </div>
                </div>
            </div>

            <div class="container stack">
                <h3>The Reel</h3>
                <p>This one is realy good (bdm-tsh). It's used in the Real Stories, Real People (bdm-dm-bdabadm-tsh) section of the home page.</p>
                <p>It's basically a super low tech sideways scroller that should work even when JS is disabled etc. because it doesn't use JS</p>
                <p>When it does have JS added to make it nicer, this will be an example of progressive enhancement, where the thing just works as a bare bones component, but get's better as and when the tech is available to let it be better</p>
                <p>It has some clever stuff in there to make sure that the end of the reel looks ... (cough) ... reaaaly good</p>
                <div class="reel">
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                    <div style="padding: 10%" class="bg-brand-gradient white w-10"></div>
                </div>
            </div>

            <div class="container stack-1 lh-sm">
                <h1 class="brand f-4 text-center uppercase">Utilities</h1>

                <h2 class="brand">Text</h2>

                <p class="text-start"><code>.text-start</code> Aligns text to the start of the line</p>
                <p class="text-center"><code>.text-center</code> Aligns text to the middle of the line</p>
                <p class="uppercase"><code>.uppercase</code> Makes the text uppercase</p>

                <h2 class="brand">Font sizes</h2>

                <p>The progression of font sizes is using a harmonic progression where each is a power of a base number.</p>
                <p>This leads to a nice curve to the sizes of the text below, and brings a nice visual harmony.</p>
                <p>The formula for the size increases is <code>size = baseSize * ( ratio ^ stepNumber )</code></p>
                <p>E.g. at full screen, the size of <code>.f-3</code> is = <code>1rem * ( 1.3 ^ 3 ) = 38.948px</code></p>

                <p class="f-8 lh-sm">.f-8 A b c d e f </p>
                <p class="lh-sm f-7">.f-7 A b c d e f</p>
                <p class="lh-sm f-6">.f-6 A b c d e f</p>
                <p class="lh-sm f-5">.f-5 A b c d e f</p>
                <p class="lh-sm f-4">.f-4 A b c d e f</p>
                <p class="lh-sm f-3">.f-3 A b c d e f</p>
                <p class="lh-sm f-2">.f-2 A b c d e f</p>
                <p class="lh-sm f-1">.f-1 A b c d e f</p>
                <p class="lh-sm f-0">.f-0 A b c d e f</p>
                <p class="lh-sm f--1">.f--1 A b c d e f</p>
                <p class="lh-sm f--2">.f--2 A b c d e f</p>
            </div>


            <div class="container stack">
                <h2 class="brand">Colors</h2>

                <h3 class="brand">Text Colors</h3>

                <h4 class="brand">.brand</h4>
                <h4 class="brand-light">.brand-light</h4>
                <h4 class="brand-lighter">.brand-lighter</h4>
                <h4 class="brand-fade">.brand-fade</h4>
                <h4 class="gray-700">.gray-700</h4>
                <h4 class="black">.black</h4>

                <h3 class="brand s-3">Background colours</h3>
                <div class="grid">
                    <div style="padding: 40%" class="bg-brand-gradient white">.bg-brand-gradient</div>
                    <div style="padding: 40%" class="bg-brand white">.bg-brand</div>
                    <div style="padding: 40%" class="bg-brand-light">.bg-brand-light</div>
                    <div style="padding: 40%" class="bg-brand-lighter">.bg-brand-lighter</div>
                    <div style="padding: 40%" class="bg-gray-100">.bg-gray-100</div>
                    <div style="padding: 40%" class="bg-gray-300">.bg-gray-300</div>
                    <div style="padding: 40%" class="bg-gray-500">.bg-gray-500</div>
                </div>

            </div>

            <div class="container stack">
                <h2 class="brand">Shapes</h2>

                <div class="grid white">
                    <div style="padding: 40%" class="bg-brand rounded">.rounded</div>
                    <div style="padding: 40%" class="bg-brand rounded-top">.rounded-top</div>
                    <div style="padding: 40%" class="bg-brand rounded-start">.rounded-start</div>
                    <div style="padding: 40%" class="bg-brand rounded-bottom">.rounded-bottom</div>
                    <div style="padding: 40%" class="bg-brand rounded-end">.rounded-end</div>
                    <div style="padding: 40%" class="bg-brand circle-end">.circle-end</div>
                    <div style="padding: 40%" class="bg-brand circle-end-small">.circle-end-small</div>
                    <div style="padding: 40%" class="bg-brand rounded hard-shadow">.hard-shadow</div>
                    <div style="padding: 40%" class="bg-brand rounded shadow">.shadow</div>
                </div>
            </div>

            <div class="container stack">
                <h2 class="brand">Spacing</h2>

                <h3 class="brand">Padding and margin</h3>

                <p>All of the padding, margin and gap utilities can use sizes from -5 to 5</p>
                <ul>
                    <li>Padding all sides: p-{number}</li>
                    <li>Padding top and bottom: py-{number}</li>
                    <li>Padding sides: px-{number}</li>
                    <li>Margin all sides: m-{number}</li>
                    <li>Margin top and bottom: my-{number}</li>
                    <li>Margin sides: mx-{number}</li>
                    <li>Gaps in flex/grid containers: gap-{number}</li>
                    <li>Gaps top and bottom: gapy-{number}</li>
                    <li>Gaps sides: gapx-{number}</li>
                </ul>
                <p>e.g. p-4, p--4, mx-2, gapy--2</p>
                <p>Some classes exist for zeroing these</p>
                <ul>
                    <li>Zero Padding: p0</li>
                    <li>Zero Padding top: pt0</li>
                    <li>Zero Spacing: s0</li>
                    <li>Zero gap: gap0</li>
                </ul>
                <p>The spacing size can be seen in the following example where the white space above the bar is the space created by that number</p>
                <p>The spacing classes <code>.s-{-5...5}</code> can be used in the stack and cluster components.</p>
                <p>The spacing (similar to the typograhic sizing) follows a harmonic progression of sizes, rather than an arithmetic one.</p>
                <div class="stack">
                    <p class="s-5 bg-brand white">Top bar</p>
                    <p class="s-5 bg-brand white">5</p>
                    <p class="s-4 bg-brand white">4</p>
                    <p class="s-3 bg-brand white">3</p>
                    <p class="s-2 bg-brand white">2</p>
                    <p class="s-1 bg-brand white">1</p>
                    <p class="s-0 bg-brand white">0</p>
                    <p class="s--1 bg-brand white">-1</p>
                    <p class="s--2 bg-brand white">-2</p>
                    <p class="s--3 bg-brand white">-3</p>
                    <p class="s--4 bg-brand white">-4</p>
                    <p class="s--5 bg-brand white">-5</p>
                </div>

                <h3>Centering block elements</h3>

                <p class="w-50 mx-auto">.mx-auto can be used to center elements by creating auto margin on the sides</p>

                <p class="w-50 ms-auto">.ms-auto can be used to push an element to the end of a line</p>

                <p>Most centering is Done via the compositional components above</p>


            </div>

        </div>
        <?php
    }
}
Zume_Training_Kitchen_Sink::instance();
