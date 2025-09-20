import { PLAYER_1_TEXT_CLASS, PLAYER_2_TEXT_CLASS, TEXT_DEFAULT_CLASS } from './styles.ts'

export function saveGameResult(winner: 'player1' | 'player2' | 'draw') {
  const history = JSON.parse(localStorage.getItem('powerFourHistory') || '[]') as {
    date: string
    winner: 'player1' | 'player2' | 'draw'
  }[]

  history.unshift({
    date: new Date().toISOString(),
    winner,
  })

  if (history.length > 20) {
    history.pop()
  }

  localStorage.setItem('powerFourHistory', JSON.stringify(history))
}

export function syncScoreboard() {
  const history = JSON.parse(localStorage.getItem('powerFourHistory') || '[]') as {
    date: string
    winner: 'player1' | 'player2' | 'draw'
  }[]

  const player1Wins = history.filter(game => game.winner === 'player1').length
  const player2Wins = history.filter(game => game.winner === 'player2').length
  const draws = history.filter(game => game.winner === 'draw').length

  const player1WinsSpan = document.getElementById('player1Wins')
  const player2WinsSpan = document.getElementById('player2Wins')
  const drawsSpan = document.getElementById('draws')

  if (!player1WinsSpan || !player2WinsSpan || !drawsSpan)
    throw new Error('Scoreboard spans not found')

  player1WinsSpan.textContent = player1Wins.toString()
  player2WinsSpan.textContent = player2Wins.toString()
  drawsSpan.textContent = draws.toString()
}

export function syncHistory() {
  const historyDiv = document.getElementById('history')
  if (!historyDiv)
    throw new Error('History div not found')

  const history = JSON.parse(localStorage.getItem('powerFourHistory') || '[]') as {
    date: string
    winner: 'player1' | 'player2' | 'draw'
  }[]

  if (history.length === 0) {
    historyDiv.innerHTML = 'No previous games'
    return
  }

  historyDiv.innerHTML = ''
  for (const game of history) {
    const winnerColorClass = game.winner === 'draw'
      ? TEXT_DEFAULT_CLASS
      : game.winner === 'player1'
        ? PLAYER_1_TEXT_CLASS
        : PLAYER_2_TEXT_CLASS
    const gameDiv = document.createElement('div')

    const date = new Date(game.date)
    const dateString = date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    gameDiv.classList.add('flex', 'justify-between', 'w-full', 'items-center', 'border-b', 'border-neutral-300', 'pb-1')

    gameDiv.innerHTML = `
      <span class="font-black ${winnerColorClass}">${game.winner === 'draw' ? 'Draw' : game.winner === 'player1' ? 'Player 1' : 'Player 2'}</span>
      <span class="text-neutral-500 text-xs">${dateString}</span>     
    `

    historyDiv.appendChild(gameDiv)
  }
}

export function addResetHistoryListener() {
  const resetHistoryButton = document.getElementById('resetHistory')
  if (!resetHistoryButton)
    throw new Error('Reset history button not found')

  resetHistoryButton.addEventListener('click', () => {
    // eslint-disable-next-line no-alert
    if (!confirm('Are you sure you want to reset the game history? This action cannot be undone.'))
      return

    localStorage.removeItem('powerFourHistory')
    syncHistory()
    syncScoreboard()
  })
}
