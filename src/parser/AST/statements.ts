import { Token } from '../../lexer/types'
import {
  ExpressionStatement,
  Identifier,
  LetStatement,
  ReturnStatement,
  Expression,
  BlockStatment,
  Statement
} from '../types'

export function letStatement(token: Token, name: Identifier, value: Expression): LetStatement {
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
    value,
    token,
    name
  }
}

export function returnStatement(token: Token, returnValue: Expression): ReturnStatement {
  function tokenLiteral() {
    return token.literal
  }

  function print() {
    return tokenLiteral() + ' ' + returnValue.print() + ';'
  }

  return {
    type: 'RETURN_STATEMENT',
    tokenLiteral,
    print,
    token,
    returnValue
  }
}

export function expressionStatement(token: Token, expression: Expression): ExpressionStatement {
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

export function blockStatment(token: Token, statements: Statement[]): BlockStatment {
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
