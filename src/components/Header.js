import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ArabicText from './ArabicText';
import { colors } from '../config/colors';

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
                    <ArabicText textStyle={styles.title}>جميع الاخبار</ArabicText>
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
        backgroundColor: colors.primary,
        paddingHorizontal: 15,
        paddingTop: 18
    },
    title: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Header;
