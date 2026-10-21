
# NOOK — Documento de Requisitos do Sistema

**Documento 04 · Versão 1.0 · Outubro de 2026**

**Escopo:** Requisitos funcionais, não funcionais, segurança e critérios de aceitação.

## 1. Objetivo do documento

Este documento define os requisitos necessários para o desenvolvimento do Nook, estabelecendo o que o sistema deve fazer, quais condições de qualidade deve atender, quais medidas de segurança devem ser implementadas e como verificar se as funcionalidades estão funcionando corretamente.

O documento servirá como referência para as etapas de design, arquitetura, desenvolvimento, testes e validação do produto.

Os requisitos estão divididos em quatro categorias:

- Requisitos funcionais (RF);
- Requisitos não funcionais (RNF);
- Requisitos de segurança e privacidade (SEG);
- Critérios de aceitação (CA).

Este documento complementa as Regras de Negócio, o Mapeamento dos Fluxos de Uso e os Diagramas dos Fluxos de Uso do Nook.

## 2. Visão geral do sistema

O Nook é um workspace digital voltado para desenvolvedores e pessoas da área de tecnologia. Seu objetivo é reunir ferramentas de produtividade, organização pessoal e interação entre pessoas em um ambiente personalizável, sincronizado na nuvem.

O sistema deverá oferecer:

- Workspaces pessoais, com possibilidade de criar múltiplos espaços por usuário;
- Widgets de produtividade, como Pomodoro, notas rápidas, tarefas, atalhos e relógio/calendário;
- Salas privadas para grupos;
- Comunidades públicas para descoberta e interação;
- Sistema de presença e status de disponibilidade;
- Chamadas de voz e compartilhamento de tela;
- Autenticação por e-mail e GitHub;
- Persistência de configurações e dados na nuvem;
- Controle de acesso baseado em papéis e permissões;
- Integração limitada com o GitHub.

O desenvolvimento inicial terá foco em computadores, sem deixar de considerar a adaptação da interface a telas menores.

O MVP (Produto Mínimo Viável) não incluirá videochamadas, gravação de chamadas, uma IDE completa ou funcionalidades avançadas de programação colaborativa dentro da plataforma.

## 3. Convenções de prioridade

Os requisitos serão classificados conforme sua importância para o desenvolvimento.

| Prioridade | Significado |
|---|---|
| P0 — Essencial | Necessário para o funcionamento seguro e coerente do MVP. |
| P1 — Importante | Relevante para a experiência inicial, mas pode ser implementado em uma etapa posterior planejada. |
| P2 — Futuro | Funcionalidade prevista para evolução após o MVP. |

A prioridade não elimina a necessidade de validar requisitos legais e de segurança antes do lançamento.

## 4. Requisitos funcionais

Os requisitos funcionais descrevem as funcionalidades e os comportamentos que o sistema deverá oferecer ao usuário.

### 4.1. Cadastro e autenticação

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-001 | Cadastro de usuário | O sistema deverá permitir a criação de contas de usuário. | P0 |
| RF-002 | Login por e-mail | O sistema deverá permitir a autenticação utilizando e-mail e senha. | P0 |
| RF-003 | Login pelo GitHub | O sistema deverá permitir a autenticação por meio do GitHub. | P0 |
| RF-004 | Recuperação de acesso | O sistema deverá oferecer um fluxo seguro de recuperação de acesso. | P0 |
| RF-005 | Validação da conta | O sistema deverá verificar as condições necessárias para ativação e utilização da conta. | P0 |
| RF-006 | Controle de sessão | O sistema deverá permitir o encerramento da sessão e controlar sessões expiradas ou revogadas. | P0 |
| RF-007 | Estado da conta | Contas suspensas ou encerradas não poderão executar operações protegidas. | P0 |

