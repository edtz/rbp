import React, {Component} from "react";
import {Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
    addNavigationHelpers,
    StackNavigator,
    NavigationActions,
    TabNavigator,
} from "react-navigation";

import {observable, action} from "mobx";
import {observer} from "mobx-react";
import MapView from "react-native-maps";

import Ionicons from "react-native-vector-icons/Ionicons";


const MyNavScreen = ({navigation, banner}) => (
    <ScrollView>
        <Button
            onPress={() => navigation.navigate("Profile", {name: "Jordan"})}
            title="Open profile screen"
        />
        <Button
            onPress={() => navigation.navigate("NotifSettings")}
            title="Open notifications screen"
        />
        <Button
            onPress={() => navigation.navigate("SettingsTab")}
            title="Go to settings tab"
        />
        <Button onPress={() => navigation.goBack(null)} title="Go back"/>
    </ScrollView>
);

const MyHomeScreen = ({navigation}) => (
    <MapView
        initialRegion={{
            latitude: 59.9408928,
            longitude: 30.3148344,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        style={styles.container}
    />
);


const MyProfileScreen = ({navigation}) => (
    <MyNavScreen
        banner={`${navigation.state.params.name}s Profile`}
        navigation={navigation}
    />
);

const MyNotificationsSettingsScreen = ({navigation}) => (
    <MyNavScreen banner="Notifications Screen" navigation={navigation}/>
);

const MySettingsScreen = ({navigation}) => (
    <MyNavScreen banner="Settings Screen" navigation={navigation}/>
);

const CatalogueScreen = ({navigation}) => (
    <FlatList
        style={styles.container}
        data={[
            {key: "Лол1"},
            {key: "Лол2"},
            {key: "Лол3"},
            {key: "Лол4"},
            {key: "Лол5"},
            {key: "Лол6"},
            {key: "Лол7"},
            {key: "Лол8"},
            {key: "Лол9"},
            {key: "Лол10"},
            {key: "Лол11"},
            {key: "Лол12"},
            {key: "Лол13"},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
    />
);

const TabNav = TabNavigator(
    {
        MainTab: {
            screen: MyHomeScreen,
            path: "/",
            navigationOptions: {
                title: "Карта",
                tabBarLabel: "Home",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? "ios-home" : "ios-home-outline"}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        CatalogueTab:{
            screen: CatalogueScreen,
            path: "/catalogue",
            navigationOptions: {
                title: "Каталог",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? "ios-list" : "ios-list-outline"}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        SettingsTab: {
            screen: MySettingsScreen,
            path: "/settings",
            navigationOptions: {
                title: "Settings",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? "ios-settings" : "ios-settings-outline"}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
    },
    {
        tabBarPosition: "bottom",
        animationEnabled: true,
        swipeEnabled: false,
    },
);

const StacksOverTabs = StackNavigator({
    Root: {
        screen: TabNav,
    },
    NotifSettings: {
        screen: MyNotificationsSettingsScreen,
        navigationOptions: {
            title: "Notifications",
        },
    },
    Profile: {
        screen: MyProfileScreen,
        path: "/people/:name",
        navigationOptions: ({navigation}) => {
            title: `${navigation.state.params.name}'s Profile!`;
        },
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: 100,
        width: 100,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});


export default StacksOverTabs;