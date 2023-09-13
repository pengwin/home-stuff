import { Unit } from './Unit';

interface ValueParams {
    amount: number;
    unit: Unit;
}

export class Value {
    public readonly amount: number;
    public readonly unit: Unit;

    constructor({ amount, unit }: ValueParams) {
        this.amount = amount;
        this.unit = unit;
    }

    public mul(b: Value | number): Value {
        if (typeof b === 'number') {
            return new Value({
                amount: this.amount * b,
                unit: this.unit,
            });
        }
        const newUnit = this.getUnit(b);

        // TODO: convert
        return new Value({
            amount: this.amount * b.amount,
            unit: newUnit,
        });
    }

    public div(b: Value | number): number {
        if (typeof b === 'number') {
            return this.amount / b;
        }
        return this.amount / b.amount;
    }

    public add(b: Value): Value {
        return new Value({
            amount: this.amount + b.amount,
            unit: this.unit,
        });
    }

    public sub(b: Value): Value {
        return new Value({
            amount: this.amount - b.amount,
            unit: this.unit,
        });
    }

    public diff(b: Value): Value {
        const diff = this.sub(b).abs();
        return new Value({
            amount: (diff.amount / this.amount) * 100,
            unit: '%',
        });
    }

    public ceil(): Value {
        return new Value({
            amount: Math.ceil(this.amount),
            unit: this.unit,
        });
    }

    public abs(): Value {
        return new Value({
            amount: Math.abs(this.amount),
            unit: this.unit,
        });
    }

    private getUnit(b: Value): Unit {
        if (this.unit === b.unit) {
            return this.unit;
        }
        if (
            (this.unit === 'g per kg' && b.unit === 'kg') ||
            (this.unit === 'kg' && b.unit === 'g per kg')
        ) {
            return 'g';
        }

        return 'unknown';
    }
}
