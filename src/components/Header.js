import React, { Component, PropTypes } from 'react';
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
        const { toggleLeftMenu, title } = this.props;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => toggleLeftMenu()}
                >
                    <Icon 
                        name="bars"
                        color="white"
                        size={25} />
                </TouchableWithoutFeedback>
                <View>
                    <ArabicText textStyle={styles.title}>{title}</ArabicText>
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

Header.propTypes = {
    toggleLeftMenu: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
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
