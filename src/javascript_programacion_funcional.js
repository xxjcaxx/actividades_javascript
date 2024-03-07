// Programación funcional
export {student, arbitraryArgs, getMax, getDistance, shiftArray, allShiftsArray, allShiftsString,
    allNames, removeEmpties, groupByWeeks, filterTeam, getPoints, applyPermutations, Arithmetic,
    compose, stringToArray, reverseArray, joinArrayToString, reverseString,
    memoize, ensureOneCall, createArray, unFlat,cartesianProduct,innerJoin,leftJoin
};

// Funciones puras
/* 
Para probar de forma independiente estos ejercicios, vamos a hacer un objecto que servirá
Como "name space" o espacio de nombres. Esto es una técnica muy utilizada antes de la existencia
de los módulos ESM 
*/
const student = {
    name: "John Doe",
    qualifications: [{subject: "DWEC", grade: 10},{subject: "DWES", grade: 9.5}],
    average: 0,
    getAverage() {
       this.average = this.qualifications[0].grade + this.qualifications[1].grade / 2;

    },
          /*
        Esta función "getAverage" tiene dos problemas: sólo puede sacar la media de dos notas y no es pura
        Purifica esta función para que: 
        Pueda calcular la media de más o menos notas,
        No dependa del objeto en el que se ejecuta, 
        No mute el objeto en el que se ejecuta.
        Retorne la media y acepte como argumentos el array de qualifications.
        Recuerda que no es un ejercicio de programación orientada a objetos, el objeto es sólo un name space 
        Intenta, además, no utilizar for, foreach o while, sólo funciones de alto orden como map,filter,reduce...
        */

    renderGrades(q){
        let gradesDiv = document.querySelector('#grades');
        gradesDiv.innerHTML = `
            <ul>
                <li>${this.qualifications[0].subject}: ${this.qualifications[0].grade}</li>
                <li>${this.qualifications[1].subject}: ${this.qualifications[1].grade}</li>
            </ul>
        `;
    }
    /*
        Esta función "renderGrades" tiene problemas: Sólo renderiza dos posibles notas y no es pura
        Purifica esta función para que:
        Pueda renderizar más notas.
        No dependa del DOM en el que se ejecuta. No todos los HTML tienen un elemento de id=="grades"
        No dependa del objeto en el que se ejecuta, 
        No mute el objeto en el que se ejecuta.
        Retorne un Element de tipo div con un ul dentro con todas las notas en li
        Acepte un array de notas, independientemente de las que ya tiene el objeto.
        No puedes utilizar loops como for, foreach o while, sólo funciones de alto orden como map,filter,reduce...
    */
}


//// Argumentos


function arbitraryArgs(){
    /*
    Debe retornar un array con todos los argumentos que se le pasen 
    No importa la cantidad de argumentos
    Puedes modificar también la definición de la función para prepararla para obtener un número arbitrario de argumentos
    */
}

function getMax(array){
    /*
    La función Math.max() acepta una cantidad arbitraria de parámetros.
    Úsala para sacar el máximo de un array
    Pista: es fácil com ... (spread operator)
    */
}

function getDistance([Xa,Ya],[Xb,Yb]){
    /*
    Esta función recibe dos puntos A y B, que tienen información de su posición en x e y en forma de array
    Ejemplo: let A = [100,50]; // x = 100, y = 50
    La definición de esta función usa "Parameter Destructuring" para simplificar la entrada de argumentos
    Debe retornar la distancia de un punto a otro.
    Modifica la declaración de la función para que, si no se invoca con alguno de los puntos, se entienda que es [0,0]
    */
}


////// Immutabilidad y funciones de alto orden

function shiftArray(array){
     /*
    Debe retornar una copia del array con los elementos desplazados una posición a la izquierda
    [1,2,3,4] ==> [2,3,4,1]
    No debe modificar el array original
    No se deben usar estructuras de bucles, sólo map, filter, reduce en caso de que sea necesario
    */
}

