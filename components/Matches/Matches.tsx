import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Match from '@/models/match';
import Organization from '@/models/organization';
import moment from 'moment/moment';

export interface MatchesProps {
    organizations: Organization[];
    matches: Match[];
}

interface MatchesState {
}

class Matches extends React.Component<MatchesProps, MatchesState> {

    constructor(props: MatchesProps) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Matches</Text>
                {
                    this.props.matches.length > 0 &&
                    <FlatList
                        data={this.props.matches}
                        keyExtractor={({id}) => id}
                        renderItem={({item}) => (
                            <View>
                                <Text>
                                    T:{item.tournamentId} - m:{item.id} - t{item.tableName} - {item.status} -
                                    : {item.scoreA} ({item.raceTo}) {item.scoreB} {item.starttime && moment(item.starttime).format('HH:mm')}
                                </Text>
                            </View>
                        )}
                    />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    subContainer: {
        margin: 10,
    },
    item: {
        margin: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 5
    }
});

export default Matches;
