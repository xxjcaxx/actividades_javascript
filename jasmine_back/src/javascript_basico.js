export {
  createArraySomeTypes,
  convert,
  getPrimes,
  min,
  applyFunction,
  multiplicar,
  createMapFunction,
  filterChain,
  sortImmutable,
  oddSort,
  oddTwoFigures,
  getHistogram,
  getWarmHours,
  createUl,
  createClimateDataMatrix,
  climateObject,
  ClimateObject,
  sumSalaries,
  multiplyNumeric,
  ladder,
  randomInteger,
  checkSpam,
  truncate,
  getMaxSubSum,
  camelize,
  filterInPlace,
  sortByAge,
  sortBy,
  shuffle,
  uniq,
  arraysUtils,
};

// Tipos de datos:

function createArraySomeTypes() {
  // Debe retornar un array que contenga, en este orden:
  //un número, un string, un boolean, otro array, un objeto, null, undefined, NaN y una función
  // En este primer ejecicio ponemos la solución para demostrar cómo se ha de retornar para pasar el test.
  // return [1,"aa",false,[1,2,3,4],{a:1,b:2}, null, undefined, NaN, function a(){return "a";}];
}

function convert(data, type) {
  // Debe convertir el dato de entrada en el tipo deseado.
  // Depende del tipo de destino debe hacer algo distinto. Puedes poner un case
  // En caso de ser imposible de convertir, no dará error, retornará null.
  // Observa los tests i quieres más pistas de cómo se debe comportar esta función.
}

// Estructuras de control y operadores

function getPrimes(start, end) {
  // Se denomina primo a un número entero mayor que 1 que no puede dividirse sin obtener un residuo por ningún número, excepto 1 y el propio número.
  // En términos simples, un número primo (n > 1) es aquel que no tiene divisores exactos aparte de 1 y n.
  // Como ejemplo, el número 5 es primo, ya que no es divisible exactamente por 2, 3 y 4.
  // Proporciona un código que retorne los números primos en el rango comprendido entre start y end.
}

function min(array) {
  // Debe retornar el número mínimo de un array
  // Debe descartar los valores no numéricos.
}

// Funciones

function applyFunction(data, callback) {
  // Debe retornar el resultado de aplicar una función pasada como callback al primer dato
}

function multiplicar(numero) {
  // Debe retornar un función que acepte un número y lo multiplique al número que acepta esta función
}

function createMapFunction(mapCallback) {
  // Debe retornar una función que acepte un array y retorne otro array con los elementos del
  // array modificados segun lo que retorna mapCallback al ser invocada con ese elemento.
  // createMapFunction(function(element){return element*2})([1,2,3,4]);
  // > [2,4,6,8]
  // El array original no ha de ser modificado
}

function filterChain(filterCallbacksArray) {
  // Debe retornar una función que acepte un array
  // Esta función aplica consecutivamente las funciones de filtro aceptadas como un array de funciones
  // el array original no se modificará
}

// Arrays y objetos

function sortImmutable(array) {
  // Debe retornar el array ordenado sin modificar el original
  // El original debe ser un array de números.
}

function oddSort(array) {
  // Debe retornar sólo los números impares ordenados de un array
}

function oddTwoFigures(array) {
  // Debe retornar sólo los números impares de dos cifras
}

function sortByAge(array) {
  // Esta función recibe un array de objetos como { name: "John", age: 25 }
  // Debe retornar una copia del array ordenada por la edad.
}

function sortBy(array, attribute) {
  // Esta función recibe un array de objetos como { name: "John", age: 25 }
  // Además, recibe el nombre del atributo con el que ordenar
  // Debe retornar una copia del array ordenada por el atributo seleccionado
  // Si el atributo no existe, retornará una copia del array sin ordenar
}

function getHistogram(array) {
  // Debe retornar un array de 100 elementos con la frecuencia de los números
  // de 0 a 99 de un array de entrada.
}

function createUl(array) {
  // Esta función acepta un array de textos y retorna una lista <ul> en HTML
  // El resultado será una string con el código HTML, no un Element
  // Pista: Puedes usar .map() y .join()
}

