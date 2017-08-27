import React, {Component} from "react";
import {
    Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity,
    View, Animated, Dimensions, StatusBar
} from "react-native";
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

import {bars, bars2} from "./bars";

import {mapStyle} from "./store";
import SlidingUpPanel from "rn-sliding-up-panel";

import { LoginPage } from "./components/pages/login/login.component";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    panel: {
        flex: 1,
        backgroundColor: "white",
        position: "relative",
    },
    barDetail: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
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
    },
    dragger: {
        width: 50,
        height: 4,
        backgroundColor: "#8c9ba1",
        borderRadius: 25,
        marginTop: 7,
        marginBottom: 17,
    },
    panelHeader: {
        height: 100,
        backgroundColor: "#1c2939",
        flex: 1,
        alignItems: "center",
    },
    uiColor: {
        backgroundColor: "#36465a"
    },
});

class Store {
    @observable bars = [];
    @observable user = {};
    @observable region = {
        latitude: 59.9408928,
        longitude: 30.3148344,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    @observable selectedBar;

    users = [
        {
            id: 1,
            name: "Алексей",
            gender: "",
            beer: [],
            friends: [3, 5],
            bars: [],
        },
        {
            id: 2,
            name: "Коля",
            gender: "",
            beer: [],
            friends: [4],
            bars: [],
        },
        {
            id: 3,
            name: "Михаил",
            gender: "",
            beer: [],
            friends: [1, 5],
            bars: [],
        },
        {
            id: 4,
            name: "Арсен",
            gender: "",
            beer: [],
            friends: [2],
            bars: [],
        },
        {
            id: 5,
            name: "Артем",
            gender: "",
            beer: [],
            friends: [1, 3],
            bars: [],
        },
    ];

    beers = [];

    @action addBars = (bars) => {
        bars.forEach(bar => this.bars.push({
            key: bar.id,
            name: bar.name,
            coords: {
                latitude: bar.point.lat,
                longitude: bar.point.lon,
            },
            pinColor: "#fff",
            point: bar.point,
        }));
    };

    @action loginUser = () => {
        this.user = this.users[Math.floor(Math.random() * this.users.length)];
        console.log("blbalba");
    };
    @action setLocation = (region) => {
        this.region = region;
    };

    @action selectBar = (key) => this.selectedBar = this.bars.filter(bar => bar.key === key)[0];
}

const barStore = new Store();

barStore.addBars(bars.result.items);
barStore.addBars(bars2.result.items);


StatusBar.setBarStyle('light-content', true);

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

@observer
class Map extends React.Component {
    render() {
        const store = barStore;
        return (
            <View style={styles.container}>
                <MapView
                    provider={"google"}
                    region={store.region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    onRegionChangeComplete={region => store.setLocation(region)}
                    customMapStyle={mapStyle}
                    style={styles.map}>
                    {barStore.bars.map(bar => (
                        <MapView.Marker
                            coordinate={bar.coords}
                            title={bar.name}
                            key={bar.key}
                            pinColor={bar.pinColor}
                            onPress={event => store.selectBar(bar.key)}>
                            <MapView.Callout tooltip={true}/>
                        </MapView.Marker>
                    ))}
                </MapView>
                <BarDetail selectedBar={store.selectedBar}/>
            </View>
        );
    }
}

const {height} = Dimensions.get("window");

@observer
class BarDetail extends React.Component {
    static defaultProps = {
        draggableRange: {
            top: height,
            bottom: 210,
        },
    };

    _draggedValue = new Animated.Value(-120);

    render() {
        if (this.props.selectedBar) {
            return (
                <SlidingUpPanel
                    visible
                    showBackdrop={false}
                    ref={(c) => {
                        this._panel = c;
                    }}
                    draggableRange={this.props.draggableRange}
                    onDrag={(v) => this._draggedValue.setValue(v)}>
                    <View style={styles.panel}>
                        <View style={styles.panelHeader}>
                            <View style={styles.row}>
                                <View style={styles.dragger}/>
                            </View>
                            <Text style={{color: "#FFF"}}>Bottom Sheet Peek</Text>
                        </View>
                    </View>
                </SlidingUpPanel>
            );
        } else {
            return null;
        }
    }
}

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

@observer
class List extends React.Component {
    render() {
        const store = this.props.store;
        return (
            <FlatList
                style={styles.container}
                data={store.bars}
                renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
            />
        );
    }
}

const CatalogueScreen = ({navigation}) => (
    <List store={barStore}/>
);

@observer
class StateScreen extends React.Component {
    render() {
        return (
            <Text>
                {`lat: ${barStore.region.latitude}, lon: ${barStore.region.longitude}`}
            </Text>
        );
    }
}

const TabNav = TabNavigator(
    {
        MainTab: {
            screen: Map,
            path: "/",
            navigationOptions: {
                title: "Карта",
                tabBarLabel: "Карта",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? "ios-home" : "ios-home-outline"}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        CatalogueTab: {
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
        StateTab: {
            screen: StateScreen,
            path: "/state",
            navigationOptions: {
                title: "state",
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
            path: "/profile",
            navigationOptions: {
                title: "Профиль",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? "ios-person" : "ios-person-outline"}
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
        tabBarOptions: {
            style: styles.uiColor,
        },
    },
);

const AppScreen = StackNavigator({
    Root: {
        screen: TabNav,
        navigationOptions: {
            headerTintColor: "#fff",
            headerStyle: styles.uiColor,
        }
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

@observer
export default class App extends React.Component {
    render() {
        const store = barStore;
        if (store.user) {
            return (
                <AppScreen screenProps={barStore}/>
            );
        } else {
            return (
                <LoginPage store={barStore}/>
            );
        }

    }
}
