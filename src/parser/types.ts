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
  | 'BLOCK_STATEMENT'
  | 'IDENTIFIER'
  | 'EXPRESSION'
  | 'INTEGER_LITERAL'
  | 'BOOLEAN_LITERAL'
  | 'PREFIX_EXPRESSION'
  | 'INFIX_EXPRESSION'
  | 'IF_EXPRESSION'

export interface Node {
  token: Token
  type: NodeType

  tokenLiteral: () => string
  print: () => string
}

export type Statement = LetStatement | ReturnStatement | ExpressionStatement | BlockStatment
export type Expression =
  | Identifier
  | IntegerLiteral
  | PrefixExpression
  | InfixExpression
  | BooleanLiteral
  | IFExpression

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

export interface BlockStatment extends Node {
  statements: ExpressionStatement[]
}

export interface Identifier extends Node {
  value: string
}
export interface IntegerLiteral extends Node {
  value: bigint | null
}
export interface BooleanLiteral extends Node {
  value: boolean
}

export interface PrefixExpression extends Node {
  operator: string
  right: Expression
}

export interface InfixExpression extends Node {
  left: Expression
  operator: string
  right: Expression
}

export interface IFExpression extends Node {
  condition: Expression
  consequence: BlockStatment
  alternative?: BlockStatment
}

export type PrefixParseFn = () => Expression | null
export type InfixParseFn = (expression: Expression) => Expression

export type PrefixParsFnMap = Map<TokenType, PrefixParseFn>
export type InfixxParsFnMap = Map<TokenType, InfixParseFn>

// TYPE GUARDS
export function isExpressionStatment(value: Statement): value is ExpressionStatement {
  return value.type == 'EXPRESSION_STATEMENT'
}

export function isInfixExpression(value: Expression): value is InfixExpression {
  return value.type == 'INFIX_EXPRESSION'
}

export function isIntegerLiteral(value: Expression): value is IntegerLiteral {
  return value.type == 'INTEGER_LITERAL'
}

export function isIdentifier(value: Expression): value is Identifier {
  return value.type == 'IDENTIFIER'
}

export function isIFExpression(value: Expression): value is IFExpression {
  return value.type == 'IF_EXPRESSION'
}
