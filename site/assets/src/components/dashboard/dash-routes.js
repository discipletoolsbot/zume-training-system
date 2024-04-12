import { html } from "lit"

function makeClickHandler(type) {
    return (event, dispatchEvent) => {
        event.preventDefault()
        dispatchEvent(new CustomEvent('open-wizard', { bubbles: true, detail: { type } }))
    }
}

export function dashRoutes() {
    return [
        {
            name: 'root',
            pattern: `${jsObject.base_url}`,
            icon: '',
            type: 'dash-link',
            translation: '',
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'getting-started',
            pattern: `${jsObject.base_url}/getting-started`,
            icon: 'zume-start',
            type: 'dash-link',
            translation: jsObject.translations['getting_started'],
            data: {
                makeComponent: (isLocked) => html`<dash-getting-started></dash-getting-started>`,
            },
        },
        {
            name: 'set-profile',
            pattern: '#',
            parent: 'getting-started',
            icon: 'zume-profile',
            type: 'handled-link',
            clickHandler: makeClickHandler('set-profile'),
            translation: jsObject.translations['set_profile'],
            explanation: jsObject.translations['set_profile_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'join-a-training',
            pattern: '#',
            parent: 'getting-started',
            icon: 'zume-start',
            type: 'handled-link',
            clickHandler: makeClickHandler('getting-started'),
            translation: jsObject.translations['plan_a_training'],
            explanation: jsObject.translations['plan_a_training_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'get-a-coach',
            pattern: '#',
            parent: 'getting-started',
            icon: 'zume-coach',
            type: 'handled-link',
            clickHandler: makeClickHandler('get-a-coach'),
            translation: jsObject.translations['get_a_coach'],
            explanation: jsObject.translations['get_a_coach_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'training',
            pattern: `${jsObject.base_url}/training`,
            icon: 'zume-training',
            type: 'dash-link',
            translation: jsObject.translations['training'],
            data: {
                makeComponent: (isLocked) => html`<dash-training></dash-training>`,
            },
        },
        {
            name: 'my-training',
            pattern: `${jsObject.base_url}/my-training`,
            parent: 'training',
            icon: 'zume-group',
            type: 'dash-link',
            translation: jsObject.translations['my_training'],
            explanation: jsObject.translations['my_training_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-trainings ?showTeaser=${isLocked}></dash-trainings>`,
            },
        },
        {
            name: 'my-progress',
            pattern: `${jsObject.base_url}/my-progress`,
            parent: 'training',
            icon: 'zume-progress',
            type: 'dash-link',
            translation: jsObject.translations['my_progress'],
            explanation: jsObject.translations['my_progress_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-progress ?showTeaser=${isLocked}></dash-progress>`,
            },
        },
        {
            name: '3-month-plan',
            pattern: `${jsObject.base_url}/3-month-plan`,
            parent: 'training',
            icon: 'zume-plans',
            type: 'dash-link',
            translation: jsObject.translations['3_month_plan'],
            explanation: jsObject.translations['3_month_plan_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-3-month-plan ?showTeaser=${isLocked}></dash-3-month-plan>`,
            },
        },
        {
            name: 'practicing',
            pattern: `${jsObject.base_url}/practicing`,
            icon: 'zume-practicing',
            type: 'dash-link',
            translation: jsObject.translations['practicing'],
            data: {
                makeComponent: (isLocked) => html`<dash-practicing></dash-practicing>`,
            },
        },
        {
            name: 'my-coach',
            pattern: `${jsObject.base_url}/my-coach`,
            parent: 'practicing',
            icon: 'zume-coach',
            type: 'dash-link',
            translation: jsObject.translations['my_coach'],
            explanation: jsObject.translations['my_coach_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-coach ?showTeaser=${isLocked}></dash-coach>`,
            },
        },
        {
            name: 'my-plans',
            pattern: `${jsObject.base_url}/my-plans`,
            parent: 'practicing',
            icon: 'zume-plans',
            type: 'dash-link',
            translation: jsObject.translations['my_plans'],
            explanation: jsObject.translations['my_plans_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-plans ?showTeaser=${isLocked}></dash-plans>`,
            },
        },
        {
            name: 'my-churches',
            pattern: `${jsObject.base_url}/my-churches`,
            parent: 'practicing',
            icon: 'zume-churches',
            type: 'dash-link',
            translation: jsObject.translations['my_churches'],
            explanation: jsObject.translations['my_churches_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-churches ?showTeaser=${isLocked}></dash-churches>`,
            },
        },
        {
            name: 'my-maps',
            pattern: `${jsObject.base_url}/my-maps`,
            parent: 'practicing',
            icon: 'zume-maps',
            type: 'dash-link',
            translation: jsObject.translations['my_maps'],
            explanation: jsObject.translations['my_maps_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-maps ?showTeaser=${isLocked}></dash-maps>`,
            },
        },
        {
            name: 'not-found',
            pattern: '*',
            icon: '',
            type: 'dash-link',
            data: {
                makeComponent: (isLocked) => html`<dash-not-found></dash-not-found>`,
            },
        }
    ]
}