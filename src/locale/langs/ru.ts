export default {
    app: 'Home Stuff',
    langs: {
        en: 'Английский',
        ru: 'Русский',
    },
    components: {
        grid: {
            cellComponents: {
                num: {
                    fractionDigits: () => 2,
                    numberFormatLocale: 'ru-RU',
                },
                date: {
                    fullFormat: 'DD.MM.YYYY HH:mm:ss',
                    justNow: 'Только что',
                    dateFormat: 'DD.MM.YYYY',
                    timeFormat: 'HH:mm:ss',
                    nDaysAgo: (n: number) =>
                        n === 1 ? 'День назад' : `${n} дней назад`,
                    nHoursAgo: (n: number) =>
                        n === 1 ? 'Час назад' : `${n} часов назад`,
                    nMinutesAgo: (n: number) =>
                        n === 1 ? 'Минуту назад' : `${n} минут назад`,
                },
            },
        },
        chart: {
            chartSpinner: {
                text: 'Загрузка диаграммы',
            },
        },
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
