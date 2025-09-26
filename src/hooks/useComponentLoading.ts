import { useState, useEffect } from "react";

interface ComponentLoadingState {
  editor: boolean;
  chart: boolean;
  panel: boolean;
}

/**
 * Hook para simular la carga progresiva de componentes
 * Útil para crear efectos de loading escalonados
 */
export function useComponentLoading() {
  const [componentsLoaded, setComponentsLoaded] = useState<ComponentLoadingState>({
    editor: false,
    chart: false,
    panel: false
  });

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setComponentsLoaded(prev => ({ ...prev, editor: true }));
    }, 1000);

    const timer2 = setTimeout(() => {
      setComponentsLoaded(prev => ({ ...prev, chart: true }));
    }, 1500);

    const timer3 = setTimeout(() => {
      setComponentsLoaded(prev => ({ ...prev, panel: true }));
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return componentsLoaded;
}
