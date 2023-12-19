import * as http from '../src/comunicacion_servidor.js'

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
       
      });
    });
   });