import {
    student, arbitraryArgs, getMax, getDistance,
    shiftArray, allShiftsArray, allShiftsString, allNames, removeEmpties,
    groupByWeeks, filterTeam, getPoints, applyPermutations
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

});

