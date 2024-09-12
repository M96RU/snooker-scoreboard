import React from 'react';
import {Modal, Pressable, StyleSheet, View,} from 'react-native';
import Timer, {TimerProps} from '@/components/Timer';
import Settings from '@/components/Settings';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MatchDurationTimer, {MatchDurationTimerProps} from "@/components/MatchDurationTimer";

interface ScorerProps {
}

interface ScorerState {
    displaySettings: boolean,
    timerProps: TimerProps,
    matchDurationTimerProps: MatchDurationTimerProps
}

class Scorer extends React.Component<ScorerProps, ScorerState> {

    constructor(props: ScorerProps) {
        super(props);

        this.state = {
            displaySettings: false,
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
                    <Settings
                        onClose={() => this.onSettingsClose(this.state)}
                        onChange={this.onSettingsChange}
                        timer={this.state.timerProps}
                        matchDurationTimer={this.state.matchDurationTimerProps}
                    />
                </Modal>
                <Pressable style={styles.item} onPress={() => this.displaySettings(this.state)}>
                    <MaterialIcons name="settings" size={48} color="black"/>
                </Pressable>
                <View>
                    <Timer {...this.state.timerProps}/>
                    <MatchDurationTimer {...this.state.matchDurationTimerProps} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    item: {
        marginBottom: 10,
        marginTop: 20,
        alignItems: 'flex-end'
    }
});

export default Scorer;
