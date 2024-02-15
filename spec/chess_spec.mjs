import * as chess from "../src/proyecto_ajedrez.js"

describe('Ajedrez', function () {
  describe('transformaciones', function () {
    it('fenToBoard debería crear un tablero correcto', function () {
      let fen = '4rbk1/1pp1qPpn/p1n4p/3r4/P7/5N1P/1P2QPP1/R1B1R1K1 b - - 0 19';
      let expectedBoard = [
        [0, 0, 0, 0, -4, -3, -5, 0],
        [0, -1, -1, 0, -6, 1, -1, -2],
        [-1, 0, -2, 0, 0, 0, 0, -1],
        [0, 0, 0, -4, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 1],
        [0, 1, 0, 0, 6, 1, 1, 0],
        [4, 0, 3, 0, 4, 0, 5, 0],
      ];
      let result = chess.fenToBoard(fen);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(Array);
      expect(typeof (result[0][0])).toBe('number');
      expect(result).toEqual(expectedBoard);
      fen = '4rbk1/1pp1qPpn/p1n4p/3r4/8/5N1P/1P2QPP1/R1B1R1K1 b - - 0 19'

      expectedBoard[4][0] = 0;
      result = chess.fenToBoard(fen);
      expect(result).toEqual(expectedBoard);
    });
    it('boardToLetters debería retornar un tablero de letras', function () {
      let initBoard = [
        [0, 0, 0, 0, -4, -3, -5, 0],
        [0, -1, -1, 0, -6, 1, -1, -2],
        [-1, 0, -2, 0, 0, 0, 0, -1],
        [0, 0, 0, -4, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 1],
        [0, 1, 0, 0, 6, 1, 1, 0],
        [4, 0, 3, 0, 4, 0, 5, 0],
      ];
      let expectedBoard = [
        ['.', '.', '.', '.', 'r', 'b', 'k', '.'],
        ['.', 'p', 'p', '.', 'q', 'P', 'p', 'n'],
        ['p', '.', 'n', '.', '.', '.', '.', 'p'],
        ['.', '.', '.', 'r', '.', '.', '.', '.'],
        ['P', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', 'N', '.', 'P'],
        ['.', 'P', '.', '.', 'Q', 'P', 'P', '.'],
        ['R', '.', 'B', '.', 'R', '.', 'K', '.'],
      ];
      let result = chess.boardToLetters(initBoard);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(Array);
      expect(typeof (result[0][0])).toBe('string');
      expect(result).toEqual(expectedBoard);

    });
    it('boardToString debería retornar un tablero de letras', function () {
      let initBoard  = [
        ['.', '.', '.', '.', 'r', 'b', 'k', '.'],
        ['.', 'p', 'p', '.', 'q', 'P', 'p', 'n'],
        ['p', '.', 'n', '.', '.', '.', '.', 'p'],
        ['.', '.', '.', 'r', '.', '.', '.', '.'],
        ['P', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', 'N', '.', 'P'],
        ['.', 'P', '.', '.', 'Q', 'P', 'P', '.'],
        ['R', '.', 'B', '.', 'R', '.', 'K', '.'],
      ];
      let result = chess.boardToString(initBoard);
      console.log(`%cTest boardToString\n${result}`,"color: fuchsia");
      expect(typeof(result)).toBe('string');
      expect(result).toBe(`  +------------------------+
8 | .  .  .  .  r  b  k  . |
7 | .  p  p  .  q  P  p  n |
6 | p  .  n  .  .  .  .  p |
5 | .  .  .  r  .  .  .  . |
4 | P  .  .  .  .  .  .  . |
3 | .  .  .  .  .  N  .  P |
2 | .  P  .  .  Q  P  P  . |
1 | R  .  B  .  R  .  K  . |
  +------------------------+
    a  b  c  d  e  f  g  h`);

    });

  });
});