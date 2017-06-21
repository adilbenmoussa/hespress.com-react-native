import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Header from './components/Header';

class App extends Component {

    render() {
        return (
            <View>
                <Header />
                <Text> Salam Hesspress </Text>
            </View>
        );
    }
}

export default App;
