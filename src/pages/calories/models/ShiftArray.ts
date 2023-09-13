// Array which shift numbers between positions like in n-based numbers
// Example for base 1 and size 3:
// 0 0 0
// 1 0 0
// 0 1 0
// 1 1 0
// 0 0 1
// 1 0 1
// 0 1 1
// 1 1 1
export class ShiftArray {
    private _array: number[];
    private _base: number;

    constructor(size: number, base: number, initialValue?: number[]) {
        this._array = new Array(size).fill(0);
        if (initialValue) {
            this._array = initialValue;
        }
        this._base = base;
    }

    public get array(): number[] {
        return [...this._array];
    }

    public get isFinal(): boolean {
        return this._array.every(x => x === this._base);
    }

    public shift(): void {
        let i = 0;
        while (i < this._array.length) {
            if (this._array[i] < this._base) {
                this._array[i] = this._array[i] + 1;
                break;
            }
            this._array[i] = 0;
            i++;
        }
    }
}
