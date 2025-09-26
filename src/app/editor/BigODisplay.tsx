import { BlockMath } from 'react-katex';

interface BigODisplayProps {
  latexBigO: string;
  fallbackBigO: string;
}

export default function BigODisplay({ latexBigO, fallbackBigO }: BigODisplayProps) {
  return (
    <div>
      <p className="text-white text-sm sm:text-base mb-2 font-medium">
        Notación Big-O (Complejidad dominante):
      </p>
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-2 border-blue-600/50 rounded-lg p-3 sm:p-4 text-center">
        <BlockMath 
          math={latexBigO}
          renderError={() => (
            <span className="text-[rgb(76,109,219)] font-mono text-xl sm:text-2xl font-bold">
              {fallbackBigO}
            </span>
          )}
        />
      </div>
    </div>
  );
}
