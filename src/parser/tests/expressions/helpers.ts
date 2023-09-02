import { Expression, isIdentifier, isInfixExpression, isIntegerLiteral } from '../../types'

function testLiteralExpression(expression: Expression, value: string | number): boolean {
  return typeof value == 'number' ? testIntegerLiteral(expression, BigInt(value)) : testIdentifier(expression, value)
}

export function testIdentifier(expression: Expression | null, value: string): boolean {
  if (!expression) return false

  if (!isIdentifier(expression)) {
    return false
  } else if (expression.value != value) return false

  return true
}
export function testIntegerLiteral(expression: Expression | null, value: bigint): boolean {
  if (!expression) return false

  if (!isIntegerLiteral(expression)) {
    return false
  } else if (expression.value != value) {
    return false
  }

  return true
}

export function testInfixExpression(
  expression: Expression,
  operator: string,
  leftValue: number | string,
  rightValue: number | string
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
