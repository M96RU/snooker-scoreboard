import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {TimerProps} from '@/components/Timer';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {MatchDurationTimerProps} from '@/components/MatchDurationTimer';
import Screen from '@/models/Screen';

enum Mode {
    FFB, FBEP, CUSTOM
}

interface SettingsProps {
    timer: TimerProps,
    screen: Screen,
    matchDurationTimer: MatchDurationTimerProps,
    onChange: (param: TimerProps) => void;
    onClose: () => void;
}

interface SettingsState {
    timer: TimerProps,
    matchDurationTimer: MatchDurationTimerProps,
    mode: Mode
}

class Settings extends React.Component<SettingsProps, SettingsState> {

    constructor(props: SettingsProps) {
        super(props);
        this.state = {
            timer: props.timer,
            matchDurationTimer: props.matchDurationTimer,
            mode: Mode.FFB
        }
    }

    edit(currentState: SettingsState) {
        currentState.mode = Mode.CUSTOM;
        this.setState(currentState);
    }

    switchToFBEP(currentState: SettingsState) {
        currentState.mode = Mode.FBEP;
        currentState.timer.timeToPlayAfterBreak = 45;
        currentState.timer.timeToAddAfterBreak = 45;
        currentState.timer.timeToPlayDuringGame = 45;
        currentState.timer.timeToAddDuringGame = 45;
        currentState.timer.alertUnderSeconds = 10;
        this.setState(currentState);
    }

    switchToFFB(currentState: SettingsState) {
        currentState.mode = Mode.FFB;
        currentState.timer.timeToPlayAfterBreak = 90;
        currentState.timer.timeToAddAfterBreak = 45;
        currentState.timer.timeToPlayDuringGame = 45;
        currentState.timer.timeToAddDuringGame = 45;
        currentState.timer.alertUnderSeconds = 20;
        this.setState(currentState);
    }

    updateDuration(update: number, currentState: SettingsState) {
        currentState.matchDurationTimer.duration = update;
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

    screenOrientationStyle(screen: Screen): ViewStyle {
        return {
            flex: 1,
            flexDirection: screen == Screen.LANDSCAPE ? 'row' : 'column'
        };
    }

    screenSubContainerOrientationStyle(screen: Screen): ViewStyle {
        if (screen == Screen.LANDSCAPE) {
            return {
                flex: 1
            };
        }
        return {};
    }

    getDurationLabel(duration: number) {
        if (duration == 0) {
            return 'Temps illimité';
        }
        if (duration < 60) {
            return 'Temps de jeu: ' + duration + ' minutes';
        }
        const hours = Math.floor(duration / 60);
        const minutes = duration - (hours * 60);
        const padding = minutes < 10 ? '0' : '';

        return 'Temps de jeu: ' + hours + 'h ' + padding + minutes + 'min';
    }

    render() {
        return (

            <View style={this.screenOrientationStyle(this.props.screen)}>

                <View style={[styles.subContainer, this.screenSubContainerOrientationStyle(this.props.screen)]}>
                    <Card>
                        <Card.Title title={'Timer'}/>
                        <Card.Content style={styles.buttons}>
                            <TextInput
                                style={styles.button}
                                label={'Casse'}
                                editable={this.state.mode === Mode.CUSTOM}
                                value={this.state.timer.timeToPlayAfterBreak.toString()}
                                onChangeText={(text: string) => this.updateTimeToPlayAfterBreak(text, this.state)}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                style={styles.button}
                                label={'Extension casse'}
                                editable={this.state.mode === Mode.CUSTOM}
                                value={this.state.timer.timeToAddAfterBreak.toString()}
                                onChangeText={(text: string) => this.updateTimeToAddAfterBreak(text, this.state)}
                                keyboardType={'numeric'}
                            />
                        </Card.Content>
                        <Card.Content style={styles.buttons}>
                            <TextInput
                                style={styles.button}
                                label={'Visite'}
                                editable={this.state.mode === Mode.CUSTOM}
                                value={this.state.timer.timeToPlayDuringGame.toString()}
                                onChangeText={(text: string) => this.updateTimeToPlayDuringGame(text, this.state)}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                style={styles.button}
                                label={'Extension visite'}
                                editable={this.state.mode === Mode.CUSTOM}
                                value={this.state.timer.timeToAddDuringGame.toString()}
                                onChangeText={(text: string) => this.updateTimeToAddDuringGame(text, this.state)}
                                keyboardType={'numeric'}
                            />
                        </Card.Content>
                        <Card.Content style={styles.buttons}>
                            <TextInput
                                style={styles.button}
                                label={'Alerte'}
                                editable={this.state.mode === Mode.CUSTOM}
                                value={this.state.timer.alertUnderSeconds.toString()}
                                onChangeText={(text: string) => this.updateAlertUnderSeconds(text, this.state)}
                                keyboardType={'numeric'}
                            />
                        </Card.Content>
                        <Card.Actions>
                            <Button mode={'text'} disabled={this.state.mode === Mode.CUSTOM} onPress={() => this.edit(this.state)}>Modifier</Button>
                            <Button mode={'text'} disabled={this.state.mode === Mode.FBEP} onPress={() => this.switchToFBEP(this.state)}>FBEP</Button>
                            <Button mode={'text'} disabled={this.state.mode === Mode.FFB} onPress={() => this.switchToFFB(this.state)}>FFB</Button>
                        </Card.Actions>
                    </Card>
                </View>

                <View style={[styles.subContainer, this.screenSubContainerOrientationStyle(this.props.screen)]}>
                    <Card>
                        <Card.Title title={'Match'}/>
                        <Card.Content>

                            <View>
                                <Text style={{textAlign: 'center'}}>{this.getDurationLabel(this.state.matchDurationTimer.duration)}</Text>
                                <Slider
                                    value={this.state.matchDurationTimer.duration}
                                    minimumValue={0}
                                    maximumValue={240}
                                    onValueChange={(duration: number) => this.updateDuration(duration, this.state)}
                                    step={5}
                                />
                            </View>
                            <TextInput label='Joueur 1' value={this.state.timer.playerA} onChangeText={(text: string) => this.updatePlayerA(text, this.state)}/>
                            <TextInput label='Joueur 2' value={this.state.timer.playerB} onChangeText={(text: string) => this.updatePlayerB(text, this.state)}/>
                        </Card.Content>
                    </Card>

                    <View style={[styles.item, styles.buttons]}>
                        <Button style={styles.button} mode={'contained-tonal'} onPress={() => this.props.onClose()}>Fermer</Button>
                        <Button style={styles.button} mode={'contained'} onPress={() => this.props.onChange(this.state.timer)}>Sauvegarder</Button>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    subContainer: {
        margin: 10,
    },
    item: {
        margin: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 5
    }
});

export default Settings;
