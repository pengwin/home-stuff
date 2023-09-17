import { TaskDescription } from './TaskDescription';

export interface SentenceItem {
    readonly word: string;
    readonly task?: TaskDescription;
}
