import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tournament from '@/models/tournament';
import Player from '@/models';

interface MatchesProps {
}

/*
interface MatchesState {
    tournaments: Tournament[] | undefined;
}
*/

export default function Matches() {
    const [isLoading, setLoading] = useState(true);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);

    const path = 'https://cuescore-dashboard-plqw60fxe-m96rus-projects.vercel.app'
    const cuescoreTournamentPlayersUrl = 'https://api.cuescore.com/tournament/?participants=Participants+list&id='


    const retrievePlayers = async (tournament: Tournament) => {
        try {
            const response = await fetch(cuescoreTournamentPlayersUrl + tournament.id);
            const json: Player[] = await response.json();
            setPlayers(json);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getMatches = async () => {
        try {
            const response = await fetch(path + '/api/cuescore');
            const json = await response.json();
            setTournaments(json.tournaments);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        if (tournaments && tournaments.length > 0) {
            tournaments.forEach(tournament => {
                retrievePlayers(tournament);
            });
        }
    };

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <View style={{flex: 1, padding: 24}}>
            {isLoading ? (
                <ActivityIndicator/>
            ) : (
                <View>
                    <Text>OK</Text>

                    <FlatList
                        data={tournaments}
                        keyExtractor={({id}) => id}
                        renderItem={({item}) => (
                            <Text>
                                {item.id}, {item.type} {item.organization}
                            </Text>
                        )}
                    />

                    <FlatList
                        data={players}
                        keyExtractor={({playerId}) => playerId}
                        renderItem={({item}) => (
                            <Text>
                                {item.playerId}, {item.name}
                            </Text>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