### 4.2. Workspaces pessoais

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-008 | Criação de workspace | O usuário poderá criar um ou mais workspaces pessoais. | P0 |
| RF-009 | Privacidade do workspace | Cada workspace pessoal deverá ser privado por padrão. | P0 |
| RF-010 | Configuração inicial | O usuário poderá definir nome, preferências e widgets iniciais. | P0 |
| RF-011 | Configuração padrão | O usuário poderá pular a personalização inicial e começar com uma configuração padrão. | P0 |
| RF-012 | Organização visual | O usuário poderá reorganizar a posição dos widgets no workspace. | P0 |
| RF-013 | Persistência do layout | A organização dos widgets deverá permanecer salva após o encerramento da sessão. | P0 |
| RF-014 | Personalização de ícones | O usuário poderá alterar cores dos ícones dentro das opções disponibilizadas. | P1 |
| RF-015 | Exclusão de workspace | O proprietário poderá excluir um workspace, mediante confirmação quando a ação for destrutiva. | P0 |

No MVP, a organização dos widgets será permitida, mas o redimensionamento livre de cada widget não será disponibilizado.

### 4.3. Widgets de produtividade

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-016 | Widget Pomodoro | O sistema deverá disponibilizar um temporizador para sessões de foco e pausas. | P0 |
| RF-017 | Widget de notas | O usuário poderá criar, editar e excluir notas rápidas. | P0 |
| RF-018 | Widget de tarefas | O usuário poderá criar, editar, concluir e excluir tarefas. | P0 |
| RF-019 | Widget de atalhos | O usuário poderá cadastrar e acessar links e atalhos externos. | P0 |
| RF-020 | Widget de relógio/calendário | O sistema deverá disponibilizar uma visualização simples de horário e calendário. | P0 |
| RF-021 | Adição de widgets | O usuário poderá adicionar widgets disponíveis ao workspace. | P0 |
| RF-022 | Remoção de widgets | O usuário poderá remover widgets do workspace sem afetar os dados de outros espaços. | P0 |
| RF-023 | Salvamento dos dados | As informações persistentes dos widgets deverão ser salvas na nuvem. | P0 |
| RF-024 | Sincronização | As alterações deverão ser sincronizadas entre sessões e dispositivos compatíveis. | P0 |

### 4.4. Compartilhamento temporário de workspaces

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-025 | Compartilhamento temporário | O proprietário poderá compartilhar um workspace com usuários autorizados por tempo limitado. | P0 |
| RF-026 | Definição de permissões | O proprietário poderá definir quais ações o convidado poderá executar. | P0 |
| RF-027 | Expiração do acesso | O compartilhamento deverá expirar automaticamente ao atingir o prazo definido. | P0 |
| RF-028 | Revogação de acesso | O proprietário poderá revogar o compartilhamento a qualquer momento. | P0 |
| RF-029 | Aplicação imediata da revogação | A revogação deverá impedir novas operações protegidas, inclusive em sessões ativas. | P0 |
| RF-030 | Proteção dos dados do proprietário | O convidado não poderá editar notas, tarefas, widgets ou configurações sem permissão explícita. | P0 |
| RF-031 | Limite de compartilhamento | O compartilhamento temporário deverá respeitar o limite máximo de duração definido nas regras de negócio. | P0 |

### 4.5. Salas privadas

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-032 | Criação de sala privada | O usuário poderá criar salas privadas para interação em grupo. | P0 |
| RF-033 | Convite de participantes | O proprietário ou usuário autorizado poderá convidar pessoas para uma sala. | P0 |
| RF-034 | Controle de membros | Usuários autorizados poderão gerenciar a participação na sala conforme suas permissões. | P0 |
| RF-035 | Persistência da sala | A sala continuará existindo mesmo quando seu proprietário estiver offline. | P0 |
| RF-036 | Controle de propriedade | A ausência do proprietário não transferirá automaticamente a propriedade da sala. | P0 |
| RF-037 | Restrição de acesso | Somente membros autorizados poderão acessar o conteúdo e os recursos privados da sala. | P0 |

