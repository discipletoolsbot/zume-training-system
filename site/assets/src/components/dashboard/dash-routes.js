export function dashRoutes() {
    return [
        {
            name: 'root',
            pattern: `${zumeDashboard.base_url}`,
            icon: '',
            type: 'dash-link',
            translation: '',
            data: {
                component: '',
            },
        },
        {
            name: 'getting-started',
            pattern: `${zumeDashboard.base_url}/getting-started`,
            icon: 'zume-start',
            type: 'dash-link',
            translation: zumeDashboard.translations['getting_started'],
            data: {
                component: 'dash-getting-started',
            },
        },
        {
            name: 'set-profile',
            pattern: `${zumeDashboard.urls.set_profile_wizard}`,
            parent: 'getting-started',
            icon: 'zume-profile',
            type: 'direct-link',
            translation: zumeDashboard.translations['set_profile'],
            explanation: zumeDashboard.translations['set_profile_explanation'],
            data: {
                component: '',
            },
        },
        {
            name: 'plan-a-training',
            pattern: `${zumeDashboard.urls.plan_training_wizard}`,
            parent: 'getting-started',
            icon: 'zume-start',
            type: 'direct-link',
            translation: zumeDashboard.translations['plan_a_training'],
            explanation: zumeDashboard.translations['plan_a_training_explanation'],
            data: {
                component: '',
            },
        },
        {
            name: 'get-a-coach',
            pattern: `${zumeDashboard.urls.get_coach_wizard}`,
            parent: 'getting-started',
            icon: 'zume-coach',
            type: 'direct-link',
            translation: zumeDashboard.translations['get_a_coach'],
            explanation: zumeDashboard.translations['get_a_coach_explanation'],
            data: {
                component: '',
            },
        },
        {
            name: 'training',
            pattern: `${zumeDashboard.base_url}/training`,
            icon: 'zume-training',
            type: 'dash-link',
            translation: zumeDashboard.translations['training'],
            data: {
                component: 'dash-training',
            },
        },
        {
            name: 'my-training',
            pattern: `${zumeDashboard.base_url}/my-training`,
            parent: 'training',
            icon: 'zume-group',
            type: 'dash-link',
            translation: zumeDashboard.translations['my_training'],
            explanation: zumeDashboard.translations['my_training_explanation'],
            data: {
                component: 'dash-trainings',
            },
        },
        {
            name: 'my-progress',
            pattern: `${zumeDashboard.base_url}/my-progress`,
            parent: 'training',
            icon: 'zume-progress',
            type: 'dash-link',
            translation: zumeDashboard.translations['my_progress'],
            explanation: zumeDashboard.translations['my_progress_explanation'],
            data: {
                component: 'dash-progress',
            },
        },
        {
            name: '3-month-plan',
            pattern: `${zumeDashboard.base_url}/3-month-plan`,
            parent: 'training',
            icon: 'zume-plans',
            type: 'dash-link',
            translation: zumeDashboard.translations['3_month_plan'],
            explanation: zumeDashboard.translations['3_month_plan_explanation'],
            data: {
                component: 'dash-progress',
            },
        },
        {
            name: 'practicing',
            pattern: `${zumeDashboard.base_url}/practicing`,
            icon: 'zume-practicing',
            type: 'dash-link',
            translation: zumeDashboard.translations['practicing'],
            data: {
                component: 'dash-practicing',
            },
        },
        {
            name: 'my-coach',
            pattern: `${zumeDashboard.base_url}/my-coach`,
            parent: 'practicing',
            icon: 'zume-coach',
            type: 'dash-link',
            translation: zumeDashboard.translations['my_coach'],
            explanation: zumeDashboard.translations['my_coach_explanation'],
            data: {
                component: 'dash-coach',
            },
        },
        {
            name: 'my-tools',
            pattern: `${zumeDashboard.base_url}/my-tools`,
            parent: 'practicing',
            icon: 'zume-tools',
            type: 'dash-link',
            translation: zumeDashboard.translations['my_tools'],
            explanation: zumeDashboard.translations['my_tools_explanation'],
            data: {
                component: 'dash-tools',
            },
        },
        {
            name: 'my-plans',
            pattern: `${zumeDashboard.base_url}/my-plans`,
            parent: 'practicing',
            icon: 'zume-plans',
            type: 'dash-link',
            translation: zumeDashboard.translations['my_plans'],
            explanation: zumeDashboard.translations['my_plans_explanation'],
            data: {
                component: 'dash-plans',
            },
        },
        {
            name: 'my-churches',
            pattern: `${zumeDashboard.base_url}/my-churches`,
            parent: 'practicing',
            icon: 'zume-churches',
            type: 'dash-link',
            translation: zumeDashboard.translations['my_churches'],
            explanation: zumeDashboard.translations['my_churches_explanation'],
            data: {
                component: 'dash-churches',
            },
        },
        {
            name: 'my-maps',
            pattern: `${zumeDashboard.base_url}/my-maps`,
            parent: 'practicing',
            icon: 'zume-maps',
            type: 'dash-link',
            translation: zumeDashboard.translations['my_maps'],
            explanation: zumeDashboard.translations['my_maps_explanation'],
            data: {
                component: 'dash-maps',
            },
        },
        {
            name: 'not-found',
            pattern: '*',
            icon: '',
            type: 'dash-link',
            data: {
                component: 'dash-not-found',
            },
        }
    ]
}