import React from 'react';
import {Button, Text, Vibration, View,} from 'react-native';

function Timer(): React.JSX.Element {

    return (
        <View>
            <Button title="Vibrate once" onPress={() => Vibration.vibrate()}/>
        </View>
    );
}

export default Timer;