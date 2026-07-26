import type { AnalisePrecoResponseDTO } from "../types/analise.types";
import { GaugeIndicator } from "./GaugeIndicator";
import { Info } from "lucide-react";

interface AnaliseResultCardProps {
  resultado: AnalisePrecoResponseDTO;
  precoAnalisado: number;
}

export function AnaliseResultCard({ resultado, precoAnalisado }: AnaliseResultCardProps) {
  const formatMoeda = (valor: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between">
        <span>Diagnóstico da Proposta</span>
        <span className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          {formatMoeda(precoAnalisado)}
        </span>
      </h3>
      
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">Média Histórica</p>
          <p className="text-2xl font-bold text-slate-800">{formatMoeda(resultado.mediaHistorica)}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1">Desvio Padrão</p>
          <p className="text-2xl font-bold text-slate-800">{formatMoeda(resultado.desvioPadrao)}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium mb-1 flex justify-between">
            Amostragem Base
            <Info size={16} className="text-slate-400" />
          </p>
          <p className="text-2xl font-bold text-slate-800">{resultado.quantidadeAmostras} <span className="text-base font-normal text-slate-500">compras</span></p>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
        <h4 className="font-medium text-slate-700 mb-4 flex justify-between items-center">
          <span>Mapa de Risco (Escore-Z)</span>
          <span className="text-xs text-slate-500 bg-white px-2.5 py-1 rounded-md shadow-sm border border-slate-200 font-medium">
            Probabilidade: {resultado.probabilidade != null ? `${(resultado.probabilidade * 100).toFixed(1)}%` : 'N/A'}
          </span>
        </h4>
        
        <GaugeIndicator escoreZ={resultado.escoreZ} risco={resultado.riscoSuperfaturamento} />
        
        <div className="mt-8 pt-5 border-t border-slate-200">
          <p className="text-slate-700 text-sm leading-relaxed">
            <strong>Parecer Analítico:</strong> {resultado.mensagem}
          </p>
        </div>
      </div>
    </div>
  );
}
