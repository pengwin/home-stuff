import { createMemo, createSignal, createEffect } from 'solid-js';

import { MainTitle } from '~/components/layout/MainTitle';
import { Section } from '~/components/layout/Section';
import { SectionTitle } from '~/components/layout/SectionTitle';

import { TaskState, fromSentence } from './models/TaskState';
import { TaskAnswers } from './components/TaskAnswers';
import { Sentence } from './components/Sentence';
import { Sentence as SentenceModel } from './models/Sentence';

/* eslint-disable i18next/no-literal-string */
export default function Cases() {
    const [defititionIndex, setDefinitionIndex] = createSignal(0);

    const tasks: SentenceModel[] = [
        {
            items: [
                {
                    word: 'odmorim',
                },
                {
                    word: 'na',
                },
                {
                    word: 'more',
                    task: {
                        correctOption: 'moru',
                        options: ['mora', 'more', 'moru', 'mori', 'morom'],
                    },
                },
            ],
        },
        {
            items: [
                {
                    word: '(ja)',
                },
                {
                    word: 'odmoriti',
                    task: {
                        correctOption: 'odmorim',
                        options: [
                            'odmorim',
                            'odmoriš',
                            'odmorimo',
                            'odmori',
                            'odmore',
                        ],
                    },
                },
                {
                    word: 'na',
                },
                {
                    word: 'toplo',
                    task: {
                        correctOption: 'toplom',
                        options: [
                            'toplem',
                            'topleg',
                            'toploj',
                            'toplim',
                            'toplom',
                        ],
                    },
                },
                {
                    word: 'more',
                    task: {
                        correctOption: 'moru',
                        options: ['mora', 'more', 'moru', 'mori', 'morom'],
                    },
                },
            ],
        },
    ];

    const currentSentence = createMemo(
        () => tasks[defititionIndex()] || tasks[0],
    );

    const taskStates: () => TaskState[] = createMemo(() =>
        fromSentence(currentSentence()),
    );

    const tasksMap = createMemo(() => {
        return taskStates().reduce((acc, item) => {
            acc.set(item.index, item);
            return acc;
        }, new Map<number, TaskState>());
    });

    const isCurrentTaskFinilized = createMemo(() =>
        taskStates().every(item => item.isFinalized()),
    );

    const selectNextTask = () => {
        let randomIndex = Math.floor(Math.random() * tasks.length);
        while (randomIndex === defititionIndex()) {
            randomIndex = Math.floor(Math.random() * tasks.length);
        }
        setDefinitionIndex(randomIndex);
    };

    createEffect(() => {
        if (!isCurrentTaskFinilized()) {
            return;
        }

        setTimeout(() => {
            selectNextTask();
        }, 2000);
    });

    return (
        <>
            <MainTitle>Cases</MainTitle>
            <Section>
                <SectionTitle>
                    Select correct case for word(s) in [brackets]
                </SectionTitle>

                <Sentence sentence={currentSentence()} map={tasksMap()} />
                <TaskAnswers items={taskStates()} />
            </Section>
        </>
    );
}
