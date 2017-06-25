import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Dimensions
} from 'react-native';
import ArabicText from './ArabicText';
import { colors } from '../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
const window = Dimensions.get('window');

class LeftMenu extends Component {
    renderItems(items) {
        return items.map((item) =>
            <View key={item.id} style={styles.textWithIcon}>
                <View style={styles.withIcon}>
                    <ArabicText
                        onPress={() => this.props.onLeftMenuItemSelected(item)}
                        textStyle={styles.text}>{item.name}
                    </ArabicText>
                    <Icon
                        style={styles.iconWithText}
                        name={item.icon}
                        color="white"
                        size={22}
                        />
                </View>
            </View>
        );
    }

    render() {
        const filters = require('../assets/data/filters.json');
        const categories = require('../assets/data/categories.json');
        return (
            <ScrollView scrollToTop= {false} style={styles.scrollContainer}>
                {this.renderItems(filters)}
                <View style={styles.sectionContainer}>
                    <ArabicText textStyle={styles.sectionText}>الاقسام</ArabicText>
                </View>
                {this.renderItems(categories)}
            </ScrollView>
        );
    }
}

LeftMenu.propTypes = {
    onLeftMenuItemSelected: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: colors.secondary,
        padding: 20,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        // fontWeight: 'bold',
        paddingTop: 4
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 4,
        paddingRight: 120
    },
    iconWithText: {
        paddingLeft: 14
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionContainer: {
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 4,
        paddingRight: 120

    },
    sectionText: {
        color: colors.white,
        fontSize: 16,
        alignItems: 'flex-start',
    }
});


export default LeftMenu;