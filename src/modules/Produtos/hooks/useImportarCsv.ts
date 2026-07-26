import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produtoService } from "../services/produto.service";

export function useImportarCsv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => produtoService.importarCsv(file),
    onSuccess: () => {
      // Invalida as listas principais para refletir as importações imediatamente
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      queryClient.invalidateQueries({ queryKey: ["historico"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    }
  });
}
