import React, {useEffect} from 'react';
import {Alert, Button, StyleSheet, Text, Vibration, View,} from 'react-native';

const Timer = () => {

    const afterBreak = 90;
    const secondToPLay = 45;

    const now = () => {
        return new Date().getTime();
    }

    // current time - updated asynchronously
    const [time, setTime] = React.useState(now());

    // last click time
    const [clicked, setClicked] = React.useState(0);

    // last click time
    const [timeToPlay, setTimeToPlay] = React.useState(afterBreak);

    // true after break
    const [alreadyBreak, setAlreadyBreak] = React.useState(false);

    // true after alert
    const [alreadyAlert, setAlreadyAlert] = React.useState(false);
    // true after alert
    const [alreadyAlertEnd, setAlreadyAlertEnd] = React.useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setTime(now())
        }, 100);
        return () => {
            clearTimeout(id);
        };
    });

    const start = () => {
        setClicked(now());
        if (alreadyBreak) {
            setAlreadyBreak(true);
        }
    }
    const restart = () => {
        setClicked(0);
        setTimeToPlay(afterBreak);
        setAlreadyBreak(false);
        setAlreadyAlert(false);
        setAlreadyAlertEnd(false);
    }
    const next = () => {
        setAlreadyBreak(true);
        setTimeToPlay(secondToPLay);
        setClicked(now());
        setAlreadyAlert(false);
        setAlreadyAlertEnd(false);
    }

    if (clicked > 0) {
        const duration = Math.ceil((time - clicked) / 1000);
        const remains = Math.max(0, timeToPlay - duration);

        if (!alreadyAlert && remains < 20) {
            Vibration.vibrate();
            setAlreadyAlert(true);
        }

        if (remains == 0 && !alreadyAlertEnd) {
            Vibration.vibrate();
            setAlreadyAlertEnd(true);
        }

        return (
            <View style={{backgroundColor: 'green'}}>
                <Text style={styles.counter}>{remains}</Text>
                <Button title="Suivant" onPress={next}/>
                <Button title="Reset" onPress={restart}/>
            </View>
        );
    }

    return (
        <View style={{backgroundColor: 'green'}}>
            <Button title="Casse" onPress={start}/>
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