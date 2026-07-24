import axios, { AxiosError } from 'axios';
import type { ResultError } from '@/types/api';

// Configuração base apontando para o backend Spring Boot local
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Resposta
apiClient.interceptors.response.use(
  (response) => {
    // Se a requisição deu sucesso, apenas devolve os dados (response)
    return response;
  },
  (error: AxiosError) => {
    // Tratamento global para o erro 422 (Validações do Spring / BindingResult)
    if (error.response?.status === 422) {
      const resultError = error.response.data as ResultError;
      console.warn('Erro 422 capturado globalmente (Validação):', resultError);
      
      // Retorna o reject para que o hook ou service possa pegar esse resultError
      // e injetar no React Hook Form!
      return Promise.reject(resultError);
    }

    // Tratamento para 404
    if (error.response?.status === 404) {
      console.warn('Recurso não encontrado (404).');
    }

    // Qualquer outro erro não tratado especificamente
    return Promise.reject(error);
  }
);
