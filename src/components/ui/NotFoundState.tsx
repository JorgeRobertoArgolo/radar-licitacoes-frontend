import { PackageX, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface NotFoundStateProps {
  title?: string;
  message?: string;
  backLink?: string;
  backText?: string;
}

export function NotFoundState({
  title = "Recurso Não Encontrado",
  message = "O item que você está tentando acessar não existe ou foi removido.",
  backLink = "/produtos",
  backText = "Voltar ao catálogo"
}: NotFoundStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center max-w-lg mx-auto min-h-[50vh]">
      <div className="bg-rose-50 text-rose-500 p-6 rounded-full mb-6">
        <PackageX size={64} strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">{title}</h2>
      <p className="text-slate-500 mb-8 leading-relaxed">
        {message}
      </p>
      <Link
        to={backLink}
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
      >
        <ArrowLeft size={18} />
        <span>{backText}</span>
      </Link>
    </div>
  );
}
