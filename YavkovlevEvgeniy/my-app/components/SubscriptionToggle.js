import React from "react";
import {View, Text, Switch, StyleSheet} from 'react-native'

const SubscriptionToggle = ({value, onValueChange}) => (
    <View style={styles.switchRow}>
        <Text>Переключить</Text>
        <Switch 
            value={value} 
            onValueChange={onValueChange} 
        />
    </View>
);

const styles = StyleSheet.create({
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
});

export default SubscriptionToggle