"use client";
import { useState } from "react";
import Image from "next/image";
import CodeEditor from "./editor/CodeEditor";
import MathFormula from "./editor/MathFormula";
import ComplexityChart from "./editor/ComplexityChart";
import Splash from "./component/splash";
import { useComplexityAnalysis } from "@/hooks/useComplexityAnalysis";
import { useComponentLoading } from "@/hooks/useComponentLoading";
import { useWindowResize } from "@/hooks/useWindowResize";

export default function Home() {
  const [code, setCode] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const complexity = useComplexityAnalysis(code);
  const componentsLoaded = useComponentLoading();
  const forceUpdate = useWindowResize();

  const handleLoadingComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <Splash onLoadingComplete={handleLoadingComplete} />}
      <div className={`min-h-screen bg-[#1E1E1E] transition-opacity duration-500 ${showSplash ? 'opacity-0' : 'opacity-100'} flex flex-col`}>
        {/* Header responsivo */}
        <div className="flex-shrink-0 h-14 sm:h-16 lg:h-20 border-b-2 border-[#303038] px-3 sm:px-4 flex items-center">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={100} 
            height={80}
            className="sm:w-[120px] sm:h-[96px] lg:w-[150px] lg:h-[120px] object-contain"
            priority
          />
        </div>
        
        {/* Main content responsivo */}
        <div className="flex-1 flex flex-col xl:flex-row min-h-0 gap-0">
          {/* Editor section */}
          <div className="flex-1 flex flex-col min-h-[400px] sm:min-h-[450px] xl:min-h-0 xl:max-w-[50%]">
            {componentsLoaded.editor && (
              <CodeEditor language="java" code={code} setCode={setCode} />
            )}
          </div>
          
          {/* Analysis section */}
          <div className="flex-1 flex flex-col min-h-0 xl:border-l border-[#303038] xl:max-w-[50%]">
            <div className="flex-1 flex flex-col overflow-hidden">
              {componentsLoaded.chart && (
                <div className="flex-1 p-3 sm:p-4 overflow-auto min-h-[300px] sm:min-h-[400px]">
                  <ComplexityChart key={forceUpdate} dominantComplexity={complexity.dominantComplexity} />
                </div>
              )}
              {componentsLoaded.panel && (
                <div className="flex-shrink-0 p-3 sm:p-4 pt-0">
                  <MathFormula expression={complexity.expression} bigO={complexity.bigO} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
