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

    updateTimeAfterBreak(update: string, currentState: SettingsState) {
        currentState.timer.timeAfterBreak = parseInt(update);
        this.setState(currentState);
    }

    updateTimeToPlay(update: string, currentState: SettingsState) {
        currentState.timer.timeToPlay = parseInt(update);
        this.setState(currentState);
    }

    updateTimeToAdd(update: string, currentState: SettingsState) {
        currentState.timer.timeToAdd = parseInt(update);
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
                        value={this.state.timer.timeAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Text>Temps de jeu</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.timeToPlay.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlay(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Text>Extension</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.timeToAdd.toString()}
                        onChangeText={(text: string) => this.updateTimeToAdd(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Text>Alerte</Text>
                    <TextInput
                        textAlign={'center'}
                        value={this.state.timer.alertUnderSeconds.toString()}
                        onChangeText={(text: string) => this.updateAlertUnderSeconds(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Button title="OK" onPress={() => this.props.onSettingsChange(this.state.timer)}/>
                </SafeAreaView>
            </View>
        )
    }
}

export default Settings;