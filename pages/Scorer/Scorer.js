import React from 'react';
import {View,} from 'react-native';
import Timer from "../../components/Timer";
import Settings from "../../components/Settings";

class Scorer extends React.Component {
    
    render() {

        return (
            <View>
                <Settings></Settings>
                <Timer></Timer>
            </View>
        );
    }
}

export default Scorer;