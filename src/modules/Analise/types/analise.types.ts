export interface AnalisePrecoRequestDTO {
  precoProposto: number;
}

export interface AnalisePrecoResponseDTO {
  riscoSuperfaturamento: boolean;
  mensagem: string;
  mediaHistorica: number;
  desvioPadrao: number;
  escoreZ: number;
  probabilidade: number;
  quantidadeAmostras: number;
}
