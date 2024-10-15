/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, it, vi, beforeEach, beforeAll, afterAll, afterEach } from "vitest";
import { http as rest } from 'msw';
import { setupServer } from 'msw/node';

import * as http from '../src/comunicacion_servidor.js'

import  liga from '../src/data/liga.json';
import logo from '../src/data/JavaScript-logo.png';

const createMockBlob = (logo) => {
    return new Blob([logo], { type: 'image/png' });  // Creas un blob de tipo PNG
  };
// Configurar el servidor MSW para interceptar y mockear las solicitudes HTTP
const server = setupServer(
    rest.get('liga.json', (req, res, ctx) => {
        return res(ctx.json(liga)); // Mock de respuesta exitosa
    }),
    rest.get('JavaScript-logo.png', (req, res, ctx) => {
        const blob = createMockBlob(logo); // Crear el blob desde la imagen importada
        return res(
          ctx.set('Content-Type', 'image/png'), // Especificar el tipo de contenido
          ctx.body(blob)  // Devolver el blob como respuesta
        );
      }),
    rest.get('http://dominioquenoexiste.noexiste/liga.json', (req, res, ctx) => {
        return res.networkError('Error de red'); // Mock de error de red
    }),
    rest.get('noexiste.json', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Error en el servidor' })); // Mock de error en servidor
    }),
    rest.get('jsonMalo.json', (req, res, ctx) => {
        return res(ctx.body('This is not valid JSON')); // Mock de JSON malo
    })
);

describe('Comunicación con el servidor', function () {
    // Activar el servidor antes de las pruebas
    beforeAll(() => server.listen());
    // Apagar el servidor después de las pruebas
    afterAll(() => server.close());

    describe('fetch', function () {
        test('getData debe obtener los datos o un error', async function () {
            let promise = http.getData('liga.json')
            expect(promise).toBeInstanceOf(Promise);
            try {
                let data = await promise;
                expect(data).toBeInstanceOf(Array);
            } catch (error) {
                console.log(error);
            }
            let promiseErrorRed = http.getData('http://dominioquenoexiste.noexiste/liga.json')
            expect(promiseErrorRed).toBeInstanceOf(Promise);
            try {
                let data = await promiseErrorRed;
            } catch (error) {
                expect(error).toBe("Error de red");
            }
            let promiseErrorServidor = http.getData('noexiste.json')
            expect(promiseErrorServidor).toBeInstanceOf(Promise);
            try {
                let data = await promiseErrorServidor;
            } catch (error) {
                expect(error).toBe("Error en el servidor");
            }

            let promiseErrorJSON = http.getData('jsonMalo.json')
            expect(promiseErrorJSON).toBeInstanceOf(Promise);
            try {
                let data = await promiseErrorJSON;
            } catch (error) {
                expect(error).toBe("El JSON no es correcto");
            }

        });

        test('getDataCache debe obtener los datos en cache o del servidor', async function () {
            const spyFetch = vi.spyOn(window, 'fetch');
            let getLiga = http.getDataCache('liga.json');
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

        test('getImg debe obtener una imagen y retornar la url a un blob', async function () {
            const spyFetch = vi.spyOn(window, 'fetch');
            let getLogo = http.getImg('JavaScript-logo.png');
            expect(getLogo).toBeInstanceOf(Promise);
            let data = await getLogo;
            expect(data).toEqual(jasmine.any(String));
            expect(spyFetch).toHaveBeenCalled();
            const urlRegex = /^blob:http:.*$/;
            expect(data).toMatch(urlRegex);

            let img = document.createElement('img');
            img.src = data;

            let imgLoaded = await new Promise(resolve => {
                img.addEventListener('load', (event) => {
                    resolve(true);
                })
                img.addEventListener('error', (event) => {
                    resolve(false);
                })
            });
            expect(imgLoaded).toBe(true);



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
        Si trabajamos con Karma, este nos permite ejecutar el servidor al hacer las pruebas. 
        */
        test('sendForm debe enviar por post datos a un servidor', async function () {

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
                console.log(options.body);
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


        test('sendFormJSON debe enviar por post datos a un servidor', async function () {

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

            const spyFetch = spyOn(window, 'fetch').mockImplementation((url, options) => {
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