import { useMemo } from "react";
import { convertToLatex, convertBigOToLatex } from "@/lib/math/latexConverter";

/**
 * Hook para convertir expresiones matemáticas a LaTeX
 * Memoiza las conversiones para optimizar el rendimiento
 */
export function useLatexConversion(expression: string, bigO: string) {
  const latexExpression = useMemo(() => convertToLatex(expression), [expression]);
  const latexBigO = useMemo(() => convertBigOToLatex(bigO), [bigO]);

  return {
    latexExpression,
    latexBigO
  };
}
