import { For, Signal, createMemo, createSignal } from 'solid-js';
import { MealComponent, MealWithPortions } from './Meal';
import { Meal, ResultMeal } from '../models/Meal';

interface MealsProps {
    list: Meal[];
    onChange: (selectedMeals: Meal[]) => void;
}

export function MealsWithPortions(props: { meals: ResultMeal[] }) {
    const colsNumber = 4;
    const rowsNumber = createMemo(() => props.meals.length / colsNumber);

    const classes = createMemo(() => {
        return `grid gap-4 grid-cols-${colsNumber} grid-rows-${rowsNumber()}`;
    });

    return (
        <div class={classes()}>
            <For each={props.meals}>
                {item => <MealWithPortions meal={item} />}
            </For>
        </div>
    );
}

export function Meals(props: MealsProps) {
    const mealsMap = createMemo(() => {
        const map = new Map<string, Signal<boolean>>();
        props.list.forEach(meal => {
            // eslint-disable-next-line solid/reactivity
            map.set(meal.title, createSignal(false));
        });
        return map;
    });

    const selectedMeals = createMemo(() => {
        const result = new Array<Meal>();
        props.list.forEach(meal => {
            const signal = mealsMap().get(meal.title);
            if (!signal) {
                return;
            }
            const [isSelected, _] = signal;
            if (isSelected()) {
                result.push(meal);
            }
        });
        return result;
    });

    const selectMeal = (meal: Meal) => {
        const signal = mealsMap().get(meal.title);
        if (!signal) {
            return;
        }

        const [isSelected, setSelected] = signal;

        setSelected(!isSelected());

        props.onChange(selectedMeals());
    };

    const getAccessor = (meal: Meal) => {
        const signal = mealsMap().get(meal.title);
        if (!signal) {
            throw new Error(`Signal for meal ${meal.title} not found`);
        }
        const [isSelected, _] = signal;
        return isSelected;
    };

    const colsNumber = 4;
    const rowsNumber = createMemo(() => props.list.length / colsNumber);

    const classes = createMemo(() => {
        return `grid gap-4 grid-cols-${colsNumber} grid-rows-${rowsNumber()}`;
    });

    return (
        <div class={classes()}>
            <For each={props.list} fallback={<div>Loading...</div>}>
                {meal => (
                    <MealComponent
                        meal={meal}
                        selected={getAccessor(meal)}
                        onSelected={() => selectMeal(meal)}
                    />
                )}
            </For>
        </div>
    );
}
