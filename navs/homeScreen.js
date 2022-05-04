// /* eslint-disable prettier/prettier */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { SafeAreaView, Text, StyleSheet, Alert, FlatList, TouchableNativeFeedback, TouchableHighlight, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Button, Provider, Portal, Modal, IconButton, BottomNavigation } from 'react-native-paper';
import { userinfo, userreset } from '../components/userController';

// main component
const Home = ({ navigation, route }) => {
    // for resfreshing after reqs
    const [refresh, setRefresh] = useState(false);
    // api
    const account = route.params.account;
    const [userList, setData] = useState(route.params.data);
    const [type, Type] = useState(1);

    // for bottom nav
    const [index, setIndex] = useState(() => 0);
    const [routes] = useState([
        { key: 'myTab', title: 'Customers Tab', icon: 'account-group-outline' },
        { key: 'otherTab', title: 'My credit tab', icon: 'account' },
    ]);

    // modal
    const [visible, Visible] = useState(false),
        openModal = () => Visible(true),
        closeModal = () => Visible(false);

    // reset the navigation after d welcome screen has been displayed
    useEffect(() => {
        navigation.dispatch(state => {
            const routes = state.routes.filter(r => r.name !== 'Welcome');
            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1
            });
        });
    }, []);

    const Nav = () => {
        const renderScene = BottomNavigation.SceneMap({
            myTab: () => {
                Type(1);
                route.params.type = 1;
                return <ShowData />
            },
            otherTab: () => {
                Type(2);
                route.params.type = 2;
                return <ShowData />
            },
        });

        return (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{ backgroundColor: Colors.green800 }}
                activeColor='#fff'
                inactiveColor={Colors.green100}
            />
        );
    }

    // change tab on menu change
    if (type == 1)
        var tab = {
            total: userList.myTabTotal || userList.total,
            customers: userList.myTab
        };
    else
        tab = {
            total: userList.othersTabTotal || userList.total,
            customers: userList.othersTab
        }

    const reloadData = async () => {
        try {
            let list = await userinfo(account);
            setData(() => list);
        } catch (e) {
            switch (e.message.split(' ')[0]) {
                case 'Network':
                    setData(1);
                    break;
                case 'Syntax':
                    setData(2);
                    break
            }
        }
        setRefresh(false);
    }

    // set the refresh
    if (route.params) {
        if (route.params.refresh === true) {
            route.params.refresh = false;
            setRefresh(true);
        }
    }

    if (refresh === true) reloadData();

    const ItemModal = () => {
        const resetTab = async (rm = false) => {
            try {
                let req = await userreset(route.params.cid, route.params.type, rm);
                Alert.alert('Reset customer tab', req.msg);
                setRefresh(true);

            } catch (e) {
                // console.log(e.message)
            }
        }
        return (
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={style.modal} dismissable={true}>
                        <View>
                            <Text style={{ fontSize: 18, color: Colors.green700, fontWeight: 'bold', padding: 10, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: Colors.green800 }}>Action for {route.params.name}</Text>
                            <View style={{ marginTop: 5 }}>
                                {/* add */}
                                <Button color={Colors.green800} onPress={() => {
                                    closeModal();
                                    navigation.navigate('CreateItem', route.params);
                                    setRefresh(false);
                                }}>Add to tab</Button>

                                {/* update */}
                                <Button color={Colors.green800} onPress={() => {
                                    closeModal();
                                    navigation.navigate('UpdateItem', route.params);
                                    setRefresh(false);
                                }}>Update tab</Button>

                                {/* reset */}
                                <Button color={Colors.green800} onPress={() => {
                                    closeModal();
                                    Alert.alert('Reset customer tab?', 'Do you wish to continue', [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'ok',
                                            onPress: () => resetTab()
                                        }
                                    ])
                                }}>Reset tab</Button>

                                {/* remove customer */}
                                <Button color={Colors.green800} onPress={() => {
                                    closeModal();
                                    Alert.alert('Remove customer?', 'Do you wish to continue, this action cannot be undone!', [
                                        {
                                            text: 'Cancel',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'ok',
                                            onPress: () => resetTab(true)
                                        }
                                    ])
                                }}>Remove from tab</Button>
                            </View>
                        </View>
                    </Modal>
                </Portal>
            </Provider>
        )
    }

    const showModal = (user, id) => {
        route.params.cid = id;
        route.params.name = user;
        openModal();
        return <ItemModal />
    }

    const toMemo = () => {
        // show items in list
        const listItem = ({ index, item }) => {
            return (
                <>
                    {(item) ?
                        <TouchableNativeFeedback onPress={() => navigation.navigate('CustomerInfo', { ...route.params, cid: item.id, item: item })} style={{ zIndex: -1 }}>
                            {(index % 2 === 0) ?
                                <View style={style.green}>
                                    <View>
                                        <Text style={style.greeny}>{item.name}</Text>
                                        <Text style={{ color: 'white' }}>{item.total}</Text>
                                    </View>
                                    <IconButton icon='arrow-down-drop-circle-outline' onPress={e => { e.stopPropagation(); showModal(item.name, item.id) }} color='#ccc' />
                                </View>
                                :
                                <View style={style.white}>
                                    <View>
                                        <Text style={style.whitey}>{item.name}</Text>
                                        <Text style={{ color: Colors.green800 }}>{item.total}</Text>
                                    </View>
                                    <IconButton icon='arrow-down-drop-circle-outline' onPress={e => { e.stopPropagation(); showModal(item.name, item.id) }} color={Colors.green800} />
                                </View>
                            }
                        </TouchableNativeFeedback>
                        :
                        <Text>
                            No customer found!
                        </Text>
                    }
                </>
            );
        };

        return (
            <FlatList
                style={{ margin: 10 }}
                data={tab.customers}
                renderItem={listItem}
                keyExtractor={item => item.id}
            />
        );
    }

    const ListItems = useMemo(() => toMemo, [refresh, type]);

    const gotoCreateUser = () => {
        setRefresh(false);
        return navigation.navigate('CreateUser', { ...route.params, account: account });
    }

    const NoNetwork = ({ str }) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {(str === 1) ?
                    <>
                        <Icon name='wifi-off' size={74} color={Colors.grey500}></Icon>
                        <Text style={{ marginTop: 10, marginBottom: 16, color: Colors.grey500, fontSize: 20 }}>Can not connect to the internet.</Text>
                    </>
                    :
                    <>
                        <Icon name='server-off' size={74} color={Colors.grey500}></Icon>
                        <Text style={{ marginTop: 10, marginBottom: 16, color: Colors.grey500, fontSize: 20 }}>Server Error.</Text>
                    </>
                }
                <Button loading={refresh} mode='contained' uppercase={false} onPress={() => setRefresh(true)} color={Colors.green800}>Retry</Button>
            </View>
        );
    }

    const ShowData = () => {
        return (<View>
            {(typeof userList === 'number') ?
                <NoNetwork str={userList} />
                :
                <>
                    {(userList.code === 0) ?
                        <NoNetwork str={2} />
                        :
                        <>
                            {(userList.msg) ?
                                <View style={{ alignItems: 'center' }}>
                                    <Icon name="account-group-outline" size={172} color={Colors.green500} />
                                    <Text style={{ fontSize: 20, color: Colors.green500 }}>{userList.msg}</Text>
                                </View>
                                :
                                <ListItems />
                            }
                        </>
                    }
                </>
            }
        </View>);
    };

    return (
        <SafeAreaView style={style.container}>
            <TouchableHighlight style={{ padding: 16, backgroundColor: '#ccc' }} onPress={() => Alert.alert('Total credit', `Credit balance is ${tab.total || 'unavailable'}`)}>
                <View>
                    <Text style={{ color: Colors.green800, fontSize: 32, fontWeight: 'bold' }}>Total Credit</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text>
                            <Button color={Colors.green800} icon='wallet' mode='text' loading={refresh} labelStyle={{ fontSize: 18, fontWeight: 'bold', color: Colors.green800 }}>{tab.total || tab.total}</Button>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
            <Nav />
            {(visible) ?
                <ItemModal /> :
                <View>
                    <TouchableHighlight style={style.addBtn} onPress={gotoCreateUser}>
                        <Text style={style.addBtnText}>+</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={style.BNS}>
                        <Text></Text>
                    </TouchableHighlight>
                </View>
            }
        </SafeAreaView>
    );
};

