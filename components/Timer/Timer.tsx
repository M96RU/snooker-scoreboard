import React from 'react';
import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import {activateKeepAwakeAsync, deactivateKeepAwake} from 'expo-keep-awake';
import {Button, Card, Text, useTheme} from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

    const theme = useTheme();

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
        activateKeepAwakeAsync();
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
        deactivateKeepAwake();
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
                <Text style={counterStyle}
                      variant="displayLarge">{remains === 0 ? 'FAUTE' : (remains ? remains : '-')}</Text>
                <View style={styles.buttons}>
                    <Pressable accessibilityLabel={'Commencer'} onPress={start} disabled={!breakAllowed}>
                        <MaterialIcons name="play-arrow" size={64} color={breakAllowed ? 'black' : 'grey'}/>
                    </Pressable>
                    <Pressable accessibilityLabel={'Stop'} onPress={restart} disabled={!nextAllowed}>
                        <MaterialIcons name="stop" size={64} color={nextAllowed ? 'black' : 'grey'}/>
                    </Pressable>
                    <Pressable accessibilityLabel={'Pause'} onPress={pause} disabled={breakAllowed}>
                        <MaterialIcons name="pause" size={64} color={breakAllowed ? 'grey' : 'black'}/>
                    </Pressable>
                    <Pressable accessibilityLabel={'Suivant'} onPress={next} disabled={!nextAllowed}>
                        <MaterialIcons name="skip-next" size={64} color={nextAllowed ? 'black' : 'grey'}/>
                    </Pressable>
                </View>
            </Card.Content>
            <Card.Actions style={[styles.item, {
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: 10,
                flexDirection: 'column',
                marginLeft: 20,
                marginRight: 20
            }]}>
                <Text>Extensions</Text>
                <View style={{flexDirection: 'row'}}>
                    <Button style={[styles.splitWidth, {margin: 3}]} mode="contained" onPress={extensionA}
                            disabled={!extensionAAllowed}>{props.playerA}</Button>
                    <Button style={[styles.splitWidth, {margin: 3}]} mode="contained" onPress={extensionB}
                            disabled={!extensionBAllowed}>{props.playerB}</Button>
                </View>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    item: {
        margin: 10,
    },
    splitWidth: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    counter: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    counterWarn: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red'
    }
});

export default Timer;
