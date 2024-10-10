# Actividades de Javascript en Javascript con tests.

# Con Jasmine (más antiguos)

Este repositorio se creó originalmente con tests de Jasmine. Estoy en proceso de cambiar todo a vitest, pero se pueden probar también con Jasmine:

Para que funcione, hay que instalar las suite de tests **Jasmine**. Como está especificado en **package.json**, sólo tienes que ejecutar:
> npm install

Asegúrate de tener instalado nodejs y npm en una de las últimas versiones. Yo lo he probado todo en Firefox 119, no garantizo que funcione en navegadores más antiguos.

## Recomendaciones
Una vez preparado, dentro de src hay algunos ficheros javascript con funciones inacabadas. La tarea del alumno es acabar esas funciones y ver si pasan el test.

Cada función tiene al menos un test (it()) asociado. No siempre es necesario acabar todas las funciones para probar los tests. Una vez entras a la url que te proporciona Jasmine, puedes seleccionar el test de la función que estás haciendo y sólo testear esa función.  

Algunos enunciados se complementan con la lectura del test. Si no entiendes qué se pide, puedes ir al test en la carpeta spec. Estará en un archivo con un nombre similar al de las funciones. Leer los test te ayudará a entender mejor el enunciado y a plantear nuevos tests a esas o otras funciones.

Las funciones no suelen ser interdependientes (a menos que lo indique). Se pueden hacer en distinto orden y probar por separado. Tampoco hay una progresión clara en dificultad. Lo difícil que sea un ejercicio es algo subjetivo. Es cierto que en el orden actual de las funciones, suelen ser más complicadas las del final.

Los tests están organizados por temáticas según mi criterio. Podemos empezar con los básicos (no por ello más fáciles) que tratan el lenguaje, estructuras de datos y un poco de algoritmos. Más adelante, recomiendo hacer los de promesas y el resto de temáticas.

> [!NOTE]  
> Hay muchas maneras de programar en Javascript, ya que es multiparadigma. En términos generales, estos ejercicios potencian la **Programación Funcional**. De hecho hay un grupo específico de ejercicios para ello. Además, está pensado para programación de frontend web, no para ser ejecutado en Nodejs.

## Ejecutar los tests

Es mejor no ejecutar todos los tests juntos, pero aquí está la manera:

Comando para ejecutar todos los tests:
> npx jasmine-browser-runner serve

Para ejecutar los test separados por temática: 

Comando para ejecutar los tests de los ejercicios básicos:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-basic.json

Comando para ejecutar los tests de los ejercicios sobre Iterables:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-iterables.json

Comando para ejecutar los test de promesas: 
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-promise.json

Comando para ejecutar los tests de comunicación con el servidor:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-http.json

Comando para ejecutar los tests de programación funcional:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-functional-programing.json

Se plantea un proyecto completo en el que, si se hacen todas las funciones, se puede crear una biblioteca que permite crear un Sudoku completo, jugable y que valida.

Los tests para el proyecto Sudoku:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-sudoku.json

Si queremos probar que el sudoku funciona, hay una carpeta "web_sudoku" con un html y js que necesitan la biblioteca para funcionar y ser arrancados desde un servidor de pruebas como la extensión "Live Server" de VS Code.

También se plantea un conjunto de funciones temáticas relacionadas con el ajedrez:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-chess.json

Si se quiere profundizar en algortimos, más que en las particularidades del lenguaje, se puede intentar hacer los ejercicios planteados en este test:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-algorithms.json


Si resulta muy difícil o los enunciados son confusos, en la carpeta "soluciones" se puede ver cómo he implementado yo el sudoku o los algoritmos. 