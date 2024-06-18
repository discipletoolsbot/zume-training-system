import { DashTopLevel } from './dash-top-level';
import { RouteNames } from './routes';

export class DashTraining extends DashTopLevel {
    constructor() {
        super(RouteNames.training)
    }

    createRenderRoot() {
        return this
    }
}
customElements.define('dash-training', DashTraining);
