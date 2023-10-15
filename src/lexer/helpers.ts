import { TokenType } from './types'

export function createToken(tokenType: TokenType, tokenLiteral: string) {
  return { type: tokenType, literal: tokenLiteral }
}

export function skipWhiteSpace(char: string): boolean {
  return [' ', '\t', '\n', '\r'].includes(char)
}

export function readLetter(char: string): boolean {
  const charCode = char.charCodeAt(0)
  return (
    (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) ||
    ('A'.charCodeAt(0) <= charCode && 'Z'.charCodeAt(0) >= charCode) ||
    charCode === '_'.charCodeAt(0)
  )
}

export function readNumber(char: string): boolean {
  const charCode = char.charCodeAt(0)
  return '0'.charCodeAt(0) <= charCode && '9'.charCodeAt(0) >= charCode
}
