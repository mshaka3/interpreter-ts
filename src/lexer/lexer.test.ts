import { test, expect } from 'vitest'
import { TokenType } from '../types'

import { lexer } from '../lexer'

test("test getNextToken fnc", function() {
    const input = '=+(){},;'

    const tokens: TokenType[] = [
        'ASSIGN',
        'PLUS',
        'LPAREN',
        'RPAREN',
        'LBRACE',
        'RBRACE',
        'COMMA',
        'SEMICOLON',
        'EOF',
    ]

    const { getNextToken } = lexer(input)

    for (const token of tokens) {
        expect(getNextToken().type).toBe(token)
    }

})

test("test  getNextToken fnc with monkey code", function() {
    const input = `let five = 5;
    let ten = 10;
    let add = function(x, y) {
        x + y;
    };
    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;

    if(5 < 10) {
        return true
    } else {
        return false
    }

    10 == 10;
    10 != 9;
    `


    const tokens: TokenType[] = [
        'LET',
        'IDENT',
        'ASSIGN',
        'INT',
        'SEMICOLON',
        'LET',
        'IDENT',
        'ASSIGN',
        'INT',
        'SEMICOLON',
        'LET',
        'IDENT',
        'ASSIGN',
        'FUNCTION',
        'LPAREN',
        'IDENT',
        'COMMA',
        'IDENT',
        'RPAREN',
        'LBRACE',
        'IDENT',
        'PLUS',
        'IDENT',
        'SEMICOLON',
        'RBRACE',
        'SEMICOLON',
        'LET',
        'IDENT',
        'ASSIGN',
        'IDENT',
        'LPAREN',
        'IDENT',
        'COMMA',
        'IDENT',
        'RPAREN',
        'SEMICOLON',
        'BANG',
        'MINUS',
        'SLASH',
        'ASTERISK',
        'INT',
        'SEMICOLON',
        'INT',
        'LT',
        'INT',
        'GT',
        'INT',
        'SEMICOLON',
        'IF',
        'LPAREN',
        'INT',
        'LT',
        'INT',
        'RPAREN',
        'LBRACE',
        'RETURN',
        'TRUE',
        'RBRACE',
        'ELSE',
        'LBRACE',
        'RETURN',
        'FALSE',
        'RBRACE',
        'INT',
        'EQ',
        'INT',
        'SEMICOLON',
        'INT',
        'NEQ',
        'INT',
        'SEMICOLON',
        'EOF',
    ]


    const { getNextToken } = lexer(input)

    for (const token of tokens) {
        expect(getNextToken().type).toBe(token)
    }
})
