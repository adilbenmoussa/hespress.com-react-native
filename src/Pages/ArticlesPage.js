import React, { Component, PropTypes } from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    ActivityIndicator,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { XmlEntities as Entities } from 'html-entities';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import ArabicText from '../components/ArabicText';
import { colors, hexWithOpacity } from '../config/colors';
import { categories, categoriesWithMedia } from '../config/data';
import { actionCreators as articlesActionCreators } from '../reducers/articlesReducer';

const window = Dimensions.get('window');

const entities = new Entities();

class ArticlesPages extends Component {

    _keyExtractor = (item, index) => item.id;

    _getColorById(categoryId) {
        const { selectedCategory } = this.props;
        let color;
        if (selectedCategory.id < 0) {
            const category = categories.find((cat) => cat.id === categoryId);
            if (!category) {
                console.log('categoryId not found', categoryId);
            }
            color = category.color;
        }
        else {
            color = selectedCategory.color;
        }

        return color;
    }

    _renderItem({item}) {
        const imageUri = `http://s1.hespress.com/files/${item.image}`;
        color = hexWithOpacity(this._getColorById(item.category_id), 0.5);
        const mediaColor = hexWithOpacity(colors.white, 0.5);
        const hasMedia = categoriesWithMedia.indexOf(item.category_id) >= 0;
        // Actions.
        return (
            <TouchableWithoutFeedback
                style={{flex:1}}
                onPress={() => Actions.ArticleDetailsPage(item)}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: imageUri }}
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
                            containerStyle={[styles.badge, { backgroundColor: color }]}>
                            <ArabicText textStyle={styles.badgeText}>{item.category_name}</ArabicText>
                        </Badge>
                        <View>
                            <ArabicText textStyle={styles.dateCreated}>{moment(item.created).fromNow()}</ArabicText>
                            <ArabicText textStyle={styles.title}>{entities.decode(item.title)}</ArabicText>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        );
    }

    _renderListEmptyComponent() {
        const { isPending, error } = this.props;
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
    }

    _handleRefresh() {
        const { getArticles, selectedCategory } = this.props;
        getArticles(selectedCategory);
    }

    render() {
        const { articles, selectedCategory, toggleLeftMenu } = this.props;
        return (
            <View style={styles.mainContainer}>
                <Header
                    title={selectedCategory.name}
                    toggleLeftMenu={toggleLeftMenu} />
                <FlatList
                    data={articles}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
                    ListEmptyComponent={this._renderListEmptyComponent.bind(this)}
                    refreshing={false}
                    onRefresh={this._handleRefresh.bind(this)}
                    />
            </View>
        );
    }
}

ArticlesPages.propTypes = {
    toggleLeftMenu: PropTypes.func.isRequired,
    selectedCategory: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired,
}


const styles = {
    mainContainer: {
        backgroundColor: colors.white,
        width: window.width,
        height: window.height,
        flex: 1,
    },
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
    },
    bottomTextGroup: {
        top: 10
    },
    activityIndicatorContainer: {
        width: window.width,
        height: window.height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
        backgroundColor: colors.white
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        width: window.width,
        height: window.height,
    },
    artclesNoFoundContainer: {
        paddingTop: 100,
        alignItems: 'center',
        width: window.width,
        height: window.height,
    },
    artclesNoFound: {
        fontSize: 24,
        color: colors.secondary,
    }
};

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles,
        isPending: state.articles.isPending,
        error: state.articles.error,
        selectedCategory: state.selectedCategory
    };
}

const mapDispatchToPros = (dispatch) => ({
    ...bindActionCreators({
        ...articlesActionCreators
    }, dispatch)
});

const ConntectedArticlesPages = connect(mapStateToProps, mapDispatchToPros)(ArticlesPages);

export default ConntectedArticlesPages;
