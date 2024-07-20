import React from 'react';
import {Button, Vibration,} from 'react-native';

const Timer = () => {
    return (
        <Button title="Vibrate once" onPress={() => Vibration.vibrate()}/>
    );
};

export default Timer;