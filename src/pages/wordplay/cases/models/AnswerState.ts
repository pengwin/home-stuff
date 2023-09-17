import { Accessor, createMemo } from 'solid-js';

export interface AnswerState {
    readonly answer: string;
    readonly isCorrect: boolean;
    readonly isSelected: Accessor<boolean>;
    readonly select: () => void;
}

class AnswerStateImpl implements AnswerState {
    public readonly isCorrect: boolean;
    public readonly isSelected: Accessor<boolean>;
    public readonly select: () => void;

    constructor(
        public readonly answer: string,
        correctOption: string,
        selectedAnswer: Accessor<AnswerState | undefined>,
        setAnswer: (answer: AnswerState) => void,
    ) {
        this.isCorrect = correctOption === answer;
        this.isSelected = createMemo(
            () => (selectedAnswer() as AnswerStateImpl) === this,
        );
        this.select = () => setAnswer(this);
    }
}

export function toAnswerState(
    answer: string,
    correctOption: string,
    selectedAnswer: Accessor<AnswerState | undefined>,
    setAnswer: (answer: AnswerState) => void,
): AnswerState {
    return new AnswerStateImpl(
        answer,
        correctOption,
        selectedAnswer,
        setAnswer,
    );
}
