import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useListarProdutos } from "../hooks/useProdutos";
import { ProdutoHeader } from "../components/ProdutoHeader";
import { ProdutoTable } from "../components/ProdutoTable";

export default function ProdutosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Estado local para a barra de pesquisa
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(0);
  
  // Solicitamos 100 itens apenas para que o filtro visual funcione bem localmente,
  // já que o backend não possui um endpoint de busca por nome nativo.
  const size = 100;

  // Lógica (Dados / Rede)
  const { data, isLoading, isError } = useListarProdutos(page, size);

  // Filtragem local
  const filteredData = useMemo(() => {
    if (!data) return undefined;
    if (!searchTerm) return data;
    
    const lowerSearch = searchTerm.toLowerCase();
    const filteredContent = data.content.filter(p => 
      p.nome.toLowerCase().includes(lowerSearch)
    );
    
    return {
      ...data,
      content: filteredContent,
    };
  }, [data, searchTerm]);

  // Atualiza a URL e o estado apenas ao clicar no botão
  const handleSearchSubmit = (value: string) => {
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
    setPage(0); // Volta pra primeira página ao buscar
  };

  // Ação da página
  const handleAbrirModalNovoProduto = () => {
    console.log("Abrir modal de criação! (A fazer)");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <ProdutoHeader 
        onNovoProduto={handleAbrirModalNovoProduto} 
        searchTerm={searchTerm}
        onSearchSubmit={handleSearchSubmit}
      />
      
      <ProdutoTable 
        data={filteredData} 
        isLoading={isLoading} 
        isError={isError} 
        onPageChange={(novaPag) => setPage(novaPag)} 
      />
    </div>
  );
}
