import { apiClient } from "@/api/client";
import type { ProdutoRequestDTO, ProdutoResponseDTO, ProdutosPaginated } from "../types/produto.types";

export const produtoService = {
  listarProdutos: async (page = 0, size = 10, nome?: string): Promise<ProdutosPaginated> => {
    const response = await apiClient.get<ProdutosPaginated>("/api/v1/radar-licitacao/produtos", {
      params: { page, size, ...(nome && { nome }) },
    });
    return response.data;
  },

  criarProduto: async (data: ProdutoRequestDTO): Promise<ProdutoResponseDTO> => {
    const response = await apiClient.post<ProdutoResponseDTO>("/api/v1/radar-licitacao/produtos", data);
    return response.data;
  },

  buscarProduto: async (id: number): Promise<ProdutoResponseDTO> => {
    const response = await apiClient.get<ProdutoResponseDTO>(`/api/v1/radar-licitacao/produtos/${id}`);
    return response.data;
  },

  importarCsv: async (file: File): Promise<{ produtosCriados: number, historicosCriados: number }> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post("/api/v1/radar-licitacao/importacao/csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  },
};
