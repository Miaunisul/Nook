
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

  const totalSeconds =
  session.mode === 'focus'
    ? 25 * 60
    : session.mode === 'shortBreak'
      ? 5 * 60
      : 15 * 60;

const progress = Math.min(
  100,
  Math.max(0, ((totalSeconds - session.remainingSeconds) / totalSeconds) * 100),
);
  return (
    <div className="pomodoro-view">
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


<div
  className="pomodoro-view-clock"
  role="progressbar"
  aria-label="Progresso da sessão Pomodoro"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={Math.round(progress)}
>
  <svg
    className="pomodoro-progress-ring"
    viewBox="0 0 100 100"
    aria-hidden="true"
  >
    <circle
      className="pomodoro-progress-track"
      cx="50"
      cy="50"
      r="47"
    />
    <circle
      className="pomodoro-progress-fill"
      cx="50"
      cy="50"
      r="47"
      pathLength="100"
      strokeDasharray="100"
      strokeDashoffset={100 - progress}
    />
  </svg>

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
