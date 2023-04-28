export default {
    app: 'Home Stuff',
    langs: {
        en: 'English',
        ru: 'Russian',
    },
    components: {
        chart: {
            chartSpinner: {
                text: 'Loading chart',
            },
        },
        sidebar: {
            navigation: 'Navigation',
            lang: {
                title: 'Language',
            },
        },
        forms: {
            required: 'Required',
            fieldRequired: ({ field }: { field: string }) =>
                `Field "${field}" is required`,
        },
        modals: {
            login: {
                signIn: 'Sign In',
                signOut: 'Sign Out',
            },
        },
    },
    pages: {
        index: {
            mainChart: {
                title: 'Main Chart',
                labels: {
                    a: 'A',
                    b: 'B',
                    c: 'C',
                },
            },
            regenerateBtn: 'Regenerate',
        },
        notFound: {
            mainText: 'Not Found',
        },
        test: {
            Comp: {
                SwitchLang: 'Switch lang',
                Flip: 'Flip',
            },
            state: {
                reset: 'reset',
            },
        },
    },
};
