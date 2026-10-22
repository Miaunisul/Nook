import { useState } from 'react';

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
    name: 'Atalhoss',
    description: 'Suas ferramentas favoritas, a um clique de distância.',
  },
];

function App() {

  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState<string[]>(() => {
    try {
      const salvas = localStorage.getItem('nook-notas');
      return salvas ? (JSON.parse(salvas) as string[]) : [];
    } catch {
      return [];
    }
  });
    const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState<
    { id: number; texto: string; concluida: boolean }[]
  >([]);

  function adicionarNota() {
    const texto = nota.trim();

    if (!texto) return;

    const atualizadas = [texto, ...notas];

    setNotas(atualizadas);
    localStorage.setItem('nook-notas', JSON.stringify(atualizadas));
    setNota('');
  }
  function adicionarTarefa() {
  const texto = novaTarefa.trim();

  if (!texto) return;

  setTarefas((atuais) => [
    ...atuais,
    { id: Date.now(), texto, concluida: false },
  ]);

  setNovaTarefa('');
}

function alternarTarefa(id: number) {
  setTarefas((atuais) =>
    atuais.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, concluida: !tarefa.concluida }
        : tarefa,
    ),
  );
}

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

        <div className="welcome">
          <p className="eyebrow">SEU ESPAÇO. SEUS AMIGOS. SEU RITIMO.</p>
          <h1>Grandes ideias<br />não ocupam espaço.</h1>
          <p className="welcome-description">
            Sua ferramenta, seus pensamentos. Começa aqui.
          </p>
        </div>

        <section className="widget-section" aria-labelledby="widgets-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SEU SETUP</p>
              <h2 id="widgets-title">Área de trabalho</h2>
            </div>
            <span className="widget-count">04 WIDGETS</span>
          </div>

          <div className="widget-grid">
            {widgets.map((widget) => (
              <article className="widget-card" key={widget.number}>
                <span className="widget-number">{widget.number}</span>
                <div>
                  <h3>{widget.name}</h3>
                  <p>{widget.description}</p>
                </div>

                {widget.name === 'Notas rápidas' ? (
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
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        ) : widget.name === 'Tasks' ? (
  <div className="task-list">
    <form
      onSubmit={(event) => {
        event.preventDefault();
        adicionarTarefa();
      }}
    >
      <input
        value={novaTarefa}
        onChange={(event) => setNovaTarefa(event.target.value)}
        placeholder="Adicionar tarefa..."
        aria-label="Nova tarefa"
      />
      <button type="submit">Adicionar +</button>
    </form>

    {tarefas.length > 0 && (
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <label>
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarTarefa(tarefa.id)}
              />
              <span className={tarefa.concluida ? 'task-completed' : ''}>
                {tarefa.texto}
              </span>
            </label>
          </li>
        ))}
      </ul>
    )}
  </div>
      ) : (
                <span className="widget-arrow" aria-hidden="true">
                  ↗
                </span>
                 )}
              </article>
            ))}
          </div>
        </section>

        <footer className="workspace-footer">
          <span>NOOK — Fase inicial,</span>
          <span> crie um canto para o que importa.</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
