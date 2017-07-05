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
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import ArabicText from '../components/ArabicText';
import { colors, hexWithOpacity, getColorById } from '../config/colors';
import { categories, categoriesWithMedia } from '../config/data';
import { actionCreators as articlesActionCreators } from '../reducers/articlesReducer';
import { imageUriByName, decodeHtml } from '../config/html';
import ListEmpty from '../components/ListEmpty';
import ArticleCard from '../components/ArticleCard';

const window = Dimensions.get('window');

class ArticlesPages extends Component {

    _keyExtractor = (item, index) => item.id;

    _renderItem({item}) {
        const {selectedCategory} = this.props;
        color = hexWithOpacity(getColorById(item.category_id, selectedCategory), 0.5);
        const mediaColor = hexWithOpacity(colors.white, 0.5);
        const hasMedia = categoriesWithMedia.indexOf(item.category_id) >= 0;
        return (
            <ArticleCard 
                article={item}
                categoryColor={color}
            />
        );
    }

    _renderListEmptyComponent() {
        const { isPending, error } = this.props;
        return <ListEmpty
            isPending={isPending}
            error={error}
            />
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
