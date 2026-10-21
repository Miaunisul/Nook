
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
