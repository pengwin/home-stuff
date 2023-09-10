import { Meal, ResultMeal } from './models/Meal';
import { PFC } from './models/PFC';
import { ShiftArray } from './models/ShiftArray';
import { Value } from './models/Value';

export function calculateMeals(
    selectedMeals: Meal[],
    targetRates: PFC,
): ResultMeal[] {
    const result: ResultMeal[] = [];

    if (selectedMeals.length === 0) {
        return result;
    }

    const sm = selectedMeals;

    const shiftArray = new ShiftArray(sm.length, 10);

    const resultMeals = (a: number[]) => {
        const result: ResultMeal[] = [];
        for (let i = 0; i < a.length; i++) {
            const item = a[i];
            const meal = sm[i];
            const portions = item;
            result.push({ meal, portions });
        }
        return result;
    };

    const resultRates = () => {
        let result = new PFC({
            proteins: new Value({ amount: 0, unit: 'g' }),
            fats: new Value({ amount: 0, unit: 'g' }),
            carbohydrates: new Value({ amount: 0, unit: 'g' }),
        });

        const rm = resultMeals(shiftArray.array);
        for (let i = 0; i < rm.length; i++) {
            const item = rm[i];
            result = result.add(item.meal.mul(item.portions));
        }

        return result;
    };

    let resultArray = shiftArray.array;
    let currentAverageDiff = Infinity;

    while (!shiftArray.isFinal) {
        const actualRates = resultRates();
        const averageDiff = actualRates.averageDiff(targetRates);
        if (averageDiff < currentAverageDiff) {
            currentAverageDiff = averageDiff;
            resultArray = shiftArray.array;
        }
        shiftArray.shift();
    }

    return resultMeals(resultArray);
}
