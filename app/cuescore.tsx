import {Pressable, StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import React from 'react';
import WebView from 'react-native-webview';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CuescoreScorerHelper from '../components/CuescoreScorerHelper';
import CuescoreScaner from '@/components/CuescoreScanner';

export default function CuescoreScorer() {

    const [code, setCode] = React.useState<string>('');
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
        if (code.length > 2) {
            setUrl('https://cuescore.com/scoreboard/?code=' + code.toLowerCase());
        }
    }

    const close = () => {
        setError(undefined);
        setUrl(undefined);
    }

    if (url) {
        return <View style={styles.container}>
            <Pressable accessibilityLabel={'Fermer'} style={styles.closeButton} onPress={close}>
                <MaterialIcons name="close" size={40} color={'white'}/>
            </Pressable>
            <WebView source={{uri: url}}/>
            <View style={{flex: 0.3}}>
                <CuescoreScorerHelper url={url}/>
            </View>
        </View>
    } else {

        return <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.formInput}
                    label="Code de la table"
                    accessibilityLabel={'Code de la table'}
                    value={code}
                    onChangeText={setCode}
                />
                <Pressable accessibilityLabel={'Valider'} style={styles.formSubmit} onPress={submitCode}>
                    <MaterialIcons name="double-arrow" size={50} color={'black'}/>
                </Pressable>
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
    form: {
        flex: 0.1,
        flexDirection: 'row',
        margin: 10
    },
    formInput: {
        flex: 1,
        margin: 5
    },
    formSubmit: {
        margin: 5
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 1
    }
});
