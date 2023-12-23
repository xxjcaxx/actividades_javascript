import { renderSudoku, sudokuSample } from "../proyecto_sudoku.js";

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);


document.addEventListener("DOMContentLoaded",()=>{

    let sudoku = structuredClone(sudokuSample);
    const divSudoku = document.querySelector("#sudoku");

    divSudoku.append(renderSudoku(sudoku));

});