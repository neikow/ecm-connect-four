const PLAYER_1_TEXT_CLASS = 'text-primary'
const PLAYER_2_TEXT_CLASS = 'text-secondary'
const TEXT_DEFAULT_CLASS = 'text-black'

const PLAYER_1_BG_CLASS = 'cell-player-1'
const PLAYER_2_BG_CLASS = 'cell-player-2'

const BG_DEFAULT_CLASS = 'bg-(--current-player-color)/5'

const DEFAULT_CELL_CLASSES = `w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer ${BG_DEFAULT_CLASS} shadow-inner`
const WINNING_CELL_CLASSES = ['ring', 'ring-yellow-400', 'ring-4']

export {
  BG_DEFAULT_CLASS,
  DEFAULT_CELL_CLASSES,
  PLAYER_1_BG_CLASS,
  PLAYER_1_TEXT_CLASS,
  PLAYER_2_BG_CLASS,
  PLAYER_2_TEXT_CLASS,
  TEXT_DEFAULT_CLASS,
  WINNING_CELL_CLASSES,
}
