# Projeto de Automação de Testes com Cypress e TypeScript

Este projeto implementa um conjunto de testes automatizados utilizando [Cypress](https://www.cypress.io/) com suporte a [TypeScript](https://www.typescriptlang.org/).

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento antes de começar:

- [Node.js (versão LTS)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (gerenciador de pacotes)

## Instalação

### Passos para configurar o projeto:

1. **Instalando as bibliotecas:**

    Se estiver usando `npm`:

    ```bash
    npm install
    ```

    Se estiver usando `yarn`:

    ```bash
    yarn install
    ```

2. **Executando os testes:**

    Existem diferentes maneiras de rodar os testes, dependendo de como você quer visualizar os resultados.

    - **Para abrir o Cypress em modo interativo** (onde você pode ver os testes rodando no navegador e depurar em tempo real), use o seguinte comando:

      Se estiver usando `npm`:

      ```bash
      npm run test:open
      ```

      Se estiver usando `yarn`:

      ```bash
      yarn test:open
      ```

      Esse comando abrirá a interface gráfica do Cypress para que você possa selecionar e rodar os testes manualmente.

    - **Para rodar os testes em modo headless** (sem interface gráfica, ideal para CI/CD), utilize o seguinte comando:

      Se estiver usando `npm`:

      ```bash
      npm run test:headless
      ```

      Se estiver usando `yarn`:

      ```bash
      yarn test:headless
      ```

      Esse comando executará todos os testes automaticamente no terminal, sem abrir o navegador.

    - **Para rodar todos os testes automaticamente**, utilizando a interface padrão do Cypress para exibir os resultados no navegador:

      Se estiver usando `npm`:

      ```bash
      npm run test
      ```

      Se estiver usando `yarn`:

      ```bash
      yarn test
      ```

## Comandos configurados

Os seguintes scripts estão configurados no arquivo `package.json` para facilitar a execução dos testes:

```json
{
  "scripts": {
    "test": "cypress run",
    "test:open": "cypress open",
    "test:headless": "cypress run --headless"
  }
}
