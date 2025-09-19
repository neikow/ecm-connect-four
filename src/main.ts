import { startPowerFour } from './power-four.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id='game-wrapper' class='flex flex-col items-center justify-center gap-4 min-h-screen bg-background'>
    <h1 class='font-black text-5xl text-(--current-player-color) transition-colors'>
      Connect Four
    </h1>
    <div class='text-neutral-950 font-semibold'>Current Player : <span class='text-(--current-player-color)' id='currentPlayer'></span></div>
    
    <div id='board' class='p-4 border border-neutral-500 shadow-lg rounded-2xl grid grid-cols-(--number-of-cols) gap-2 mt-4'></div>
    
    <div class='h-12 flex flex-col items-center'>
      <button id='reset' class='mt-4 px-4 py-2 bg-red-400 text-white rounded cursor-pointer'>Reset Game</button>  
      <div id='status' class='mt-4 text-lg font-semibold'></div>  
    </div>
  </div>
`
startPowerFour()
