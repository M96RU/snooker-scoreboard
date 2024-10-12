import React from 'react';
import {Text} from 'react-native-paper';
import Player from '@/models/player';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export interface PlayerNameMatchProps {
    style?: StyleProp<TextStyle> | undefined,
    player: Player,
}

interface PlayerNameState {
}

class PlayerName extends React.Component<PlayerNameMatchProps, PlayerNameState> {

    constructor(props: PlayerNameMatchProps) {
        super(props);
    }

    render() {
        const player = this.props.player;
        return (
            <Text style={this.props.style}>{player.name}</Text>
        )
    }

}

export default PlayerName;
