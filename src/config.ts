export const STARTPAGE = document.getElementById('startPage')
export const MAINFIELD = document.getElementById('mainPage')
export const HOUSECARD = document.getElementById('houseCardDiv')
export const STATUSCOLOR: { [key: string]: string } = {
  SURRENDER: 'bg-gradient-to-br from-red-500 via-red-600 to-red-700',
  STAND: 'bg-gradient-to-br from-green-500 via-green-600 to-green-700',
  HIT: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600',
  DOUBLE: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
  BUST: 'bg-gradient-to-br from-pink-700 via-pink-800 to-pink-900',
  BROKEN: 'bg-black',
  BLACKJACK: 'bg-gradient-to-br from-cyan-500 to-blue-500',
  'ON TURN': 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600',
}
export function DELAY(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
