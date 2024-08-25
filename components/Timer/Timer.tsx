import React from 'react';
import {Button, StyleSheet, Text, Vibration, View} from "react-native";

export interface TimerProps {
    timeAfterBreak: number,
    timeToPlay: number,
    timeToAdd: number,
    alertUnderSeconds: number
}

const Timer = (props: TimerProps) => {

    const ONE_SECOND_IN_MS = 1000;

    const now = () => {
        return new Date().getTime();
    }

    // current time - updated asynchronously
    const [time, setTime] = React.useState(now());

    // last click time
    const [clicked, setClicked] = React.useState(0);

    // last click time
    const [timeToPlay, setTimeToPlay] = React.useState(props.timeAfterBreak);

    const [extensionAllowed, setExtensionAllowed] = React.useState(false);
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
        setExtensionAllowed(false);
        setAlreadyExtensionA(false);
        setAlreadyExtensionB(false);
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
    }
    const restart = () => {
        setClicked(0);
    }
    const next = () => {
        setTimeToPlay(props.timeToPlay);
        setClicked(now());
        setExtensionAllowed(true);
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
    }
    const extension = () => {
        setTimeToPlay(props.timeToPlay + props.timeToAdd);
    }
    const extensionA = () => {
        extension();
        setAlreadyExtensionA(true);
    }
    const extensionB = () => {
        extension();
        setAlreadyExtensionB(true);
    }

    let remains = undefined;

    if (clicked > 0) {
        const duration = Math.ceil((time - clicked) / 1000);
        remains = Math.max(0, timeToPlay - duration);

        if (!alreadyVibrateWarning && remains < props.alertUnderSeconds) {
            Vibration.vibrate(2 * ONE_SECOND_IN_MS)
            setAlreadyVibrateWarning(true);
        }

        if (remains === 0 && !alreadyVibrateFault) {
            Vibration.vibrate(4 * ONE_SECOND_IN_MS)
            setAlreadyVibrateFault(true);
        }

    }
    return (
        <View style={{backgroundColor: 'green'}}>
            <Text style={styles.counter}>{remains}</Text>
            <Button disabled={clicked > 0} title="Casse" onPress={start}/>
            <Button disabled={!extensionAllowed || alreadyExtensionA || clicked === 0} title="Extension Jaunes" onPress={extensionA}/>
            <Button disabled={!extensionAllowed || alreadyExtensionB || clicked === 0} title="Extension Rouges" onPress={extensionB}/>
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
