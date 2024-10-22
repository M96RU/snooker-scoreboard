import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import MatchData from '@/models/match';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MatchTimerCountDown from '@/components/MatchTimerCountDown';
import {Constants} from '@/constants/Constants';
import PlayerName from '@/components/PlayerName';

interface MatchProps {
    match: MatchData | undefined;
    onClose: () => void;
}

interface MatchState {
    data: string | undefined;
}

class MatchDetail extends React.Component<MatchProps, MatchState> {

    constructor(props: MatchProps) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    render() {
        const match = this.props.match;

        if (!match) {
            return <View>
                <Text>Pas de match en cours</Text>
            </View>
        }

        return (
            <View>
                <Pressable
                    accessibilityLabel={'Fermer'}
                    style={styles.closeButton}
                    onPress={() => this.props.onClose()}
                >
                    <MaterialIcons name="close" size={40} color={'white'}/>
                </Pressable>
                <View style={styles.header}>
                    <Text style={styles.draw} variant={'displayLarge'}>{match.draw}</Text>
                    <Text style={styles.round} variant={'displaySmall'}>{match.roundName}</Text>
                </View>
                <Text style={styles.subHeader}>Table {match.tableName} - Premier à {match.raceTo}</Text>
                <View style={styles.players}>
                    <View style={styles.player}>
                        <Image style={styles.playerImage}
                               source={{uri: match.playerA.image ?? Constants.DEFAULT_IMAGE_URL}}/>
                        <PlayerName variant={'titleLarge'} player={match.playerA}/>
                        <Text variant={'displayLarge'}>{match.scoreA}</Text>
                    </View>
                    <View style={styles.player}>
                        <Image style={styles.playerImage}
                               source={{uri: match.playerB.image ?? Constants.DEFAULT_IMAGE_URL}}/>
                        <PlayerName variant={'titleLarge'} player={match.playerB}/>
                        <Text variant={'displayLarge'}>{match.scoreB}</Text>
                    </View>
                </View>
                <MatchTimerCountDown large={true} style={styles.matchDuration} match={match}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    closeButton: {
        position: 'absolute',
        right: 7,
        top: 7,
        zIndex: 1
    },
    matchDuration: {
        marginTop: 25,
        marginLeft: 40,
        marginRight: 40,
        textAlign: 'center',
        backgroundColor: '#dde3fe',
        borderRadius: 15
    },
    header: {
        backgroundColor: '#5363df',
        borderRadius: 20,
    },
    draw: {
        textAlign: 'center',
        color: 'white',
    },
    round: {
        textAlign: 'center',
        color: 'white',
    },
    subHeader: {
        marginTop: 5,
        textAlign: 'center'
    },
    players: {
        marginTop: 10,
        flexDirection: 'row'
    },
    player: {
        flex: 1,
        alignItems: 'center',
    },
    playerImage: {
        width: 100,
        height: 100
    },
    playerA: {
        textAlign: 'center',
    },
    playerB: {
        textAlign: 'center',
    }
});

export default MatchDetail;
