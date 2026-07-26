import { Plus, Search, UploadCloud } from "lucide-react";
import { useState, useEffect } from "react";

interface ProdutoHeaderProps {
  onNovoProduto: () => void;
  searchTerm: string;
  onSearchSubmit: (value: string) => void;
  onImportarCsv: () => void;
}

export function ProdutoHeader({ onNovoProduto, searchTerm, onSearchSubmit, onImportarCsv }: ProdutoHeaderProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Sincroniza o valor digitado se a busca chegar através da URL (vindo da Home)
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    onSearchSubmit(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catálogo de Produtos</h1>
          <p className="text-slate-500 mt-1">Gerencie os itens comprados pela prefeitura e acesse o histórico.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onImportarCsv}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <UploadCloud size={20} className="text-slate-500" />
            <span className="hidden sm:inline">Importar CSV</span>
          </button>
          
          <button 
            onClick={onNovoProduto}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={20} />
            <span>Novo Produto</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex-1 flex items-center gap-3 focus-within:border-indigo-400 transition-colors">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar produto por nome..." 
            className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-4 rounded-xl font-medium shadow-sm transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </div>
    </>
  );
}
