
export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

export type PomodoroStatus = 'idle' | 'running' | 'paused' | 'completed';

export type PomodoroSettings = {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
};

export type PomodoroSession = {
  mode: PomodoroMode;
  status: PomodoroStatus;
  remainingSeconds: number;
  endsAt: number | null;
  completedFocusSessions: number;
};

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
  notificationsEnabled: false,
};
