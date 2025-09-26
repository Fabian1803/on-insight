/**
 * Tipos y interfaces para el gráfico de complejidad
 */

export interface DataPoint {
  n: number;
  O1: number;
  Ologn: number;
  On: number;
  Onlogn: number;
  On2: number;
  Oexponential: number;
  Onfactorial: number;
}

export interface ComplexityInfo {
  color: string;
  name: string;
  dataKey: keyof DataPoint;
  title: string;
  description: string;
  examples: string;
}

export interface ChartDimensions {
  width: number;
  height: number;
}
