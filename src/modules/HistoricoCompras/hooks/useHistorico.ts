import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { historicoService } from "../services/historico.service";
import type { HistoricoCompraRequestDTO } from "../types/historico.types";
import type { ResultError } from "@/types/api";

export function useListarHistorico(produtoId: number, page = 0, size = 100) {
  return useQuery({
    queryKey: ["historico", produtoId, page, size],
    queryFn: () => historicoService.listarHistoricoPorProduto(produtoId, page, size),
    enabled: !!produtoId,
    staleTime: 60 * 1000,
  });
}

export function useSalvarHistorico(produtoId: number) {
  const queryClient = useQueryClient();

  return useMutation<any, ResultError, HistoricoCompraRequestDTO>({
    mutationFn: (data) => historicoService.salvarHistorico(data),
    onSuccess: () => {
      // Invalida o cache para recarregar o histórico e o gráfico automaticamente
      queryClient.invalidateQueries({ queryKey: ["historico", produtoId] });
    },
  });
}
