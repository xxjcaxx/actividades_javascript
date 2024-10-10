import { appendSudoku, sudokuSample } from "../proyecto_sudoku.js";


document.addEventListener("DOMContentLoaded", () => {
    let sudoku = structuredClone(sudokuSample);
    const divSudoku = document.querySelector("#sudoku");
    appendSudoku(sudoku,divSudoku);
});