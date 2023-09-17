import { createMemo } from 'solid-js';
import { SentenceItem as SentenceItemModel } from '../models/SentenceItem';
import { TaskState } from '../models/TaskState';

export function SentenceItem(props: {
    item: SentenceItemModel;
    index: number;
    map: Map<number, TaskState>;
}) {
    const taskState = createMemo(() => props.map.get(props.index));
    const answer = createMemo(() => taskState()?.selectedAnswer());
    const isFinalized = createMemo(() => taskState()?.isFinalized() || false);
    const showBold = createMemo(() => !!props.item.task && !isFinalized());
    const showBrackets = createMemo(() => !answer() && props.item.task);
    const isCorrect = createMemo(() => taskState()?.correctOption === answer());
    const word = createMemo(() => {
        const result = answer() || props.item.word;
        if (showBrackets()) {
            return `[${result}]`;
        }
        return result;
    });
    const classList = createMemo(() => ({
        'font-bold': showBold(),
        'text-green-500': isFinalized() && isCorrect(),
        'text-red-500': isFinalized() && !isCorrect(),
    }));
    return (
        <span class="pl-2 text-lg" classList={classList()}>
            {word()}
        </span>
    );
}
