import React from 'react';
import {Text, View,} from 'react-native';
import Timer from "../../components/Timer";
import Settings from "../../components/Settings";

class Scorer extends React.Component {

    state = {
        settings: {
            playerA: '',
            playerB: '',
            timeToPlay: '45'
        }
    }

    onSettingsChange = (settings) => {
        this.setState({
            settings: {
                playerA: settings.playerA,
                playerB: settings.playerB,
                timeToPlay: settings.timeToPlay
            }
        })
    }

    render() {
        const {settings} = this.state;
        return (
            <View>
                <Settings onSettingsChange={this.onSettingsChange}></Settings>
                <Timer></Timer>
                <Text>{settings.playerA} - {settings.playerB}</Text>
            </View>
        );
    }
}

export default Scorer;