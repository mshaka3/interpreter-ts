import * as os from 'os';
import * as readline from 'readline';

import { lexer } from './lexer'

async function main() {
    const currentUser = os.userInfo().username;
    console.log(`Hello ${currentUser}! This is the Monkey programming language!`);
    console.log("Feel free to type in commands");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    for await (const line of rl) {
        console.log(`Received: ${line}`);
        // Implement REPL logic here

        const { getNextToken } = lexer(line)
        while (true) {
            const token = getNextToken()
            console.log(token)
            if (token.type == 'EOF') {
                break
            }
        }
    }
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});


