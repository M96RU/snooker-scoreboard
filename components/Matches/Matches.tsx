import React from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
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
    tableId: string | undefined,
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
            tableId: undefined
        };
    }

    render() {
        if (this.props.matches.length === 0) {
            return <Text style={styles.noLive}>Pas de live</Text>;
        }

        return (
            <View>
                <Modal visible={this.state.tableId != undefined}>
                    {
                        this.state.tableId != undefined &&
                        <MatchDetail
                            match={this.props.matches.find(m => this.state.tableId === m.tableId)}
                            onClose={() => this.setState({tableId: undefined})}
                        />
                    }
                </Modal>
                {
                    this.props.matches.sort(this.sortByTableName).map(match => {
                        return <Pressable key={match.id} onPress={() => this.setState({tableId: match.tableId})}>
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
