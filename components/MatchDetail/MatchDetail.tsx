import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import MatchData from '@/models/match';
import WebView from 'react-native-webview';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MatchTimerCountDown from '@/components/MatchTimerCountDown';
import CuescoreScaner from '@/components/CuescoreScanner';

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

        if (match.draw) {

            return <CuescoreScaner close={(u: string) => this.setState({data: u})}/>

            /*
            return <View>
                <Modal visible={this.state.data != undefined}>
                    <Camera close={(u: string) => this.setState({data: u})}/>
                </Modal>
                <Text>{this.state.data}</Text>
            </View>

             */
        }

        return (
            <View style={styles.container}>
                <Pressable style={styles.closeButton} onPress={() => this.props.onClose()}>
                    <MaterialIcons name="close" size={32} color={'white'}/>
                </Pressable>
                <MatchTimerCountDown style={styles.matchDuration} match={match}/>
                {
                    match.scorerUrl &&
                    <WebView
                        style={styles.webview}
                        source={{uri: match.scorerUrl}}
                    />
                }
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
        right: 5,
        top: 5,
        zIndex: 1
    },
    matchDuration: {
        position: 'absolute',
        left: 5,
        bottom: 5,
        zIndex: 1
    },
    webview: {}
});

export default MatchDetail;
