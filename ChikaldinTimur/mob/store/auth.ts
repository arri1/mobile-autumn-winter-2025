import { create } from 'zustand';

type User = {
  name: string;
  email: string;
};

type Status =
  | {
      type: 'success' | 'error';
      message: string;
    }
  | null;

type AuthState = {
  user: User | null;
  token: string | null;
  status: Status;
  loading: boolean;
  register: (payload: { name: string; email: string; password: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearStatus: () => void;
};

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? 'https://cloud.kit-imi.info/api';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

type ApiAuthResponse = {
  token?: string;
  email?: string;
  name?: string;
  message?: string;
  error?: string;
};

async function request(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as ApiAuthResponse;

  if (!response.ok) {
    const msg =
      data?.message ||
      data?.error ||
      (response.status === 404 ? 'Маршрут не найден на сервере.' : 'Ошибка запроса. Попробуйте позже.');
    throw new Error(msg);
  }

  return data;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  status: null,
  loading: false,

  register: async ({ name, email, password }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!name.trim() || !normalizedEmail || !password.trim()) {
      set({ status: { type: 'error', message: 'Заполните все поля.' } });
      return;
    }

    set({ loading: true, status: null });
    try {
      const data = await request('/auth/register', {
        name: name.trim(),
        email: normalizedEmail,
        password,
      });

      set({
        user: { name: data.name ?? name.trim(), email: data.email ?? normalizedEmail },
        token: data.token ?? null,
        status: { type: 'success', message: data.message ?? 'Регистрация прошла успешно.' },
        loading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка.';
      set({ status: { type: 'error', message }, loading: false });
    }
  },

  login: async ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password.trim()) {
      set({ status: { type: 'error', message: 'Введите email и пароль.' } });
      return;
    }

    set({ loading: true, status: null });
    try {
      const data = await request('/auth/login', {
        email: normalizedEmail,
        password,
      });

      set({
        user: { name: data.name ?? '', email: data.email ?? normalizedEmail },
        token: data.token ?? null,
        status: { type: 'success', message: data.message ?? 'Вы успешно вошли.' },
        loading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка.';
      set({ status: { type: 'error', message }, loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null, status: { type: 'success', message: 'Вы вышли из аккаунта.' } });
  },

  clearStatus: () => set({ status: null }),
}));

