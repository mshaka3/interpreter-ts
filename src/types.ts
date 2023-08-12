export type Lexer = { getNextToken: () => Token }

export type TokenType =
  | 'ILLEGAL'
  | 'EOF'

  // Identifiers + literals
  | 'IDENT' // add, foobar, x, y, ...
  | 'INT' // 1343456

  // Operators
  | 'ASSIGN'
  | 'PLUS' // Delimiters
  | 'MINUS'
  | 'BANG'
  | 'ASTERISK'
  | 'SLASH'
  | 'LT'
  | 'GT'
  | 'COMMA'
  | 'SEMICOLON'
  | 'LPAREN'
  | 'RPAREN'
  | 'LBRACE'
  | 'RBRACE'

  // Keywords
  | 'FUNCTION'
  | 'LET'
  | 'CONST'
  | 'VAR'
  | 'ELSE'
  | 'IF'
  | 'RETURN'
  | 'TRUE'
  | 'FALSE'
  | 'EQ'
  | 'NEQ'

export interface Token {
  type: TokenType
  literal: string
}
