import React from 'react';
import {Image, Modal, Pressable, StyleSheet, View,} from 'react-native';
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

    onSettingsClose = (scorerState: ScorerState) => {
        scorerState.displaySettings = false;
        this.setState(scorerState);
    }

    displaySettings = (scorerState: ScorerState) => {
        scorerState.displaySettings = true;
        this.setState(scorerState);
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal visible={this.state.displaySettings}>
                    <View style={styles.container}>
                        <Settings onClose={() => this.onSettingsClose(this.state)} onChange={this.onSettingsChange} timer={this.state.timerProps}></Settings>
                    </View>
                </Modal>
                <Pressable onPress={() => this.displaySettings(this.state)}>
                    <Image source={require('../../images/icons/settings-32.png')}></Image>
                </Pressable>
                <Timer {...this.state.timerProps}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
});

export default Scorer;