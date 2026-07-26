import { useState, useRef } from "react";
import { X, UploadCloud, Loader2, FileCheck } from "lucide-react";
import { useImportarCsv } from "../hooks/useImportarCsv";

interface ImportacaoCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportacaoCsvModal({ isOpen, onClose }: ImportacaoCsvModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { mutate, isPending, error, isSuccess, data, reset } = useImportarCsv();

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      mutate(file);
    }
  };

  const resetAndClose = () => {
    setFile(null);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <UploadCloud className="text-indigo-600" />
            Importar Dados via CSV
          </h2>
          <button 
            onClick={resetAndClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                <FileCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Importação Concluída!</h3>
              <p className="text-slate-600 mb-6">
                Foram criados ou atualizados <strong>{data?.produtosCriados}</strong> produtos e importados <strong>{data?.historicosCriados}</strong> registros de histórico.
              </p>
              <button 
                onClick={resetAndClose}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all"
              >
                Continuar
              </button>
            </div>
          ) : (
            <>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Envie um arquivo <strong>.csv</strong> contendo as colunas: <code>produto_nome</code>, <code>unidade_medida</code>, <code>data_compra</code>, <code>quantidade</code>, <code>preco_unitario</code> e <code>fornecedor</code>.
              </p>
              
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors
                  ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-indigo-400 bg-slate-50"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  ref={inputRef}
                  type="file" 
                  accept=".csv"
                  onChange={handleChange}
                  className="hidden" 
                />
                
                {file ? (
                  <div className="flex flex-col items-center">
                    <FileCheck size={40} className="text-indigo-600 mb-3" />
                    <p className="font-medium text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                    <button 
                      onClick={() => setFile(null)}
                      className="mt-4 text-sm text-rose-500 hover:text-rose-700 font-medium"
                      disabled={isPending}
                    >
                      Remover arquivo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud size={40} className="text-slate-400 mb-3" />
                    <p className="font-medium text-slate-700 mb-1">Arraste e solte o arquivo aqui</p>
                    <p className="text-sm text-slate-500 mb-4">ou clique para selecionar do seu computador</p>
                    <button 
                      onClick={() => inputRef.current?.click()}
                      className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                      Selecionar Arquivo CSV
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-600 flex items-start gap-2">
                  <p><strong>Erro na importação:</strong> {(error as any)?.message || (error as any)?.mensagem || "Verifique se o CSV está no formato correto e não possui dados inválidos."}</p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={resetAndClose}
                  disabled={isPending}
                  className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={!file || isPending}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center min-w-[150px] disabled:opacity-50 disabled:hover:bg-indigo-600"
                >
                  {isPending ? <Loader2 size={20} className="animate-spin" /> : 'Importar Dados'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
