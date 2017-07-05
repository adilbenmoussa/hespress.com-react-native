import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as articlesActionCreators } from '../reducers/articlesReducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, hexWithOpacity, getColorById } from '../config/colors';
import { categories, categoriesWithMedia } from '../config/data';
import ArabicText from '../components/ArabicText';
import ListEmpty from '../components/ListEmpty';
import ArticleCard from '../components/ArticleCard';
import { debounce } from 'lodash';
import { Actions } from 'react-native-router-flux';

class SearchPage extends Component {

    _keyExtractor = (item, index) => item.id;

    _search(searchText) {
        const {searchArticles} = this.props;
        searchArticles(searchText);
    }

    _renderListEmptyComponent() {
        const { isPending, error } = this.props;
        return <ListEmpty
            isPending={isPending}
            error={error}
            />
    }

    _renderItem({item}) {
        color = colors.primary
        const mediaColor = hexWithOpacity(colors.white, 0.5);
        const hasMedia = categoriesWithMedia.indexOf(item.category_id) >= 0;
        return (
            <ArticleCard
                article={item}
                categoryColor={color}
                />
        );
    }


    render() {

        const { searchedArticles } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon
                        name="search"
                        color="white"
                        size={20}
                        style={styles.searchIcon}
                        />
                    <TextInput
                        onChangeText={debounce(this._search.bind(this), 1000)}
                        style={styles.input}
                        placeholder="ابحث"
                        placeholderTextColor="grey"
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        />
                    <TouchableWithoutFeedback
                        onPress={() => Actions.pop()}
                        >
                        <View>
                            <ArabicText textStyle={styles.cancelButtonText}>إلغاء</ArabicText>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
                <FlatList
                    data={searchedArticles}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem.bind(this)}
                    ListEmptyComponent={this._renderListEmptyComponent.bind(this)}
                    />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchedArticles: state.articles.searchedArticles,
    };
}

const mapDispatchToPros = (dispatch) => ({
    ...bindActionCreators({
        ...articlesActionCreators
    }, dispatch)
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        paddingHorizontal: 15,
        paddingTop: 28,
    },
    searchIcon: {
        backgroundColor: 'transparent'
    },
    input: {
        width: 260,
        height: 30,
        backgroundColor: colors.white,
        marginHorizontal: 10,
        paddingLeft: 10,
        borderRadius: 3,
        color: colors.black
    },
    cancelButtonText: {
        color: colors.white
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
});

const connectedSearchPage = connect(mapStateToProps, mapDispatchToPros)(SearchPage);

export default connectedSearchPage;


