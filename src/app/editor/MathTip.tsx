interface MathTipProps {
  className?: string;
}

export default function MathTip({ className = "" }: MathTipProps) {
  return (
    <div className={`mt-3 p-2 sm:p-3 bg-[#2A2A2E] rounded-lg border-l-4 border-yellow-500 ${className}`}>
      <p className="text-xs sm:text-sm text-gray-400">
        💡 La notación Big-O describe el peor caso del crecimiento del algoritmo cuando n tiende a infinito.
      </p>
    </div>
  );
}
