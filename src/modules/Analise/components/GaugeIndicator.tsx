import { ShieldCheck, AlertTriangle } from "lucide-react";

interface GaugeIndicatorProps {
  escoreZ: number;
  risco: boolean;
}

export function GaugeIndicator({ escoreZ, risco }: GaugeIndicatorProps) {
  // Se for nulo (desvio padrão zero), a visualização da agulha vai pro máximo de risco se houver risco, ou pro meio (0) se for seguro.
  const zValue = escoreZ != null ? escoreZ : (risco ? 5 : 0);

  // Limites do Z-Score para o radar visual
  // -3 a +2 (Normal/Seguro). > +2 (Risco)
  const minZ = -3;
  const maxZ = 5;
  
  // Limita o valor visual para não quebrar o layout
  const zVisual = Math.max(minZ, Math.min(zValue, maxZ));
  
  // Calcula porcentagem da barra (0% = minZ, 100% = maxZ)
  const percentage = ((zVisual - minZ) / (maxZ - minZ)) * 100;
  
  // A zona de perigo começa no Z = 2.
  const dangerZonePercentage = ((2 - minZ) / (maxZ - minZ)) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-8 bg-slate-100 rounded-full overflow-hidden mt-6 shadow-inner">
        {/* Barra de Zona Segura (Verde) */}
        <div 
          className="absolute top-0 left-0 h-full bg-emerald-400 opacity-20"
          style={{ width: `${dangerZonePercentage}%` }}
        ></div>
        
        {/* Barra de Zona de Perigo (Vermelho) */}
        <div 
          className="absolute top-0 right-0 h-full bg-rose-500 opacity-20"
          style={{ width: `${100 - dangerZonePercentage}%` }}
        ></div>

        {/* Agulha Marcadora */}
        <div 
          className="absolute top-0 h-full w-2 bg-slate-800 rounded-full shadow-md transition-all duration-1000 ease-out z-10"
          style={{ left: `calc(${percentage}% - 4px)` }}
        ></div>
      </div>
      
      <div className="flex justify-between w-full mt-2 text-xs font-medium text-slate-400">
        <span>Subfaturado</span>
        <span>Média Histórica (Z=0)</span>
        <span>Superfaturado</span>
      </div>

      <div className={`mt-8 p-4 rounded-2xl flex items-center gap-3 border ${risco ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
        {risco ? <AlertTriangle size={28} className="text-rose-600" /> : <ShieldCheck size={28} className="text-emerald-600" />}
        <div>
          <p className="font-bold text-lg">{risco ? 'Atenção Crítica: Risco de Superfaturamento' : 'Preço Seguro: Dentro da Anormalidade Aceitável'}</p>
          <p className="text-sm opacity-90">Escore-Z calculado: <strong>{escoreZ != null ? escoreZ.toFixed(2) : 'N/A (Desvio Padrão 0)'}</strong></p>
        </div>
      </div>
    </div>
  );
}
