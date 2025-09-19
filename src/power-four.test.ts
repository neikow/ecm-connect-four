import { describe, expect, it } from 'vitest'
import { generateEmptyBoardData } from './power-four.ts'

describe('generateBoardData', () => {
  it('should generate a 6x7 board initialized with zeros', () => {
    const expectedBoard = Array.from({ length: 6 }).fill(null).map(() => Array.from({ length: 7 }).fill(0))

    expect(
      generateEmptyBoardData(),
    ).toStrictEqual(
      expectedBoard,
    )
  })
})
