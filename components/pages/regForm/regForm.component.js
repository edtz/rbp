import React, { Component } from 'react';
import { StyleSheet,
         Button,
         Text,
          } from 'react-native';


export class RegFormPage extends Component {

    render(){
        return (
            <Button title="Войти" color="#d59563" />
        );
    }
}

const styles = StyleSheet.create({
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
        marginBottom: 10,
        color: '#000'
    }
});
