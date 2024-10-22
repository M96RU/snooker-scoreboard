import 'react-native-gesture-handler';

import React from 'react';
import {Drawer} from 'expo-router/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomMenu from '@/components/CustomMenu';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Image} from 'react-native';
import Organization from '@/models/organization';
import {Constants} from '@/constants/Constants';

const defaultOrganizations: Organization[] = [
    {
        id: 'lbara',
        name: 'Ligue Auvergne-Rhône-Alpes',
        url: 'https://img.cuescore.com/image/0/2/0338989cafdd922c63cb57acd7be0329.png',
        display: true
    }
];

export default function DrawerLayout() {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [organizations, setOrganizations] = React.useState<Organization[]>(defaultOrganizations);

    if (loading) {
        setLoading(false);
        fetch(Constants.BACKEND_URL + Constants.ORGANIZATIONS_API)
            .then(result => result.json())
            .then(data => {
                if (data && data.organizations && data.organizations.length) {
                    setOrganizations(data.organizations)
                }
            }).catch(ignored => {
                // do nothing
            }
        );
    }

    const ffb = organizations.find(organization => 'ffb' === organization.id);
    const lbara = organizations.find(organization => 'lbara' === organization.id);

    return <GestureHandlerRootView style={{flex: 1}}>
        <Drawer drawerContent={CustomMenu} screenOptions={{
            drawerHideStatusBarOnOpen: true,
            drawerActiveBackgroundColor: '#5363df',
            drawerActiveTintColor: 'white',
            drawerLabelStyle: {marginLeft: -20}
        }}>
            <Drawer.Screen name={'index'} options={{
                drawerLabel: 'Home',
                headerTitle: 'Timer 8 Pool - Billard en direct',
                drawerIcon: ({color, focused}) => (
                    <MaterialIcons size={40} name={'home'} color={color}/>
                )
            }}/>
            <Drawer.Screen name={'ffb'} options={{
                drawerLabel: 'FFB - TN',
                headerTitle: ffb && ffb.name ? ffb.name : 'Fédération Française de Billard',
                drawerItemStyle: {
                    display: ffb && ffb.display ? undefined : 'none'
                },
                drawerIcon: () => (
                    <Image source={require('@/assets/images/ffb.png')} style={{width: 40, height: 40}}/>
                )
            }}/>
            <Drawer.Screen name={'lbara'} options={{
                drawerLabel: 'LBARA - TR',
                headerTitle: lbara && lbara.name ? lbara.name : 'Ligue Auvergne-Rhône-Alpes',
                drawerItemStyle: {
                    display: lbara && lbara.display ? undefined : 'none'
                },
                drawerIcon: () => (
                    <Image source={require('@/assets/images/lbara.png')} style={{width: 40, height: 40}}/>
                )
            }}/>
            <Drawer.Screen name={'cuescore'} options={{
                drawerLabel: 'Cuescore Scorer',
                headerTitle: 'Cuescore Scorer',
                drawerIcon: ({color}) => (
                    <MaterialIcons size={40} name={'qr-code-scanner'} color={color}/>
                )
            }}/>
            <Drawer.Screen name={'timer'} options={{
                drawerLabel: 'Timer',
                headerTitle: 'Timer',
                drawerIcon: ({color, focused}) => (
                    <MaterialIcons size={40} name={focused ? 'hourglass-bottom' : 'hourglass-top'} color={color}/>
                )
            }}/>
        </Drawer>
    </GestureHandlerRootView>
}
