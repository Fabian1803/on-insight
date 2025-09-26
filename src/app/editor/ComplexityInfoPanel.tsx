import type { ComplexityInfo } from "@/lib/complexity/types";

interface ComplexityInfoPanelProps {
  complexityInfo: ComplexityInfo;
}

export default function ComplexityInfoPanel({ complexityInfo }: ComplexityInfoPanelProps) {
  return (
    <div 
      className="mt-4 p-4 bg-[#4a4c4e] border-l-4 rounded-r-lg" 
      style={{ borderLeftColor: complexityInfo.color }}
    >
      <h4 
        className="font-semibold text-lg mb-2" 
        style={{ color: complexityInfo.color }}
      >
        {complexityInfo.title}
      </h4>
      <p className="text-white mb-2">
        {complexityInfo.description}
      </p>
      <p className="text-sm text-white">
        <strong>Ejemplos:</strong> {complexityInfo.examples}
      </p>
    </div>
  );
}
