import React, {Component} from "react";
import {
    Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity,
    View, Animated, Dimensions, StatusBar, SectionList,
} from "react-native";
import {
    addNavigationHelpers,
    StackNavigator,
    NavigationActions,
    TabNavigator,
} from "react-navigation";

import {observable, action, computed} from "mobx";
import {observer} from "mobx-react";
import MapView from "react-native-maps";


import Ionicons from "react-native-vector-icons/Ionicons";

import {bars, bars2} from "./bars";

import {mapStyle} from "./store";
import SlidingUpPanel from "rn-sliding-up-panel";
import {hslToRgb, rgbToHsl, rgb2hex} from "./colorConversion"

import { LoginPage } from "./components/pages/login/login.component";


StatusBar.setBarStyle('light-content', true);
const {height} = Dimensions.get("window");
const colourFavourite = "#ffd216";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    panel: {
        flex: 1,
        backgroundColor: "#1c2939",
        position: "relative",
    },
    barDetail: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    dragger: {
        width: 50,
        height: 4,
        backgroundColor: "#8c9ba1",
        borderRadius: 25,
        marginTop: 7,
        marginBottom: 10,
    },
    panelHeader: {
        maxHeight: 100,
        backgroundColor: "#1c2939",
        flex: 1,
        alignItems: "center",
    },
    uiColor: {
        backgroundColor: "#36465a"
    },
    info: {
        flex: 1,
        alignSelf: "flex-start",
        marginLeft: 12,
        alignItems: "flex-start",
    },
    title: {
        color: "#fff",
        fontSize: 28,
        marginBottom: 5,
    },
    rating: {
        color: "#fff",
        fontSize: 24,
    },
    item: {
        marginLeft: 10,
        marginTop: 5,
        fontSize: 24,
    },
    favoriteIcon: {
        position: "absolute",
        top: -24,
        right: 24,
        backgroundColor: colourFavourite,
        width: 48,
        height: 48,
        padding: 8,
        borderRadius: 24,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
});

class Store {
    @observable bars = [];
    @observable user;
    @observable region = {
        latitude: 59.9308928,
        longitude: 30.3348344,
        latitudeDelta: 0.0922 /2,
        longitudeDelta: 0.0421 /2,
    };
    @observable selectedBar;

    @observable drinkFilter;
    @computed get filteredBars() {
        return this.bars.filter(el => el.drinks.includes(this.drinkFilter));
    };

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

    beers = [
        {
            id: "1",
            name: "1",
        },
        {
            id: "2",
            name: "2",
        },
        {
            id: "3",
            name: "3",
        },
        {
            id: "4",
            name: "4",
        },
        {
            id: "5",
            name: "5",
        },
        {
            id: "6",
            name: "6",
        },
        {
            id: "7",
            name: "7",
        },
        {
            id: "8",
            name: "8",
        },
        {
            id: "9",
            name: "9",
        },
        {
            id: "10",
            name: "10",
        },
        {
            id: "11",
            name: "11",
        },
        {
            id: "12",
            name: "12",
        },
        {
            id: "13",
            name: "13",
        },
        {
            id: "14",
            name: "14",
        },
        {
            id: "15",
            name: "15",
        },
        {
            id: "16",
            name: "16",
        },
        {
            id: "17",
            name: "17",
        },
        {
            id: "18",
            name: "18",
        },
        {
            id: "19",
            name: "19",
        },
        {
            id: "20",
            name: "20",
        },
    ];

    @action addBars = (bars) => {
        bars.forEach(bar => this.bars.push({
            key: bar.id,
            name: bar.name_ex.primary,
            coords: {
                latitude: bar.point.lat,
                longitude: bar.point.lon,
            },
            pinColor: rgb2hex(...hslToRgb(0.940928270042194, Math.random(), 0.3647058823529412)),
            isFavourite: (Math.random() > 0.97),
            point: bar.point,
            schedule: bar.schedule,
            contacts: bar.contact_groups[0].contacts.map(el => {
                el.key = el.value;
                return el;
            }),
            rubrics: bar.rubrics,
            reviews: bar.reviews,
            beers: this.beers.reduce((acc, item) => {
                if (Math.random() > 0.7) {
                    acc.push(item);
                    return acc;
                } else { return acc;}
            }, []),
            status: "открыт",
        }));
        this.bars.filter(bar => bar.isFavourite).forEach(bar => bar.pinColor = colourFavourite);
    };

    @action loginUser = () => {
        this.user = this.users[Math.floor(Math.random() * this.users.length)];
    };
    @action setLocation = (region) => {
        this.region = region;
    };

