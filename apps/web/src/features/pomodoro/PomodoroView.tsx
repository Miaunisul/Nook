
import type { PomodoroMode, PomodoroSession } from './types';

type PomodoroViewProps = {
  session: PomodoroSession;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onChangeMode: (mode: PomodoroMode) => void;
};

const modes: { id: PomodoroMode; label: string }[] = [
  { id: 'focus', label: 'Foco' },
  { id: 'shortBreak', label: 'Pausa curta' },
  { id: 'longBreak', label: 'Pausa longa' },
];

export function PomodoroView({
  session,
  onStart,
  onPause,
  onReset,
  onChangeMode,
}: PomodoroViewProps) {
  const minutes = Math.floor(session.remainingSeconds / 60);
  const seconds = session.remainingSeconds % 60;
  const isRunning = session.status === 'running';

  return (
    <div className="pomodoro-view">
      <div className="pomodoro-view-header">
        <div>
          <span className="pomodoro-view-eyebrow">SEU MOMENTO DE FOCO</span>
          <h2>Encontre seu ritmo.</h2>
          <p>Uma tarefa de cada vez.</p>
        </div>
      </div>

      <div className="pomodoro-view-content">
        <div className="pomodoro-view-modes">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className={session.mode === mode.id ? 'selected' : ''}
              aria-pressed={session.mode === mode.id}
              onClick={() => onChangeMode(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="pomodoro-view-clock">
          <span className="pomodoro-view-time">
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </span>
          <span className="pomodoro-view-status">
            {isRunning
              ? 'Mantenha o foco'
              : session.status === 'paused'
                ? 'Sessão pausada'
                : session.status === 'completed'
                  ? 'Sessão concluída'
                  : 'Pronto para começar'}
          </span>
        </div>

        <div className="pomodoro-view-controls">
          <button
            type="button"
            className="pomodoro-view-reset"
            onClick={onReset}
            aria-label="Reiniciar cronômetro"
            title="Reiniciar"
          >
            ↺
          </button>

          <button
            type="button"
            className="pomodoro-view-primary"
            onClick={isRunning ? onPause : onStart}
          >
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
        </div>
      </div>
    </div>
  );
}
