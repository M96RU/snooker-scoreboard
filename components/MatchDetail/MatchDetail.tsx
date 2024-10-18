import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import MatchData from '@/models/match';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MatchTimerCountDown from '@/components/MatchTimerCountDown';

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
                <Pressable style={styles.closeButton} onPress={() => this.props.onClose()}>
                    <MaterialIcons name="close" size={32} color={'black'}/>
                </Pressable>
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
        right: 0,
        top: 0,
        zIndex: 1
    },
    matchDuration: {
        textAlign: 'center'
    }
});

export default MatchDetail;
