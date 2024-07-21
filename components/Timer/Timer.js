import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, Vibration, View,} from 'react-native';

const Timer = () => {
    const [time, setTime] = React.useState(0);

    useEffect(() => {
        const id = setTimeout(() => {
            if (time > 0) {
                setTime((prev) =>
                    prev - 1
                );
            }
        }, 1000);
        return () => {
            clearTimeout(id);
        };
    });

    const start = () => {
        setTime(90);
    }

    return (
        <View style={{backgroundColor: 'green'}}>
            <Text style={styles.counter}>{time}</Text>
            <Button title="Casse" onPress={start}/>
            <Button title="Vibrate once" onPress={() => {
                Vibration.vibrate();
                setTime(45)
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    counter: {
        fontSize: 100,
        alignSelf: 'center'
    }
});

export default Timer;