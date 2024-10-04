import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tournament from '@/models/tournament';
import Player from '@/models/player';
import Match from '@/models/match';

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
    const [matches, setMatches] = useState<Match[]>([]);
    const [players, setPlayers] = useState<Map<string, Player>>(new Map<string, Player>());
    const [id, setId] = useState<string>("ok");

    const path = 'https://cuescore-dashboard-plqw60fxe-m96rus-projects.vercel.app'
    const cuescoreTournamentPlayersUrl = 'https://api.cuescore.com/tournament/?participants=Participants+list&id='
    const cuescoreTournamentMatchesUrl = 'https://api.cuescore.com/tournament/?id='


    const getMatches = async () => {

        let tmpTournaments: Tournament[] | undefined = undefined;
        try {
            const response = await fetch(path + '/api/cuescore');
            const json = await response.json();

            tmpTournaments = json.tournaments;
            // setTournaments(json.tournaments);
        } catch (error) {
            console.error(error);
        }

        if (tmpTournaments && tmpTournaments.length > 0) {
            let mapPlayers = new Map<string, Player>();
            let mapMatches = new Map<string, Match>();
            for (let tournament of tmpTournaments) {
                // const response = await fetch(cuescoreTournamentPlayersUrl + tournament.id);
                // const tmpPlayers: Player[] = await response.json();
                const response = await fetch(cuescoreTournamentMatchesUrl + tournament.id);
                const json = await response.json();
                const cuescoreMatches: Match[] = json.matches;
                if (cuescoreMatches && cuescoreMatches.length > 0) {
                    for (let match of cuescoreMatches) {
                        mapMatches.set(match.matchId, match);
                    }
                }
                // if (tmpPlayers && tmpPlayers.length > 0) {
                //     for (let player of tmpPlayers) {
                //         mapPlayers.set(player.playerId, player);
                //         setId(player.playerId);
                //     }
                // }
            }
            setMatches(Array.from(mapMatches.values()));
        }
        setLoading(false);
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

                    <Text>OK</Text>
                    <Text>[{players.get(id)?.playerId}]</Text>
                    <Text>DAK</Text>

                    <FlatList
                        data={matches}
                        keyExtractor={({matchId}) => matchId}
                        renderItem={({item}) => (
                            <Text>
                                {item.matchId}, {item.playerA?.name} {item.playerB?.name}
                            </Text>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
