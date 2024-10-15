/**
 * @vitest-environment jsdom
 */

import {describe, expect, test, it, vi, beforeEach } from "vitest";

import * as alg from "../src/algoritmos.js"

const initial_state = [[0,0,0],[0,0,0],[0,0,0]];
const example_state = [[0,1,0],[0,-1,0],[0,0,0]];
const full_state = [[-1,1,-1],[1,-1,1],[1,-1,1]];
const win_state = [[-1,1,-1],[1,-1,1],[-1,-1,1]];

describe('3 en raya', function() {
    describe('Funciones del juego', function() {
      test('TicTacToeGetInitialState Debe retornar un array 3x3 de 0s', function() {
        expect(alg.TicTacToeGetInitialState()).toEqual(initial_state)
        });
      test('TicTacToeGetNextState Debe retornar una copia con la jugada', function() {
        expect(alg.TicTacToeGetNextState(initial_state,2,1)).toEqual([[0,0,1],[0,0,0],[0,0,0]]);
        expect(alg.TicTacToeGetNextState(initial_state,3,-1)).toEqual([[0,0,0],[-1,0,0],[0,0,0]]);
        expect(alg.TicTacToeGetNextState(initial_state,2,1)).not.toBe(initial_state);
        });
      test('TicTacToeGetValidMoves Debe retornar la lista de posibles accions', function() {
          expect(alg.TicTacToeGetValidMoves(initial_state)).toEqual([1,1,1,1,1,1,1,1,1]);
          expect(alg.TicTacToeGetValidMoves(example_state)).toEqual([1,0,1,1,0,1,1,1,1]);
          expect(alg.TicTacToeGetValidMoves(full_state)).toEqual([0,0,0,0,0,0,0,0,0]);
        });

        test('TicTacToeCheckWin Debe retornar si ha ganado o no el jugador', function() {
          expect(alg.TicTacToeCheckWin(example_state,1)).toBe(false);
          expect(alg.TicTacToeCheckWin(full_state,1)).toBe(false);
          expect(alg.TicTacToeCheckWin(full_state,2)).toBe(false);
          expect(alg.TicTacToeCheckWin(win_state,4)).toBe(true);
          expect(alg.TicTacToeCheckWin(win_state,1)).toBe(false);
        });

        test('TicTacToeGetWinAndTerminated Debe retornar si ha ganado o no el jugador y si la partida a acabado', function() {
          expect(alg.TicTacToeGetWinAndTerminated(example_state,1)).toEqual({win:0,terminated: false});
          expect(alg.TicTacToeGetWinAndTerminated(full_state,1)).toEqual({win:0,terminated: true});
          expect(alg.TicTacToeGetWinAndTerminated(win_state,4)).toEqual({win:1,terminated: true});
        });
        test('TicTacToeChangePerspective Debe retornar el juego invertido', function() {
          //console.log(alg.TicTacToeChangePerspective(example_state));
          expect(alg.TicTacToeChangePerspective(example_state)).toEqual([[0,-1,0],[0,1,0],[0,0,0]]);
           });
    });
    describe('Juego completo', function() {
      test('Debe completar un juego completo', function() {
      const move_list = [4,0,1,7,2,8,6]
      let state = alg.TicTacToeGetInitialState();
      let player = 1;
      for (let move of move_list){
        state = alg.TicTacToeGetNextState(state,move,player);
        player = alg.TicTacToeChangePlayer(player);
      }
      expect(state).toEqual([[-1,1,1],[0,1,0],[1,-1,-1]]);
      expect(alg.TicTacToeCheckWin(state,move_list.at(-1))).toBe(true);
      expect(alg.TicTacToeGetWinAndTerminated(state,move_list.at(-1))).toEqual({win:1, terminated: true});
      });
    });
   });


