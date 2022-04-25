import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, Dimensions} from 'react-native';
import {ActivityIndicator, Colors, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import signin from '../components/googleSignin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userinfo} from '../components/userController';

const Welcome = ({navigation}) => {
    const [display, setDisplay] = useState(true);
    const [refresh, Refresh] = useState(false)
    const [user, User] = useState(false);
    const [goHome, setHome] = useState(false);
    const [data, setData] = useState([]);
    const [button, buttonState] = useState(false);

    // toggle states
    const ToggleRefresh = () => Refresh(!refresh);

    useEffect(() => {
        // get the account if already in db
        const getAcc = async () => {
            try {
                const user = await AsyncStorage.getItem('account');
                if (!user) return false;
                return JSON.parse(user);
            } catch (e) {
                console.log(e.message);
            }
        }

        // execute all functions
        (async () => {
            let user = await  getAcc();
            
            if (user) {
                let tabs = await userinfo(user.id);
                setData(tabs);
                if (typeof tabs == 'object') {
                    User(user);
                    setHome(true);
                } else setDisplay(false);
                
            } else {
                // first time user
                user = await signin();
                if (typeof user === 'string' || user === null) {
                    setDisplay(false);
                    setData(3);
                } else {
                    let list = await userinfo(user.user.id);
                    setData(list);
                    setHome(true);
                    User(user.user);
                    setDisplay(true);
                    // collect and save for later
                    await AsyncStorage.setItem('account', JSON.stringify(user.user));
                }
            }
        })();

        buttonState(false);

    }, [refresh]);
    
    const WelcomeScreen = () => {
        return (
            // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ImageBackground source={require('./img/ic_launcher.jpg')} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 40, color: Colors.green800, fontWeight: 'bold'}}>
                        Customer's Tab
                    </Text>
                    <Text style={{color: Colors.green800, fontSize: 16}}>Keep tab on your customer's credit</Text>
                    <ActivityIndicator animating='true' color={Colors.green800} style={{marginTop: 32}} />
                </ImageBackground>
            // </View>
        );
    }

    const NoNetwork = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {(data == 3)?
                <>
                <Icon name='wifi-off' size={74} color={Colors.grey500}></Icon>
                <Text style={{marginTop: 32, color: Colors.green800, fontSize: 20}}>Can not connect to the internet.</Text>
                <Text style={{marginBottom: 16}}>Cannot connect to Google!</Text>
                </>
                :
                <>
                {(data == 1) ?
                <>
                    <Icon name='wifi-off' size={74} color={Colors.grey500}></Icon>
                    <Text style={{marginTop: 10, marginBottom: 16, color: Colors.grey500, fontSize: 20}}>Can not connect to the internet.</Text>
                </>
                :
                <>
                    <Icon name='server-off' size={74} color={Colors.grey500}></Icon>
                    <Text style={{marginTop: 10, marginBottom: 16, color: Colors.grey500, fontSize: 20}}>Server Error.</Text>
                </>
                }
                </>
                }
                <Button loading={button} mode='contained' uppercase={false} color={Colors.green800} onPress={() => {
                    ToggleRefresh();
                    buttonState(true);
                }} >Retry</Button>
            </View>
        );
    }

    // make welcome screen go away
    if (goHome) {
        setTimeout(() => {
            navigation.navigate('Home', {account: user.id, data: data});
        }, 0);
    }

    return (
        <>
        {(display)? <WelcomeScreen /> : <NoNetwork />}
        </>
    )
}

export default Welcome;