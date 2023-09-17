import { For, createMemo } from 'solid-js';

import { Section } from '~/components/layout/Section';
import { TaskState } from '../models/TaskState';
import { AnswerOption } from './AnswerOption';

export function TaskAnswer(props: { item: TaskState }) {
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
