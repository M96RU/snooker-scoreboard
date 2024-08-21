import React from 'react';
import {Button, SafeAreaView, Text, TextInput, View,} from 'react-native';

const Settings = (props: any) => {

    const [timeAfterBreak, onChangeTimeAfterBreak] = React.useState('90');
    const [timeToPlay, onChangeTimeToPlay] = React.useState('45');

    return (
        <View>
            <Text>Settings !</Text>
            <SafeAreaView>
                <TextInput onChangeText={onChangeTimeAfterBreak} value={timeAfterBreak}/>
                <TextInput onChangeText={onChangeTimeToPlay} value={timeToPlay}/>
                <Button title="Press me" onPress={() => {
                    props.onSettingsChange({
                        timeAfterBreak,
                        timeToPlay
                    });
                }}/>
            </SafeAreaView>
        </View>
    )
}

export default Settings;