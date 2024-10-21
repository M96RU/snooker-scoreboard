import {Pressable, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import React from 'react';
import WebView from 'react-native-webview';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CuescoreScorerHelper from '../components/CuescoreScorerHelper';
import CuescoreScaner from '@/components/CuescoreScanner';

export default function CuescoreScorer() {

    const [code, setCode] = React.useState<string>();
    const [url, setUrl] = React.useState<string>();
    const [error, setError] = React.useState<string>();

    const updateUrl = (update: string) => {
        if (update && update.startsWith('https://cuescore.com/scoreboard')) {
            setUrl(update);
        } else {
            setError('QRCode non compatible');
        }
    }
    const submitCode = () => {
        setUrl('https://cuescore.com/scoreboard/?code=' + code);
    }

    const close = () => {
        setError(undefined);
        setUrl(undefined);
    }

    if (url) {
        return <View style={styles.container}>
            <Pressable style={styles.closeButton} onPress={close}>
                <MaterialIcons name="close" size={32} color={'white'}/>
            </Pressable>
            <WebView source={{uri: url}}/>
            <View style={{flex: 0.3}}>
                <CuescoreScorerHelper url={url}/>
            </View>
        </View>
    } else {

        return <View style={styles.container}>
            <View style={styles.codeForm}>
                <TextInput label='Code de la table' value={code} onChangeText={setCode}/>
                <Button mode={'contained-tonal'} onPress={submitCode}>Valider</Button>
            </View>
            <CuescoreScaner close={updateUrl}/>
            {error && <Text style={{flex: 0.1}}>{error}</Text>}
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    codeForm: {
        flex: 0.2
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 1
    }
});
