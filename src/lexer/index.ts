import { MAP_TOKWN_TYPE_LETIERAL } from "../constants"
import { Token, TokenType } from "../types"

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
            if (readLetter(char)) {
                const currPosition = postion
                while (readLetter(char)) {
                    readChar()
                }

                const word = input.slice(currPosition, postion)
                token = word in MAP_TOKWN_TYPE_LETIERAL ? createToken(MAP_TOKWN_TYPE_LETIERAL[word], word) : createToken('IDENT', word)
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
            char = "\0"
        } else {
            char = input[readPosition]
        }

        postion = readPosition
        readPosition++

    }

    function peekChar() {
        if (readPosition >= input.length) {
            return "\0"
        } else {
            return input[readPosition]
        }
    }

    return {
        getNextToken
    }

    function readLetter(char: string): boolean {
        const charCode = char.charCodeAt(0)
        return "a".charCodeAt(0) < charCode && "z".charCodeAt(0) >= charCode || "A".charCodeAt(0) <= charCode && "z".charCodeAt(0) >= charCode || charCode === "_".charCodeAt(0)
    }

    function readNumber(char: string): boolean {
        const charCode = char.charCodeAt(0);
        return '0'.charCodeAt(0) <= charCode && '9'.charCodeAt(0) >= charCode;
    }
    function createToken(tokenType: TokenType, tokenLiteral: string) {
        return { type: tokenType, literal: tokenLiteral }
    }

    function skipWhiteSpace(char: string): boolean {
        return [" ", "\t", "\n", "\r"].includes(char)
    }

}