describe('Montecarlo', function() {
  const game = {
    moveSize: 9,
    getValidMoves: alg.TicTacToeGetValidMoves,
    getInitialState: alg.TicTacToeGetInitialState,
    getNextState: alg.TicTacToeGetNextState,
    changePerspective: alg.TicTacToeChangePerspective,
    getWinAndTerminated: alg.TicTacToeGetWinAndTerminated,
    changePlayer: alg.TicTacToeChangePlayer
  }
  const exampleNode = {
    state: [[0,-1,0],[0,1,0],[0,0,0]],
    moveTaken: 1,
    value: 0,
    visits: 0,
    expandableMoves: [1,0,1, 1,0,1, 1,1,1],
    parent: null,
    player: -1,
    children: []
  }
  const exampleExpandedNode = {
    state: [[-1,1,-1],[1,-1,1],[1,-1,0]],
    moveTaken: 1,
    value: 2,
    visits: 5,
    expandableMoves: [0,0,0, 0,0,0, 0,0,0],
    parent: null,
    player: -1,
    children: [
      {
        state: [[1,-1,1],[-1,1,-1],[-1,1,-1]],
        moveTaken: 8,
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

      test('MCGetRandomMove Debe retornar un movimiento válido aleatorio', function() {
        expect(alg.MCGetRandomMove([0,0,1,0])).toBe(2);
        for(let i=0; i<10; i++){
          expect(alg.MCGetRandomMove(exampleNode.expandableMoves)).not.toBe(1);
          expect(alg.MCGetRandomMove(exampleNode.expandableMoves)).not.toBe(4);
        }

      });
      test('MCExpandNode Debe retornar el nodo expandido', function() {
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
        console.log(exampleNodeCopy);
        // Crea un nodo hijo
        expect(exampleNodeCopy.children.length).toBe(1);
        // El nodo padre tiene un expandableMoves menos 
        expect(exampleNodeCopy.expandableMoves.filter(m => m===1).length).toBe(6);
        // El nodo hijo tiene expandableMoves y hay uno menos que en el padre
        expect(exampleNodeCopy.children[0].expandableMoves.filter(m => m===1).length).toBe(6);
        // El nodo hijo tiene state y está invertido respecto al padre
        expect(exampleNodeCopy.children[0].state[0][1]).toBe(-1);
        // En la posición donde se ha elegido hacer el movimiento hay un -1, que es el 1 invertido
        expect(exampleNodeCopy.children[0].state.flat()[exampleNodeCopy.children[0].moveTaken]).toBe(1);
        });
   
  

    test('MCIsFullExpandedNode Debe retornar si está totalmente expandido', function() {
      expect(alg.MCIsFullExpandedNode(exampleNode)).toBe(false);
      expect(alg.MCIsFullExpandedNode(exampleExpandedNode)).toBe(true);
      expect(alg.MCIsFullExpandedNode(exampleExpandedNode.children[0])).toBe(false);
      
    });

    test('MCGetUcb Debe retornar el UCB', function() {
      expect(alg.MCGetUcb(exampleExpandedNode.children[0],exampleExpandedNode,1.41)).toBeCloseTo(1.144, 1);
    });

    test('MCTSelectBestNode Debe retornar el mejor nodo', function() {
      let simplifiedChild = {value: 3, visits: 3, expandableMoves: [0,0,0,0,0,0,0,1,0]};
      let simplifiedNode = {
        value: 3,
        visits: 8,
        expandableMoves: [0,0,0,0,0,0,0,0,0],
        children: [
         simplifiedChild, 
         {value: 1, visits: 2,expandableMoves: [0,0,0,0,0,0,0,0,1]},
         {value: -3, visits: 3, expandableMoves: [0,0,0,1,0,0,0,0,0]},
         {value: -1, visits: 1, expandableMoves: [0,0,0,0,1,0,0,0,0]} 
        ]
      }
      expect(alg.MCTSelectBestNode(simplifiedNode)).toBe(simplifiedChild)
    });


    test('MCSimulate Debe retornar un ganador de la simulación', function() {
      expect([-1,0,1]).toContain(alg.MCSimulate(game)(exampleNode));
    });

    test('MCBackPropagate Debe propagar el resultado de la simulación', function() {
      let simplifiedChildChild = {value: 0, visits: 0};
      let simplifiedChild = {value: 1, visits: 1, children: [{value: 0, visits: 1},simplifiedChildChild]};
      let simplifiedNode = {
        value: 3,
        visits: 8,
        children: [
         simplifiedChild,
         {value: -3, visits: 3}
        ]
      }
      simplifiedChild.parent = simplifiedNode;
      simplifiedChildChild.parent = simplifiedChild;
     
      alg.MCBackPropagate(simplifiedChildChild,1);
      expect([simplifiedNode.value, simplifiedNode.visits]).toEqual([4,9]);
      expect([simplifiedChild.value, simplifiedChild.visits]).toEqual([0,2]);
      expect([simplifiedChildChild.value, simplifiedChildChild.visits]).toEqual([1,1]);
    });

    test('MTCSearch Debe retornar la mejor jugada', function() {
      let wins = alg.MCTSearch(game,exampleNode.state,1000);
      console.log(wins);
      expect(wins).toBeInstanceOf(Array)
    });


 
 
  });

  describe('Juego completo MCTS', function() {
    test('Debe ganar casi siempre las 10 partidas contra un jugador Random', function() {
    let randomPlayer = (game,state,n_searches) => {
      return game.getValidMoves(state).map(m => m*Math.random())
    }
    let MCTSWins = 0;
    for(let i=0; i<10; i++){
    let state = game.getInitialState();
    let players = [alg.MCTSearch, randomPlayer];
    let currentPlayer = 0;
    let winner = 0;
    while (winner === 0){
      let bestMoves = players[currentPlayer](game,state,1000);
      let bestMove = Math.max(...bestMoves);
     // console.log(bestMove, bestMoves);
      bestMove = bestMoves.findIndex(m => m === bestMove);
      state = game.getNextState(state,bestMove,currentPlayer === 0 ? 1 : -1);
      let winAndTerminated = game.getWinAndTerminated(state,bestMove);
      //console.log(winAndTerminated);
      if(winAndTerminated.terminated){
        winner = winAndTerminated.win === 1 ? 1 : -1;
      }
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      console.log(alg.MCStateToString(state));

    }
    MCTSWins = winner === 1 ? MCTSWins+1: MCTSWins;
  }
   
    expect(MCTSWins).toBeCloseTo(10);
    
    });
  });
   
   });

describe('Retos', () => {
  describe('Sencillos', () => {
    test('MiddleOfArray debería retornar de la mitad para adelante de un array', () => {
      const par = [1,2,3,4,5,6];
      const impar = [1,2,3,4,5];
      expect(alg.middleOfArray(par)).toBeInstanceOf(Array);
      expect(alg.middleOfArray(par)).toEqual([4,5,6]);
      expect(alg.middleOfArray(impar)).toEqual([3,4,5]);
      expect(par).toEqual([1,2,3,4,5,6]); // no mutar
    });
    test('sumMultiples debería retornar la suma de los múltiplos', () => {
      const numbers = [3,5];
     expect(alg.sumMultiples(numbers,10)).toBe(23);
     expect(alg.sumMultiples(numbers,16)).toBe(60);
    });
  });
});