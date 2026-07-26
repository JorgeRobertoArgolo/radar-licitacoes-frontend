import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { HistoricoPaginated } from "../types/historico.types";
import { SkeletonChart } from "@/components/ui/Skeleton";

interface HistoricoChartProps {
  data?: HistoricoPaginated;
  isLoading: boolean;
}

export function HistoricoChart({ data, isLoading }: HistoricoChartProps) {
  if (isLoading) {
    return <SkeletonChart />;
  }

  if (!data || data.content.length === 0) {
    return <div className="h-64 flex items-center justify-center text-slate-400">Sem dados suficientes para o gráfico</div>;
  }

  // Prepara os dados pro Recharts, invertendo a lista pra mostrar da compra mais antiga pra mais nova
  const chartData = [...data.content].reverse().map(item => {
    const [, month, day] = item.dataCompra.split('-');
    return {
      name: `${day}/${month}`, // Label do eixo X
      preco: item.precoUnitario
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="font-semibold text-slate-800 text-lg mb-6">Variação de Preço (Histórico)</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
            <YAxis tick={{fill: '#94a3b8', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `R$ ${val}`} />
            <Tooltip 
              formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, 'Preço Unitário']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="preco" 
              stroke="#4f46e5" 
              strokeWidth={3} 
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }} 
              activeDot={{ r: 6, fill: '#0ea5e9' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
