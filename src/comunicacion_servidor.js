export {getData}

async function getData(url){
    /*
    Debe retornar los datos del servidor
    En caso de error con la red, lanzará un mensaje indicando el error
    En caso de error del servidor, 500 o 400, lanzará otro error
    Los datos originales están en JSON, también tratará el posible error de parse
    Los datos retornados serán en forma de Array o Objeto resultado de parsear el JSON original 
    */
   try {
     let response = await fetch(url);
     if(response.status >= 200 && response.status < 300){
        let data = await response.json();
        return data;
     } else {
        throw response.statusText;
     }
   } catch (error) {
    throw error;
   }
}