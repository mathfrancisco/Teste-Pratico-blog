# Microblog API

Uma API robusta de microblog desenvolvida com Django REST Framework, oferecendo funcionalidades similares ao Twitter/X, com foco em performance e escalabilidade.

## 🚀 Funcionalidades

- **Autenticação Segura**
  - Sistema completo de registro e login utilizando JWT (JSON Web Tokens)
  - Tokens de acesso e refresh para maior segurança
  - Validação robusta de dados de entrada

- **Gestão de Usuários**
  - Sistema de Follow/Unfollow
  - Perfis personalizados
  - Contagem de seguidores e seguindo

- **Posts**
  - Criação e gestão de posts
  - Sistema de curtidas
  - Comentários em posts
  - Feed personalizado baseado em quem o usuário segue

- **Feed Inteligente**
  - Agregação de posts do usuário e de quem ele segue
  - Ordenação por data
  - Paginação para melhor performance

## 🛠️ Tecnologias Utilizadas

- **Django 5.0**: Framework web Python de alto nível que incentiva o desenvolvimento rápido e limpo
- **Django REST Framework 3.14**: Kit de ferramentas poderoso e flexível para construir APIs Web
- **Simple JWT**: Implementação de JSON Web Token para Django REST Framework
- **SQLite**: Sistema de banco de dados (facilmente substituível por PostgreSQL em produção)
- **Python 3.8+**: Linguagem de programação principal

## 🔧 Instalação

1. Clone o repositório
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd microblog
```

2. Crie um ambiente virtual
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. Instale as dependências
```bash
pip install -r requirements.txt
```

4. Execute as migrações
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Crie um superusuário
```bash
python manage.py createsuperuser
```

6. Rode o servidor
```bash
python manage.py runserver
```

## 📚 Documentação da API

### Autenticação
- `POST /api/register/`: Cadastro de novo usuário
- `POST /api/login/`: Login de usuário

### Usuários
- `POST /api/users/{user_id}/follow/`: Seguir usuário
- `POST /api/users/{user_id}/unfollow/`: Deixar de seguir usuário
- `GET /api/profile/`: Obter perfil do usuário

### Posts
- `GET /api/posts/`: Listar feed
- `POST /api/posts/`: Criar post
- `POST /api/posts/{post_id}/like/`: Curtir/descurtir post
- `POST /api/posts/{post_id}/comment/`: Comentar post

## 🧪 Testes

Execute os testes usando:
```bash
python manage.py test
```

## 🤔 Por que essas escolhas?

1. **Django REST Framework**
   - Framework maduro e bem testado
   - Excelente documentação
   - Grande comunidade
   - Fácil de escalar
   - Segurança robusta por padrão

2. **JWT para Autenticação**
   - Stateless (não requer armazenamento no servidor)
   - Escalável
   - Seguro
   - Ideal para APIs RESTful

3. **Arquitetura do Projeto**
   - Separação clara de responsabilidades
   - Código modular e reutilizável
   - Fácil de manter e expandir
   - Testável

4. **Sistema de Feed**
   - Implementação eficiente usando queries otimizadas
   - Paginação para melhor performance
   - Fácil de escalar com cache se necessário

## 🔜 Próximos Passos

- [ ] Adicionar cache para melhorar performance
- [ ] Implementar busca de posts e usuários
- [ ] Adicionar sistema de hashtags
- [ ] Implementar sistema de notificações
- [ ] Adicionar suporte a mídia nos posts
- [ ] Implementar sistema de menções (@usuario)
- [ ] Adicionar endpoints para análises e métricas

# Microblog Frontend

Este é o frontend do projeto Microblog, uma aplicação web que permite aos usuários criar contas, publicar posts, seguir outros usuários e interagir com seus posts.

## 🚀 Funcionalidades

- **Interface Intuitiva:** Design moderno e responsivo para uma experiência de usuário agradável.
- **Feed Personalizado:** Visualize posts dos usuários que você segue, ordenados cronologicamente.
- **Criação de Posts:** Publique seus pensamentos e compartilhe com seus seguidores.
- **Interação com Posts:** Curta e comente nos posts de outros usuários.
- **Gerenciamento de Perfil:** Personalize seu perfil e veja seus seguidores e seguindo.
- **Autenticação Segura:** Integração com a API backend para registro e login seguros usando JWT.

## 🛠️ Tecnologias Utilizadas

- **Angular 18:** Framework JavaScript para construção de aplicações web robustas e escaláveis.
- **Bootstrap 5:** Framework CSS para estilização e componentes responsivos.
- **Tailwind CSS:** Framework utility-first para estilização rápida e personalizável.
- **TypeScript:** Superset tipado de JavaScript para melhor desenvolvimento e manutenção.
- **RxJS:** Biblioteca para programação reativa com Observables.
- **@auth0/angular-jwt:** Biblioteca para gerenciamento de tokens JWT.
- **@ng-bootstrap/ng-bootstrap:** Biblioteca para integração do Bootstrap com Angular.

## 💻 Instalação e Execução

1. **Clone o repositório:**

```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd microblog-frontend
Instale as dependências:

