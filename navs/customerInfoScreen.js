import React, {useState, useEffect} from 'react';
import {Colors, Avatar, BottomNavigation} from 'react-native-paper';
import {View, FlatList, TouchableHighlight, Text, SafeAreaView, StyleSheet, Alert, TouchableNativeFeedback} from 'react-native';
import {money} from '../components/firestore';

export default CustomerInfo = ({route, navigation}) => {
    const data = route.params.item;
    const [index, setIndex] = useState(() => 0);
    const [routes] = useState([
        { key: 'info', title: 'Credit info', icon: 'information-outline' },
        { key: 'payment', title: 'Payment info', icon: 'cash-100' },
    ]);
    
    const Nav = () => {
        if (!data.details) return null;

        const formatDate = tym => {
            let date = new Intl.DateTimeFormat('en-GB', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                hour12: true,
                minute: 'numeric'
            });
            return date.format(new Date(tym * 1000));
        }

        // destruct the data var
        var {info, payment} = data.details;
        if (!payment) payment = [];
        // info route
        const InfoRoute = () => {
            const Info = ({index, item}) => {
                return (
                    <TouchableNativeFeedback>
                        {(index % 2 === 0) ?
                        <View style={style.green}>
                            <Text style={style.greeny}>{money(item.total)}</Text>
                            <Text style={{color: '#eee', fontSize: 16, fontStyle: 'italic', fontWeight: 'bold'}}>Description</Text>
                            <Text style={{color: '#eee', fontSize: 16}}>{item.description}</Text>
                            <Text style={{textAlign: 'right', color: Colors.lightGreen100}}>{formatDate(item.timeAdded._seconds)}</Text>
                        </View>
                        :
                        <View style={style.white}>
                            <Text style={style.whitey}>{money(item.total)}</Text>
                            <Text style={{color: Colors.green500, fontSize: 16, fontStyle: 'italic', fontWeight: 'bold'}}>Description</Text>
                            <Text style={{color: Colors.green500, fontSize: 16}}>{item.description}</Text>
                            <Text style={{textAlign: 'right', color: Colors.green400}}>{formatDate(item.timeAdded._seconds)}</Text>
                        </View>
                        }
                    </TouchableNativeFeedback>
                )
            };

            return (
                <View>
                {(info) ?
                    <FlatList
                        style={{margin: 10}}
                        data={info.reverse()}
                        renderItem= {Info}
                    />
                    :
                    <View style={style.middle} >
                        <Text>Nothig to display!</Text>
                    </View>
                }
                </View>
            )
        }

        const PaymentRoute = () => {
            const Payment = ({index, item}) => {
                return (
                    <TouchableNativeFeedback>
                        {(index % 2 === 0) ?
                        <View style={style.green}>
                            <Text style={style.greeny}>{money(item.paid)}</Text>
                            <Text style={{textAlign: 'right', color: Colors.lightGreen100}}>{formatDate(item.timeAdded._seconds)}</Text>
                        </View>
                        :
                        <View style={style.white}>
                            <Text style={style.whitey}>{money(item.paid)}</Text>
                            <Text style={{textAlign: 'right', color: Colors.green400}}>{formatDate(item.timeAdded._seconds)}</Text>
                        </View>
                        }
                    </TouchableNativeFeedback>
                )
            }
            return (
                <View>
                {(info) ?
                    <FlatList
                        style={{margin: 10}}
                        data={info.concat(payment).reverse()}
                        renderItem= {Payment}
                    />
                    :
                    <View style={style.middle}>
                        <Text>No payment history to display</Text>
                    </View>
                }
                </View>
            )
        }
        
        const renderScene = BottomNavigation.SceneMap({
            info: InfoRoute,
            payment: PaymentRoute,
        });

        return (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{backgroundColor: Colors.green800}}
                activeColor='#fff'
                inactiveColor='#aaa'
            />
        );
    }

    return (
        <SafeAreaView style={style.container}>
            <TouchableHighlight style={{padding: 16, backgroundColor: '#ccc', alignItems: 'center'}} onPress={() => Alert.alert('Customer credit', `Credit balance is ${data.total}`)}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Avatar.Text size={60} label={(data) ? data.name[0] : ''} style={{backgroundColor: Colors.green800, fontWeight: 'bold'}} color='#eee'></Avatar.Text>
                        <Text style={{color: Colors.green800, fontSize: 32, fontWeight: 'bold', marginLeft: 10}}>{data.name}</Text>
                    </View>
                    <Text style={{color: Colors.green800, fontSize: 16, fontWeight: 'bold', marginTop: 10}}>Credit balance: {data.total}</Text>
                </View>
            </TouchableHighlight>
            <Nav/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    green: {
        backgroundColor: Colors.green700,
        padding: 7,
    },
    white: {
        padding: 7,
        backgroundColor: '#eee',
    },
    greeny: {
        fontSize: 20,
        color: '#eee',
        fontWeight: 'bold',
    },
    whitey: {
        fontSize: 20,
        color: Colors.green500,
        fontWeight: 'bold',
    },
    addBtn: {
        borderRadius: 100,
        height: 50,
        width: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.green500,
    },
    addBtnText: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
    }
});