var btnWidthCal = Dimensions.get('window').width / 2;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    green: {
        backgroundColor: Colors.green700,
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    white: {
        padding: 7,
        backgroundColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        bottom: 35,
        left: btnWidthCal - 25,
        backgroundColor: Colors.green700,
        zIndex: 0,
        elevation: 10,
    },
    BNS: {
        borderBottomEndRadius: 100,
        borderBottomStartRadius: 100,
        height: 40,
        width: 80,
        position: 'absolute',
        bottom: 20,
        left: btnWidthCal - 40,
        backgroundColor: Colors.grey100,
        zIndex: -1,
        elevation: 1,
    },
    addBtnText: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
    },
    modal: {
        backgroundColor: Colors.grey300,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Dimensions.get('window').width,
        borderTopStartRadius: 16,
        borderTopEndRadius: 16,
    },
    menu: {
        backgroundColor: Colors.grey300,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height,
    },
    menuContainer: {
        flex: 1,
        marginTop: 95,
    },
    menuItemActive: {
        backgroundColor: Colors.green800,
        padding: 10,
        color: Colors.grey300,
        fontSize: 16
    },
    menuItem: {
        padding: 10,
        backgroundColor: Colors.grey300,
        fontSize: 16,
        color: Colors.green800
    }
});

export default Home;