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
    let timeoutId: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= loadingSteps.length) {
        setTimeout(onLoadingComplete, 500);
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
    };
  }, [onLoadingComplete, loadingSteps]);

  return (
    <div className='absolute bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] h-full w-full z-50 justify-center items-center flex flex-col'>
      {/* Logo con animación */}
      <div className="mb-8 relative">
        <Image 
          src="/logo.png" 
          alt="O(n) Insight Logo" 
          width="200" 
          height="160" 
          className='animate-pulse drop-shadow-2xl' 
        />
        <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full animate-ping"></div>
      </div>
      <p className="text-gray-400 text-lg mb-8 animate-fade-in-delay">
        Analizador de Complejidad Algorítmica
      </p>

      {/* Progress indicator */}
      <div className="w-80 mb-4">
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
      <div className="text-center">
        <p className="text-white text-sm font-medium animate-bounce">
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
