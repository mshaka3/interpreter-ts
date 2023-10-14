import { OperatorPrecedence } from './parser/types'
import { TokenType } from './types'

import { Boolean } from './eval/values/boolean'
import { Null } from './eval/values/null'

export const MAP_TOKWN_TYPE_LETIERAL: { [key in string]: TokenType } = {
  EOF: 'EOF',
  '=': 'ASSIGN',
  INT: 'INT',
  '+': 'PLUS',
  '-': 'MINUS',
  '*': 'ASTERISK',
  '!': 'BANG',
  '/': 'SLASH',
  '>': 'GT',
  '<': 'LT',
  ';': 'SEMICOLON',
  ',': 'COMMA',
  '{': 'LBRACE',
  '}': 'RBRACE',
  '(': 'LPAREN',
  ')': 'RPAREN',

  IDENT: 'IDENT',
  ILLEGAL: 'ILLEGAL',
  function: 'FUNCTION',
  var: 'VAR',
  const: 'CONST',
  let: 'LET',
  else: 'ELSE',
  if: 'IF',
  return: 'RETURN',
  true: 'TRUE',
  false: 'FALSE',

  '==': 'EQ',
  '!=': 'NEQ'
}

export const MAP_TOKEN_TYPE_TO_PRECEDENCE: Partial<Record<TokenType, OperatorPrecedence>> = {
  EQ: OperatorPrecedence.EQUALS,
  NEQ: OperatorPrecedence.EQUALS,
  LT: OperatorPrecedence.LESSGREATER,
  GT: OperatorPrecedence.LESSGREATER,
  PLUS: OperatorPrecedence.SUM,
  MINUS: OperatorPrecedence.SUM,
  SLASH: OperatorPrecedence.PRODUCT,
  ASTERISK: OperatorPrecedence.PRODUCT,
  LPAREN: OperatorPrecedence.CALL
}

export const NULL = Null()
export const TRUE = Boolean(true)
export const FALSE = Boolean(false)
