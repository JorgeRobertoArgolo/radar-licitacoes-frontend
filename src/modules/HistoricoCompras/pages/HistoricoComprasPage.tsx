import { useParams } from "react-router-dom";

export default function HistoricoComprasPage() {
  const { id } = useParams();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Detalhes do Produto e Histórico</h1>
      <p className="text-gray-600 mt-2">Exibindo histórico para o Produto ID: {id}</p>
    </div>
  );
}
