"use client";
import Image from 'next/image'
import React, { useEffect, useState, useMemo } from 'react'

interface SplashProps {
  onLoadingComplete: () => void;
}

export default function Splash({ onLoadingComplete }: SplashProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = useMemo(() => [
    { text: "Inicializando O(n) Insight...", duration: 800 },
    { text: "Cargando editor de código...", duration: 600 },
    { text: "Preparando análisis de complejidad...", duration: 700 },
    { text: "Configurando visualizaciones...", duration: 500 },
    { text: "¡Listo para analizar!", duration: 400 }
  ], []);

  useEffect(() => {
    // Prevenir scroll del body y html usando clases CSS
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
    
    // Funciones para prevenir eventos de scroll
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (scrollKeys.includes(e.keyCode)) {
        preventDefault(e);
        return false;
      }
    };

    // Agregar event listeners para prevenir scroll
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('keydown', preventDefaultForScrollKeys, false);
    
    let timeoutId: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= loadingSteps.length) {
        setTimeout(() => {
          // Restaurar scroll y remover event listeners
          document.body.classList.remove('no-scroll');
          document.documentElement.classList.remove('no-scroll');
          document.removeEventListener('wheel', preventDefault);
          document.removeEventListener('touchmove', preventDefault);
          document.removeEventListener('keydown', preventDefaultForScrollKeys);
          onLoadingComplete();
        }, 500);
        return;
      }

      setCurrentStep(stepIndex);

      timeoutId = setTimeout(() => {
        runStep(stepIndex + 1);
      }, loadingSteps[stepIndex].duration);
    };

    runStep(0);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup: restaurar scroll en caso de que el componente se desmonte
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
      document.removeEventListener('keydown', preventDefaultForScrollKeys);
    };
  }, [onLoadingComplete, loadingSteps]);

  return (
    <div className='fixed inset-0 bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] z-50 justify-center items-center flex flex-col overflow-hidden'>
      {/* Logo con animación */}
      <div className="mb-4 sm:mb-8 relative">
        <Image 
          src="/logo.png" 
          alt="O(n) Insight Logo" 
          width="200" 
          height="160" 
          className='animate-pulse drop-shadow-2xl' 
        />
        <div className="absolute -inset-2 sm:-inset-4 bg-blue-500/20 blur-xl rounded-full animate-ping"></div>
      </div>
      <p className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-8 animate-fade-in-delay text-center px-4">
        Analizador de Complejidad Algorítmica
      </p>

      {/* Progress indicator */}
      <div className="w-64 sm:w-80 mb-4 px-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Cargando...</span>
          <span>{Math.round((currentStep / loadingSteps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 relative"
            style={{ width: `${(currentStep / loadingSteps.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Current step */}
      <div className="text-center px-4 max-w-sm">
        <p className="text-white text-xs sm:text-sm font-medium animate-bounce">
          {loadingSteps[currentStep]?.text}
        </p>
        <div className="flex justify-center mt-4 space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 h-full w-full">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
