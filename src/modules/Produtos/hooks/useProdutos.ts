import { useQuery } from "@tanstack/react-query";
import { produtoService } from "../services/produto.service";

export function useListarProdutos(page: number, size: number, nome?: string) {
  return useQuery({
    queryKey: ["produtos", page, size, nome],
    queryFn: () => produtoService.listarProdutos(page, size, nome),
    staleTime: 60 * 1000, // 1 minuto de cache local
  });
}

export function useBuscarProduto(id: number) {
  return useQuery({
    queryKey: ["produtos", id],
    queryFn: () => produtoService.buscarProduto(id),
    staleTime: 60 * 1000,
  });
}
