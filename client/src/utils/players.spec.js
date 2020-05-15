import { toPlayerObj, getUpdatedPlayers } from './players'

const generatePlayer = (id, name, life) => ({ id, name, life })

const exampleOldPlayers = [
  generatePlayer('example_id_4', 'Player 4', 40),
  generatePlayer('example_id_3', 'Player 3', 40),
  generatePlayer('example_id_2', 'Player 2', 40),
  generatePlayer('example_id_1', 'Player 1', 40),
]

const exampleOldPlayerObj = {
  example_id_1: generatePlayer('example_id_1', 'Player 1', 40),
  example_id_2: generatePlayer('example_id_2', 'Player 2', 40),
  example_id_3: generatePlayer('example_id_3', 'Player 3', 40),
  example_id_4: generatePlayer('example_id_4', 'Player 4', 40),
}

const exampleNewPlayers = [
  generatePlayer('example_id_1', 'New Name', 40),
  generatePlayer('example_id_3', 'Player 3', 40),
  generatePlayer('example_id_4', 'Player 4', 20),
  generatePlayer('example_id_5', 'Player 5', 40),
]

const exampleNewPlayerObj = {
  example_id_1: generatePlayer('example_id_1', 'New Name', 40),
  example_id_3: generatePlayer('example_id_3', 'Player 3', 40),
  example_id_4: generatePlayer('example_id_4', 'Player 4', 20),
  example_id_5: generatePlayer('example_id_5', 'Player 5', 40),
}

const exampleUpdatedPlayers = [
  generatePlayer('example_id_4', 'Player 4', 20),
  generatePlayer('example_id_3', 'Player 3', 40),
  generatePlayer('example_id_1', 'New Name', 40),
  generatePlayer('example_id_5', 'Player 5', 40),
]

describe('player utility functions', () => {
  describe('toPlayeObj', () => {
    it('should convert the player array to a object with ids as keys', () => {
      expect(toPlayerObj(exampleOldPlayers)).toEqual(exampleOldPlayerObj)
      expect(toPlayerObj(exampleNewPlayers)).toEqual(exampleNewPlayerObj)
    })

    it('should handle empty arrays', () => {
      expect(toPlayerObj([])).toEqual({})
    })

    it('should handle null and undefined', () => {
      expect(toPlayerObj(null)).toEqual({})
      expect(toPlayerObj(undefined)).toEqual({})
    })
  })

  describe('getUpdatedPlayers', () => {
    it('should return an updated list of players', () => {
      expect(getUpdatedPlayers(exampleOldPlayers, exampleNewPlayers)).toEqual(
        exampleUpdatedPlayers
      )
    })
  })
})
