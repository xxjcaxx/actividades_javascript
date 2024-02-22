export {TicTacToeGetInitialState, 
    TicTacToeGetNextState, 
    TicTacToeGetValidMoves, 
    TicTacToeCheckWin,
    TicTacToeGetWinAndTerminated,
    TicTacToeChangePlayer,
    TicTacToeChangePerspective,
    MCExpandNode, MCIsFullExpandedNode
}

/**
 * Estos ejercicios son para practicar algoritmos y estructuras de datos con Javascript.
 * La resolución de muchos de ellos no requiere más que conocimientos básicos del lenguaje.
 * Pueden ser útiles para aprender o repasar fundamentos de programación.
 */


/* Bloque 1: El juego del 3 en raya */

function TicTacToeGetInitialState(){
    // Esta función retorna un array de 3x3 lleno de 0s
    return [[0,0,0],[0,0,0],[0,0,0]]
}

function TicTacToeGetNextState(state,action,player){
    /*
    Esta función recibe: 
    - Un estado en forma de matriz 3x3
    - Una acción que es un entero de 0 a 9, que indica a qué posición se moverá el player
    - Un player que es un número 1 o -1
    Debe retornar una copia del estado donde se ha puesto el player
    en el lugar donde indica action
     */
    let state_copy = structuredClone(state);
    state_copy[Math.floor(action/3)][action%3] = player;
    return state_copy;
}

function TicTacToeGetValidMoves(state){
    /*
    Esta función retorna un array con las "actions" o movimientos válidos
    Un movimiento válido es la posición donde el tablero tiene un 0
    El resultado es un array de 1s y 0s donde un 1 significa que el movimiento de esa
    posición del array es válido. 
    En este resultado: [0,0,0 ,1,0,0, 1,0,1] significa que se puede poner ficha en
    las posiciones 3,6,8 del tablero. 
    */
    return state.flat().map(move => move === 0 ? 1 : 0)
}

function TicTacToeCheckWin(state,action){
    /*
    Esta función retorna true o false dependiendo si, con el action,
    el jugador actual ha ganado.
    En el estado que se le pasa ya se ha realizado el action
    */
    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    let player = state[Math.floor(action/3)][action%3];
    let s = state.flat();
    return winCombos.some((combo) => [s[combo[0]], s[combo[1]], s[combo[2]]].every((v) => v === player))
   
}

function TicTacToeGetWinAndTerminated(state,action){
    /**
     * Esta función recibe un estado y la última acción realizada
     * Devuelve un objecto que tendrá esta estructura:
     * {win: boolean, terminated: boolean}
     * Esta indicará si ha ganado y si la partida a acabado
     * Una partida acaba si alguien gana o en tablas, es decir, que 
     * ya no quedan jugadas válidas pero no ha ganado nadie.
     */
    if (TicTacToeCheckWin(state,action)){
        return {win: true, terminated: true}
    }
    if (TicTacToeGetValidMoves(state).every(m => m==0)){
        return {win: false, terminated: true}
    }
    return {win: false, terminated: false}
}

function TicTacToeChangePlayer(player){
    // Retorna el otro jugador, si es 1 retorna -1 i viceversa
    return -player;
}

function TicTacToeChangePerspective(state){
    /*
    Esta función sirve para invertir el juego. 
    En el caso de ese juego, debe poner -1 donde pone 1 y 1 donde pone -1
    OJO, que en JS existe el -0
    */
    return state.map(row => row.map(col => col * -1 || 0))
}


/* Bloque 2 El algoritmo Montecarlo Tree Search */

/*
https://en.wikipedia.org/wiki/Monte_Carlo_tree_search

El algoritmo de Montecarlo se usa para implementar una cierta
inteligencia en la búsqueda de la mejor decisión. Se suele usar en juegos 
tipo el 3 en raya o incluso ajedrez para encontrar la jugada con más opciones de ganar

El 3 en raya tiene exactamente 303 situaciones distintas del tablero sin contar 
las situaciones finales en las que gana alguien o hay tablas ni las
rotaciones sobre una misma situación que son equivalentes. Si contamos todas
las posibles situaciones son 19683. Esto es una cantidad aceptable y por eso el 3 en raya
se considera un juego "resuelto", ya que un jugador perfecto siempre gana o empata.

Pero para aprender algoritmos es ideal, ya que las reglas son simples.

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
    actionTaken: number
    value: number, 
    visits: number,
    expandableMoves: [] 
    children: [
        {value: number, visits: number, children:[...]},
        {value: number, visits: number, children:[...]}
    ,...]}


Para hacerlo genérico, declararemos un objeto "game" que adaptará las funciones de un juego a este algoritmo:
const game = {
    getValidMoves: TicTacToeGetValidMoves,
    getInitialState: TicTacToeGetInitialState,
    
}
Esto se hará cuando se quiera usar el algoritmo.
*/

