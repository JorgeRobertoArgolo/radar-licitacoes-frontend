import { Plus, Search } from "lucide-react";

interface ProdutoHeaderProps {
  onNovoProduto: () => void;
}

export function ProdutoHeader({ onNovoProduto }: ProdutoHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catálogo de Produtos</h1>
          <p className="text-slate-500 mt-1">Gerencie os itens comprados pela prefeitura e acesse o histórico.</p>
        </div>
        
        <button 
          onClick={onNovoProduto}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus size={20} />
          <span>Novo Produto</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Buscar produto por nome (filtro visual futuro)..." 
          className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
        />
      </div>
    </>
  );
}
