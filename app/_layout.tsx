import 'react-native-gesture-handler';

import React from 'react';
import {Drawer} from 'expo-router/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomMenu from '@/components/CustomMenu';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DrawerLayout() {
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
                    <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                )
            }}/>
            <Drawer.Screen name={'live'} options={{
                drawerLabel: 'Live',
                headerTitle: 'Live',
                drawerIcon: ({color, focused}) => (
                    <TabBarIcon name={focused ? 'walk' : 'walk-outline'} color={color}/>
                )
            }}/>
            <Drawer.Screen name={'cuescore'} options={{
                drawerLabel: 'Cuescore Scorer',
                headerTitle: 'Cuescore Scorer',
                drawerIcon: ({color}) => (
                    <MaterialIcons size={28} name={'qr-code-scanner'} color={color}/>
                )
            }}/>
            <Drawer.Screen name={'timer'} options={{
                drawerLabel: 'Timer',
                headerTitle: 'Timer',
                drawerIcon: ({color, focused}) => (
                    <MaterialIcons size={28} name={focused ? 'hourglass-bottom' : 'hourglass-top'} color={color}/>
                )
            }}/>
        </Drawer>
    </GestureHandlerRootView>
}
