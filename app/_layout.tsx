import {Tabs} from "expo-router";
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import React from 'react';

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="live" options={
                {
                    title: 'Live',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'walk' : 'walk-outline'} color={color}/>
                    )
                }
            }/>
            <Tabs.Screen name="index" options={
                {
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    )
                }
            }/>
        </Tabs>
    );
}
