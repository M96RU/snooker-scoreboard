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
            <View style={styles.container}>

                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Joueur 1</Text>
                    <Text style={styles.itemLabel}>Joueur 2</Text>
                </View>
                <View style={styles.item}>
                    <TextInput
                        style={styles.itemInput}
                        value={this.state.timer.playerA}
                        onChangeText={(text: string) => this.updatePlayerA(text, this.state)}
                    />
                    <TextInput
                        style={styles.itemInput}
                        value={this.state.timer.playerB}
                        onChangeText={(text: string) => this.updatePlayerB(text, this.state)}
                    />
                </View>

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
                    <Text style={styles.itemLabel}>Casse</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.timeToPlayAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Extension casse</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.timeToAddAfterBreak.toString()}
                        onChangeText={(text: string) => this.updateTimeToAddAfterBreak(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Visite</Text>
                    <TextInput
                        style={styles.itemInput}
                        editable={this.state.editable}
                        value={this.state.timer.timeToPlayDuringGame.toString()}
                        onChangeText={(text: string) => this.updateTimeToPlayDuringGame(text, this.state)}
                        keyboardType={'numeric'}
                    />
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemLabel}>Extension visite</Text>
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
                    <Pressable style={styles.button} onPress={() => this.props.onClose()}>
                        <Text style={styles.buttonText}>FERMER</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => this.props.onChange(this.state.timer)}>
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
        textAlign: 'center',
        borderWidth: 1,
        margin: 2,
        borderRadius: 5
    },
});

export default Settings;