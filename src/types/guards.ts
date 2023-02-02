export function isELMExpressionRef(
  expr: ELM.Expression
): expr is ELM.ExpressionRef {
  return expr.type === "ExpressionRef";
}

export function isELMParameterRef(
  expr: ELM.Expression
): expr is ELM.ParameterRef {
  return expr.type === "ParameterRef";
}

export function isELMQuery(expr: ELM.Expression): expr is ELM.Query {
  return expr.type === "Query";
}

export function isELMTuple(expr: ELM.Expression): expr is ELM.Tuple {
  return expr.type === "Tuple";
}

export function isELMUnary(expr: ELM.Expression): expr is ELM.UnaryExpression {
  const e = expr as ELM.UnaryExpression;
  return e.operand && !Array.isArray(e.operand);
}

export function isELMBinary(
  expr: ELM.Expression
): expr is ELM.BinaryExpression {
  return (expr as ELM.NaryExpression).operand?.length === 2;
}

export function isELMFunctionRef(
  expr: ELM.Expression
): expr is ELM.FunctionRef {
  return expr.type === "FunctionRef";
}

export function isELMLiteral(expr: ELM.Expression): expr is ELM.Literal {
  return expr.type === "Literal";
}
