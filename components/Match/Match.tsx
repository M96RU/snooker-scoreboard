import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import MatchData from '@/models/match';
import PlayerName from '@/components/PlayerName';
import MatchTimerCountDown from '@/components/MatchTimerCountDown';

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
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{match.organization} - {match.draw} - {match.roundName}</Text>
                    <MatchTimerCountDown style={styles.title} match={match}/>
                    <Text style={styles.table}>Table {match.tableName}</Text>
                </View>
                <View style={styles.line}>
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
    container: {
        marginBottom: 10,
    },
    header: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#172266',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
    },
    line: {
        flexDirection: 'row',
        borderColor: '#172266',
        backgroundColor: '#467DF7',
        borderWidth: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
    title: {
        color: 'white',
    },
    table: {
        color: 'white',
        textAlign: 'right'
    },
    score: {
        flex: 1,
        textAlign: 'center'
    }
});

export default Match;
