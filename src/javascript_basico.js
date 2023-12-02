export {createArraySomeTypes, convert, applyFunction, 
    multiplicar, createMapFunction ,filterChain, sortImmutable, oddSort, oddTwoFigures,
    getHistogram, getWarmHours, createUl, createClimateDataMatrix,
    climateObject, ClimateObject
};

// Tipos de datos:

function createArraySomeTypes() {
    // Debe retornar un array que contenga, en este orden: 
    //un número, un string, un boolean, otro array, un objeto, null, undefined, NaN y una función 
    // En este primer ejecicio ponemos la solución para demostrar cómo se ha de retornar para pasar el test.
    // return [1,"aa",false,[1,2,3,4],{a:1,b:2}, null, undefined, NaN, function a(){return "a";}];
}

function convert(data, type){
    // Debe convertir el dato de entrada en el tipo deseado. 
    // Depende del tipo de destino debe hacer algo distinto. Puedes poner un case
    // En caso de ser imposible de convertir, no dará error, retornará null.
    // Observa los tests i quieres más pistas de cómo se debe comportar esta función.
}

// Funciones

function applyFunction(data, callback){
    // Debe retornar el resultado de aplicar una función pasada como callback al primer dato
}

function multiplicar(numero) {
    // Debe retornar un función que acepte un número y lo multiplique al número que acepta esta función
}

function createMapFunction(mapCallback){
    // Debe retornar una función que acepte un array y retorne otro array con los elementos del 
    // array modificados segun lo que retorna mapCallback al ser invocada con ese elemento.
    // createMapFunction(function(element){return element*2})([1,2,3,4]);
    // > [2,4,6,8]
    // El array original no ha de ser modificado
}

function filterChain(filterCallbacksArray){
    // Debe retornar una función que acepte un array
    // Esta función aplica consecutivamente las funciones de filtro aceptadas como un array de funciones
    // el array original no se modificará
}

// Arrays y objetos

function sortImmutable(array){
    // Debe retornar el array ordenado sin modificar el original
    // El original debe ser un array de números.
  };

function  oddSort(array) {
    // Debe retornar sólo los números impares ordenados de un array
  };
  
function oddTwoFigures(array) {
   // Debe retornar sólo los números impares de dos cifras
  }
  
function getHistogram(array){
    // Debe retornar un array de 100 elementos con la frecuencia de los números
    // de 0 a 99 de un array de entrada.
}

function createUl(array){
    // Esta función acepta un array de textos y retorna una lista <ul> en HTML 
    // El resultado será una string con el código HTML, no un Element
    // Pista: Puedes usar .map() y .join()
}

function getWarmHours(climateData, tempThreshold){
    // Esta función acepta un array bidimensional. Cada fila es una hora del dia (0-23)
    // Cada columna es un dia de un mes (entre 28 - 31 columnas)
    // Cada elemento de la matriz tiene un objeto como este: {t: 21, h: 50} donde t es temperatura y h humedad.
    // Debe retornar un array unidimensional de objetos como este {time: {day: 2, hour: 10}, t: 21, h:50}
    // El array sólo contendrá los objetos en los que la temperatura sea > tempThreshold
    // Pista: puedes usar flatMap y filter
} 

function createClimateDataMatrix(climateDataArray){
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
    }
}

function ClimateObject(temperature, humidity){
    // Crea la función constructora de objetos como el anterior. 
}
// Añade la función getTemperatureFahrenheit al prototype. 

// Puedes probar a crear una clase con el mismo nombre en vez de función constructora
// Debería pasar el test igualmente. 



