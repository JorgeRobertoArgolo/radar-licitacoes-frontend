import { z } from "zod";

export const historicoSchema = z.object({
  dataCompra: z.string().min(1, "A data da compra é obrigatória"),
  quantidade: z.coerce.number().min(1, "A quantidade deve ser de pelo menos 1"),
  precoUnitario: z.coerce.number().min(0.01, "O preço deve ser maior que zero"),
  fornecedor: z.string().min(2, "O nome do fornecedor é muito curto")
});

export type HistoricoFormData = z.infer<typeof historicoSchema>;
