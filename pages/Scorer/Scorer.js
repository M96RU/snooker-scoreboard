import React from 'react';
import {Text, View,} from 'react-native';
import Timer from "../../components/Timer";
import Settings from "../../components/Settings";

class Scorer extends React.Component {

    state = {
        displaySettings: true,
        settings: {
            playerA: '',
            playerB: '',
            timeToPlay: '45'
        }
    }

    onSettingsChange = (settings) => {
        this.setState({
            displaySettings: false,
            settings: {
                playerA: settings.playerA || 'J1',
                playerB: settings.playerB || 'J2',
                timeToPlay: settings.timeToPlay
            }
        })
    }

    render() {
        if (this.state.displaySettings) {
            return (
                <View>
                    <Settings onSettingsChange={this.onSettingsChange}></Settings>
                </View>
            );
        }

        const {settings} = this.state;
        return (
            <View>
                <Text>{settings.playerA} - {settings.playerB}</Text>
                <Timer></Timer>
            </View>
        );
    }
}

export default Scorer;