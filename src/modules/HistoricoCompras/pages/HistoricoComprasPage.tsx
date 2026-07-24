import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Plus, Beaker } from "lucide-react";
import { useBuscarProduto } from "@/modules/Produtos/hooks/useProdutos";
import { useListarHistorico } from "../hooks/useHistorico";
import { HistoricoChart } from "../components/HistoricoChart";
import { HistoricoTable } from "../components/HistoricoTable";
import { NovoHistoricoModal } from "../components/NovoHistoricoModal";

export default function HistoricoComprasPage() {
  const { id } = useParams<{ id: string }>();
  const produtoId = Number(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Busca do Produto (Cabeçalho)
  const { data: produto, isLoading: isLoadingProduto } = useBuscarProduto(produtoId);
  // Busca do Histórico
  const { data: historico, isLoading: isLoadingHistorico } = useListarHistorico(produtoId);

  if (isLoadingProduto) {
    return <div className="p-12 text-center text-slate-500 font-medium">Carregando painel do produto...</div>;
  }

  if (!produto) {
    return <div className="p-12 text-center text-rose-500 font-medium">Produto não encontrado. (404)</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header com Navegação e Botões */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Link to="/produtos" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-2 group cursor-pointer">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao catálogo</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{produto.nome}</h1>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-full text-xs font-medium uppercase">
              {produto.unidadeMedida}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to={`/analise/${produto.id}`}
            className="bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-700 px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Beaker size={20} />
            <span>Rodar Malha Fina</span>
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={20} />
            <span>Registrar Compra</span>
          </button>
        </div>
      </div>

      {/* Seção Gráfica e Tabela */}
      <HistoricoChart data={historico} isLoading={isLoadingHistorico} />
      
      <HistoricoTable data={historico} isLoading={isLoadingHistorico} />

      {/* Modal Interativo de Criação */}
      <NovoHistoricoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        produtoId={produto.id} 
      />
    </div>
  );
}
