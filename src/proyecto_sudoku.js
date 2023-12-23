export {validateGroup, validateGroups, transpose, quadsToRows, 
    validateSudoku, changeNumber, renderSudoku
}

/*
La idea de estos ejercicios es crear una biblioteca para añadir un sudoku a la web
*/

// Función de composición para ser usada en el resto de funciones
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

/*
Sudoku de ejemplo:
 const sudokuSample = [
        [2, 9, 5,  6, 7, 8,  1, 4, 3],
        [6, 4, 3,  9, 5, 1,  8, 7, 2],
        [8, 7, 1,  3, 4, 2,  5, 9, 6],
        
        [7, 1, 2,  5, 6, 9,  3, 8, 4],
        [3, 6, 8,  7, 1, 4,  9, 2, 5],
        [4, 5, 9,  8, 2, 3,  6, 1, 7],
    
        [9, 2, 7,  1, 3, 6,  4, 5, 0], //faltan los 8
        [5, 8, 6,  4, 9, 7,  2, 3, 1],
        [1, 3, 4,  2, 0, 5,  7, 6, 9],
    ];
*/


/*
Un grupo es un array de 9 números
Para ser válido debe tener los 9 números diferentes i que no sea ninguno un 0
Esta función retornará true o false en función de si és un grupo válido
*/
const validateGroup = (grupo) =>  { let setGrup = new Set(grupo);
setGrup.delete(0);
return setGrup.size === 9 && grupo.length === 9;}


/*
La siguiente función acepta un array de grupos, es decir, un sudoku entero
Valida cada fila, es decir, cada grupo, y devuelve un array de true o false en función
de los grupos que pasan el filtro
Utiliza la función anterior para validar.

En el sudoku de ejemplo, el resultado será [true,true,true,true,true,true,false,true,false]
*/
const validateGroups = (grupos) => grupos.map(validateGroup);

/*
Validar filas es muy fácil usando la función anterior. Pero validar columnas o cuadrados
no es tan sencillo. Además, deberiamos crear funciones adicionales. 
La estrategia es convertir las columnas en filas transportando la matriz (rotándola)
Las columnas convertidas en filas se puede probar con la función anterior. 
La siguiente función transporta un sudoku y retorna una copia en la que las columnas son filas
*/
const transpose = (sudoku) => sudoku[0].map((col, i) => sudoku.map((fila) => fila[i]));

/*
Para validar los cuadrados de 9 números también vamos a transformarlos en filas
El orden es de izquierda a derecha y de arriba a abajo
*/
function extractSubMatrix(matrix, pos, size) {
    return matrix
      .filter((fila, i) => i >= pos.y && i < pos.y + size)
      .map((fila) => fila.slice(pos.x, pos.x + size));
  }

const quadsToRows = (sudoku) =>  [0,3,6].map(y => [0,3,6].map(x => extractSubMatrix(sudoku,{x,y},3).flat())).flat();


/*
Ahora queda la función que valida todo el sudoku. 
Debe usar las funciones anteriores para validar todas las filas, columnas y cuadrados
Retornará un objeto en el que indique las filas, columnas y cuadrados que están bien o mal.
En el ejemplo, el resultado sería:
{
    rows: [true,true,true,true,true,true,false,true,false],
    cols: [true,true,true,true,false,true,true,true,false],
    quads: [true,true,true,true,true,true,true,false,false]
}
*/
const validateSudoku = (sudoku) => ({rows: validateGroups(sudoku),
                                    cols: validateGroups(transpose(sudoku)),
                                    quads: validateGroups(quadsToRows(sudoku))});


/*
Cada vez que el usuario modifica el sudoku, debe indicar la posición y el nuevo número.
La siguiente función recogerá esto y retornará 
una copia del sudoku pasado por parámetros con en número cambiado
*/
const changeNumber = (sudoku) => (row,col,number) => {
    let sudokuCopy = structuredClone(sudoku);
    sudokuCopy[row][col] = number;
    return sudokuCopy;
};



/* Necesitamos una función que renderize el Sudoku 
Esta función recibe un sudoku y retorna una Element de tipo <table>
Antes de crear las filas y columnas de la tabla, llamará a la función validateSudoku 
Con esa información, podrá cambiar la clase de las celdas, de manera que se vean de otro
color las celdas de las filas, columnas o cuadrados mal resueltos.
Los números originales tendrán la clase "static" y las celdas correctas o incorrectas serán "ok" o "wrong"
En el ejemplo anterior, el resultado podría ser:
<tr>
    <td class="static ok">2</td>
    <td class="static ok">9</td>
    <td class="static ok">5</td>
    <td class="static ok">6</td>
    <td class="static wrong">7</td>
    <td class="static ok">8</td>
    <td class="static ok">1</td>
    <td class="static ok">4</td>
    <td class="static wrong">3</td>
</tr>
<tr>
    <td class="static ok">6</td>
    <td class="static ok">4</td>
    ...
    <td class="input wrong"></td>
*/
const renderSudoku = (sudoku) => "TO DO";


/*
Para poder añadir un eventListener a un elemento del DOM por composición, 
necesitamos la siguiente función que acepta un element y un manejador de evento y lo
añade, retornando finalmente el elemento con el listener
Ejemplo:
addEventListenerToElement("click")(listenerFunction)(divSudoku)
*/
const addEventListenerToElement = (event) => (listener) => (element) =>  "TO DO";


