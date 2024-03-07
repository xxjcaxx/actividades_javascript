import {
    student, arbitraryArgs, getMax, getDistance,
    shiftArray, allShiftsArray, allShiftsString, allNames, removeEmpties,
    groupByWeeks, filterTeam, getPoints, applyPermutations, Arithmetic,
    compose, stringToArray, reverseArray, joinArrayToString, reverseString,
    memoize, ensureOneCall, createArray, unFlat,cartesianProduct,innerJoin,leftJoin

} from "../src/javascript_programacion_funcional.js"

// Función auxiliar para descargar datos de localhost
async function getData(url) {
    // Como la vamos a descargar de localhost, suponemos que no va a fallar
    return await (await fetch(url)).json();
}

describe('Programación Funcional', function () {
    describe('Funciones puras', function () {
        it('getAverage debe ser pura', function () {

            let qualifications = [{ subject: "DWEC", grade: 10 }, { subject: "DWES", grade: 9 }];
            let getAverage = student.getAverage;

            let getAverageCode = getAverage.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => getAverageCode.includes(loop))).toBe(false);

            expect(student.getAverage(qualifications)).toBe(9.5);
            expect(getAverage(qualifications)).toBe(9.5);
            expect(student.average).toBe(0);

        });
        it('renderGrades debe ser pura', function () {

            let qualifications = [{ subject: "DWEC", grade: 10 }, { subject: "DWES", grade: 9 }];
            let renderGrades = student.renderGrades;

            let renderGradesCode = renderGrades.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => renderGradesCode.includes(loop))).toBe(false);

            expect(student.renderGrades(qualifications)).toBeInstanceOf(Element);
            expect(renderGrades(qualifications)).toBeInstanceOf(Element)
            expect(renderGrades(qualifications).tagName).toBe('DIV');
            expect(renderGrades(qualifications).firstElementChild.tagName).toBe('UL');
            expect(renderGrades(qualifications).firstElementChild.firstElementChild.tagName).toBe('LI');

        });
    });


    describe('Argumentos', function () {
        it('arbitraryArgs debe aceptar cualquier cantidad de argumentos', function () {
            expect(arbitraryArgs(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
            expect(arbitraryArgs(1, 2, 3, 4, 5)).toEqual([1, 2, 3, 4, 5]);
            expect(arbitraryArgs(...Array(1000).fill(0))).toEqual(Array(1000).fill(0));
        });
        it('getMax debe retornar el máximo de un array', function () {
            expect(getMax([1, 2, 3, 4])).toBe(4);
            expect(getMax([...Array(1000).fill(0), 10])).toBe(10);
        });
        it('getDistance debe retornar la distancia', function () {
            expect(getDistance([4, 1], [1, 5])).toBe(5);
            expect(getDistance([0, 0], [3, 4])).toBe(5);
            expect(getDistance([3, 4])).toBe(5);
            expect(getDistance()).toBe(0);
        });
    });



    describe('Immutabilidad y funciones de alto orden', function () {
        it('shiftArray debe desplazar un array a la derecha', function () {
            expect(shiftArray([1, 2, 3, 4])).toEqual([2, 3, 4, 1]);
            expect(shiftArray([1, 2, 3, 4, 5])).toEqual([2, 3, 4, 5, 1]);
            let original = [2, 3, 4, 5];
            let shifted = shiftArray(original);
            expect(original).toEqual([2, 3, 4, 5]);
            expect(original === shifted).toBe(false);
            let functionCode = shiftArray.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => functionCode.includes(loop))).toBe(false);

        });

        it('allShiftsArray debe retornar todos los desplazamientos posibles', function () {
            const original = [1, 2, 3, 5];
            const expectedResult = [[2, 3, 5, 1],
            [3, 5, 1, 2],
            [5, 1, 2, 3],
            [1, 2, 3, 5]];
            expect(allShiftsArray(original)).toEqual(expectedResult);

            let shifted = allShiftsArray(original);
            expect(original).toEqual([1, 2, 3, 5]);
            expect(original === shifted).toBe(false);

            let functionCode = allShiftsArray.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => functionCode.includes(loop))).toBe(false);
        });

        it('allShiftsString debe retornar todos los desplazamientos posibles de una string', function () {
            const original = "abcd";
            const expectedResult = ["bdca", "cdab", "dabc", "abcd"];
            expect(allShiftsString(original)).toEqual(expectedResult);

            let functionCode = allShiftsString.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => functionCode.includes(loop))).toBe(false);
        });

        it('allNames debe retornar todas la combinaciones de nombre y dos apellidos', function () {
            const names = ["Juan", "Ana", "Núria"];
            const surnames = ["Pérez", "Rodriguez", "Benabent"];
            const expectedResult = [
                "Juan Pérez Pérez",
                "Juan Pérez Rodriguez",
                "Juan Pérez Benabent",
                "Juan Rodriguez Pérez",
                "Juan Rodriguez Rodriguez",
                "Juan Rodriguez Benabent",
                "Juan Benabent Pérez",
                "Juan Benabent Rodriguez",
                "Juan Benabent Benabent",
                "Ana Pérez Pérez",
                "Ana Pérez Rodriguez",
                "Ana Pérez Benabent",
                "Ana Rodriguez Pérez",
                "Ana Rodriguez Rodriguez",
                "Ana Rodriguez Benabent",
                "Ana Benabent Pérez",
                "Ana Benabent Rodriguez",
                "Ana Benabent Benabent",
                "Núria Pérez Pérez",
                "Núria Pérez Rodriguez",
                "Núria Pérez Benabent",
                "Núria Rodriguez Pérez",
                "Núria Rodriguez Rodriguez",
                "Núria Rodriguez Benabent",
                "Núria Benabent Pérez",
                "Núria Benabent Rodriguez",
                "Núria Benabent Benabent"
            ]
            expect(allNames(names, surnames)).toEqual(jasmine.arrayContaining(expectedResult));

            let functionCode = allShiftsString.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => functionCode.includes(loop))).toBe(false);
        });



        it('removeEmpties debe eliminar partidos vacíos', async function () {
            const matches = await getData('__spec__/src/data/liga.json');
            const emptyMatch = {
                "Sem.": "",
                "Día": "",
                "Fecha": "",
                "Hora": "",
                "Local": "",
                "xG": "",
                "Marcador": "",
                "xG__1": "",
                "Visitante": "",
                "Asistencia": "",
                "Sedes": "",
                "Árbitro": "",
                "Informe del partido": "",
                "Notas": ""
            };

            const result = removeEmpties(matches);
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toBeInstanceOf(Object);
            expect(result).not.toContain(jasmine.objectContaining(emptyMatch));
        });

        it('groupByWeeks debe eliminar partidos vacíos', async function () {
            const matches = await getData('__spec__/src/data/liga.json');
            const emptyMatch = {
                "Sem.": "",
                "Día": "",
                "Fecha": "",
                "Hora": "",
                "Local": "",
                "xG": "",
                "Marcador": "",
                "xG__1": "",
                "Visitante": "",
                "Asistencia": "",
                "Sedes": "",
                "Árbitro": "",
                "Informe del partido": "",
                "Notas": ""
            };

            const result = groupByWeeks(matches);
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toBeInstanceOf(Array);
            expect(Object.keys(result[1][1])).toEqual(Object.keys(emptyMatch));
        });

        it('filterTeam debe retornar una función que filtra por equipo', async function () {
            const matches = await getData('__spec__/src/data/liga.json');
            const weeks = groupByWeeks(matches);
            const filterByValencia = filterTeam("Valencia");
            expect(filterByValencia).toBeInstanceOf(Function);
            const filteredByValencia = filterByValencia(weeks);
            expect(filteredByValencia).toBeInstanceOf(Array);
            expect(filteredByValencia[0]).toBeInstanceOf(Array);
            console.log(filteredByValencia);
            expect([filteredByValencia[1][0].Visitante, filteredByValencia[1][0].Local]).toContain("Valencia");
        });

        it('getPoints debe retornar las estadísticas de la liga ', async function () {
            const matches = await getData('__spec__/src/data/liga.json');
            const points = getPoints(matches);
            expect(points).toBeInstanceOf(Array);
            expect(points[0]).toBeInstanceOf(Object);
            expect(Object.keys(points[0])).toEqual(["team","stats"]);
            expect(Object.keys(points[0].stats)).toEqual(["points","gScored","gAgainst"]);
            expect(points[0].team).toBe("Real Madrid");
            expect(points[8].team).toBe("Valencia");
            expect(points[8].stats.points).toBe(48);

            let functionCode = getPoints.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => functionCode.includes(loop))).toBe(false);
      
            });


        it('createArray should create an array', () => {
            let arrayCreated = createArray(10,(array,index)=> array.length*index);
            expect(arrayCreated.length).toBe(10);
            expect(arrayCreated).toEqual([0,10,20,30,40,50,60,70,80,90]);
        });

        it("unFlat should create a 2 dimension array", function () {
            let arrayBase = [1,2,3,4,5,6];
            expect(Utils.unFlat(arrayBase,3)).toEqual([[1,2,3],[4,5,6]]);
            expect(Utils.unFlat(arrayBase,2)).toEqual([[1,2],[3,4],[5,6]]);
            arrayBase = [1,2,3,4,5,6,7];
            expect(Utils.unFlat(arrayBase,3)).toEqual([[1,2,3],[4,5,6],[7]]);
            expect(Utils.unFlat(arrayBase,2)).toEqual([[1,2],[3,4],[5,6],[7]]);
            expect(arrayBase).toEqual([1,2,3,4,5,6,7]); // immutable
        });
        it("uniqueValues should remove repetated in an array", function () {
            let arrayRepeated = [1,1,2,2,3,4,5,6,7,7,1,2];
            let arrayUnique = Utils.uniqueValues(arrayRepeated);
            expect(arrayUnique).toEqual([1,2,3,4,5,6,7]);
            expect(arrayRepeated).toEqual([1,1,2,2,3,4,5,6,7,7,1,2]);  // immutable
        });
        it("cartesianProduct do all the combinations between two arrays", function () {
            let array1 = [1,2,3];
            let array2 = ['a','b','c'];
            let expectedResult = [[1,'a'],[1,'b'],[1,'c'],[2,'a'],[2,'b'],[2,'c'],[3,'a'],[3,'b'],[3,'c']];
            expect(Utils.cartesianProduct(array1,array2)).toEqual(expectedResult);
            expect(array1).toEqual([1,2,3]);  //immutable
            expect(array2).toEqual(['a','b','c']);
        });
        it("innerJoin do a innerJoin", function () {
            let people = [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}];
            let cars = [{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}];
            let expectedResult = [
                [{id: '0000JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '1111JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '2222JKL', owner: 2},{id: 2, name: 'Mengano'}]
            ];
            expect(Utils.innerJoin(cars,people, (a,b) => a.owner === b.id)).toEqual(expectedResult);
            expect(people).toEqual( [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}]);  //immutable
            expect(cars).toEqual([{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}]);
        });
        it("LeftJoin do a LeftJoin", function () {
            let people = [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}];
            let cars = [{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}];
            let expectedResult = [
                [{id: '0000JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '1111JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '2222JKL', owner: 2},{id: 2, name: 'Mengano'}],
                [{id: '3333JKL', owner: 4},null]
            ];
            expect(Utils.innerJoin(cars,people,(a,b) => a.owner === b.id)).toEqual(expectedResult);
            expect(people).toEqual( [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}]);  //immutable
            expect(cars).toEqual([{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}]);
        });

    });



    describe('Currying', function () {
        it('applyPermutations debe aplicar las permutaciones', function () {
            const original = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']; 
            const permutations = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8],   
                [0, 3, 6, 1, 4, 7, 2, 5, 8],  
                [6, 3, 0, 7, 4, 1, 8, 5, 2],   
                [6, 7, 8, 3, 4, 5, 0, 1, 2],   
                [8, 7, 6, 5, 4, 3, 2, 1, 0],   
                [8, 5, 2, 7, 4, 1, 6, 3, 0],   
                [2, 5, 8, 1, 4, 7, 0, 3, 6],   
                [2, 1, 0, 5, 4, 3, 8, 7, 6]   
            ];
            const expectedResult = [
                ["a","b","c","d","e","f","g","h","i"],
                ["a","d","g","b","e","h","c","f","i"],
                ["g","d","a","h","e","b","i","f","c"],
                ["g","h","i","d","e","f","a","b","c"],
                ["i","h","g","f","e","d","c","b","a"],
                ["i","f","c","h","e","b","g","d","a"],
                ["c","f","i","b","e","h","a","d","g"],
                ["c","b","a","f","e","d","i","h","g"]
                ];
            expect(applyPermutations(permutations)).toBeInstanceOf(Function);
            expect(applyPermutations(permutations)(original)).toBeInstanceOf(Array);
            expect(applyPermutations(permutations)(original)).toEqual(expectedResult);

            expect(original).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);

            let functionCode = applyPermutations.toString();
            expect(['for(', 'for (', 'while', 'forEach'].some(loop => functionCode.includes(loop))).toBe(false);
      
        });
 
    });


    describe('Method Chaining', function () {
        it('Arithmetic debe permitir encadenar sus métodos', function () {
            const Arithmetic1= new Arithmetic();
            const result = Arithmetic1
              .sum(1, 3, 6)   // => { value: 10 } 
              .subtraction(3)   // => { value: 7 }
              .add(4)        // => { value: 11 }
              .value;         // => 11 
            
              expect(result).toBe(11);
        });
 
    });


    describe('Composición', function () {
        it('stringToArray debe retornar un array desde un string', function () {
            const string = "abcde"; 
            const array = stringToArray(string);
            expect(array).toBeInstanceOf(Array);
            expect(array).toEqual(["a","b","c","d","e"]);
        });
        it('reverseArray debe retornar un array invertido', function () { 
            const array = [1,2,3,4];
            const inverted = reverseArray(array);
            expect(inverted).toBeInstanceOf(Array);
            expect(inverted).toEqual([4,3,2,1]);
            expect(array).toEqual([1,2,3,4]);
        });
        it('joinArrayToString debe retornar un string de un array', function () { 
            const array = [1,2,3,4,"a"];
            const string = joinArrayToString(array);
            expect(string).toBe("1234a");
            expect(array).toEqual([1,2,3,4,"a"]);
        });
        it('reverseString debe retornar una string invertida usando composición ', function () { 
            const string = "abcde"; 
            const reversed = reverseString(string);
            expect(reversed).toBe("edcba");
        });
 
    });

    describe('Memoize', function () {
        let callback;
        beforeEach(() => {
          // Crear spy para callback 
          callback = jasmine.createSpy('callback');
        });
  
        it('memoize debe retornar una función "memoizada"', function () {
            window.sum = (a,b) => a+b;
            let callback = spyOn(window,'sum').and.callThrough();
            const memoizedSum = memoize(window.sum);
            expect(memoizedSum(5,4)).toBe(9);
            expect(callback).toHaveBeenCalled();
            expect(memoizedSum(5,3)).toBe(8);
            expect(memoizedSum(5,4)).toBe(9);
            expect(callback).toHaveBeenCalledTimes(2);
        });
    });

    describe('Ensure One Call', function () {
        let callback;
        beforeEach(() => {
          // Crear spy para callback 
          callback = jasmine.createSpy('callback');
        });

    
        it('ensureOneCall debe llamar sólo una vez a la función', function () {
            window.sum = (a,b) => a+b;
            let callback = spyOn(window,'sum').and.callThrough();
            const onceSum = ensureOneCall(window.sum);
            expect(onceSum(5,4)).toBe(9);
            expect(callback).toHaveBeenCalled();
            expect(onceSum(5,3)).toBe(undefined);
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });


});

