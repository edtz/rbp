import React, { Component } from 'react';
import { StyleSheet, Button} from 'react-native';


export class LoginPage extends Component {

    const type = this.props.type;

    render(){
        return (
            <Button onPress={login()} title="Login" color=""/>
        );
    }
}

const styles = StyleSheet.create({

});
