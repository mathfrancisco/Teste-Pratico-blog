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

## 👥 Contribuindo

Este projeto é parte de um teste técnico e está atualmente sendo desenvolvido. Contribuições através de issues e pull requests são bem-vindas após a avaliação inicial.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Status do Projeto

Em desenvolvimento ativo. Data prevista de conclusão: 29/11/2024
