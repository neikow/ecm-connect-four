import JSConfetti from 'js-confetti'

const COLS = 7
const ROWS = 6

const WIN_CONDITION = 4

const CELL_EMPTY = 0
const CELL_PLAYER1 = 1
const CELL_PLAYER2 = 2

const PLAYER_1_TEXT_CLASS = 'text-primary'
const PLAYER_2_TEXT_CLASS = 'text-secondary'
const TEXT_DEFAULT_CLASS = 'text-white'

const PLAYER_1_BG_CLASS = 'cell-player-1'
const PLAYER_2_BG_CLASS = 'cell-player-2'

const BG_DEFAULT_CLASS = 'bg-white'

let currentPlayer = CELL_PLAYER1

const DEFAULT_CELL_CLASSES = 'w-16 h-16 flex items-center justify-center rounded-full'
const WINNING_CELL_CLASSES = ['ring', 'ring-yellow-400', 'ring-4']

type Board = number[][]
type Coordinates = [number, number]

export function updateStatus(status: 'player1' | 'player2' | 'draw' | '') {
  const statusDiv = document.getElementById('status')
  if (!statusDiv)
    throw new Error('Status div not found')

  if (status === 'player1') {
    statusDiv.textContent = 'Player 1 wins!'
    statusDiv.classList.remove(PLAYER_2_TEXT_CLASS, TEXT_DEFAULT_CLASS)
    statusDiv.classList.add(PLAYER_1_TEXT_CLASS)
  }
  else if (status === 'player2') {
    statusDiv.textContent = 'Player 2 wins!'
    statusDiv.classList.remove(PLAYER_1_TEXT_CLASS, TEXT_DEFAULT_CLASS)
    statusDiv.classList.add(PLAYER_2_TEXT_CLASS)
  }
  else if (status === 'draw') {
    statusDiv.textContent = 'Game is a draw!'
    statusDiv.classList.add(TEXT_DEFAULT_CLASS)
    statusDiv.classList.remove(PLAYER_1_TEXT_CLASS, PLAYER_2_TEXT_CLASS)
  }
  else {
    statusDiv.textContent = ''
    statusDiv.classList.remove(PLAYER_1_TEXT_CLASS, PLAYER_2_TEXT_CLASS)
  }
}

export function resetGame() {
  initGame()
}

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

function drawBoard(board: Board): HTMLDivElement {
  const boardDiv = document.getElementById('board') as HTMLDivElement | null
  if (!boardDiv)
    throw new Error('Board div not found')

  boardDiv.innerHTML = ''
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const cell = document.createElement('button')

      cell.dataset.row = r.toString()
      cell.dataset.col = c.toString()

      cell.className = 'w-16 h-16 border border-gray-400 flex items-center justify-center cursor-pointer shadow-inner'
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

function toggleResetVisibility(visible: boolean) {
  const resetButton = document.getElementById('reset')
  if (!resetButton)
    throw new Error('Reset button not found')

  resetButton.style.display = visible ? 'block' : 'none'
}

function updateCurrentPlayerDisplay(player: number) {
  const currentPlayerSpan = document.getElementById('currentPlayer')
  if (!currentPlayerSpan)
    throw new Error('Current player span not found')

  const gameWrapper = document.getElementById('game-wrapper')
  gameWrapper?.style.setProperty('--current-player-color', player === CELL_PLAYER1 ? 'var(--color-primary)' : 'var(--color-secondary)')

  const websiteIcon = document.querySelector('link[rel~=\'icon\']') as HTMLLinkElement | null
  if (websiteIcon) {
    websiteIcon.href = player === CELL_PLAYER1 ? 'player1.svg' : 'player2.svg'
  }

  const websiteTitle = document.querySelector('title') as HTMLTitleElement | null
  if (websiteTitle) {
    websiteTitle.textContent = player === CELL_PLAYER1 ? 'Player 1\'s turn - Connect Four' : 'Player 2\'s turn - Connect Four'
  }

  currentPlayerSpan.textContent = player === CELL_PLAYER1 ? 'Player 1' : 'Player 2'
}

function updateCellButton(row: number, col: number, value: number, boardContainer: HTMLDivElement) {
  const cell = boardContainer.querySelector(`button[data-row='${row}'][data-col='${col}']`)
  if (!cell)
    return
  cell.className = DEFAULT_CELL_CLASSES
  cell.classList.remove(PLAYER_1_BG_CLASS, PLAYER_2_BG_CLASS, BG_DEFAULT_CLASS)
  if (value === CELL_PLAYER1) {
    cell.classList.add(PLAYER_1_BG_CLASS)
  }
  else if (value === CELL_PLAYER2) {
    cell.classList.add(PLAYER_2_BG_CLASS)
  }
  else {
    cell.classList.add(BG_DEFAULT_CLASS)
  }
}

const eventListeners: [HTMLDivElement, () => void][] = []

function removeClickListeners() {
  eventListeners.forEach(([cell, cb]) => {
    cell.removeEventListener('click', cb)
  })
}

function handleWinner(result: { winner: number, winningCells: Coordinates[] }, boardContainer: HTMLDivElement) {
  updateStatus(result.winner === CELL_PLAYER1 ? 'player1' : 'player2')

  toggleResetVisibility(true)

  for (const [wr, wc] of result.winningCells) {
    const winningCell = boardContainer.querySelector(`button[data-row='${wr}'][data-col='${wc}']`)
    if (winningCell) {
      winningCell.classList.add(...WINNING_CELL_CLASSES)
    }
  }

  const confettis = new JSConfetti()
  confettis.addConfetti({
    emojis: ['🎉', '✨', '🥳', '🏆', '🎊'],
    emojiSize: 100,
    confettiNumber: 60,
  })

  removeClickListeners()
}

function handleDraw() {
  updateStatus('draw')
  toggleResetVisibility(true)
  removeClickListeners()
}

function handlePlacement(board: Board, col: number): number | null {
  let placedRow = -1
  for (let r = board.length - 1; r >= 0; r--) {
    if (board[r][col] === CELL_EMPTY) {
      board[r][col] = currentPlayer
      placedRow = r
      break
    }
  }
  return placedRow === -1 ? null : placedRow
}

function hasDraw(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== CELL_EMPTY))
}

