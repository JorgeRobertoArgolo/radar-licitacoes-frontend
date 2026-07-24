import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { historicoSchema, type HistoricoFormData } from "../schema/historico.schema";
import { useSalvarHistorico } from "../hooks/useHistorico";

interface NovoHistoricoModalProps {
  isOpen: boolean;
  onClose: () => void;
  produtoId: number;
}

export function NovoHistoricoModal({ isOpen, onClose, produtoId }: NovoHistoricoModalProps) {
  const { mutate, isPending, error } = useSalvarHistorico(produtoId);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<HistoricoFormData>({
    resolver: zodResolver(historicoSchema) as any,
    defaultValues: {
      dataCompra: new Date().toISOString().split('T')[0], // Padrão é Hoje
      quantidade: 1,
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (error && error.errosDeCampo) {
      error.errosDeCampo.forEach((err) => {
        setError(err.campo as keyof HistoricoFormData, {
          type: "server",
          message: err.mensagem,
        });
      });
    }
  }, [error, setError]);

  const onSubmit = (data: any) => {
    // Injetamos o produtoId no objeto antes de enviar pro backend
    mutate({ ...data, produtoId }, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Registrar Compra</h2>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {error && !error.errosDeCampo && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium">
              {error.mensagem || "Ocorreu um erro ao salvar."}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Fornecedor (Ocupa linha toda) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Fornecedor</label>
              <input
                {...register("fornecedor")}
                disabled={isPending}
                className={`w-full px-4 py-3 rounded-xl border ${errors.fornecedor ? "border-rose-300" : "border-slate-200 focus:border-indigo-400"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-slate-700`}
                placeholder="Ex: Distribuidora Nacional LTDA"
              />
              {errors.fornecedor && <p className="mt-1 text-sm text-rose-500">{errors.fornecedor.message}</p>}
            </div>

            {/* Data */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data da Compra</label>
              <input
                type="date"
                {...register("dataCompra")}
                disabled={isPending}
                className={`w-full px-4 py-3 rounded-xl border ${errors.dataCompra ? "border-rose-300" : "border-slate-200 focus:border-indigo-400"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-slate-700 cursor-pointer`}
              />
              {errors.dataCompra && <p className="mt-1 text-sm text-rose-500">{errors.dataCompra.message}</p>}
            </div>

            {/* Preço */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preço Unitário (R$)</label>
              <input
                type="number"
                step="0.01"
                {...register("precoUnitario")}
                disabled={isPending}
                className={`w-full px-4 py-3 rounded-xl border ${errors.precoUnitario ? "border-rose-300" : "border-slate-200 focus:border-indigo-400"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-slate-700`}
                placeholder="0.00"
              />
              {errors.precoUnitario && <p className="mt-1 text-sm text-rose-500">{errors.precoUnitario.message}</p>}
            </div>

            {/* Quantidade */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade Adquirida</label>
              <input
                type="number"
                {...register("quantidade")}
                disabled={isPending}
                className={`w-full px-4 py-3 rounded-xl border ${errors.quantidade ? "border-rose-300" : "border-slate-200 focus:border-indigo-400"} bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-slate-700`}
              />
              {errors.quantidade && <p className="mt-1 text-sm text-rose-500">{errors.quantidade.message}</p>}
            </div>
          </div>

          <div className="mt-8 flex gap-3 justify-end">
            <button type="button" onClick={handleClose} disabled={isPending} className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors cursor-pointer">Cancelar</button>
            <button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 cursor-pointer">
              {isPending && <Loader2 size={18} className="animate-spin" />}
              <span>{isPending ? "Salvando..." : "Registrar Compra"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
