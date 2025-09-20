import { startPowerFour } from './power-four.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id='game-wrapper' class='grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 items-center justify-center gap-4 min-h-screen bg-(--current-player-color)/10 transition-colors'>
    <div class='col-span-1 hidden xl:block'></div>
    <div class='col-span-4'>
      <div class='mb-16 mx-12'>
        <h1 class='font-black text-7xl text-(--current-player-color) transition-colors tracking-tighter'>
          Connect Four
        </h1>
        <div class='text-neutral-950 font-semibold'>Current Player : <span class='text-(--current-player-color) text-xl' id='currentPlayer'></span></div>
        
      </div>
      
      <div class='w-max mx-auto'>
        <div id='board' class='p-2 md:p-4 border bg-white border-neutral-500 shadow-lg rounded-2xl grid grid-cols-(--number-of-cols) gap-1 md:gap-2 mt-4'></div>
      </div>
            
      <div class='h-32 flex flex-col items-center'>
        <button id='reset' class='mt-4 px-4 py-2 bg-red-400 text-white rounded cursor-pointer'>Reset Game</button>  
        <div id='status' class='mt-4 text-lg font-semibold'></div>  
      </div>
    </div>
    <div class='col-span-4 lg:col-span-2 mx-4 xl:mx-8'>
      <div class='p-4 border bg-white border-neutral-500 shadow-lg rounded-2xl max-h-72 max-w-xl mx-auto flex flex-col'>
        <div class='flex justify-between items-center mb-4'>
           <h2 class='text-(--current-player-color) transition-colors font-black text-xl tracking-tighter'>
              Previous games    
           </h2>
           
           <div class='flex items-center gap-2'>
              <span id='player1Wins' class='text-(--color-primary) font-semibold'>0</span>
              - 
              <span id='player2Wins' class='text-(--color-secondary) font-semibold'>0</span>
              -
              <span id='draws' class='font-semibold text-neutral-500'>0</span>
           </div>
        </div>
        <div id='history' class='flex flex-col gap-2 justify-center items-center flex-nowrap flex-1 overflow-y-auto'>
            <span class='text-neutral-500'>No previous games</span>
        </div>
      </div>
      <div>
      <button id='resetHistory' class='mt-4 px-4 py-2 text-red-400 hover:text-red-600 transition-colors rounded cursor-pointer w-full'>Reset History</button>
      </div>
    </div>
  </div>
`
startPowerFour()
