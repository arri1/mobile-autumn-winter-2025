import { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, TextInput } from "react-native";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

export default function useStateLab() {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(['']);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        let interval = 0;
        if(isRunning){
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer+1);
            },100)
        }
        return () => {if(interval) clearInterval(interval);}
    }, [isRunning])

    useEffect(() => {
        const validateForm = () => {
            let newErrors = [];

            if (password.length < 8) {
                newErrors.push('Пароль должен быть не менее 8 символов');
            }
            if (!/[0-9]/.test(password)) {
                newErrors.push('Пароль должен содержать хотя бы одну цифру')
            }
            if (!/[A-Z]/.test(password)) {
                newErrors.push('Пароль должен содержать хотя бы одну заглавную букву')
            }
            if (!/[a-z]/.test(password)) {
                newErrors.push('Пароль должен содержать хотя бы одну строчную букву');
            }
            if (!/[_.:;@?!-]/.test(password)) {
                newErrors.push('Пароль должен содержать хотя бы один специальный символ ( _.:;@?!- )');
            }
            setErrors(newErrors);
            newErrors.length>0 ? setIsFormValid(false) : setIsFormValid(true);
        };

        validateForm();
    }, [password]);

    const formatTime = (timer:Int32) => {
        const min = Math.floor(timer/600)%60
        const sec = Math.floor(timer/10)%60
        const msec = timer%10
        return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}.${msec.toString()}`
    }

    return (
        <ScrollView contentContainerStyle={{alignItems:"center", padding: 20}}>
            <Text style={{ fontSize: 30, 
                marginBottom: 20, 
                fontWeight: "bold"}}>
                useEffect
            </Text>


            <View style={{alignItems:"center", marginBottom: 40,}}>
                <Text style={{fontWeight:'bold', fontSize:26}}>{formatTime(timer)}</Text>
                <View style={{flexDirection: "row", gap:8}}>
                    <Button title="Старт" onPress={()=>setIsRunning(true)}></Button>
                    <Button title="Пауза" onPress={()=>setIsRunning(false)}></Button>
                    <Button title="Сброс" onPress={()=>{setIsRunning(false);
                                                        setTimer(0)}}></Button>
                </View>
            </View>


            <View style={{alignItems:"center", marginBottom: 40,}}>
                <View style={{flexDirection: "row"}}>
                    <TextInput style={{borderWidth:1,
                                       borderColor:'gray',
                                       paddingInline: 10}}
                               placeholder="Введите пароль"
                               value={password}
                               onChangeText={setPassword}/>
                </View>
                <View>
                    {errors.map((item) => (
                        <Text style={{fontSize: 12, color:'red'}}>{item}</Text>
                    ))}
                    {isFormValid?(<Text style={{fontSize: 12, color:'green'}}>
                                     Пароль правильный
                                  </Text>):(<></>)}
                </View>
            </View>
        </ScrollView>
    );
}