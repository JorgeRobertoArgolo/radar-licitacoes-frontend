import { apiClient } from "@/api/client";
import type { AnalisePrecoRequestDTO, AnalisePrecoResponseDTO } from "../types/analise.types";

export const analiseService = {
  analisarProposta: async (produtoId: number, precoProposto: number): Promise<AnalisePrecoResponseDTO> => {
    const payload: AnalisePrecoRequestDTO = { precoProposto };
    const response = await apiClient.post<AnalisePrecoResponseDTO>(
      `/api/v1/radar-licitacao/analise-licitacoes/${produtoId}/analisar`, 
      payload
    );
    return response.data;
  },
};
