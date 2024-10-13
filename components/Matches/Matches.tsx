import React from 'react';
import {StyleSheet, View} from 'react-native';
import MatchData from '@/models/match';
import Organization from '@/models/organization';
import Match from '@/components/Match';
import {Text} from 'react-native-paper';

export interface MatchesProps {
    organizations: Organization[];
    matches: MatchData[];
}

interface MatchesState {
    date: Date
}

class LiveData {
    ffb: MatchData[] = [];
    lbara: MatchData[] = [];
    others: MatchData[] = [];
}

class Matches extends React.Component<MatchesProps, MatchesState> {

    private sortByTableName = (m1: MatchData, m2: MatchData) => {
        return (m1.tableName ?? 0) - (m2.tableName ?? 0);
    };

    constructor(props: MatchesProps) {
        super(props);
    }

    render() {
        if (this.props.matches.length === 0) {
            return <Text>Pas de live en ce moment</Text>;
        }

        const live = new LiveData();
        for (const match of this.props.matches.sort(this.sortByTableName)) {
            if (match.organization === 'lbara') {
                live.lbara.push(match);
            } else if (match.organization === 'ffb') {
                live.ffb.push(match);
            } else {
                live.others.push(match);
            }
        }
        return (
            <View>
                {
                    live.ffb.map(match => {
                        return <Match match={match}/>
                    })
                }
                {
                    live.lbara.map(match => {
                        return <Match match={match}/>
                    })
                }
                {
                    live.others.map(match => {
                        return <Match match={match}/>
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
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 5
    }
});

export default Matches;
