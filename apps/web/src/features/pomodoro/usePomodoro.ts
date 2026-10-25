
import { useEffect, useState } from 'react';
import {
  DEFAULT_POMODORO_SETTINGS,
  type PomodoroMode,
  type PomodoroSession,
  type PomodoroSettings,
} from './types';

const STORAGE_KEY = 'nook-pomodoro';

const INITIAL_SESSION: PomodoroSession = {
  mode: 'focus',
  status: 'idle',
  remainingSeconds: 25 * 60,
  endsAt: null,
  completedFocusSessions: 0,
};

type StoredPomodoro = {
  session: PomodoroSession;
  settings: PomodoroSettings;
};

function getDuration(mode: PomodoroMode, settings: PomodoroSettings) {
  switch (mode) {
    case 'focus':
      return settings.focusMinutes * 60;
    case 'shortBreak':
      return settings.shortBreakMinutes * 60;
    case 'longBreak':
      return settings.longBreakMinutes * 60;
  }
}

function loadPomodoro(): StoredPomodoro {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const data = JSON.parse(saved) as StoredPomodoro;

      if (data.session && data.settings) {
        return data;
      }
    }
  } catch {
    // Usa os valores iniciais caso não seja possível carregar.
  }

  return {
    session: INITIAL_SESSION,
    settings: DEFAULT_POMODORO_SETTINGS,
  };
}

export function usePomodoro() {
  const [initialData] = useState(loadPomodoro);
  const [session, setSession] = useState(initialData.session);
  const [settings, setSettings] = useState(initialData.settings);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ session, settings }),
    );
  }, [session, settings]);

  useEffect(() => {
    if (session.status !== 'running' || session.endsAt === null) {
      return;
    }

    const interval = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((session.endsAt! - Date.now()) / 1000),
      );

      if (remaining === 0) {
        setSession((current) => ({
          ...current,
          status: 'completed',
          remainingSeconds: 0,
          endsAt: null,
          completedFocusSessions:
            current.completedFocusSessions +
            (current.mode === 'focus' ? 1 : 0),
        }));

        return;
      }

      setSession((current) => ({
        ...current,
        remainingSeconds: remaining,
      }));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [session.status, session.endsAt]);

  function start() {
    setSession((current) => ({
      ...current,
      status: 'running',
      remainingSeconds:
        current.remainingSeconds > 0
          ? current.remainingSeconds
          : getDuration(current.mode, settings),
      endsAt:
        Date.now() +
        (current.remainingSeconds > 0
          ? current.remainingSeconds
          : getDuration(current.mode, settings)) *
          1000,
    }));
  }

  function pause() {
    setSession((current) => ({
      ...current,
      status: 'paused',
      endsAt: null,
      remainingSeconds:
        current.endsAt === null
          ? current.remainingSeconds
          : Math.max(0, Math.ceil((current.endsAt - Date.now()) / 1000)),
    }));
  }

  function reset() {
    setSession((current) => ({
      ...current,
      status: 'idle',
      remainingSeconds: getDuration(current.mode, settings),
      endsAt: null,
    }));
  }

  function changeMode(mode: PomodoroMode) {
    setSession((current) => ({
      ...current,
      mode,
      status: 'idle',
      remainingSeconds: getDuration(mode, settings),
      endsAt: null,
    }));
  }

  return {
    session,
    settings,
    setSettings,
    start,
    pause,
    reset,
    changeMode,
  };
}
