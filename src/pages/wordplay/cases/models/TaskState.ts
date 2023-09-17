import { Accessor, createSignal } from 'solid-js';
import { SentenceItem } from './SentenceItem';
import { Sentence } from './Sentence';

export interface TaskState {
    readonly index: number;
    readonly word: string;
    readonly selectedAnswer: Accessor<string>;
    readonly setAnswer: (answer: string) => void;
    readonly isFinalized: Accessor<boolean>;
    readonly correctOption: string;
    readonly options: ReadonlyArray<string>;
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

export function fromSentence(sentence: Sentence): TaskState[] {
    return sentence.items
        .map((item, index) => [item, index] as [SentenceItem, number])
        .filter(([item, _]) => !!item.task)
        .map(([item, index]) => sentenceItemToTaskState(item, index));
}