function getMaxSubSum(array) {
  // retorna el subarray de elementos contiguos que tiene la suma máxima
  // Si cualquier suma es negativa retorna un array vacío
  /*
        getMaxSubSum([-1, 2, 3, -9])          // [2, 3]
        getMaxSubSum([2, -1, 2, 3, -9])       // [2, -1, 2, 3]
        getMaxSubSum([-1, 2, 3, -9, 11])       // [11]
        getMaxSubSum([-2, -1, 1, 2])         // [1, 2]
        getMaxSubSum([100, -9, 2, -3, 5])    // [100]
        getMaxSubSum([1, 2, 3])               //  [1, 2, 3]
        getMaxSubSum([-1, -2, -3])              // []
    */
  // inspirado en: https://es.javascript.info/task/maximal-subarray
}

function filterInPlace(array, filterCallback) {
  // Retorna el array filtrado mutando el array original
  // Debe modificar y retornar el array modificado
  // No debe reasignar el array
}

function getWarmHours(climateData, tempThreshold) {
  // Esta función acepta un array bidimensional. Cada fila es una hora del dia (0-23)
  // Cada columna es un dia de un mes (entre 28 - 31 columnas)
  // Cada elemento de la matriz tiene un objeto como este: {t: 21, h: 50} donde t es temperatura y h humedad.
  // Debe retornar un array unidimensional de objetos como este {time: {day: 2, hour: 10}, t: 21, h:50}
  // El array sólo contendrá los objetos en los que la temperatura sea > tempThreshold
  // Pista: puedes usar flatMap y filter
}

function createClimateDataMatrix(climateDataArray) {
  // Supongamos que el servidor nos envía los datos del clima como en la función anterior
  // Estos datos tienen el formato del resultado y están en un array, posiblemente desordenado.
  // Esta función debe hacer lo contrario que la anterior:
  // acepta ese array y a cada elemento le quita los datos de la fecha y hora y crea la matriz con todos ellos.
}

const climateObject = {
  t: 20,
  h: 50,
  getTemperatureFahrenheit() {
    // Debe retornar la temperatura en la escala fahrenheit.
  },
};

function ClimateObject(temperature, humidity) {
  // Crea la función constructora de objetos como el anterior.
}
// Añade la función getTemperatureFahrenheit al prototype.

// Puedes probar a crear una clase con el mismo nombre en vez de función constructora
// Debería pasar el test igualmente.

function sumSalaries(salaries) {
  /*
    Disponemos de un objeto que guarda la información de los salarios de nuestro equipo:
        let salarios = {
        Juan: 100,
        Ana: 160,
        Pedro: 130
        };

    Escribe el código necesario para retornar la suma de todos los salarios.
    Si el objeto de salarios está vacío, el resultado debe ser 0.
    */
}

function multiplyNumeric(object, n) {
  /*
   Crea una función que multiplique los atributos numéricos de un objeto por n
   Debe dejar intactos el resto de atributos.
   Debe retornar una copia del objeto original, no modificarlo
   Pista: structuredClone
   */
}

const ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  getStep: function () {
    return this.step;
  },
  /*
    Ahora, si necesitamos hacer varias llamadas en secuencia podemos hacer algo como esto:
        ladder.up();
        ladder.up();
        ladder.down();
        ladder.getStep(); // 1
        ladder.down();
        ladder.getStep(); // 0
    Modifica el código de “arriba” up, “abajo” down y obtener peldaño” getStep para hacer los llamados encadenables como esto:
        
        ladder.up().up().down().down().getStep(); 
    */
};

/// Misc.

function randomInteger(min, max) {
  /*
    Debe retornar un número entero aleatorio entre min y max incluyendo ambos, min y max, como valores posibles.
    Todo número del intervalo min..max debe aparecer con la misma probabilidad.
    Si se hace mal, el número min y max puede tener la mitad de probabilidad de salir que el resto
    */
  //Ejercicio obtenido en este tutorial: https://es.javascript.info/task/random-int-min-max
}

function checkSpam(str, spamWords) {
  // Debe obtener true si str contiene alguna de las palabras de spamWords
  // No debe tener en cuenta las mayúsculas y minúsculas
}

