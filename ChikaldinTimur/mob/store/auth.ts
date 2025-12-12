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
  users: Record<string, User & { password: string }>;
  status: Status;
  register: (payload: { name: string; email: string; password: string }) => void;
  login: (payload: { email: string; password: string }) => void;
  logout: () => void;
  clearStatus: () => void;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: {},
  status: null,

  register: ({ name, email, password }) => {
    const normalizedEmail = normalizeEmail(email);

    if (!name.trim() || !normalizedEmail || !password.trim()) {
      set({ status: { type: 'error', message: 'Заполните все поля.' } });
      return;
    }

    const existingUser = get().users[normalizedEmail];
    if (existingUser) {
      set({ status: { type: 'error', message: 'Такой пользователь уже существует.' } });
      return;
    }

    const newUser: User & { password: string } = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    set((state) => ({
      users: { ...state.users, [normalizedEmail]: newUser },
      user: { name: newUser.name, email: newUser.email },
      status: { type: 'success', message: 'Регистрация прошла успешно.' },
    }));
  },

  login: ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email);
    const storedUser = get().users[normalizedEmail];

    if (!normalizedEmail || !password.trim()) {
      set({ status: { type: 'error', message: 'Введите email и пароль.' } });
      return;
    }

    if (!storedUser || storedUser.password !== password) {
      set({ status: { type: 'error', message: 'Неверные учетные данные.' } });
      return;
    }

    set({
      user: { name: storedUser.name, email: storedUser.email },
      status: { type: 'success', message: 'Вы успешно вошли.' },
    });
  },

  logout: () => {
    set({ user: null, status: { type: 'success', message: 'Вы вышли из аккаунта.' } });
  },

  clearStatus: () => set({ status: null }),
}));

