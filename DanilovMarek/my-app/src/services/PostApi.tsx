const API_URL = "https://cloud.kit-imi.info/api";

export async function GetPosts(accessToken: string, id: string, my: boolean) {
    let urlEndPart = "";

    if (my == true) {
        urlEndPart = "/my?page=1&limit=100";
    }
    else if (id != "") {
        urlEndPart = `/${id}`
    }
    else {
        urlEndPart = "?page=1&limit=100";
    }

    const response = await fetch(`${API_URL}/posts${urlEndPart}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    if (response.ok) {
        if (id != "") {
            return [data.data.post];
        }
        return data.data.posts;
    }
    else if (response.status === 401) {
        return null;
    } 
    else {
        throw new Error(data.message);
    }
}

export async function AddPost(title: string, content: string, published: boolean, accessToken: string) {
    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ title, content, published }),
    });

    if (response.ok) {
        return "success"; //заглушка
    }
    else if (response.status === 401) {
        return null;
    }
    else {
        const data = await response.json();
        throw new Error(data.message);
    }
}

export async function UpdatePost(id: string, title: string, content: string, published: boolean, accessToken: string) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ title, content, published }),
    });

    if (response.ok) {
        return "success"; //заглушка
    }
    else if (response.status === 401) {
        return null;
    }
    else {
        const data = await response.json();
        throw new Error(data.message);
    }
}

export async function DeletePost(id: string, accessToken: string) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (response.ok) {
        return "success"; //заглушка
    }
    else if (response.status === 401) {
        return null;
    }
    else {
        const data = await response.json();
        throw new Error(data.message);
    }
}