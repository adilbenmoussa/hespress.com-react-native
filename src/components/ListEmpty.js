import React, { PropTypes } from 'react';

import {
    View,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text

} from 'react-native';
import ArabicText from './ArabicText';
import { colors } from '../config/colors';

const {width, height} = Dimensions.get('window');

const ListEmpty = (props) => {
    const { isPending, error } = props;
    if (isPending) {
        return (
            <ActivityIndicator
                animating={true}
                color={colors.primary}
                size="large"
                style={styles.activityIndicator}
                />
        )
    }

    if (error) {
        return (
            <View><Text>{error}</Text></View>
        )
    }

    return <View textStyle={styles.artclesNoFoundContainer}>
        <ArabicText textStyle={styles.artclesNoFound}>
            لم يتم العثور على أية مقال
            </ArabicText>
    </View>
};

ListEmpty.propTypes = {
    isPending: PropTypes.bool.isRequired,
    error: PropTypes.string
}

const styles = StyleSheet.create({
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    },
    artclesNoFoundContainer: {
        paddingTop: 100,
        alignItems: 'center',
        width: width,
        height: height,
    },
    artclesNoFound: {
        fontSize: 24,
        color: colors.secondary,
    }
});

export default ListEmpty;
