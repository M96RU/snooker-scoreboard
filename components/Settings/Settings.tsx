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

    render() {
        return (
            <View>
                <Text>Settings !</Text>
                <SafeAreaView>
                    <TextInput
                        value={this.state.timer.timeAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        value={this.state.timer.timeToPlay.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlay(text, this.state)}
                        keyboardType={'numeric'}
                    />
                    <Button title="Save" onPress={() => this.props.onSettingsChange(this.state.timer)}/>
                </SafeAreaView>
            </View>
        )
    }
}

export default Settings;