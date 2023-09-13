import {
    Accessor,
    For,
    createMemo,
    createSignal,
    Index,
    createEffect,
} from 'solid-js';
import { MainTitle } from '~/components/layout/MainTitle';
import { Section } from '~/components/layout/Section';
import { SectionTitle } from '~/components/layout/SectionTitle';

interface TaskAnswerDescription {
    correctOption: string;
    options: string[];
}

interface TaskItem {
    word: string;
    task?: TaskAnswerDescription;
}

interface TaskState {
    index: number;
    word: string;
    selectedAnswer: Accessor<string>;
    setAnswer: (answer: string) => void;
    isFinalized: Accessor<boolean>;
    correctOption: string;
    options: string[];
}

function Task(props: {
    item: TaskItem;
    index: number;
    map: Map<number, TaskState>;
}) {
    const taskState = createMemo(() => props.map.get(props.index));
    const answer = createMemo(() => {
        const state = taskState();
        if (!state) {
            return null;
        }
        return state.selectedAnswer();
    });
    const isFinalized = createMemo(() => {
        const state = taskState();
        if (!state) {
            return false;
        }
        return state.isFinalized();
    });
    const showBold = createMemo(() => !!props.item.task && !isFinalized());
    const showBrackets = createMemo(() => !answer() && props.item.task);
    const word = createMemo(() => {
        const result = answer() || props.item.word;
        if (showBrackets()) {
            return `[${result}]`;
        }
        return result;
    });
    const isCorrect = createMemo(() => {
        const state = taskState();
        if (!state) {
            return false;
        }
        return state.correctOption === answer();
    });
    const colorClass = createMemo(() => {
        if (!isFinalized()) {
            return '';
        }
        if (isCorrect()) {
            return 'text-green-500';
        }
        return 'text-red-500';
    });
    const classes = createMemo(
        () => `pl-2 text-lg ${showBold() ? 'font-bold' : ''} ${colorClass()}`,
    );
    return <span class={classes()}>{word()}</span>;
}

interface AnswerOptionProps {
    answer: string;
    selected: boolean;
    isFinalized: boolean;
    isCorrect: boolean;
    setAnswer: (answer: string) => void;
}

function AnswerOption(props: AnswerOptionProps) {
    const cursorClass = createMemo(() =>
        !props.isFinalized ? 'cursor-pointer' : '',
    );
    const selectedNonFinalizedClass = createMemo(() =>
        props.selected && !props.isFinalized ? 'bg-gray-200' : '',
    );
    const selectedFinalizedClass = createMemo(() =>
        props.selected && props.isFinalized ? 'bg-gray-300' : '',
    );
    const selectedClass = createMemo(
        () => `${selectedNonFinalizedClass()} ${selectedFinalizedClass()}`,
    );
    const correctAnswerClass = createMemo(() =>
        props.isFinalized && props.isCorrect ? 'bg-green-300' : '',
    );
    const classes = createMemo(() => {
        return `border-2 border-solid border-gray-300 rounded-md p-2 ml-2 select-none ${cursorClass()} ${selectedClass()} ${correctAnswerClass()}`;
    });
    const onClick = () => props.setAnswer(props.answer);

    return (
        <span class={classes()} onClick={onClick}>
            {props.answer}
        </span>
    );
}

function TaskAnswer(props: { item: TaskState }) {
    const isFinalized = createMemo(() => props.item.isFinalized());
    return (
        <Section>
            <h2 class="font-bold">{props.item.word}</h2>
            <div class="block m-2 text-center">
                <For each={props.item.options}>
                    {option => (
                        <AnswerOption
                            answer={option}
                            isCorrect={props.item.correctOption === option}
                            selected={props.item.selectedAnswer() === option}
                            setAnswer={props.item.setAnswer}
                            isFinalized={isFinalized()}
                        />
                    )}
                </For>
            </div>
        </Section>
    );
}

function TaskAnswers(props: { items: TaskState[] }) {
    return <For each={props.items}>{item => <TaskAnswer item={item} />}</For>;
}

function Tasks(props: { items: TaskItem[]; map: Map<number, TaskState> }) {
    return (
        <div class="text-center mb-10 mt-10">
            <Index each={props.items}>
                {(item, index) => (
                    <Task item={item()} index={index} map={props.map} />
                )}
            </Index>
        </div>
    );
}

function shuffle(array: string[]): string[] {
    array = [...array];
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function taskToTaskState(task: TaskItem, index: number): TaskState {
    const [selectedAnswer, answerSetter] = createSignal<string>('');
    const [isFinalized, setFinalized] = createSignal<boolean>(false);

    const setAnswer = (answer: string) => {
        if (isFinalized()) {
            return;
        }
        if (answer == selectedAnswer()) {
            setFinalized(true);
            return;
        }
        answerSetter(answer);
    };
    return {
        index,
        word: task.word,
        selectedAnswer,
        setAnswer,
        isFinalized,
        correctOption: task.task!.correctOption,
        options: shuffle(task.task!.options),
    };
}

/* eslint-disable i18next/no-literal-string */
export default function Cases() {
    const [defititionIndex, setDefinitionIndex] = createSignal(0);

    const tasks: TaskItem[][] = [
        [
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
        [
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
                    correctOption: 'toplem',
                    options: ['toplem', 'topleg', 'toploj', 'toplim', 'toplom'],
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
    ];

    const currentTask = createMemo(() => tasks[defititionIndex()] || tasks[0]);

    const taskStates: () => TaskState[] = createMemo(() => {
        return currentTask()
            .map((item, index) => [item, index] as [TaskItem, number])
            .filter(([item, _]) => !!item.task)
            .map(([item, index]) => taskToTaskState(item, index));
    });

    const tasksMap = createMemo(() => {
        return taskStates().reduce((acc, item) => {
            acc.set(item.index, item);
            return acc;
        }, new Map<number, TaskState>());
    });

    const isCurrentTaskFinilized = createMemo(() => {
        return taskStates().every(item => item.isFinalized());
    });

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

                <Tasks items={currentTask()} map={tasksMap()} />
                <TaskAnswers items={taskStates()} />
            </Section>
        </>
    );
}
