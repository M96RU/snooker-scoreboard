import {ActivityIndicator, ScrollView} from 'react-native';
import React from 'react';
import Matches, {MatchesProps} from '@/components/Matches';
import {Constants} from '@/constants/Constants';

export default function Live(organization: string) {
    const [time, setTime] = React.useState(0);
    const [data, setData] = React.useState<MatchesProps | undefined>(undefined);

    const updateMatches = () => {

        fetch(Constants.BACKEND_URL + Constants.LIVE_API + '?organization=' + organization)
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
        <ScrollView style={{flex: 1, marginLeft: 5, marginRight: 5}}>
            {data === undefined ? (
                <ActivityIndicator/>
            ) : (
                <Matches {...data} />
            )}
        </ScrollView>
    );
}
