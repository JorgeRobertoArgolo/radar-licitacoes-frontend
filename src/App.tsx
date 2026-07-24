import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Layout } from "@/components/Layout";
import HomePage from "@/modules/Home/pages/HomePage";
import ProdutosPage from "@/modules/Produtos/pages/ProdutosPage";
import HistoricoComprasPage from "@/modules/HistoricoCompras/pages/HistoricoComprasPage";
import AnalisePage from "@/modules/Analise/pages/AnalisePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Todas as rotas agora passam por dentro do Layout principal */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="produtos" element={<ProdutosPage />} />
            <Route path="produtos/:id" element={<HistoricoComprasPage />} />
            <Route path="analise/:id" element={<AnalisePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