function truncate(str, maxLength) {
  // Debe truncar str a la longiud máxima y añadir ... al final
}

function camelize(str) {
  // Debe transformar una cadena de kebab-case a camelCase
  // https://en.wikipedia.org/wiki/Letter_case#Kebab_case
  /*
    camelize("background-color") == 'backgroundColor';
    camelize("list-style-image") == 'listStyleImage';
    camelize("-webkit-transition") == 'WebkitTransition';
    */
}

function shuffle(array) {
  // Debe retornar una copia del array ordenado aleatoriamente
  // Todos los reordenamientos de elementos tienen que tener la misma probabilidad.
  // Explicación: https://es.javascript.info/task/shuffle
}

function uniq(array) {
  // Debe retornar un array sin elementos repetidos
}

const arraysUtils = {
  /* Este objeto literal actua como un espacio de nombres para contener varias
    funciones relacionadas con arrays. Es una manera de no saturar el
    espacio de nombres global y de exportar e importar más cómodamente.
    */

    // Un requisito de esta función es usar Array.splice() para eliminar los elementos
  findAndRemove: function (array, values) {
    /*
        Esta función acepta dos arrays, uno con datos (array) y el de values que 
        son los elementos que se van a eliminar. Retorna un array como el de entrada
        sin los elementos eliminados. 
        No debe mutar el array original.
        En caso de que no sea invocada correctamente (2 arrays), retornará una copia del primer argumento.
               */
  },

 // Un requisito de esta función es usar la función Array.flatMap():
  toBinary: function (bytes) {
    /*
        Esta función recibe un array de "bytes", (números enteros de 1 byte o caracteres ASCII)
        y retorna un array unidimensional con todos los bits representados con 1 y 0s
        Si alguno de los elementos del array no se puede representar en un byte, 
        toda la función lanza un error "Error: Data cannot be converted to 8 bits."
        El array original no debe ser modificado.
        */
  },

  and: function(array, arrayMask){
    /*
    Esta función ejecuta una operación AND entre dos Arrays, uno de ellos
    será la máscara para el primero.
    Puesto que un array puede tener cualquier valor y la operación AND se hace con verdadero y falso,
    hay que considerar el valor Truthy o Falsy de los elementos del arrayMask
    De esta manera, si en la máscara hay un valor truthy, el resultado tendrá el valor del primer array
    Si hay un valor falsy, el resultado tendrá false.
    No se modificará el array original
    */
  },

  or: function(arrayA, arrayB){
    /*
    Esta función ejecuta una operación OR entre dos Arrays.

    Puesto que un array puede tener cualquier valor y la operación OR se hace con verdadero y falso,
    hay que considerar el valor Truthy o Falsy de los elementos de los dos arrays
    En caso de que los dos sean falsy, en esa posición será false
    En caso de que los dos sean truthy, se conservará el valor del arrayA
    En caso de que uno de los dos sea truthy y el otro falsy, se conservará el truthy
    No se modificará el array original
    */

  },

  xor: function(arrayA, arrayB){
    /*
    Esta función ejecuta una operación XOR entre dos Arrays.

    Puesto que un array puede tener cualquier valor y la operación XOR se hace con verdadero y falso,
    hay que considerar el valor Truthy o Falsy de los elementos de los dos arrays
    En caso de que los dos sean falsy, en esa posición será false
    En caso de que los dos sean truthy, en esa posición será false
    En caso de que uno de los dos sea truthy y el otro falsy, se conservará el truthy
    No se modificará el array original
    */
  },


  // Una condición de esta función es usar un Map()
  intersection: function(arrayA, arrayB){
    /*
    
    Esta función retorna un array que es el resultado de hacer la intersección entre dos arrays de entrada. 
    Retorna una array con los elementos coincidentes de los dos arrays. 
    Si un elemento se repite en ambos arrays, debe estar repetido tantas veces como se repita en ambos. 
    Puesto que un array puede tener objetos o arrays como elementos, la comparación será si son el mismo objeto por referencia

    El orden de los elementos del array final se corresponde con el orden de los elementos del primer arrayA. 
    No se modifican los arrays originales.

    */
  }

};
