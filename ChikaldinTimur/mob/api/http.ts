const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? 'https://cloud.kit-imi.info/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
  path: string;
  method?: HttpMethod;
  token?: string | null;
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
};

function buildUrl(path: string, query?: RequestOptions['query']) {
  const url = new URL(`${API_BASE}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === '') continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function apiRequest<T>(opts: RequestOptions): Promise<T> {
  const { path, method = 'GET', token, query, body } = opts;

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : null),
      ...(token ? { Authorization: `Bearer ${token}` } : null),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  const payload = isJson ? ((await response.json()) as unknown) : await response.text();

  if (!response.ok) {
    const msg =
      typeof payload === 'object' && payload && 'message' in payload
        ? String((payload as { message?: unknown }).message ?? 'Ошибка запроса.')
        : response.status === 404
          ? 'Маршрут не найден на сервере.'
          : 'Ошибка запроса. Попробуйте позже.';
    throw new Error(msg);
  }

  return payload as T;
}


