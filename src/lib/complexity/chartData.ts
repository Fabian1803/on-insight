import type { DataPoint, ComplexityInfo } from "./types";

/**
 * Función para calcular factorial de forma segura
 */
function factorial(n: number): number {
  if (n <= 1) return 1;
  if (n > 7) return Infinity; // Evitar overflow para números grandes
  return n * factorial(n - 1);
}

/**
 * Genera datos de prueba para visualizar diferentes complejidades
 */
export const generateComplexityData = (): DataPoint[] => {
  return Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    return {
      n,
      O1: 1,
      Ologn: Math.log2(n + 1),
      On: n,
      Onlogn: n * Math.log2(n + 1),
      On2: n * n,
      Oexponential: Math.pow(2, n),
      Onfactorial: factorial(n),
    };
  });
};

/**
 * Obtiene información detallada sobre un tipo específico de complejidad
 */
export const getComplexityInfo = (complexity: string): ComplexityInfo => {
  const complexityMap: Record<string, ComplexityInfo> = {
    "O1": {
      color: "#82ca9d",
      name: "O(1)",
      dataKey: "O1",
      title: "Complejidad Constante",
      description: "¡Excelente! El algoritmo siempre toma el mismo tiempo, sin importar el tamaño de la entrada.",
      examples: "Acceso a array por índice, operaciones aritméticas básicas"
    },
    "Ologn": {
      color: "#387908", 
      name: "O(log n)",
      dataKey: "Ologn",
      title: "Complejidad Logarítmica",
      description: "¡Muy bueno! El tiempo crece lentamente. Muy eficiente para grandes datasets.",
      examples: "Búsqueda binaria, árboles balanceados"
    },
    "On": {
      color: "#8884d8",
      name: "O(n)",
      dataKey: "On", 
      title: "Complejidad Lineal",
      description: "Aceptable. El tiempo crece proporcionalmente al tamaño de la entrada.",
      examples: "Recorrer un array, búsqueda lineal"
    },
    "Onlogn": {
      color: "#9333ea",
      name: "O(n log n)",
      dataKey: "Onlogn",
      title: "Complejidad Lineal Logarítmica", 
      description: "Bueno para algoritmos de ordenamiento. Eficiente para la mayoría de casos prácticos.",
      examples: "MergeSort, QuickSort, HeapSort"
    },
    "On2": {
      color: "#ff7300",
      name: "O(n²)",
      dataKey: "On2",
      title: "Complejidad Cuadrática",
      description: "⚠️ Cuidado! Puede ser lento para entradas grandes. Considera optimizar.",
      examples: "Loops anidados, algoritmos de ordenamiento básicos"
    },
    "Oexponential": {
      color: "#f97316",
      name: "O(2^n)",
      dataKey: "Oexponential",
      title: "Complejidad Exponencial",
      description: "🚨 ¡PELIGRO! Extremadamente lento. Solo viable para entradas muy pequeñas.",
      examples: "Fibonacci recursivo, subconjuntos, torres de Hanói"
    },
    "Onfactorial": {
      color: "#dc2626", 
      name: "O(n!)",
      dataKey: "Onfactorial",
      title: "Complejidad Factorial",
      description: "💀 ¡CRÍTICO! Impracticable para n > 10. Requiere optimización urgente.",
      examples: "Permutaciones completas, problema del viajante (fuerza bruta)"
    }
  };
  
  return complexityMap[complexity] || complexityMap["On"];
};
