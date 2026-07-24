import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string()
    .min(3, "O nome do produto deve ter no mínimo 3 caracteres")
    .max(255, "O nome do produto não pode exceder 255 caracteres"),
  unidadeMedida: z.string()
    .min(1, "Selecione uma unidade de medida")
});

export type ProdutoFormData = z.infer<typeof produtoSchema>;
