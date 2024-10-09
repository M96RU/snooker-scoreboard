import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React from 'react';
import Match from '@/models/match';


export default function Live() {
    const [time, setTime] = React.useState(0);
    const [data, setData] = React.useState<Match[] | undefined>(undefined);

    const updateMatches = () => {
        fetch('https://cuescore-dashboard-rmh8j9dua-m96rus-projects.vercel.app/api/cuescore/live')
            .then(result => result.json())
            .then(data => {
                setData(data);
            }).catch(error => {
                console.error(error);
                const waitingMillis = data === undefined ? 5000 : 21000; // waiting more id data is already loaded
                // force next useEffect call to ensure refresh
                const id = setTimeout(() => {
                    setTime(new Date().getTime());
                }, waitingMillis);
                return () => {
                    clearTimeout(id);
                };
            }
        );
    }

    React.useEffect(() => {
        if (data === undefined) {
            updateMatches();
        } else {
            const id = setTimeout(() => {
                updateMatches();
            }, 31000);
            return () => {
                clearTimeout(id);
            };
        }
    });

    return (
        <View style={{flex: 1, padding: 24}}>
            {data === undefined ? (
                <ActivityIndicator/>
            ) : (
                <View>
                    <Text>OK</Text>

                    <FlatList
                        data={data}
                        keyExtractor={({id}) => id}
                        renderItem={({item}) => (
                            <Text>
                                {item.id}, {item.scoreA} ({item.raceTo}) {item.scoreB}
                            </Text>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
