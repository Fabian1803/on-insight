import { useState, useEffect } from "react";

/**
 * Hook para manejar el redimensionado de ventana
 * Útil para forzar re-renderizado de componentes responsivos como gráficos
 */
export function useWindowResize() {
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setForceUpdate(prev => prev + 1);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return forceUpdate;
}
