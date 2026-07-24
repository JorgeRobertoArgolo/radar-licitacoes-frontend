import { useParams } from "react-router-dom";

export default function AnalisePage() {
  const { id } = useParams();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-orange-600">A Malha Fina (Análise)</h1>
      <p className="text-gray-600 mt-2">Calculadora de sobrepreço para o Produto ID: {id}</p>
    </div>
  );
}
