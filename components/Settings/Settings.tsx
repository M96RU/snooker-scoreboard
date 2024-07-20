import React from 'react';
import {Button, SafeAreaView, Text, TextInput, View,} from 'react-native';

const Settings = (props: any) => {

    const [playerA, onChangePlayerA] = React.useState('');
    const [playerB, onChangePlayerB] = React.useState('');
    const [timeToPlay, onChangeTimeToPlay] = React.useState('45');

    return (
        <View>
            <Text>Settings !</Text>
            <SafeAreaView>
                <TextInput onChangeText={onChangePlayerA} value={playerA} placeholder='Joueur A'/>
                <TextInput onChangeText={onChangePlayerB} value={playerB} placeholder='Joueur B'/>
                <TextInput onChangeText={onChangeTimeToPlay} value={timeToPlay}/>
                <Button title="Press me" onPress={() => {
                    props.onSettingsChange({
                        playerA,
                        playerB,
                        timeToPlay
                    });
                }}/>
            </SafeAreaView>
        </View>
    )
}

export default Settings;