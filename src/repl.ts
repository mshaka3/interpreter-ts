import * as readline from 'readline'

import { lexer } from './lexer'
import { parser } from './parser'

function start() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.setPrompt('>> ')
  rl.prompt()

  rl.on('line', (line) => {
    const l = lexer(line)
    const p = parser(l)
    const program = p.parseProgram()
    if (p.errors.length > 0) {
      printParserErrors(p.errors)
      return
    }
    console.log(program.print())
    console.log('\n')
    rl.prompt()
  })

  rl.on('close', () => {
    process.exit(0)
  })
}

const MONKEY_FACE = ` 
          __,__
 .--.  .-"     "-. .--.
/ .. \/  .-. .-. \/ .. \
| | '| /    Y   \ |'  | |
| \   \ \ 0 | 0 / /   / |
 \ '- ,\.-"""""""-./, -'/
  ''-' /_   ^ ^  _\ '-''
       |  \._ _./  |
       \  \ '~' /  /
        '._'-=-' _.'
          '-----'
`
function printParserErrors(errors: string[]) {
  console.info(MONKEY_FACE)
  console.log('Woops! We ran into some monkey business here!\n')
  console.log(' parser errors:\n')

  for (const error of errors) {
    console.error('\t' + error + '\t')
  }
}

start()
