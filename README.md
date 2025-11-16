# Fake Store - Uma Loja de Exemplo com Angular

Este projeto é uma aplicação web de e-commerce construída com **Angular**. Ela simula uma loja, onde é possível visualizar produtos, adicioná-los ao carrinho.

## Funcionalidades

  * **Listagem de Produtos**: Exibe uma lista de produtos consumindo a [Fake Store API](https://fakestoreapi.com/).
  * **Detalhes do Produto**: Cada produto tem sua própria página de detalhes.
  * **Carrinho de Compras**: Um carrinho funcional onde você pode adicionar, remover e ajustar a quantidade de produtos.
  * **Persistência do Carrinho**: O estado do carrinho é persistido no **`localStorage`**, garantindo que os itens não se percam ao recarregar a página.

## Principais Tecnologias Utilizadas

  * **Angular**: Framework principal para a construção da aplicação front-end.
  * **RxJS**: Utilizado para gerenciar fluxos de dados assíncronos.
  * **Angular Material & Bootstrap**: Usados para estilização e componentes de UI.
  * **[Fake Store API](https://fakestoreapi.com/)**: Uma API RESTful pública e gratuita utilizada para simular a listagem de produtos e autenticação.

-----

## Como Iniciar a Aplicação

Siga os passos abaixo para rodar a aplicação em seu ambiente local.

### 1\. Instalar as Dependências

Primeiro, navegue até a pasta do projeto no seu terminal e instale todas as dependências necessárias.

```bash
npm install
```

### 2\. Executar a Aplicação

Depois que a instalação estiver completa, inicie o servidor de desenvolvimento.

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`.