function createClickHandler(cell: Element, board: number[][], boardContainer: HTMLDivElement) {
  return () => {
    const col = Number.parseInt((cell as HTMLDivElement).dataset.col || '0', 10)
    const placedRow = handlePlacement(board, col)
    if (placedRow === null) {
      return
    }
    updateCellButton(placedRow, col, currentPlayer, boardContainer)

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

    currentPlayer = currentPlayer === CELL_PLAYER1 ? CELL_PLAYER2 : CELL_PLAYER1
    updateCurrentPlayerDisplay(currentPlayer)
  }
}

function addClickListeners(board: number[][], boardContainer: HTMLDivElement) {
  for (const cell of boardContainer.children) {
    const handler = createClickHandler(cell, board, boardContainer)
    cell.addEventListener('click', handler)
    eventListeners.push([cell as HTMLDivElement, handler])
  }
}

function addResetListener() {
  const resetButton = document.getElementById('reset')
  if (!resetButton)
    throw new Error('Reset button not found')

  resetButton.addEventListener('click', resetGame)
}

function addHoverEffect(boardContainer: HTMLDivElement) {
  const classes = ['ring', 'ring-2', 'ring-(--current-player-color)']
  for (const cell of boardContainer.children) {
    const div = cell as HTMLDivElement
    const col = Number.parseInt(div.dataset.col || '0', 10)
    div.addEventListener('mouseenter', () => {
      document.querySelectorAll(`button[data-col='${col}']`).forEach((cell) => {
        if (cell.classList.contains(PLAYER_1_BG_CLASS) || cell.classList.contains(PLAYER_2_BG_CLASS))
          return
        cell.classList.add(...classes)
      })
    })
    div.addEventListener('mouseleave', () => {
      document.querySelectorAll(`button[data-col='${col}']`).forEach((cell) => {
        cell.classList.remove(...classes)
      })
    })
  }
}

function initGame() {
  currentPlayer = CELL_PLAYER1
  updateStatus('')

  const gameWrapper = document.getElementById('game-wrapper')
  gameWrapper?.style.setProperty('--number-of-cols', `repeat(${COLS}, minmax(0, 1fr))`)

  const board = generateEmptyBoardData()

  updateCurrentPlayerDisplay(currentPlayer)

  const boardContainer = drawBoard(board)

  addClickListeners(board, boardContainer)
  addHoverEffect(boardContainer)
  toggleResetVisibility(false)
}

export function startPowerFour() {
  initGame()

  addResetListener()
}
