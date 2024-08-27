import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View,} from 'react-native';
import {TimerProps} from "../Timer";

interface SettingsProps {
    timer: TimerProps,
    onSettingsChange: (param: TimerProps) => void;
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
            <View style={styles.container}>

                <View style={styles.buttons}>
                    <Pressable style={styles.button} disabled={this.state.editable} onPress={() => this.edit(this.state)}>
                        <Text style={styles.buttonText}>MODIFIER</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => this.switchToFBEP(this.state)}>
                        <Text style={styles.buttonText}>FBEP</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => this.switchToFFB(this.state)}>
                        <Text style={styles.buttonText}>FFB</Text>
                    </Pressable>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Temps après la casse</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.timeToPlayAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Extension après la casse</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.timeToAddAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToAddAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Temps de jeu</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.timeToPlayDuringGame.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayDuringGame(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Extension en cours de partie</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.timeToAddDuringGame.toString()}
                        onChangeText={(text: string) => this.updateTimeToAddDuringGame(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Alerte</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.alertUnderSeconds.toString()}
                        onChangeText={(text: string) => this.updateAlertUnderSeconds(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>

                <View style={styles.buttons}>
                    <Pressable style={styles.button} onPress={() => this.props.onSettingsChange(this.state.timer)}>
                        <Text style={styles.buttonText}>VALIDER</Text>
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
        textAlign: 'center'
    },
});

export default Settings;