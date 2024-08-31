import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View,} from 'react-native';
import {TimerProps} from "../Timer";

interface SettingsProps {
    timer: TimerProps,
    onChange: (param: TimerProps) => void;
    onClose: () => void;
}

interface SettingsState {
    editable: boolean,
    timer: TimerProps
}

class Settings extends React.Component<SettingsProps, SettingsState> {

    constructor(props: SettingsProps) {
        super(props);
        this.state = {
            editable: false,
            timer: props.timer
        }
    }

    edit(currentState: SettingsState) {
        currentState.editable = true;
        this.setState(currentState);
    }

    switchToFBEP(currentState: SettingsState) {
        currentState.editable = false;
        currentState.timer.timeToPlayAfterBreak = 45;
        currentState.timer.timeToAddAfterBreak = 45;
        currentState.timer.timeToPlayDuringGame = 45;
        currentState.timer.timeToAddDuringGame = 45;
        currentState.timer.alertUnderSeconds = 10;
        this.setState(currentState);
    }

    switchToFFB(currentState: SettingsState) {
        currentState.editable = false;
        currentState.timer.timeToPlayAfterBreak = 90;
        currentState.timer.timeToAddAfterBreak = 45;
        currentState.timer.timeToPlayDuringGame = 45;
        currentState.timer.timeToAddDuringGame = 45;
        currentState.timer.alertUnderSeconds = 20;
        this.setState(currentState);
    }

    updatePlayerA(update: string, currentState: SettingsState) {
        currentState.timer.playerA = update;
        this.setState(currentState);
    }

    updatePlayerB(update: string, currentState: SettingsState) {
        currentState.timer.playerB = update;
        this.setState(currentState);
    }

    updateTimeToPlayAfterBreak(update: string, currentState: SettingsState) {
        const updatedValue = parseInt(update);
        if (!isNaN(updatedValue)) {
            currentState.timer.timeToPlayAfterBreak = updatedValue;
            this.setState(currentState);
        }
    }

    updateTimeToAddAfterBreak(update: string, currentState: SettingsState) {
        const updatedValue = parseInt(update);
        if (!isNaN(updatedValue)) {
            currentState.timer.timeToAddAfterBreak = updatedValue;
            this.setState(currentState);
        }
    }

    updateTimeToPlayDuringGame(update: string, currentState: SettingsState) {
        const updatedValue = parseInt(update);
        if (!isNaN(updatedValue)) {
            currentState.timer.timeToPlayDuringGame = updatedValue;
            this.setState(currentState);
        }
    }

    updateTimeToAddDuringGame(update: string, currentState: SettingsState) {
        const updatedValue = parseInt(update);
        if (!isNaN(updatedValue)) {
            currentState.timer.timeToAddDuringGame = updatedValue;
            this.setState(currentState);
        }
    }

    updateAlertUnderSeconds(update: string, currentState: SettingsState) {
        const updatedValue = parseInt(update);
        if (!isNaN(updatedValue)) {
            currentState.timer.alertUnderSeconds = updatedValue;
            this.setState(currentState);
        }
    }

    render() {
        return (
            <View>

                <View>
                    <Text style={styles.itemLabel}>Joueur 1</Text>
                    <Text style={styles.itemLabel}>Joueur 2</Text>
                </View>
                <View>
                    <TextInput
                        value={this.state.timer.playerA}
                        onChangeText={(text: string) => this.updatePlayerA(text, this.state)}
                    />
                    <TextInput
                        value={this.state.timer.playerB}
                        onChangeText={(text: string) => this.updatePlayerB(text, this.state)}
                    />
                </View>

                <View>
                    <Pressable disabled={this.state.editable} onPress={() => this.edit(this.state)}>
                        <Text>MODIFIER</Text>
                    </Pressable>
                    <Pressable  onPress={() => this.switchToFBEP(this.state)}>
                        <Text>FBEP</Text>
                    </Pressable>
                    <Pressable onPress={() => this.switchToFFB(this.state)}>
                        <Text>FFB</Text>
                    </Pressable>
                </View>

                <View style={styles.item}>
                    <Text>Casse</Text>
                    <TextInput
                        editable={this.state.editable}
                        value={this.state.timer.timeToPlayAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View>
                    <Text>Extension casse</Text>
                    <TextInput
                        editable={this.state.editable}
                        value={this.state.timer.timeToAddAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToAddAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View>
                    <Text>Visite</Text>
                    <TextInput
                        editable={this.state.editable}
                        value={this.state.timer.timeToPlayDuringGame.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayDuringGame(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View>
                    <Text>Extension visite</Text>
                    <TextInput
                        editable={this.state.editable}
                        value={this.state.timer.timeToAddDuringGame.toString()}
                        onChangeText={(text: string) => this.updateTimeToAddDuringGame(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View>
                    <Text>Alerte</Text>
                    <TextInput
                        editable={this.state.editable}
                        value={this.state.timer.alertUnderSeconds.toString()}
                        onChangeText={(text: string) => this.updateAlertUnderSeconds(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>

                <View>
                    <Pressable onPress={() => this.props.onClose()}>
                        <Text>FERMER</Text>
                    </Pressable>
                    <Pressable onPress={() => this.props.onChange(this.state.timer)}>
                        <Text>VALIDER</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 2,
        padding: 4,
        borderRadius: 5,
        backgroundColor: 'blue'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    item: {
        padding: 3,
        flexDirection: 'row',
    },
    itemLabel: {
        flex: 2,
        padding: 2,
        textAlign: 'right'
    },
    itemInput: {
        flex: 1,
        padding: 2,
        textAlign: 'center',
        borderWidth: 1,
        margin: 2,
        borderRadius: 5
    },
});

export default Settings;