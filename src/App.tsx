import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "@/modules/Home/pages/HomePage";
import ProdutosPage from "@/modules/Produtos/pages/ProdutosPage";
import HistoricoComprasPage from "@/modules/HistoricoCompras/pages/HistoricoComprasPage";
import AnalisePage from "@/modules/Analise/pages/AnalisePage";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navegação temporária para facilitar testes */}
      <nav className="bg-blue-600 text-white p-4 shadow-md flex gap-4">
        <Link to="/" className="hover:underline font-medium">Dashboard</Link>
        <Link to="/produtos" className="hover:underline font-medium">Produtos</Link>
        <Link to="/produtos/1" className="hover:underline font-medium">Exemplo Histórico (ID 1)</Link>
        <Link to="/analise/1" className="hover:underline font-medium">Exemplo Malha Fina (ID 1)</Link>
      </nav>
      
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/produtos/:id" element={<HistoricoComprasPage />} />
          <Route path="/analise/:id" element={<AnalisePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
