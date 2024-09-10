import React from 'react';
import {Dimensions, EmitterSubscription, StyleSheet, View, ViewStyle} from 'react-native';
import {TimerProps} from '@/components/Timer';
import {Button, Card, Text, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

enum Mode {
    FFB, FBEP, CUSTOM
}

enum Screen {
    LANDSCAPE, PORTRAIT
}

interface SettingsProps {
    timer: TimerProps,
    onChange: (param: TimerProps) => void;
    onClose: () => void;
}

interface SettingsState {
    timer: TimerProps,
    mode: Mode,
    screen: Screen
}

class Settings extends React.Component<SettingsProps, SettingsState> {

    subscription: EmitterSubscription;

    constructor(props: SettingsProps) {
        const {height, width} = Dimensions.get('window');
        super(props);
        this.state = {
            timer: props.timer,
            mode: Mode.FFB,
            screen: height > width ? Screen.PORTRAIT : Screen.LANDSCAPE
        }
        this.subscription = Dimensions.addEventListener("change", ({window}) => {
            const newState = {
                timer: this.state.timer,
                mode: this.state.mode,
                screen: window.height > window.width ? Screen.PORTRAIT : Screen.LANDSCAPE
            }
            this.setState(newState);
        });
    }

    componentWillUnmount() {
        this.subscription?.remove();
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

    updateDurationHours(update: number, currentState: SettingsState) {
        currentState.timer.duration.hours = update;
        this.setState(currentState);
    }

    updateDurationMinutes(update: number, currentState: SettingsState) {
        currentState.timer.duration.minutes = update;
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

    render() {
        return (

            <View style={this.screenOrientationStyle(this.state.screen)}>

                <View style={[styles.subContainer, this.screenSubContainerOrientationStyle(this.state.screen)]}>
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

                <View style={[styles.subContainer, this.screenSubContainerOrientationStyle(this.state.screen)]}>
                    <Card>
                        <Card.Title title={'Match'}/>
                        <Card.Content>
                            <TextInput label='Joueur 1' value={this.state.timer.playerA} onChangeText={(text: string) => this.updatePlayerA(text, this.state)}/>
                            <TextInput label='Joueur 2' value={this.state.timer.playerB} onChangeText={(text: string) => this.updatePlayerB(text, this.state)}/>
                            <View style={styles.buttons}>
                                <Text  style={[styles.button, {verticalAlign:'middle', flex: 0.7}]}>Durée</Text>
                                <Picker style={styles.button} selectedValue={this.state.timer.duration.hours} onValueChange={(hours: number) => this.updateDurationHours(hours, this.state)}>
                                    <Picker.Item label={'0h'} value={0}/>
                                    <Picker.Item label={'1h'} value={1}/>
                                    <Picker.Item label={'2h'} value={2}/>
                                </Picker>
                                <Picker style={styles.button} selectedValue={this.state.timer.duration.minutes} onValueChange={(minutes: number) => this.updateDurationMinutes(minutes, this.state)}>
                                    <Picker.Item label={'0 min'} value={0}/>
                                    <Picker.Item label={'15 min'} value={15}/>
                                    <Picker.Item label={'30 min'} value={30}/>
                                    <Picker.Item label={'45 min'} value={45}/>
                                </Picker>
                            </View>
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
