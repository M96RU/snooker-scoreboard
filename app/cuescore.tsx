import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import {Camera} from '@/components/MatchDetail/Camera';
import MatchData from '@/models/match';
import MatchTimerCountDown from '@/components/MatchTimerCountDown';
import WebView from 'react-native-webview';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CuescoreScorer() {

    const [url, setUrl] = React.useState<string>();
    const [error, setError] = React.useState<string>();
    const [loading, setLoading] = React.useState(false);
    const [match, setMatch] = React.useState<MatchData>();

    if (!url) {
        return <View style={{flex: 1}}>
            <Camera close={setUrl}/>
            {error && <Text style={{flex: 0.1}}>{error}</Text>}
        </View>
    }

    const retrieveMatch = () => {
        fetch('https://cuescore-dashboard-fpeqxpww2-m96rus-projects.vercel.app/api/cuescore/live')
            .then(result => result.json())
            .then(data => {
                if (!data || !data.matches || !data.matches.length) {
                    setUrl(undefined);
                    setError('Pas de match en cours');
                }
                const update = data.matches.find((m: MatchData) => url === m.scorerUrl);
                if (!update) {
                    setUrl(undefined);
                    setError('Pas de match en cours');
                }
                setMatch(update);
            }).catch(error => {
                console.error(error);
                setUrl(undefined);
                setError('Erreur technique');
            }
        );
    }

    if (match) {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <WebView
                source={{uri: match.scorerUrl}}
            />
            <View style={{flex: 0.3}}>
                <MatchTimerCountDown match={match}/>
                <Pressable onPress={() => {
                    setError(undefined);
                    setUrl(undefined);
                }}>
                    <MaterialIcons name="close" size={32} color={'red'}/>
                </Pressable>
            </View>
        </View>
    }

    if (loading) {
        retrieveMatch();
        return <View>
            <Text>Loading</Text>
        </View>

    } else {
        setLoading(true);
        return null;
    }
}