npm install
```

**Inicie o servidor de desenvolvimento**:

```bash
ng serve
```

A aplicação estará disponível em http://localhost:4200/.


**Build para produção (opcional)**:
```bash
ng build --configuration production
```

**Os arquivos de produção serão gerados na pasta dist/microblog-frontend.**

## 📂 Estrutura do Projeto


<pre>
microblog-frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── feed/           # Componente do feed de posts
│   │   │   ├── login/          # Componente de login
│   │   │   ├── navbar/         # Barra de navegação
│   │   │   ├── profile/        # Perfil do usuário
│   │   │   └── register/       # Registro de usuário
│   │   │
│   │   ├── guards/             # Guardas de rota
│   │   │   └── auth.guard.ts   # Proteção de rotas autenticadas
│   │   │
│   │   ├── interceptors/       # Interceptadores HTTP
│   │   │   └── token.interceptor.ts  # Adiciona token nas requisições
│   │   │
│   │   ├── models/             # Interfaces e tipos
│   │   │   ├── post.model.ts   # Modelo de post
│   │   │   └── user.model.ts   # Modelo de usuário
│   │   │
│   │   ├── services/           # Serviços da aplicação
│   │   │   ├── auth.service.ts # Serviço de autenticação
│   │   │   ├── post.service.ts # Serviço de posts
│   │   │   └── user.service.ts # Serviço de usuários
│   │   │
│   │   ├── app.component.*     # Componente raiz
│   │   ├── app.config.*        # Configurações
│   │   └── app.routes.ts       # Definição de rotas
│   │
│   ├── assets/                 # Recursos estáticos
│   ├── styles.css              # Estilos globais
│   ├── index.html              # HTML principal
│   └── main.ts                 # Ponto de entrada
│
├── public/                     # Arquivos públicos
├── angular.json                # Configuração Angular
├── package.json                # Dependências
├── tsconfig.json              # Configuração TypeScript
└── README.md                  # Documentação
</pre>

### 📝 Descrição dos Diretórios

#### `/src/app/components`
Contém todos os componentes Angular da aplicação, cada um em seu próprio diretório com arquivos de template, estilo e lógica.

#### `/src/app/guards`
Guardas de rota para proteger rotas que requerem autenticação.

#### `/src/app/interceptors`
Interceptadores HTTP para modificar requisições/respostas globalmente.

#### `/src/app/models`
Interfaces TypeScript que definem a estrutura dos dados.

#### `/src/app/services`
Serviços que encapsulam a lógica de negócios e comunicação com a API.

#### `/src/assets`
Arquivos estáticos como imagens, ícones e fontes.

#### `/src/styles`
Arquivos de estilo globais e configurações de tema.

### 🔧 Arquivos de Configuração

- `angular.json`: Configurações do projeto Angular
- `package.json`: Dependências e scripts npm
- `tsconfig.json`: Configurações do TypeScript
- `README.md`: Documentação do projeto

### 🎨 Componentes Principais

1. **Feed Component**
   - Exibe posts
   - Gerencia interações
   - Implementa paginação

2. **Login/Register Components**
   - Formulários de autenticação
   - Validação de dados
   - Feedback de erro

3. **Profile Component**
   - Exibe dados do usuário
   - Gerencia seguidores
   - Edita informações

4. **Navbar Component**
   - Navegação principal
   - Estado de autenticação
   - Menu de usuário

## Integração com a API Backend
**A aplicação frontend se comunica com a API backend através dos serviços definidos na pasta services.  As URLs da API são configuradas no arquivo app.config.ts.**

## 🧪 Testes

**Execute os testes unitários usando:**
```bash
ng test
```

## 🤔 Decisões de Design e Arquitetura

- **Componentes Reutilizáveis**: A aplicação utiliza componentes Angular para modularizar a interface e promover a reutilização de código.

- **Serviços para API**: Os serviços encapsulam a lógica de comunicação com a API backend, facilitando a manutenção e os testes.

- **Guardas de Rota**: Os guardas de rota protegem as rotas que exigem autenticação, redirecionando usuários não autenticados para a página de login.

- **Interceptadores HTTP**: Os interceptadores adicionam funcionalidades como cabeçalhos de autorização às requisições HTTP.

- **TypeScript**: O uso de TypeScript melhora a qualidade do código, facilita a refatoração e reduz erros em tempo de execução.

- **RxJS**: RxJS permite lidar com fluxos de dados assíncronos de forma eficiente e elegante.

## 🔜 Próximos Passos Frontend

- [ ] Implementar paginação no feed.

- [ ] Melhorar a estilização e o design da interface.

- [ ] Adicionar recursos de busca.

- [ ] Implementar notificações em tempo real.

- [ ] Adicionar suporte a upload de imagens.

- [ ] Implementar um sistema de mensagens privadas.

## 👥 Contribuindo

Este projeto é parte de um teste técnico e está atualmente sendo desenvolvido. Contribuições através de issues e pull requests são bem-vindas após a avaliação inicial.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Status do Projeto

Em desenvolvimento ativo. Data prevista de conclusão: 29/11/2024
