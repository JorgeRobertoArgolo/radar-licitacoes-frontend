import { Link, Outlet, useLocation } from "react-router-dom";
import { Radar, Package, LayoutDashboard } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Radar className="text-indigo-600" size={28} />
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Radar<span className="text-indigo-600">Licitações</span>
              </span>
            </div>
            
            {/* Links Centrais */}
            <nav className="flex gap-8">
              <Link 
                to="/" 
                className={`flex items-center gap-2 text-sm font-medium transition-colors border-b-2 py-5 -mb-[1px] ${isActive('/') ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300'}`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/produtos" 
                className={`flex items-center gap-2 text-sm font-medium transition-colors border-b-2 py-5 -mb-[1px] ${isActive('/produtos') ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-300'}`}
              >
                <Package size={18} />
                <span>Catálogo de Produtos</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo Dinâmico (Outlet injeta as rotas filhas aqui) */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
