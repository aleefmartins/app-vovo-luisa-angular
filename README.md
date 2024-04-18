# Projeto Angular - Cadastro de Clientes Delicias da Vovó Luisa.

Este é um projeto frontend desenvolvido em angular para gerenciar o cadastro de clientes de uma pequena lanchonete chamada Delicias da Vovó Luisa.

## Objetivo

O objetivo deste projeto é fornecer uma solução simples e eficiente para o cadastro e gerenciamento de clientes de uma lanchonete. Ele oferece endpoints para criar, atualizar, listar e excluir clientes, facilitando a gestão das informações dos clientes da lanchonete.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org) (versão 14.x ou superior)
- npm (Node Package Manager), normalmente instalado junto com o Node.js
- Angular CLI (Command Line Interface) - você pode instalá-lo globalmente executando o seguinte comando no terminal: (versão 17.x ou superior)
```
npm install -g @angular/cli
```

## Instalação do projeto
1- Clone este repositório para o seu ambiente local ou faça o download do código-fonte
```
git clone https://github.com/aleefmartins/app-vovo-luisa-angular.git
```

2- Navegue até o diretório do projeto.
```
cd app-vovo-luisa
```

3- Instale as dependências do projeto usando npm.
```
npm install
```
## Executando o Projeto

Depois de instalar as dependências, você pode iniciar o servidor de duas formas:

### Utilizando endpoints local:

- Utilize o comando abaixo para rodar o projeto, apontando para o endpoint http://localhost:8083, correspondente ao backend.
OBS: é importante lembrar, que caso você tenha o desejo de rodar desta forma, esteja com o backend rodando em sua maquina também.
Para rodar o backend, basta [Clicar aqui](https://github.com/aleefmartins/backend-vovo-luisa) e seguir as instruções para rodar o Backend.

```
ng serve
```
### Utilizando endpoints AWS
- Utilize o comando abaixo para rodar o projeto, apontando para os endpoints criados na AWS, correspondente ao backend.
OBS: Com esse comando, não há necessidade de rodar o backend localmente.

```
ng serve --configuration=production
```

## Build do projeto - (Levando os arquivos para produção)

Depois de instalar as dependências, você pode realizar o build de duas formas:

### Utilizando endpoints local:

- Utilize o comando abaixo para realizar o build projeto, apontando para o endpoint http://localhost:8083, correspondente ao backend.
os arquivos estarão disponíveis na pasta ``dist/``. Copie os arquivos desta pasta para o servidor aonde deseja hospedar o site.
OBS: é importante lembrar, que caso você tenha o desejo de rodar desta forma, esteja com o backend rodando em sua maquina também.
Para rodar o Backend, basta [Clicar aqui](https://github.com/aleefmartins/backend-vovo-luisa) e seguir as instruções para rodar o Backend.

```
ng build
```
### Utilizando endpoints AWS
- Utilize o comando abaixo para realizar o build o projeto, apontando para os endpoints criados na AWS, correspondente ao backend.
os arquivos estarão disponíveis na pasta ``dist/``. Copie os arquivos desta pasta para o servidor aonde deseja hospedar o site.
OBS: Com esse comando, não há necessidade de rodar o backend localmente.

```
ng build --configuration=production
```
## Rodar os testes unitários.

Caso tenha desejo de rodar os testes unitários, basta aplicar os seguintes comandos:
```
ng test
```
Caso precise saber a porcentagem de cobertura:
```
ng test --code-coverage
```


