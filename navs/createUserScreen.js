import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {TextInput, Button, Colors, Snackbar} from 'react-native-paper';
import {newuser} from '../components/userController';


export default CreateUser = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [submit, setSubmit] = useState(false);
    let [info, setInfo] = useState(false);
    const [show, setShow] = useState(true);
    const account = route.params.account;
    const type = route.params.type;
    const submitForm = async (e) => {
        if (!e) return;

        setSubmit(true);
        try{
            let fs = await newuser(e, account, type);
            setInfo(fs);
        } catch (e) {
            console.log(e.message);
        }
        
        // enable the form
        setSubmit(false);
    }

    return (
        <View style={{marginTop: 16, padding: 16, flex: 1}}>
            <TextInput
                name='username'
                label='Customer name...'
                mode='outlined'
                outlineColor={Colors.green800}
                activeOutlineColor={Colors.green800}
                placeholder='Enter customer name...'
                value={name}
                onChangeText={name => setName(name)}
            />
            <Button
                mode='contained'
                style={{
                    backgroundColor: Colors.green800,
                    padding: 10,
                    marginTop: 16
                }}
                onPress={() => submitForm(name)}
                loading={submit}
                disabled={submit}
                color='#000'
            >
                Add To Customers
            </Button>
            
            {info &&
            <Snackbar
                style={{width: Dimensions.get('window').width - 18}}
                visible={show}
                duration={2000}
                onDismiss={() => {
                    if (info.code) {
                        setShow(false)
                        navigation.navigate('Home', {...route.params, refresh: true})
                    } else {
                        setShow(true)
                        setInfo(false)
                    }
                }}
            >
                <Button icon='information' mode='text' labelStyle={{ color: (info.code)? '#fff': Colors.red500, fontSize: 16, margin: 0, padding: 0 }} uppercase={false}>
                    {info.msg}
                </Button>
            </Snackbar>
            }
        </View>
    )
}