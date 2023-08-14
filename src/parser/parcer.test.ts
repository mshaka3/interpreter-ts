import { test, expect } from 'vitest'
import { lexer } from '../lexer'
import { parcer } from '.'

import { IntegerLiteral, LetStatement, PrefixExpression, Statement, isExpressionStatment } from './types'
import { identifier, letStatement, program } from './ast'

test('Parsing let statements', () => {
  const input = `
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `

  const l = lexer(input)
  const p = parcer(l)

  const program = p.parseProgram()
  const errors = p.errors

  expect(checkParserErrors(errors)).toBe(false)
  expect(program).not.toBeNull()
  expect(program.statements.length).toBe(3)

  const tests = [{ expectedIdentifier: 'x' }, { expectedIdentifier: 'y' }, { expectedIdentifier: 'foobar' }]

  for (let i = 0; i < tests.length; i++) {
    const tt = tests[i]
    const stmt = program.statements[i]
    expect(testLetStatement(stmt, tt.expectedIdentifier)).toBe(true)
  }

  function testLetStatement(s: Statement, name: string): boolean {
    if (s.tokenLiteral() !== 'let') {
      console.error(`s.tokenLiteral not 'let'. got=${s.tokenLiteral()}`)
      return false
    }

    const letStmt = s as LetStatement
    if (letStmt.name.value !== name) {
      console.error(`letStmt.name.value not '${name}'. got=${letStmt.name.value}`)
      return false
    }

    if (letStmt.name.tokenLiteral() !== name) {
      console.error(`s.name not '${name}'. got=${letStmt.name}`)
      return false
    }

    return true
  }
})

test('test return statements', () => {
  const input = `
    return 5;
    return 10;
    return 993322;`
  const l = lexer(input)
  const p = parcer(l)

  const program = p.parseProgram()
  const errors = p.errors

  expect(checkParserErrors(errors)).toBe(false)
  expect(program).not.toBeNull()
  expect(program.statements.length).toBe(3)

  for (const stm of program.statements) {
    expect(testReturnStm(stm)).toBe(true)
  }

  function testReturnStm(stmt: Statement) {
    if (!stmt || stmt.type != 'RETURN_STATEMENT') {
      return false
    }

    if (stmt.tokenLiteral() != 'return') {
      return false
    }

    return true
  }
})

test('test print method', () => {
  const p = program()

  const letS = letStatement({ type: 'LET', literal: 'let' }, identifier({ type: 'IDENT', literal: 'myVar' }, 'myVar'))
  letS.value = identifier({ type: 'IDENT', literal: 'anotherVar' }, 'anotherVar')
  p.statements.push(letS)

  expect(p.print()).toEqual('let myVar = anotherVar;')
})

test('test indentifer expression', () => {
  var input = 'foobar;'

  var l = lexer(input)
  var p = parcer(l)

  var prog = p.parseProgram()
  console.log(prog)
  checkParserErrors(p.errors)

  expect(prog.statements.length).toEqual(1)
  const stmt = prog.statements[0]
  expect(stmt.type == 'EXPRESSION_STATEMENT').toBe(true)
})

test('test integer literal expression', () => {
  var input = '5'
  var l = lexer(input)
  var p = parcer(l)

  checkParserErrors(p.errors)

  var prog = p.parseProgram()
  const statement = prog.statements[0]

  expect(prog.statements.length).toEqual(1)
  expect(isExpressionStatment(statement)).toBe(true)

  if (isExpressionStatment(statement)) {
    expect(statement.expression?.type == 'INTEGER_LITERAL').toBe(true)

    const integerLiteralStmt = statement.expression as IntegerLiteral
    expect(integerLiteralStmt.value).toBe(BigInt(5))
    expect(integerLiteralStmt.tokenLiteral()).toBe('5')
  }
})

test('test parseing prefix expression', () => {
  const prefixTests = [
    { input: '!5;', operator: '!', integerValue: 5 },
    { input: '-15;', operator: '-', integerValue: 15 }
  ]

  for (const test of prefixTests) {
    const l = lexer(test.input)
    const p = parcer(l)

    const program = p.parseProgram()

    expect(program.statements.length).toBe(1)
    const statement = program.statements[0]

    expect(isExpressionStatment(statement)).toBe(true)

    if (isExpressionStatment(statement)) {
      expect(statement.expression?.type == 'PREFIX_EXPRESSION').toBe(true)
      const prefixExpression = statement.expression as PrefixExpression
      expect(prefixExpression.operator).toEqual(test.operator)
    }
  }
})

function checkParserErrors(errors: string[]): boolean {
  if (errors.length == 0) {
    return false
  } else {
    console.log(`parcer has ${errors.length} errors`)
    for (const msg of errors) {
      console.log(`parcer error: ${msg}`)
    }
    return true
  }
}
