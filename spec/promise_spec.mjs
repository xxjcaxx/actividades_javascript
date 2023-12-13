import { delayedFunction, delayPromiseFunction, promisify, rejectify, headsOrTailsPromise } from "../src/promesas.js";

describe('Promesas', function () {
  describe('Callbacks', function () {
    let callback, errorSpy;
    beforeEach(() => {
      // Crear spy para callback 
      callback = jasmine.createSpy('callback');
      errorSpy = jasmine.createSpy('errorSpy');
      jasmine.clock().install();
    });
    afterEach(() => {
      // Desinstalar el reloj de Jasmine después de cada prueba
      jasmine.clock().uninstall();
    });


    it('delayedFunction Debería ejecutar una función pasado un tiempo', function () {
      delayedFunction(callback, 100);
      expect(callback.calls.count()).toBe(0);
      jasmine.clock().tick(200);
      expect(callback).toHaveBeenCalled();
    });

    it('delayPromiseFunction Debería ejecutar una función pasado un tiempo y retornar una promesa', function () {
      let promise = delayPromiseFunction(callback, 100);
      expect(promise instanceof Promise).toBe(true);
      expect(callback.calls.count()).toBe(0);
      jasmine.clock().tick(200);
      expect(callback).toHaveBeenCalled();
    });

    it('promisify debe retornar la promesa de retornar un valor ', function () {
      let promise = promisify(100);
      expect(promise instanceof Promise).toBe(true);
      promise.then((value) => expect(value).toBe(100));
    });

    it('rejectify debe retornar la promesa de fallar con un error', function () {
      let promise = rejectify(100);
      expect(promise instanceof Promise).toBe(true);
      promise.then(callback).catch(e => expect(e).toBe(100));
      jasmine.clock().tick(10);
      expect(callback).not.toHaveBeenCalled();
    });

    it('headsOrTailsPromise debe retornar la promesa de lanzar una moneda', function () {
      let promise = headsOrTailsPromise(callback, errorSpy);
      expect(promise instanceof Promise).toBe(true);
      promise.then((message) => {
        expect(callback).toHaveBeenCalled();
        expect(message).toBe("Head");
      })
        .catch((message) => {
          expect(errorSpy).toHaveBeenCalled();
          expect(message).toBe("Tail");
        })
    });
  });
});