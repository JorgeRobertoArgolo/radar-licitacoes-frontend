import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/modules/Home/pages/HomePage";
import ProdutosPage from "@/modules/Produtos/pages/ProdutosPage";
import HistoricoComprasPage from "@/modules/HistoricoCompras/pages/HistoricoComprasPage";
import AnalisePage from "@/modules/Analise/pages/AnalisePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Navegação temporária para facilitar testes */}
        <nav className="bg-indigo-600 text-white p-4 shadow-md flex gap-4">
          <Link to="/" className="hover:text-indigo-200 font-medium transition-colors">Dashboard</Link>
          <Link to="/produtos" className="hover:text-indigo-200 font-medium transition-colors">Produtos</Link>
          <Link to="/produtos/1" className="hover:text-indigo-200 font-medium transition-colors">Histórico (ID 1)</Link>
          <Link to="/analise/1" className="hover:text-indigo-200 font-medium transition-colors">Análise (ID 1)</Link>
        </nav>
        
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/produtos/:id" element={<HistoricoComprasPage />} />
            <Route path="/analise/:id" element={<AnalisePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
