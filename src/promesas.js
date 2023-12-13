export {delayedFunction, delayPromiseFunction, promisify, rejectify, headsOrTailsPromise }

function delayedFunction(callback,time){
    // Debe ejecutar una función pasado un tiempo
}

function delayPromiseFunction(callback,time){
    // Debe retornar la promesa de que va a ejecutar una función pasado un tiempo
}

function promisify(value){
    // Debe retornar la promesa de retornar un valor
}

function rejectify(error){
    // Debe retornar una promesa que siempre falla retornando un error
}

function headsOrTailsPromise(callback, error){
    // Debe lanzar una moneda y, si sale cara, ejecutar el callback
    // Si sale cruz, la función de error. 
    // Debe retornar la promesa de lanzar la moneda.
    // Además de estas funciones, si sale cara, resuelve con "Head" 
    // Si sale cruz rechaza con "Tail" 
}

