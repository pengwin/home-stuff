import { For } from 'solid-js';
import { TaskState } from '../models/TaskState';
import { TaskAnswer } from './TaskAnswer';

export function TaskAnswers(props: { items: TaskState[] }) {
    return <For each={props.items}>{item => <TaskAnswer item={item} />}</For>;
}
