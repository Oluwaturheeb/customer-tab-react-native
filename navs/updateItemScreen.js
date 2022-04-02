import React, {useState, useEffect} from 'react';
import {View, Keyboard, Dimensions} from 'react-native';
import {TextInput, Button, Colors, Snackbar} from 'react-native-paper';
import {updateitem} from '../components/itemController';

export default UpdateItem = ({navigation, route}) => {
    // state
    const [paid, setPaid] = useState('');
    const [submit, setSubmit] = useState(false);

    
    const [info, setInfo] = useState(false);
    const [show, setShow] = useState(true);

    // fetch uri
    const submitForm = async (e) => {
        Keyboard.dismiss;
        if (!e) return false;
        // set the submit state to disable the form
        setSubmit(true);
        try {
            let data = await updateitem({paid: paid}, route.params.cid, route.params.type)

            // enable the form
            setInfo(data)
        } catch (e) {
            console.log('fetch error ' +e.message)
        }
        setSubmit(() => false)
    }

    // main component
    return (
        <View style={{marginTop: 16, padding: 16,flex: 1}} >
            <TextInput
                name='paid'
                label='Amount paid'
                mode='outlined'
                outlineColor={Colors.green800}
                activeOutlineColor={Colors.green800}
                placeholder='Enter amount paid...'
                value={paid}
                onChangeText={name => setPaid(name)}
                style={{marginBottom: 10}}
                keyboardType='numeric'
                returnKeyType='send'
            />
            <Button
                mode='contained'
                style={{
                    backgroundColor: Colors.green800,
                    padding: 10,
                    marginTop: 16
                }}
                onPress={() => submitForm(paid)}
                loading={submit}
                disabled={submit}
                color='#000'
            >
                Update Tab
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