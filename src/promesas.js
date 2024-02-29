export {delayedFunction, delayPromiseFunction, promisify, rejectify, headsOrTailsPromise, fakeNetwork,
    getMultipleData, getMultipleDataPromises, getMultipleDataSequential,
    getMultipleDataTimeoutCancellable, functionDebounce
}

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

// Proporcionamos una función que simular una red que suele funcionar un 90% de la veces.
// En un programa real, esto podría ser la función fetch. 
// Esta función retorna la promesa de que pedirá una URL por Internet. En realidad, como es falso, sólo retorna la misma url
function fakeNetwork(url){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Math.random() > 0.1 && resolve(url) || reject(url);
        },Math.random()*100)
    });    
}

function getMultipleData(urls){
    /* Esta función hará una petición a fakeNetwork de cada elemento del array urls
    Retornará la promesa de un array de resultados o de null en caso de fallo en la descarga de alguna url
    */
}

function getMultipleDataPromises(urls){
    /* Esta función hará una petición a fakeNetwork de cada elemento del array urls
    Retornará un array de promesas de obtener esos resultados o de null en caso de fallo
    */
}

function getMultipleDataSequential(urls,callback){
    /*
    Esta función hará una petición a fakeNetwork para cada url del array urls. 
    Cuando tenga el resultado, ejecutará el callback con el resultado y empezará con la siguiente url.
    No puede hacer una nueva petición hasta que la primera no acabe
    Retornará la promesa de ejecutar los callbacks
    En caso de fallo de descarga ejecuta el callback con la url, no el resultado
    */
}

function getMultipleDataTimeoutCancellable(urls,callback,time){
    /*
    Esta función hará una petición a cada elemento del array y retorna la
    promesa de ejecutar los callbacks.
    Para cada elemento debe ejecutar el callback.
    En caso de que, pasado un tiempo no se consigan todas las peticiones,
    no ejecutará ninguno de los callbacks y retornará un reject informando
    de la cantidad de peticiones incumplidas. 
    En caso de que se consigan todas, ejecutará el callback y retornará un resolve.
    */    
}


function functionDebounce(fn,debounceTime){

    /*
    Debounce es un término que se usa para retardar la ejecución de una función
    Al mismo tiempo, si en el tiempo retardado se vuelve a llamar, la primera
    queda descartada y se ejecuta la segunda en el tiempo indicado a partir de cuando se ejecuta. 

    Por ejemplo:
    |12------3--4--5------6-7-8----9----------------------->
    |-----2------------5----------8----9------------------->

    Cada guión (-) representa 100 milisegundos i hay un debounceTime de 400ms 

    Esta función acepta una función y un debounceTime y retorna otra funcion
    Esta otra función retornará la promesa de ejecutar la primera función pasado el debounceTime
    Pero si se vuelve a invocar en menos tiempo del debounceTime, 
    la promesa anterior será rechazada y retornará la promesa de volver a intentarlo.
    */
}
