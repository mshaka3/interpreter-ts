import { TokenType } from './lexer/types'

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
