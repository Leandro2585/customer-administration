# Customer Administration

## Como rodar a aplicação
- Em primeiro lugar é necessário ter instalado na máquina o docker e node para rodar essa aplicação

### Desenvolvimento:
  - Faça um clone do projeto em sua máquina ```git clone https://github.com/Leandro2585/customer-administration/```
  - Em seguida acesse o diretório em que seu repositório foi salvo ```cd Downloads/customer-administration```
  - Execute o comando ```docker-compose up -d``` para levantar a sua base de dados
  - Instale as dependências do projeto ```npm install```
  - Crie suas entidades no banco de dados com  ```npm run typeorm migration:run```
  - Rode a sua aplicação em ambiente de desenvolvimento com  ```npm run dev```

### Produção
  - Para inspecionar como a aplicação se comporte em ambiente de produção, basta seguir os mesmos passos do ambiente de desenvolvimento com exceção do último script para rodar a aplicação que nesse caso deve ser ```npm run start```

### Testes
  - Para verificar como está a situação dos testes da aplicação há três comandos disponíveis para executá-los em diferentes modos
  - ```npm run test```
  - ```npm run test:watch``` para verificar em tempo real as mudanças nos arquivos de teste (Obs: recomendado para desenvolvimento)
  - ```npm run test:coverage``` para coletar o coverage de todos os testes

## Features
Para testar as funcionalidades com a mão na massa há uma pasta http na raiz do projeto onde há alguns exemplares de requisições que podem ser feitas para a aplicação, para executá-las basta baixar a extensão do VsCode, Rest Client e rodá-las na seção `Send Request`
- [x] Criar Clientes
- [x] Authenticação
- [x] Carregar informações de usuários/clientes
- [] Editar informações de usuários/clientes
- [] Deletar usuários/clientes
