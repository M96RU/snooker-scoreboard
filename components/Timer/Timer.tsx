import React from 'react';
import {StyleSheet, Vibration, View} from "react-native";
import {Button, Card, Text} from 'react-native-paper';

export interface TimerProps {
    playerA: string,
    playerB: string,
    timeToPlayAfterBreak: number,
    timeToAddAfterBreak: number,
    timeToPlayDuringGame: number,
    timeToAddDuringGame: number,
    alertUnderSeconds: number
}

const Timer = (props: TimerProps) => {

    const now = () => {
        return new Date().getTime();
    }

    // current time - updated asynchronously
    const [time, setTime] = React.useState(now());
    const [paused, setPaused] = React.useState(0);

    // last click time
    const [clicked, setClicked] = React.useState(0);

    // last click time
    const [timeToPlay, setTimeToPlay] = React.useState(props.timeToPlayAfterBreak);

    const [playingAfterBreak, setPlayingAfterBreak] = React.useState(false);
    const [extensionInProgress, setExtensionInProgress] = React.useState(false);
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

    const pause = () => {
        vibrate(0.3);
        if (paused > 0) {
            const newClicked = clicked + now() - paused;
            // end of pause
            setPaused(0);
            setClicked(newClicked);
        } else {
            // pause begins
            setPaused(now());
        }
    }

    const start = () => {
        vibrate(0.3);
        setClicked(now());
        setPaused(0);
        setTimeToPlay(props.timeToPlayAfterBreak);
        setPlayingAfterBreak(true);
        setAlreadyExtensionA(false);
        setAlreadyExtensionB(false);
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
    }
    const restart = () => {
        vibrate(0.3);
        setClicked(0);
    }
    const next = () => {
        vibrate(0.3);
        setTimeToPlay(props.timeToPlayDuringGame);
        setClicked(now());
        setPlayingAfterBreak(false);
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
        setExtensionInProgress(false);
    }
    const extension = () => {
        setExtensionInProgress(true);
        if (playingAfterBreak) {
            setTimeToPlay(props.timeToPlayAfterBreak + props.timeToAddAfterBreak);
        } else {
            setTimeToPlay(props.timeToPlayDuringGame + props.timeToAddDuringGame);
        }
    }
    const extensionA = () => {
        vibrate(0.3);
        extension();
        setAlreadyExtensionA(true);
    }
    const extensionB = () => {
        vibrate(0.3);
        extension();
        setAlreadyExtensionB(true);
    }

    const vibrate = (seconds: number) => {
        Vibration.vibrate(seconds * 1000);
    }

    let remains = undefined;
    let pausedSince = 0;
    let counterStyle = styles.counter;

    if (clicked > 0) {

        if (paused) {
            pausedSince = now() - paused;
        }

        const duration = Math.ceil((time - clicked - pausedSince) / 1000);
        remains = Math.max(0, timeToPlay - duration);

        if (remains <= props.alertUnderSeconds) {

            counterStyle = styles.counterWarn;

            if (!alreadyVibrateWarning) {
                vibrate(1.5);
                setAlreadyVibrateWarning(true);
            }
        }

        if (remains === 0 && !alreadyVibrateFault) {
            vibrate(3);
            setAlreadyVibrateFault(true);
        }

    }

    const breakAllowed = clicked === 0;
    const nextAllowed = !breakAllowed && paused === 0;
    const extensionAllowed = !extensionInProgress && clicked > 0 && paused === 0 && remains != undefined && remains > 0;
    const extensionAAllowed = extensionAllowed && !alreadyExtensionA;
    const extensionBAllowed = extensionAllowed && !alreadyExtensionB;

    return (
        <Card>
            <Card.Content>
                <Text style={counterStyle} variant="displayLarge">{remains ? remains : '-'}</Text>
            </Card.Content>
            <Card.Actions>
                <Button style={styles.splitWidth} mode="contained" onPress={start} disabled={!breakAllowed}>Casse</Button>
                <Button style={styles.splitWidth} mode="contained-tonal" onPress={pause} disabled={breakAllowed}>{paused > 0 ? 'Reprendre' : 'Pause'}</Button>
                <Button style={styles.splitWidth} mode="contained" onPress={next} disabled={!nextAllowed}>Suivant</Button>
            </Card.Actions>
            <Card.Actions>
                <Button style={styles.splitWidth} mode="contained" onPress={extensionA} disabled={!extensionAAllowed}>Extension {props.playerA}</Button>
                <Button style={styles.splitWidth} mode="contained" onPress={extensionB} disabled={!extensionBAllowed}>Extension {props.playerB}</Button>
            </Card.Actions>
            <Card.Actions>
                <Button style={styles.splitWidth} mode="contained-tonal" onPress={restart} disabled={!nextAllowed}>Nouvelle Partie</Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    splitWidth: {
        flex: 1
    },
    counter: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    counterWarn: {
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'red',
        color: 'white'
    }
});

export default Timer;
