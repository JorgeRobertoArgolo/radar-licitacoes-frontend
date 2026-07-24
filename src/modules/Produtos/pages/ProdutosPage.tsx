import { useState } from "react";
import { useListarProdutos } from "../hooks/useProdutos";
import { ProdutoHeader } from "../components/ProdutoHeader";
import { ProdutoTable } from "../components/ProdutoTable";

export default function ProdutosPage() {
  // Lógica (Estado)
  const [page, setPage] = useState(0);
  const size = 10;

  // Lógica (Dados / Rede)
  const { data, isLoading, isError } = useListarProdutos(page, size);

  // Ação da página
  const handleAbrirModalNovoProduto = () => {
    console.log("Abrir modal de criação! (A fazer)");
  };

  // Renderização combinando apenas Componentes Burros
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ProdutoHeader onNovoProduto={handleAbrirModalNovoProduto} />
      
      <ProdutoTable 
        data={data} 
        isLoading={isLoading} 
        isError={isError} 
        onPageChange={(novaPag) => setPage(novaPag)} 
      />
    </div>
  );
}
