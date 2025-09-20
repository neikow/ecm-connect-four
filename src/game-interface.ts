import type { Board } from './types.ts'
import { CELL_PLAYER1, CELL_PLAYER2 } from './consts.ts'
import { setCellColor, updateWebsiteIcon, updateWebsiteTitle } from './interface-utils.ts'
import { DEFAULT_CELL_CLASSES, PLAYER_1_BG_CLASS, PLAYER_2_BG_CLASS } from './styles.ts'

export function drawBoard(board: Board): HTMLDivElement {
  const boardDiv = document.getElementById('board') as HTMLDivElement | null
  if (!boardDiv)
    throw new Error('Board div not found')

  boardDiv.innerHTML = ''
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const cell = document.createElement('button')

      cell.dataset.row = r.toString()
      cell.dataset.col = c.toString()

      cell.className = DEFAULT_CELL_CLASSES
      if (board[r][c] === CELL_PLAYER1) {
        cell.classList.add(PLAYER_1_BG_CLASS, 'rounded-full')
      }
      else if (board[r][c] === CELL_PLAYER2) {
        cell.classList.add(PLAYER_2_BG_CLASS, 'rounded-full')
      }
      else {
        cell.classList.add('rounded-full')
      }
      cell.dataset.row = r.toString()
      cell.dataset.col = c.toString()
      boardDiv.appendChild(cell)
    }
  }

  return boardDiv
}

export function updateCurrentPlayerDisplay(player: number) {
  const currentPlayerSpan = document.getElementById('currentPlayer')
  if (!currentPlayerSpan)
    throw new Error('Current player span not found')

  const gameWrapper = document.getElementById('game-wrapper')
  gameWrapper?.style.setProperty('--current-player-color', player === CELL_PLAYER1 ? 'var(--color-primary)' : 'var(--color-secondary)')

  updateWebsiteIcon(player === CELL_PLAYER1 ? 'player1.svg' : 'player2.svg')
  updateWebsiteTitle(player === CELL_PLAYER1 ? 'Player 1\'s turn - Connect Four' : 'Player 2\'s turn - Connect Four')

  currentPlayerSpan.textContent = player === CELL_PLAYER1 ? 'Player 1' : 'Player 2'
}

export function updateCellButton(row: number, col: number, value: number, boardContainer: HTMLDivElement) {
  const cell = boardContainer.querySelector<HTMLButtonElement>(`button[data-row='${row}'][data-col='${col}']`)
  if (!cell)
    return
  cell.className = DEFAULT_CELL_CLASSES

  setCellColor(cell, value)
}

export function toggleResetVisibility(visible: boolean) {
  const resetButton = document.getElementById('reset')
  if (!resetButton)
    throw new Error('Reset button not found')

  resetButton.style.display = visible ? 'block' : 'none'
}
