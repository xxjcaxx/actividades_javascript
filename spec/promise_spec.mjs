import { delayedFunction } from "../src/promesas.js";

describe('Promesas', function() {
    describe('Callbacks', function() {
      it('Debería ejecutar una función pasado un tiempo' , function() {
        delayedFunction(()=>{
          
        },1000)
      });
    });
   });