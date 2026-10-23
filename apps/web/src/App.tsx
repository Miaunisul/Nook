import { useEffect, useState } from 'react';

const widgets = [
  {
    number: '01',
    name: 'Pomodoro',
    description: 'Produza sem perder o foco.',
  },
  {
    number: '02',
    name: 'Notas rápidas',
    description: 'Não perca nenhuma ideia.',
  },
  {
    number: '03',
    name: 'Tasks',
    description: 'Mantenha suas próximas etapas a vista.',
  },
  {
    number: '04',
    name: 'Atalhos',
    description: 'Suas ferramentas favoritas, a um clique de distância.',
  },
];
type Pagina = 'home' | 'pomodoro' | 'notas' | 'tasks' | 'atalhos';

function App() {
  const [paginaAtual, setPaginaAtual] = useState<Pagina>('home');
  const [pomodoroMinutos, setPomodoroMinutos] = useState(25);
  const [pomodoroSegundos, setPomodoroSegundos] = useState(0);
  const [pomodoroAtivo, setPomodoroAtivo] = useState(false);

  useEffect(() => {
    if (!pomodoroAtivo) return;

    const intervalo = window.setInterval(() => {
      if (pomodoroMinutos === 0 && pomodoroSegundos === 0) {
        setPomodoroAtivo(false);
        return;
      }

      if (pomodoroSegundos === 0) {
        setPomodoroMinutos((minutos) => minutos - 1);
        setPomodoroSegundos(59);
        return;
      }

      setPomodoroSegundos((segundos) => segundos - 1);
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, [pomodoroAtivo, pomodoroMinutos, pomodoroSegundos]);

  function iniciarPomodoro() {
    if (pomodoroMinutos === 0 && pomodoroSegundos === 0) {
      setPomodoroMinutos(25);
      setPomodoroSegundos(0);
    }

    setPomodoroAtivo(true);
  }

  function pausarPomodoro() {
    setPomodoroAtivo(false);
  }

  function reiniciarPomodoro() {
    setPomodoroAtivo(false);
    setPomodoroMinutos(25);
    setPomodoroSegundos(0);
  }

  const [nota, setNota] = useState('');
  const [notaParaExcluir, setNotaParaExcluir] = useState<number | null>(null);
  const [notas, setNotas] = useState<string[]>(() => {
    try {
      const salvas = localStorage.getItem('nook-notas');
      return salvas ? (JSON.parse(salvas) as string[]) : [];
    } catch {
      return [];
    }
  });
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<number | null>(
    null,
  );
  const [tarefas, setTarefas] = useState<
    { id: number; texto: string; concluida: boolean }[]
  >(() => {
    try {
      const salvas = localStorage.getItem('nook-tarefas');
      return salvas ? JSON.parse(salvas) : [];
    } catch {
      return [];
    }
  });

  function adicionarNota() {
    const texto = nota.trim();

    if (!texto) return;

    const atualizadas = [texto, ...notas];

    setNotas(atualizadas);
    localStorage.setItem('nook-notas', JSON.stringify(atualizadas));
    setNota('');
  }

  function solicitarExclusaoNota(index: number) {
    setNotaParaExcluir(index);
  }

  function cancelarExclusaoNota() {
    setNotaParaExcluir(null);
  }

  function confirmarExclusaoNota() {
    if (notaParaExcluir === null) return;

    const atualizadas = notas.filter((_, index) => index !== notaParaExcluir);

    setNotas(atualizadas);
    localStorage.setItem('nook-notas', JSON.stringify(atualizadas));
    setNotaParaExcluir(null);
  }

  function adicionarTarefa() {
    const texto = novaTarefa.trim();

    if (!texto) return;

    const atualizadas = [
      ...tarefas,
      { id: Date.now(), texto, concluida: false },
    ];

    setTarefas(atualizadas);
    localStorage.setItem('nook-tarefas', JSON.stringify(atualizadas));

    setNovaTarefa('');
  }

  function alternarTarefa(id: number) {
    const atualizadas = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
    );
    setTarefas(atualizadas);
    localStorage.setItem('nook-tarefas', JSON.stringify(atualizadas));
  }

  function solicitarExclusao(id: number) {
    setTarefaParaExcluir(id);
  }

  function cancelarExclusao() {
    setTarefaParaExcluir(null);
  }

  function confirmarExclusao() {
    if (tarefaParaExcluir === null) return;

    const atualizadas = tarefas.filter(
      (tarefa) => tarefa.id !== tarefaParaExcluir,
    );

    setTarefas(atualizadas);
    localStorage.setItem('nook-tarefas', JSON.stringify(atualizadas));
    setTarefaParaExcluir(null);
  }

  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  const progressoTarefas =
    tarefas.length === 0
      ? 0
      : Math.round((tarefasConcluidas / tarefas.length) * 100);
  const tarefasOrganizadas = [...tarefas].sort(
    (a, b) => Number(a.concluida) - Number(b.concluida),
  );

  const paginaDoWidget: Record<string, Pagina> = {
    Pomodoro: 'pomodoro',
    'Notas rápidas': 'notas',
    Tasks: 'tasks',
    Atalhos: 'atalhos',
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Nook home">
          <img src="/Nook-Logo.png" alt="Nook" />
        </a>

        <p className="sidebar-label">SUAS SALAS</p>

        <nav className="navigation" aria-label="Main navigation">
          <a className="nav-link active" href="#workspace">
            <span>◫</span> Meu espaço
          </a>
          <a className="nav-link" href="#rooms">
            <span>◉</span> Salas privadas
          </a>
          <a className="nav-link" href="#communities">
            <span>◎</span> Comunidades
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">N</div>
          <div>
            <strong>Seu perfil</strong>
            <span>Área de trabalho pessoal</span>
          </div>
        </div>
      </aside>

      <section className="workspace" id="workspace">
        <header className="topbar">
          <span className="breadcrumb">Área de trabalho / Visão geral</span>
          <span className="status">
            <span className="status-dot" />
            Pronto para focar
          </span>
        </header>
        {paginaAtual === 'home' && (
          <div className="welcome">
            <p className="eyebrow">Olá, dev!</p>
            <h1>
              Seu espaço,
              <br />
              suas pessoas,
              <br />
              seu fluxo.
            </h1>
            <p className="welcome-description">
              Organize sua rotina, conecte-se com sua comunidade <br />e faça
              mais do seu dia.
            </p>
          </div>
        )}

        <section className="widget-section" aria-labelledby="widgets-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                {paginaAtual === 'home' ? 'SEU ESPAÇO' : 'FERRAMENTA'}
              </p>

              <h2 id="widgets-title">
                {paginaAtual === 'home'
                  ? 'Área de trabalho'
                  : widgets.find(
                      (widget) => paginaDoWidget[widget.name] === paginaAtual,
                    )?.name}
              </h2>
            </div>

            {paginaAtual === 'home' && (
              <span className="widget-count">04 WIDGETS</span>
            )}
          </div>

          {paginaAtual !== 'home' && (
            <button
              type="button"
              className="back-to-home"
              onClick={() => setPaginaAtual('home')}
            >
              ← Voltar ao meu espaço
            </button>
          )}

          <div className="widget-grid">
            {widgets
              .filter(
                (widget) =>
                  paginaAtual === 'home' ||
                  paginaDoWidget[widget.name] === paginaAtual,
              )
              .map((widget) => (
                <article
                  className={`widget-card ${paginaAtual === 'home' ? 'widget-card-compact' : 'widget-card-detail'}`}
                  key={widget.number}
                  onClick={() => {
                  if (paginaAtual === 'home') {
                      setPaginaAtual(paginaDoWidget[widget.name] ?? 'home');
                   }
                 }}
                >
                  <span className="widget-number">{widget.number}</span>
                  <div>
                    <h3>{widget.name}</h3>
                    <p>{widget.description}</p>
                  </div>
                  {paginaAtual === 'home' ? (
                    <span className="widget-arrow" aria-hidden="true">
                      ↗
                    </span>
                  ) : widget.name === 'Pomodoro' ? (
                    <div className="pomodoro">
                      <div className="pomodoro-timer">
                        {String(pomodoroMinutos).padStart(2, '0')}:
                        {String(pomodoroSegundos).padStart(2, '0')}
                      </div>

                      <div className="pomodoro-controls">
                        {pomodoroAtivo ? (
                          <button type="button" onClick={pausarPomodoro}>
                            Pausar
                          </button>
                        ) : (
                          <button type="button" onClick={iniciarPomodoro}>
                            Iniciar foco
                          </button>
                        )}

                        <button
                          className="pomodoro-reset"
                          type="button"
                          onClick={reiniciarPomodoro}
                        >
                          Reiniciar
                        </button>
                      </div>
                    </div>
                  ) : widget.name === 'Notas rápidas' ? (
                    <div className="quick-notes">
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          adicionarNota();
                        }}
                      >
                        <textarea
                          value={nota}
                          onChange={(event) => setNota(event.target.value)}
                          placeholder="Escreva uma ideia..."
                          aria-label="Escreva uma nota"
                          rows={3}
                        />

                        <button type="submit">Salvar nota +</button>
                      </form>

                      {notas.length > 0 && (
                        <ul className="quick-notes-list">
                          {notas.map((item, index) => (
                            <li
                              key={`${index}-${item}`}
                              className="quick-note-item"
                            >
                              <span className="quick-note-text">{item}</span>

                              <button
                                type="button"
                                className="quick-note-delete"
                                onClick={() => solicitarExclusaoNota(index)}
                                aria-label={`Excluir nota: ${item}`}
                                title="Excluir nota"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M3 6h18" />
                                  <path d="M8 6V4h8v2" />
                                  <path d="m19 6-1 14H6L5 6" />
                                  <path d="M10 11v5M14 11v5" />
                                </svg>
                              </button>

                              {notaParaExcluir === index && (
                                <div className="quick-note-confirmation">
                                  <span>Excluir esta nota?</span>

                                  <div>
                                    <button
                                      type="button"
                                      onClick={cancelarExclusaoNota}
                                    >
                                      Cancelar
                                    </button>

                                    <button
                                      type="button"
                                      onClick={confirmarExclusaoNota}
                                    >
                                      Excluir nota
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}

                      {notas.length === 0 && (
                        <p className="quick-notes-empty">
                          Nenhuma nota por enquanto. Guarde sua primeira ideia!
                        </p>
                      )}
                    </div>
                  ) : widget.name === 'Tasks' ? (
                    <div className="task-list">
                      <div className="task-progress">
                        <div className="task-progress-header">
                          <span>Seu progresso</span>
                          <span>
                            {tarefasConcluidas} de {tarefas.length} concluídas
                          </span>
                        </div>

                        <div
                          className="task-progress-track"
                          role="progressbar"
                          aria-label="Progresso das tarefas"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={progressoTarefas}
                        >
                          <div
                            className="task-progress-fill"
                            style={{ width: `${progressoTarefas}%` }}
                          />
                        </div>
                      </div>

                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          adicionarTarefa();
                        }}
                      >
                        <input
                          value={novaTarefa}
                          onChange={(event) =>
                            setNovaTarefa(event.target.value)
                          }
                          placeholder="Adicionar tarefa..."
                          aria-label="Nova tarefa"
                        />
                        <button type="submit">Adicionar +</button>
                      </form>

                      {tarefasOrganizadas.length > 0 && (
                        <ul>
                          {tarefasOrganizadas.map((tarefa) => (
                            <li key={tarefa.id} className="task-item">
                              <div className="task-item-main">
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={tarefa.concluida}
                                    onChange={() => alternarTarefa(tarefa.id)}
                                  />
                                  <span
                                    className={
                                      tarefa.concluida ? 'task-completed' : ''
                                    }
                                  >
                                    {tarefa.texto}
                                  </span>
                                </label>

                                <button
                                  type="button"
                                  className="task-delete-button"
                                  onClick={() => solicitarExclusao(tarefa.id)}
                                  aria-label={`Excluir tarefa: ${tarefa.texto}`}
                                  title="Excluir tarefa"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="m19 6-1 14H6L5 6" />
                                    <path d="M10 11v5M14 11v5" />
                                  </svg>
                                </button>
                              </div>

                              {tarefaParaExcluir === tarefa.id && (
                                <div className="task-delete-confirmation">
                                  <span>Excluir esta tarefa?</span>

                                  <div>
                                    <button
                                      type="button"
                                      onClick={cancelarExclusao}
                                    >
                                      Cancelar
                                    </button>

                                    <button
                                      type="button"
                                      onClick={confirmarExclusao}
                                    >
                                      Excluir tarefa
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}

                      {tarefas.length === 0 && (
                        <p className="task-empty">
                          Nenhuma tarefa por enquanto. Adicione a primeira!
                        </p>
                      )}
                    </div>
                  ) : widget.name === 'Atalhos' ? (
                    <p className="widget-placeholder">
                      Os atalhos estarão disponíveis em breve.
                    </p>
                  ) : null}
                </article>
              ))}
          </div>
        </section>
        {paginaAtual === 'home' && (
          <footer className="workspace-footer">
            <span>NOOK — Fase inicial,</span>
            <span> crie um canto para o que importa.</span>
          </footer>
        )}
      </section>
    </main>
  );
}

export default App;
