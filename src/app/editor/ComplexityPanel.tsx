"use client";
import React from "react";

interface ComplexityPanelProps {
  expression: string;  // Ejemplo: "n + n^2"
  bigO: string;        // Ejemplo: "O(n^2)"
}

export default function ComplexityPanel({ expression, bigO }: ComplexityPanelProps) {
  return (
    <div className="w-full bg-[#1E1E1E] border-2 border-[#303038] p-3 sm:p-4 mt-4 sm:mt-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2 sm:mb-3">
        Análisis de Complejidad
      </h2>

      <div className="mb-2 sm:mb-3">
        <p className="text-white text-sm sm:text-base">Expresión total:</p>
        <p className="font-mono text-sm sm:text-lg text-gray-300 break-all">
          {`T(n) = ${expression}`}
        </p>
      </div>
      
      <div>
        <p className="text-white text-sm sm:text-base">Notación Big-O simplificada:</p>
        <p className="font-mono text-xl sm:text-2xl font-bold text-[rgb(76,109,219)] break-all">
          {bigO}
        </p>
      </div>
    </div>
  );
}
