import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import MatchData from '@/models/match';
import Organization from '@/models/organization';
import Match from '@/components/Match';
import {Text} from 'react-native-paper';
import MatchDetail from '@/components/MatchDetail';

export interface MatchesProps {
    organizations: Organization[];
    matches: MatchData[];
}

interface MatchesState {
    match: MatchData | undefined,
}

class Matches extends React.Component<MatchesProps, MatchesState> {

    private sortByTableName = (m1: MatchData, m2: MatchData) => {
        if (m1.organization === m2.organization) {
            return (m1.tableName ?? 0) - (m2.tableName ?? 0);
        }
        return (m1.organization ?? '').localeCompare(m2.organization ?? '');
    };

    constructor(props: MatchesProps) {
        super(props);
        this.state = {
            match: undefined
        };
    }

    render() {

        const match = this.state.match;

        if (match) {
            return <MatchDetail match={match} onClose={() => this.setState({match: undefined})}/>
        }

        if (this.props.matches.length === 0) {
            return <Text style={styles.noLive}>Pas de live</Text>;
        }

        return (
            <View>
                {
                    this.props.matches.sort(this.sortByTableName).map(match => {
                        return <Pressable
                            accessibilityLabel={'Match ' + match.id} key={match.id}
                            onPress={() => this.setState({match: match})}
                        >
                            <Match match={match}/>
                        </Pressable>
                    })
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
    noLive: {
        textAlign: 'center',
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
