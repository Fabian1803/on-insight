import { BlockMath } from 'react-katex';

interface TimeComplexityDisplayProps {
  latexExpression: string;
}

export default function TimeComplexityDisplay({ latexExpression }: TimeComplexityDisplayProps) {
  return (
    <div className="mb-3 sm:mb-4">
      <p className="text-white text-sm sm:text-base font-medium">
        Expresión de tiempo completa:
      </p>
      <div className="bg-[#2D2D30] border border-[#404040] p-2 sm:p-3 text-center text-white rounded-lg">
        <BlockMath math={`T(n) = ${latexExpression}`} />
      </div>
    </div>
  );
}
