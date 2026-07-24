import { Search, AlertTriangle, PackageSearch, TrendingDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useListarProdutos } from "@/modules/Produtos/hooks/useProdutos";

export default function HomePage() {
  // Vamos usar o hook existente apenas para extrair a métrica global (Total de Produtos da API)
  const { data, isLoading } = useListarProdutos(0, 1);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Seção de Boas-vindas */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Bem-vindo ao Radar</h1>
        <p className="text-lg text-slate-500">O seu centro de inteligência e auditoria de compras públicas.</p>
      </div>

      {/* Caixa de Busca Principal (Placeholder do Autocomplete) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-10 text-center relative overflow-hidden">
        {/* Efeito visual sutil no fundo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 relative z-10">Qual item deseja auditar hoje?</h2>
        
        <div className="max-w-2xl mx-auto relative group z-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={24} />
          </div>
          <input 
            type="text" 
            className="block w-full pl-12 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-sm"
            placeholder="Ex: Amoxicilina 500mg, Asfalto..."
          />
          <button className="absolute inset-y-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg font-medium transition-colors shadow-sm">
            Buscar
          </button>
        </div>
        <p className="text-sm text-slate-400 mt-4 relative z-10">Digite o nome do produto para buscar o histórico e rodar a malha fina.</p>
      </div>

      {/* Cards de KPIs (Métricas Globais) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Contagem de Produtos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Produtos no Catálogo</h3>
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
              <PackageSearch size={24} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">
            {isLoading ? "..." : data?.totalElements || 0}
          </div>
          <p className="text-sm text-slate-500">Total de itens mapeados na base</p>
        </div>

        {/* Card 2: Alertas (Z-Score) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Alertas de Risco</h3>
            <div className="bg-rose-50 p-2 rounded-lg text-rose-600">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">0</div>
          <p className="text-sm text-slate-500">Superfaturamentos detectados (Futuro)</p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-rose-500"></div>
        </div>

        {/* Card 3: Dashboard CTA */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-2xl shadow-sm text-white flex flex-col justify-between hover:shadow-md transition-shadow group">
          <div>
            <div className="flex items-center gap-2 text-indigo-100 mb-2">
              <TrendingDown size={20} />
              <span className="font-medium">Economia Estimada</span>
            </div>
            <div className="text-4xl font-bold mb-2">R$ 0,00</div>
            <p className="text-sm text-indigo-200">Prevenção de gastos irregulares</p>
          </div>
          
          <Link to="/produtos" className="mt-4 flex items-center justify-between text-white hover:text-indigo-100 transition-colors">
            <span className="font-medium text-sm">Acessar base de dados</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
