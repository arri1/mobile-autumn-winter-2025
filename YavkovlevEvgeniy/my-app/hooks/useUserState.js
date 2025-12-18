import { useState, useEffect, useMemo, useCallback } from "react";

export const useUserState = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hobbies, setHobbies] = useState([]);

    useEffect(() => {
    console.log('Список хобби обновлён:', hobbies);
    }, [hobbies]);

    useEffect(() => {
    if (name && age > 0) {
        console.log(`Пользователь: ${name}, Возраст: ${age}`);
    }
    }, [name, age]);

    useEffect(() => {
    console.log(`Статус кнопки: ${isSubscribed ? 'активна' : 'неактивна'}`);
    }, [isSubscribed]);

    const addHobby = useCallback((hobby) => {
    setHobbies(prev => {
        if (!prev.includes(hobby)) {
        return [...prev, hobby];
        }
        return prev;
    });
    }, []);

    return useMemo(() => ({
    name,
    setName,
    age,
    setAge,
    isSubscribed,
    setIsSubscribed,
    hobbies,
    addHobby,
    }), [name, age, isSubscribed, hobbies, addHobby]);
};