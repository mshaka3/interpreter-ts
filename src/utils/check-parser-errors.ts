export function checkParserErrors(errors: string[]): boolean {
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
