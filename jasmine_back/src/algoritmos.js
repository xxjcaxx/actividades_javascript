export {TicTacToeGetInitialState, 
    TicTacToeGetNextState, 
    TicTacToeGetValidMoves, 
    TicTacToeCheckWin,
    TicTacToeGetWinAndTerminated,
    TicTacToeChangePlayer,
    TicTacToeChangePerspective,
    MCExpandNode, MCIsFullExpandedNode, MCTSelectBestNode,
    MCSimulate, MCBackPropagate,
    MCGetUcb, MCTSearch, MCStateToString, MCGetRandomMove,

    middleOfArray, 
    sumMultiples
}

/**
 * Estos ejercicios son para practicar algoritmos y estructuras de datos con Javascript.
 * La resolución de muchos de ellos no requiere más que conocimientos básicos del lenguaje.
 * Pueden ser útiles para aprender o repasar fundamentos de programación.
 */


/* Bloque 1: El juego del 3 en raya */

function TicTacToeGetInitialState(){
    // Esta función retorna un array de 3x3 lleno de 0s
}

function TicTacToeGetNextState(state,move,player){
    /*
    Esta función recibe: 
    - Un estado en forma de matriz 3x3
    - Una acción que es un entero de 0 a 9, que indica a qué posición se moverá el player
    - Un player que es un número 1 o -1
    Debe retornar una copia del estado donde se ha puesto el player
    en el lugar donde indica move
     */
}

function TicTacToeGetValidMoves(state){
    /*
    Esta función retorna un array con las "moves" o movimientos válidos
    Un movimiento válido es la posición donde el tablero tiene un 0
    El resultado es un array de 1s y 0s donde un 1 significa que el movimiento de esa
    posición del array es válido. 
    En este resultado: [0,0,0 ,1,0,0, 1,0,1] significa que se puede poner ficha en
    las posiciones 3,6,8 del tablero. 
    */
}

function TicTacToeCheckWin(state,move){
    /*
    Esta función retorna true o false dependiendo si, con el move,
    el jugador actual ha ganado.
    En el estado que se le pasa ya se ha realizado el move
    */ 
}

function TicTacToeGetWinAndTerminated(state,move){
    /**
     * Esta función recibe un estado y la última acción realizada
     * Devuelve un objecto que tendrá esta estructura:
     * {win: boolean, terminated: boolean}
     * Esta indicará si ha ganado y si la partida a acabado
     * Una partida acaba si alguien gana o en tablas, es decir, que 
     * ya no quedan jugadas válidas pero no ha ganado nadie.
     */
}

function TicTacToeChangePlayer(player){
    // Retorna el otro jugador, si es 1 retorna -1 i viceversa
}

function TicTacToeChangePerspective(state){
    /*
    Esta función sirve para invertir el juego. 
    En el caso de ese juego, debe poner -1 donde pone 1 y 1 donde pone -1
    OJO, que en JS existe el -0
    */
}


/* Bloque 2 El algoritmo Montecarlo Tree Search */

/*
El 3 en raya tiene exactamente 303 situaciones distintas del tablero sin contar 
las situaciones finales en las que gana alguien o hay tablas ni las
rotaciones sobre una misma situación que son equivalentes. Si contamos todas
las posibles situaciones son 19683, aunque dentro de esas combinaciones hay
situaciones que nunca se alcanzarán, ya que una vez hay 3 en raya no se continúa
jugando. Esto es una cantidad aceptable y por eso el 3 en raya se considera un juego "resuelto", 
ya que un jugador perfecto siempre gana o empata.

Pero para aprender algoritmos es ideal, ya que las reglas son simples.


El algoritmo de Montecarlo se usa para implementar una cierta
inteligencia en la búsqueda de la mejor decisión. Se suele usar en juegos 
tipo el 3 en raya o incluso ajedrez para encontrar la jugada con más opciones de ganar

https://en.wikipedia.org/wiki/Monte_Carlo_tree_search
https://www.cs.us.es/~fsancho/Blog/posts/MCTS.md 

Vamos a implementar un algortimo de Montecarlo genérico que luego
se podrá usar para implementar la IA del 3 en raya. 

Puesto que nuestro enfoque es de Programación Funcional y queremos poder
testar de forma muy granular, vamos a hacer funciones pequeñas que luego usaremos 
para el algoritmo definitivo.  
*/

