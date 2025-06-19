import * as http from '../src/comunicacion_servidor.js'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Comunicación con el servidor', function () {
    describe('fetch', function () {
        /*
        Los tests de fetch, al implicar la necesitada de un servidor, son un poco más complicados
        En los primeros tests de esta suite veremos maneras de testar sin necesidad de un servidor.
        
        El primer test no lo necesita, ya que la propia Jasmine-browser-runner implementa un servidor
        al que podemos pedir por GET.
        */
        it('getData debe obtener los datos o un error', async function () {
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

            let promiseErrorJSON = http.getData('__spec__/src/data/jsonMalo.json')
            expect(promiseErrorJSON).toBeInstanceOf(Promise);
            try {
                let data = await promiseErrorJSON;
                // expect(data).toBeInstanceOf(Array);
            } catch (error) {
                expect(error).toBe("El JSON no es correcto");
            }

        });

        it('getDataCache debe obtener los datos en cache o del servidor', async function () {
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

        it('getImg debe obtener una imagen y retornar la url a un blob', async function () {
            const spyFetch = spyOn(window, 'fetch').and.callThrough();
            let getLogo = http.getImg('__spec__/src/data/JavaScript-logo.png');
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
        Podemos interceptar el fetch y hacer que retorne datos falsos. https://testing-angular.com/faking-dependencies/#faking-dependencies 
        También podemos implementar un servidor web mínimo con nodejs. 
        Si trabajamos con Karma, este nos permite ejecutar el servidor al hacer las pruebas. 
        */
        it('sendForm debe enviar por post datos a un servidor', async function () {

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

            const spyFetch = spyOn(window, 'fetch').and.callFake((url, options) => {
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
            expect(data).toEqual(jasmine.any(String));
            expect(data).toBe(`{"name":"usuario","password":"1234"}`);
            expect(spyFetch).toHaveBeenCalled();
            // En este caso, comprobamos que se han enviado bien los datos. 
            expect(spyFetch).toHaveBeenCalledWith('http://localhost/fakeServer', opciones);

            const functionCode = http.sendForm.toString();
            expect(functionCode).toContain('FormData');
        });


        it('sendFormJSON debe enviar por post datos a un servidor', async function () {

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

            const spyFetch = spyOn(window, 'fetch').and.callFake((url, options) => {
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
            expect(data).toEqual(jasmine.any(Object));
            expect(data).toEqual({"name":"usuario","password":"1234"});
            expect(spyFetch).toHaveBeenCalled();
            // En este caso, comprobamos que se han enviado bien los datos. 
            expect(spyFetch).toHaveBeenCalledWith('http://localhost/fakeServer', opciones);

            const functionCode = http.sendForm.toString();
            expect(functionCode).toContain('FormData');
        });
    });

    describe('Varios', function () {

        it('generateURL retorna una URL segura',()=>{
            expect(http.generateURL('foo/cities',[["country", "Spain"],["province", "València"]]))
                .toBe('foo/cities?country=Spain&province=Val%C3%A8ncia');
            expect(http.generateURL('foo',[["country", "Saint Vincent & the Grenadines"],["province", "Parish of Saint Patrick"]]))
                .toBe('foo?country=Saint+Vincent+%26+the+Grenadines&province=Parish+of+Saint+Patrick');
        })
    });

});