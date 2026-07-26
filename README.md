# 🔍 Radar de Licitações — Frontend

Interface de usuário (SPA) para **auditoria preventiva de compras públicas**, desenvolvida para a Prefeitura de Irecê. O sistema permite o cadastro de histórico de compras e realiza a análise estatística ("Malha Fina") de novas propostas de licitação de forma visual, amigável e em tempo real.

---

## 📋 Sumário

- [Como Funciona](#-como-funciona)
- [Arquitetura e Stack](#%EF%B8%8F-arquitetura-e-stack)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Fluxo da Informação (React Query)](#-fluxo-da-informação-react-query)
- [A Experiência do Usuário (UX)](#-a-experiência-do-usuário-ux)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Como Executar](#-como-executar)
- [Padrões de Código](#-padrões-de-código)

---

## 🧠 Como Funciona

1. **O Painel de Controle (Dashboard):** Visão geral da plataforma, apresentando um buscador inteligente para encontrar os produtos cadastrados e cartões de métricas (KPIs).
2. **Catálogo e Histórico:** O usuário cadastra produtos e registra compras passadas, alimentando a base estatística. Gráficos dinâmicos mostram a flutuação do preço do produto ao longo do tempo.
3. **A Malha Fina (Análise):** O coração da aplicação. O pregoeiro insere um "Preço Proposto" e o sistema plota o resultado em um **Velocímetro (Gauge) de Risco**, indicando de imediato (Verde ou Vermelho) se há indícios de superfaturamento.
4. **Resiliência Visual:** Em casos onde a amostragem é insuficiente (menos de 3 registros), a tela exibe alertas laranjas amigáveis orientando a avaliação manual.

---

## ⚙️ Arquitetura e Stack

| Tecnologia | Finalidade |
|---|---|
| **React 19** | Biblioteca principal de UI (SPA) |
| **Vite 6** | Bundler ultra-rápido e dev server |
| **TypeScript** | Tipagem estática e segurança no código |
| **Tailwind CSS v4** | Estilização via utilitários, sem CSS mágico |
| **React Query v5** | Gerenciamento de estado de servidor (Server State), cache e mutações |
| **React Router DOM v7** | Roteamento do lado do cliente (Client-side routing) |
| **Axios** | Cliente HTTP para consumo da API REST |
| **React Hook Form + Zod** | Validação de formulários e bind de inputs |
| **Recharts** | Gráficos e visualização de dados (Linha do tempo) |
| **Lucide React** | Biblioteca de ícones modernos |

---

## 📁 Estrutura do Projeto

A arquitetura adota uma abordagem orientada a **Módulos (Feature-sliced design adaptado)**, evitando o acoplamento excessivo na raiz.

```text
src/
├── api/                   # Configuração do Axios e Interceptors globais
├── components/            # Componentes genéricos da UI (ex: Button, Layout, Skeleton)
├── styles/                # Estilos globais mínimos (index.css)
├── types/                 # Tipagens globais (Paginação, Erros da API)
├── utils/                 # Funções utilitárias (ex: formatMoeda)
└── modules/               # Módulos de domínio da aplicação
    ├── Analise/           # A "Malha Fina" e Velocímetro
    ├── HistoricoCompras/  # Gráficos e tabela de compras
    ├── Home/              # Dashboard
    └── Produtos/          # Catálogo e cadastro
```

### O Padrão de cada Módulo
Dentro de cada pasta de módulo (ex: `src/modules/Produtos/`), a estrutura se repete:
- `components/`: Componentes visuais puramente apresentacionais ("Dumb Components").
- `hooks/`: Orquestradores lógicos que encapsulam o uso do React Query (ex: `useProdutos.ts`).
- `services/`: Pura chamada de rede (invocam o Axios).
- `schema/`: Validação Zod atrelada aos formulários.
- `types/`: Tipagens TypeScript espelhando os DTOs do backend.
- `pages/`: Telas exportadas para o React Router DOM.

---

## 🔄 Fluxo da Informação (React Query)

O estado da aplicação é estritamente separado entre **Estado de UI** (useState/Hook Form) e **Estado do Servidor** (TanStack Query).

1. **Requisição (Service):** Uma função isolada faz o `axios.get` ou `axios.post`.
2. **Estado Async (Hook):** O React Query (`useQuery` / `useMutation`) encapsula o Service, controlando `isLoading`, `isError` e cache.
3. **Mutações Inteligentes:** Quando um produto ou compra é cadastrado, usamos `queryClient.invalidateQueries(...)` para recarregar as tabelas instantaneamente, sem precisar de "refresh" de página.
4. **Exibição (Component):** O componente reage aos estados do Hook para exibir Skeleton Loaders, Formulários ou Empty States.

---

## 🎨 A Experiência do Usuário (UX)

O frontend foi desenhado pensando na melhor experiência (DevEx e UserEx):

1. **Skeleton Loaders:** Requisições pesadas bloqueiam botões nativamente, mas a renderização inicial exibe "esqueletos" pulsantes (Skeleton) em vez de telas em branco.
2. **Tratamento Global de Erros 422:** O interceptor do Axios captura erros HTTP 422 lançados pela API (Bean Validation do Spring), converte do padrão `snake_case` do Java para o `camelCase` do JavaScript, e "pinta" instantaneamente de vermelho os inputs incorretos na tela via React Hook Form.
3. **Proteção Visual contra 404:** Páginas de estado vazio (Empty States) amigáveis interceptam entidades não encontradas ou URLs inválidas.
4. **Falhas Seguras:** A lógica de cálculo do velocímetro e de métricas está protegida contra retornos nulos (ex: Desvio Padrão 0 causando valores nulos de Escore Z na API).

---

## 🌐 Rotas da Aplicação

| Rota | Módulo Referência | Descrição |
|---|---|---|
| `/` | `Home` | Dashboard principal e KPIs globais |
| `/produtos` | `Produtos` | Listagem paginada do catálogo |
| `/produtos/:id` | `HistoricoCompras` | Perfil do produto (Gráfico de oscilação + Tabela de histórico) |
| `/analise/:id` | `Analise` | A Malha Fina (Simulação e Escore-Z) |

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** (v18+ recomendado)
- **NPM** (ou Yarn/PNPM)
- Backend Spring Boot rodando na porta `8081`

### Instalação

1. Clone o projeto e entre na pasta:
```bash
cd radar-licitacoes-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

> **Nota:** O Vite está configurado (`vite.config.ts`) com um proxy de desenvolvimento interceptando `/api` e enviando diretamente para o Backend em `http://localhost:8081`, mitigando problemas de CORS durante o dev.

---

## 📐 Padrões de Código

- **Estilização Restrita:** Uso exclusivo de utilitários TailwindCSS (v4). Evitamos propriedades embutidas como `style={{}}` (exceto para cálculos matemáticos impossíveis no CSS, como no Gauge).
- **Tratamento de Assincronia:** Proibido uso cru de `useEffect` para fetch. Todas as requisições passam pela cache layer do **TanStack Query**.
- **Padrão de Nomenclatura:**
  - Interfaces/Types baseadas nos DTOs: `NomeRequestDTO`, `NomeResponseDTO`.
  - Componentes: `PascalCase.tsx`.
  - Hooks: `useCamelCase.ts`.
- **Desacoplamento:** Componentes visuais (`components/`) não conhecem Axios ou React Query. Essa responsabilidade fica exclusivamente com os hooks orquestradores e as páginas (`pages/`).
