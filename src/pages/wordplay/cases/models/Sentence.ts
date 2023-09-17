import { SentenceItem } from './SentenceItem';

export interface Sentence {
    readonly items: ReadonlyArray<SentenceItem>;
}
