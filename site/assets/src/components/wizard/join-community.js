import { LitElement, html } from 'lit';

export class JoinCommunity extends LitElement {
    static get properties() {
        return {
            /**
             * The step name
             */
            name: { type: String },
            /**
             * The module name that this step is part of
             */
            module: { type: String },
            /**
             * Is this step skippable
             */
            skippable: { type: Boolean },
            /**
             * Translation strings
             */
            t: { type: Object },
        }
    }


    render() {
        return html`
            <div class="stack w-100">
                <h2>${this.t.join_community}</h2>
                <p>These are all the things that you get when you join</p> <!-- @todo content for this panel -->
                <ul role="list">
                    <li>lots of good things</li>
                    <li>and more</li>
                </ul>
            </div>
        `;
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('join-community', JoinCommunity);
