export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Radar Licitações
      </h1>
      <p className="text-gray-700 text-lg mb-8">
        Frontend configurado com sucesso!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Vite + React</h2>
          <p className="text-gray-600">Ambiente de desenvolvimento super rápido.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Tailwind CSS v4</h2>
          <p className="text-gray-600">Estilização diretamente nas classes, sem arquivos de configuração extras.</p>
        </div>
      </div>
    </div>
  )
}