function allShiftsArray(array){
    /*
     Debe retornar un array bidimensional con todos los posibles desplazamientos.
     Puedes usar la función anterior
    [1,2,3,4]    ===>  [[2,3,4,1],
                        [3,4,1,2],
                        [4,1,2,3],
                        [1,2,3,4]]
    No debe modificar el array original
    No se deben usar estructuras de bucles, sólo map, filter, reduce en caso de que sea necesario
    */
}

function allShiftsString(string){
    /*
    Utiliza la función allShiftsArray para obtener todos los desplazamientos de una string
    "abcd"   ===>  ["bdca", "cdab", "dabc", "abcd"] 
    No debe modificar el array original
    No se deben usar estructuras de bucles, sólo map, filter, reduce en caso de que sea necesario
    */
}

function allNames(names,surnames){
  /*
  Debe retornar un array con todas las combinaciones de nombre y dos apellidos posibles
  No debe modificar el array original
  No se deben usar estructuras de bucles, sólo map, filter, reduce en caso de que sea necesario
  
  Recuerda que esto es un ejercicio, no usar bucles no es, por definición, mejor. 
  En una situación real, debes usar el código que queda más legible. 
  */
}


function removeEmpties(matches){
    /*
    En la carpeta ./data encontrarás un fichero liga.json
    Contiene todos los partidos de la liga de primera división masculina de fútbol del 21-22
    El json tiene toda la información útil, pero el servidor ha generado algunos objetos vacíos. 
    Estos tienen atributos, pero son cadenas vacías. 
    Esta función recibe un array de partidos con ese formato.
    Debe retornar una copia del array con los partidos vacíos eliminados.
    
    IMPORTANTE: Esta función no debe descargar los partidos, los recibe por argumentos
    */
}

function groupByWeeks(matches){
    /*
    Esta función también usa los partidos de liga.json
    Debe retornar un array bidimensional de semanas, en el que cda semana tiene los partidos de esta
    */
    
}

function filterTeam(team){
    /*
    Esta es una función currificada:
    Recibe el nombre de un equipo y retorna la siguiente función
    */
    return function(weeks){
    /*
    Recibe un array de semanas como lo retorna la función groupByWeeks
    Devuelve una copia del array original en el que sólo están 
    los partidos de ese equipo tanto local como visitante.
    
    */
    }
}

function getPoints(matches){
    /*
    Aplicando técnicas de programación funcional debe obtener un array de objetos con el siguiente formato:
    {team: "Valencia", stats: { points: 100, gScored: 120, gAgainst: 50}}
    Teniendo en cuenta que en la liga, un partido ganado son 3 puntos y empatado 1 punto.
    El resultado estará ordenado por puntuación ,siendo el primero el que gana la liga.

    Puedes crear las funciones internas que necesites. Intenta mantener un estilo funcional
    con funciones puras que sólo hagan una cosa. Por ejemplo, puedes necesitar funcione para:
    obtener los goles de un partido
    obtener el ganador de un partido
    obtener los puntos de cada equipo de un partido
    ordenar estadísticas por puntos
    ...

     No se deben usar estructuras de bucles, sólo map, filter, reduce en caso de que sea necesario
  
  Recuerda que esto es un ejercicio, no usar bucles no es, por definición, mejor. 
  En una situación real, debes usar el código que queda más legible. 
    */
}


function createArray(length, generatorFunction) {
/*
Esta función retorna un array de la longitud indicada con los elementos
generados por generatorFunction, que acepta el array que se está generando y 
el índice. 
*/
}

function unFlat(array,chunk){
/*
Esta función accepta un array y el tamaño de la división para retornar
un array bidimensional con la filas del tamaño del "chunk"
*/
}

function cartesianProduct(array1, array2){
    /*
    Una función que retorna el producto cartesiano de dos arrays
    es decir, un array bidimensional con todas las combinaciones
    */
}

function innerJoin(array1, array2, relationFunction){
    /*
    Una función que, de dos arrays de objetos con una relación entre 
    ellos definida con una función, obtenga el INNER JOIN. 
    La función acepta dos objetos para decir si están relacionados.
    */
}

