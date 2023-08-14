import { Token, TokenType } from '../types'

export enum OperatorPrecedence {
  LOWEST,
  EQUALS,
  LESSGREATER,
  SUM,
  PRODUCT,
  PREFIX,
  CALL
}

export interface Parser {
  parseProgram: () => Program
  errors: string[]
}

export type NodeType =
  | 'PROGRAM'
  | 'LET_STATEMENT'
  | 'RETURN_STATEMENT'
  | 'EXPRESSION_STATEMENT'
  | 'IDENTIFIER'
  | 'EXPRESSION'
  | 'INTEGER_LITERAL'
  | 'PREFIX_EXPRESSION'
  | 'INFIX_EXPRESSION'

export interface Node {
  token: Token
  type: NodeType

  tokenLiteral: () => string
  print: () => string
}

export type Statement = LetStatement | ReturnStatement | ExpressionStatement
export type Expression = Identifier | IntegerLiteral | PrefixExpression | InfixExpression

export interface Program extends Node {
  statements: Statement[]
}

export interface LetStatement extends Node {
  name: Identifier
  value: Expression
}

export interface ReturnStatement extends Node {
  returnValue: Expression | null
}

export interface ExpressionStatement extends Node {
  expression: Expression | null
}

export interface Identifier extends Node {
  value: string
}

export interface IntegerLiteral extends Node {
  value: bigint | null
}

export interface PrefixExpression extends Node {
  operator: string
  right: Expression | null
}

export interface InfixExpression extends Node {
  left: Expression | null
  operator: string
  right: Expression | null
}

export type PrefixParseFn = () => Expression
export type InfixParseFn = (expression: Expression) => Expression

export type PrefixParsFnMap = Map<TokenType, PrefixParseFn>
export type InfixxParsFnMap = Map<TokenType, InfixParseFn>

// TYPE GUARDS
export function isExpressionStatment(value: Statement): value is ExpressionStatement {
  return value.type == 'EXPRESSION_STATEMENT'
}

export function isIntegerLiteral(value: Expression): value is IntegerLiteral {
  return value.type == 'INTEGER_LITERAL'
}
