import { Value } from './Value';

export interface PFCState {
    proteins: Value;
    fats: Value;
    carbohydrates: Value;
}

export class PFC implements PFCState {
    public proteins: Value;
    public fats: Value;
    public carbohydrates: Value;

    constructor({ proteins, fats, carbohydrates }: PFCState) {
        this.proteins = proteins;
        this.fats = fats;
        this.carbohydrates = carbohydrates;
    }

    get p() {
        return this.proteins;
    }

    get f() {
        return this.fats;
    }

    get c() {
        return this.carbohydrates;
    }

    div(b: PFC): PFC {
        return new PFC({
            proteins: new Value({
                amount: this.proteins.div(b.proteins),
                unit: 'unknown',
            }),
            fats: new Value({ amount: this.fats.div(b.fats), unit: 'unknown' }),
            carbohydrates: new Value({
                amount: this.carbohydrates.div(b.carbohydrates),
                unit: 'unknown',
            }),
        });
    }

    mul(b: PFC | number): PFC {
        if (typeof b === 'number') {
            return new PFC({
                proteins: this.proteins.mul(b),
                fats: this.fats.mul(b),
                carbohydrates: this.carbohydrates.mul(b),
            });
        }
        return new PFC({
            proteins: this.proteins.mul(b.proteins),
            fats: this.fats.mul(b.fats),
            carbohydrates: this.carbohydrates.mul(b.carbohydrates),
        });
    }

    add(b: PFC): PFC {
        return new PFC({
            proteins: this.proteins.add(b.proteins),
            fats: this.fats.add(b.fats),
            carbohydrates: this.carbohydrates.add(b.carbohydrates),
        });
    }

    ceil(): PFC {
        return new PFC({
            proteins: this.proteins.ceil(),
            fats: this.fats.ceil(),
            carbohydrates: this.carbohydrates.ceil(),
        });
    }
}
