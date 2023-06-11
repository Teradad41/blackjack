export const STARTPAGE = document.getElementById('startPage')
export const MAINFIELD = document.getElementById('mainPage')
export const HOUSECARD = document.getElementById('houseCardDiv')
export const STATUSCOLOR: { [key: string]: string } = {
  SURRENDER: 'bg-red-700',
  STAND: 'bg-green-700',
  HIT: 'bg-yellow-400',
  DOUBLE: 'bg-blue-700',
  BUST: 'bg-pink-800',
  BROKEN: 'bg-black',
  BLACKJACK: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  'ON TURN': 'bg-lime-500',
}
export function DELAY(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
