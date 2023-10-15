export type Lexer = { getNextToken: () => Token }

export type TokenType =
  | 'ILLEGAL'
  | 'EOF'

  // Identifiers + literals
  | 'IDENT' // add, foobar, x, y, ...
  | 'INT' // 1343456
  | 'STRING' // str values

  // Operators
  | 'ASSIGN'
  | 'PLUS' // Delimiters
  | 'MINUS'
  | 'BANG'
  | 'ASTERISK'
  | 'SLASH'
  | 'LT'
  | 'GT'
  //
  | 'COMMA'
  | 'SEMICOLON'
  | 'LPAREN'
  | 'RPAREN'
  | 'LBRACE'
  | 'RBRACE'
  | 'LBRACKET'
  | 'RBRACKET'

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
