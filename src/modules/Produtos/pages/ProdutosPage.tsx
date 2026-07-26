import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useListarProdutos } from "../hooks/useProdutos";
import { ProdutoHeader } from "../components/ProdutoHeader";
import { ProdutoTable } from "../components/ProdutoTable";
import { NovoProdutoModal } from "../components/NovoProdutoModal";

export default function ProdutosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Estado local para a barra de pesquisa
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sincroniza o termo de busca com a URL (ex: redirecionamento da Home)
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearchTerm(searchFromUrl);
    // Também reinicia a paginação caso a busca mude pela URL
    setPage(0);
  }, [searchParams]);
  
  const size = 10;

  // Lógica (Dados / Rede) passando o searchTerm para o backend
  const { data, isLoading, isError } = useListarProdutos(page, size, searchTerm);

  // Atualiza a URL e o estado apenas ao clicar no botão
  const handleSearchSubmit = (value: string) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Ação da página
  const handleAbrirModalNovoProduto = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ProdutoHeader 
        onNovoProduto={handleAbrirModalNovoProduto} 
        searchTerm={searchTerm}
        onSearchSubmit={handleSearchSubmit}
      />
      
      <ProdutoTable 
        data={data} 
        isLoading={isLoading} 
        isError={isError} 
        onPageChange={(novaPag) => setPage(novaPag)} 
      />

      <NovoProdutoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