/* Montecarlo Tree Search utiliza un árbol. En JS se pueden hacer árboles
con objetos literales. Por lo que vamos a usar un objeto con esta sintaxis recursiva:
{
    state: GameState,
    moveTaken: number
    value: number, 
    visits: number,
    expandableMoves: [],
    parent: Node
    player: 1,
    children: [
        {value: number, visits: number, children:[...]},
        {value: number, visits: number, children:[...]}
    ,...]}


Para hacerlo genérico, declararemos un objeto "game" que adaptará las funciones de un juego a este algoritmo:
const game = {
    moveSize: 9,
    getValidMoves: TicTacToeGetValidMoves,
    getInitialState: TicTacToeGetInitialState,
    getNextState: TicTacToeGetNextState,
    changePerspective: TicTacToeChangePerspective,
    getWinAndTerminated: TicTacToeGetWinAndTerminated,
    changePlayer: TicTacToeChangePlayer
}

Esto se hará cuando se quiera usar el algoritmo y está hecho en los tests
*/

const MCStateToString = (state) => {
    /*
    Esta función auxiliar retornará el estado del juego en formato string, de manera que se vea bien por consola, por ejemplo
    */
   }

const MCGetRandomMove = (validMoves) => {
    /*
    Esta función recibe un array de posibles movimientos, de manera que un 1 significa que ese movimiento es legal y un 0 que no
    Retorna la posición de un movimiento aleatorio de los que son legales.
    */
}

const MCExpandNode = (game)=> (node)=> {
    /*
    Un nodo tendrá un atributo expandableMoves, que tiene la lista
    de movimientos válidos que quedan por explorar. 
    La lista es un array de 1s y 0s donde un 1 significa que es válido y que es expandible.
    Se debe seleccionar uno de ellos, crear un nodo hijo y añadirlo a la lista de children
    del nodo. También anularà el movimiento en expandableMoves poniendo un 0. 
    El nodo hijo recibirá el estado modificado por el movimiento, un valor y contador de visitas a 0
    y la lista de movimientos válidos a partir de ahí, además de una lista vacía de nodos hijos y una referencia al nodo padre. 
    El estado del nodo hijo será calculado como el estado del padre con el movimiento escogido al azar de
    entre los válidos.
    Por ejemplo, con este nodo padre: 
    {
        "state": [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        "moveTaken": null,
        "value": 0,
        "visits": 0,
        "expandableMoves": [1, 1, 1, 1, 1, 1, 1, 1, 1],
        "player": -1,
        "parent": null,
        "children": []
    }

    Tendríamos un posible nodo hijo expandido como este:
      {
        "state": [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
        "moveTaken": 4,
        "value": 0,
        "visits": 0,
        "expandableMoves": [1, 1, 1, 1, 0, 1, 1, 1, 1],
        "player": 1,
        "parent": <El nodo padre>
        "children": []
    }
    */
}


const  MCIsFullExpandedNode = (node)=>{
    /*
    Un nodo se considera totalmente expandido 
    si no hay más movimientos válidos y tiene al menos un nodo hijo
    Esta función retorna true o false si esto pasa. 
    */
 }

const MCGetUcb = (node, parentNode, C) => {
    /*
    Upper Confidence Bound es la elegibilidad de un nodo respecto a los demás. 
    Es importante elegir buenos nodos, es decir, que tengan un buen balance entre 
    los éxitos finales y las veces que se ha visitado. Pero también es necesario
    poder explorar nodos poco explorados por si se pierden oportunidades. 

    Para calcular el UCB se usa esta fórmula expresada en LaTeX:
    {\displaystyle {\frac {w_{i}}{n_{i}}}+c{\sqrt {\frac {\ln N_{i}}{n_{i}}}}}
    Puedes copiar y pegar la expressión en un editor de LaTeX para verla mejor. 

    De esta manera, primero se cuenta la ratio victorias/visitas y se suma a 
    una operación que valora la ratio entre las visitas al padre y las visitas al nodo. 
    Mediante esta fórmula, un nodo poco visitado irá ganando peso conforme no es visitado
    C es un parámetro que suele ser raíz de 2, este valor se ha definido empíricamente. 
    wi = las victorias del nodo
    ni = las visitas del nodo
    Ni = las visitas del nodo padre

    Esta función recibe el nodo, el nodo padre y C y retorna el valor de UCB
    */
   }


