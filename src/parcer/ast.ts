import { Token } from '../types'
import {
    ExpressionStatement,
    Identifier,
    Node,
    LetStatement,
    Program,
    ReturnStatement,
    Statement,
    IntegerLiteral
} from './types'

export function program(): Program {
    var statements: Statement[] = []

    function tokenLiteral() {
        if (statements.length > 0) {
            return statements[0].tokenLiteral()
        } else {
            return ''
        }
    }

    function print() {
        const out: string[] = []
        for (const s of statements) {
            out.push(s.print())
        }

        return out.join('')
    }

    return {
        type: 'PROGRAM',
        statements,
        tokenLiteral,
        print,
        token: { type: 'ILLEGAL', literal: 'START_OF_PROGRAM' }
    }
}

export function letStatement(token: Token, name: Identifier): LetStatement {
    let value = identifier(token, '')

    function tokenLiteral() {
        return token.literal
    }

    function print() {
        let out = tokenLiteral() + ' ' + name.print() + ' = '

        if (value != null) {
            out = out + value.print()
        }

        return out + ';'
    }

    return {
        type: 'LET_STATEMENT',

        tokenLiteral,
        print,

        get value() {
            return value
        },
        set value(newValue) {
            value = newValue
        },
        token,
        name
    }
}

export function returnStatement(token: Token): ReturnStatement {
    const returnValue = expression(token)

    function tokenLiteral() {
        return token.literal
    }

    function print() {
        let out: string = tokenLiteral() + ' '

        if (returnValue != null) {
            out = out + returnValue.print()
        }

        out = out + ';'

        return out
    }

    return {
        type: 'RETURN_STATEMENT',
        tokenLiteral,
        print,
        token,
        returnValue
    }
}

export function expressionStatement(token: Token): ExpressionStatement {
    const exp = expression(token)

    function tokenLiteral() {
        return token.literal
    }

    function print() {
        if (exp) {
            return exp.print()
        } else {
            return ''
        }
    }

    return { type: 'EXPRESSION_STATEMENT', token, expression: exp, tokenLiteral, print }
}

export function expression(token: Token): Node {
    function tokenLiteral(): string {
        return token.literal
    }

    function print() {
        return ''
    }

    return {
        type: 'EXPRESSION',

        token,
        tokenLiteral,
        print
    }
}

export function identifier(token: Token, value: string): Identifier {
    function tokenLiteral(): string {
        return token.literal
    }

    function print() {
        return value
    }

    return {
        type: 'IDENTIFIER',
        tokenLiteral,
        token,
        print,
        value
    }
}

export function integerLiteral(token: Token, value: bigint): IntegerLiteral {
    function tokenLiteral(): string {
        return token.literal
    }

    function print() {
        return String(value)
    }

    return {
        type: 'INTEGER_LITERAL',
        token,
        tokenLiteral,
        value,
        print
    }
}
