import { Token } from '../types'
import {
  ExpressionStatement,
  Identifier,
  LetStatement,
  Program,
  ReturnStatement,
  Statement,
  IntegerLiteral,
  Expression,
  PrefixExpression,
  InfixExpression
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

export function integerLiteral(token: Token, value: bigint | null): IntegerLiteral | null {
  if (!value) return null

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

export function prefixExpression({
  token,
  operator,
  right
}: {
  token: Token
  operator: string
  right: Expression | null
}): PrefixExpression {
  function tokenLiteral() {
    return token.literal
  }

  function print(): string {
    if (!right) return ''

    return '(' + operator + right.print() + ')'
  }

  return { print, token, tokenLiteral, operator, right, type: 'PREFIX_EXPRESSION' }
}

export function infixExpression({
  token,
  left,
  operator,
  right
}: {
  token: Token
  left: Expression | null
  operator: string
  right: Expression | null
}): InfixExpression {
  function tokenLiteral() {
    return token.literal
  }

  function print(): string {
    if (!right) return ''

    return '(' + left + ' ' + operator + ' ' + right.print() + ')'
  }

  return { print, token, tokenLiteral, operator, right, left, type: 'INFIX_EXPRESSION' }
}
