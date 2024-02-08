import { DashTopLevel } from './dash-top-level';

export class DashPracticing extends DashTopLevel {
    constructor() {
        super('practicing')
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-practicing', DashPracticing);
