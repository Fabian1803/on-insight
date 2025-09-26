"use client";
import React from "react";
import 'katex/dist/katex.min.css';
import { useLatexConversion } from "@/hooks/useLatexConversion"
import TimeComplexityDisplay from "./TimeComplexityDisplay";
import BigODisplay from "./BigODisplay";
import MathTip from "./MathTip";

interface MathFormulaProps {
  expression: string;
  bigO: string;
}

export default function MathFormula({ expression, bigO }: MathFormulaProps) {
  const { latexExpression, latexBigO } = useLatexConversion(expression, bigO);

  return (
    <div className="w-full bg-[#1E1E1E]">
      <h2 className="text-base sm:text-lg font-semibold text-gray-300 mb-2">
        Análisis de Complejidad
      </h2>
      <TimeComplexityDisplay latexExpression={latexExpression} />
      <BigODisplay latexBigO={latexBigO} fallbackBigO={bigO} />
      <MathTip />
    </div>
  );
}
