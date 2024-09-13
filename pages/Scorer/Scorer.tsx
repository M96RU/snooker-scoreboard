import React from 'react';
import {Dimensions, EmitterSubscription, Modal, Pressable, StyleSheet, View, ViewStyle,} from 'react-native';
import Timer, {TimerProps} from '@/components/Timer';
import Settings from '@/components/Settings';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MatchDurationTimer, {MatchDurationTimerProps} from "@/components/MatchDurationTimer";
import Screen from '@/models/Screen';

interface ScorerProps {
}

interface ScorerState {
    displaySettings: boolean,
    screen: Screen,
    timerProps: TimerProps,
    matchDurationTimerProps: MatchDurationTimerProps
}

class Scorer extends React.Component<ScorerProps, ScorerState> {

    subscription: EmitterSubscription;

    constructor(props: ScorerProps) {
        const {height, width} = Dimensions.get('window');
        super(props);

        this.state = {
            displaySettings: false,
            screen: height > width ? Screen.PORTRAIT : Screen.LANDSCAPE,
            timerProps: {
                playerA: 'J1',
                playerB: 'J2',
                timeToPlayAfterBreak: 90,
                timeToAddAfterBreak: 45,
                timeToPlayDuringGame: 45,
                timeToAddDuringGame: 45,
                alertUnderSeconds: 20
            },
            matchDurationTimerProps: {
                duration: 105,
                alertUnderMinutes: 15
            }
        };

        this.subscription = Dimensions.addEventListener("change", ({window}) => {
            const newState = {
                displaySettings: this.state.displaySettings,
                screen: window.height > window.width ? Screen.PORTRAIT : Screen.LANDSCAPE,
                timerProps: this.state.timerProps,
                matchDurationTimerProps: this.state.matchDurationTimerProps
            }
            this.setState(newState);
        });

    }

    componentWillUnmount() {
        this.subscription?.remove();
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

    getScreenStyle(screen: Screen): ViewStyle {
        return {
            flexDirection: screen == Screen.LANDSCAPE ? 'row-reverse' : 'column'
        };
    }

    getItemScreenStyle(screen: Screen): ViewStyle {
        return {
            flex: screen == Screen.LANDSCAPE ? 1 : undefined,
            margin: 10
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal visible={this.state.displaySettings}>
                    <Settings
                        onClose={() => this.onSettingsClose(this.state)}
                        onChange={this.onSettingsChange}
                        screen={this.state.screen}
                        timer={this.state.timerProps}
                        matchDurationTimer={this.state.matchDurationTimerProps}
                    />
                </Modal>
                <Pressable style={styles.buttons} onPress={() => this.displaySettings(this.state)}>
                    <MaterialIcons name="settings" size={48} color="black"/>
                </Pressable>
                <View style={this.getScreenStyle(this.state.screen)}>
                    <View style={this.getItemScreenStyle(this.state.screen)}>
                        <Timer {...this.state.timerProps}/>
                    </View>
                    <View style={this.getItemScreenStyle(this.state.screen)}>
                        <MatchDurationTimer {...this.state.matchDurationTimerProps} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    buttons: {
        marginBottom: 10,
        marginTop: 20,
        alignItems: 'flex-end'
    }
});

export default Scorer;
