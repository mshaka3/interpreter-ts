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
  | 'FUNCTION_LITERAL'
  | 'CALL_EXPERSSION'

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
  | FunctionLiteral
  | CallExperssion

export interface Program extends Node {
  statements: Statement[]
}

export interface LetStatement extends Node {
  name: Identifier
  value: Expression
}

export interface ReturnStatement extends Node {
  returnValue: Expression
}

export interface ExpressionStatement extends Node {
  expression: Expression
}

export interface BlockStatment extends Node {
  statements: Statement[]
}

export interface Identifier extends Node {
  value: string
}

export interface IntegerLiteral extends Node {
  value: bigint
}
export interface BooleanLiteral extends Node {
  value: boolean
}

export interface FunctionLiteral extends Node {
  parameters: Identifier[]
  body: BlockStatment
}

export interface CallExperssion extends Node {
  func: Expression
  args: Expression[]
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
export type InfixParseFn = (expression: Expression) => Expression | null

export type PrefixParsFnMap = Map<TokenType, PrefixParseFn>
export type InfixxParsFnMap = Map<TokenType, InfixParseFn>

// TYPE GUARDS

export function isProgram(value: Node): value is Program {
  return value.type == 'PROGRAM'
}
// ---  STATEMENTS  --- //

export function isStatement(value: Node): value is Statement {
  return (
    value.type == 'LET_STATEMENT' ||
    value.type == 'RETURN_STATEMENT' ||
    value.type == 'EXPRESSION_STATEMENT' ||
    value.type == 'BLOCK_STATEMENT'
  )
}

export function isLetStatement(value: Statement): value is LetStatement {
  return value.type == 'LET_STATEMENT'
}

export function isReturnStatement(value: Statement): value is ReturnStatement {
  return value.type == 'RETURN_STATEMENT'
}

export function isExpressionStatment(value: Statement): value is ExpressionStatement {
  return value.type == 'EXPRESSION_STATEMENT'
}

export function isBlockStatment(value: Statement): value is BlockStatment {
  return value.type == 'BLOCK_STATEMENT'
}

// --- EXPRESSIONS --- //

export function isExpression(value: Node): value is Expression {
  return (
    value.type == 'PREFIX_EXPRESSION' ||
    value.type == 'INFIX_EXPRESSION' ||
    value.type == 'INTEGER_LITERAL' ||
    value.type == 'BOOLEAN_LITERAL' ||
    value.type == 'IDENTIFIER' ||
    value.type == 'IF_EXPRESSION' ||
    value.type == 'FUNCTION_LITERAL' ||
    value.type == 'CALL_EXPERSSION'
  )
}

export function isPrefixExpression(value: Expression): value is PrefixExpression {
  return value.type == 'PREFIX_EXPRESSION'
}

export function isInfixExpression(value: Expression): value is InfixExpression {
  return value.type == 'INFIX_EXPRESSION'
}

export function isIntegerLiteral(value: Expression): value is IntegerLiteral {
  return value.type == 'INTEGER_LITERAL'
}

export function isBooleanLiteral(value: Expression): value is BooleanLiteral {
  return value.type == 'BOOLEAN_LITERAL'
}

export function isIdentifier(value: Expression): value is Identifier {
  return value.type == 'IDENTIFIER'
}

export function isIFExpression(value: Expression): value is IFExpression {
  return value.type == 'IF_EXPRESSION'
}

export function isFunctionLiteral(value: Expression): value is FunctionLiteral {
  return value.type == 'FUNCTION_LITERAL'
}

export function isCallExperssion(value: Expression): value is CallExperssion {
  return value.type == 'CALL_EXPERSSION'
}
