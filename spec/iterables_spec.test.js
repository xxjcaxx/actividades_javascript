/**
 * @vitest-environment jsdom
 */

import {describe, expect, test, it, vi, beforeEach } from "vitest";

import { makeIterable, range, arrayLike, salarios,  flatGenerator } from "../src/iterables.js";

describe('Iterables', function() {
    describe('Crear Iterables', function() {
      test('makeIterable deberia generar un iterable' , function() {
        let iterable = makeIterable(1,2,3,4,5,6);

        expect([...iterable]).toEqual([1,2,3,4,5,6]);
        let index = 0;
        for(let i of iterable){
            expect(i).toBe([1,2,3,4,5,6][index]);
            index ++;
        }
        // evitar "trampas"
        expect(iterable).not.toBeInstanceOf(Array);
        expect(iterable).not.toBeInstanceOf(Set);
        expect(iterable).not.toBeInstanceOf(Map);

        let functionCode = makeIterable.toString();
            expect(functionCode.includes('next')).toBe(true);
            expect(functionCode.includes('Symbol')).toBe(true);
      
      });
      test('range deberia ser un iterable' , function() {
        expect([...range]).toEqual([1,2,3,4,5,6,7,8,9,10]);
        expect(range).not.toBeInstanceOf(Array);
        expect(range).not.toBeInstanceOf(Set);
        expect(range).not.toBeInstanceOf(Map);
      });
      test('arrayLike debería poderse transformar en array' , function() {
        expect(Array.from(arrayLike)).toEqual([1,2]);
        expect(arrayLike.length).toBe(2);
        expect(arrayLike).not.toBeInstanceOf(Array);
        expect(arrayLike).not.toBeInstanceOf(Set);
        expect(arrayLike).not.toBeInstanceOf(Map);
      });
      test('salarios debería poderse transformar en array' , function() {
        expect(Array.from(salarios)).toEqual([{Juan: 100}, {Ana: 160},{Pedro: 130}]);
        expect([...salarios]).toEqual([{Juan: 100}, {Ana: 160},{Pedro: 130}]);
        expect(salarios).not.toBeInstanceOf(Array);
        expect(salarios).not.toBeInstanceOf(Set);
        expect(salarios).not.toBeInstanceOf(Map);
      });
      test('flatGenerator debería devolver un iterable para ver los elementos de izquierda a derecha' , function() {
        expect(Array.from(flatGenerator([[[6]],[1,3],[]]))).toEqual([6,1,3]);
        expect([...flatGenerator([[[6]],[1,3],[]])]).toEqual([6,1,3]);
        expect(flatGenerator([[[6]],[1,3],[]])).not.toBeInstanceOf(Array);
        expect(flatGenerator([[[6]],[1,3],[]])).not.toBeInstanceOf(Set);
        expect(flatGenerator([[[6]],[1,3],[]])).not.toBeInstanceOf(Map);
      });
    });
   
   });