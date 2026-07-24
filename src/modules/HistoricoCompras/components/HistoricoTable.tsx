import type { HistoricoPaginated } from "../types/historico.types";

// Criar utilitários rápidos se não existirem no projeto
const formatMoeda = (valor: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  
const formatDataBR = (dataIso: string) => {
  const [year, month, day] = dataIso.split('-');
  return `${day}/${month}/${year}`;
};

interface HistoricoTableProps {
  data?: HistoricoPaginated;
  isLoading: boolean;
}

export function HistoricoTable({ data, isLoading }: HistoricoTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
        <h3 className="font-semibold text-slate-800 text-lg">Últimas Compras</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-medium uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Fornecedor</th>
              <th className="px-6 py-4 text-right">Qtde</th>
              <th className="px-6 py-4 text-right">Valor Unit.</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Carregando...</td>
              </tr>
            )}
            
            {!isLoading && data?.content.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Nenhum histórico encontrado para este produto.
                </td>
              </tr>
            )}

            {!isLoading && data?.content.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-700">{formatDataBR(item.dataCompra)}</td>
                <td className="px-6 py-4 text-slate-900">{item.fornecedor}</td>
                <td className="px-6 py-4 text-right text-slate-500">{item.quantidade}</td>
                <td className="px-6 py-4 text-right font-medium text-slate-900">{formatMoeda(item.precoUnitario)}</td>
                <td className="px-6 py-4 text-right text-slate-500 font-medium">
                  {formatMoeda(item.precoUnitario * item.quantidade)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
