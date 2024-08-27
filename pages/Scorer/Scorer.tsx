import React from 'react';
import {Button, StyleSheet, View,} from 'react-native';
import Timer, {TimerProps} from "../../components/Timer";
import Settings from "../../components/Settings";

interface ScorerProps {
}

interface ScorerState {
    displaySettings: boolean,
    timerProps: TimerProps
}

class Scorer extends React.Component<ScorerProps, ScorerState> {

    constructor(props: ScorerProps) {
        super(props);

        this.state = {
            displaySettings: true,
            timerProps: {
                timeToPlayAfterBreak: 90,
                timeToAddAfterBreak: 45,
                timeToPlayDuringGame: 45,
                timeToAddDuringGame: 45,
                alertUnderSeconds: 20
            }
        }
    }

    onSettingsChange = (settings: TimerProps) => {
        this.setState({
            displaySettings: false,
            timerProps: settings
        });
    }

    displaySettings = (scorerState: ScorerState) => {
        scorerState.displaySettings = true;
        this.setState(scorerState);
    }

    render() {
        if (this.state.displaySettings) {
            return (
                <View style={styles.container}>
                    <Settings onSettingsChange={this.onSettingsChange} timer={this.state.timerProps}></Settings>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Button title="Configuration" onPress={() => this.displaySettings(this.state)}/>
                <Timer {...this.state.timerProps}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
});

export default Scorer;