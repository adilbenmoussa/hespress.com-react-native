import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Header extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback>
                    <Icon 
                        name="bars"
                        color="white"
                        size={25} />
                </TouchableWithoutFeedback>
                <View>
                    <Text style={styles.title}> Jami3 AlAkhbar</Text>
                </View>

                 <TouchableWithoutFeedback>
                    <Icon 
                        name="search"
                        color="white"
                        size={25} />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'blue',
        paddingHorizontal: 15,
        paddingTop: 10
    },
    title: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default Header;
