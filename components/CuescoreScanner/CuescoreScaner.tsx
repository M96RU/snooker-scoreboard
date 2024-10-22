import {BarcodeScanningResult, CameraView, useCameraPermissions} from 'expo-camera';
import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export interface Props {
    close: (data: string) => void
}

export default function CuescoreScaner(props: Props) {
    const [permission, requestPermission] = useCameraPermissions();

    /* To be removed * /
    React.useEffect(() => {
        const id = setTimeout(() => {
            console.log('Force url');
            props.close('https://cuescore.com/scoreboard/?code=de108f97');
        }, 5000);
        return () => {
            clearTimeout(id);
        };
    });
    /* To be removed */




    if (!permission) {
        // Camera permissions are still loading.
        return <View/>;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Souhaitez-vous démarrer la caméra ?</Text>
                <Button onPress={requestPermission} title="Demande d'authorisation"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera} facing={'back'}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={(scan: BarcodeScanningResult) => props.close(scan.data)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
