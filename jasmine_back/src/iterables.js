export {makeIterable, range, arrayLike, salarios, flatGenerator};

function makeIterable(...items){
   /*
   Esta función recibe un número arbitrario de argumentos de todo tipo. (255 como máximo)
   Debe devolver un iterable que permita recorrerlos. 
 https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Iteration_protocols
    */
}


let range = {from: 1, to: 10
// Este objeto representa un rango de 1 a 10. 
// Añade un Symbol.iterator al objecto, de manera que permita recorrer ese rango
};


let arrayLike = {0: 1, 1: 2}
// Transforma este objecto para que funcione bien Array.from(arrayLike) => [1,2]


let salarios = {
    Juan: 100,
    Ana: 160,
    Pedro: 130
    // Transforma este objeto en un iterable, de manera que cada iteración devuelva:
    // {Juan: 100}, {Ana: 160}...
  };


  function flatGenerator(array){
    /*
    Recibe un array multidimensional y retorna un iterable que permite
    recorrer los elementos del array de izquierda a derecha
    Por ejemplo, a esta entrada: [[[6]],[1,3],[]]
    le correspone estar salida: [6,1,3]
    */
  }

