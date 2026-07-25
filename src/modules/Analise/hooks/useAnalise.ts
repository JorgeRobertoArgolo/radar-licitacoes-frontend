import { useMutation } from "@tanstack/react-query";
import { analiseService } from "../services/analise.service";
import type { AnalisePrecoResponseDTO } from "../types/analise.types";
import type { ResultError } from "@/types/api";

export function useAnalisarProposta(produtoId: number) {
  return useMutation<AnalisePrecoResponseDTO, ResultError, number>({
    mutationFn: (precoProposto) => analiseService.analisarProposta(produtoId, precoProposto),
  });
}
