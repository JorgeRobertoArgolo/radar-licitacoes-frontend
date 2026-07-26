import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { produtoSchema, type ProdutoFormData } from "../schema/produto.schema";
import { useCriarProduto } from "../hooks/useCriarProduto";

interface NovoProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NovoProdutoModal({ isOpen, onClose }: NovoProdutoModalProps) {
  const { mutate, isPending, error } = useCriarProduto();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
  });

  // Fecha e reseta o formulário
  const handleClose = () => {
    reset();
    onClose();
  };

  // Magia do 422: Captura os erros de backend e amarra nos campos correspondentes!
  useEffect(() => {
    if (error && error.errosDeCampo) {
      error.errosDeCampo.forEach((err) => {
        const camelCampo = err.campo.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        setError(camelCampo as keyof ProdutoFormData, {
          type: "server",
          message: err.mensagem,
        });
      });
    }
  }, [error, setError]);

  const onSubmit = (data: ProdutoFormData) => {
    mutate(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Novo Produto</h2>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          
          {/* Mensagem Global de Erro do Backend (se não for de campo) */}
          {error && !error.errosDeCampo && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium">
              {error.mensagem || "Ocorreu um erro ao salvar o produto."}
            </div>
          )}

          <div className="space-y-5">
            {/* Campo Nome */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nome do Produto
              </label>
              <input
                {...register("nome")}
                disabled={isPending}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.nome ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-400"
                } bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 transition-all text-slate-700`}
                placeholder="Ex: Amoxicilina 500mg"
              />
              {errors.nome && (
                <p className="mt-1.5 text-sm text-rose-500 font-medium">{errors.nome.message}</p>
              )}
            </div>

            {/* Campo Unidade de Medida */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Unidade de Medida
              </label>
              <select
                {...register("unidadeMedida")}
                disabled={isPending}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.unidadeMedida ? "border-rose-300 focus:ring-rose-200" : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-400"
                } bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 transition-all text-slate-700 cursor-pointer`}
              >
                <option value="">Selecione uma unidade</option>
                <option value="Unidade">Unidade</option>
                <option value="Caixa">Caixa</option>
                <option value="Comprimido">Comprimido</option>
                <option value="Litro">Litro</option>
                <option value="Quilograma">Quilograma</option>
                <option value="Tonelada">Tonelada</option>
                <option value="Metro">Metro</option>
                <option value="Ampola">Ampola</option>
                <option value="Frasco">Frasco</option>
              </select>
              {errors.unidadeMedida && (
                <p className="mt-1.5 text-sm text-rose-500 font-medium">{errors.unidadeMedida.message}</p>
              )}
            </div>
          </div>

          {/* Rodapé do Modal */}
          <div className="mt-8 flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending && <Loader2 size={18} className="animate-spin" />}
              <span>{isPending ? "Salvando..." : "Salvar Produto"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
