import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

type Match = {
    id: string;
    playerAscore: string;
    playerBscore: string;
    raceTo: string;
};

export default function Live() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Match[]>([]);

    const getMatches = async () => {
        try {
            const response = await fetch('https://cuescore-dashboard-plqw60fxe-m96rus-projects.vercel.app/api/cuescore/live');
            const json = await response.json();
            setData(json.matches);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
                        data={data}
                        keyExtractor={({id}) => id}
                        renderItem={({item}) => (
                            <Text>
                                {item.id}, {item.playerAscore} ({item.raceTo}) {item.playerBscore}
                            </Text>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
