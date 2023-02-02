import {
  isELMBinary,
  isELMExpressionRef,
  isELMFunctionRef,
  isELMLiteral,
  isELMParameterRef,
  isELMQuery,
  isELMUnary,
} from "../types/guards";
import TreeNode from "./TreeNode";

type TreeProps = {
  rootStatement: ELM.ExpressionDef;
};

export default function Tree({ rootStatement }: TreeProps) {
  const handleExpression = (expr?: ELM.Expression) => {
    if (!expr) return "";

    if (isELMFunctionRef(expr)) {
      return (
        <div className="">
          <TreeNode
            label={`${expr.type} (${
              expr.libraryName ? `${expr.libraryName}.` : ""
            }"${expr.name}")`}
          />
        </div>
      );
    } else if (isELMLiteral(expr)) {
      return (
        <div className="">
          <TreeNode label={`${expr.type} (${expr.value})`} />
        </div>
      );
    } else if (isELMQuery(expr)) {
      return (
        <div className="">
          <div className="flex justify-center">
            <TreeNode label={expr.type} />
          </div>
          {expr.source.map((s) => (
            <div className="flex justify-around pt-4" key={s.localId}>
              {handleExpression(s.expression)}
            </div>
          ))}
        </div>
      );
    } else if (isELMParameterRef(expr)) {
      return (
        <div className="">
          <TreeNode label={`${expr.name} (param)`} />
        </div>
      );
    } else if (isELMExpressionRef(expr)) {
      return (
        <div className="">
          <TreeNode
            label={`${expr.type} (${
              expr.libraryName ? `${expr.libraryName}.` : ""
            }"${expr.name}")`}
          />
        </div>
      );
    } else if (isELMUnary(expr)) {
      return (
        <div className="">
          <div className="flex justify-center">
            <TreeNode label={expr.type} />
          </div>
          <div className="pt-4">{handleExpression(expr.operand)}</div>
        </div>
      );
    } else if (isELMBinary(expr)) {
      return (
        <div className="">
          <div className="flex justify-center">
            <TreeNode label={expr.type} />
          </div>
          <div className="flex justify-around pt-4">
            <div className="border-2 p-4">
              {handleExpression(expr.operand[0])}
            </div>
            <div className="px-4"></div>
            <div className="border-2 p-4">
              {handleExpression(expr.operand[1])}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <TreeNode label={expr.type} />
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="font-bold text-xl pb-8">{rootStatement.name}</div>
      <div className="flex justify-center border-2 p-4">
        {handleExpression(rootStatement.expression)}
      </div>
    </div>
  );
}
