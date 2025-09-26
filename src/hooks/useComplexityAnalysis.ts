import { useState, useEffect } from "react";
import { analyzeComplexity, type ComplexityResult } from "@/lib/complexity/analyzer";

/**
 * Hook personalizado para análisis de complejidad con debounce
 * Actualiza automáticamente la complejidad 3 segundos después de que el código deje de cambiar
 */
export function useComplexityAnalysis(code: string, debounceMs: number = 3000) {
  const [complexity, setComplexity] = useState<ComplexityResult>(() => 
    analyzeComplexity(code)
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newComplexity = analyzeComplexity(code);
      setComplexity(newComplexity);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [code, debounceMs]);

  return complexity;
}
