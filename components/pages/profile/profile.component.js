import React, { Component } from 'react';
import {observer} from "mobx-react";
import { StyleSheet,
         Button,
         Text,
         View,
         Image
          } from 'react-native';


@observer
export class ProfilePage extends Component {


    render(){
        let login = ()=>{
            this.props.store.loginUser();
        };

        return (
            <View style={styles.content}>
                <View style={styles.headInfo}>
                    <View><Image style={{width: 50, height: 50, borderRadius: 25}} source={{uri:'https://api.adorable.io/avatars/285/abott@adorable.png'}}/></View>
                    <View><Text>Профиль</Text></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        flexDirection:'column',
        backgroundColor: "#2b333e"
    },
    headInfo: {
        flex:2,
        flexDirection:'row',
    },
    logo: {
        height: 256,
        width: 256,
        borderRadius: 0
    },
    btn: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3
    }
});
