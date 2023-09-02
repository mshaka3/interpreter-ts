import { Program, Statement } from '../types'

export function program(): Program {
  var statements: Statement[] = []

  function tokenLiteral() {
    if (statements.length > 0) {
      return statements[0].tokenLiteral()
    } else {
      return ''
    }
  }

  function print() {
    const out: string[] = []
    for (const s of statements) {
      out.push(s.print())
    }

    return out.join('')
  }

  return {
    type: 'PROGRAM',
    statements,
    tokenLiteral,
    print,
    token: { type: 'ILLEGAL', literal: 'START_OF_PROGRAM' }
  }
}
