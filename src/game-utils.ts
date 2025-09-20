import type { Board } from './types.ts'
import { CELL_EMPTY, COLS, ROWS } from './consts.ts'

export function generateEmptyBoardData(): Board {
  const board: Board = []
  for (let r = 0; r < ROWS; r++) {
    const row: number[] = []
    for (let c = 0; c < COLS; c++) {
      row.push(CELL_EMPTY)
    }
    board.push(row)
  }
  return board
}
