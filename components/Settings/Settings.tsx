import React from 'react';
import {Alert, Button, SafeAreaView, Text, TextInput, View,} from 'react-native';

class Settings extends React.Component {

    state = {
        playerA: '',
        playerB: '',
        timeToPlay: '45'
    }

    render = () => {
        // const [playerA, onChangePlayerA] = React.useState('');
        // const [playerB, onChangePlayerB] = React.useState('');
        // const [timeToPlay, onChangeTimeToPlay] = React.useState('45');


        return (
            <View>
                <Text>Settings !</Text>
                <SafeAreaView>
                    <TextInput onChangeText={this.onChangePlayerA} value={this.state.playerA} placeholder="Joueur A"/>
                    <TextInput onChangeText={this.onChangePlayerB} value={this.state.playerB} placeholder="Joueur B"/>
                    <TextInput onChangeText={this.onChangeTimeToPlay} value={this.state.timeToPlay}/>
                    <Button title="Press me" onPress={
                        () => {
                            Alert.alert('Simple Button pressed' + this.state.timeToPlay + this.state.playerA + this.state.playerB);
                        }
                    }/>
                </SafeAreaView>
            </View>
        )
    }
    private onChangePlayerA = (text: string) => {
        this.setState({
            playerA: text
        });
    }
    private onChangePlayerB = (text: string) => {
        this.setState({
            playerB: text
        });
    }
    private onChangeTimeToPlay = (text: string) => {
        this.setState({
            timeToPlay: text
        });
    }
}

export default Settings;