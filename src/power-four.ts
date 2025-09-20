import { CELL_PLAYER1, CELL_PLAYER2, COLS } from './consts.ts'
import { addResetHistoryListener, syncHistory, syncScoreboard } from './game-history.ts'
import { drawBoard, toggleResetVisibility, updateCurrentPlayerDisplay } from './game-interface.ts'
import { addClickListeners } from './game-logic.ts'
import { generateEmptyBoardData } from './game-utils.ts'
import { addHoverEffect, updateStatus } from './interface-utils.ts'

export function resetGame() {
  initGame()
}

function addResetGameListener() {
  const resetButton = document.getElementById('reset')
  if (!resetButton)
    throw new Error('Reset button not found')

  resetButton.addEventListener('click', resetGame)
}

function initGame() {
  window.currentPlayer = Math.random() < 0.5 ? CELL_PLAYER1 : CELL_PLAYER2
  updateStatus('')
  updateCurrentPlayerDisplay(window.currentPlayer)

  const gameWrapper = document.getElementById('game-wrapper')
  gameWrapper?.style.setProperty('--number-of-cols', `repeat(${COLS}, minmax(0, 1fr))`)

  const board = generateEmptyBoardData()
  const boardContainer = drawBoard(board)

  addClickListeners(board, boardContainer)
  addHoverEffect(boardContainer)
  toggleResetVisibility(false)

  syncHistory()
  syncScoreboard()
}

export function startPowerFour() {
  initGame()

  addResetGameListener()
  addResetHistoryListener()
}
