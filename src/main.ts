import { startPowerFour } from './power-four.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class='flex flex-col items-center justify-center gap-4 min-h-screen bg-background'>
    <h1 class='font-bold text-3xl bg-linear-to-r/srgb from-primary to-secondary bg-clip-text text-transparent'>
      Connect Four
    </h1>
    <div class='text-white font-semibold'>Current Player : <span id='currentPlayer'></span></div>
    
    <div id='board' class='grid grid-cols-7 gap-2 mt-4'></div>
    
    <div class='h-12 flex flex-col items-center'>
      <button id='reset' class='mt-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer'>Reset Game</button>  
      <div id='status' class='mt-4 text-lg font-semibold'></div>  
    </div>
  </div>
`
startPowerFour()
