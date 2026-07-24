import { Loader2, Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProdutosPaginated } from "../types/produto.types";

interface ProdutoTableProps {
  data?: ProdutosPaginated;
  isLoading: boolean;
  isError: boolean;
  onPageChange: (newPage: number) => void;
}

export function ProdutoTable({ data, isLoading, isError, onPageChange }: ProdutoTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Produto</th>
              <th className="px-6 py-4">Unid. Medida</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-indigo-600">
                    <Loader2 className="animate-spin mb-2" size={32} />
                    <span className="text-slate-500 font-medium">Carregando catálogo...</span>
                  </div>
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-rose-500 font-medium">
                  Ocorreu um erro ao carregar os produtos. Verifique se o backend está respondendo.
                </td>
              </tr>
            )}

            {!isLoading && !isError && data?.content.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  <Package className="mx-auto mb-3 text-slate-300" size={48} />
                  <p className="text-lg font-medium text-slate-900">Nenhum produto cadastrado</p>
                  <p>Comece adicionando um novo item ao catálogo.</p>
                </td>
              </tr>
            )}

            {!isLoading && !isError && data?.content.map((produto) => (
              <tr key={produto.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 font-mono text-slate-400">#{produto.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{produto.nome}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {produto.unidadeMedida}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    to={`/produtos/${produto.id}`}
                    className="inline-flex items-center justify-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    <span>Histórico</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {!isLoading && !isError && data && data.totalPages > 1 && (
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Mostrando página <span className="font-medium text-slate-900">{data.number + 1}</span> de <span className="font-medium text-slate-900">{data.totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => onPageChange(Math.max(0, data.number - 1))}
              disabled={data.first}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <button 
              onClick={() => onPageChange(data.number + 1)}
              disabled={data.last}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
