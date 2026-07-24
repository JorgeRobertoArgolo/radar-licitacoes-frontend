import { apiClient } from "@/api/client";
import type { HistoricoCompraRequestDTO, HistoricoCompraResponseDTO, HistoricoPaginated } from "../types/historico.types";

export const historicoService = {
  listarHistoricoPorProduto: async (produtoId: number, page = 0, size = 100): Promise<HistoricoPaginated> => {
    const response = await apiClient.get<HistoricoPaginated>(`/api/v1/radar-licitacao/historico-compras/produto/${produtoId}`, {
      params: { page, size, sort: 'dataCompra,desc' },
    });
    return response.data;
  },

  salvarHistorico: async (data: HistoricoCompraRequestDTO): Promise<HistoricoCompraResponseDTO> => {
    const response = await apiClient.post<HistoricoCompraResponseDTO>("/api/v1/radar-licitacao/historico-compras", data);
    return response.data;
  },
};
