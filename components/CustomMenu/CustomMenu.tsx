import React from 'react';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function CustomMenu(props: any) {
    const {bottom} = useSafeAreaInsets();
    return (
        <View style={{flex: 1}}>

            <DrawerContentScrollView
                {...props}
                scrollEnabled={false}
                contentContainerStyle={{backgroundColor: '#dde3fe'}}>

                <View style={{padding: 20}}>
                    <Image source={require('@/assets/images/icon.png')}
                           style={{width: 100, height: 100, alignSelf: 'center'}}/>
                    <Text style={{
                        alignSelf: 'center',
                        fontWeight: '500',
                        fontSize: 18,
                        paddingTop: 10,
                        color: '#5363df'
                    }}>Billard en direct</Text>
                </View>
                <View style={{
                    backgroundColor: 'white',
                    paddingTop: 10
                }}>
                    <DrawerItemList {...props} />
                    {/*<DrawerItem label={'logout'} onPress={() => console.log('Logout')} />*/}
                </View>
            </DrawerContentScrollView>

            <View style={{
                borderTopColor: '#dde3fe',
                borderTopWidth: 1,
                padding: 20,
                paddingBottom: 20 + bottom
            }}>
                <Text>Timer 8 Pool - Billard en direct</Text>
            </View>
        </View>
    )
}