import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, Vibration, View} from "react-native";

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

    const styleOrientation = () => {
        const {height, width} = Dimensions.get('window');
        const flexDirection = height > width ? 'column' : 'row';
        return {
            flex: 1,
            flexDirection: flexDirection
        };
    }
    const styleAllowed = (allowed: boolean) => {
        if (!allowed) {
            return {
                backgroundColor: 'grey'
            };
        }
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
        <View style={[styles.container, styleOrientation()]}>
            <View style={styles.subContainer}>
                <Pressable disabled={breakAllowed} style={[counterStyle, styleAllowed(paused === 0)]} onPress={pause}>
                    <Text style={styles.counterText}>{remains}</Text>
                </Pressable>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.buttons}>
                    <Pressable style={[styles.button, styleAllowed(breakAllowed)]} disabled={!breakAllowed} onPress={start}>
                        <Text style={styles.buttonText}>CASSE</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styleAllowed(nextAllowed)]} disabled={!nextAllowed} onPress={next}>
                        <Text style={styles.buttonText}>SUIVANT</Text>
                    </Pressable>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={[styles.button, styles.buttonYellow, styleAllowed(extensionAAllowed)]} disabled={!extensionAAllowed} onPress={extensionA}>
                        <Text style={[styles.buttonText, styles.buttonTextBlack]}>Extension {props.playerA}</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonRed, styleAllowed(extensionBAllowed)]} disabled={!extensionBAllowed} onPress={extensionB}>
                        <Text style={styles.buttonText}>Extension {props.playerB}</Text>
                    </Pressable>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={[styles.button, styleAllowed(nextAllowed)]} disabled={!nextAllowed} onPress={restart}>
                        <Text style={styles.buttonText}>Nouvelle Partie</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
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
