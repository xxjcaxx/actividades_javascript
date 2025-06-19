# Actividades de Javascript en Javascript con tests.

## Instrucciones:
Clona este repositorio o descarga la carpeta.

Para que funcione, hay que instalar las suite de tests **Vitest**. Como está especificado en **package.json**, sólo tienes que ejecutar:
> npm install

Asegúrate de tener instalado nodejs y npm en una de las últimas versiones. Yo lo he probado todo en Firefox 119, no garantizo que funcione en navegadores más antiguos.

## Recomendaciones
Una vez preparado, dentro de src hay algunos ficheros javascript con funciones inacabadas. La tarea del alumno es acabar esas funciones y ver si pasan el test.

Cada función tiene al menos un test asociado. No siempre es necesario acabar todas las funciones para probar los tests.

Algunos enunciados se complementan con la lectura del test. Si no entiendes qué se pide, puedes ir al test en la carpeta spec. Estará en un archivo con un nombre similar al de las funciones. Leer los test te ayudará a entender mejor el enunciado y a plantear nuevos tests a esas o otras funciones.

Las funciones no suelen ser interdependientes (a menos que lo indique). Se pueden hacer en distinto orden y probar por separado. Tampoco hay una progresión clara en dificultad. Lo difícil que sea un ejercicio es algo subjetivo. Es cierto que en el orden actual de las funciones, suelen ser más complicadas las del final.

Los tests están organizados por temáticas según mi criterio. Podemos empezar con los básicos (no por ello más fáciles) que tratan el lenguaje, estructuras de datos y un poco de algoritmos. Más adelante, recomiendo hacer los de promesas y el resto de temáticas.

> [!NOTE]  
> Hay muchas maneras de programar en Javascript, ya que es multiparadigma. En términos generales, estos ejercicios potencian la **Programación Funcional**. De hecho hay un grupo específico de ejercicios para ello. Además, está pensado para programación de frontend web, no para ser ejecutado en Nodejs.

## Ejecutar los tests

Vemamos qué hay en package.json:

```json
        "test": "vitest",
        "webtest": "vitest --ui",
        "coverage": "vitest run --coverage",
        "webtest:basic": "vitest spec/basic_spec.test.js --ui",
        "webtest:functional": "vitest spec/functional_spec.test.js --ui",
        "webtest:algorithms": "vitest spec/algorithms_spec.test.js --ui",
        "webtest:iterables": "vitest spec/iterables_spec.test.js --ui",
        "webtest:promises": "vitest spec/promise_spec.test.js --ui",
        "webtest:http": "vitest spec/http_spec.test.js --ui",
        "webtest:chess": "vitest spec/chess_spec.test.js --ui",
        "webtest:sudoku": "vitest spec/sudoku_spec.test.js --ui"
```

Por tanto, si queremos ejecutar los tests básicos, podemos poner esto en la terminal:
> npm run webtest:basic

Y así con todos los demás tests.

No sería muy recomendable lanzar todos los tests con `npm run test`, ya que pueden ser demasiados. 

Si resulta muy difícil o los enunciados son confusos, en la carpeta "soluciones" se puede ver cómo he implementado yo el sudoku o los algoritmos. 


# Con Jasmine (más antiguos)

Este repositorio se creó originalmente con tests de Jasmine. Estoy en proceso de cambiar todo a vitest, pero se pueden probar también con Jasmine. Para ello hay que entrar en el directorio de `jasmine_back` y seguir las instrucciones. 