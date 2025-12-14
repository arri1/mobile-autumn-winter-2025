const API_URL = "https://cloud.kit-imi.info/api";

export async function Login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
        const accessToken = data.data.accessToken;
        const refreshToken = data.data.refreshToken;
        const user = data.data.user;

        return { accessToken, refreshToken, user };
    } else {
        throw new Error(data.message);
    }
}

export async function Register(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        const accessToken = data.data.accessToken;
        const refreshToken = data.data.refreshToken;
        const user = data.data.user;

        return { accessToken, refreshToken, user };
    } else {
        throw new Error(data.message);
    }
}

export async function GetProfile(accessToken: string) {
    const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        const user = data.data.user;
        return user;
    }
    else if (response.status == 401) {
        return null;
    } 
    else {
        throw new Error(data.message);
    }
}

export async function RefreshToken(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (response.ok) {
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        return { newAccessToken, newRefreshToken };
    }
    else if (response.status == 401) {
        return null;
    }
    else {
        throw new Error(data.message);
    }
}

export async function GetUsers(accessToken: string) {
    const response = await fetch(`${API_URL}/auth/users?page=1&limit=100`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        return data.data.users;
    }
    else if (response.status === 401) {
        return null;
    } 
    else {
        throw new Error(data.message);
    }
}

export async function Logout(refreshToken: string) {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
}