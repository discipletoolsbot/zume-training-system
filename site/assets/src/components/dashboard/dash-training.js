import { DashTopLevel } from './dash-top-level';

export class DashTraining extends DashTopLevel {
    constructor() {
        super('training')
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-training', DashTraining);
