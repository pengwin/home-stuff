import { createMemo } from 'solid-js';

export interface AnswerOptionProps {
    answer: string;
    selected: boolean;
    isFinalized: boolean;
    isCorrect: boolean;
    setAnswer: (answer: string) => void;
}

export function AnswerOption(props: AnswerOptionProps) {
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
