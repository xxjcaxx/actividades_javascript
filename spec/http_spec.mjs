import * as http from '../src/comunicacion_servidor.js'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Comunicación con el servidor', function() {
    describe('fetch', function() {
      it('getData debe obtener los datos o un error' , async function() {

        let promise = http.getData('__spec__/src/data/liga.json')
        expect(promise).toBeInstanceOf(Promise);
        try {
            let data = await promise;
            expect(data).toBeInstanceOf(Array);
        } catch (error) {
            console.log(error);
        }
        let promiseErrorRed = http.getData('http://dominioquenoexiste.noexiste/__spec__/src/data/liga.json')
        expect(promiseErrorRed).toBeInstanceOf(Promise);
        try {
            let data = await promiseErrorRed;
           // expect(data).toBeInstanceOf(Array);
        } catch (error) {
            expect(error).toBe("Error de red");
        }
        let promiseErrorServidor = http.getData('__spec__/src/data/noexiste.json')
        expect(promiseErrorServidor).toBeInstanceOf(Promise);
        try {
            let data = await promiseErrorServidor;
           // expect(data).toBeInstanceOf(Array);
        } catch (error) {
            expect(error).toBe("Error en el servidor");
        }

        let promiseErrorJSON= http.getData('__spec__/src/data/jsonMalo.json')
        expect(promiseErrorJSON).toBeInstanceOf(Promise);
        try {
            let data = await promiseErrorJSON;
           // expect(data).toBeInstanceOf(Array);
        } catch (error) {
            expect(error).toBe("El JSON no es correcto");
        }
       
      });

      it('getDataCache debe obtener los datos en cache o del servidor' , async function() {
        const spyFetch = spyOn(window, 'fetch').and.callThrough();;
        let getLiga = http.getDataCache('__spec__/src/data/liga.json');
        let promise = getLiga();
        expect(promise).toBeInstanceOf(Promise);
        let data = await promise;
        expect(data).toBeInstanceOf(Array);
        expect(spyFetch).toHaveBeenCalled();
        // Cache
        let promiseCache = getLiga();
        let dataCache = await promiseCache;
        expect(dataCache).toBeInstanceOf(Array);
        expect(spyFetch).toHaveBeenCalledTimes(1);

      });
    });
   });