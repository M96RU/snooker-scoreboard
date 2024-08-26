import React from 'react';
import {Button, SafeAreaView, Text, TextInput, View,} from 'react-native';
import {TimerProps} from "../Timer";

interface SettingsProps {
    timer: TimerProps,
    onSettingsChange: (param: TimerProps) => void;
}

interface SettingsState {
    timer: TimerProps
}

class Settings extends React.Component<SettingsProps, SettingsState> {

    constructor(props: SettingsProps) {
        super(props);
        this.state = {
            timer: props.timer
        }
    }

    updateTimeToPlayAfterBreak(update: string, currentState: SettingsState) {
        currentState.timer.timeToPlayAfterBreak = parseInt(update);
        this.setState(currentState);
    }

    updateTimeToAddAfterBreak(update: string, currentState: SettingsState) {
        currentState.timer.timeToAddAfterBreak = parseInt(update);
        this.setState(currentState);
    }

    updateTimeToPlayDuringGame(update: string, currentState: SettingsState) {
        currentState.timer.timeToPlayDuringGame = parseInt(update);
        this.setState(currentState);
    }

    updateTimeToAddDuringGame(update: string, currentState: SettingsState) {
        currentState.timer.timeToAddDuringGame = parseInt(update);
        this.setState(currentState);
    }

    updateAlertUnderSeconds(update: string, currentState: SettingsState) {
        currentState.timer.alertUnderSeconds = parseInt(update);
        this.setState(currentState);
    }

    render() {
        return (
            <View>
                <SafeAreaView>
                    <Text>Temps après la casse</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.timeToPlayAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Text>Extension après la casse</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.timeToAddAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToAddAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Text>Temps de jeu</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.timeToPlayDuringGame.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayDuringGame(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Text>Extension en cours de partie</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.timeToAddDuringGame.toString()}
                        onChangeText={(text: string) => this.updateTimeToAddDuringGame(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Text>Alerte</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.alertUnderSeconds.toString()}
                        onChangeText={(text: string) => this.updateAlertUnderSeconds(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Button title="Valider" onPress={() => this.props.onSettingsChange(this.state.timer)}/>
                </SafeAreaView>
            </View>
        )
    }
}

export default Settings;