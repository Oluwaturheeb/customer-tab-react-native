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

    function Header ({nav}) {
        return (
            <View style={{paddingTop: 5, paddingBottom: 10, justifyContent: 'space-between', flexDirection: 'row', flex: 1, alignItems: 'center', marginRight: 20}}>
                <View>
                    <Text style={{
                        color: Colors.green800,
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>Customers List</Text>
                    <Text style={{fontSize: 14}}>{(getUser) ? getUser.email : ''}</Text>
                </View>
                <IconButton onPress={() => nav.navigate('About')} icon='information-outline' color={Colors.green800} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name='Home' component={Home}
                    options={({navigation}) => ({
                        title: 'Customers List',
                        headerStyle: {
                            color: Colors.green800,
                            fontSize: 22,
                        },
                        headerTitle: () => <Header nav={navigation} />
                    })}
                />
                <Stack.Screen name='CreateItem' component={CreateItem}
                    options={{
                        title: 'Add To Tab',
                        headerStyle: {
                            color: Colors.green800,
                            fontSize: 22,
                        },
                    }}
                />
                <Stack.Screen name='UpdateItem' component={UpdateItem}
                    options={{
                        title: 'Update Payment',
                        headerStyle: {
                            color: Colors.green800,
                            fontSize: 22,
                        },
                    }}
                />
                <Stack.Screen name='CreateUser' component={CreateUser}
                    options={{
                        title: 'Add Customer',
                        headerStyle: {
                            color: Colors.green800,
                            fontSize: 22,
                        },
                    }}
                />
                <Stack.Screen name='CustomerInfo' component={CustomerInfo}
                    options={{
                        title: 'Customer Info',
                        headerStyle: {
                            color: Colors.green800,
                            fontSize: 22,
                        },
                    }}
                />
                <Stack.Screen name='About' component={About}
                    options={{
                        title: 'About',
                        headerStyle: {
                            color: Colors.green800,
                            fontSize: 22,
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;
