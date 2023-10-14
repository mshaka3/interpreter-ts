import { Expression, isBooleanLiteral, isIdentifier, isInfixExpression, isIntegerLiteral } from '../../types'

export function testLiteralExpression(expression: Expression, value: string | number | boolean): boolean {
  return typeof value == 'number'
    ? testIntegerLiteral(expression, BigInt(value))
    : typeof value == 'boolean'
    ? testBooleanLiteral(expression, value)
    : testIdentifier(expression, value)
}

export function testIdentifier(expression: Expression | null, value: string): boolean {
  if (!expression) return false

  if (!isIdentifier(expression) || expression.value != value) {
    return false
  }

  return true
}

export function testIntegerLiteral(expression: Expression | null, value: bigint): boolean {
  if (!expression || !isIntegerLiteral(expression) || expression.value != value) {
    return false
  }

  return true
}
export function testBooleanLiteral(expression: Expression, value: boolean): boolean {
  if (!expression || !isBooleanLiteral(expression) || expression.value != value) {
    return false
  }

  return true
}

export function testInfixExpression(
  expression: Expression,
  operator: string,
  leftValue: number | string | boolean,
  rightValue: number | string | boolean
): boolean {
  if (!isInfixExpression(expression)) {
    return false
  }
  if (expression.operator != operator) {
    return false
  }

  if (!testLiteralExpression(expression.left, leftValue)) {
    return false
  }
  if (!testLiteralExpression(expression.right, rightValue)) {
    return false
  }

  return true
}
