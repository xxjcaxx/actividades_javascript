import {describe, expect, test, it } from "vitest";

import {
  createArraySomeTypes,
  convert,
  getPrimes,
  min,
  applyFunction,
  multiplicar,
  createMapFunction,
  filterChain,
  sortImmutable,
  oddSort,
  oddTwoFigures,
  getHistogram,
  getWarmHours,
  createClimateDataMatrix,
  createUl,
  climateObject,
  ClimateObject,
  sumSalaries,
  multiplyNumeric,
  ladder,
  randomInteger,
  checkSpam,
  truncate,
  getMaxSubSum,
  filterInPlace,
  sortByAge,
  sortBy,
  shuffle,
  uniq,
  arraysUtils,
} from "../src/javascript_basico.js";

describe("Javascript Básico", function () {
  describe("Variables", function () {
    test("Debe retornar un array elementos de los tipo solicitados", function () {
      expect(createArraySomeTypes().map((element) => typeof element)).toEqual([
        "number",
        "string",
        "boolean",
        "object",
        "object",
        "object",
        "undefined",
        "number",
        "function",
      ]);
      expect(createArraySomeTypes()[3] instanceof Array).toBe(true);
      expect(createArraySomeTypes()[5] === null).toBe(true);
      expect(createArraySomeTypes()[6] === undefined).toBe(true);
      expect(isNaN(createArraySomeTypes(7))).toBe(true);
      expect(createArraySomeTypes()[8] instanceof Function).toBe(true);
    });
    test("Debe retornar  la variable convertida", function () {
      expect(convert(1, "string")).toBe("1");
      expect(convert(1, "number")).toBe(1);
      expect(convert(1, "boolean")).toBe(true);
      expect(convert(1, "array")).toEqual([1]);
      expect(convert(12, "array")).toEqual([12]);
      expect(convert(1, "object")).toEqual({ 1: 1 });
      expect(convert("1", "string")).toBe("1");
      expect(convert("a", "string")).toBe(null);
      expect(convert("1", "number")).toBe(1);
      expect(convert("1", "boolean")).toBe(true);
      expect(convert("12", "array")).toEqual(["1", "2"]);
      expect(convert("12", "object")).toEqual(null);
      expect(convert(["1", 2], "string")).toBe("12");
      expect(convert(["1", 2], "number")).toBe(null);
      expect(convert(["1", 2], "boolean")).toBe(true);
      expect(convert(["1", 2], "array")).toEqual(["1", 2]);
      expect(convert(["1", 2], "object")).toEqual({ 0: "1", 1: 2 });
      expect(convert(true, "string")).toBe("true");
      expect(convert(true, "number")).toBe(null);
      expect(convert(true, "boolean")).toBe(true);
      expect(convert(true, "array")).toEqual([true]);
      expect(convert(true, "object")).toEqual(null);
      expect(convert({ a: 1, b: 2 }, "string")).toBe(`{"a":1,"b":2}`);
      expect(convert({ a: 1, b: 2 }, "number")).toBe(null);
      expect(convert({ a: 1, b: 2 }, "boolean")).toBe(true);
      expect(convert({ a: 1, b: 2 }, "array")).toEqual([["a", 1][("b", 2)]]);
      expect(convert({ a: 1, b: 2 }, "object")).toEqual({ a: 1, b: 2 });
    });
  });

  describe(" Estructuras de control y operadores", function () {
    test("getPrimes retorna los números primos en el rango comprendido entre start y end", function () {
      expect(getPrimes(2, 10)).toEqual([2, 3, 5, 7]);
      expect(getPrimes(10, 2)).toEqual([]);
      expect(getPrimes(8, 10)).toEqual([]);
    });
    test("min, retorna el mínimo de un Array", function () {
      expect(min([2, 3, 4, 10])).toBe(2);
      expect(min([2, 3, 4, "0", 10])).toBe(2);
      expect(min([2, 3, 4, -11, 10])).toBe(-11);
    });
  });

  describe("Funciones", function () {
    test("Debe retornar el resultado de aplicar una función pasada como callback al primer dato", function () {
      expect(applyFunction(1, (n) => n * 2)).toBe(2);
      expect(applyFunction(1, (n) => n * 3)).toBe(3);
      expect(applyFunction(1, (n) => {})).toBe(undefined);
    });
    test("Debe retornar un función que acepte un número y lo multiplique al número que acepta esta función", function () {
      expect(multiplicar(1) instanceof Function).toBe(true);
      expect(multiplicar(2)(3)).toBe(6);
    });
    test("Debe retornar un función que acepte un número y lo multiplique al número que acepta esta función", function () {
      expect(createMapFunction((e) => e * 2) instanceof Function).toBe(true);
      let array = [1, 2, 3, 4, 5, 6];
      let result = createMapFunction((e) => e * 2)(array);
      expect(result).toEqual([2, 4, 6, 8, 10, 12]);
      expect(array).toEqual([1, 2, 3, 4, 5, 6]); // no muta el original
    });
    test("debe retornar una función que aplique filtros secuencialmente", function () {
      const numbers = [1, 2, 3, 4, 5];
      const filterEven = (num) => num % 2 === 0;
      const filterGreaterThanTwo = (num) => num > 2;
      const composedFilter = filterChain([filterEven, filterGreaterThanTwo]);
      const filteredNumbers = composedFilter(numbers);
      expect(filteredNumbers).toEqual([4]);
      const filterFunctions = [() => true, () => false];
      const filter = filterChain(filterFunctions);
      expect(filter instanceof Function).toBe(true);
      expect(numbers).toEqual([1, 2, 3, 4, 5]);
    });
  });
  describe("Arrays y Objetos", function () {
    test("sortImmutable debe ordenar sin modificar el original", function () {
      const numbers = [1, 2, 5, 4, 3];
      const result = sortImmutable(numbers);
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(numbers).toEqual([1, 2, 5, 4, 3]);
    });
    test("oddSort debe retornar sólo los impares y ordenados", function () {
      const numbers = [1, 2, 5, 4, 3, "a"];
      const result = oddSort(numbers);
      expect(result).toEqual([1, 3, 5]);
      expect(numbers).toEqual([1, 2, 5, 4, 3, "a"]);
    });
    test("oddTwofigures debe retornar sólo los impares de dos cifras", function () {
      const numbers = [
        1,
        2,
        5,
        4,
        3,
        22,
        "a",
        "23",
        "32",
        23,
        51,
        5,
        100,
        101,
        "101",
      ];
      const result = oddTwoFigures(numbers);
      expect(result).toEqual([23, 51]);
      expect(numbers).toEqual([
        1,
        2,
        5,
        4,
        3,
        22,
        "a",
        "23",
        "32",
        23,
        51,
        5,
        100,
        101,
        "101",
      ]);
    });

    test("sortByAge debe retornar una copia ordenada por edad del array", function () {
      const people = [
        { name: "John", age: 25 },
        { name: "Pete", age: 30 },
        { name: "Mary", age: 28 },
      ];
      const sortedPeople = sortByAge(people);
      expect(sortedPeople.map((p) => p.age)).toEqual([25, 28, 30]);
      expect(people.map((p) => p.age)).toEqual([25, 30, 28]);
     
    });

    test("sortBy debe retornar una copia ordenada por el atributo del array", function () {
      const people = [
        { name: "John", age: 25 },
        { name: "Pete", age: 30 },
        { name: "Mary", age: 28 },
      ];
      const sortedPeople = sortBy(people, "age");
      expect(sortedPeople.map((p) => p.age)).toEqual([25, 28, 30]);
      expect(people.map((p) => p.age)).toEqual([25, 30, 28]);
     
      const sortedByName = sortBy(people, "name");
      expect(sortedByName.map((p) => p.name)).toEqual(["John", "Mary", "Pete"]);
      expect(people.map((p) => p.age)).toEqual([25, 30, 28]);
      
      const sortedByNonKey = sortBy(people, "foo");
      expect(sortedByNonKey.map((p) => p.name)).toEqual([
        "John",
        "Pete",
        "Mary",
      ]);
      expect(people != sortedByNonKey).toEqual(true);
      
    });

    test("getHistogram Debe retornar un array de 100 elementos con la frecuencia de los números", function () {
      const numbers = [1, 2, 5, 4, 3, 5, 5, 1, 0, 98, 98];
      const result = getHistogram(numbers);
      const expectedResult = [1, 2, 1, 1, 1, 3, ...Array(94).fill(0)];
      expectedResult[98] = 2;
      expect(result).toEqual(expectedResult);
      expect(numbers).toEqual([1, 2, 5, 4, 3, 5, 5, 1, 0, 98, 98]);
    });

    test("getWarmHours debe retornar las horas con temperatura superior al threshold", function () {
      const climateData = [
        [
          { t: 20, h: 50 },
          { t: 22, h: 48 },
          { t: 24, h: 52 },
        ],
        [
          { t: 22, h: 51 },
          { t: 24, h: 50 },
          { t: 23, h: 53 },
        ],
        // ... más filas ...
      ];

      const temperatureThreshold = 23;

      const result = getWarmHours(climateData, temperatureThreshold);

      // Verificar que la función devuelve un array
      expect(Array.isArray(result)).toBe(true);

      // Verificar que cada elemento en el array es un objeto con las propiedades correctas
          expect(result).toEqual([
          { time: { day: 2, hour: 0 }, t: 24, h: 52 },
          { time: { day: 1, hour: 1 }, t: 24, h: 50 }
          ])
    });

    });

    test("createClimateDataMatrix debe retornar las horas con temperatura superior al threshold", function () {
      const climateData = [
        [
          { time: { day: 2, hour: 10 }, t: 20, h: 50 },
          { time: { day: 2, hour: 11 }, t: 22, h: 48 },
          { time: { day: 2, hour: 12 }, t: 24, h: 52 },
        ],
        // ... más filas ...
      ];

      const result = createClimateDataMatrix(climateData);

      // Verificar que la función devuelve un array bidimensional
      expect(Array.isArray(result)).toBe(true);
      expect(result.every((r) => Array.isArray(r))).toBe(true);

      // Verificar que cada elemento en el array es un objeto con las propiedades correctas
      expect(result[1][10]).toEqual({ t: 20, h: 50 });
      expect(result[1][11]).toEqual({ t: 22, h: 48 });
      expect(result[1][12]).toEqual({ t: 24, h: 52 });
    });

    test("createUl Debe retornar un ul a partir del array", function () {
      const list = ["hola", "mundo"];
      const result = createUl(list);
      const expectedResult = "<ul><li>hola</li><li>mundo</li></ul>";
      expect(result).toEqual(expectedResult);
    });

    test("getMaxSubSum Debe retornar el array de suma máxima", function () {
      expect(getMaxSubSum([-1, 2, 3, -9])).toEqual([2, 3]);
      expect(getMaxSubSum([2, -1, 2, 3, -9])).toEqual([2, -1, 2, 3]);
      expect(getMaxSubSum([-1, 2, 3, -9, 11])).toEqual([11]);
      expect(getMaxSubSum([1, 2, 3])).toEqual([1, 2, 3]);
      expect(getMaxSubSum([-1, -2, -3])).toEqual([]);
    });

    test("filterInPlace Debe retornar el array mutado y mutar el original", function () {
      let original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const filterCallback = (e) => e % 2 === 0;
      let result = filterInPlace(original, filterCallback);
      console.log(result, original);
      expect(result).toEqual([2, 4, 6, 8, 10]);
      expect(result).toEqual(original);
      expect(result).toBe(original);
    });

    test("climateObject.getTemperatureFahrenhetest() Debe retornar la temperatura correctamente", function () {
      expect(climateObject.getTemperatureFahrenhetest()).toBe(68);
    });

    test("ClimateObject.getTemperatureFahrenhetest() Debe retornar la temperatura correctamente", function () {
      let climateObjectTest = new ClimateObject(20, 45);
      expect(climateObjectTest.getTemperatureFahrenhetest()).toBe(68);
      expect(climateObjectTest.hasOwnProperty("getTemperatureFahrenheit")).toBe(
        false
      );
     
    });

    test("sumSalaries Debe retornar la suma de los salarios", function () {
      expect(
        sumSalaries({
          Juan: 100,
          Ana: 160,
          Pedro: 130,
        })
      ).toBe(390);
      expect(sumSalaries({})).toBe(0);
    });

    test("multiplyNumeric Debe retornar los atributos numéricos multiplicados por n", function () {
      const originalObject = {
        Juan: 100,
        Ana: 160,
        Pedro: 130,
        dates: ["01/02/2023", "02/02/2023"],
      };
      const expectedMultipliedObject = {
        Juan: 200,
        Ana: 320,
        Pedro: 260,
        dates: ["01/02/2023", "02/02/2023"],
      };
      const result = multiplyNumeric(originalObject, 2);
      expect(result).toEqual(expectedMultipliedObject);
      result.dates[3] = "foo";
      expect(originalObject.dates[3]).toBe(undefined);
    });

    test("ladder debe permitir llamadas encadenadas", function () {
      expect(ladder.down().up().down().up().up().getStep()).toBe(1);
    });
  });

  describe("Misc", function () {
    test("randomInteger debe obtener un número entero aleatorio entre min y max con la misma probabilidad", function () {
      const generatedNumbers = Array(1000)
        .fill(0)
        .map(() => randomInteger(1, 10));
      expect(generatedNumbers.every((n) => n > 0 && n <= 10)).toBe(true);
      // Puede que este test falle por la probabilidad.
      expect(generatedNumbers.filter((n) => n === 1).length > 70).toBe(true);
      expect(generatedNumbers.filter((n) => n === 10).length > 70).toBe(true);
    });
    test("checkSpam debe indicar si hay palabras de spam", function () {
      const spamWords = ["viagra", "porn", "xxx", "criptocurrency"];
      expect(checkSpam("Buy Viagra!", spamWords)).toBe(true);
      expect(checkSpam("Porn Free", spamWords)).toBe(true);
      expect(checkSpam("XXXXX", spamWords)).toBe(true);
      expect(checkSpam("Buy Criptocurrency!", spamWords)).toBe(true);
      expect(checkSpam("Hello World", spamWords)).toBe(false);
    });
    test("truncate debe truncar y añadir ...", function () {
      expect(truncate("Hello World", 100)).toBe("Hello World");
      expect(truncate("Hello World", 2)).toBe("He...");
      expect(truncate("Hello World", 4)).toBe("Hell...");
    });
    test("camelize debe transformar en camelCase", function () {
      expect(camelize("background-color")).toBe("backgroundColor");
      expect(truncate("list-style-image")).toBe("listStyleImage");
      expect(truncate("-webkit-transition")).toBe("WebkitTransition");
    });
    test("shuffle debe ordenar de forma aleatoria con la misma distribución", function () {
      const array = [1, 2, 3];
      const shuffled = shuffle(array);
      expect(shuffled.length).toBe(3);
      expect(shuffled instanceof Array).toBe(true);
      expect(shuffled === array).toBe(false);
      let count = {
        123: 0,
        132: 0,
        213: 0,
        231: 0,
        321: 0,
        312: 0,
      };
      for (let i = 0; i < 1000000; i++) {
        let shuffled = shuffle(array);
        count[shuffled.join("")]++;
      }
      let counts = Object.values(count);
      //console.log(counts);
      // Puede fallar con muy poca probabilidad.
      expect(counts.every((c) => c > 160000 && c < 170000)).toBe(true);
    });
    test("uniq debe retornar un array sin repetidos", function () {
      const array = [1, 2, 3, 3, 4, 5, 6, 5];
      const uniques = uniq(array);
      expect(uniques).toEqual([1, 2, 3, 4, 5, 6]);
      expect(array).toEqual([1, 2, 3, 3, 4, 5, 6, 5]);
    });
  });

  describe("ArrayUtils", function () {
    test("findAndRemove debe eliminar en el array original los elementos de el array values", function () {
      const array = [1, 2, 3, 3, 4, 5, 6, 5, "a", "b"];
      const result = arraysUtils.findAndRemove(array, [2, 5, "b"]);
      expect(result).toEqual([1, 3, 3, 4, 6, "a"]);
      expect(array).toEqual([1, 2, 3, 3, 4, 5, 6, 5, "a", "b"]); // immutable
      expect(arraysUtils.findAndRemove(array)).toEqual([
        1,
        2,
        3,
        3,
        4,
        5,
        6,
        5,
        "a",
        "b",
      ]); // invocada sin "values"
      expect(arraysUtils.findAndRemove(3, [1, 2])).toEqual(3); // invocada mal, 3 no es un array
      let findAndRemoveCode = arraysUtils.findAndRemove.toString();
      expect(findAndRemoveCode.includes("splice")).toBe(true);
    });

    test("toBinary debe transformar a binario un array de bytes", function () {
      const array = [1, -2, "a"];
      const result = arraysUtils.toBinary(array);
      expect(result).toEqual([
        0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1,
      ]);
      expect(array).toEqual([1, -2, "a"]); // immutable
      let code = arraysUtils.toBinary.toString();
      expect(code.includes("flatMap")).toBe(true);
      expect(() => {
        arraysUtils.toBinary([1, "ab"]);
      }).toThrowError("Error: Data cannot be converted to 8 bits.");
      expect(() => {
        arraysUtils.toBinary([1, 1000]);
      }).toThrowError("Error: Data cannot be converted to 8 bits.");
    });

    test("and debe hacer la operación AND", function () {
      const array = [1, -2, "a", [3, 4], { a: 5 }, 6, 7, 8, 9];
      const mask = [1, "b", 0, false, undefined, NaN, null, -1];

      const result = arraysUtils.and(array, mask);
      expect(result).toEqual([
        1,
        -2,
        false,
        false,
        false,
        false,
        false,
        8,
        false,
      ]);
      expect(() => {
        arraysUtils.and([1, "ab"]);
      }).toThrowError("Error: No mask provided.");
      expect(() => {
        arraysUtils.and([1],2);
      }).toThrowError("Error: No arrays provided.");
      expect(() => {
        arraysUtils.and(1,2);
      }).toThrowError("Error: No arrays provided.");
    });
    test("or debe hacer la operación OR", function () {
      const arrayA = [1, -2, 0, [3, 4], { a: 5 }, 6, 7, 8, undefined];
      const arrayB = [1, "b", 0, false, undefined, NaN, null, -1, -2, -3];

      const result = arraysUtils.or(arrayA, arrayB);
      expect(result).toEqual([
        1,
        -2,
        false,
        [3, 4],
        { a: 5 },
        6,
        7,
        8,
        -2,
        -3,
      ]);
      expect(() => {
        arraysUtils.and([1, "ab"]);
      }).toThrowError("Error: No mask provided.");
      expect(() => {
        arraysUtils.and([1],2);
      }).toThrowError("Error: No arrays provided.");
      expect(() => {
        arraysUtils.and(1,2);
      }).toThrowError("Error: No arrays provided.");
    });
    test("xor debe hacer la operación OR", function () {
      const arrayA = [1, -2, 0, [3, 4], { a: 5 }, 6, 7, 8, undefined];
      const arrayB = [1, "b", 0, false, undefined, NaN, null, -1, -2, -3];

      const result = arraysUtils.xor(arrayA, arrayB);
      expect(result).toEqual([
        false,
        false,
        false,
        [3, 4],
        { a: 5 },
        6,
        7,
        false,
        -2,
        -3,
      ]);
      expect(() => {
        arraysUtils.and([1, "ab"]);
      }).toThrowError("Error: No mask provided.");
      expect(() => {
        arraysUtils.and([1],2);
      }).toThrowError("Error: No arrays provided.");
      expect(() => {
        arraysUtils.and(1,2);
      }).toThrowError("Error: No arrays provided.");
    });
    test("intersection debe retornar la intersección de dos arrays", function () {
      let array8 = [8];
      const arrayA = [1,2,3,[4,5],{a:6},2,7,array8,array8];
      const arrayB = [0,3,3,[4,5],{b:6},2,2,array8,array8];

      const result = arraysUtils.intersection(arrayA, arrayB);
      expect(result).toEqual([2,3,2,[8],[8]]);
      expect(() => {
        arraysUtils.and([1, "ab"]);
      }).toThrowError("Error: No arrays provided.");
      expect(() => {
        arraysUtils.and([1],2);
      }).toThrowError("Error: No arrays provided.");
      expect(() => {
        arraysUtils.and(1,2);
      }).toThrowError("Error: No arrays provided.");
      let code = arraysUtils.intersection.toString();
      expect(code.includes("Map")).toBe(true);
    });
  });

 
