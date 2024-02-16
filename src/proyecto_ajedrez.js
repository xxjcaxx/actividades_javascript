export { fenToBoard, boardToLetters, boardToString, boardToFen, Chess, boardToAlphaZero }

/*
Esta colección de ejercicios están basados en la temática del ajedrez. 
Hay una librería muy conocida Chess.js para implementar las reglas y el estado
de una partida de ajedrez. También está Chessboard.js para dibujar un tablero de ajedrez.

En nuestro caso no pretendemos hacer un juego completo de ajedrez 
ni mucho menos implementar una IA para jugar. Pero el ajedrez se presta a trabajar 
algoritmos y estructuras de datos, programación funcional e iterables.
*/


function fenToBoard(fen) {
  /*
  Implementa una función que recibe un tablero de ajedrez en formato FEN y retorna
  una matriz bidimensional con números representando las piezas como se describe en este
  documento del célebre Claude Shannon https://www.pi.infn.it/~carosi/chess/shannon.txt
  Por ejemplo:
 [
        [
         [ 0, 0, 0, 0,-4,-3,-5, 0],
         [ 0,-1,-1, 0,-6, 1,-1,-2],
         [-1, 0,-2, 0, 0, 0, 0,-1],
         [ 0, 0, 0,-4, 0, 0, 0, 0],
         [ 1, 0, 0, 0, 0, 0, 0, 0],
         [ 0, 0, 0, 0, 0, 2, 0, 1],
         [ 0, 1, 0, 0, 6, 1, 1, 0],
         [ 4, 0, 3, 0, 4, 0, 5, 0],
        ]
  */
}

function boardToLetters(board) {
  /*
  Esta función recibe el tablero como lo genera la función anterior y retorna una copia
  de manera que cada número se sustituye por la letra correspondiente Por ejemplo:
  [
      ['.', '.', '.', '.', 'r', 'b', 'k', '.'],
      ['.', 'p', 'p', '.', 'q', 'P', 'p', 'n'],
      ['p', '.', 'n', '.', '.', '.', '.', 'p'],
      ['.', '.', '.', 'r', '.', '.', '.', '.'],
      ['P', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', 'N', '.', 'P'],
      ['.', 'P', '.', '.', 'Q', 'P', 'P', '.'],
      ['R', '.', 'B', '.', 'R', '.', 'K', '.'],
    ];
  */
 
}

function boardToString(board) {
  /*
  Esta función recibe el tablero en formato matriz de letras
  y retorna un string con la representación del tablero como el ejemplo:
  +------------------------+
8 | r  n  b  q  k  b  n  r |
7 | p  p  p  p  .  p  p  p |
6 | .  .  .  .  .  .  .  . |
5 | .  .  .  .  p  .  .  . |
4 | .  .  .  .  P  P  .  . |
3 | .  .  .  .  .  .  .  . |
2 | P  P  P  P  .  .  P  P |
1 | R  N  B  Q  K  B  N  R |
  +------------------------+
   a  b  c  d  e  f  g  h
  */
}

function boardToFen(board,turn,castling,passant,halfmoveClock,fullmodeNumber){
  /*
  Esta función recibe todos los datos necesarios para retornar una partida en formato FEN: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
  */
}

function boardToAlphaZero(board,turn){
  /*
  La IA Alphazero Chess es una red neuronal que ha sido entrenada jugando contra ella misma. 
  Para ser entrenada, la partida se debe codificar en varias matrices de 8x8. Se trata de que esta función imite la primera parte de esa codificación:
  Se necesitan 12 matrices para las fichas y 1 para el color.
  Las matrices para las fichas se codifican en 0s y 1s, de manera que, si en una posición se encuentra una ficha de determinado color, esa posición tiene un 1.
  El órden es el siguiente: [peones blancos, peones negros, caballos blancos, caballos negros, alfines blancos, 
                            alfiles negros, torres blancas, torres negras, reinas blancas reinas negras, rey blanco, rey negro]
  La última matriz se considera "binaria" porque es toda 1s si es el turno de las blancas y toda 0s si es el de las negras

  Observa el ejemplo de los tests para entenderlo mejor
  */
}

class Chess {
  constructor(board){
    /*
    Este constructor recibe un tablero que puede ser en formato FEN o 
    como una matriz de números o letras. 
    */
  this.currentBoard = null; // Sustituir el null por el tablero representado con números
  this.turn = null; // Sustituir el null por el turno (si está en FEN se sabe, en matriz asumimos que son las blancas) 
  }
  move(){
       /*
    Esta función retorna un objeto con dos funciones, .uci(move) y .san(move)
    Cada una de ellas interpreta un movimiento en UCI o en SAN y modifica el currentBoard
    La manera de llamarlas puede ser:
    chessObject.move().uci('e2e4')
    chessObject.move().san('Nf6')
    Además, guarda un histórico de movimientos. 
    */
  }
  get toString(){
    /*
    Este getter retorna el tablero transformado a string
    */
  }
  get history(){
    /*
    Este getter retorna un array de tableros en notación FEN con el histórico de jugadas
    */
  }
  get historyMoves(){
    /*
    Este getter retorna un array de movimientos históricos en formato UCI
    */
  }
}