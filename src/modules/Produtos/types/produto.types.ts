import type { PaginatedResponse } from "@/types/api";

export interface ProdutoResponseDTO {
  id: number;
  nome: string;
  unidadeMedida: string;
}

export interface ProdutoRequestDTO {
  nome: string;
  unidadeMedida: string;
}

export type ProdutosPaginated = PaginatedResponse<ProdutoResponseDTO>;
