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
        <div id='history' class='flex flex-col gap-2 flex-nowrap items-center flex-1 overflow-y-auto'>
            <span class='text-neutral-500'>No previous games</span>
        </div>
      </div>
      <div>
      <button id='resetHistory' class='mt-4 px-4 py-2 text-red-400 hover:text-red-600 transition-colors rounded cursor-pointer w-full'>Reset History</button>
      </div>
    </div>
    <a
      aria-label="View source on GitHub"
      class="fixed bottom-6 right-6 z-50 bg-white rounded-full shadow-lg p-2 text-gray-800 hover:bg-gray-100 hover:text-(--current-player-color) transition flex items-center justify-center"
      href="https://github.com/neikow/ecm-connect-four"
      rel="noopener"
      target="_blank"
    >
      <svg aria-hidden="true" fill="currentColor" height="32" viewBox="0 0 16 16" width="32">
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
          -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2
          -3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64
          -.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
          2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
          1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    </a>
  </div>
`
startPowerFour()
