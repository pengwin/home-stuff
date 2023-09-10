import { Meal, ResultMeal } from './models/Meal';
import { PFC } from './models/PFC';

export function calculateMeals(
    selectedMeals: Meal[],
    targetRates: PFC,
): ResultMeal[] {
    const result: ResultMeal[] = [];

    if (selectedMeals.length === 0) {
        return result;
    }

    function addToResult(i: ResultMeal) {
        const existing = result.find(r => r.meal.title === i.meal.title);
        if (!existing) {
            result.push(i);
            return;
        }
        if (i.portions > existing.portions) {
            result.push(i);
            return;
        }
    }

    const sm = selectedMeals;
    const tr = targetRates;

    let resultProtein: ResultMeal = { meal: sm[0], portions: 100000 };
    let resultFat: ResultMeal = { meal: sm[0], portions: 100000 };
    let resultCarbohydrates: ResultMeal = { meal: sm[0], portions: 100000 };

    for (let i = 0; i < sm.length; i++) {
        const meal = sm[i];

        const portions = tr.div(meal).ceil();

        if (resultProtein.portions > portions.p.amount) {
            resultProtein = { meal, portions: portions.p.amount };
        }
        if (resultFat.portions > portions.f.amount) {
            resultFat = { meal, portions: portions.f.amount };
        }
        if (resultCarbohydrates.portions > portions.c.amount) {
            resultCarbohydrates = {
                meal,
                portions: portions.c.amount,
            };
        }
    }

    if (resultProtein) {
        addToResult(resultProtein);
    }
    if (resultFat) {
        addToResult(resultFat);
    }
    if (resultCarbohydrates) {
        addToResult(resultCarbohydrates);
    }

    return result;
}
