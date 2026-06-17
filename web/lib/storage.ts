"use client";

import { useCallback, useSyncExternalStore } from "react";
import type {
  ActivityRecord,
  AppState,
  ChildProfile,
  PillarScores,
  QuestionResponse,
  SessionState,
  SessionStatus,
} from "./types";
import { getAvailableSessions } from "./content";
import { computePillarScores } from "./scoring";
import { getContentPack } from "./content";

const STORAGE_KEY = "bamecon-app-state";

function createDefaultSession(buoi: number, status: SessionStatus): SessionState {
  return {
    status,
    blocks: {
      questions: {},
      activities: {},
      ducKet: {},
    },
    currentBlockIndex: 0,
    currentQuestionIndex: 0,
    currentActivityIndex: 0,
  };
}

function initializeSessions(): Record<number, SessionState> {
  const available = getAvailableSessions();
  const sessions: Record<number, SessionState> = {};

  for (const buoi of available) {
    sessions[buoi] = createDefaultSession(buoi, buoi === 1 ? "active" : "locked");
  }

  return sessions;
}

function getDefaultState(): AppState {
  return {
    profile: null,
    sessions: initializeSessions(),
  };
}

function loadState(): AppState {
  if (typeof window === "undefined") return getDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();

    const parsed = JSON.parse(raw) as AppState;
    const defaultSessions = initializeSessions();

    return {
      profile: parsed.profile ?? null,
      sessions: { ...defaultSessions, ...parsed.sessions },
    };
  } catch {
    return getDefaultState();
  }
}

function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let listeners: (() => void)[] = [];
let cachedState: AppState = getDefaultState();

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): AppState {
  return cachedState;
}

function getServerSnapshot(): AppState {
  return getDefaultState();
}

function setGlobalState(updater: (prev: AppState) => AppState) {
  cachedState = updater(cachedState);
  saveState(cachedState);
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  cachedState = loadState();
}

export function useAppState() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = typeof window !== "undefined";

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setGlobalState(updater);
  }, []);

  const saveProfile = useCallback(
    (profile: ChildProfile) => {
      updateState((prev) => ({ ...prev, profile }));
    },
    [updateState]
  );

  const saveQuestionResponse = useCallback(
    (buoi: number, response: QuestionResponse) => {
      updateState((prev) => {
        const session = prev.sessions[buoi] ?? createDefaultSession(buoi, "active");
        return {
          ...prev,
          sessions: {
            ...prev.sessions,
            [buoi]: {
              ...session,
              status: session.status === "locked" ? "active" : session.status,
              blocks: {
                ...session.blocks,
                questions: {
                  ...session.blocks.questions,
                  [response.ma_cau]: {
                    ...response,
                    answered_at: new Date().toISOString(),
                  },
                },
              },
            },
          },
        };
      });
    },
    [updateState]
  );

  const saveActivityRecord = useCallback(
    (buoi: number, record: ActivityRecord) => {
      updateState((prev) => {
        const session = prev.sessions[buoi] ?? createDefaultSession(buoi, "active");
        return {
          ...prev,
          sessions: {
            ...prev.sessions,
            [buoi]: {
              ...session,
              blocks: {
                ...session.blocks,
                activities: {
                  ...session.blocks.activities,
                  [record.ma_hoat_dong]: record,
                },
              },
            },
          },
        };
      });
    },
    [updateState]
  );

  const saveDucKet = useCallback(
    (buoi: number, fields: Record<string, string | boolean | number>) => {
      updateState((prev) => {
        const session = prev.sessions[buoi] ?? createDefaultSession(buoi, "active");
        return {
          ...prev,
          sessions: {
            ...prev.sessions,
            [buoi]: {
              ...session,
              blocks: {
                ...session.blocks,
                ducKet: fields,
              },
            },
          },
        };
      });
    },
    [updateState]
  );

  const setSessionProgress = useCallback(
    (
      buoi: number,
      progress: Partial<
        Pick<
          SessionState,
          | "currentBlockIndex"
          | "currentQuestionIndex"
          | "currentActivityIndex"
        >
      >
    ) => {
      updateState((prev) => {
        const session = prev.sessions[buoi] ?? createDefaultSession(buoi, "active");
        return {
          ...prev,
          sessions: {
            ...prev.sessions,
            [buoi]: { ...session, ...progress },
          },
        };
      });
    },
    [updateState]
  );

  const completeSession = useCallback(
    (buoi: number) => {
      updateState((prev) => {
        const pack = getContentPack(buoi);
        const session = prev.sessions[buoi] ?? createDefaultSession(buoi, "active");
        const pillarScores: PillarScores | undefined = pack
          ? computePillarScores(pack, session.blocks.questions)
          : undefined;

        const sessions = { ...prev.sessions };
        sessions[buoi] = {
          ...session,
          status: "done",
          completedAt: new Date().toISOString(),
          pillarScores,
        };

        const nextBuoi = buoi + 1;
        if (sessions[nextBuoi] && sessions[nextBuoi].status === "locked") {
          sessions[nextBuoi] = {
            ...sessions[nextBuoi],
            status: "active",
          };
        }

        return { ...prev, sessions };
      });
    },
    [updateState]
  );

  const resetApp = useCallback(() => {
    cachedState = getDefaultState();
    saveState(cachedState);
    listeners.forEach((l) => l());
  }, []);

  return {
    state,
    hydrated,
    saveProfile,
    saveQuestionResponse,
    saveActivityRecord,
    saveDucKet,
    setSessionProgress,
    completeSession,
    resetApp,
  };
}

export function getSessionStatus(
  state: AppState,
  buoi: number,
  hasContent: boolean
): SessionStatus {
  if (!hasContent) return "locked";
  return state.sessions[buoi]?.status ?? (buoi === 1 ? "active" : "locked");
}
