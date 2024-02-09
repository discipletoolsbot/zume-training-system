import { DashTopLevel } from "./dash-top-level";

export class DashGettingStarted extends DashTopLevel {
    constructor() {
        super('getting-started')
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-getting-started', DashGettingStarted);
