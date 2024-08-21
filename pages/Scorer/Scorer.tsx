import React from 'react';
import {View,} from 'react-native';
import Timer, {TimerProps} from "../../components/Timer";
import Settings from "../../components/Settings";

interface ScorerProps {
}

interface ScorerState {
    displaySettings: boolean,
    settings: TimerProps
}

class Scorer extends React.Component<ScorerProps, ScorerState> {

    constructor(props: ScorerProps) {
        super(props);

        this.state = {
            displaySettings: true,
            settings: {
                timeAfterBreak: 90,
                timeToPlay: 45
            }
        }
    }

    onSettingsChange = (settings: TimerProps) => {
        this.setState({
            displaySettings: false,
            settings: settings
        })
    }

    render() {
        if (this.state.displaySettings) {
            return (
                <View>
                    <Settings onSettingsChange={this.onSettingsChange} settings={this.state.settings}></Settings>
                </View>
            );
        }

        const {settings} = this.state;
        return (
            <View>
                <Timer {...settings}/>
            </View>
        );
    }
}

export default Scorer;