/**
 * Utilidades para convertir expresiones matemáticas a LaTeX
 * para renderizado con KaTeX
 */

/**
 * Convierte una expresión matemática a formato LaTeX
 * @param expr - Expresión matemática en texto plano
 * @returns Expresión convertida a LaTeX
 */
export function convertToLatex(expr: string): string {
  let latex = expr;
  
  // Convertir exponentes
  latex = latex.replace(/n\^(\d+)/g, 'n^{$1}');
  latex = latex.replace(/\^(\d+)/g, '^{$1}');
  
  // Convertir logaritmos
  latex = latex.replace(/log\(n\)/g, '\\log n');
  latex = latex.replace(/log n/g, '\\log n');
  
  // Convertir factoriales
  latex = latex.replace(/n!/g, 'n!');
  
  // Convertir exponenciales
  latex = latex.replace(/2\^n/g, '2^n');
  latex = latex.replace(/(\d+)\^n/g, '$1^n');
  
  // Convertir multiplicaciones
  latex = latex.replace(/\*/g, ' \\cdot ');
  latex = latex.replace(/(\w)\s+(\w)/g, '$1 \\cdot $2');
  
  return latex;
}

/**
 * Convierte una notación Big-O a formato LaTeX
 * @param bigO - Notación Big-O (ej: "O(n²)")
 * @returns Notación Big-O convertida a LaTeX
 */
export function convertBigOToLatex(bigO: string): string {
  let latex = bigO;
  
  // Remover O() y mantener solo el contenido
  latex = latex.replace(/O\((.*)\)/, '$1');
  
  // Convertir exponentes
  latex = latex.replace(/n\^(\d+)/g, 'n^{$1}');
  latex = latex.replace(/\^(\d+)/g, '^{$1}');
  
  // Convertir logaritmos
  latex = latex.replace(/log\s*n/g, '\\log n');
  latex = latex.replace(/log\(n\)/g, '\\log n');
  
  // Convertir factoriales
  latex = latex.replace(/n!/g, 'n!');
  
  // Convertir exponenciales
  latex = latex.replace(/2\^n/g, '2^n');
  latex = latex.replace(/(\d+)\^n/g, '$1^n');
  
  // Convertir multiplicaciones implícitas
  latex = latex.replace(/n\s*log/g, 'n \\log');
  latex = latex.replace(/(\w)\s+(\w)/g, '$1 \\cdot $2');
  
  return `O(${latex})`;
}
