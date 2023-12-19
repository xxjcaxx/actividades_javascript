export {getData, getDataCache}

async function getData(url){
    /*
    Debe retornar los datos del servidor
    En caso de error con la red, lanzará un error con un mensaje personalizado "Error de red"
    En caso de error del servidor, 500 o 400, lanzará otro error "Error en el servidor"
    Los datos originales están en JSON, también tratará el posible error de parse "El JSON no es correcto"
    Los datos retornados serán en forma de Array o Objeto resultado de parsear el JSON original 
    */
}

function getDataCache(url){
    /*
    Debe retornar otra función para obtener los datos de la url indicada en esta función.
    La función retornada, al ser invocada, retornará la promesa de descargar los datos.
    Hay que implementar una cache, de manera que si se vuelve a invocar la función retornada, retorne lo de la cache.
    Se puede hacer con una closure.
    */
}

