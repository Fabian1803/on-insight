"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useChartDimensions } from "@/hooks/useChartDimensions";
import { generateComplexityData, getComplexityInfo } from "@/lib/complexity/chartData";
import ComplexityInfoPanel from "./ComplexityInfoPanel";

interface ComplexityChartProps {
  dominantComplexity?: string;
}

export default function ComplexityChart({ dominantComplexity = "On2" }: ComplexityChartProps) {
  // Generate data and complexity info
  const data = generateComplexityData();
  const complexityInfo = getComplexityInfo(dominantComplexity);
  
  // Determine if it's an extreme complexity type
  const isFactorial = dominantComplexity === "Onfactorial";
  const isExponential = dominantComplexity === "Oexponential";
  const isExtremeComplexity = isFactorial || isExponential;
  
  // Get responsive dimensions
  const dimensions = useChartDimensions(isExtremeComplexity);
  
  // Use less data points for extreme complexities for better visualization
  const displayData = isExtremeComplexity ? data.slice(0, 6) : data;

  return (
    <div className="w-full bg-[#1E1E1E]">
      <h3 className="text-lg font-semibold mb-4">
        Visualización de Complejidad: {complexityInfo.name}
        {isExtremeComplexity && (
          <span className="text-sm text-red-600 ml-2">
            (Escala logarítmica)
          </span>
        )}
      </h3>
      
      <div className="flex justify-center overflow-x-auto">
        <LineChart width={dimensions.width} height={dimensions.height} data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="n" 
            label={{ 
              value: "Tamaño de entrada (n)", 
              position: "insideBottomRight", 
              offset: -5,
              style: { fontSize: '12px' }
            }} 
          />
          <YAxis 
            scale={isExtremeComplexity ? "log" : "linear"}
            domain={isExtremeComplexity ? [1, 'dataMax'] : ['dataMin', 'dataMax']}
            label={{ 
              value: 'Operaciones', 
              angle: -90, 
              position: 'insideLeft',
              style: { fontSize: '12px' }
            }}
            tick={{ fontSize: '11px' }}
          />
          <Tooltip 
            formatter={(value, name) => [
              typeof value === 'number' ? value.toLocaleString() : value, 
              name
            ]}
            contentStyle={{
              backgroundColor: '#2D2D30',
              border: '1px solid #404040',
              borderRadius: '6px',
              color: '#ffffff'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line 
            type="monotone" 
            dataKey={complexityInfo.dataKey}
            stroke={complexityInfo.color}
            name={complexityInfo.name}
            strokeWidth={4}
            strokeOpacity={1}
          />
        </LineChart>
      </div>
      
      <ComplexityInfoPanel complexityInfo={complexityInfo} />
    </div>
  );
}