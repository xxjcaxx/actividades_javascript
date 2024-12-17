/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, it, vi, beforeEach, beforeAll, afterAll, afterEach } from "vitest";
import { HttpResponse, http as rest } from 'msw';
import { setupServer } from 'msw/node';

import * as http from '../src/comunicacion_servidor.js'

import  liga from '../src/data/liga.json';
import logo from '../src/data/JavaScript-logo.png';

const createMockBlob = (logo) => {
    return new Blob([logo], { type: 'image/png' });  // Creas un blob de tipo PNG
  };

// Configurar el servidor MSW para interceptar y mockear las solicitudes HTTP

const handlers = [

    rest.get('liga.json', () => {
        return HttpResponse.json(liga); // Mock de respuesta exitosa
    }),
    rest.get('JavaScript-logo.png', () => {
        const blob = createMockBlob(logo); // Crear el blob desde la imagen importada
        return HttpResponse(blob,{headers: {
            'Content-Type': 'image/png'
        }})
      }),
    rest.get('http://dominioquenoexiste.noexiste/liga.json', () => {
        return HttpResponse.error(); // Mock de error de red
    }),
    rest.get('noexiste.json', () => {
        return HttpResponse('Error en el servidor', { status: 500 });  // Mock de error en servidor
    }),
    rest.get('jsonMalo.json', () => {
        return HttpResponse.text('This is not valid JSON'); // Mock de JSON malo
    }),
    rest.post('http://localhost/fakeServer', async ({ request, params, cookies })=>{
         //console.log(await request.formData());
        const data = await request.formData()
        return HttpResponse.json({login: data.get("login"), password: data.get('password')})
    }),
    rest.post('http://localhost/fakeServerJSON', async ({ request, params, cookies })=>{
        //console.log(await request.formData());
       const data = await request.json()
       return HttpResponse.json({login: data.login, password: data.password})
   })
  ]

const server = setupServer(...handlers);


