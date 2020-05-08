# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (backgroud job);

**Regra de Negocio**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário presica confirmar a nova senha ao resetar;

# Atualizar perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, email, senha e avatar;

**Requisitos Não Funcionais**

**Regra de Negocio**

- O usuário não pode alterar seus email para um email já utilizado.
- Para atualizar sua senha o usuario deve informar sua senha antiga.
- Para atualizar sua senha o usuario deve confirmar sua nova senha.

# Painel do prestador

**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;


**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia deve ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
-

**Regra de Negocio**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**Requisitos Funcionais**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador;
-  O usuário deve poder listar horarios disponiveis em um dia especifico de um prestador;
-  O usuário deve poder realizar um novo agendamento com um prestador

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regra de Negocio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro ás 8h, último as 17h);
- O usuario não pode agendar em um horário já ocupado;
- O usuario não pode agendar em um horário que já passou;
- O usuario não pode agendar serviços consigo mesmo;
