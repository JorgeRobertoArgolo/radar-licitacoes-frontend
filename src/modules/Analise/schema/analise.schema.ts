import { z } from "zod";

export const analiseSchema = z.object({
  precoProposto: z.coerce.number().min(0.01, "O preço proposto deve ser maior que zero"),
});

export type AnaliseFormData = z.infer<typeof analiseSchema>;
