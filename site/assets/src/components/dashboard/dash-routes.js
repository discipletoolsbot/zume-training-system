import { html } from "lit"
import { Wizards } from "../wizard/wizard-constants"
import { RouteNames } from "./routes"

function makeClickHandler(type, eventName) {
    return (event, dispatchEvent) => {
        event.preventDefault()
        dispatchEvent(new CustomEvent(eventName, { bubbles: true, detail: { type } }))
    }
}

export function dashRoutes() {
    return [
        {
            name: RouteNames.root,
            pattern: `${jsObject.base_url}`,
            icon: '',
            type: 'dash-link',
            translation: '',
            data: {
                makeComponent: () => '',
            },
        },
        {
            name: RouteNames.gettingStarted,
            pattern: `${jsObject.base_url}/getting-started`,
            icon: 'z-icon-start',
            type: 'dash-link',
            translation: jsObject.translations['getting_started'],
            data: {
                makeComponent: (isLocked) => html`<dash-getting-started></dash-getting-started>`,
            },
        },
        {
            name: RouteNames.setProfile,
            pattern: '#',
            parent: RouteNames.gettingStarted,
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
            name: RouteNames.createATraining,
            pattern: '#',
            parent: RouteNames.gettingStarted,
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
            name: RouteNames.joinATraining,
            pattern: '#',
            parent: RouteNames.gettingStarted,
            icon: 'z-icon-public-training',
            type: 'handled-link',
            clickHandler: makeClickHandler(Wizards.joinATraining, 'open-wizard'),
            translation: jsObject.translations['join_training_group'],
            explanation: jsObject.translations['join_training_group_explanation'],
            data: {
                makeComponent: () => '',
                neverDisabled: true,
            },
        },
        {
            name: RouteNames.getACoach,
            pattern: '#',
            parent: RouteNames.gettingStarted,
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
            name: RouteNames.training,
            pattern: `${jsObject.base_url}/training`,
            icon: 'z-icon-training',
            type: 'dash-link',
            translation: jsObject.translations['training'],
            data: {
                makeComponent: (isLocked) => html`<dash-training></dash-training>`,
            },
        },
        {
            name: RouteNames.myTrainings,
            pattern: `${jsObject.base_url}/my-trainings`,
            icon: 'z-icon-my-training',
            type: 'dash-link',
            translation: jsObject.translations['my_trainings'],
            data: {
                makeComponent: () => html`<dash-trainings-list></dash-trainings-list>`,
            },
        },
        {
            name: RouteNames.myTraining,
            pattern: `${jsObject.base_url}/my-training/:code`,
            parent: RouteNames.training,
            icon: 'z-icon-my-training',
            type: 'dash-link',
            translation: jsObject.translations['my_training'],
            explanation: jsObject.translations['my_training_explanation'],
            data: {
                makeComponent: (code) => html`<dash-trainings ?showTeaser=${code === 'teaser'} code=${code}></dash-trainings>`,
            },
        },
        {
            name: RouteNames.myProgress,
            pattern: `${jsObject.base_url}/my-progress`,
            parent: RouteNames.training,
            icon: 'z-icon-progress',
            type: 'dash-link',
            translation: jsObject.translations['my_progress'],
            explanation: jsObject.translations['my_progress_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-progress ?showTeaser=${isLocked}></dash-progress>`,
            },
        },
        {
            name: RouteNames.threeMonthPlan,
            pattern: `${jsObject.base_url}/3-month-plan`,
            parent: RouteNames.training,
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
            name: RouteNames.practicing,
            pattern: `${jsObject.base_url}/practicing`,
            icon: 'z-icon-practicing',
            type: 'dash-link',
            translation: jsObject.translations['practicing'],
            data: {
                makeComponent: (isLocked) => html`<dash-practicing></dash-practicing>`,
            },
        },
        {
            name: RouteNames.myCoach,
            pattern: `${jsObject.base_url}/my-coach`,
            parent: RouteNames.practicing,
            icon: 'z-icon-coach',
            type: 'dash-link',
            translation: jsObject.translations['my_coach'],
            explanation: jsObject.translations['my_coach_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-coach ?showTeaser=${isLocked}></dash-coach>`,
            },
        },
        {
            name: RouteNames.myPlans,
            pattern: `${jsObject.base_url}/my-plans`,
            parent: RouteNames.practicing,
            icon: 'z-icon-plans',
            type: 'dash-link',
            translation: jsObject.translations['my_plans'],
            explanation: jsObject.translations['my_plans_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-plans ?showTeaser=${isLocked}></dash-plans>`,
            },
        },
        {
            name: RouteNames.myChurches,
            pattern: `${jsObject.base_url}/my-churches`,
            parent: RouteNames.practicing,
            icon: 'z-icon-churches',
            type: 'dash-link',
            translation: jsObject.translations['my_churches'],
            explanation: jsObject.translations['my_churches_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-churches ?showTeaser=${isLocked}></dash-churches>`,
            },
        },
        {
            name: RouteNames.myMaps,
            pattern: `${jsObject.base_url}/my-maps`,
            parent: RouteNames.practicing,
            icon: 'z-icon-maps',
            type: 'dash-link',
            translation: jsObject.translations['my_maps'],
            explanation: jsObject.translations['my_maps_explanation'],
            data: {
                makeComponent: (isLocked) => html`<dash-maps ?showTeaser=${isLocked}></dash-maps>`,
            },
        },
        {
            name: RouteNames.notFound,
            pattern: '*',
            icon: '',
            type: 'dash-link',
            data: {
                makeComponent: (isLocked) => html`<dash-not-found></dash-not-found>`,
            },
        }
    ]
}
