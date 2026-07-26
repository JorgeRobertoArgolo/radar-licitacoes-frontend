import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Beaker, Loader2, AlertTriangle } from "lucide-react";

import { useBuscarProduto } from "@/modules/Produtos/hooks/useProdutos";
import { useAnalisarProposta } from "../hooks/useAnalise";
import { analiseSchema, type AnaliseFormData } from "../schema/analise.schema";
import { AnaliseResultCard } from "../components/AnaliseResultCard";
import { SkeletonPage } from "@/components/ui/Skeleton";
import { NotFoundState } from "@/components/ui/NotFoundState";
import type { AnalisePrecoResponseDTO } from "../types/analise.types";

export default function AnalisePage() {
  const { id } = useParams<{ id: string }>();
  const produtoId = Number(id);

  const { data: produto, isLoading: isLoadingProduto } = useBuscarProduto(produtoId);
  const { mutate: analisar, isPending, error: mutationError } = useAnalisarProposta(produtoId);

  const [resultado, setResultado] = useState<AnalisePrecoResponseDTO | null>(null);
  const [precoAnalisado, setPrecoAnalisado] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AnaliseFormData>({
    resolver: zodResolver(analiseSchema) as any,
  });

  useEffect(() => {
    if (mutationError && mutationError.errosDeCampo) {
      mutationError.errosDeCampo.forEach((err) => {
        // Converte snake_case para camelCase se o backend mandar snake_case
        const camelCampo = err.campo.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        setError(camelCampo as keyof AnaliseFormData, {
          type: "server",
          message: err.mensagem,
        });
      });
    }
  }, [mutationError, setError]);

  const onSubmit = (data: any) => {
    setResultado(null);
    setPrecoAnalisado(data.precoProposto);
    
    analisar(data.precoProposto, {
      onSuccess: (res) => {
        setResultado(res);
      }
    });
  };

  const isAmostragemInsuficiente = resultado && resultado.mensagem.toLowerCase().includes("amostra");

  if (isLoadingProduto) {
    return <SkeletonPage />;
  }

  if (!produto) {
    return (
      <NotFoundState 
        title="Produto não encontrado" 
        message="Não foi possível iniciar a Análise pois este produto não consta em nosso catálogo." 
      />
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Cabeçalho */}
      <div className="mb-8">
        <Link to={`/produtos/${produto.id}`} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4 group cursor-pointer">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar ao painel do produto</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-700 shadow-sm">
            <Beaker size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">A Malha Fina</h1>
            <p className="text-slate-500 mt-1">Analisando proposta para: <strong>{produto.nome}</strong></p>
          </div>
        </div>
      </div>

      {/* Formulário de Input */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Insira o valor da proposta em licitação</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 w-full relative">
            <label className="block text-sm font-medium text-slate-700 mb-1">Preço Proposto (R$)</label>
            <input
              type="number"
              step="0.01"
              disabled={isPending}
              {...register("precoProposto")}
              className={`w-full px-4 py-3 rounded-xl border ${errors.precoProposto ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 transition-all text-slate-700 text-lg font-medium`}
              placeholder="Ex: 12.50"
            />
            {errors.precoProposto && <p className="mt-1.5 text-sm font-medium text-rose-500 absolute">{errors.precoProposto?.message as string}</p>}
            {mutationError && !mutationError.errosDeCampo && !isAmostragemInsuficiente && (
              <p className="mt-1.5 text-sm font-medium text-rose-500 absolute">{mutationError.mensagem}</p>
            )}
          </div>
          
          <div className="pt-6 w-full md:w-auto">
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer h-[52px] border border-indigo-700 disabled:opacity-70"
            >
              {isPending ? <Loader2 size={20} className="animate-spin" /> : <Beaker size={20} />}
              <span>{isPending ? "Processando..." : "Rodar Algoritmo"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Amostragem Insuficiente */}
      {isAmostragemInsuficiente && (
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white p-4 rounded-full shadow-sm text-amber-500">
            <AlertTriangle size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Amostragem Insuficiente</h3>
            <p className="text-amber-700 leading-relaxed">
              {resultado?.mensagem || "Não há registros de compras suficientes no histórico deste produto para uma análise estatística confiável."}
            </p>
            <p className="mt-2 text-amber-800 font-medium">⚠️ Sugerimos a análise manual por parte do pregoeiro.</p>
          </div>
        </div>
      )}

      {/* Resultado da Análise */}
      {resultado && !isAmostragemInsuficiente && (
        <AnaliseResultCard resultado={resultado} precoAnalisado={precoAnalisado} />
      )}
    </div>
  );
}
