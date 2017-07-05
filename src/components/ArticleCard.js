import React, { PropTypes } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

import { Badge } from 'react-native-elements';
import ArabicText from '../components/ArabicText';
import { Actions } from 'react-native-router-flux';
import { colors, hexWithOpacity } from '../config/colors';
import { imageUriByName, decodeHtml } from '../config/html';
import { categoriesWithMedia } from '../config/data';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
// const {width, height} = Dimensions.get('window');

const ArticleCard = (props) => {
    const {article, categoryColor} = props;

    const mediaColor = hexWithOpacity(colors.white, 0.5);
    const hasMedia = categoriesWithMedia.indexOf(article.category_id) >= 0;

    return <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Actions.ArticleDetailsPage(article)}
        >
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: imageUriByName(article.image) }}
                >
                <View style={styles.imageOverlay}>
                    {hasMedia && <Icon
                        name="youtube-play"
                        color={mediaColor}
                        size={42}
                        />
                    }
                </View>
            </Image>
            <View style={styles.textContainer}>
                <Badge
                    containerStyle={[styles.badge, { backgroundColor: categoryColor }]}>
                    <ArabicText textStyle={styles.badgeText}>{article.category_name}</ArabicText>
                </Badge>
                <View>
                    <ArabicText textStyle={styles.dateCreated}>{moment(article.created).fromNow()}</ArabicText>
                    <ArabicText textStyle={styles.title}>{decodeHtml(article.title)}</ArabicText>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
};

ArticleCard.propTypes = {
    article: PropTypes.object.isRequired,
    categoryColor: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0)',
        paddingTop: 2,
        paddingHorizontal: 2
    },
    textContainer: {
        position: 'absolute',
        top: 10,
        bottom: 30,
        right: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    title: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        lineHeight: 20,
    },
    dateCreated: {
        color: colors.white,
        fontSize: 14,
        textAlign: 'right'
    },
    badge: {
        backgroundColor: 'rgba(205, 220, 57,0.5)',
        borderRadius: 4,
        height: 30,
        padding: 6
    },
    badgeText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        height: 250,
    },
    imageOverlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ArticleCard;