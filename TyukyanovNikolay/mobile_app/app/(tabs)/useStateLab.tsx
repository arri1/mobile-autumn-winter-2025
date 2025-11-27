import { useState } from "react";
import { ScrollView, View, Text, Button, TextInput } from "react-native";

export default function useStateLab() {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(0);
    const [string, setString] = useState('')
    const [words, setWords] = useState([''])

    return (
        <ScrollView contentContainerStyle={{alignItems:"center", padding: 20}}>
            <Text style={{ fontSize: 30, 
                marginBottom: 20, 
                fontWeight: "bold"}}>
                useState
            </Text>


            <View style={{alignItems:"center", marginBottom: 40,}}>
                <View style={{flexDirection: "row"}} >
                    <Button title="<" onPress={() => setNum(num-1)}></Button>
                    <Button title={num.toString()} onPress={() => setCount(count+num)}></Button>
                    <Button title=">" onPress={() => setNum(num+1)}></Button>
                </View>
                <Text style={{ fontSize: 20 }}>Счёт: {count}</Text>
            </View>


            <View style={{alignItems:"center"}}>
                <View style={{flexDirection: "row"}}>
                    <TextInput style={{borderWidth:1,
                                    borderColor:'gray',
                                    paddingInline: 10}}
                            placeholder="Введите текст"
                            value={string}
                            onChangeText={setString}/>
                    <Button title=">" onPress={() => {setWords([...words, string]);
                                                      setString('')
                    }}/>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{ fontSize: 16}}>Введен текст: </Text>
                    <View>
                        {words.reverse().filter((item, i) => i<=5).map((item,i)=> (
                            <Text style={{ fontSize: 16}}>
                                {item}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}