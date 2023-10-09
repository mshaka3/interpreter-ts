import { Token } from '../../types'
import {
  Identifier,
  IntegerLiteral,
  Expression,
  PrefixExpression,
  InfixExpression,
  BooleanLiteral,
  BlockStatment,
  IFExpression,
  FunctionLiteral
} from '../types'

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

export function prefixExpression({
  token,
  operator,
  right
}: {
  token: Token
  operator: string
  right: Expression
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
  left: Expression
  operator: string
  right: Expression
}): InfixExpression {
  function tokenLiteral() {
    return token.literal
  }

  function print(): string {
    if (!right) return ''

    return '(' + left.print() + ' ' + operator + ' ' + right.print() + ')'
  }

  return { print, token, tokenLiteral, operator, right, left, type: 'INFIX_EXPRESSION' }
}

export function booleanLiteral(token: Token, value: boolean): BooleanLiteral {
  function tokenLiteral() {
    return token.literal
  }

  function print() {
    return token.literal
  }

  return { token, tokenLiteral, type: 'BOOLEAN_LITERAL', value, print }
}

export function ifExpression(
  token: Token,
  condition: Expression,
  consequence: BlockStatment,
  alternative?: BlockStatment
): IFExpression {
  function tokenLiteral() {
    return token.literal
  }
  function print() {
    var val = 'if' + condition.print() + ' ' + consequence.print()
    if (alternative) {
      val += 'else' + alternative.print()
    }

    return val
  }

  return { type: 'IF_EXPRESSION', tokenLiteral, token, print, condition, consequence, alternative }
}

export function functionLiteral(token: Token, parameters: Identifier[], body: BlockStatment): FunctionLiteral {
  function tokenLiteral() {
    return token.literal
  }

  function print() {
    return tokenLiteral() + '(' + parameters.reduce((str, p) => (str += p.value), '') + ')' + body.print()
  }

  return { type: 'FUNCTION_LITERAL', token, body, parameters, print, tokenLiteral }
}
