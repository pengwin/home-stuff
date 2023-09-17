import { createMemo } from 'solid-js';
import { AnswerState } from '../models/AnswerState';

export interface AnswerOptionProps {
    answer: AnswerState;
    isFinalized: boolean;
}

export function AnswerOption(props: AnswerOptionProps) {
    const classList = createMemo(() => ({
        'cursor-pointer': !props.isFinalized,
        'bg-gray-200': props.answer.isSelected() && !props.isFinalized,
        'bg-gray-300': props.answer.isSelected() && props.isFinalized,
        'bg-green-300': props.isFinalized && props.answer.isCorrect,
        'bg-red-300':
            props.answer.isSelected() &&
            props.isFinalized &&
            !props.answer.isCorrect,
    }));

    const onClick = () => props.answer.select();

    return (
        <span
            class="border-2 border-solid border-gray-300 rounded-md p-2 ml-2 select-none"
            classList={classList()}
            onClick={onClick}
        >
            {props.answer.answer}
        </span>
    );
}