const MCTSelectBestNode = (root) =>{
    /*
    Para seleccionar el mejor nodo, hay que elegir recursivamente
    el mejor de los hijos de un nodo. De esta manera, el mejor elige su mejor hijo
    y así sucesivamente hasta llegar a un nodo que tiene menos de 2 hijos
    El mejor es el que tenga mejor ucb, que se calcula con la función MCGetUcb.

    Debe usar la función MCIsFullExpandedNode para saber si está totalmente expandido.
    Sólo busca el mejor hijo si ya está expandido. En otro caso, retorna el própio root
    
    Esta función recibe un nodo que actúa como raíz y se llama a sí misma para obtener el mejor
    nodo hijo. 
    */    
}


const MCSimulate = (game) => (node) => {

    /*
    Esta función hace un simulacro de partida aleatoria a partir de un nodo. 
    Retorna el jugador ganador después del simulacro. 
    Para ello, copiará el estado del nodo, elegirá un movimiento aleatorio de entre los legales y
    ejecutará ese movimiento en el juego. Si els estado resultante tiene un ganador, lo retornará.
    En caso de acabar el juego con empate, retornará lo que el juego retorna como valor del empate.  
    */
}

const MCBackPropagate = (node,value) => {
    /*
    Esta función se aplica a un nodo sobre el que ya se ha hecho la simulación.
    El resultado de la simulación es un 0, 1 o -1, dependiendo del ganador.
    Este resultado hay que sumarlo al valor del nodo. También se incrementará el número de visitas.
    
    Luego, esta función se llamará recursivamente con el nodo padre, al que se le 
    pasará el valor invertido, ya que el nodo padre representa al jugador contrario. 
    
    Por simplicidad y rendimiento, esta función no retorna nada, ha de mutar el nodo
    que se pasa por parámetros. 
    */
}


function MCTSearch(game, state, numSearches){
    /* Está pensado para siempre ver la mejor jugada para el jugador 1
    // En caso de querer la mejor para el jugador -1 hay que cambiar la perspectiva
    // antes de buscar. 
    Dejamos el algoritmo de búsqueda para que se entienda qué se espera con las
    funciones anteriores. 
    */

    let root = {
        state: state,
        moveTaken: null,
        value: 0, 
        visits: 0, 
        expandableMoves: [...game.getValidMoves(state)],
        parent: null,
        player: -1,
        children: []};

    for (let search=0; search<numSearches; search++){
        // Selecciona de forma recursiva el mejor nodo si ya se ha expandido o el mismo:
        let node = MCTSelectBestNode(root);
        // comprueba las ganancias del mejor nodo y si ha terminado
        let {win, terminated} = game.getWinAndTerminated(node.state, node.moveTaken);
        // Pone el value a -win para el backpropagate
        let value = win;

        if (!terminated){
            // Si no ha terminado, se expande:
            node = MCExpandNode(game)(node);
            // Sobre el nodo expandido se simula hasta el final una partida:
            value = MCSimulate(game)(node);
        }
        if(terminated && value === 1 && node.parent === root){
            // Que gane haciendo un solo movimiento
            value = Number.MAX_SAFE_INTEGER;
            search = numSearches;
        }
        value = node.player*value;

        MCBackPropagate(node,value);
    }


    let moveWins = Array(game.moveSize).fill(0);

    let moveVisits = Array(game.moveSize).fill(0);
    for(let child of root.children){
        moveWins[child.moveTaken] = child.value;
        moveVisits[child.moveTaken] = child.visits;
    }
    
    let winsTotal = moveWins.reduce((p,v)=> p+v);
   
    let rootNoParent = structuredClone(root);
    removeAttribute(rootNoParent,'parent');
    console.log(rootNoParent); // Dejamos esto para poder copiar el objeto y analizar el algoritmo
    return moveWins.map( v=> v/winsTotal);
}


function removeAttribute(object,attribute){
    delete object[attribute];
    for(let c of object.children){
        removeAttribute(c,attribute)
    }
}



/*
Bloque 3: Retos algortítmicos

En este bloque se pide solucionar retos que son más complicados algorítmicamente 
que la dificultad que plantea el lenguaje Javascript
*/


// Dificultad: Sencillo
function middleOfArray(array){
    /*
    Esta función recibe como parámetros un array y retorna la 
    segunda mitad del array. en caso de tener un número impar
    de elementos, retorna del medio al final, con un número par, 
    la segunda mitad exacta
    */
}

function sumMultiples(numbers,limit){
/*
Esta función acepta una lista de números y retorna la suma de los 
múltiplos de esos números que sean menores que el número límite.
Por ejemplo: sumMultiples([3,5],10) retorna 23, ya que suma 3,5,6,9 que son los
múltiplos de 3 y 5
*/
}