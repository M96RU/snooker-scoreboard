import React from 'react';
import {Text} from 'react-native-paper';
import Player from '@/models/player';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleSheet} from 'react-native';
import type {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';

export interface PlayerNameMatchProps {
    style?: StyleProp<TextStyle> | undefined,
    player: Player,
    variant?: VariantProp<Text>;
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
            <Text variant={this.props.variant} style={[styles.player, this.props.style]}>{player.name}</Text>
        )
    }

}

const styles = StyleSheet.create({
    player: {
        textTransform: 'capitalize',
    }
});


export default PlayerName;
