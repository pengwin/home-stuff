import { Value } from './Value';
import { PFC, PFCState } from './PFC';

export interface ResultMeal {
    meal: Meal;
    portions: number;
}

export class Meal extends PFC {
    public title: string;
    public portion: Value;

    constructor({
        proteins,
        fats,
        carbohydrates,
        title,
        portion,
    }: PFCState & { title: string; portion: Value }) {
        super({ proteins, fats, carbohydrates });
        this.title = title;
        this.portion = portion;
    }
}
