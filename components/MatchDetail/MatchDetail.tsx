import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import MatchData from '@/models/match';
import WebView from 'react-native-webview';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface MatchProps {
    match: MatchData | undefined;
    onClose: () => void;
}

interface MatchState {
}

class MatchDetail extends React.Component<MatchProps, MatchState> {

    constructor(props: MatchProps) {
        super(props);
    }

    render() {
        const match = this.props.match;

        if (!match) {
            return <View>
                <Text>Pas de match en cours</Text>
            </View>
        }

        return (
            <View style={styles.container}>
                <Pressable style={styles.closeButton} onPress={() => this.props.onClose()}>
                    <MaterialIcons name="close" size={32} color={'white'}/>
                </Pressable>
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
    webview: {}
});

export default MatchDetail;