    @action selectBar = (key) => this.selectedBar = this.bars.filter(bar => bar.key === key)[0];
}

const barStore = new Store();

barStore.addBars(bars.result.items);
barStore.addBars(bars2.result.items);


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
class NavScreen extends React.Component {
    render() {
        return (
            <ScrollView>
                <Button
                    onPress={() => this.props.navigation.navigate("Profile", {name: "Jordan"})}
                    title="Open profile screen"
                />
                <Button
                    onPress={() => this.props.navigation.navigate("NotifSettings")}
                    title="Open notifications screen"
                />
                <Button
                    onPress={() => this.props.navigation.navigate("SettingsTab")}
                    title="Go to settings tab"
                />
                <Button onPress={() => this.props.navigation.goBack(null)} title="Go back"/>
            </ScrollView>
        )
    }
};

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
                    rotateEnabled={false}
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
                <FilterView />
                <BarDetail selectedBar={store.selectedBar}/>
            </View>
        );
    }
}

@observer
class FilterView extends React.Component {
    render() {
        return (
            <View>

            </View>
        )
    }
}


@observer
class BarDetail extends React.Component {
    static defaultProps = {
        draggableRange: {
            top: height,
            bottom: 210,
        },
    };

    constructor(props) {
        super(props);

        this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this);
    }

    _renderFavoriteIcon() {
        const {top, bottom} = this.props.draggableRange;
        const draggedValue = this._draggedValue.interpolate({
            inputRange: [-(top + bottom) / 2, -bottom],
            outputRange: [0, 1],
            extrapolate: "clamp",
        });

        const transform = [{scale: draggedValue}];

        return (
            <Animated.View style={[styles.favoriteIcon, {transform}]}>
                    <Ionicons
                        name={"ios-heart"}
                        size={32}
                        style={{color: "#fff", paddingTop: 2}}
                    />
            </Animated.View>
        );
    }
    _draggedValue = new Animated.Value(-120);

    render() {
        const bar = this.props.selectedBar;
        if (bar) {
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
                        {bar.isFavourite ? this._renderFavoriteIcon() : null}
                        <View style={styles.panelHeader}>
                            <View style={styles.dragger}/>
                            <View style={styles.info}>
                                <Text style={styles.title}>{bar.name}</Text>
                                <Text style={styles.rating}>{`Рейтинг ${bar.reviews.general_rating || "неизвестен"}, сейчас ${bar.status}`}</Text>
                            </View>
                        </View>
                        <View style={styles.panel}>
                            <View style={{ marginLeft: 10, marginRight: 10}}>
                                <Text style={{color: "#fff", fontSize: 24, marginBottom: 5}}>Контакты</Text>
                                {bar.contacts.map(item => {
                                    const thing = {
                                        "phone": "Телефон",
                                        "email": "Почта",
                                        "vkontakte": "ВК",
                                        "instagram": "IG",
                                        "facebook": "FB",
                                        "twitter": "TW",
                                        "website": "Сайт",
                                    };
                                    let desc;
                                    if (Object.keys(thing).includes(item.type)) {
                                        desc = thing[item.type];
                                    } else {
                                        desc = "???";
                                    }
                                    return (
                                        <Text style={{color: "#fff", fontSize: 16}} key={item.value}>{`${desc}: ${item.text}`}</Text>
                                    );
                                })}
                                <Text style={{color: "#fff", fontSize: 24, marginBottom: 5}}>Сорта пива</Text>
                                {bar.beers.map(item => (
                                        <Text style={{color: "#fff", fontSize: 16}} key={item.id}>{item.name}</Text>
                                ))}

                            </View>
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

@observer
class SettingsScreen extends React.Component {
    render() {
        return (
            <NavScreen banner="Settings Screen" navigation={this.props.navigation}/>
        )
    }
}

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
class DrinksScreen extends React.Component {
    render() {
        const store = barStore;
        return (
            <FlatList
                style={styles.container}
                data={store.beers.map(bar => {bar.key = bar.id; return bar;})}
                renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
            />
        );
    }
}

const TabNav = TabNavigator(
    {
        MainTab: {
            screen: Map,
            path: "/",
            navigationOptions: {
                title: "InBottle | Red Bad Parrot",
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
                title: "Места",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? "ios-restaurant" : "ios-restaurant-outline"}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        DrinksTab: {
            screen: DrinksScreen,
            path: "/drinks",
            navigationOptions: {
                title: "Пиво",
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={focused ? "ios-wine" : "ios-wine-outline"}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        SettingsTab: {
            screen: SettingsScreen,
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
