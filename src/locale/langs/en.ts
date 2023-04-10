export default {
    app: 'Home Stuff',
    langs: {
        en: 'English',
        ru: 'Russian',
    },
    components: {
        sidebar: {
            navigation: 'Navigation',
            lang: {
                title: 'Language',
            },
        },
        forms: {
            required: 'Required',
            fieldRequired: 'Field "{{ field }}" is required',
        },
        modals: {
            login: {
                signIn: 'Sign In',
                signOut: 'Sign Out',
            },
        },
    },
    pages: {
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
