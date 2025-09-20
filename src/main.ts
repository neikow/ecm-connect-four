import { startPowerFour } from './power-four.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id='game-wrapper' class='grid grid-cols-7 items-center justify-center gap-4 min-h-screen bg-background'>
    <div class=''></div>
    <div class='col-span-4'>
      <div class='mb-16'>
        <h1 class='font-black text-7xl text-(--current-player-color) transition-colors tracking-tighter'>
          Connect Four
        </h1>
        <div class='text-neutral-950 font-semibold'>Current Player : <span class='text-(--current-player-color) text-xl' id='currentPlayer'></span></div>
        
      </div>
      
      <div class='w-max mx-auto'>
        <div id='board' class='p-4 border border-neutral-500 shadow-lg rounded-2xl grid grid-cols-(--number-of-cols) gap-2 mt-4'></div>
      </div>
            
      <div class='h-12 flex flex-col items-center'>
        <button id='reset' class='mt-4 px-4 py-2 bg-red-400 text-white rounded cursor-pointer'>Reset Game</button>  
        <div id='status' class='mt-4 text-lg font-semibold'></div>  
      </div>
    </div>
    <div class='col-span-2 p-4 border border-neutral-500 shadow-lg rounded-2xl h-64 overflow-y-auto mx-12'>
      <h2 class='text-(--current-player-color) transition-colors font-black text-xl mb-4 tracking-tighter'>
        Previous games    
      </h2>
      <div id='history' class='flex flex-col gap-2'>
        No previous games
      </div>
    </div>
  </div>
`
startPowerFour()
