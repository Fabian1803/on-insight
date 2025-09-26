export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "O(n) Insight",
    "description": "Análisis inteligente de complejidad Big-O para código Java en tiempo real. Detecta automáticamente algoritmos con visualización interactiva.",
    "url": "https://on-insight.vercel.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization", 
      "name": "O(n) Insight Team"
    },
    "featureList": [
      "Análisis de complejidad algorítmica en tiempo real",
      "Visualización interactiva de gráficos Big-O",
      "Editor de código Monaco integrado", 
      "Renderizado de fórmulas matemáticas LaTeX",
      "Detección automática de algoritmos comunes",
      "Interfaz responsiva para móviles y desktop"
    ],
    "screenshot": "https://on-insight.vercel.app/capture.png",
    "softwareVersion": "1.0.0",
    "datePublished": "2024-09-26",
    "programmingLanguage": [
      {
        "@type": "ComputerLanguage",
        "name": "Java"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Students, Educators"
    },
    "educationalLevel": "Intermediate to Advanced",
    "about": [
      {
        "@type": "Thing",
        "name": "Algorithm Analysis"
      },
      {
        "@type": "Thing", 
        "name": "Big O Notation"
      },
      {
        "@type": "Thing",
        "name": "Computer Science Education"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
