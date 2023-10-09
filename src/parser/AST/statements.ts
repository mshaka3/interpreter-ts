import { Token } from '../../types'
import {
  ExpressionStatement,
  Identifier,
  LetStatement,
  ReturnStatement,
  Expression,
  BlockStatment,
  Statement
} from '../types'
import { identifier } from './expressions'

export function letStatement(token: Token, name: Identifier): LetStatement {
  var value = identifier(token, '')

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

export function returnStatement(token: Token, returnValue: Expression | null): ReturnStatement {
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

export function expressionStatement(token: Token, expression: Expression | null): ExpressionStatement {
  function tokenLiteral() {
    return token.literal
  }

  function print() {
    if (expression) {
      return expression.print()
    } else {
      return ''
    }
  }

  return { type: 'EXPRESSION_STATEMENT', token, expression, tokenLiteral, print }
}

export function blockStatment(token: Token): BlockStatment {
  var statements: Statement[] = []

  function tokenLiteral() {
    return token.literal
  }

  function print() {
    var out = ''
    for (const s of statements) {
      out = out + s.print()
    }
    return out
  }

  return { type: 'BLOCK_STATEMENT', print, statements, tokenLiteral, token }
}
