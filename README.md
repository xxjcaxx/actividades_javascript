# Actividades de Javascript en Javascript con tests.

## Instrucciones:
Clona este repositorio o descarga la carpeta. 

Para que funcione, hay que instalar las suite de tests **Jasmine**. Como está especificado en **package.json**, sólo tienes que ejecutar:
> npm install

Asegúrate de tener instalado nodejs y npm en una de las últimas versiones. 

## Recomendaciones
Una vez preparado, dentro de src hay algunos ficheros javascript con funciones inacabadas. La tarea del alumno es acabar esas funciones y ver si pasan el test. 

Cada función tiene un test (it()) asociado. No es necesario acabar todas las funciones para probar los tests. Una vez entras a la url que te proporciona Jasmine, puedes seleccionar el test de la función que estás haciendo y sólo testear esa función.  

Algunos enunciados se complementan con la lectura del test. Si no entiendes qué se pide, puedes ir al test en la carpeta spec. Estará en un archivo con un nombre similar al de las funciones. Leer los test te ayudará a entender mejor el enunciado y a plantear nuevos tests a esas o otras funciones.

Las funciones no suelen ser interdependientes. Se pueden hacer en distinto orden y probar por separado. Tampoco hay una progresión clara en dificultad. Lo difícil que sea un ejercicio es algo subjetivo. Es cierto que en el orden actual de las funciones, suelen ser más complicadas las del final. Además, suele ser de ejercicios muy atómicos y teóricos a otros más complejos y cercanos a la realidad.

Los tests están organizados por temáticas según mi criterio. Podemos empezar con los básicos (no por ello más fáciles) que tratan el lenguaje, estructuras de datos y un poco de algoritmos. Más adelantes, recomiendo hacer los de promesas y el resto de temáticas.

> [!NOTE]  
> Hay muchas maneras de programar en Javascript, ya que es multiparadigma. En términos generales, estos ejercicios potencian la **Programación Funcional**. De hecho hay un grupo específico de ejercicios para ello. Además, está pensado para programación de frontend web, no para ser ejecutado en Nodejs.

## Ejecutar los tests

Es mejor no ejecutar todos los tests juntos, pero aquí está la manera:

Comando para ejecutar todos los tests:
> npx jasmine-browser-runner serve

Para ejecutar los test separados por temática: 

Comando para ejecutar los tests de los ejercicios básicos:
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-basic.json

Comando para ejecutar los test de promesas: 
> npx jasmine-browser-runner serve --config=spec/support/jasmine-browser-promise.json

