export {getData, getDataCache, getImg, sendForm, sendFormJSON, generateURL}

async function getData(url){
    /*
    Debe retornar los datos del servidor que están en JSON, ha de retornar el objeto resultante de parsear JSON
    En caso de error con la red, lanzará un error con un mensaje personalizado "Error de red"
    En caso de error del servidor, 500 o 400, lanzará otro error "Error en el servidor"
    Los datos originales están en JSON, también tratará el posible error de parse "El JSON no es correcto"
    Los datos retornados serán en forma de Array o Objeto resultado de parsear el JSON original 
    */

    try {
        const response = await fetch(url);

        // Verificar si hubo un error del servidor
        if (!response.ok) {
            if (response.status >= 500) {
                throw new Error("Error en el servidor");
            } else if (response.status >= 400) {
                throw new Error("Error del cliente: " + response.status);
            }
        }

        // Intentar analizar el JSON
        try {
            const json = await response.json();
            return json;
        } catch (error) {
            throw new Error("El JSON no es correcto");
        }
    } catch (error) {
        // Comprobar si es un error de red
        if (error instanceof TypeError) {
            throw new Error("Error de red");
        }
        throw error; // Otros errores
    }


}

function getDataCache(url){
    /*
    Debe retornar otra función para obtener los datos de la url indicada en esta función.
    La función retornada, al ser invocada, retornará la promesa de descargar los datos.
    Hay que implementar una cache, de manera que si se vuelve a invocar la función retornada, retorne lo de la cache.
    Se puede hacer con una closure.
    */
    const urls = new Map()

    return async function(){
        if(urls.has(url)){
            return urls.get(url);
        }
        urls.set(url, await getData(url));
        return urls.get(url);
    }
}


async function getImg(url){
    /*
    Esta función acepta una URL de una imagen y retorna la URL a un blob de la misma. 
    Puede ser útil para pedir imágenes que están protegidas con una ApiKey o AccessToken...
    */
    const response = await fetch(url);
    const json = await response.blob();
    const urlBlob = URL.createObjectURL(json);
    return urlBlob;
}

async function sendForm(form,url){
    /*
    Esta función acepta un formulario del DOM y envia los datos por POST
    Retorna la respuesta del servidor en formato texto.
    Internamente debe usar FormData y fetch. 
    */
   const formData = new FormData(form);
   const response = await fetch(url, {method: 'POST', body: formData});
   return await response.text();

}

async function sendFormJSON(form,url){
    /*
    Esta función acepta un formulario del DOM y envía por POST los datos en formato JSON
    Retorna la respuesta del servidor en formato JSON. Se supone que responde lo mismo que le enviamos
    Internamente usará FormData y fetch
    Cuando enviamos un JSON hay que especificar en los headers "Content-type": "application/json; charset=UTF-8"
    */
    const formData = new FormData(form);
    const response = await fetch(url, {method: 'POST', headers: {"Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(Object.fromEntries(formData))});
    return await response.json();
}

function generateURL(url,searchParams){
    /*
    Esta función recibe una url base y un array de parámetros de búsqueda
    Este array tiene un formato como [["country", "Spain"],["province", "València"]]
    Debes construir una URL segura con el típico formato de GET:
    'api/country=Spain&province=Val%C3%A8ncia'
    Ten en cuenta que los espacios o & son caracteres especiales y no valen para las URL
    Pista: Te irá mejor si usas URLSearchParams
    */
}