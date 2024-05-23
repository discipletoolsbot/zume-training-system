import { html } from "lit"
import { Wizards } from "../wizard/wizard-constants"

function makeClickHandler(type, eventName) {
    return (event, dispatchEvent) => {
        event.preventDefault()
        dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail: { type } }))
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
            icon: 'z-icon-start',
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
            icon: 'z-icon-profile',
            type: 'handled-link',
            clickHandler: makeClickHandler(Wizards.setProfile, 'open-wizard'),
            translation: jsObject.translations['set_profile'],
            explanation: jsObject.translations['set_profile_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'create-a-training',
            pattern: '#',
            parent: 'getting-started',
            icon: 'z-icon-start',
            type: 'handled-link',
            clickHandler: makeClickHandler(Wizards.makeAGroup, 'open-wizard'),
            translation: jsObject.translations['create_training_group'],
            explanation: jsObject.translations['create_training_group_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'join-a-training',
            pattern: '#',
            parent: 'getting-started',
            icon: 'z-icon-public-training',
            type: 'handled-link',
            clickHandler: makeClickHandler(Wizards.joinATraining, 'open-wizard'),
            translation: jsObject.translations['join_training_group'],
            explanation: jsObject.translations['join_training_group_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'get-a-coach',
            pattern: '#',
            parent: 'getting-started',
            icon: 'z-icon-coach',
            type: 'handled-link',
            clickHandler: makeClickHandler(Wizards.getACoach, 'open-wizard'),
            translation: jsObject.translations['get_a_coach'],
            explanation: jsObject.translations['get_a_coach_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'training',
            pattern: `${jsObject.base_url}/training`,
            icon: 'z-icon-training',
            type: 'dash-link',
            translation: jsObject.translations['training'],
            data: {
                makeComponent: (isLocked) => html`<dash-training></dash-training>`,
            },
        },
        {
            name: 'my-training',
            pattern: `${jsObject.base_url}/my-training/:code`,
            parent: 'training',
            icon: 'z-icon-my-training',
            type: 'dash-link',
            translation: jsObject.translations['my_training'],
            explanation: jsObject.translations['my_training_explanation'],
            data: {
                makeComponent: (code) => html`<dash-trainings ?showTeaser=${code === 'teaser'} code=${code}></dash-trainings>`,
            },
        },
        {
            name: 'my-progress',
            pattern: `${jsObject.base_url}/my-progress`,
            parent: 'training',
            icon: 'z-icon-progress',
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
            icon: 'z-icon-plans',
            type: 'handled-link',
            clickHandler: makeClickHandler('3-month-plan', 'open-3-month-plan'),
            translation: jsObject.translations['create_3_month_plan'],
            explanation: jsObject.translations['3_month_plan_explanation'],
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: 'practicing',
            pattern: `${jsObject.base_url}/practicing`,
            icon: 'z-icon-practicing',
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
            icon: 'z-icon-coach',
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
            icon: 'z-icon-plans',
            type: 'dash-link',
            translation: jsObject.translations['my_plans'],
            explanation: jsObject.translations['my_plans_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-plans ?showTeaser=${isLocked}></dash-plans>`,
            },
        },
        /* Muted until join community is added back in */
        /* {
            name: 'my-churches',
            pattern: `${jsObject.base_url}/my-churches`,
            parent: 'practicing',
            icon: 'z-icon-churches',
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
            icon: 'z-icon-maps',
            type: 'dash-link',
            translation: jsObject.translations['my_maps'],
            explanation: jsObject.translations['my_maps_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-maps ?showTeaser=${isLocked}></dash-maps>`,
            },
        }, */
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
