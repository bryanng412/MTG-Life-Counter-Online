export type CommanderDamage = {
  [id: string]: number
}

export type Player = {
  id: string
  room: string
  name: string
  life: number
  cmdrDmg: CommanderDamage
}

export enum EVENT {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  UPDATE_PLAYERS_ORDER = 'UPDATE_PLAYERS_ORDER',
  UPDATE_PLAYERS = 'UPDATE_PLAYERS',
  UPDATE_SINGLE_PLAYER = 'UPDATE_SINGLE_PLAYER',
  RESET = 'RESET',
  PULSE = 'PULSE',
}

type BaseGameEvent = {
  event: EVENT
  room: string
}

export type SendGameEvent = BaseGameEvent & {
  id: string
  payload: SendGamePayload
}

export type ReceiveGameEvent = BaseGameEvent & {
  payload: ReceiveGamePayload
}

export type SendGamePayload = {
  message?: string
  players: Player[]
}

export type ReceiveGamePayload = {
  players?: string[]
} & { [Key in keyof Player]?: Player[Key] }
