import React from 'react';
import { Text, View, StyleSheet, Linking, ScrollView } from 'react-native';
import { Title, Colors, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const About = () => {
    return (
        <ScrollView style={css.container}>
            <View>
                <Text style={css.head}>About App</Text>
                <Text style={css.txt}>
                    <Title>Customer Tab</Title> is an app developed to help keep track of customers and personal credit.
                </Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={css.txt}>
                    This application is available for both Android and Web platform. This app is free to download and free to use.
                </Text>
                <View style={css.txtUrl}>
                    <Text>Android: </Text>
                    <Button color={Colors.green800} uppercase={false} mode='text' onPress={async () => await Linking.openURL('https://customertab.herokuapp.com/download')}>https://customertab.herokuapp.com/download</Button>
                </View>

                <View style={css.txtUrl}>
                    <Text>Web: </Text>
                    <Button color={Colors.green800} uppercase={false} mode='text' onPress={async () => await Linking.openURL('https://customertab.herokuapp.com')}>https://customertab.herokuapp.com</Button>
                </View>
            </View>
            <View>
                <Text style={css.head}>About developer</Text>
                <Text style={css.txt}>
                    <Title>Toheeb Bello</Title> is a full stack mobile and web developer,
                    with more than 5years experience developing top quality apps.
                    You can reach out to me for any services via,
                </Text>
                <View style={css.social}>
                    <Icon size={40} color={Colors.green600} name='whatsapp' onPress={async () => await Linking.openURL('https://wa.me/2349030687052/?text=Hello%20Toheeb,%20contacting%20from%20customertab')}/>
                    <Icon size={40} color={Colors.blue900} name='facebook' onPress={async () => await Linking.openURL('https://facebook.com/toheeb.bello.14')} />
                    <Icon size={40} color={Colors.red600} name='gmail' onPress={async () => await Linking.openURL('mailto:oluwaturheeb@gmail.com')} />
                </View>
            </View>
        </ScrollView>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    head: {
        color: Colors.green800,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    txt: {
        color: Colors.grey800,
        fontSize: 16,
        lineHeight: 20,
    },
    txtUrl: {
        color: Colors.grey800,
        fontSize: 16,
        lineHeight: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    social: {
        flexDirection: 'row',
        gridGap: 10,
        marginTop: 10,
        marginBottom: 30,
        justifyContent: 'center',
    },
})

export default About;