function leftJoin(array1, array2, relationFunction){
    /*
    Una función que, de dos arrays de objetos con una relación entre 
    ellos definida con una función, obtenga el LEFT JOIN. 
    La función acepta dos objetos para decir si están relacionados.
    */
}


//// Currying

const applyPermutations = (permutations) => (array) => {
    /*
    Esta función currificada aceptará un array de permutaciones y lo aplicará sobre un array
    Las permutaciones son arrays de la misma cantidad de elementos con la posición que ocupará
    cada elemento del original en el nuevo array

    En el test de esta función puedes ver un ejemplo
    */
}





//// Encadenamiento de métodos o Method Chaining
/*
En realidad no es una técnica específica de la programación funcional, pero es interesante trabajarla
Las funciones de los arrays .map() .filter()... retornan también un array, y eso permite encadenarlas
Estas funciones están en el Prototype de estos objetos. 
Se puede imitar el Method Chaining en nuestras clases.
*/

class Arithmetic {
    constructor() {
      this.value = 0;
    }
    sum(...args) {
      this.value = args.reduce((sum, current) => sum + current, 0);
    }
    add(value) {
      this.value = this.value + value;
    }
    subtraction(value) {
      this.value = this.value - value;
    }
    average(...args) {
      this.value = args.length? (this.sum(...args).value) / args.length: undefined;
    }
  }

 // Esta clase se puede invocar así:
 // let Arithmetic1 = new Arithmetic();
 // Arithmetic1.sum(1,3,6)
 // Arithmetic1.subtraction(3)
 // Arithmetic1.add(4)
 
 /*
 Modifica las funciones para poder invocarlo así:
 Arithmetic1.sum(1,3,6).subtraction(3).add(4)
 */


 //// NOTA: 
 /*
 El method Chaining es suficientemente bueno en muchos casos, 
 pero tiene problemas respecto a la filosofia de la programación funcional:

 Depende de Objetos, por lo que se aproxima más a la POO
 Reorganizar el órden en el que se aplican las funciones es complicado.
 No permite usar funciones externas a los objetos
 Es difícil de encadenar si las funciones retornan otras cosas

 Por algunas de estas razones, librerias como RxJS han decidido sustituir esto por la Composición
*/




//// Composición

// Javascript no tiene de momento una función nativa de composición, pero es una técnica tan
// utilizada que se suele usar librerias como Lodash para aplicarla.
// No obstante, podemos hacer una función simple "compose" que la implementa:

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// Si prefieres el otro órden, el del patrón Pipe:

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Se recomienda analizar este breve código, porque es muy interesante. 


// A continuación hay una serie de ejercicios que se deben completar en orden:


const stringToArray = (string)=> {
    /* Debe retornar un array a partir de un string
    Puedes quitar las {} si la función flecha no las necesita
    */
   
}

const reverseArray = (array) => {
    /* Debe retornar una copia del array invertido */
   
}

const joinArrayToString = (array) => {
    /* Debe retornar un string resultado de concatenar los elementos de un array */
   
}

const reverseString = (string) => {
   /* Debe aplicar composición con las funciones anteriores para obtener la inversa de una string */
   
}



////////  Memoize

const memoize = (fn) => {
    /*
    Esta función acepta una función y retorna una función con una nueva utilidad
    la nueva función hará lo mismo que la que se pasa por parámetros
    pero además, nunca la llamará dos veces con los mismo argumentos. 
    Si se invoca a la nueva función con argumentos con los que ya se ha llamado, 
    retornará un valor guardado en caché. 

    Pista: Puedes convertir los argumentos a string y usar un Map
    */
}



////////////  Ensure One Call

const ensureOneCall = (fn) => {
    /*
    Esta función acepta una función y retorna una nueva que funciona igual
    No obstante la nueva sabe si ya se ha invocado y, en caso de repetición,
    retorna undefined
    */

}