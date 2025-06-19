export {validateGroup, validateGroups, transpose, quadsToRows, 
    validateSudoku, generateValidationMatrix, changeNumber, renderSudoku,
    addEventListenerToElement, generateKeyboard, sudokuSample,
    listenerInputClick, listenTeclado, appendSudoku
}

/*
La idea de estos ejercicios es crear una biblioteca para añadir un sudoku a la web
*/

// Función de composición para ser usada en el resto de funciones
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

/*
Sudoku de ejemplo:
*/
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



/*
Empezamos con la validación del formulario. Ya sabemos que no se debe repetir un número
en filas, columnas o cuadrados. Entendemos cada fila, columna o cuadrado como un grupo de 9 números.

Un grupo es un array de 9 números
Para ser válido debe tener los 9 números diferentes i que no sea ninguno un 0
Esta función retornará true o false en función de si és un grupo válido
*/
const validateGroup = (grupo) =>  "TO DO";


/*
La siguiente función acepta un array de grupos, es decir, un sudoku entero
Valida cada fila, es decir, cada grupo, y devuelve un array de true o false en función
de los grupos que pasan el filtro
Utiliza la función anterior para validar.

En el sudoku de ejemplo, el resultado será [true,true,true,true,true,true,false,true,false]
*/
const validateGroups = (grupos) => "TO DO";

/*
Validar filas es muy fácil usando la función anterior. Pero validar columnas o cuadrados
no es tan sencillo. Además, deberiamos crear funciones adicionales. 
La estrategia es convertir las columnas en filas transportando la matriz (rotándola)
Las columnas convertidas en filas se puede probar con la función anterior. 
La siguiente función transporta un sudoku y retorna una copia en la que las columnas son filas
*/
const transpose = (sudoku) => "TO DO";

/*
Para validar los cuadrados de 9 números también vamos a transformarlos en filas
El orden es de izquierda a derecha y de arriba a abajo
*/
const quadsToRows = (sudoku) =>  "TO DO";

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
const validateSudoku = (sudoku) => "TO DO";

/*
Puede que el resultado de la función anterior sea útil por sí mismo, 
pero ahora podemos usarlo para generar una matriz de true o false en función de 
si toda la fila, columna o cuadrado valida. 
Esta función acepta un objeto como el que retorna la función anterior. 
En el ejemplo, este sería el resultado:
const expectedValidation = [
                [true,true,true,    true,false,true,   true,true,false],
                [true,true,true,    true,false,true,   true,true,false],
                [true,true,true,    true,false,true,   true,true,false],

                [true,true,true,    true,false,true,   true,true,false],
                [true,true,true,    true,false,true,   true,true,false],
                [true,true,true,    true,false,true,   true,true,false],
                                        
                [false,false,false, false,false,false, false,false,false],
                [true,true,true,    false,false,false, false,false,false],
                [false,false,false, false,false,false, false,false,false]];
*/
const generateValidationMatrix = (validation) => "TO DO";


/*
Cada vez que el usuario modifica el sudoku, debe indicar la posición y el nuevo número.
La siguiente función recogerá esto y retornará 
una copia del sudoku pasado por parámetros con en número cambiado
*/
const changeNumber = (sudoku) => (row,col) => (number) => "TO DO";



/* Necesitamos una función que renderize el Sudoku 
Esta función recibe un sudoku y retorna una Element de tipo <table>
Antes de crear las filas y columnas de la tabla, llamará a la función validateSudoku 
Con esa información, podrá cambiar la clase de las celdas, de manera que se vean de otro
color las celdas de las filas, columnas o cuadrados mal resueltos.
Los números originales tendrán la clase "static" y las celdas correctas o incorrectas serán "ok" o "wrong"
En el ejemplo anterior, el resultado podría ser:
<table>
<tbody>
<tr>
<td data-row="0" data-col="0" class="static ok">2</td>
<td data-row="0" data-col="1" class="static ok">9</td>
<td data-row="0" data-col="2" class="static ok">5</td>
     ....
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

/*
Vamos a implementar un componente. 
Este mostrará un teclado con los 10 números para que el usuario los pulse.
El componente será programado en este mismo fichero, pero tendrá un comportamiento autónomo. 
Este componente se comunicará:
    Del padre a él: mediante un parámetro en la función que lo crea.
    De él al padre: mediante un evento personalizado
*/

/*
La siguiente función retornará un div con un teclado numérico.
Los botones del teclado serán buttons.
Recibe en forma de array las coordenadas del número que va a sustituir.  
Los botones, al hacer click, emitirán un evento personalizado con el valor del click
El evento se llamará "teclado" y tendrá como detail {key: 2, coordinates: [2,3]}, por ejemplo.
*/
const generateKeyboard = ([col,row]) => "TO DO";


/*
Cada vez que el usuario haga click sobre el sudoku, se debe capturar el evento.
Este evento detectará las coordenadas del click por el data-row y data-col del td donde se ha hecho click.
Usará esas coordenadas para invocar la función anterior y generar un teclado.
Este teclado lo añadirá con append al td donde se ha hecho click. 
*/
const listenerInputClick = (event) => "TO DO";

/*
Cuando el usuario hace click en cualquier número del teclado generado, este habrá emitido un evento
En las siguientes funciones se añadirá un manejador de ese evento. 
La siguiente función será ese manejador. 
Como se puede ver, recibe un sudoku y el container donde se renderizará. 
Esta función retorna una función que será usada como manejador del evento "teclado"
Recordemos que este evento personalizado tiene en detail el número (key) y las coordenadas donde va el número.
Usará la función changeNumber para modificar el número y volverá a renderizar con la última función que vamos a implementar. 
*/

const listenTeclado = (sudoku, container) => {
    return  (event) => "TO DO";
}

/*
Por último, implementaremos la función que lo centraliza todo. 
Esta función recibe un sudoku y un contenedor en el que ponerlo.
Lo primero que hará será vaciar todo el container de otros posibles sudokus anteriores.
Después:
- llamará a renderSudoku 
- añadirá con addEventListenerToElement el evento de click a un td y el "teclado"
- Añadirá con append el div del sudoku al container
*/

const appendSudoku = (sudoku, container) => "TO DO";
