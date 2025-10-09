import { Image } from 'expo-image';
import { Button, Platform, StyleSheet, View, Text, TextInput, Switch } from 'react-native';
import React, { useState } from 'react';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, Stack } from 'expo-router';
import { BaseNavigationContainer, NavigationContainer } from '@react-navigation/native';

export default function HomeScreen() {

  const [count, setCount] = useState(0);
  const [UserName, setUserName] = useState("");
  const [switchvalue, setswitchvalue] = useState(true);


  return (
    <View>

      <View>

        <Button
          onPress={() => setCount(count - 1)}
          title="-1"
          color="#000"
        >
        </Button>

        <Text> {count} </Text>

        <Button
          onPress={() => setCount(count + 1)}
          title="+1"
          color="#000"
        >
        </Button>

      </View>

      <View>

        <Text> Здравствуйте, {UserName}</Text>
        <TextInput style={styles.inputdiv} onChangeText={setUserName} placeholder='Напишите своё имя' />

      </View>

      <View>
        <Switch
          value={switchvalue}
          onValueChange={() => setswitchvalue(!switchvalue)}
        >
        </Switch>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  inputdiv: {
    borderBottomWidth: 1,
    borderColor: '#000'
  }
});
