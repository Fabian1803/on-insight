import { useState, useEffect } from "react";
import type { ChartDimensions } from "@/lib/complexity/types";

/**
 * Hook para calcular dimensiones responsivas del gráfico
 */
export function useChartDimensions(isExtremeComplexity: boolean): ChartDimensions {
  const [dimensions, setDimensions] = useState<ChartDimensions>({ width: 600, height: 300 });

  useEffect(() => {
    const calculateDimensions = (): ChartDimensions => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) {
          return { 
            width: Math.min(width - 32, 350), 
            height: isExtremeComplexity ? 250 : 200 
          };
        } else if (width < 1024) {
          return { 
            width: Math.min(width * 0.45, 400), 
            height: isExtremeComplexity ? 300 : 250 
          };
        } else if (width < 1280) {
          return { 
            width: Math.min(width * 0.4, 500), 
            height: isExtremeComplexity ? 350 : 280 
          };
        }
      }
      return { 
        width: 600, 
        height: isExtremeComplexity ? 400 : 300 
      };
    };
    
    const updateDimensions = () => {
      setDimensions(calculateDimensions());
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isExtremeComplexity]);

  return dimensions;
}
