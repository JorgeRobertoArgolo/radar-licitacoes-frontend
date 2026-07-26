import { Search, AlertTriangle, PackageSearch, TrendingDown, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useListarProdutos } from "@/modules/Produtos/hooks/useProdutos";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Debounce para não floodar a API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // Hook para a busca rápida (Autocomplete)
  const { data: searchResults, isLoading: isSearchLoading } = useListarProdutos(0, 5, debouncedValue);
  
  // Vamos usar o hook existente para extrair a métrica global (Total de Produtos da API) sem filtro
  const { data: globalData, isLoading: isGlobalLoading } = useListarProdutos(0, 1);

  // Controle de abertura do Autocomplete
  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [debouncedValue]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Seção de Boas-vindas */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Bem-vindo ao Radar</h1>
        <p className="text-lg text-slate-500">O seu centro de inteligência e auditoria de compras públicas.</p>
      </div>

      {/* Caixa de Busca Principal (Autocomplete) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-10 text-center relative">
        {/* Efeito visual sutil no fundo isolado para não dar overflow no dropdown */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        </div>
        
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 relative z-10">Qual item deseja auditar hoje?</h2>
        
        <div className="max-w-2xl mx-auto relative group z-20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={24} />
          </div>
          <input 
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              if (searchValue.trim().length > 0) setIsDropdownOpen(true);
            }}
            onBlur={() => {
              // Pequeno delay para permitir o clique no item do dropdown antes de fechar
              setTimeout(() => setIsDropdownOpen(false), 200);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValue.trim()) {
                setIsDropdownOpen(false);
                navigate(`/produtos?search=${encodeURIComponent(searchValue.trim())}`);
              }
            }}
            className="block w-full pl-12 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all shadow-sm"
            placeholder="Ex: Amoxicilina 500mg, Asfalto..."
          />
          <button 
            onClick={() => {
              if (searchValue.trim()) {
                navigate(`/produtos?search=${encodeURIComponent(searchValue.trim())}`);
              }
            }}
            className="absolute inset-y-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
          >
            Buscar
          </button>

          {/* Lista Autocomplete */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-30 text-left">
              {isSearchLoading ? (
                <div className="p-4 text-center text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin text-indigo-500" size={20} />
                  Buscando...
                </div>
              ) : searchResults?.content && searchResults.content.length > 0 ? (
                <ul>
                  {searchResults.content.map((produto) => (
                    <li key={produto.id}>
                      <button
                        className="w-full text-left px-4 py-3 hover:bg-indigo-50 border-b border-slate-100 last:border-0 transition-colors flex flex-col"
                        onClick={() => navigate(`/produtos/${produto.id}`)}
                      >
                        <span className="font-medium text-slate-800">{produto.nome}</span>
                        <span className="text-xs text-slate-500">Unidade: {produto.unidadeMedida}</span>
                      </button>
                    </li>
                  ))}
                  {searchResults.totalElements > 5 && (
                    <li>
                      <button
                        className="w-full text-center px-4 py-3 bg-slate-50 hover:bg-slate-100 text-indigo-600 text-sm font-medium transition-colors"
                        onClick={() => navigate(`/produtos?search=${encodeURIComponent(searchValue.trim())}`)}
                      >
                        Ver todos os resultados...
                      </button>
                    </li>
                  )}
                </ul>
              ) : (
                <div className="p-4 text-center text-slate-500">
                  Nenhum produto encontrado.
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-slate-400 mt-4 relative z-10">Digite o nome do produto para buscar o histórico e rodar a malha fina.</p>
      </div>

      {/* Cards de KPIs (Métricas Globais) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* Card 1: Contagem de Produtos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Produtos no Catálogo</h3>
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
              <PackageSearch size={24} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">
            {isGlobalLoading ? "..." : globalData?.totalElements || 0}
          </div>
          <p className="text-sm text-slate-500">Total de itens mapeados na base</p>
        </div>

        {/* Card 2: Alertas (Z-Score) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden hover:shadow-md transition-shadow">
          <div className="absolute top-4 right-4 bg-slate-100 text-slate-500 text-xs font-semibold px-2 py-1 rounded-md uppercase tracking-wider">
            Em breve
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 font-medium">Alertas de Risco</h3>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-300 mb-2">--</div>
          <p className="text-sm text-slate-400">Superfaturamentos detectados</p>
        </div>

        {/* Card 3: Dashboard CTA */}
        <div className="bg-gradient-to-br from-indigo-50 to-slate-100 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative">
          <div className="absolute top-4 right-4 bg-white border border-slate-200 text-slate-500 text-xs font-semibold px-2 py-1 rounded-md uppercase tracking-wider">
            Em breve
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <TrendingDown size={20} />
              <span className="font-medium">Economia Estimada</span>
            </div>
            <div className="text-4xl font-bold text-slate-300 mb-2">R$ --,--</div>
            <p className="text-sm text-slate-400">Prevenção de gastos irregulares</p>
          </div>
          
          <Link to="/produtos" className="mt-4 flex items-center justify-between text-indigo-500 hover:text-indigo-600 transition-colors">
            <span className="font-medium text-sm">Acessar base de dados</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
