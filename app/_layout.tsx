import 'react-native-gesture-handler';

import React from 'react';
import {Drawer} from 'expo-router/drawer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomMenu from '@/components/CustomMenu';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';

export default function DrawerLayout() {
    return <GestureHandlerRootView style={{flex: 1}}>
        <Drawer drawerContent={CustomMenu} screenOptions={{
            drawerHideStatusBarOnOpen: true,
            drawerActiveBackgroundColor: '#5363df',
            drawerActiveTintColor: 'white',
            drawerLabelStyle: {marginLeft: -20}
        }}>
            <Drawer.Screen name={'live'} options={{
                drawerLabel: 'Live',
                headerTitle: 'Live',
                drawerIcon: ({color, focused}) => (
                    <TabBarIcon name={focused ? 'walk' : 'walk-outline'} color={color}/>
                )
            }}/>
            <Drawer.Screen name={'index'} options={{
                drawerLabel: 'Index',
                headerTitle: 'Index',
                drawerIcon: ({color, focused}) => (
                    <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                )
            }}/>
        </Drawer>
    </GestureHandlerRootView>
}
