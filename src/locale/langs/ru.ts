export default {
    app: 'Home Stuff',
    langs: {
        en: 'Английский',
        ru: 'Русский',
    },
    components: {
        sidebar: {
            navigation: 'Навигация',
            lang: {
                title: 'Язык',
            },
        },
        forms: {
            required: '*',
            fieldRequired: ({ field }: { field: string }) =>
                `Поле "${field}" должно быть заполнено`,
        },
        modals: {
            login: {
                signIn: 'Войти',
                signOut: 'Выйти',
            },
        },
    },
    pages: {
        index: {
            mainChart: {
                title: 'Главный график',
                labels: {
                    a: 'A',
                    b: 'Б',
                    c: 'В',
                },
            },
            regenerateBtn: 'Перегенерировать',
        },
        notFound: {
            mainText: 'Страница не найдена',
        },
        test: {
            Comp: {
                SwitchLang: 'Переключить язык',
                Flip: 'Перевернуть',
            },
            state: {
                reset: 'сброс',
            },
        },
    },
};
