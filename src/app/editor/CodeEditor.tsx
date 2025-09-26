"use client";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  language?: string;
  code: string;
  setCode: (value: string) => void;
}

export default function CodeEditor({
  language = "java",
  code,
  setCode,
}: CodeEditorProps) {
  return (
    <div className="w-full h-full xl:min-h-0 flex flex-col bg-[#1E1E1E]">
      {/* Header del editor */}
      <div className="flex-shrink-0 bg-[#2D2D30] border-b border-[#303038] px-4 py-2">
        <h3 className="text-white text-sm font-medium">
          Editor de Código - {language.toUpperCase()}
        </h3>
      </div>
      
      {/* Editor container */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
        className="min-h-[400px] sm:min-h-[450px]"
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 12,
            lineHeight: 18,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            folding: true,
            lineNumbers: 'on',
            glyphMargin: false,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            // Responsive font size
            ...(typeof window !== 'undefined' && window.innerWidth < 768 && {
              fontSize: 11,
              lineHeight: 16,
            }),
          }}
          loading={
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3">Cargando editor...</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
