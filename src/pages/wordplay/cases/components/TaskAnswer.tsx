import { For } from 'solid-js';

import { Section } from '~/components/layout/Section';
import { TaskState } from '../models/TaskState';
import { AnswerOption } from './AnswerOption';

export function TaskAnswer(props: { state: TaskState }) {
    return (
        <Section>
            <h2 class="font-bold">{props.state.word}</h2>
            <div class="block m-2 text-center">
                <For each={props.state.options}>
                    {option => (
                        <AnswerOption
                            answer={option}
                            isFinalized={props.state.isFinalized()}
                        />
                    )}
                </For>
            </div>
        </Section>
    );
}
