import { changeNumber, quadsToRows, transpose, validateGroup, validateGroups, validateSudoku } from "../src/proyecto_sudoku.js";

describe('Sudoku', function () {
    const sudokuSample = [
        [2, 9, 5, 6, 7, 8, 1, 4, 3],
        [6, 4, 3, 9, 5, 1, 8, 7, 2],
        [8, 7, 1, 3, 4, 2, 5, 9, 6],

        [7, 1, 2, 5, 6, 9, 3, 8, 4],
        [3, 6, 8, 7, 1, 4, 9, 2, 5],
        [4, 5, 9, 8, 2, 3, 6, 1, 7],

        [9, 2, 7, 1, 3, 6, 4, 5, 0], //faltan los 8
        [5, 8, 6, 4, 9, 7, 2, 3, 1],
        [1, 3, 4, 2, 0, 5, 7, 6, 9],
    ];
    let sudoku = structuredClone(sudokuSample);
    describe('Validaciones', function () {
        it('validateGroup debe validar grupos', function () {
            expect(validateGroup([1, 2, 3])).toBe(false);
            expect(validateGroup([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(true);
            expect(validateGroup([1, 2, 3, 5, 6, 7, 8, 9, 4])).toBe(true);
            expect(validateGroup([1, 2, 3, 5, 0, 7, 8, 9, 4])).toBe(false);
            expect(validateGroup([1, 2, 3, 5, 5, 7, 8, 9, 4])).toBe(false);
            expect(validateGroup([1, 2, 3, 5, 6, 7, 8, 9, 4, 0])).toBe(false);
        });
        it('validateGroups debe validar grupos', function () {
            expect(validateGroups(sudoku)).toEqual([true, true, true, true, true, true, false, true, false]);
            let sudoku2 = structuredClone(sudoku);
            sudoku2[0][0] = 9;
            expect(validateGroups(sudoku2)).toEqual([false, true, true, true, true, true, false, true, false]);
        });
        it('transpose debe rotar un sudoku', function () {
            let transposedSudoku = transpose(sudoku);
            const expectedTranspose = [[2, 6, 8, 7, 3, 4, 9, 5, 1],
            [9, 4, 7, 1, 6, 5, 2, 8, 3],
            [5, 3, 1, 2, 8, 9, 7, 6, 4],
            [6, 9, 3, 5, 7, 8, 1, 4, 2],
            [7, 5, 4, 6, 1, 2, 3, 9, 0],
            [8, 1, 2, 9, 4, 3, 6, 7, 5],
            [1, 8, 5, 3, 9, 6, 4, 2, 7],
            [4, 7, 9, 8, 2, 1, 5, 3, 6],
            [3, 2, 6, 4, 5, 7, 0, 1, 9]];
            expect(sudoku).toEqual(sudokuSample); // immutable
            expect(transposedSudoku).toEqual(expectedTranspose);
        });
        it('quadsToRows debe convertir los cuadrados en filas', function () {
            let quadstoRowsSudoku = quadsToRows(sudoku);
            const expectedQuads = [[2, 9, 5, 6, 4, 3, 8, 7, 1],
            [6, 7, 8, 9, 5, 1, 3, 4, 2],
            [1, 4, 3, 8, 7, 2, 5, 9, 6],
            [7, 1, 2, 3, 6, 8, 4, 5, 9],
            [5, 6, 9, 7, 1, 4, 8, 2, 3],
            [3, 8, 4, 9, 2, 5, 6, 1, 7],
            [9, 2, 7, 5, 8, 6, 1, 3, 4],
            [1, 3, 6, 4, 9, 7, 2, 0, 5],
            [4, 5, 0, 2, 3, 1, 7, 6, 9]]

            expect(sudoku).toEqual(sudokuSample); // immutable
            expect(quadstoRowsSudoku).toEqual(expectedQuads);
        });

        it('validateSudoku debe validar todos los elementos del sudoku', function () {
            let validatedSudoku = validateSudoku(sudoku);
            const expectedValidation = {
                rows: [true, true, true, true, true, true, false, true, false],
                cols: [true, true, true, true, false, true, true, true, false],
                quads: [true, true, true, true, true, true, true, false, false]
            };
            expect(validatedSudoku).toEqual(expectedValidation);
        });

        it('changeNumber debe retornar una copia con el número cambiado' , function() {
            let changedSudoku = changeNumber(sudoku)(0,0,0);
            expect(changedSudoku[0][0]).toBe(0);
            expect(sudoku[0][0]).not.toBe(0);
             });

    });
});