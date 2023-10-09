import { warn } from 'console'
import { MAP_TOKEN_TYPE_TO_PRECEDENCE } from '../constants'
import { Lexer, Token, TokenType } from '../types'

import { program } from './AST'
import {
  booleanLiteral,
  functionLiteral,
  identifier,
  ifExpression,
  infixExpression,
  integerLiteral,
  prefixExpression
} from './AST/expressions'
import { blockStatment, expressionStatement, letStatement, returnStatement } from './AST/statements'

import {
  BlockStatment,
  BooleanLiteral,
  Expression,
  IFExpression,
  Identifier,
  InfixExpression,
  InfixParseFn,
  InfixxParsFnMap,
  OperatorPrecedence,
  Parser,
  PrefixExpression,
  PrefixParsFnMap,
  PrefixParseFn,
  Statement
} from './types'

export function parser(lexer: Lexer): Parser {
  var currToken: Token
  var peekToken: Token

  // read two token so that currToken and peekToken var are both set
  nextToken()
  nextToken()

  var errors: string[] = []

  var prefixParseFnsMap: PrefixParsFnMap = new Map()
  var infixParseFnsMap: InfixxParsFnMap = new Map()

  registerPrefix('IDENT', parseIdentifier)
  registerPrefix('INT', parseIntegerLiteral)
  registerPrefix('MINUS', parsePrefixExpression)
  registerPrefix('BANG', parsePrefixExpression)

  registerPrefix('IF', parseIfExpression)

  registerPrefix('FALSE', parseBoolean)
  registerPrefix('TRUE', parseBoolean)

  registerPrefix('LPAREN', parseGroupedExpression)

  registerPrefix('FUNCTION', parseFunctionLiteral)

  registerInfix('PLUS', parseInfixExpression)
  registerInfix('MINUS', parseInfixExpression)
  registerInfix('SLASH', parseInfixExpression)
  registerInfix('ASTERISK', parseInfixExpression)
  registerInfix('EQ', parseInfixExpression)
  registerInfix('NEQ', parseInfixExpression)
  registerInfix('LT', parseInfixExpression)
  registerInfix('GT', parseInfixExpression)

  function parseProgram() {
    const programNode = program()

    while (currToken.type != 'EOF') {
      const statement = parseStatement()
      if (statement != null) {
        programNode.statements.push(statement)
      }

      nextToken()
    }

    return programNode
  }

  function parseStatement(): Statement | null {
    if (currToken.type == 'LET') {
      return parseLetStatement()
    } else if (currToken.type == 'RETURN') {
      return parseReturnStatement()
    } else {
      return parseExpressionStatement()
    }
  }

  function parseReturnStatement() {
    var statement = returnStatement(currToken, null)

    nextToken()

    while (currToken.type != 'SEMICOLON') {
      nextToken()
    }

    return statement
  }

  function parseLetStatement() {
    var token = currToken
    if (!expectPeek('IDENT')) {
      return null
    }

    var statement = letStatement(token, identifier(currToken, currToken.literal))

    if (!expectPeek('ASSIGN')) {
      return null
    }

    //TODO we skipping  the exression
    while (currToken.type != 'SEMICOLON') {
      nextToken()
    }

    return statement
  }

  function parseBlockStatement(): BlockStatment {
    var blockStmt = blockStatment(currToken)
    blockStmt.statements = []

    nextToken()

    while (currToken.type != 'RBRACE' && currToken.type != 'EOF') {
      var statement = parseStatement()

      if (statement) {
        blockStmt.statements.push(statement)
      }

      nextToken()
    }

    return blockStmt
  }

  function parseExpressionStatement() {
    const expression = parseExpression(OperatorPrecedence.LOWEST)
    var statement = expressionStatement(currToken, expression)

    if (peekTokenIs('SEMICOLON')) {
      nextToken()
    }

    return statement
  }

  function parseExpression(precedence: OperatorPrecedence): Expression | null {
    var prefix = prefixParseFnsMap.get(currToken.type)

    if (prefix == null) {
      errors.push(`no prefix parse function for ${currToken.type} found`)
      return null
    }

    var leftExpression = prefix()

    while (!peekTokenIs('SEMICOLON') && precedence < peekPrecedence()) {
      var infix = infixParseFnsMap.get(peekToken.type)

      if (!infix) {
        return leftExpression
      }

      nextToken()

      leftExpression = infix(leftExpression)
    }

    return leftExpression
  }

  function parseFunctionLiteral(): Expression | null {
    var token = currToken

    if (!expectPeek('LPAREN')) {
      return null
    }

    const parameters = parseFucntionParameters()

    console.log(peekToken)
    if (!expectPeek('LBRACE') || !parameters) {
      return null
    }

    const body = parseBlockStatement()

    return functionLiteral(token, parameters, body)
  }

  function parseFucntionParameters(): Identifier[] | null {
    if (peekTokenIs('RPAREN')) {
      nextToken()
      return []
    }

    nextToken()

    const identifiers = []
    identifiers.push(identifier(currToken, currToken.literal))

    while (peekTokenIs('COMMA')) {
      nextToken()
      nextToken()
      identifiers.push(identifier(currToken, currToken.literal))
    }

    if (!expectPeek('RPAREN')) {
      return null
    }

    return identifiers
  }

  function parseGroupedExpression(): Expression | null {
    nextToken()

    var expression = parseExpression(OperatorPrecedence.LOWEST)

    if (!expectPeek('RPAREN')) {
      return null
    }

    return expression
  }

  function parseIfExpression(): IFExpression | null {
    var token = currToken

    if (!expectPeek('LPAREN')) {
      return null
    }
    nextToken()

    var condition = parseExpression(OperatorPrecedence.LOWEST)

    if (!expectPeek('RPAREN')) {
      return null
    }

    if (!expectPeek('LBRACE')) {
      return null
    }

    var consequnce = parseBlockStatement()

    var alternative
    if (peekTokenIs('ELSE')) {
      nextToken()

      if (!expectPeek('LBRACE')) {
        return null
      }
      alternative = parseBlockStatement()
    }

    return ifExpression(token, condition, consequnce, alternative)
  }

  function parseIdentifier(): Identifier {
    return identifier(currToken, currToken.literal)
  }

  function parseBoolean(): BooleanLiteral {
    return booleanLiteral(currToken, currToken.type == 'TRUE')
  }

  function parseIntegerLiteral(): Expression | null {
    try {
      var value = BigInt(currToken.literal)
      return integerLiteral(currToken, value)
    } catch (error) {
      console.error(`could not parse ${currToken.literal} as BigInt`)
      errors.push(`could not parse ${currToken.literal} as BigInt`)
      return null
    }
  }

  function parsePrefixExpression(): PrefixExpression {
    var token = currToken

    nextToken()

    return prefixExpression({ token, operator: token.literal, right: parseExpression(OperatorPrecedence.PREFIX) })
  }

  function parseInfixExpression(leftExpression: Expression): InfixExpression {
    const token = currToken
    const precedence = currPrecedence()

    nextToken()

    const rightExpression = parseExpression(precedence)

    return infixExpression({ token, operator: token.literal, left: leftExpression, right: rightExpression })
  }

  // --- HELPERS --- //

  function registerPrefix(tokenType: TokenType, fn: PrefixParseFn) {
    prefixParseFnsMap.set(tokenType, fn)
  }
  function registerInfix(tokenType: TokenType, fn: InfixParseFn) {
    infixParseFnsMap.set(tokenType, fn)
  }

  function nextToken() {
    currToken = peekToken
    peekToken = lexer.getNextToken()
  }

  function peekTokenIs(tokenType: TokenType): boolean {
    return peekToken.type == tokenType
  }

  function expectPeek(tokenType: TokenType): boolean {
    if (peekToken.type == tokenType) {
      nextToken()
      return true
    } else {
      peekError(tokenType)
      return false
    }
  }

  function peekError(tokenType: TokenType) {
    const msg = `expected next token to be ${tokenType}, got ${peekToken.type} instead`
    errors.push(msg)
  }

  function peekPrecedence(): OperatorPrecedence {
    return peekToken.type in MAP_TOKEN_TYPE_TO_PRECEDENCE
      ? MAP_TOKEN_TYPE_TO_PRECEDENCE[peekToken.type]!
      : OperatorPrecedence.LOWEST
  }

  function currPrecedence(): OperatorPrecedence {
    return currToken.type in MAP_TOKEN_TYPE_TO_PRECEDENCE
      ? MAP_TOKEN_TYPE_TO_PRECEDENCE[currToken.type]!
      : OperatorPrecedence.LOWEST
  }

  return { parseProgram, errors }
}