### 4.6. Comunidades públicas

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-038 | Criação de comunidade | O usuário poderá criar uma comunidade pública conforme as regras da plataforma. | P0 |
| RF-039 | Descoberta de comunidades | O sistema permitirá localizar comunidades públicas disponíveis para participação. | P0 |
| RF-040 | Entrada em comunidade | A comunidade poderá permitir entrada aberta ou exigir aprovação. | P0 |
| RF-041 | Solicitação de entrada | Quando necessário, o usuário poderá solicitar acesso a uma comunidade. | P0 |
| RF-042 | Papéis de comunidade | O sistema deverá oferecer papéis de proprietário, administrador, moderador e membro. | P0 |
| RF-043 | Moderação | Usuários autorizados poderão aplicar ações de moderação dentro de suas permissões. | P0 |
| RF-044 | Denúncias | O usuário poderá denunciar conteúdos ou comportamentos inadequados. | P0 |
| RF-045 | Bloqueio de usuários | O sistema deverá permitir bloquear usuários conforme as regras da plataforma. | P0 |
| RF-046 | Proteção de dados pessoais | Os papéis administrativos de uma comunidade não concederão acesso automático aos dados privados dos workspaces pessoais. | P0 |

### 4.7. Presença e interação social

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-047 | Status de presença | O usuário poderá definir seu status como Disponível, Foco, Ausente, Ocupado ou Invisível. | P0 |
| RF-048 | Atualização de presença | O sistema deverá atualizar a presença conforme as alterações do usuário e os eventos de conexão pertinentes. | P0 |
| RF-049 | Exibição de presença | A presença será exibida somente nos contextos autorizados pelas regras de privacidade. | P0 |
| RF-050 | Modo invisível | O usuário poderá utilizar o Nook sem aparecer como disponível nas listas públicas de presença. | P0 |
| RF-051 | Proteção contra exposição indireta | O modo invisível deverá evitar exposição indevida por listas públicas, buscas ou informações de última atividade. | P0 |

### 4.8. Chamadas de voz e compartilhamento de tela

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-052 | Chamadas de voz | O sistema deverá permitir chamadas de voz entre usuários autorizados. | P0 |
| RF-053 | Compartilhamento de tela | O usuário poderá compartilhar sua tela mediante ação explícita. | P0 |
| RF-054 | Autorização de comunicação | O início e a participação em chamadas deverão respeitar as permissões e o contexto de acesso. | P0 |
| RF-055 | Indicador de compartilhamento | A interface deverá informar claramente quando a tela estiver sendo compartilhada. | P0 |
| RF-056 | Interrupção do compartilhamento | O usuário poderá interromper o compartilhamento de tela imediatamente. | P0 |
| RF-057 | Ausência de gravação | O MVP não oferecerá gravação de chamadas ou compartilhamentos. | P0 |

### 4.9. Integração com GitHub

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-058 | Conexão com GitHub | O usuário poderá conectar sua conta GitHub por meio do fluxo de autorização disponibilizado. | P1 |
| RF-059 | Escopo limitado | A integração deverá solicitar somente as permissões necessárias às funcionalidades implementadas. | P0 |
| RF-060 | Desconexão da integração | O usuário poderá desconectar sua conta GitHub do Nook. | P1 |

### 4.10. Conta e dados pessoais

| ID | Requisito | Descrição | Prioridade |
|---|---|---|---|
| RF-061 | Configurações da conta | O usuário poderá consultar e alterar as configurações de conta disponibilizadas. | P0 |
| RF-062 | Exclusão de conta | O sistema deverá oferecer um fluxo de exclusão de conta com confirmação da ação. | P0 |
| RF-063 | Tratamento dos dados na exclusão | O sistema deverá tratar os dados pessoais e os recursos coletivos associados à conta conforme as regras de negócio, as permissões existentes e as obrigações legais de retenção. | P0 |

A exclusão da conta deverá considerar a propriedade de salas e comunidades, os dados compartilhados e a necessidade de transferência de propriedade quando aplicável. A exclusão não deverá conceder acesso indevido a dados privados nem apagar automaticamente dados de terceiros sem a devida avaliação.
