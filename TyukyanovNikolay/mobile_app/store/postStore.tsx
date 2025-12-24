import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

const accessTokenKey = "accessToken";

const api_url = "https://cloud.kit-imi.info/api";

export const usePostStore = create(() => ({

getPosts: async (id: string, myPosts: boolean) => {
    try{
        let urlPart = "";
        if (id==""){
            if (myPosts) urlPart = "/my?page=1&limit=100"
            else urlPart = "?page=1&limit=100";
        }
        else{
            urlPart = `/${id}`
        }
        const accessToken = await AsyncStorage.getItem(accessTokenKey)
        const response = await fetch(`${api_url}/posts${urlPart}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        const data = await response.json();
        if(data.success) {
            if (id != "") return [data.data.post];
            return data.data.posts
        } else {
            return null;
            console.error(`Не авторизован: ${data.message}`);
        }
    }catch (error){
        console.error(`Ошибка получение постов: ${error}`)
    }
},

addPost: async (title:string, content:string, published:boolean) => {
    try{
        const accessToken = await AsyncStorage.getItem(accessTokenKey)
        const response = await fetch(`${api_url}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({title, content, published}),
        })
        const data = await response.json();
        if(data.success){
            console.log('Пост опубликован')
            return data.data.post
        } else {
            console.error(`Неверная публикация: ${data.message}`);
            return null;
        }
    }catch (error){
        console.error(`Ошибка опубликования: ${error}`)
    }
},

updatePost: async (id: string, title:string, content:string, published:boolean) => {
    try{
        const accessToken = await AsyncStorage.getItem(accessTokenKey)
        const response = await fetch(`${api_url}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({title:title, content:content, published:published}),
        })
        const data = await response.json();
        if(data.success){
            console.log('Пост редактирован')
        } else {
            return null;
            console.error(`Не авторизован: ${data.message}`);
        }
    }catch (error){
        console.error(`Ошибка опубликования: ${error}`)
    }
},

deletePost: async (id: string) => {
    try{
        const accessToken = await AsyncStorage.getItem(accessTokenKey)
        const response = await fetch(`${api_url}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
        })
        const data = await response.json();
        if(data.success){
            console.log('Пост удален')
        } else {
            return null;
            console.error(`Не авторизован: ${data.message}`);
        }
    }catch (error){
        console.error(`Ошибка опубликования: ${error}`)
    }
},
}))