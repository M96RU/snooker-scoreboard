import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Scorer from "./pages/Scorer";

const App = () => {
    return (
        <View style={styles.container}>
            <Scorer></Scorer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});

export default App;