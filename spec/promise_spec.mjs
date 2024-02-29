import { delayedFunction, delayPromiseFunction, promisify, rejectify, headsOrTailsPromise,
  fakeNetwork, getMultipleData, getMultipleDataPromises, getMultipleDataSequential,
  getMultipleDataTimeoutCancellable, functionDebounce
} from "../src/promesas.js";

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
      expect(promise).toBeInstanceOf(Promise)
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
  describe('Simular la red', function () {
    it('fakeNetwork debe retornar de simular una conexión a la red', async function () {
      let promise = fakeNetwork('http://...');
      expect(promise).toBeInstanceOf(Promise)
      try{
        let message = await promise;
        expect(message).toBe("http://...");
      } catch (error){
        expect(error).toBe("http://...");
      }
     
    });

    it('getMultipleData debe retornar la promesa de un array de resultados', async function () {
      let promise = getMultipleData(['1','2','3','4','5']);
      expect(promise).toBeInstanceOf(Promise)
      let message = await promise
        expect(message.length).toBe(5);
        expect(['1',null]).toContain(message[0]);
        expect(['2',null]).toContain(message[1]);
    });

    it('getMultipleDataPromises debe retornar un array de promesas de resultados', async function () {
      let promiseArray = getMultipleDataPromises(['1','2','3','4','5']);
      expect(promiseArray).toBeInstanceOf(Array);
      expect(promiseArray.every(p => p instanceof Promise)).toBe(true);
      let message = await Promise.all(promiseArray)
      expect(message.length).toBe(5);
      expect(['1',null]).toContain(message[0]);
      expect(['2',null]).toContain(message[1]);
    });

    it('getMultipleDataSequential debe retornar la promesa de ejecutar el callback', async function () {
      let arrayAux = [];
      window.addArray = function addArray(n){arrayAux.push(n)}
      let callback = spyOn(window,'addArray').and.callThrough();
      let promise = getMultipleDataSequential(['1','2','3','4','5','6'],addArray);
      expect(promise).toBeInstanceOf(Promise);
      await promise;
      // Se ha llamado al callback
      expect(callback).toHaveBeenCalled();
      expect(arrayAux).toEqual(['1','2','3','4','5','6']);
    });

    it('getMultipleDataTimeoutCancellable debe retornar la promesa de ejecutar el callback en un tiempo máximo', async function () {
      let arrayAux = [];
      window.addArray = function addArray(n){arrayAux.push(n)}
      let callback = spyOn(window,'addArray').and.callThrough();
      let promise = getMultipleDataTimeoutCancellable(['1','2','3','4','5','6'],addArray,800);
      expect(promise).toBeInstanceOf(Promise);
      try {
      await promise;
      // Se ha llamado al callback
      
      expect(arrayAux).toEqual(['1','2','3','4','5','6']);
      expect(callback).toHaveBeenCalled();
      } catch (error) {
        expect(typeof(error)).toBe('number');
        expect(callback).not.toHaveBeenCalled();
      }
    });

    it('functionDebounce ejecutar la función en un tiempo o ser cancelado si llega otra antes', async function () {
      let arrayAux = [];
      window.addArray = function addArray(n){arrayAux.push(n)}
      let callback = spyOn(window,'addArray').and.callThrough();
      let addArrayDebounced = functionDebounce(window.addArray,400);
      let arrayPromises = [];
      arrayPromises[0] = addArrayDebounced(1)
      arrayPromises[1] = new Promise((resolve,reject)=>{
        setTimeout(()=>{addArrayDebounced(2).then(resolve).catch(reject)},200);
      });
      arrayPromises[2] = new Promise((resolve,reject)=>{
        setTimeout(()=>{addArrayDebounced(3).then(resolve).catch(reject)},300);
      });
      arrayPromises[3] = new Promise((resolve,reject)=>{
        setTimeout(()=>{addArrayDebounced(4).then(resolve).catch(reject)},800);
      });

      let values = await Promise.allSettled(arrayPromises)
      expect(values[0].status).toBe('rejected');
      expect(values[1].status).toBe('rejected');
      expect(values[2].status).toBe('fulfilled');
      expect(values[3].status).toBe('fulfilled');
      expect(arrayAux).toEqual([3,4]);

     
    });

  });
});