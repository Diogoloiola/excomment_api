## Excomment API

Api que retorna os dados necessários para o front-end do <a href="https://github.com/Diogoloiola/excomment-web">projeto</a>

## Instalando o projeto

## Baixando o projeto

    git clone https://github.com/Diogoloiola/api_excomment.git

## Entrando no projeto

    cd api_excomment

## Instalando a API localmente

    Para executar essa aplicação localmente você deve ter instalado o ruby on rails, clique <a href="https://gorails.com/setup">aqui</a> para instalar o projeto

## Configurando o arquivo de conexão com o banco de dados

Adicione as configurações locais do seu banco de dados no arquivo.

    # config/database.yml

    default: &default
        adapter: postgresql
        encoding: unicode
        host: 
        user: 
        password:
        pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

    development:
        <<: *default
        database: base_local

    test:
        <<: *default
        database: base_local_test

    production:
        <<: *default
        database: base_local


## Executando o servidor

    rails server