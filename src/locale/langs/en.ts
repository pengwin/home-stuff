export default {
    app: 'Home Stuff',
    langs: {
        en: 'English',
        ru: 'Russian',
    },
    components: {
        grid: {
            cellComponents: {
                num: {
                    numberFormatLocale: 'en-US',
                },
                date: {
                    fullFormat: 'DD/MM/YYYY HH:mm:ss',
                    justNow: 'Just now',
                    dateFormat: 'DD/MM/YYYY',
                    timeFormat: 'HH:mm:ss',
                    nDaysAgo: (n: number) =>
                        n === 1 ? 'A day ago' : `${n} days ago`,
                    nHoursAgo: (n: number) =>
                        n === 1 ? 'An hour ago' : `${n} hours ago`,
                    nMinutesAgo: (n: number) =>
                        n === 1 ? 'A minute ago' : `${n} minutes ago`,
                },
            },
        },
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
