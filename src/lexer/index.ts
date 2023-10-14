import { MAP_TOKWN_TYPE_LETIERAL } from '../constants'
import { createToken, readLetter, readNumber, skipWhiteSpace } from './helpers'
import { Token } from './types'

export function lexer(input: string) {
  var readPosition = 0
  var postion = 0
  var char: string

  readChar()

  function getNextToken() {
    var token: Token

    while (skipWhiteSpace(char)) {
      readChar()
    }

    if (char in MAP_TOKWN_TYPE_LETIERAL) {
      if ((char == '=' || char == '!') && peekChar() == '=') {
        token = createToken(MAP_TOKWN_TYPE_LETIERAL[char + '='], char + '=')
        readChar()
      } else {
        token = createToken(MAP_TOKWN_TYPE_LETIERAL[char], char)
      }

      readChar()
    } else {
      if (char == '"') {
        const startPosition = postion + 1
        while (true) {
          readChar()
          if (char == '"' || char == '\0') {
            break
          }
        }
        token = createToken('STRING', input.slice(startPosition, postion))
        readChar()
      } else if (readLetter(char)) {
        const currPosition = postion
        while (readLetter(char)) {
          readChar()
        }

        const word = input.slice(currPosition, postion)
        const tokenKey = word in MAP_TOKWN_TYPE_LETIERAL ? MAP_TOKWN_TYPE_LETIERAL[word] : 'IDENT'

        token = createToken(tokenKey, word)
      } else if (readNumber(char)) {
        const currPosition = postion
        while (readNumber(char)) {
          readChar()
        }

        const word = input.slice(currPosition, postion)
        token = createToken('INT', word)
      } else if (char == '\0') {
        token = createToken('EOF', 'EOF')
      } else {
        token = createToken(MAP_TOKWN_TYPE_LETIERAL['ILLEGAL'], 'ILLEGAL')
      }
    }

    return token
  }

  function readChar() {
    if (readPosition >= input.length) {
      char = '\0'
    } else {
      char = input[readPosition]
    }

    postion = readPosition
    readPosition++
  }

  function peekChar() {
    if (readPosition >= input.length) {
      return '\0'
    } else {
      return input[readPosition]
    }
  }

  return {
    getNextToken
  }
}
