import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import MatchData from '@/models/match';
import MatchTimerCountDown from '@/components/MatchTimerCountDown';
import {Constants} from '@/constants/Constants';

export interface Props {
    url: string
}

export default function CuescoreScorerHelper(props: Props) {

    const [time, setTime] = React.useState<number>(0);
    const [match, setMatch] = React.useState<MatchData>();
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (loading && time == 0) {
            // first update
            retrieveMatch();

        } else {
            // next updates have to wait
            const id = setTimeout(() => {
                retrieveMatch();
            }, 60000);
            return () => {
                clearTimeout(id);
            };
        }
    });

    const retrieveMatch = () => {
        fetch(Constants.BACKEND_URL + Constants.LIVE_API)
            .then(result => result.json())
            .then(data => {
                setLoading(false);
                if (!data || !data.matches || !data.matches.length) {
                    setMatch(undefined);
                } else {
                    const update = data.matches.find((m: MatchData) => props.url === m.scorerUrl);
                    if (update) {
                        setMatch(update);
                    } else if (match) {
                        setMatch(undefined);
                    } else {
                        setTime(new Date().getTime()); // ensure refresh
                    }
                }
            }).catch(ignored => {
                if (match && props.url != match.scorerUrl) {
                    setMatch(undefined);
                } else {
                    setTime(new Date().getTime()); // ensure refresh
                }
            }
        );
    }

    if (loading) {
        return <View>
            <ActivityIndicator/>
        </View>
    }

    if (match) {
        return (
            <View>
                <MatchTimerCountDown style={styles.timer} large={true} match={match}/>
            </View>
        );
    }

    return null;
}


const styles = StyleSheet.create({
    timer: {
        textAlign: 'center',
    }
});
