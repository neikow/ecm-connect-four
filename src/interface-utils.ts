import JSConfetti from 'js-confetti'
import { CELL_PLAYER1, CELL_PLAYER2 } from './consts.ts'
import {
  BG_DEFAULT_CLASS,
  PLAYER_1_BG_CLASS,
  PLAYER_1_TEXT_CLASS,
  PLAYER_2_BG_CLASS,
  PLAYER_2_TEXT_CLASS,
  TEXT_DEFAULT_CLASS,
} from './styles.ts'

export function updateWebsiteIcon(iconUrl: string) {
  const websiteIcon = document.querySelector('link[rel~=\'icon\']') as HTMLLinkElement | null
  if (websiteIcon) {
    websiteIcon.href = iconUrl
  }
}

export function updateWebsiteTitle(title: string) {
  const websiteTitle = document.querySelector('title') as HTMLTitleElement | null
  if (websiteTitle) {
    websiteTitle.textContent = title
  }
}

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

export function setCellColor(cell: HTMLButtonElement, value: number) {
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

export function drawConfetti() {
  const confetti = new JSConfetti()
  confetti.addConfetti({
    emojis: ['🎉', '✨', '🥳', '🏆', '🎊'],
    emojiSize: 100,
    confettiNumber: 60,
  })
}

export function addHoverEffect(boardContainer: HTMLDivElement) {
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
