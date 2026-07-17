"use client";

const TOKEN_KEY = "kns_admin_token";
const USER_KEY = "kns_admin_user";

export interface AdminSession {
  token: string;
  username: string;
  role: string;
}

export function saveSession(session: AdminSession) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify({ username: session.username, role: session.role }));
}

export function getSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);
  const userRaw = localStorage.getItem(USER_KEY);
  if (!token || !userRaw) return null;
  try {
    const user = JSON.parse(userRaw) as { username: string; role: string };
    return { token, username: user.username, role: user.role };
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
