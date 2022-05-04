import React from 'react';
import { Text, View, StyleSheet, Linking, ScrollView, SafeAreaView } from 'react-native';
import { Title, Colors, Button, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const About = () => {
    return (
        <SafeAreaView style={css.container}>
            <ScrollView>
                <Text style={css.head}>About App</Text>
                <Paragraph style={css.txt}>
                    <Title>Customer Tab</Title> is an app developed to help keep track of customers and personal credit.
                    This application is available for both Android and Web platform. This app is free to download and free to use.
                </Paragraph>
                <Paragraph style={{ marginTop: 20 }}>
                    <View style={css.txtUrl}>
                        <Text>Android: </Text>
                        <Button color={Colors.green800} uppercase={false} mode='text' onPress={async () => await Linking.openURL('https://customertab.herokuapp.com/download')}>https://customertab.herokuapp.com/download</Button>
                    </View>
                    <View style={css.txtUrl}>
                        <Text>Web: </Text>
                        <Button color={Colors.green800} uppercase={false} mode='text' onPress={async () => await Linking.openURL('https://customertab.herokuapp.com')}>https://customertab.herokuapp.com</Button>
                    </View>
                </Paragraph>
                <Text style={css.head}>About developer</Text>
                <Paragraph style={css.txt}>
                    <Title>Toheeb Bello</Title> is a full stack mobile and web developer,
                    with more than 5years experience developing top quality apps. You can reach out to me for any services via:
                </Paragraph>
                <View style={css.social}>
                    <Icon style={{marginRight: 20}} size={40} color={Colors.blue900} name='facebook' onPress={async () => await Linking.openURL('https://facebook.com/toheeb.bello.14')} />
                    <Icon style={{marginRight: 20}} size={40} color={Colors.green600} name='whatsapp' onPress={async () => await Linking.openURL('https://wa.me/2349030687052/?text=Hello%20Toheeb,%20contacting%20you%20from%20customertab')}/>
                    <Icon style={{marginRight: 20}} size={40} color={Colors.red600} name='gmail' onPress={async () => await Linking.openURL('mailto:oluwaturheeb@gmail.com')} />
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginBottom: 10,
    },
    social: {
        flexDirection: 'row',
        gridGap: 90,
        marginBottom: 30,
        justifyContent: 'center',
    },
})

export default About;
