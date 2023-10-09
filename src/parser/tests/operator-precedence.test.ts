import { describe, expect, test } from 'vitest'
import { lexer } from '../../lexer'
import { parser } from '..'
import { checkParserErrors } from '../../utils/check-parser-errors'

describe('test operator precedence suite', () => {
  test('test operator precedence parsing', () => {
    const tests = [
      {
        input: '-a * b',
        expected: '((-a) * b)'
      },
      {
        input: '!-a',
        expected: '(!(-a))'
      },
      {
        input: 'a + b + c',
        expected: '((a + b) + c)'
      },
      {
        input: 'a + b - c',
        expected: '((a + b) - c)'
      },
      {
        input: 'a * b * c',
        expected: '((a * b) * c)'
      },
      {
        input: 'a * b / c',
        expected: '((a * b) / c)'
      },
      {
        input: 'a + b / c',
        expected: '(a + (b / c))'
      },
      {
        input: 'a + b * c + d / e - f',
        expected: '(((a + (b * c)) + (d / e)) - f)'
      },
      {
        input: '3 + 4; -5 * 5',
        expected: '(3 + 4)((-5) * 5)'
      },
      {
        input: '5 > 4 == 3 < 4',
        expected: '((5 > 4) == (3 < 4))'
      },
      {
        input: '5 < 4 != 3 > 4',
        expected: '((5 < 4) != (3 > 4))'
      },
      {
        input: '3 + 4 * 5 == 3 * 1 + 4 * 5',
        expected: '((3 + (4 * 5)) == ((3 * 1) + (4 * 5)))'
      },
      {
        input: '3 + 4 * 5 == 3 * 1 + 4 * 5',
        expected: '((3 + (4 * 5)) == ((3 * 1) + (4 * 5)))'
      },

      { input: 'true', expected: 'true' },
      { input: 'false', expected: 'false' },
      { input: '3 > 5 == false', expected: '((3 > 5) == false)' },
      { input: '3 < 5 == true', expected: '((3 < 5) == true)' }
    ]

    for (const test of tests) {
      var l = lexer(test.input)
      var p = parser(l)
      var prgram = p.parseProgram()
      checkParserErrors(p.errors)

      const actual = prgram.print()
      expect(actual).toEqual(test.expected)
    }
  })

  test('test grouped expresions parsing', () => {
    const tests = [
      {
        input: '((1 + (2 + 3)) + 4)',
        expected: '((1 + (2 + 3)) + 4)'
      },
      {
        input: '(5 + 5) * 2',
        expected: '((5 + 5) * 2)'
      },
      {
        input: '2 / (5 + 5)',
        expected: '(2 / (5 + 5))'
      },
      {
        input: '-(5 + 5)',
        expected: '(-(5 + 5))'
      },
      {
        input: '!(true == true)',
        expected: '(!(true == true))'
      }
    ]

    for (const test of tests) {
      var l = lexer(test.input)
      var p = parser(l)
      var prgram = p.parseProgram()
      checkParserErrors(p.errors)

      const actual = prgram.print()
      expect(actual).toEqual(test.expected)
    }
  })
})
