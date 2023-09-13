/* eslint-disable i18next/no-literal-string */

import { createMemo, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

import { ValueInput } from './components/ValueInput';
import { Meal } from './models/Meal';
import { Meals, MealsWithPortions } from './components/Meals';
import { Value } from './models/Value';
import { ResultRates } from './components/Result';
import { Container } from './components/Container';
import { calculateMeals } from './calculate';
import { PFC, PFCState } from './models/PFC';

class PFCPercentages extends PFC {
    public weight: Value;
    constructor({
        proteins,
        fats,
        carbohydrates,
        weight,
    }: PFCState & { weight: Value }) {
        super({ proteins, fats, carbohydrates });
        this.weight = weight;
    }
}

export default function CaloriesCalculator() {
    const [pfcPercentages, setPfcPercentages] = createStore<PFCPercentages>(
        new PFCPercentages({
            proteins: new Value({ amount: 30, unit: '%' }),
            carbohydrates: new Value({ amount: 50, unit: '%' }),
            fats: new Value({ amount: 20, unit: '%' }),
            weight: new Value({ amount: 70, unit: 'kg' }),
        }),
    );

    const [pfcRates, setPfcPRates] = createStore<PFC>(
        new PFC({
            proteins: new Value({ amount: 1.5, unit: 'g per kg' }),
            fats: new Value({ amount: 0.8, unit: 'g per kg' }),
            carbohydrates: new Value({ amount: 2, unit: 'g per kg' }),
        }),
    );

    const [meals, _setMeals] = createStore<Meal[]>([
        new Meal({
            title: 'Рис круглозерный',
            proteins: new Value({ amount: 0.1, unit: 'g' }),
            fats: new Value({ amount: 0.4, unit: 'g' }),
            carbohydrates: new Value({ amount: 80, unit: 'g' }),
            portion: new Value({ amount: 100, unit: 'g' }),
        }),
        new Meal({
            title: 'Индейка',
            proteins: new Value({ amount: 20, unit: 'g' }),
            fats: new Value({ amount: 22, unit: 'g' }),
            carbohydrates: new Value({ amount: 0.000001, unit: 'g' }),
            portion: new Value({ amount: 100, unit: 'g' }),
        }),
        new Meal({
            title: 'Куриная грудка',
            proteins: new Value({ amount: 24, unit: 'g' }),
            fats: new Value({ amount: 2, unit: 'g' }),
            carbohydrates: new Value({ amount: 0.4, unit: 'g' }),
            portion: new Value({ amount: 100, unit: 'g' }),
        }),
        new Meal({
            title: 'Брокколи',
            proteins: new Value({ amount: 3, unit: 'g' }),
            fats: new Value({ amount: 0.4, unit: 'g' }),
            carbohydrates: new Value({ amount: 7, unit: 'g' }),
            portion: new Value({ amount: 100, unit: 'g' }),
        }),
        new Meal({
            title: 'Крупа гречневая',
            proteins: new Value({ amount: 13, unit: 'g' }),
            fats: new Value({ amount: 3, unit: 'g' }),
            carbohydrates: new Value({ amount: 57, unit: 'g' }),
            portion: new Value({ amount: 100, unit: 'g' }),
        }),
    ]);

    const targetRates = createMemo(() => {
        const result = pfcRates.mul(pfcPercentages.weight.amount);
        return result;
    });

    const [selectedMeals, setSelectedMeals] = createSignal<Meal[]>([]);

    const onSelectedMealsChange = (sm: Meal[]) => {
        setSelectedMeals(sm);
    };

    const resultMeals = createMemo(() => {
        return calculateMeals(selectedMeals(), targetRates());
    });

    const resultRates = createMemo(() => {
        let result = new PFC({
            proteins: new Value({ amount: 0, unit: 'g' }),
            fats: new Value({ amount: 0, unit: 'g' }),
            carbohydrates: new Value({ amount: 0, unit: 'g' }),
        });

        const rm = resultMeals();
        for (let i = 0; i < rm.length; i++) {
            const item = rm[i];
            result = result.add(item.meal.mul(item.portions));
        }

        return result;
    });

    return (
        <div>
            <h1 class="uppercase font-bold font-mono">Calories Calculator</h1>
            <Container>
                <div class="grid gap-4 grid-cols-4 grid-rows-2">
                    <ValueInput
                        param="carbohydrates"
                        state={pfcPercentages}
                        setState={setPfcPercentages}
                    />
                    <ValueInput
                        param="fats"
                        state={pfcPercentages}
                        setState={setPfcPercentages}
                    />
                    <ValueInput
                        param="proteins"
                        state={pfcPercentages}
                        setState={setPfcPercentages}
                    />
                    <ValueInput
                        param="weight"
                        state={pfcPercentages}
                        setState={setPfcPercentages}
                    />

                    <ValueInput
                        param="carbohydrates"
                        state={pfcRates}
                        setState={setPfcPRates}
                    />
                    <ValueInput
                        param="fats"
                        state={pfcRates}
                        setState={setPfcPRates}
                    />
                    <ValueInput
                        param="proteins"
                        state={pfcRates}
                        setState={setPfcPRates}
                    />
                </div>
            </Container>
            <Container>
                <h2 class="uppercase font-bold font-mono">Meals to select</h2>
                <Meals list={meals} onChange={onSelectedMealsChange} />
            </Container>
            <Container>
                <h2 class="uppercase font-bold font-mono">Calculated meals</h2>
                <MealsWithPortions meals={resultMeals()} />
            </Container>
            <ResultRates
                pfcRates={pfcRates}
                resultRates={resultRates()}
                targetRates={targetRates()}
            />
        </div>
    );
}
