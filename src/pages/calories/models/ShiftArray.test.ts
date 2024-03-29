import { describe, expect, test } from 'vitest';

import { ShiftArray } from './ShiftArray';

describe('ShiftArray', () => {
    describe('size = 3 and base = 1', () => {
        test.each([
            [1, [1, 0, 0]],
            [2, [0, 1, 0]],
            [3, [1, 1, 0]],
            [4, [0, 0, 1]],
            [5, [1, 0, 1]],
            [6, [0, 1, 1]],
            [7, [1, 1, 1]],
            [7, [1, 1, 1]],
            [8, [0, 0, 0]],
        ])(
            'after %dth shift should return %o',
            (numberOfShifts: number, expected: number[]) => {
                // arrange
                const array = new ShiftArray(3, 1);

                //act
                for (let i = 0; i < numberOfShifts; i++) {
                    array.shift();
                }
                const actual = array.array;

                // assert
                expect(actual).toEqual(expected);
            },
        );

        test('should return true when isFinal', () => {
            // arrange
            const array = new ShiftArray(3, 1, [1, 1, 1]);

            // act
            const actual = array.isFinal;

            // assert
            expect(actual).toBe(true);
        });
    });

    describe('size = 3 and base = 2', () => {
        test.each([
            [1, [1, 0, 0]],
            [2, [2, 0, 0]],
            [3, [0, 1, 0]],
            [4, [1, 1, 0]],
            [5, [2, 1, 0]],
            [6, [0, 2, 0]],
            [7, [1, 2, 0]],
            [8, [2, 2, 0]],
            [9, [0, 0, 1]],
            [10, [1, 0, 1]],
            [11, [2, 0, 1]],
            [12, [0, 1, 1]],
            [13, [1, 1, 1]],
            [14, [2, 1, 1]],
            [15, [0, 2, 1]],
            [16, [1, 2, 1]],
            [17, [2, 2, 1]],
            [18, [0, 0, 2]],
            [19, [1, 0, 2]],
            [20, [2, 0, 2]],
            [21, [0, 1, 2]],
            [22, [1, 1, 2]],
            [23, [2, 1, 2]],
            [24, [0, 2, 2]],
            [25, [1, 2, 2]],
            [26, [2, 2, 2]],
        ])(
            'after %dth shift should return %o',
            (numberOfShifts: number, expected: number[]) => {
                // arrange
                const array = new ShiftArray(3, 2);

                //act
                for (let i = 0; i < numberOfShifts; i++) {
                    array.shift();
                }
                const actual = array.array;

                // assert
                expect(actual).toEqual(expected);
            },
        );

        test('should return true when isFinal', () => {
            // arrange
            const array = new ShiftArray(3, 2, [2, 2, 2]);

            // act
            const actual = array.isFinal;

            // assert
            expect(actual).toBe(true);
        });
    });
});
