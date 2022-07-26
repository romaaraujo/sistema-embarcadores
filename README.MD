# Sistema-Embarcadores

- Instalação e Configuração [Docker]
```bash
# Renomeie o arquivo .env-example para .env

$ docker-compose up
```

- Instalação e Configuração [Local]
```bash
# Renomeie o arquivo .env-example para .env
# Configure os dados de acesso ao banco de dados no .env
# Faça o backup do arquivo init.sql, presente na pasta .docker na raiz do projeto

$ cd app
$ npm install
$ npm run start
```

- Testes Unitários
```bash
# A pasta app/tests contém os testes da aplicação

$ cd app
$ npm install
$ npm run test
```

- Instruções para o acesso à aplicação:

No arquivo `init.sql`, presente na pasta `.docker`, possui algumas inserções para agilizar o processo de início da aplicação. Dois usuários (romario@teste.com e romario2@teste.com) foram criados com perfis embarcador e transportador, respectivamente. Ambos os perfis possuem a senha padrão `senha123`.

- Tecnologias utilizadas no projeto: 
1. NodeJs
2. EJS (Engine Template)
3. Bootstap (Estilização)
4. PostgreSQL
5. Jest (Testes Unitários)
6. Docker