/* eslint-disable i18next/no-literal-string */
import { Accessor, createMemo } from 'solid-js';
import { ValueComponent as VC } from './Value';
import { JSX, children } from 'solid-js';
import { Meal, ResultMeal } from '../models/Meal';

interface MealProps {
    meal: Meal;
    selected: Accessor<boolean>;
    onSelected: () => void;
}

function MealTitle(props: { children: JSX.Element }) {
    const resolved = children(() => props.children);
    return <h2 class="font-bold">{resolved()}</h2>;
}

function MealPFC(props: { meal: Meal }) {
    return (
        <>
            <div>
                <span>Proteins:</span>
                <VC value={props.meal.p} />
            </div>
            <div>
                <span>Fats:</span>
                <VC value={props.meal.f} />
            </div>
            <div>
                <span>Carbohydrates:</span>
                <VC value={props.meal.c} />
            </div>
            <div>
                <span>Per </span>
                <VC value={props.meal.portion} />
            </div>
        </>
    );
}

export function MealComponent(props: MealProps) {
    const handleSelect = () => {
        props.onSelected();
    };

    const classes = createMemo(() => {
        return `border-2 border-solid border-gray-300 rounded-md p-2 cursor-pointer ${
            props.selected() ? 'bg-gray-200' : ''
        }`;
    });

    return (
        <div class={classes()} onClick={handleSelect}>
            <MealTitle>{props.meal.title}</MealTitle>
            <MealPFC meal={props.meal} />
        </div>
    );
}

export function MealWithPortions(props: { meal: ResultMeal }) {
    const meal = createMemo(() => {
        const resultPFC = props.meal.meal.mul(props.meal.portions);

        return new Meal({
            title: props.meal.meal.title,
            portion: props.meal.meal.portion,
            proteins: resultPFC.p,
            fats: resultPFC.f,
            carbohydrates: resultPFC.c,
        });
    });

    const size = createMemo(() => props.meal.meal.portion.mul(props.meal.portions));

    return (
        <div>
            <MealTitle>{props.meal.meal.title} (<VC value={size()} />)</MealTitle>
            <MealPFC meal={meal()} />
        </div>
    );
}
