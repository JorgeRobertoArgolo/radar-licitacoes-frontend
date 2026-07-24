import type { PaginatedResponse } from "@/types/api";

export interface HistoricoCompraResponseDTO {
  id: number;
  produtoId: number;
  produtoNome: string;
  dataCompra: string;
  quantidade: number;
  precoUnitario: number;
  fornecedor: string;
}

export interface HistoricoCompraRequestDTO {
  produtoId: number;
  dataCompra: string;
  quantidade: number;
  precoUnitario: number;
  fornecedor: string;
}

export type HistoricoPaginated = PaginatedResponse<HistoricoCompraResponseDTO>;
