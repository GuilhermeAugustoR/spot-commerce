# Spot Commerce - E-commerce com Vite, React e TypeScript

Este é um projeto de e-commerce frontend para uma loja de roupas e acessórios, construído com Vite, React, TypeScript, Tailwind CSS e shadcn/ui.

## Configuração do Projeto

1.  **Clone o repositório (ou copie os arquivos):**
    Se você baixou o código, coloque-o em uma pasta chamada `spot-commerce`.

2.  **Navegue até a pasta do projeto:**
    \`\`\`bash
    cd spot-commerce
    \`\`\`

3.  **Instale as dependências:**
    Certifique-se de ter o Node.js e o npm (ou yarn/pnpm) instalados.
    \`\`\`bash
    npm install

    # ou

    # yarn install

    # ou

    # pnpm install

    \`\`\`

4.  **Execute o servidor de desenvolvimento:**
    \`\`\`bash
    npm run dev
    # ou
    # yarn dev
    # ou
    # pnpm dev
    \`\`\`
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver ocupada).

## Estrutura do Projeto (Principais Pastas)

- `public/`: Arquivos estáticos.
- `src/`: Código fonte da aplicação.
  - `assets/`: Imagens, ícones, etc.
  - `components/`: Componentes React reutilizáveis.
    - `layout/`: Componentes de layout (Header, Footer).
    - `ui/`: Componentes shadcn/ui (gerados pelo CLI).
  - `contexts/`: Context API para gerenciamento de estado global (ex: Carrinho).
  - `data/`: Dados mockados (ex: produtos).
  - `hooks/`: Hooks customizados.
  - `lib/`: Funções utilitárias.
  - `pages/`: Componentes de página (rotas).
  - `types/`: Definições de tipos TypeScript.
  - `App.tsx`: Componente principal da aplicação com configuração de rotas.
  - `main.tsx`: Ponto de entrada da aplicação React.
  - `index.css`: Estilos globais e diretivas Tailwind.
- `index.html`: Arquivo HTML principal para o Vite.
- `vite.config.ts`: Configuração do Vite.
- `tailwind.config.js`: Configuração do Tailwind CSS.
- `tsconfig.json`: Configuração do TypeScript.

## Próximos Passos Sugeridos

- Implementar a página de Checkout.
- Integrar com um backend para:
  - Autenticação de usuários.
  - Gerenciamento de produtos real.
  - Processamento de pedidos.
  - Persistência de carrinho no servidor.
- Integrar um gateway de pagamento (Stripe, PagSeguro, etc.).
- Adicionar mais filtros e opções de ordenação na página de produtos.
- Criar um painel de administração.
- Escrever testes unitários e de integração.