const game = {
    getValidMoves: TicTacToeGetValidMoves,
    getInitialState: TicTacToeGetInitialState,
    getNextState: TicTacToeGetNextState,
    changePerspective: TicTacToeChangePerspective
}

const MCExpandNode = (game)=> (node)=> {
    /*
    Un nodo tendrá un atributo expandableMoves, que tiene la lista
    de movimientos válidos que quedan por explorar. 
    La lista es un array de 1s y 0s donde un 1 significa que es válido y que es expandible.
    Se debe seleccionar uno de ellos, crear un nodo hijo y añadirlo a la lista de children
    del nodo. 
    El nodo hijo recibirá el estado modificado por el movimiento, un valor y contador de visitas a 0
    y la lista de movimientos válidos a partir de ahí, además de una lista vacía de nodos hijos. 
    El estado del nodo hijo será calculado como el estado del padre con el movimiento escogido al azar de
    entre los válidos. Además, el nodo hijo tendrá el estado con la perspectiva invertida, ya que cambia el jugador
    Para simplificar, en esta función, vamos a mutar el node en vez de retornar una copia. 
    */
    let possibleMoves = node.expandableMoves.reduce((eM,current,index)=>{ 
        if(current === 1) { eM.push(index)}
        return eM;
     },[]);
    let selectedMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
    let children = {
        value: 0, 
        actionTaken: selectedMove,
        visits: 0, 
        children: []
    }
    // Anulamos ya ese movimiento como posible expansión
    node.expandableMoves[selectedMove] =0;
    // Copiamos el estado anterior
    children.state = structuredClone(node.state);
    // Ponemos un 1 en el action porque siempre está desde la perspectiva del 1
    children.state = game.getNextState(children.state,selectedMove,1);
    // Cambiamos de nuevo la perspectiva para que siempre sea la del 1
    children.state = game.changePerspective(children.state);
    // Calculamos los movimientos expandibles del nodo hijo
    children.expandableMoves = game.getValidMoves(children.state);
    // Añadimos el nodo hijo
    node.children.push(children)
}


const  MCIsFullExpandedNode = (node)=>{
    /*
    Un nodo se considera totalmente expandido 
    si no hay más movimientos válidos y tiene al menos un nodo hijo
    Esta función retorna true o false si esto pasa. 
    */
   return node.expandableMoves.every(m=> m===0) && node.children.length > 0;
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

    A la hora de hacer la fórmula hay que evitar divisiones por 0 

    Esta función recibe el nodo, el nodo padre y C y retorna el valor de UCB
    */
    let qValue = 1 - ((node.value / node.visits)+1) / 2
    return qValue + C * Math.sqrt(Math.log(parentNode.visits)/ node.visits)
}


function MCTSelectBestNode(game, root){
    /*
    Para seleccionar el mejor nodo, hay que elegir recursivamente
    el mejor de los hijos de un nodo. De esta manera, el mejor elige su mejor hijo
    y así sucesivamente hasta llegar a un nodo que tiene menos de 2 hijos
    El mejor es el que tenga mejor ucb, que se calcula con la función MCGetUcb.
    
    Esta función recibe un nodo que actúa como raíz y se llama a sí misma para obtener el mejor
    nodo hijo. 
    */
   if (MCIsFullExpandedNode(game,root)){
    return root;
   }
    let ucbList = root.children.map(MCGetUcb);
    let bestUCB = Math.max(...ucbList);
    let bestChild = root.children[ucbList.findIndex(ucb => ucb === bestUCB)];
    return MCTSelectBestNode[bestChild];
    
}

function MCTSearch(game, state, numSearches){
    let root = {
        state: game.getInitialState(),
        value: 0, 
        visits: 0, 
        expandableMoves: [game.getValidMoves(game.getInitialState())],
        children: []};
    for (let search of numSearches){
        let node = MCTSelectBestNode(root)
    }
}

