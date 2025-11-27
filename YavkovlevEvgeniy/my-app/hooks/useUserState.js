import { useState, useEffect } from "react";

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
    console.log(`Статус подписки: ${isSubscribed ? 'активна' : 'неактивна'}`);
    }, [isSubscribed]);

    const addHobby = (hobby) => {
    if (!hobbies.includes(hobby)) {
        setHobbies([...hobbies, hobby]);
    }
    };

    return {
    name,
    setName,
    age,
    setAge,
    isSubscribed,
    setIsSubscribed,
    hobbies,
    addHobby,
    };
};