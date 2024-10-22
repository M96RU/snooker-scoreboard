import React from 'react';
import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface MatchDurationTimerProps {
    duration: number,
    alertUnderMinutes: number
}

const MatchDurationTimer = (props: MatchDurationTimerProps) => {

    const now = () => {
        return new Date().getTime();
    }

    // current time - updated asynchronously
    const [time, setTime] = React.useState(now());

    // begin time of the match
    const [beginTime, setBeginTime] = React.useState(0);

    // pause in progress
    const [paused, setPaused] = React.useState(0);
    const [timeToPlay, setTimeToPlay] = React.useState(props.duration);

    React.useEffect(() => {
        const id = setTimeout(() => {
            setTimeToPlay(props.duration);
            setTime(now())
        }, 300);
        return () => {
            clearTimeout(id);
        };
    });

    const start = () => {
        vibrate(0.3);
        setBeginTime(now());
        setPaused(0);
        setTimeToPlay(props.duration);
    }
    const restart = () => {
        vibrate(0.3);
        setBeginTime(0);
    }

    const pause = () => {
        vibrate(0.3);
        if (paused > 0) {
            const newClicked = beginTime + now() - paused;
            // end of pause
            setPaused(0);
            setBeginTime(newClicked);
        } else {
            // pause begins
            setPaused(now());
        }
    }

    const remainsLabel = (seconds: number) => {
        if (seconds < 0) {

            if (timeToPlay < 60) {
                return timeToPlay + ' min';
            }
            const hoursTimeToPlay = Math.floor(timeToPlay / 60);
            const minutesTimeToPlay = timeToPlay - hoursTimeToPlay * 60;
            const paddingMinutesTimeToPlay = minutesTimeToPlay < 10 ? '0' : '';
            return hoursTimeToPlay + 'h' + paddingMinutesTimeToPlay + minutesTimeToPlay;
        }

        if (seconds === 0) {
            return 'Fin du temps'
        }

        let hours = 0;
        let minutes = 0;

        if (seconds >= 3600) {
            hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
        }

        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
        }

        const paddingHours = hours < 10 ? '0' : '';
        const paddingMinutes = minutes < 10 ? '0' : '';
        const paddingSeconds = seconds < 10 ? '0' : '';

        return paddingHours + hours + ':' + paddingMinutes + minutes + ':' + paddingSeconds + seconds;

    }

    const vibrate = (seconds: number) => {
        Vibration.vibrate(seconds * 1000);
    }

    let remains = -1;
    let pausedSince = 0;
    let counterStyle = styles.counter;

    if (beginTime > 0) {

        if (paused) {
            pausedSince = now() - paused;
        }

        const duration = Math.ceil((time - beginTime - pausedSince) / 1000);
        remains = Math.max(0, timeToPlay * 60 - duration);

        if (remains <= 60 * props.alertUnderMinutes) {
            counterStyle = styles.counterWarn;
        }
    }

    const breakAllowed = beginTime === 0;
    const nextAllowed = !breakAllowed && paused === 0;

    return (
        <Card>
            <Card.Title title={'Temps de match'}/>
            <Card.Content>
                <Text style={counterStyle} variant="displayLarge">{remainsLabel(remains)}</Text>
                <View style={styles.buttons}>
                    <Pressable accessibilityLabel={'Début'} onPress={start} disabled={!breakAllowed}>
                        <MaterialIcons name="play-arrow" size={64} color={breakAllowed ? 'black' : 'grey'}/>
                    </Pressable>
                    <Pressable accessibilityLabel={'Recommencer'} onPress={restart} disabled={!nextAllowed}>
                        <MaterialIcons name="stop" size={64} color={nextAllowed ? 'black' : 'grey'}/>
                    </Pressable>
                    <Pressable accessibilityLabel={'Pause'} onPress={pause} disabled={breakAllowed}>
                        <MaterialIcons name="pause" size={64} color={breakAllowed ? 'grey' : 'black'}/>
                    </Pressable>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
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

export default MatchDurationTimer;
