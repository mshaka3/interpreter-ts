import { Lexer, Token, TokenType } from "../types";
import { expressionStatement, identifier, integerLiteral, letStatement, program, returnStatement } from "./ast";
import { Expression, Identifier, InfixParseFn, InfixxParsFnMap, OperatorPrecedence, Parser, PrefixParsFnMap, PrefixParseFn, Statement } from "./types";

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
        }
        else {
            return parseExpressionStatement()
        }
    }

    function parseExpressionStatement() {
        var statement = expressionStatement(currToken)
        statement.expression = parseExpression(OperatorPrecedence.LOWEST)

        if (peekTokenIs('SEMICOLON')) {
            nextToken()
        }

        return statement
    }

    function parseExpression(opPrecedence: OperatorPrecedence) {
        var prefix = prefixParseFnsMap.get(currToken.type)

        if (prefix == null) { return null }

        return prefix()
    }

    function parseReturnStatement() {
        var statement = returnStatement(currToken)

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

    function parseIdentifier(): Identifier {
        return identifier(currToken, currToken.literal)
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
        const msg = `expected next token to be ${tokenType}, got ${peekToken.type} instead`;
        errors.push(msg)
    }

    return { parseProgram, errors }
}