describe('Comunicación con el servidor', function () {
    // Activar el servidor antes de las pruebas
    beforeAll(() => server.listen());
    // Apagar el servidor después de las pruebas
    afterAll(() => server.close());

    describe('getData', function () {
        test('getData debe retornar una Promesa válida', function () {
            let promise = http.getData('liga.json');
            expect(promise).toBeInstanceOf(Promise);
        });
        
        
        test('getData debe retornar un Array si la promesa se resuelve correctamente', async function () {
            let promise = http.getData('liga.json');
            let data = await promise;
            expect(data).toBeInstanceOf(Array);
        });
        
        
        test('getData debe retornar un error de red cuando no puede conectarse', async function () {
            let promiseErrorRed = http.getData('http://dominioquenoexiste.noexiste/liga.json');
            await expect(promiseErrorRed).rejects.toThrow("Error de red");
        
        });
       
        
        
        test('getData debe manejar un error del servidor', async function () {
            let promiseErrorServidor = http.getData('noexiste.json');      
            await expect(promiseErrorServidor).rejects.toThrow("Error en el servidor");
        });
        
        
        test('getData debe manejar errores en la estructura JSON', async function () {
            let promiseErrorJSON = http.getData('jsonMalo.json');
            await expect(promiseErrorJSON).rejects.toThrow("El JSON no es correcto");
        });
    });

        describe('getDataCache', () => {

            test('debe retornar una Promesa válida al obtener datos del servidor', () => {
                let getLiga = http.getDataCache('liga.json');
                let promise = getLiga();
                expect(promise).toBeInstanceOf(Promise);
            });
        
            test('debe retornar un Array al resolver la Promesa obtenida del servidor', async () => {
                let getLiga = http.getDataCache('liga.json');
                let promise = getLiga();
                let data = await promise;
                expect(data).toBeInstanceOf(Array);
            });
        
            test('debe llamar a fetch al obtener datos del servidor', async () => {
                const spyFetch = vi.spyOn(window, 'fetch');
                let getLiga = http.getDataCache('liga.json');
                let promise = getLiga();
                await promise;
                expect(spyFetch).toHaveBeenCalled();
            });
        
    
            test('debe llamar a fetch solo una vez cuando los datos están en cache', async () => {
                const spyFetch = vi.spyOn(window, 'fetch');
                let getLiga = http.getDataCache('liga.json');
                await getLiga(); // Primera llamada para llenar la cache
                await getLiga(); // Segunda llamada desde la cache
                expect(spyFetch).toHaveBeenCalledTimes(1);
            });
        
        });
        

        describe('getImg', () => {

            beforeAll(() => {
                global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/mock-blob-url');
            });
        
            afterAll(() => {
                delete global.URL.createObjectURL;
            });

            test('debe retornar una Promesa válida', () => {
                const spyFetch = vi.spyOn(window, 'fetch');
                let getLogo = http.getImg('JavaScript-logo.png');
                expect(getLogo).toBeInstanceOf(Promise);
            });
        
            test('debe resolver con una URL de tipo String', async () => {
                let getLogo = http.getImg('JavaScript-logo.png');
                let data = await getLogo;
                expect(typeof data).toBe('string')
            });
        
            test('debe llamar a fetch al obtener la imagen', async () => {
                const spyFetch = vi.spyOn(window, 'fetch');
                await http.getImg('JavaScript-logo.png');
                expect(spyFetch).toHaveBeenCalled();
            });
        
            test('debe retornar una URL de tipo blob válida', async () => {
                let getLogo = http.getImg('JavaScript-logo.png');
                let data = await getLogo;
                const urlRegex = /^blob:http:.*$/;
                expect(data).toMatch(urlRegex);
            });
        
        });
        
    

    describe('Formularios', function () {

        /*
        Estos tests necesitan un servidor web mínimo o falsear las respuestas. 
        En este caso, los datos se envían por POST y alguien debe responder. Cuando nos encontramos en 
        esta situación, se denominan tests de integración. 
        Hay varias maneras de enfocarlos. 
        Podemos interceptar el fetch y hacer que retorne datos falsos.
        También podemos implementar un servidor web mínimo con nodejs. 
        La mejor opción puede ser usar msw para interceptar i mockear los datos 

        Veremos ejemplos sin msw y con msw. 
        */
        test('sendForm debe enviar por post datos a un servidor (Mocks manuales con spy)', async function () {

            let formExample = document.createElement('form');
            formExample.innerHTML = `<form>
            <label for="login">Login:</label>
            <input type="text" id="login" name="login" value="usuario">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value="1234">
            <button type="submit">Iniciar sesión</button>
          </form>`;
            const opciones = { method: 'POST', body: new FormData(formExample) }
            // En este primer test vamos a falsear el resultado. 
            // Creamos una response valida

            // Esta opción la dejaremos comentada por si puede ser útil
            /* const okResponse = new Response(JSON.stringify({name: "usuario", password: "1234"}), {
               status: 200,
               statusText: 'OK',
             });*/
            //const spyFetch = spyOn(window, 'fetch').and.returnValue(Promise.resolve(okResponse));

            const spyFetch = vi.spyOn(window, 'fetch').mockImplementation((url, options) => {
               // console.log(options.body);
                return Promise.resolve(
                    new Response(JSON.stringify({ name: options.body.get('login'), password: options.body.get('password') }), {
                        status: 200,
                        statusText: 'OK',
                    })
                )
            });
            let postForm = http.sendForm(formExample, 'http://localhost/fakeServer');

            expect(postForm).toBeInstanceOf(Promise);
            let data = await postForm;
            expect(typeof data).toBe('string')
            expect(data).toBe(`{"name":"usuario","password":"1234"}`);
            expect(spyFetch).toHaveBeenCalled();
            // En este caso, comprobamos que se han enviado bien los datos. 
            expect(spyFetch).toHaveBeenCalledWith('http://localhost/fakeServer', opciones);

            const functionCode = http.sendForm.toString();
            expect(functionCode).toContain('FormData');
            spyFetch.mockRestore();
        });


        test('sendFormJSON debe enviar por post datos a un servidor  (Mocks manuales con spy)', async function () {

            let formExample = document.createElement('form');
            formExample.innerHTML = `<form>
            <label for="login">Login:</label>
            <input type="text" id="login" name="login" value="usuario">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value="1234">
            <button type="submit">Iniciar sesión</button>
          </form>`;
            // En este test, al envir JSON hay que especificar el content type y el body se envía en string
            const opciones = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: '{"login":"usuario","password":"1234"}'
            }

            const spyFetch = vi.spyOn(window, 'fetch').mockImplementation((url, options) => {
                let optionsBody = JSON.parse(options.body);
                return Promise.resolve(
                    new Response(JSON.stringify({ name: optionsBody.login, password: optionsBody.password }), {
                        status: 200,
                        statusText: 'OK',
                    })
                )
            });
            let postForm = http.sendFormJSON(formExample, 'http://localhost/fakeServer');

            expect(postForm).toBeInstanceOf(Promise);
            let data = await postForm;
            expect(data).toBeInstanceOf(Object);
            expect(data).toEqual({ "name": "usuario", "password": "1234" });
            expect(spyFetch).toHaveBeenCalled();
            // En este caso, comprobamos que se han enviado bien los datos. 
            expect(spyFetch).toHaveBeenCalledWith('http://localhost/fakeServer', opciones);

            const functionCode = http.sendForm.toString();
            expect(functionCode).toContain('FormData');
            spyFetch.mockRestore();
        });
        test('(Mocks con msw) sendForm debe enviar por post datos a un servidor ', async function () {
            let formExample = document.createElement('form');
            formExample.innerHTML = `<form>
            <label for="login">Login:</label>
            <input type="text" id="login" name="login" value="usuario">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value="1234">
            <button type="submit">Iniciar sesión</button>
          </form>`;
            const opciones = { method: 'POST', body: new FormData(formExample) }
            
            let postForm = http.sendForm(formExample, 'http://localhost/fakeServer');

            expect(postForm).toBeInstanceOf(Promise);
            let data = await postForm;
            expect(typeof data).toBe('string')
            expect(data).toBe(`{"login":"usuario","password":"1234"}`);
            
            const functionCode = http.sendForm.toString();
            expect(functionCode).toContain('FormData');
        });


        test('(Mocks manuales con spy) sendFormJSON debe enviar por post datos a un servidor  ', async function () {

            let formExample = document.createElement('form');
            formExample.innerHTML = `<form>
            <label for="login">Login:</label>
            <input type="text" id="login" name="login" value="usuario">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value="1234">
            <button type="submit">Iniciar sesión</button>
          </form>`;
            // En este test, al envir JSON hay que especificar el content type y el body se envía en string
            const opciones = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: '{"login":"usuario","password":"1234"}'
            }

           
            let postForm = http.sendFormJSON(formExample, 'http://localhost/fakeServerJSON');
            expect(postForm).toBeInstanceOf(Promise);
            let data = await postForm;
            expect(data).toBeInstanceOf(Object);
            expect(data).toEqual({ "login": "usuario", "password": "1234" });
            const functionCode = http.sendForm.toString();
            expect(functionCode).toContain('FormData');
         
        });
    });

    describe('Varios', function () {

        test('generateURL retorna una URL segura', () => {
            expect(http.generateURL('foo/cities', [["country", "Spain"], ["province", "València"]]))
                .toBe('foo/cities?country=Spain&province=Val%C3%A8ncia');
            expect(http.generateURL('foo', [["country", "Saint Vincent & the Grenadines"], ["province", "Parish of Saint Patrick"]]))
                .toBe('foo?country=Saint+Vincent+%26+the+Grenadines&province=Parish+of+Saint+Patrick');
        })
    });

});