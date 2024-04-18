## PostgreSQL

- Instalar UUID

```
psql -U seu_usuario -d seu_banco_de_dados

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

- Rodar Script

```
psql -d app -f create.sql
```

- Conectar
- obs: username e password é automatico.

```
psql -d app
```

---

#### SRP - Single Responsibility Principle

- Devemos separar coisas que mudam por motivos diferentes

#### DIP - Dependency Inversion Principle

- Componentes de alto nível não devem depender de componentes de baixo nível, eles devem depender de abstrações

#### OCP - Open/Closed Principle

- Fechado para modificação e aberto para extensão
  Crie pontos de extensão, evitando mexer no que já está funcionando e evitando fragilizar o código

#### LSP - Liskov Substituion Principle

#### ISP - Interface Segregation Principle

---

#### DTO - Data Transfer Object

- Objeto que só tem propriedades, sendo utilizado para transporte entre camadas da aplicação

#### Repository

- Realizar a persistência de aggregates (clusters de objetos de domínio como entities e value objects), separando essa responsabilidade da aplicação

#### Adapter

- Converte a interface de uma classe em outra esperada pelo cliente, permitindo que classes incompatíveis trabalhem juntas

#### Strategy

- Criar comportamento intercambiável

#### Dynamic Factory

- Criar uma instância com base em uma string

#### Presenter

- Formatar e adequar um determino conjunto de dados às necessidades do cliente

#### Decorator

- Permite acrescentar funcionalidades a um objeto existente (OCP)

#### Controller

- Conecta o driver com a aplicação, repassando os dados de entrada e retorno a saída de acordo com o drive

#### Composition Root

- Entrypoint da aplicação, onde são criadas as instâncias utilizadas pelos componentes, monta o grafo de dependências da aplicação

#### Mediator

- Cria um mecanismo de notificação para reduzir o acoplamento entre os objetos

```
Livros

GoF
Head First - Design Patterns
Patterns of Enterprise Application Architecture
```
