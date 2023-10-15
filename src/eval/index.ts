import { NULL } from './constants'
import {
  Node,
  isArrayLiteral,
  isBlockStatment,
  isBooleanLiteral,
  isCallExperssion,
  isExpression,
  isExpressionStatment,
  isFunctionLiteral,
  isIFExpression,
  isIdentifier,
  isIndexExpression,
  isInfixExpression,
  isIntegerLiteral,
  isLetStatement,
  isPrefixExpression,
  isProgram,
  isReturnStatement,
  isStatement,
  isStringLiteral
} from '../parser/types'
import { nativeBoolToBooleanValue } from '../utils/native-bool-to-boolean'
import { evalBlockStatement } from './eval-fn/eval-block-statements'
import { evalCallFunction } from './eval-fn/eval-call-function'
import { evalExpressions } from './eval-fn/eval-expressions'
import { evalIdenitifier } from './eval-fn/eval-identifier'
import { evalIfExpression } from './eval-fn/eval-if-expression'
import { evalInfixExpression } from './eval-fn/eval-infix-expression'
import { evalPrefixExpression } from './eval-fn/eval-prefix-expression'
import { evalProgram } from './eval-fn/eval-program'

import { EnvireonmentObject, Value, isArrayValue, isErrorValue } from './types'
import { Function } from './values/function'
import { Integer } from './values/integer'
import { ReturnValue } from './values/return-value'
import { String } from './values/string-value'
import { ArrayVal } from './values/array'
import { evalIndexExpression } from './eval-fn/eval-index-expression'

export function evaluate(node: Node, env: EnvireonmentObject): Value {
  if (isProgram(node)) {
    return evalProgram(node.statements, env)
  }

  // --- STATEMENTS --- //

  if (isStatement(node)) {
    if (isLetStatement(node)) {
      const value = evaluate(node.value, env)
      if (isErrorValue(value)) {
        return value
      }

      env.set(node.name.value, value)
    }

    if (isReturnStatement(node)) {
      const value = evaluate(node.returnValue, env)

      if (isErrorValue(value)) {
        return value
      }

      return ReturnValue(value)
    }

    if (isExpressionStatment(node)) {
      return evaluate(node.expression, env)
    }

    if (isBlockStatment(node)) {
      return evalBlockStatement(node.statements, env)
    }
  }

  // ---  EXPRESSION --- //

  if (isExpression(node)) {
    if (isPrefixExpression(node)) {
      const right = evaluate(node.right, env)
      if (isErrorValue(right)) {
        return right
      }

      return evalPrefixExpression(node.operator, right)
    }

    if (isInfixExpression(node)) {
      const left = evaluate(node.left, env)
      if (isErrorValue(left)) {
        return left
      }

      const right = evaluate(node.right, env)
      if (isErrorValue(right)) {
        return right
      }

      return evalInfixExpression(node.operator, left, right)
    }

    if (isIFExpression(node)) {
      return evalIfExpression(node, env)
    }

    if (isIdentifier(node)) {
      return evalIdenitifier(node, env)
    }

    if (isIntegerLiteral(node)) {
      return Integer(node.value)
    }

    if (isStringLiteral(node)) {
      return String(node.value)
    }

    if (isBooleanLiteral(node)) {
      return nativeBoolToBooleanValue(node.value)
    }

    if (isFunctionLiteral(node)) {
      return Function(node.parameters, node.body, env)
    }

    if (isCallExperssion(node)) {
      const functionValue = evaluate(node.func, env)
      if (isErrorValue(functionValue)) {
        return functionValue
      }

      const args = evalExpressions(node.args, env)
      if (args.length == 1 && isErrorValue(args[0])) {
        return args[0]
      }

      return evalCallFunction(functionValue, args)
    }

    if (isArrayLiteral(node)) {
      const elements = evalExpressions(node.elements, env)
      if (elements.length == 1 && isErrorValue(elements[0])) {
        return elements[0]
      }

      return ArrayVal(elements)
    }
    if (isIndexExpression(node)) {
      const left = evaluate(node.left, env)
      if (isErrorValue(left)) {
        return left
      }

      const index = evaluate(node.index, env)
      if (isErrorValue(index)) {
        return index
      }

      return evalIndexExpression(left, index)
    }
  }

  return NULL
}
