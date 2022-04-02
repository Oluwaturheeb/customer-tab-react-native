import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, Dimensions} from 'react-native';
import {TextInput, Button, Colors, Snackbar} from 'react-native-paper';
import {newitem} from '../components/itemController';

export default CreateItem = ({navigation, route}) => {
    // state
    const [paid, setPaid] = useState('');
    const [total, setTotal] = useState('');
    const [desc, setDesc] = useState('');
    const [submit, setSubmit] = useState(false);
    const customer = route.params.cid;
    
    const [info, setInfo] = useState(false);
    const [show, setShow] = useState(true);

    // fetch uri
    const submitForm = async (e) => {
        // disable the form
        setSubmit(true);
        try {
            let data = await newitem({
                paid: paid,
                total: total,
                desc: desc,
            }, customer, route.params.type)
            setInfo(data);
        } catch (e) {
            console.log(e.message);
        }
        setSubmit(false)
    }

    // main component
    return (
        <ScrollView>
            <KeyboardAvoidingView  style={{marginTop: 16, flex: 1}} behavior='padding' contentContainerStyle={{flexGrow: 1}} keyboardShouldPersist='handled'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{padding: 10, flex: 1}}>
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
                            returnKeyType='next'
                            keyboardType='numeric'
                        />
                        <TextInput
                            name='paid'
                            label='Total items bought'
                            mode='outlined'
                            outlineColor={Colors.green800}
                            activeOutlineColor={Colors.green800}
                            placeholder='Enter total amount...'
                            value={total}
                            onChangeText={total => setTotal(total)}
                            style={{marginBottom: 10}}
                            returnKeyType='next'
                            keyboardType='numeric'
                        />
                        <TextInput
                            name='paid'
                            label='Item description'
                            mode='outlined'
                            outlineColor={Colors.green800}
                            activeOutlineColor={Colors.green800}
                            placeholder='Enter item description...'
                            value={desc}
                            onChangeText={desc => setDesc(desc)}
                            style={{marginBottom: 10}}
                            multiline={true}
                            numberOfLines={10}
                            returnKeyType='send'
                        />
                        <Button
                            mode='contained'
                            style={{
                                backgroundColor: Colors.green800,
                                padding: 10,
                                marginTop: 16,
                                marginBottom: 72,
                            }}
                            onPress={() => submitForm(paid)}
                            loading={submit}
                            disabled={submit}
                            color='#000'
                            returnKeyType='send'
                        >
                            Add To Tab
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
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}