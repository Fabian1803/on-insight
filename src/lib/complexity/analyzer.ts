/**
 * Analizador de complejidad algorítmica para código Java
 * Detecta patrones y algoritmos comunes para determinar la complejidad Big-O
 */

export interface ComplexityResult {
  expression: string;
  bigO: string;
  dominantComplexity: string;
}

export function analyzeComplexity(code: string): ComplexityResult {
  // Análisis más detallado de patrones de complejidad

  // Detectar algoritmos específicos por nombre y patrón
  const isMergeSort = /mergeSort|merge\s*\(/i.test(code) && /copyOfRange|split|divide/i.test(code);
  const isQuickSort = /quickSort|partition/i.test(code) && /pivot/i.test(code);
  const isBinarySearch = /binarySearch|binary/i.test(code) && /(mid|middle|\/\s*2)/i.test(code);
  const isHeapSort = /heapSort|heapify/i.test(code);
  const isFibonacci = /fibonacci/i.test(code) && /fibonacci\s*\([^)]*-\s*1[^)]*\)\s*\+\s*fibonacci\s*\([^)]*-\s*2[^)]*\)/.test(code);

  // Detectar patrones de recursión con división
  const hasRecursiveCall = new RegExp(`(\\w+)\\s*\\([^)]*\\)[^{]*\\{[^{}]*\\1\\s*\\(`).test(code);
  const hasDivision = /\/\s*2|mid|middle|split|divide/i.test(code);
  const hasBaseCase = /if\s*\([^)]*<=\s*1|if\s*\([^)]*<\s*2|return/i.test(code);

  // Detectar patrones exponenciales: doble recursión como fibonacci
  const hasDoubleRecursion = /(\w+)\s*\([^)]*-\s*1[^)]*\)\s*[+\-*/]\s*\1\s*\([^)]*-\s*2[^)]*\)/.test(code);
  const exponentialPattern = /(\w+)\s*\([^)]*\)[^{]*\{[^{}]*return[^{}]*\1[^{}]*\+[^{}]*\1/.test(code);

  // Detectar patrones factoriales: loop + recursión con n-1
  const hasLoopWithRecursion = /for\s*\([^{]*\{[^{}]*(\w+)\s*\([^)]*-\s*1[^)]*\)/.test(code);
  const factorialPattern = /(\w+)\s*\([^)]*\)[^{]*\{[^{}]*for[^{}]*\1\s*\([^)]*-\s*1/.test(code);

  // Detectar loops anidados (n²)
  const nestedLoopPattern = /for\s*\([^{]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*for\s*\(/g;
  const nestedLoops = (code.match(nestedLoopPattern) || []).length;

  // Contar todos los loops
  const allForLoops = (code.match(/for\s*\(/g) || []).length;
  const whileLoops = (code.match(/while\s*\(/g) || []).length;

  // Loops simples = todos los loops - (loops anidados * 2)
  const singleLoops = allForLoops + whileLoops - (nestedLoops * 2);

  // Buscar comentarios que indiquen complejidad
  const complexityComments = code.match(/\/\/[^O]*O\([^)]+\)/g) || [];

  // Algoritmos específicos reconocidos
  if (isFibonacci || hasDoubleRecursion || exponentialPattern) {
    return {
      expression: "T(n) = T(n-1) + T(n-2) → 2^n",
      bigO: "O(2^n)",
      dominantComplexity: "Oexponential"
    };
  } else if (hasLoopWithRecursion || factorialPattern) {
    return {
      expression: "T(n) = n × T(n-1) → n!",
      bigO: "O(n!)",
      dominantComplexity: "Onfactorial"
    };
  } else if (isMergeSort || (hasRecursiveCall && hasDivision && hasBaseCase)) {
    return {
      expression: "T(n) = 2T(n/2) + n → n log n",
      bigO: "O(n log n)",
      dominantComplexity: "Onlogn"
    };
  } else if (isQuickSort) {
    return {
      expression: "T(n) = T(k) + T(n-k-1) + n → n log n (promedio)",
      bigO: "O(n log n)",
      dominantComplexity: "Onlogn"
    };
  } else if (isHeapSort) {
    return {
      expression: "n × log n",
      bigO: "O(n log n)",
      dominantComplexity: "Onlogn"
    };
  } else if (isBinarySearch) {
    return {
      expression: "T(n) = T(n/2) + 1 → log n",
      bigO: "O(log n)",
      dominantComplexity: "Ologn"
    };
  }

  // Detectar patrones específicos de complejidad alta
  const hasNestedMethodCalls = /for\s*\([^{]*\{[^{}]*(?:[^{}]*\{[^{}]*\}[^{}]*)*[^{}]*\w+\.\w+\([^)]*\)[^{}]*(?:\/\/[^\n]*O\([^)]+\))?[^{}]*\}/g.test(code);

  if (hasNestedMethodCalls && complexityComments.length > 0) {
    // Análisis avanzado: loops con llamadas a métodos complejos
    const hasLinearComment = complexityComments.some(comment => comment.includes('O(n)'));
    const hasQuadraticComment = complexityComments.some(comment => comment.includes('O(n * m)') || comment.includes('O(nm)'));

    if (hasQuadraticComment && singleLoops > 0) {
      // Loop que contiene método O(n*m) 
      return {
        expression: "u × (n + n×m) → u×n×m",
        bigO: "O(u×n×m)",
        dominantComplexity: "On2"
      };
    } else if (hasLinearComment && singleLoops > 0) {
      // Loop que contiene método O(n)
      return {
        expression: "u × n → u×n",
        bigO: "O(u×n)",
        dominantComplexity: "On2"
      };
    }
  }

  if (nestedLoops > 0 && singleLoops > 0) {
    // Caso: loops anidados + loops simples
    const nestedTerm = nestedLoops > 1 ? `${nestedLoops}n²` : "n²";
    const singleTerm = singleLoops > 1 ? `${singleLoops}n` : "n";
    return {
      expression: `${nestedTerm} + ${singleTerm} → n²`,
      bigO: "O(n²)",
      dominantComplexity: "On2"
    };
  } else if (nestedLoops > 0) {
    // Solo loops anidados
    const term = nestedLoops > 1 ? `${nestedLoops}n²` : "n²";
    return {
      expression: `${term}`,
      bigO: "O(n²)",
      dominantComplexity: "On2"
    };
  } else if (singleLoops > 1) {
    // Múltiples loops simples separados
    const terms = Array(singleLoops).fill("n").join(" + ");
    return {
      expression: `${terms} = ${singleLoops}n → n`,
      bigO: "O(n)",
      dominantComplexity: "On"
    };
  } else if (singleLoops === 1) {
    // Un solo loop
    return {
      expression: "n",
      bigO: "O(n)",
      dominantComplexity: "On"
    };
  } else if (code.includes("log") || code.includes("binarySearch") || code.includes("binary")) {
    // Algoritmos logarítmicos generales
    return {
      expression: "log n",
      bigO: "O(log n)",
      dominantComplexity: "Ologn"
    };
  } else {
    // Tiempo constante
    return {
      expression: "1",
      bigO: "O(1)",
      dominantComplexity: "O1"
    };
  }
}
