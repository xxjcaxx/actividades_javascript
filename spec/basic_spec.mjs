import { createArraySomeTypes , convert, applyFunction, 
  multiplicar, createMapFunction, filterChain, sortImmutable, oddSort,
  oddTwoFigures, getHistogram, getWarmHours, createClimateDataMatrix, createUl,
  climateObject, ClimateObject
} from "../src/javascript_basico.js";


describe('Javascript Básico', function() {
    describe('Variables', function() {
      it('Debe retornar un array elementos de los tipo solicitados', function() {
        expect(createArraySomeTypes().map(element => typeof(element))).toEqual([
          "number","string","boolean","object","object","object","undefined","number","function"
        ]);
        expect(createArraySomeTypes()[3] instanceof Array).toBe(true);
        expect(createArraySomeTypes()[5] === null).toBe(true);
        expect(createArraySomeTypes()[6] === undefined).toBe(true);
        expect(isNaN(createArraySomeTypes(7))).toBe(true);
        expect(createArraySomeTypes()[8] instanceof Function).toBe(true);
      });
      it('Debe retornar  la variable convertida', function() {
        expect(convert(1,"string")).toBe("1");
        expect(convert(1,"number")).toBe(1);
        expect(convert(1,"boolean")).toBe(true);
        expect(convert(1,"array")).toEqual([1]);
        expect(convert(12,"array")).toEqual([12]);
        expect(convert(1,"object")).toEqual({1:1});
        expect(convert("1","string")).toBe("1");
        expect(convert("a","string")).toBe(null);
        expect(convert("1","number")).toBe(1);
        expect(convert("1","boolean")).toBe(true);
        expect(convert("12","array")).toEqual(["1","2"]);
        expect(convert("12","object")).toEqual(null);
        expect(convert(["1",2],"string")).toBe("12");
        expect(convert(["1",2],"number")).toBe(null);
        expect(convert(["1",2],"boolean")).toBe(true);
        expect(convert(["1",2],"array")).toEqual(["1",2]);
        expect(convert(["1",2],"object")).toEqual({0: "1", 1: 2});
        expect(convert(true,"string")).toBe("true");
        expect(convert(true,"number")).toBe(null);
        expect(convert(true,"boolean")).toBe(true);
        expect(convert(true,"array")).toEqual([true]);
        expect(convert(true,"object")).toEqual(null);
        expect(convert({a:1,b:2},"string")).toBe(`{"a":1,"b":2}`);
        expect(convert({a:1,b:2},"number")).toBe(null);
        expect(convert({a:1,b:2},"boolean")).toBe(true);
        expect(convert({a:1,b:2},"array")).toEqual([["a",1]["b",2]]);
        expect(convert({a:1,b:2},"object")).toEqual({a:1,b:2});
      });
    });
    describe('Funciones', function() {
      it('Debe retornar el resultado de aplicar una función pasada como callback al primer dato', function() {
        expect(applyFunction(1, (n) => n*2)).toBe(2);
        expect(applyFunction(1, (n) => n*3)).toBe(3);
        expect(applyFunction(1, (n) => {})).toBe(undefined);      
      });
      it('Debe retornar un función que acepte un número y lo multiplique al número que acepta esta función', function() {
        expect(multiplicar(1) instanceof Function).toBe(true);
        expect(multiplicar(2)(3)).toBe(6);   
      });
      it('Debe retornar un función que acepte un número y lo multiplique al número que acepta esta función', function() {
        expect(createMapFunction((e) => e*2) instanceof Function).toBe(true);
        let array = [1,2,3,4,5,6];
        let result = createMapFunction((e) => e*2)(array);
        expect(result).toEqual([2,4,6,8,10,12]);
        expect(array).toEqual([1,2,3,4,5,6]); // no muta el original
      });
      it('debe retornar una función que aplique filtros secuencialmente', function () {
        const numbers = [1, 2, 3, 4, 5];
        const filterEven = num => num % 2 === 0;
        const filterGreaterThanTwo = num => num > 2;
        const composedFilter = filterChain([filterEven, filterGreaterThanTwo]);
        const filteredNumbers = composedFilter(numbers);
        expect(filteredNumbers).toEqual([4]);
        const filterFunctions = [() => true, () => false];
        const filter = filterChain(filterFunctions);
        expect(filter instanceof Function).toBe(true);
        expect(numbers).toEqual([1, 2, 3, 4, 5]);
      });
      
    });
    describe('Arrays y Objetos', function() {
      it('sortImmutable debe ordenar sin modificar el original', function () {
        const numbers = [1, 2, 5, 4, 3];
        const result = sortImmutable(numbers);
        expect(result).toEqual([1,2,3,4,5]);
        expect(numbers).toEqual([1,2,5,4,3]);
      });
      it('oddSort debe retornar sólo los impares y ordenados', function () {
        const numbers = [1, 2, 5, 4, 3, "a"];
        const result = oddSort(numbers);
        expect(result).toEqual([1,3,5]);
        expect(numbers).toEqual([1,2,5,4,3,"a"]);
      });
      it('oddTwofigures debe retornar sólo los impares de dos cifras', function () {
        const numbers = [1, 2, 5, 4, 3, 22, "a", "23", "32", 23, 51, 5, 100, 101, "101"];
        const result = oddTwoFigures(numbers);
        expect(result).toEqual([23,51]);
        expect(numbers).toEqual([1, 2, 5, 4, 3, 22, "a", "23", "32", 23, 51, 5, 100, 101, "101"]);
      });
      it('getHistogram Debe retornar un array de 100 elementos con la frecuencia de los números', function () {
        const numbers = [1, 2, 5, 4, 3, 5, 5, 1, 0, 98, 98];
        const result = getHistogram(numbers);
        const expectedResult = [1,2,1,1,1,3,...Array(94).fill(0)];
        expectedResult[98] = 2;
        expect(result).toEqual(expectedResult);
        expect(numbers).toEqual([1, 2, 5, 4, 3, 5, 5, 1, 0, 98, 98]);
      });

      it('getWarmHours debe retornar las horas con temperatura superior al threshold', function () {
        const climateData = [
          [{ t: 20, h: 50 }, { t: 22, h: 48 }, { t: 24, h: 52 }],
          [{ t: 22, h: 51 }, { t: 24, h: 50 }, { t: 23, h: 53 }],
          // ... más filas ...
        ];
    
        const temperatureThreshold = 23;
    
        const result = getWarmHours(climateData, temperatureThreshold);
    
        // Verificar que la función devuelve un array
        expect(Array.isArray(result)).toBe(true);
    
        // Verificar que cada elemento en el array es un objeto con las propiedades correctas
        result.forEach(data => {
          expect(data).toEqual(jasmine.objectContaining({
            time: jasmine.objectContaining({ day: jasmine.any(Number), hour: jasmine.any(Number) }),
            t: jasmine.any(Number),
            h: jasmine.any(Number)
          }));
          expect(data.t).toBeGreaterThan(temperatureThreshold);
        });
      });
    
      it('createClimateDataMatrix debe retornar las horas con temperatura superior al threshold', function () {
        const climateData = [
          [{time: {day: 2, hour: 10}, t: 20, h: 50 }, {time: {day: 2, hour: 11}, t: 22, h: 48 }, {time: {day: 2, hour: 12}, t: 24, h: 52 }],
          // ... más filas ...
        ];
    
        const result = createClimateDataMatrix(climateData);
    
        // Verificar que la función devuelve un array bidimensional
        expect(Array.isArray(result)).toBe(true);
        expect(result.every(r => Array.isArray(r))).toBe(true);

        // Verificar que cada elemento en el array es un objeto con las propiedades correctas
          expect(result[1][10]).toEqual({ t: 20, h: 50 });
          expect(result[1][11]).toEqual({ t: 22, h: 48 });
          expect(result[1][12]).toEqual({ t: 24, h: 52 });
          
      });
    

      it('createUl Debe retornar un ul a partir del array', function () {
        const list = ["hola","mundo"];
        const result = createUl(list);
        const expectedResult = "<ul><li>hola</li><li>mundo</li></ul>";
        expect(result).toEqual(expectedResult);
      });

      it('climateObject.getTemperatureFahrenheit() Debe retornar la temperatura correctamente', function () {
        expect(climateObject.getTemperatureFahrenheit()).toBe(68);
      });

      it('ClimateObject.getTemperatureFahrenheit() Debe retornar la temperatura correctamente', function () {
        let climateObjectTest = new ClimateObject(20,45);      
        expect(climateObjectTest.getTemperatureFahrenheit()).toBe(68);
        expect(climateObjectTest.hasOwnProperty('getTemperatureFahrenheit')).toBe(false);
        expect(climateObjectTest).toEqual(jasmine.objectContaining({
          t: jasmine.any(Number),
          h: jasmine.any(Number)
        }));
      });

    });
   });