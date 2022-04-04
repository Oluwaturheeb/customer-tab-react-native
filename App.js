import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import {Colors, IconButton} from 'react-native-paper';

// import our routes
import Welcome from './navs/welcomeScreen';
import Home from './navs/homeScreen';
import CreateUser from './navs/createUserScreen';
import CreateItem from './navs/createItemScreen';
import UpdateItem from './navs/updateItemScreen';
import CustomerInfo from './navs/customerInfoScreen';
import About from './navs/about';

const Stack = createNativeStackNavigator();

const App = () => {
    let [getUser, setUser] = useState('');

    useEffect(() => {
        const username = async () => {
            try {
                let user = await AsyncStorage.getItem('account');
                user = JSON.parse(user);
                setUser(user);
            } catch (e) {
                console.log(e)
            }
        }
        username();
    }, []);

    function Header ({nav, header, pageName, icon}) {
        let style = (pageName) ? 16 : 14;
        return (
            <View style={{paddingTop: 5, paddingBottom: 10, justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center', marginRight: 20}}>
                <View>
                    <Text style={{
                        color: Colors.green800,
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>{header}</Text>
                    <Text style={{fontSize: style}}>
                        {(pageName) ? pageName : (getUser) ? getUser.email : ''}
                    </Text>
                </View>
                {(icon) ? <IconButton onPress={() => nav.navigate('About')} icon='information-outline' color={Colors.green800} /> : false}
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name='Home' component={Home}
                    options={({navigation}) => ({
                        headerTitle: () => <Header icon={true} header='Customers List' nav={navigation}/>
                    })}
                />
                <Stack.Screen name='CreateItem' component={CreateItem}
                    options={{
                        headerTitle: () => <Header pageName='Add To Tab' header='Customers Tab'/>
                    }}
                />
                <Stack.Screen name='UpdateItem' component={UpdateItem}
                    options={{
                        headerTitle: () => <Header pageName='Update Payment' header='Customers Tab'/>
                    }}
                />
                <Stack.Screen name='CreateUser' component={CreateUser}
                    options={{
                        headerTitle: () => <Header pageName='Add Customer' header='Customers Tab'/>
                    }}
                />
                <Stack.Screen name='CustomerInfo' component={CustomerInfo}
                    options={{
                        headerTitle: () => <Header pageName='Customer Info' header='Customers Tab'/>
                    }}
                />
                <Stack.Screen name='About' component={About}
                    options={{
                        headerTitle: () => <Header pageName='About' header='Customers Tab'/>
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
