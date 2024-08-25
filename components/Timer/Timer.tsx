import React from 'react';
import {Button, StyleSheet, Text, Vibration, View} from "react-native";

export interface TimerProps {
    timeAfterBreak: number,
    timeToPlay: number,
    timeToAdd: number,
    alertUnderSeconds: number
}

const Timer = (props: TimerProps) => {

    const now = () => {
        return new Date().getTime();
    }

    // current time - updated asynchronously
    const [time, setTime] = React.useState(now());

    // last click time
    const [clicked, setClicked] = React.useState(0);

    // last click time
    const [timeToPlay, setTimeToPlay] = React.useState(props.timeAfterBreak);

    const [alreadyExtensionA, setAlreadyExtensionA] = React.useState(false);
    const [alreadyExtensionB, setAlreadyExtensionB] = React.useState(false);

    // true after alert
    const [alreadyVibrateWarning, setAlreadyVibrateWarning] = React.useState(false);
    // true after alert
    const [alreadyVibrateFault, setAlreadyVibrateFault] = React.useState(false);

    React.useEffect(() => {
        const id = setTimeout(() => {
            setTime(now())
        }, 300);
        return () => {
            clearTimeout(id);
        };
    });

    const start = () => {
        setClicked(now());
        setTimeToPlay(props.timeAfterBreak);
    }
    const restart = () => {
        setClicked(0);
        setAlreadyExtensionA(false);
        setAlreadyExtensionB(false);
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
    }
    const next = () => {
        setTimeToPlay(props.timeToPlay);
        setClicked(now());
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
    }
    const extensionA = () => {
        setTimeToPlay(props.timeToPlay + props.timeToAdd);
        setAlreadyExtensionA(true);
    }
    const extensionB = () => {
        setTimeToPlay(props.timeToPlay + props.timeToAdd);
        setAlreadyExtensionB(true);
    }

    let remains = undefined;

    if (clicked > 0) {
        const duration = Math.ceil((time - clicked) / 1000);
        remains = Math.max(0, timeToPlay - duration);

        if (!alreadyVibrateWarning && remains < props.alertUnderSeconds) {
            Vibration.vibrate();
            setAlreadyVibrateWarning(true);
        }

        if (remains === 0 && !alreadyVibrateFault) {
            Vibration.vibrate();
            setAlreadyVibrateFault(true);
        }

    }
    return (
        <View style={{backgroundColor: 'green'}}>
            <Text style={styles.counter}>{remains}</Text>
            <Button disabled={clicked > 0} title="Casse" onPress={start}/>
            <Button disabled={alreadyExtensionA || clicked === 0} title="Extension Jaunes" onPress={extensionA}/>
            <Button disabled={alreadyExtensionB || clicked === 0} title="Extension Rouges" onPress={extensionB}/>
            <Button disabled={clicked === 0} title="Suivant" onPress={next}/>
            <Button disabled={clicked === 0} title="Nouvelle Partie" onPress={restart}/>
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
