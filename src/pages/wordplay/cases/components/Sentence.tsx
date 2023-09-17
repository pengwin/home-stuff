import { Index } from 'solid-js';
import { TaskState } from '../models/TaskState';
import { Sentence as SentenceModel } from '../models/Sentence';

import { SentenceItem } from './SentenceItem';

export function Sentence(props: {
    sentence: SentenceModel;
    map: Map<number, TaskState>;
}) {
    return (
        <div class="text-center mb-10 mt-10">
            <Index each={props.sentence.items}>
                {(item, index) => (
                    <SentenceItem item={item()} index={index} map={props.map} />
                )}
            </Index>
        </div>
    );
}
