import * as alg from "../src/algoritmos.js"

const initial_state = [[0,0,0],[0,0,0],[0,0,0]];
const example_state = [[0,1,0],[0,-1,0],[0,0,0]];
const full_state = [[-1,1,-1],[1,-1,1],[1,-1,1]];
const win_state = [[-1,1,-1],[1,-1,1],[-1,-1,1]];

describe('3 en raya', function() {
    describe('Funciones del juego', function() {
      it('TicTacToeGetInitialState Debe retornar un array 3x3 de 0s', function() {
        expect(alg.TicTacToeGetInitialState()).toEqual(initial_state)
        });
      it('TicTacToeGetNextState Debe retornar una copia con la jugada', function() {
        expect(alg.TicTacToeGetNextState(initial_state,2,1)).toEqual([[0,0,1],[0,0,0],[0,0,0]]);
        expect(alg.TicTacToeGetNextState(initial_state,3,-1)).toEqual([[0,0,0],[-1,0,0],[0,0,0]]);
        expect(alg.TicTacToeGetNextState(initial_state,2,1)).not.toBe(initial_state);
        });
      it('TicTacToeGetValidMoves Debe retornar la lista de posibles accions', function() {
          expect(alg.TicTacToeGetValidMoves(initial_state)).toEqual([1,1,1,1,1,1,1,1,1]);
          expect(alg.TicTacToeGetValidMoves(example_state)).toEqual([1,0,1,1,0,1,1,1,1]);
          expect(alg.TicTacToeGetValidMoves(full_state)).toEqual([0,0,0,0,0,0,0,0,0]);
        });

        it('TicTacToeCheckWin Debe retornar si ha ganado o no el jugador', function() {
          expect(alg.TicTacToeCheckWin(example_state,1)).toBe(false);
          expect(alg.TicTacToeCheckWin(full_state,1)).toBe(false);
          expect(alg.TicTacToeCheckWin(full_state,2)).toBe(false);
          expect(alg.TicTacToeCheckWin(win_state,4)).toBe(true);
          expect(alg.TicTacToeCheckWin(win_state,1)).toBe(false);
        });

        it('TicTacToeGetWinAndTerminated Debe retornar si ha ganado o no el jugador y si la partida a acabado', function() {
          expect(alg.TicTacToeGetWinAndTerminated(example_state,1)).toEqual({win:false,terminated: false});
          expect(alg.TicTacToeGetWinAndTerminated(full_state,1)).toEqual({win:false,terminated: true});
          expect(alg.TicTacToeGetWinAndTerminated(win_state,4)).toEqual({win:true,terminated: true});
        });
        it('TicTacToeChangePerspective Debe retornar el juego invertido', function() {
          //console.log(alg.TicTacToeChangePerspective(example_state));
          expect(alg.TicTacToeChangePerspective(example_state)).toEqual([[0,-1,0],[0,1,0],[0,0,0]]);
           });
    });
    describe('Juego completo', function() {
      it('Debe completar un juego completo', function() {
      const move_list = [4,0,1,7,2,8,6]
      let state = alg.TicTacToeGetInitialState();
      let player = 1;
      for (let move of move_list){
        state = alg.TicTacToeGetNextState(state,move,player);
        player = alg.TicTacToeChangePlayer(player);
      }
      expect(state).toEqual([[-1,1,1],[0,1,0],[1,-1,-1]]);
      expect(alg.TicTacToeCheckWin(state,move_list.at(-1))).toBe(true);
      expect(alg.TicTacToeGetWinAndTerminated(state,move_list.at(-1))).toEqual({win:true, terminated: true});
      });
    });
   });


describe('Montecarlo', function() {
  const game = {
    actionSize: 9,
    getValidMoves: alg.TicTacToeGetValidMoves,
    getInitialState: alg.TicTacToeGetInitialState,
    getNextState: alg.TicTacToeGetNextState,
    changePerspective: alg.TicTacToeChangePerspective,
    getWinAndTerminated: alg.TicTacToeGetWinAndTerminated,
    changePlayer: alg.TicTacToeChangePlayer
  }
  const exampleNode = {
    state: [[0,-1,0],[0,1,0],[0,0,0]],
    actionTaken: 1,
    value: 0,
    visits: 0,
    expandableMoves: [1,0,1, 1,0,1, 1,1,1],
    parent: null,
    children: []
  }
  const exampleExpandedNode = {
    state: [[-1,1,-1],[1,-1,1],[1,-1,0]],
    actionTaken: 1,
    value: 2,
    visits: 5,
    expandableMoves: [0,0,0, 0,0,0, 0,0,0],
    parent: null,
    children: [
      {
        state: [[1,-1,1],[-1,1,-1],[-1,1,-1]],
        actionTaken: 8,
        value: 1,
        visits: 4,
        expandableMoves: [0,0,0, 0,0,0, 0,0,0],
        parent: null,
        children: []
      }
    ]
  };
  exampleExpandedNode.children[0].parent = exampleExpandedNode;

    describe('Funciones auxiliares', function() {
      it('MCExpandNode Debe retornar el nodo expandido', function() {
        /*
        Ejemplo de cómo puede quedar el nodo después de expandir:
       {
          state: [[0,1,0],[0,-1,0],[0,0,0]],
          actionTaken: 1,
          value: 0,
          visits: 0,
          expandableMoves: [0,0,1, 1,0,1, 1,1,1],
          children: [
                        {
                          state: [[-1,-1,0],[0,1,0],[0,0,0]],
                          actionTaken: 0,
                          value: 0,
                          visits: 0,
                          expandableMoves: [0,0,1, 1,0,1, 1,1,1],
                          children: []
                      }
          ]
      }
         */
        
        let exampleNodeCopy = structuredClone(exampleNode);
        alg.MCExpandNode(game)(exampleNodeCopy);
        //console.log(exampleNodeCopy);
        // Crea un nodo hijo
        expect(exampleNodeCopy.children.length).toBe(1);
        // El nodo padre tiene un expandableMoves menos 
        expect(exampleNodeCopy.expandableMoves.filter(m => m===1).length).toBe(6);
        // El nodo hijo tiene expandableMoves y hay uno menos que en el padre
        expect(exampleNodeCopy.children[0].expandableMoves.filter(m => m===1).length).toBe(6);
        // El nodo hijo tiene state y está invertido respecto al padre
        expect(exampleNodeCopy.children[0].state[0][1]).toBe(-1);
        // En la posición donde se ha elegido hacer el movimiento hay un -1, que es el 1 invertido
        expect(exampleNodeCopy.children[0].state.flat()[exampleNodeCopy.children[0].actionTaken]).toBe(-1);
        });
   
  

    it('MCIsFullExpandedNode Debe retornar si está totalmente expandido', function() {
      expect(alg.MCIsFullExpandedNode(exampleNode)).toBe(false);
      expect(alg.MCIsFullExpandedNode(exampleExpandedNode)).toBe(true);
      expect(alg.MCIsFullExpandedNode(exampleExpandedNode.children[0])).toBe(false);
      
    });

    it('MCGetUcb Debe retornar el UCB', function() {
      expect(alg.MCGetUcb(exampleExpandedNode.children[0],exampleExpandedNode,1.41)).toBeCloseTo(1.26, 1);
    });

    it('MTCSearch Debe retornar la mejor jugada', function() {

      expect(alg.MCTSearch(game,exampleNode.state,100)).toBeInstanceOf(Array)
    });
 
 
  });
   
   });

