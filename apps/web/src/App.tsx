import { useState } from 'react';
import { usePomodoro } from './features/pomodoro/usePomodoro';
import { PomodoroView } from './features/pomodoro/PomodoroView';

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

type Atalho = {
  id: number;
  nome: string;
  url: string;
};

function App() {
  const [paginaAtual, setPaginaAtual] = useState<Pagina>('home');
  const {
  session: pomodoro,
  start: iniciarPomodoro,
  pause: pausarPomodoro,
  reset: reiniciarPomodoro,
  changeMode: alterarModoPomodoro,
} = usePomodoro();

  const [novoAtalhoNome, setNovoAtalhoNome] = useState('');
  const [novoAtalhoUrl, setNovoAtalhoUrl] = useState('');

  const [atalhos, setAtalhos] = useState<Atalho[]>(() => {
    try {
      const salvos = localStorage.getItem('nook-atalhos');
      return salvos ? (JSON.parse(salvos) as Atalho[]) : [];
    } catch {
      return [];
    }
  });

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
  function adicionarAtalho() {
    const nome = novoAtalhoNome.trim();
    const entrada = novoAtalhoUrl.trim();

    if (!nome || !entrada) {
      return;
    }

    let urlFinal: URL;

    try {
      const entradaComProtocolo = /^https?:\/\//i.test(entrada)
        ? entrada
        : `https://${entrada}`;

      urlFinal = new URL(entradaComProtocolo);
    } catch {
      return;
    }

    if (urlFinal.protocol !== 'http:' && urlFinal.protocol !== 'https:') {
      return;
    }

    const novoAtalho: Atalho = {
      id: Date.now(),
      nome,
      url: urlFinal.href,
    };

    const atualizados = [...atalhos, novoAtalho];

    setAtalhos(atualizados);
    localStorage.setItem('nook-atalhos', JSON.stringify(atualizados));

    setNovoAtalhoNome('');
    setNovoAtalhoUrl('');
  }

  function excluirAtalho(id: number) {
    const atualizados = atalhos.filter((atalho) => atalho.id !== id);

    setAtalhos(atualizados);
    localStorage.setItem('nook-atalhos', JSON.stringify(atualizados));
  }
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Nook home">
          <img src="/Nook-Logo.png" alt="Nook" />
        </a>

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
        {paginaAtual === 'home' && (
          <div className="hero">
            <img
              className="hero-symbol"
              src="/Nook-Logo-Sybol.png"
              alt=""
              aria-hidden="true"
            />
            <div className="welcome">
              <p className="eyebrow">Olá, programador!</p>
              <h1 className="welcome-title">
                Seu espaço,
                <br />
                suas pessoas,
                <br />
                <span className="gradient-text">seu fluxo.</span>
              </h1>
              <p className="welcome-description">
                Organize sua rotina, conecte-se com sua comunidade <br />e faça
                mais do seu dia.
              </p>
            </div>
          </div>
        )}
        {paginaAtual === 'home' && (
          <div className="hero-divider" aria-hidden="true" />
        )}

        <section className="widget-section" aria-labelledby="widgets-title">
          <div className="section-heading">
            <div>
              {paginaAtual === 'home' ? (
                <>
                  <h2 id="widgets-title">Seu espaço</h2>
                  <p className="section-description">
                    Ferramentas e atalhos para o seu dia.
                  </p>
                </>
              ) : (
                <>
                  <p className="eyebrow">FERRAMENTA</p>
                  <h2 id="widgets-title">
                    {
                      widgets.find(
                        (widget) => paginaDoWidget[widget.name] === paginaAtual,
                      )?.name
                    }
                  </h2>
                </>
              )}
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
                  <div className="widget-icon" aria-hidden="true">
                    {widget.name === 'Pomodoro' ? (
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="13" r="8" />
                        <path d="M12 9v4l3 2M9 2h6M12 2v3M19 5l1.5 1.5" />
                      </svg>
                    ) : widget.name === 'Notas rápidas' ? (
                      <svg viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6M8 13h8M8 17h6" />
                      </svg>
                    ) : widget.name === 'Tasks' ? (
                      <svg viewBox="0 0 24 24">
                        <rect x="4" y="4" width="16" height="16" rx="3" />
                        <path d="m8 12 3 3 5-6" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7" />
                        <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3>{widget.name}</h3>
                    <p>{widget.description}</p>
                  </div>
                  {paginaAtual === 'home' ? (
                    <span className="widget-arrow" aria-hidden="true">
                      ↗
                    </span>
                    ) : widget.name === 'Pomodoro' ? (
                      <PomodoroView
                      session={pomodoro}
                      onStart={iniciarPomodoro}
                      onPause={pausarPomodoro}
                      onReset={reiniciarPomodoro}
                      onChangeMode={alterarModoPomodoro}
                    />

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
                    <div className="shortcuts-content">
                      <form
                        className="shortcut-form"
                        onSubmit={(event) => {
                          event.preventDefault();
                          adicionarAtalho();
                        }}
                      >
                        <input
                          type="text"
                          value={novoAtalhoNome}
                          onChange={(event) =>
                            setNovoAtalhoNome(event.target.value)
                          }
                          placeholder="Nome do atalho"
                          aria-label="Nome do atalho"
                          required
                        />

                        <input
                          type="text"
                          value={novoAtalhoUrl}
                          onChange={(event) =>
                            setNovoAtalhoUrl(event.target.value)
                          }
                          placeholder="exemplo.com"
                          aria-label="Endereço do site"
                          required
                        />

                        <button type="submit" className="shortcut-add">
                          + Adicionar
                        </button>
                      </form>

                      {atalhos.length === 0 ? (
                        <p className="shortcut-empty">
                          Seus sites favoritos aparecerão aqui.
                        </p>
                      ) : (
                        <div className="shortcut-list">
                          {atalhos.map((atalho) => (
                            <div className="shortcut-item" key={atalho.id}>
                              <a
                                className="shortcut-link"
                                href={atalho.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Abrir ${atalho.nome}`}
                              >
                                <ShortcutIcon url={atalho.url} />
                                <span>{atalho.nome}</span>
                              </a>

                              <button
                                type="button"
                                className="shortcut-delete"
                                onClick={() => excluirAtalho(atalho.id)}
                                aria-label={`Excluir ${atalho.nome}`}
                                title="Excluir atalho"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
function ShortcutIcon({ url }: { url: string }) {
  const [falhou, setFalhou] = useState(false);

  let dominio = '';

  try {
    dominio = new URL(url).hostname;
  } catch {
    dominio = '';
  }

  if (falhou || !dominio) {
    return (
      <span className="shortcut-icon-fallback" aria-hidden="true">
        🌐
      </span>
    );
  }

  return (
    <img
      className="shortcut-icon"
      src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(dominio)}&sz=64`}
      alt=""
      onError={() => setFalhou(true)}
    />
  );
}
export default App;
