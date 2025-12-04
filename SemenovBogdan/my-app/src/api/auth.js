export const fakeAuthApi = {
	login: async (email, password) => {
		// имитация сетевого запроса
		await new Promise((r) => setTimeout(r, 700));
		if (email === 'user@example.com' && password === 'password') {
			return { token: 'fake-token-123' };
		}
		return { error: 'Invalid credentials' };
	},
	register: async (payload) => {
		await new Promise((r) => setTimeout(r, 700));
		// простая валидация
		if (payload.email && payload.password) {
			return { token: 'fake-token-123' };
		}
		return { error: 'Invalid data' };
	},
};