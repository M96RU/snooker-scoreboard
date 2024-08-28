import React from 'react';
import {Pressable, StyleSheet, Text, Vibration, View} from "react-native";

export interface TimerProps {
    timeToPlayAfterBreak: number,
    timeToAddAfterBreak: number,
    timeToPlayDuringGame: number,
    timeToAddDuringGame: number,
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
    const [timeToPlay, setTimeToPlay] = React.useState(props.timeToPlayAfterBreak);

    const [playingAfterBreak, setPlayingAfterBreak] = React.useState(false);
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
        setTimeToPlay(props.timeToPlayAfterBreak);
        setPlayingAfterBreak(true);
        setAlreadyExtensionA(false);
        setAlreadyExtensionB(false);
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
    }
    const restart = () => {
        setClicked(0);
    }
    const next = () => {
        setTimeToPlay(props.timeToPlayDuringGame);
        setClicked(now());
        setPlayingAfterBreak(false);
        setAlreadyVibrateWarning(false);
        setAlreadyVibrateFault(false);
    }
    const extension = () => {
        if (playingAfterBreak) {
            setTimeToPlay(props.timeToPlayAfterBreak + props.timeToAddAfterBreak);
        } else {
            setTimeToPlay(props.timeToPlayDuringGame + props.timeToAddDuringGame);
        }
    }
    const extensionA = () => {
        extension();
        setAlreadyExtensionA(true);
    }
    const extensionB = () => {
        extension();
        setAlreadyExtensionB(true);
    }

    const styleAllowed = (allowed: boolean) => {
        if (!allowed) {
            return {
                backgroundColor: 'grey'
            };
        }
    }

    let remains = undefined;
    let counterStyle = styles.counter;

    if (clicked > 0) {
        const duration = Math.ceil((time - clicked) / 1000);
        remains = Math.max(0, timeToPlay - duration);

        if (remains <= props.alertUnderSeconds) {

            counterStyle = styles.counterWarn;

            if (!alreadyVibrateWarning) {
                Vibration.vibrate(1.5 * ONE_SECOND_IN_MS)
                setAlreadyVibrateWarning(true);
            }
        }

        if (remains === 0 && !alreadyVibrateFault) {
            Vibration.vibrate(3 * ONE_SECOND_IN_MS)
            setAlreadyVibrateFault(true);
        }

    }

    const breakAllowed = clicked === 0;
    const extensionAAllowed = !alreadyExtensionA && clicked > 0;
    const extensionBAllowed = !alreadyExtensionB && clicked > 0;

    return (
        <View style={styles.container}>
            <View style={counterStyle}>
                <Text style={styles.counterText}>{remains}</Text>
            </View>
            <View style={styles.buttons}>
                <Pressable style={[styles.button, styleAllowed(breakAllowed)]} disabled={!breakAllowed} onPress={start}>
                    <Text style={styles.buttonText}>CASSE</Text>
                </Pressable>
                <Pressable style={[styles.button, styleAllowed(!breakAllowed)]} disabled={breakAllowed} onPress={next}>
                    <Text style={styles.buttonText}>SUIVANT</Text>
                </Pressable>
            </View>
            <View style={styles.buttons}>
                <Pressable style={[styles.button, styles.buttonYellow, styleAllowed(extensionAAllowed)]} disabled={!extensionAAllowed} onPress={extensionA}>
                    <Text style={[styles.buttonText, styles.buttonTextBlack]}>Extension Jaunes</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonRed, styleAllowed(extensionBAllowed)]} disabled={!extensionBAllowed} onPress={extensionB}>
                    <Text style={styles.buttonText}>Extension Rouges</Text>
                </Pressable>
            </View>
            <View style={styles.buttons}>
                <Pressable style={[styles.button, styleAllowed(!breakAllowed)]} disabled={breakAllowed} onPress={restart}>
                    <Text style={styles.buttonText}>Nouvelle Partie</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        justifyContent: 'center',
    },
    buttonYellow: {
        backgroundColor: 'yellow'
    },
    buttonRed: {
        backgroundColor: 'red'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        verticalAlign: 'middle',
        color: 'white',
    },
    buttonTextBlack: {
        color: 'black'
    },
    counter: {
        flex: 3,
        margin: 30,
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderRadius: 180
    },
    counterWarn: {
        flex: 3,
        margin: 30,
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 180
    },
    counterText: {
        fontSize: 150,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
    }
});

export default Timer;
