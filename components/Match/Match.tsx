import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import MatchData from '@/models/match';
import PlayerName from '@/components/PlayerName';
import moment from 'moment';

interface MatchProps {
    match: MatchData;
}

interface MatchState {
}

class Match extends React.Component<MatchProps, MatchState> {

    constructor(props: MatchProps) {
        super(props);
    }

    render() {
        const match = this.props.match;
        return (
            <View>
                <View style={styles.match}>
                    <Text style={styles.score}>Table {match.tableName}</Text>
                    <Text style={styles.score}>{moment(match.starttime).format('HH::mm')}</Text>
                </View>
                <View style={styles.match}>
                    <PlayerName style={[styles.player, styles.playerA]} player={match.playerA}/>
                    <Text style={styles.score}>{match.scoreA}</Text>
                    <Text style={styles.score}>({match.raceTo})</Text>
                    <Text style={styles.score}>{match.scoreB}</Text>
                    <PlayerName style={[styles.player, styles.playerB]} player={match.playerB}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    match: {
        flexDirection: 'row',
    },
    player: {
        flex: 7,
        textTransform: 'capitalize'
    },
    playerA: {
        textAlign: 'right',
    },
    playerB: {
        textAlign: 'left',
    },
    score: {
        flex: 1,
        textAlign: 'center'
    }
});

export default Match;
