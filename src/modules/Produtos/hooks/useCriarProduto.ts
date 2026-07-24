import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produtoService } from "../services/produto.service";
import type { ProdutoRequestDTO } from "../types/produto.types";
import type { ResultError } from "@/types/api";

export function useCriarProduto() {
  const queryClient = useQueryClient();

  return useMutation<any, ResultError, ProdutoRequestDTO>({
    mutationFn: (data) => produtoService.criarProduto(data),
    onSuccess: () => {
      // Invalida o cache da listagem para atualizar a tabela na hora!
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
}
