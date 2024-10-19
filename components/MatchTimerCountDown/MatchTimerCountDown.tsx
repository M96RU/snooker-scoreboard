import {Text} from 'react-native-paper';
import MatchData from '@/models/match';
import moment from 'moment/moment';
import React from 'react';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {Constants} from '@/constants/Constants';

interface MatchTimerCountDownProps {
    style?: StyleProp<TextStyle> | undefined,
    large?: boolean,
    match: MatchData
}

const remainsLabel = (seconds: number,) => {

    let hours = 0;
    let minutes = 0;

    if (seconds > 0) {
        if (seconds >= 3600) {
            hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
        }
        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
        }
    } else {
        seconds = 0;
    }

    const paddingHours = hours < 10 ? '0' : '';
    const paddingMinutes = minutes < 10 ? '0' : '';
    const paddingSeconds = seconds < 10 ? '0' : '';

    return paddingHours + hours + ':' + paddingMinutes + minutes + ':' + paddingSeconds + seconds;
}

export default function MatchTimerCountDown(props: MatchTimerCountDownProps) {

    const match = props.match;
    const variant = props.large ? 'displayLarge' : 'labelSmall';

    if (match.duration == 0) {
        return match.starttime ? <Text variant={variant} style={props.style}>{moment(match.starttime).format('HH:mm')}</Text> : null;
    }

    if (!match.starttime) {
        return <Text variant={variant} style={props.style}>A VENIR</Text>
    }

    if (match.status == Constants.MATCH_STATUS.FINISHED) {
        return <Text variant={variant} style={props.style}>TERMINE</Text>;
    }

    const [time, setTime] = React.useState(moment.now());

    React.useEffect(() => {
        const id = setTimeout(() => {
            setTime(moment.now());
        }, 510);
        return () => {
            clearTimeout(id);
        };
    });

    const diffMillis = moment(time).diff(match.starttime);
    const diffSeconds = Math.floor(diffMillis / 1000);

    const seconds = match.duration * 60 - diffSeconds;
    const label = remainsLabel(seconds);

    return <Text style={props.style} variant={variant}>{label}</Text>
}

