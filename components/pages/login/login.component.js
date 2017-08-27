import React, { Component } from 'react';
import {observer} from "mobx-react";
import { StyleSheet,
         Button,
         Text,
         View,
         Image
          } from 'react-native';


@observer
export class LoginPage extends Component {


    render(){
        let login = ()=>{
            this.props.store.loginUser();
        };

        return (
            <View style={styles.content}>
                <Image style={styles.logo} source={require('./../../../assets/img/logo.png')} />
                <Button style={styles.btn} onPress={() => login()} title="Войти" color="#d59563" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#2b333e"
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
