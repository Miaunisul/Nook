
const widgets = [
  {
    number: '01',
    name: 'Pomodoro',
    description: 'Make time for focused work.',
  },
  {
    number: '02',
    name: 'Quick Notes',
    description: 'Capture ideas before they disappear.',
  },
  {
    number: '03',
    name: 'Tasks',
    description: 'Keep your next steps in sight.',
  },
  {
    number: '04',
    name: 'Shortcuts',
    description: 'Your favorite tools, one click away.',
  },
];

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Nook home">
         <img src="/Nook-Logo.png" alt="Nook" />
        </a>

        <p className="sidebar-label">YOUR SPACE</p>

        <nav className="navigation" aria-label="Main navigation">
          <a className="nav-link active" href="#workspace">
            <span>◫</span> My workspace
          </a>
          <a className="nav-link" href="#rooms">
            <span>◉</span> Private rooms
          </a>
          <a className="nav-link" href="#communities">
            <span>◎</span> Communities
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">N</div>
          <div>
            <strong>Your profile</strong>
            <span>Personal workspace</span>
          </div>
        </div>
      </aside>

      <section className="workspace" id="workspace">
        <header className="topbar">
          <span className="breadcrumb">My workspace / Overview</span>
          <span className="status">
            <span className="status-dot" />
            Ready to focus
          </span>
        </header>

        <div className="welcome">
          <p className="eyebrow">YOUR SPACE. YOUR PEOPLE. YOUR FLOW.</p>
          <h1>A little space<br />to do great things.</h1>
          <p className="welcome-description">
            Your tools, your thoughts, your flow.
            Everything starts here.
          </p>
        </div>

        <section className="widget-section" aria-labelledby="widgets-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR SETUP</p>
              <h2 id="widgets-title">Your workspace</h2>
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
                <span className="widget-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>

        <footer className="workspace-footer">
          <span>NOOK — EARLY DEVELOPMENT</span>
          <span>Make room for what matters.</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
