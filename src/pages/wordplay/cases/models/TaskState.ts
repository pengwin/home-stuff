import { Accessor, createSignal } from 'solid-js';
import { SentenceItem } from './SentenceItem';
import { Sentence } from './Sentence';
import { AnswerState, toAnswerState } from './AnswerState';

export interface TaskState {
    readonly index: number;
    readonly word: string;
    readonly selectedAnswer: Accessor<AnswerState | undefined>;
    readonly isFinalized: Accessor<boolean>;
    readonly options: ReadonlyArray<AnswerState>;
}

function shuffle(array: ReadonlyArray<string>): ReadonlyArray<string> {
    const result = [...array];
    let currentIndex = result.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [result[currentIndex], result[randomIndex]] = [
            result[randomIndex],
            result[currentIndex],
        ];
    }

    return result;
}

function sentenceItemToTaskState(task: SentenceItem, index: number): TaskState {
    const [selectedAnswer, answerSetter] = createSignal<
        AnswerState | undefined
    >();
    const [isFinalized, setFinalized] = createSignal<boolean>(false);

    const setAnswer = (answer: AnswerState) => {
        if (isFinalized()) {
            return;
        }
        if (answer == selectedAnswer()) {
            setFinalized(true);
            return;
        }
        answerSetter(answer);
    };

    const answerStates = shuffle(task.task!.options).map(answer =>
        // eslint-disable-next-line solid/reactivity
        toAnswerState(
            answer,
            task.task!.correctOption,
            selectedAnswer,
            setAnswer,
        ),
    );

    return {
        index,
        word: task.word,
        selectedAnswer,
        isFinalized,
        options: answerStates,
    };
}

export function fromSentence(sentence: Sentence): TaskState[] {
    return sentence.items
        .map((item, index) => [item, index] as [SentenceItem, number])
        .filter(([item, _]) => !!item.task)
        .map(([item, index]) => sentenceItemToTaskState(item, index));
}
