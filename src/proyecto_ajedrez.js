export { fenToBoard, boardToLetters, boardToString }

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
  const letters = {
    'q': -6, 'k': -5, 'r': -4, 'b': -3, 'n': -2, 'p': -1,
    'P': 1, 'N': 2, 'B': 3, 'R': 4, 'K': 5, 'Q': 6, '1': [0], '2': [0, 0], 3: [0, 0, 0],
    '4': [0, 0, 0, 0], '5': [0, 0, 0, 0, 0], '6': [0, 0, 0, 0, 0, 0], 7: [0, 0, 0, 0, 0, 0, 0], 8: [0, 0, 0, 0, 0, 0, 0, 0]
  };

  let rows = fen.split(' ')[0].split('/');
  return rows.filter((_, i) => i < 8).map((row) => {
    let items = row.split('');
    return items.map(i => letters[i]).flat()
  });

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
  const letters = ['q', 'k', 'r', 'b', 'n', 'p', '.', 'P', 'N', 'B', 'R', 'K', 'Q'];
  return board.map(r => r.map(c => letters[c + 6]))
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

  return `  +------------------------+
${board.map((row, i) => `${8 - i} | ${row.join('  ')} |`).join('\n')}
  +------------------------+
    a  b  c  d  e  f  g  h`;

}

class Chess {
  constructor(board){
    /*
    Este constructor recibe un tablero que puede ser en formato FEN o 
    como una matriz de números o letras. 
    */
   this.currentBoard = null; // Sustituir el null por el tablero representado con números
   this.turn = null; // Sustituir el turn por el turno (si está en FEN se sabe, en matriz asumimos que son las blancas) 
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
  get history(){
    /*
    Este getter retorna un array de tableros en notación FEN con el histórico de jugadas
    */
  }
  get history_moves(){
    /*
    Este getter retorna un array de movimientos históricos en formato SAN
    */
  }
}