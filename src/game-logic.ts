import type { Board, Coordinates } from './types.ts'
import { CELL_EMPTY, CELL_PLAYER1, CELL_PLAYER2, WIN_CONDITION } from './consts.ts'
import { saveGameResult, syncHistory, syncScoreboard } from './game-history.ts'
import {
  playDrawSound,
  playFallSound,
  playWinnerSound,
  toggleResetVisibility,
  updateCellButton,
  updateCurrentPlayerDisplay,
} from './game-interface.ts'
import { drawConfetti, updateStatus, updateWebsiteTitle } from './interface-utils.ts'
import { WINNING_CELL_CLASSES } from './styles.ts'

export function hasWinner(board: Board): {
  winner: number
  winningCells: Coordinates[]
} | null {
  const ROWS = board.length
  const COLS = board[0].length

  const directions = [
    { dRow: 0, dCol: 1 }, // Horizontal
    { dRow: 1, dCol: 0 }, // Vertical
    { dRow: 1, dCol: 1 }, // Diagonal down-right
    { dRow: 1, dCol: -1 }, // Diagonal down-left
  ]

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c]
      if (cell === CELL_EMPTY)
        continue

      for (const { dRow, dCol } of directions) {
        const winningCells: Coordinates[] = [[r, c]]
        let nr = r + dRow
        let nc = c + dCol

        while (
          nr >= 0 && nr < ROWS
          && nc >= 0 && nc < COLS
          && board[nr][nc] === cell
        ) {
          winningCells.push([nr, nc])
          if (winningCells.length === WIN_CONDITION) {
            return { winner: cell, winningCells }
          }
          nr += dRow
          nc += dCol
        }
      }
    }
  }

  return null
}

export function hasDraw(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== CELL_EMPTY))
}

export function handleWinner(result: { winner: number, winningCells: Coordinates[] }, boardContainer: HTMLDivElement) {
  updateStatus(result.winner === CELL_PLAYER1 ? 'player1' : 'player2')
  updateWebsiteTitle(result.winner === CELL_PLAYER1 ? 'Player 1 wins! - Connect Four' : 'Player 2 wins! - Connect Four')

  toggleResetVisibility(true)

  for (const [wr, wc] of result.winningCells) {
    const winningCell = boardContainer.querySelector(`button[data-row='${wr}'][data-col='${wc}']`)
    if (winningCell) {
      winningCell.classList.add(...WINNING_CELL_CLASSES)
    }
  }

  drawConfetti()
  saveGameResult(result.winner === CELL_PLAYER1 ? 'player1' : 'player2')
  syncHistory()
  syncScoreboard()

  playWinnerSound()

  removeClickListeners()
}

export function handleDraw() {
  updateStatus('draw')
  toggleResetVisibility(true)

  saveGameResult('draw')
  syncHistory()
  syncScoreboard()

  playDrawSound()

  removeClickListeners()
}

const eventListeners: [HTMLDivElement, () => void][] = []

export function addClickListeners(board: number[][], boardContainer: HTMLDivElement) {
  for (const cell of boardContainer.children) {
    const handler = createClickHandler(cell, board, boardContainer)
    cell.addEventListener('click', handler)
    eventListeners.push([cell as HTMLDivElement, handler])
  }
}

function removeClickListeners() {
  eventListeners.forEach(([cell, cb]) => {
    cell.removeEventListener('click', cb)
  })
}

export function handlePlacement(board: Board, col: number): number | null {
  let placedRow = -1
  for (let r = board.length - 1; r >= 0; r--) {
    if (board[r][col] === CELL_EMPTY) {
      board[r][col] = window.currentPlayer
      placedRow = r
      break
    }
  }
  return placedRow === -1 ? null : placedRow
}

export function createClickHandler(cell: Element, board: number[][], boardContainer: HTMLDivElement) {
  return () => {
    const col = Number.parseInt((cell as HTMLDivElement).dataset.col || '0', 10)
    const placedRow = handlePlacement(board, col)
    if (placedRow === null) {
      return
    }

    playFallSound()

    updateCellButton(placedRow, col, window.currentPlayer, boardContainer)

    const result = hasWinner(board)
    if (result) {
      handleWinner(result, boardContainer)
      return
    }

    const isDraw = hasDraw(board)
    if (isDraw) {
      handleDraw()
      return
    }

    window.currentPlayer = window.currentPlayer === CELL_PLAYER1 ? CELL_PLAYER2 : CELL_PLAYER1
    updateCurrentPlayerDisplay(window.currentPlayer)
  }
}
