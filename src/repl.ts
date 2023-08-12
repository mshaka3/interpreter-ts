import { lexer } from './lexer'
import * as readline from 'readline'

const rs = readline.createInterface({
  input: process.stdin
})

rs.on('line', (input) => {
  const { getNextToken } = lexer(input)
  console.log(input)
  while (true) {
    const token = getNextToken()
    console.log(token)
    if (token.type == 'EOF') {
      break
    }
  }
})

rs.on('close', () => {
  console.log('suck it')
})
